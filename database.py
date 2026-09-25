import sqlite3
import json
import os
import datetime
import hashlib
import random
import string
import re

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assessment.db")
ADMIN_EMAIL = "rajushikalgar@gmail.com"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH, timeout=60.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA busy_timeout = 60000")
    conn.execute("PRAGMA synchronous = NORMAL")
    conn.execute("PRAGMA cache_size = -64000")
    conn.execute("PRAGMA temp_store = MEMORY")
    conn.execute("PRAGMA mmap_size = 268435456")
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

import base64
import urllib.request
import threading
import time

import gzip

_LAST_BACKUP_TIME = 0
_BACKUP_LOCK = threading.Lock()

def restore_database_from_cloud():
    relay_url = os.environ.get('GMAIL_RELAY_URL', '').strip()
    if not relay_url:
        return False
    try:
        print("[CLOUD SYNC] Checking Google Drive for latest assessment.db backup...")
        req = urllib.request.Request(
            relay_url,
            data=json.dumps({'action': 'restore_db'}).encode('utf-8'),
            headers={'Content-Type': 'application/json', 'User-Agent': 'CIEMS-Portal/1.0'}
        )
        with urllib.request.urlopen(req, timeout=35) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data.get('status') == 'success' and data.get('found') and data.get('db_base64'):
                db_bytes = base64.b64decode(data['db_base64'])
                # Auto-decompress if gzipped
                if db_bytes.startswith(b'\x1f\x8b'):
                    try:
                        db_bytes = gzip.decompress(db_bytes)
                    except Exception as gz_err:
                        print(f"[CLOUD SYNC ERROR] Failed to decompress gzipped database: {gz_err}")
                        return False
                
                # Verify SQLite format
                if db_bytes.startswith(b'SQLite format 3\x00') and len(db_bytes) > 1000:
                    with open(DB_PATH, 'wb') as f:
                        f.write(db_bytes)
                    print(f"[CLOUD SYNC SUCCESS] Successfully restored database from Google Drive ({len(db_bytes)} bytes)!")
                    return True
                else:
                    print("[CLOUD SYNC ERROR] Downloaded file is not a valid SQLite database.")
            elif data.get('status') == 'error':
                print(f"[CLOUD SYNC WARNING] Google Apps Script returned error: {data.get('message')}")
            else:
                print("[CLOUD SYNC] No previous Google Drive backup found on Google Drive.")
    except Exception as e:
        print(f"[CLOUD SYNC NOTICE] Cloud restore check: {e}")
    return False

def check_cloud_sync_status():
    relay_url = os.environ.get('GMAIL_RELAY_URL', '').strip()
    if not relay_url:
        return {
            'configured': False,
            'message': 'GMAIL_RELAY_URL पर्यावरण चल (Environment Variable) सेट केलेला नाही.'
        }
    try:
        req = urllib.request.Request(
            relay_url,
            data=json.dumps({'action': 'ping'}).encode('utf-8'),
            headers={'Content-Type': 'application/json', 'User-Agent': 'CIEMS-Portal/1.0'}
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data.get('status') == 'success':
                return {'configured': True, 'success': True, 'relay_response': data}
            else:
                return {'configured': True, 'success': False, 'error': data.get('message'), 'relay_response': data}
    except Exception as e:
        return {'configured': True, 'success': False, 'error': str(e)}

def backup_database_to_cloud_sync():
    relay_url = os.environ.get('GMAIL_RELAY_URL', '').strip()
    if not relay_url or not os.path.exists(DB_PATH):
        return {'success': False, 'error': 'GMAIL_RELAY_URL missing or database file not found'}
    try:
        conn = get_db_connection()
        conn.execute("PRAGMA wal_checkpoint(TRUNCATE)")
        conn.close()

        with open(DB_PATH, 'rb') as f:
            raw_db_bytes = f.read()

        if len(raw_db_bytes) < 100:
            return {'success': False, 'error': 'Database file is empty or corrupted.'}

        # Gzip compress to ensure super-fast transfer (e.g. 50MB -> ~4.8MB)
        compressed_bytes = gzip.compress(raw_db_bytes, compresslevel=6)
        b64_str = base64.b64encode(compressed_bytes).decode('utf-8')

        payload = {
            'action': 'backup_db',
            'db_base64': b64_str,
            'is_compressed': True,
            'raw_size': len(raw_db_bytes),
            'compressed_size': len(compressed_bytes),
            'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        req = urllib.request.Request(
            relay_url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json', 'User-Agent': 'CIEMS-Portal/1.0'}
        )
        with urllib.request.urlopen(req, timeout=40) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data.get('status') == 'success':
                print(f"[CLOUD BACKUP SYNC SUCCESS] Database saved to Google Drive (Raw: {len(raw_db_bytes)} bytes, Compressed: {len(compressed_bytes)} bytes)!")
                return {'success': True, 'relay_response': data, 'raw_size': len(raw_db_bytes), 'size_bytes': len(compressed_bytes)}
            else:
                err_msg = data.get('message') or str(data)
                print(f"[CLOUD BACKUP SYNC NOTICE] Google Apps Script returned error: {err_msg}")
                return {'success': False, 'error': err_msg}
    except Exception as e:
        print(f"[CLOUD BACKUP SYNC ERROR] {e}")
        return {'success': False, 'error': str(e)}

def backup_database_to_cloud_async():
    thread = threading.Thread(target=backup_database_to_cloud_sync, daemon=True)
    thread.start()


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def verify_password(password: str, password_hash: str) -> bool:
    if not password or not password_hash:
        return False
    return hash_password(password) == password_hash

def generate_random_password(length=8):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def generate_clean_teacher_code(subject_name: str, name: str = "", next_id: int = 1) -> str:
    """
    Generates a standardized teacher code containing only uppercase English letters, digits, and hyphen.
    No brackets, commas, Devanagari/Marathi characters or special punctuation.
    Example: TCH-GEO-01, TCH-ENG-02, TCH-HIS-03, TCH-RAJ-01
    """
    eng_subj_letters = ''.join(re.findall(r'[A-Za-z]', subject_name or '')).upper()
    if len(eng_subj_letters) >= 3:
        code_prefix = eng_subj_letters[:3]
    elif len(eng_subj_letters) > 0:
        code_prefix = eng_subj_letters
    else:
        eng_name_letters = ''.join(re.findall(r'[A-Za-z]', name or '')).upper()
        if eng_name_letters.startswith('DR') and len(eng_name_letters) > 3:
            eng_name_letters = eng_name_letters[2:]
        code_prefix = eng_name_letters[:3] if len(eng_name_letters) >= 3 else 'FAC'
    
    code_prefix = re.sub(r'[^A-Z]', '', code_prefix) or 'TCH'
    return f"TCH-{code_prefix}-{int(next_id):02d}"


def get_current_academic_year(dt=None):
    """
    Returns (academic_year_str, start_date_str, end_date_str) based on June 1 to May 31 cycle.
    Example: for 2026-09-20 -> ('2026–27', '2026-06-01', '2027-05-31')
    """
    if dt is None:
        dt = datetime.datetime.now()
    year = dt.year
    if dt.month >= 6:
        start_year = year
        end_year = year + 1
    else:
        start_year = year - 1
        end_year = year
    return f"{start_year}–{str(end_year)[-2:]}", f"{start_year}-06-01", f"{end_year}-05-31"


def get_next_academic_year(current_end_date_str=None):
    """
    Calculates next academic year based on current end date or current cycle.
    """
    if current_end_date_str:
        try:
            cur_end = datetime.datetime.strptime(current_end_date_str, '%Y-%m-%d')
            start_year = cur_end.year
            end_year = start_year + 1
            return f"{start_year}–{str(end_year)[-2:]}", f"{start_year}-06-01", f"{end_year}-05-31"
        except Exception:
            pass
    cur_acad, cur_start, cur_end = get_current_academic_year()
    cur_end_dt = datetime.datetime.strptime(cur_end, '%Y-%m-%d')
    start_year = cur_end_dt.year
    end_year = start_year + 1
    return f"{start_year}–{str(end_year)[-2:]}", f"{start_year}-06-01", f"{end_year}-05-31"


# Comprehensive Master Directory of Disciplines & Subjects
MASTER_DISCIPLINES = {
    "कृषी व संलग्न विज्ञान (Agriculture & Allied Sciences)": [
        "मृदाशास्त्र व कृषी रसायन (Soil Science & Agricultural Chemistry)",
        "सस्यशास्त्र (Agronomy)",
        "उद्यानविद्या (Horticulture)",
        "कृषी अर्थशास्त्र व व्यवस्थापन (Agricultural Economics & Farm Management)",
        "कीटकशास्त्र व वनस्पती संरक्षण (Entomology & Plant Protection)",
        "पशूसंवर्धन व दुग्धशास्त्र (Animal Husbandry & Dairy Science)",
        "कृषी अभियांत्रिकी व सिंचन (Agricultural Engineering & Irrigation)",
        "वनस्पती प्रजनन व जनुकशास्त्र (Plant Breeding & Genetics)",
        "कृषी विस्तार शिक्षण (Agricultural Extension Education)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "अभियांत्रिकी व तंत्रज्ञान (Engineering & Technology)": [
        "संगणक अभियांत्रिकी व IT (Computer Engineering & Information Technology)",
        "कृत्रिम बुद्धिमत्ता व डेटा सायन्स (Artificial Intelligence & Data Science)",
        "मेकॅनिकल इंजिनिअरिंग (Mechanical Engineering)",
        "सिव्हिल व पर्यावरण अभियांत्रिकी (Civil & Environmental Engineering)",
        "इलेक्ट्रिकल इंजिनिअरिंग (Electrical Engineering)",
        "इलेक्ट्रॉनिक्स व टेलिकम्युनिकेशन (Electronics & Telecommunication)",
        "केमिकल इंजिनिअरिंग (Chemical Engineering)",
        "रोबोटिक्स व ऑटोमेशन (Robotics & Automation)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "वैद्यकीय, फार्मसी व आरोग्य विज्ञान (Medical, Pharmacy & Health Sciences)": [
        "औषधनिर्माणशास्त्र (Pharmaceutics & Pharmacology - B.Pharm/M.Pharm)",
        "फार्मास्युटिकल केमिस्ट्री (Pharmaceutical Chemistry)",
        "फार्माकोग्नोसी व फायटोकेमिस्ट्री (Pharmacognosy & Phytochemistry)",
        "नर्सिंग विज्ञान (Nursing Science - B.Sc./M.Sc. Nursing)",
        "फिजिओथेरपी (Physiotherapy - BPT)",
        "वैद्यकीय प्रयोगशाळा तंत्रज्ञान (Medical Laboratory Technology - BMLT/DMLT)",
        "जनआरोग्य व रोगप्रतिबंधकशास्त्र (Public Health & Community Medicine)",
        "दंतवैद्यकीय विज्ञान (Dental Sciences - BDS)",
        "आयुर्वेद व पंचकर्म विज्ञान (Ayurveda & Panchakarma)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "विधी व कायदेविषयक अभ्यास (Law & Legal Studies)": [
        "घटनात्मक व प्रशासकीय कायदा (Constitutional & Administrative Law)",
        "फौजदारी कायदा व न्यायवैद्यकशास्त्र (Criminal Law & Criminology)",
        "दिवाणी व संविदा कायदा (Civil & Contract Law)",
        "कंपनी व कॉर्पोरेट कायदा (Company & Corporate Law)",
        "आंतरराष्ट्रीय व मानवाधिकार कायदा (International Law & Human Rights)",
        "सायबर व बौद्धिक संपदा कायदा (Cyber Law & Intellectual Property Rights - IPR)",
        "पर्यावरण व कामगार कायदे (Environmental & Labour Laws)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "शिक्षणशास्त्र व शारीरिक शिक्षण (Education & Physical Education)": [
        "शिक्षणशास्त्र (Education - B.Ed./M.Ed./B.A.)",
        "शारीरिक शिक्षण (Physical Education - B.P.Ed./M.P.Ed.)",
        "शैक्षणिक मानसशास्त्र व तंत्रज्ञान (Educational Psychology & Tech)",
        "शालेय प्रशासन व व्यवस्थापन (School Administration & Management)",
        "अध्यापन पद्धती व विशेष शिक्षण (Pedagogy & Special Education)",
        "योग व क्रीडा विज्ञान (Yoga & Sports Science)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "मानव्यविद्या व सामाजिक शास्त्रे (Humanities & Social Sciences)": [
        "भाषाशास्त्र व भाषांतर अभ्यास (Linguistics & Translation Studies)",
        "पुरातत्व व ऐतिहासिक पर्यटन (Archaeology & Heritage Tourism)",
        "विकासाचे समाजशास्त्र व लिंगभाव अभ्यास (Sociology of Development & Gender)",
        "आंतरराष्ट्रीय संबंध व विदेश नीती (International Relations & Foreign Policy)",
        "मानसशास्त्रीय समुपदेशन (Psychological Counseling & Behavioral Studies)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "विज्ञान (Science)": [
        "भौतिकशास्त्र (Physics)",
        "रसायनशास्त्र (Chemistry)",
        "वनस्पतीशास्त्र (Botany)",
        "प्राणीशास्त्र (Zoology)",
        "गणित (Mathematics)",
        "सांख्यिकी (Statistics)",
        "संगणकशास्त्र (Computer Science)",
        "इलेक्ट्रॉनिक्स (Electronics)",
        "सूक्ष्मजीवशास्त्र (Microbiology)",
        "जैवतंत्रज्ञान (Biotechnology)",
        "भूगर्भशास्त्र (Geology)",
        "पर्यावरणशास्त्र (Environmental Science)",
        "माहिती तंत्रज्ञान (Information Technology)",
        "अन्न तंत्रज्ञान (Food Science & Technology)",
        "नॅनो तंत्रज्ञान (Nanotechnology)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "वाणिज्य व व्यवस्थापन (Commerce & Management)": [
        "अकाउंटन्सी व वित्तीय लेखाकर्म (Accountancy & Financial Accounting)",
        "व्यवसाय प्रशासन व व्यवस्थापन (Business Administration & Management)",
        "बँकिंग व वित्तीय बाजार (Banking & Financial Markets)",
        "वाणिज्यिक व कंपनी कायदे (Mercantile & Corporate Law)",
        "कॉस्टिंग व वर्क अकाउंटिंग (Cost & Works Accounting)",
        "करप्रणाली (Direct & Indirect Taxation)",
        "व्यवसाय अर्थशास्त्र (Business Economics)",
        "विपणन व्यवस्थापन (Marketing Management)",
        "ई-कॉमर्स व डिजिटल बँकिंग (E-Commerce & Digital Banking)",
        "व्यवसाय संवाद व नीतिशास्त्र (Business Communication & Ethics)",
        "ऑडिटिंग व कॉर्पोरेट गव्हर्नन्स (Auditing & Corporate Governance)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "कला व ललित कला (Arts & Fine Arts)": [
        "भूगोल (Geography)",
        "इतिहास (History)",
        "राज्यशास्त्र (Political Science)",
        "समाजशास्त्र (Sociology)",
        "अर्थशास्त्र (Economics)",
        "मराठी (Marathi)",
        "इंग्रजी (English)",
        "हिंदी (Hindi)",
        "मानसशास्त्र (Psychology)",
        "तत्त्वज्ञान (Philosophy)",
        "शिक्षणशास्त्र (Education - B.A./B.Ed.)",
        "शारीरिक शिक्षण (Physical Education)",
        "संगीत (Music)",
        "संस्कृत (Sanskrit)",
        "उर्दू (Urdu)",
        "लोकप्रशासन (Public Administration)",
        "संरक्षण व सामरिक शास्त्र (Defense & Strategic Studies)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "आंतरविद्याशाखा (Interdisciplinary)": [
        "पर्यावरण अभ्यास (Environmental Studies)",
        "समाजकार्य (Social Work - BSW/MSW)",
        "पत्रकारिता व जनसंवाद (Journalism & Mass Communication)",
        "ग्रंथालय व माहितीशास्त्र (Library & Information Science)",
        "गृहविज्ञान व पोषणशास्त्र (Home Science & Nutrition)",
        "महिला व लिंगभाव अभ्यास (Women & Gender Studies)",
        "ग्रामीण विकास व विस्तार (Rural Development & Extension)",
        "योगशास्त्र व मानवी आरोग्य (Yogic Science & Wellness)",
        "मानववंशशास्त्र (Anthropology)",
        "आपत्ती व्यवस्थापन (Disaster Management)",
        "इतर विषय (Other / Custom Subject)"
    ],
    "इतर / विशेष विद्याशाखा (Other / Custom Faculty Stream)": [
        "इतर विषय (Other / Custom Subject)"
    ]
}

MASTER_STREAM_CLASSES = {
    "कृषी व संलग्न विज्ञान (Agriculture & Allied Sciences)": [
        "B.Sc. (Agri) - I", "B.Sc. (Agri) - II", "B.Sc. (Agri) - III", "B.Sc. (Agri) - IV",
        "B.Sc. (Horticulture) - I", "B.Sc. (Horticulture) - II", "B.Sc. (Horticulture) - III", "B.Sc. (Horticulture) - IV",
        "B.Tech. (Agri Engg) - I", "B.Tech. (Agri Engg) - II", "B.Tech. (Agri Engg) - III", "B.Tech. (Agri Engg) - IV",
        "B.Sc. (ABM) - I", "B.Sc. (ABM) - II", "B.Sc. (ABM) - III", "B.Sc. (ABM) - IV",
        "M.Sc. (Agri) - I", "M.Sc. (Agri) - II",
        "Diploma in Agriculture - I", "Diploma in Agriculture - II"
    ],
    "अभियांत्रिकी व तंत्रज्ञान (Engineering & Technology)": [
        "B.E. - I", "B.E. - II", "B.E. - III", "B.E. - IV",
        "B.Tech. - I", "B.Tech. - II", "B.Tech. - III", "B.Tech. - IV",
        "M.E. - I", "M.E. - II",
        "M.Tech. - I", "M.Tech. - II",
        "Diploma in Engg - I", "Diploma in Engg - II", "Diploma in Engg - III"
    ],
    "वैद्यकीय, फार्मसी व आरोग्य विज्ञान (Medical, Pharmacy & Health Sciences)": [
        "MBBS - I", "MBBS - II", "MBBS - III", "MBBS - IV",
        "B.Pharm. - I", "B.Pharm. - II", "B.Pharm. - III", "B.Pharm. - IV",
        "M.Pharm. - I", "M.Pharm. - II",
        "Pharm.D. - I", "Pharm.D. - II", "Pharm.D. - III", "Pharm.D. - IV", "Pharm.D. - V",
        "B.Sc. Nursing - I", "B.Sc. Nursing - II", "B.Sc. Nursing - III", "B.Sc. Nursing - IV",
        "BDS - I", "BDS - II", "BDS - III", "BDS - IV",
        "BAMS - I", "BAMS - II", "BAMS - III", "BAMS - IV",
        "BHMS - I", "BHMS - II", "BHMS - III", "BHMS - IV",
        "BPTH (Physiotherapy) - I", "BPTH (Physiotherapy) - II", "BPTH (Physiotherapy) - III", "BPTH (Physiotherapy) - IV",
        "D.Pharm. - I", "D.Pharm. - II"
    ],
    "विधी व कायदेविषयक अभ्यास (Law & Legal Studies)": [
        "LL.B. - I (3 Yrs)", "LL.B. - II (3 Yrs)", "LL.B. - III (3 Yrs)",
        "B.A. LL.B. - I (5 Yrs)", "B.A. LL.B. - II (5 Yrs)", "B.A. LL.B. - III (5 Yrs)", "B.A. LL.B. - IV (5 Yrs)", "B.A. LL.B. - V (5 Yrs)",
        "B.B.A. LL.B. - I (5 Yrs)", "B.B.A. LL.B. - II (5 Yrs)", "B.B.A. LL.B. - III (5 Yrs)", "B.B.A. LL.B. - IV (5 Yrs)", "B.B.A. LL.B. - V (5 Yrs)",
        "LL.M. - I", "LL.M. - II",
        "Diploma in Labour Law", "Diploma in Cyber Law"
    ],
    "शिक्षणशास्त्र व शारीरिक शिक्षण (Education & Physical Education)": [
        "B.Ed. - I", "B.Ed. - II",
        "M.Ed. - I", "M.Ed. - II",
        "B.P.Ed. - I", "B.P.Ed. - II",
        "M.P.Ed. - I", "M.P.Ed. - II",
        "D.El.Ed. - I", "D.El.Ed. - II"
    ],
    "मानव्यविद्या व सामाजिक शास्त्रे (Humanities & Social Sciences)": [
        "B.A. (Humanities) - I", "B.A. (Humanities) - II", "B.A. (Humanities) - III",
        "M.A. - I", "M.A. - II",
        "B.S.W. - I", "B.S.W. - II", "B.S.W. - III",
        "M.S.W. - I", "M.S.W. - II"
    ],
    "विज्ञान (Science)": [
        "B.Sc. - I", "B.Sc. - II", "B.Sc. - III",
        "M.Sc. - I", "M.Sc. - II",
        "B.C.A. - I", "B.C.A. - II", "B.C.A. - III",
        "M.C.A. - I", "M.C.A. - II",
        "B.Sc. (CS) - I", "B.Sc. (CS) - II", "B.Sc. (CS) - III",
        "B.Sc. (Biotech) - I", "B.Sc. (Biotech) - II", "B.Sc. (Biotech) - III"
    ],
    "वाणिज्य व व्यवस्थापन (Commerce & Management)": [
        "B.Com. - I", "B.Com. - II", "B.Com. - III",
        "M.Com. - I", "M.Com. - II",
        "B.B.A. - I", "B.B.A. - II", "B.B.A. - III",
        "M.B.A. - I", "M.B.A. - II",
        "B.M.S. - I", "B.M.S. - II", "B.M.S. - III"
    ],
    "कला व ललित कला (Arts & Fine Arts)": [
        "B.A. - I", "B.A. - II", "B.A. - III",
        "M.A. - I", "M.A. - II",
        "B.F.A. - I", "B.F.A. - II", "B.F.A. - III", "B.F.A. - IV",
        "M.F.A. - I", "M.F.A. - II"
    ],
    "आंतरविद्याशाखा (Interdisciplinary)": [
        "B.Voc. - I", "B.Voc. - II", "B.Voc. - III",
        "M.Voc. - I", "M.Voc. - II",
        "B.Lib.I.Sc.", "M.Lib.I.Sc.",
        "B.J.M.C. - I", "B.J.M.C. - II", "B.J.M.C. - III",
        "M.J.M.C. - I", "M.J.M.C. - II"
    ],
    "इतर / विशेष विद्याशाखा (Other / Custom Faculty Stream)": [
        "Certificate Course - I",
        "Diploma Course - I", "Diploma Course - II",
        "Post Graduate Diploma (PGD) - I",
        "Specialized Course - I", "Specialized Course - II"
    ]
}

def init_db():
    conn = get_db_connection()
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA synchronous = NORMAL")
    cursor = conn.cursor()

    # 1. Admin Users
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 2. Teachers / Faculty
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS teachers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_code TEXT NOT NULL UNIQUE, -- e.g. TCH-GEO-01
        name TEXT NOT NULL,
        designation TEXT NOT NULL, -- सहाय्यक प्राध्यापक, सहयोगी प्राध्यापक, प्राध्यापक
        college_name TEXT NOT NULL,
        university_name TEXT NOT NULL,
        faculty_stream TEXT NOT NULL, -- कला, विज्ञान, वाणिज्य, आंतरविद्याशाखा, इतर
        custom_stream TEXT,
        subject_name TEXT NOT NULL,
        custom_subject TEXT,
        email TEXT NOT NULL UNIQUE,
        mobile TEXT NOT NULL,
        password_hash TEXT,
        temp_plain_password TEXT,
        status TEXT DEFAULT 'pending', -- pending, approved, rejected, deactivated
        rejection_reason TEXT,
        validity_start TEXT, -- e.g. '2026-06-01'
        validity_end TEXT, -- e.g. '2027-05-31'
        academic_year TEXT DEFAULT '2026–27',
        extension_requested INTEGER DEFAULT 0, -- 1 if teacher requested validity extension
        extension_requested_at TEXT,
        extension_requested_year TEXT, -- e.g. '2027–28'
        approval_type TEXT DEFAULT 'new', -- 'new' or 'update'
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        approved_at TEXT,
        approved_by TEXT
    )
    """)

    # 3. Teacher Class Roster (वर्गनिहाय विद्यार्थी यादी)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS teacher_rosters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL,
        academic_year TEXT NOT NULL, -- e.g. 2026–27
        class_name TEXT NOT NULL, -- e.g. B.A. I, B.Sc. II, B.Com. III, M.A. I, etc.
        division TEXT DEFAULT 'A',
        roll_number TEXT NOT NULL,
        prn TEXT NOT NULL,
        student_name TEXT NOT NULL,
        gender TEXT DEFAULT 'Male', -- Male, Female, Other
        email TEXT,
        mobile TEXT,
        is_repeater INTEGER DEFAULT 0, -- 1 for Repeater student
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id),
        UNIQUE (teacher_id, academic_year, class_name, prn)
    )
    """)

    # 4. Teacher Subject / Course Master Mapping (Unified with Stream, Class, Code, Max Marks)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS teacher_subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL,
        academic_year TEXT NOT NULL, -- e.g. 2026–27
        faculty_stream TEXT NOT NULL, -- कला, विज्ञान, वाणिज्य, आंतरविद्याशाखा, इतर
        subject_name TEXT NOT NULL,
        class_name TEXT NOT NULL, -- e.g. B.A. III, B.Sc. I, B.Com. II, etc.
        semester TEXT NOT NULL, -- Semester I to VIII
        program_code TEXT, -- e.g. BA, BSC, BCOM
        program_name TEXT, -- e.g. Bachelor of Arts
        course_code TEXT NOT NULL, -- e.g. GEO-301
        course_name TEXT NOT NULL, -- e.g. Physical Geography of India
        credits INTEGER DEFAULT 4,
        total_internal_max_marks REAL DEFAULT 40.0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id),
        UNIQUE (teacher_id, academic_year, course_code, semester)
    )
    """)

    # 5. Teacher Assignment Mapping (Unified Component breakdown)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS teacher_assignment_mappings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        assessment_type_id INTEGER NOT NULL,
        assessment_type_name TEXT NOT NULL,
        max_marks REAL NOT NULL,
        description TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id),
        FOREIGN KEY (subject_id) REFERENCES teacher_subjects(id) ON DELETE CASCADE
    )
    """)

    # 6. Created Assessments (Ready sessions created from mapping)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS created_assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        assessment_code TEXT NOT NULL UNIQUE, -- e.g. ASM-2026-GEO-BA3-01
        teacher_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        assignment_mapping_id INTEGER NOT NULL,
        academic_year TEXT NOT NULL,
        class_name TEXT NOT NULL,
        semester TEXT NOT NULL,
        course_code TEXT NOT NULL,
        course_name TEXT NOT NULL,
        assessment_type_name TEXT NOT NULL,
        assessment_session_title TEXT NOT NULL,
        assignment_topic TEXT NOT NULL,
        max_marks REAL NOT NULL,
        submission_deadline TEXT,
        allow_late INTEGER DEFAULT 1,
        is_group INTEGER DEFAULT 0,
        student_groups_json TEXT DEFAULT '{}',
        is_mcq INTEGER DEFAULT 0,
        mcq_questions_json TEXT DEFAULT '[]',
        is_individual_topics INTEGER DEFAULT 0,
        student_topics_json TEXT DEFAULT '{}',
        study_materials_json TEXT DEFAULT '[]',
        target_students_json TEXT DEFAULT '[]',
        meeting_url TEXT,
        meeting_time TEXT,
        duration_minutes INTEGER DEFAULT 0, -- 0: No timer, >0: Quiz countdown timer in minutes
        show_marks_to_students INTEGER DEFAULT 1, -- 1: Show marks to students, 0: Withhold/hide marks
        status TEXT DEFAULT 'active', -- active, closed
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id),
        FOREIGN KEY (subject_id) REFERENCES teacher_subjects(id),
        FOREIGN KEY (assignment_mapping_id) REFERENCES teacher_assignment_mappings(id)
    )
    """)

    # 7. Student Connections to Teacher
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS student_connections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL,
        roster_id INTEGER NOT NULL,
        prn TEXT NOT NULL,
        student_name TEXT NOT NULL,
        class_name TEXT NOT NULL,
        academic_year TEXT NOT NULL,
        connected_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id),
        FOREIGN KEY (roster_id) REFERENCES teacher_rosters(id),
        UNIQUE (teacher_id, prn)
    )
    """)

    # 8. Standard Continuous Internal Evaluation (CIE) Assessment Types
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS assessment_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        is_group INTEGER DEFAULT 0,
        fields_schema_json TEXT NOT NULL,
        is_active INTEGER DEFAULT 1
    )
    """)

    # 9. Submissions (Student Online Typing & Structured Submission)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        submission_id TEXT NOT NULL UNIQUE, -- Format: RAJ-IA-2026-000245
        teacher_id INTEGER NOT NULL,
        roster_id INTEGER NOT NULL,
        created_assessment_id INTEGER NOT NULL,
        
        -- Locked Student Info from Roster
        student_name TEXT NOT NULL,
        roll_number TEXT NOT NULL,
        prn TEXT NOT NULL,
        class_name TEXT NOT NULL,
        division TEXT DEFAULT 'A',
        semester TEXT NOT NULL,
        course_code TEXT NOT NULL,
        course_name TEXT NOT NULL,
        teacher_name TEXT NOT NULL,
        college_name TEXT,
        university_name TEXT,
        
        -- Assessment Details
        assessment_type_name TEXT NOT NULL,
        topic TEXT NOT NULL,
        group_code TEXT,
        dynamic_data_json TEXT NOT NULL,
        typed_content_html TEXT NOT NULL,
        mcq_answers_json TEXT DEFAULT '{}',
        drive_url TEXT,
        youtube_url TEXT,
        pdf_url TEXT,
        is_auto_graded INTEGER DEFAULT 0,
        
        -- Status & Timestamps
        status TEXT DEFAULT 'Submitted', -- Submitted, Under Review, Assessed, Reopened
        is_late INTEGER DEFAULT 0,
        submitted_at TEXT NOT NULL,
        updated_at TEXT,
        
        FOREIGN KEY (teacher_id) REFERENCES teachers(id),
        FOREIGN KEY (roster_id) REFERENCES teacher_rosters(id),
        FOREIGN KEY (created_assessment_id) REFERENCES created_assessments(id)
    )
    """)

    # 10. Evaluations (Confidential Marks & Faculty Remarks)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS evaluations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        submission_id INTEGER NOT NULL UNIQUE,
        marks_obtained REAL NOT NULL,
        maximum_marks REAL NOT NULL,
        remarks TEXT,
        evaluated_by_teacher_id INTEGER NOT NULL,
        evaluated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (submission_id) REFERENCES submissions(id),
        FOREIGN KEY (evaluated_by_teacher_id) REFERENCES teachers(id)
    )
    """)

    # 11. Audit Logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        submission_id INTEGER,
        action TEXT NOT NULL,
        performed_by TEXT NOT NULL,
        role TEXT NOT NULL,
        details TEXT,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (submission_id) REFERENCES submissions(id)
    )
    """)

    # 12. Teacher Announcements / Notices
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS teacher_announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        target_class TEXT NOT NULL DEFAULT 'ALL',
        reference_url TEXT,
        email_sent_count INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
    """)

    # 13. Teacher Study Materials & Links (अभ्यास साहित्य व लिंक्स)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS teacher_study_materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL,
        class_name TEXT NOT NULL,
        subject_name TEXT NOT NULL,
        topic_title TEXT NOT NULL,
        resource_type TEXT NOT NULL DEFAULT 'Web Link', -- YouTube Video, Google Drive Notes, Online PDF Document, Web Article / Reference
        resource_url TEXT NOT NULL,
        description TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
    """)

    # 14. Student Dismissed Announcements
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS student_dismissed_announcements (
        prn TEXT NOT NULL,
        announcement_id INTEGER NOT NULL,
        dismissed_at TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (prn, announcement_id)
    )
    """)

    # 15. Admin Announcements / Official Circulars for Teachers (शिक्षकांसाठी प्रशासकीय सूचना व परिपत्रके)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin_announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        priority TEXT DEFAULT 'NORMAL', -- NORMAL, IMPORTANT, URGENT
        badge_type TEXT DEFAULT 'OFFICIAL', -- OFFICIAL, CIRCULAR, URGENT, UPDATE
        reference_url TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 15. Master Faculty Streams / Disciplines (Dynamic Admin Configuration)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS master_streams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stream_name TEXT NOT NULL UNIQUE,
        display_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 16. Master Subjects per Stream (Dynamic Admin Configuration)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS master_subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stream_id INTEGER,
        stream_name TEXT NOT NULL,
        subject_name TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (stream_id) REFERENCES master_streams(id) ON DELETE CASCADE
    )
    """)

    # 17. Master Classes per Stream (Dynamic Admin Configuration)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS master_classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stream_id INTEGER,
        stream_name TEXT NOT NULL,
        class_name TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (stream_id) REFERENCES master_streams(id) ON DELETE CASCADE
    )
    """)

    # Column migrations
    try:
        # teacher_subjects migrations
        cursor.execute("PRAGMA table_info(teacher_subjects)")
        cols_sub = [row['name'] if isinstance(row, sqlite3.Row) else row[1] for row in cursor.fetchall()]
        if 'program_code' not in cols_sub:
            cursor.execute("ALTER TABLE teacher_subjects ADD COLUMN program_code TEXT")
        if 'program_name' not in cols_sub:
            cursor.execute("ALTER TABLE teacher_subjects ADD COLUMN program_name TEXT")

        # created_assessments migrations
        cursor.execute("PRAGMA table_info(created_assessments)")
        cols_ca = [row['name'] if isinstance(row, sqlite3.Row) else row[1] for row in cursor.fetchall()]
        if 'is_mcq' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN is_mcq INTEGER DEFAULT 0")
        if 'mcq_questions_json' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN mcq_questions_json TEXT DEFAULT '[]'")
        if 'is_individual_topics' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN is_individual_topics INTEGER DEFAULT 0")
        if 'student_topics_json' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN student_topics_json TEXT DEFAULT '{}'")
        if 'student_groups_json' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN student_groups_json TEXT DEFAULT '{}'")
        if 'study_materials_json' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN study_materials_json TEXT DEFAULT '[]'")
        if 'target_students_json' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN target_students_json TEXT DEFAULT '[]'")
        if 'meeting_url' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN meeting_url TEXT")
        if 'meeting_time' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN meeting_time TEXT")
        if 'duration_minutes' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN duration_minutes INTEGER DEFAULT 0")

        # submissions migrations
        cursor.execute("PRAGMA table_info(submissions)")
        cols_s = [row['name'] if isinstance(row, sqlite3.Row) else row[1] for row in cursor.fetchall()]
        if 'mcq_answers_json' not in cols_s:
            cursor.execute("ALTER TABLE submissions ADD COLUMN mcq_answers_json TEXT DEFAULT '{}'")
        if 'is_auto_graded' not in cols_s:
            cursor.execute("ALTER TABLE submissions ADD COLUMN is_auto_graded INTEGER DEFAULT 0")
        if 'assigned_individual_topic' not in cols_s:
            cursor.execute("ALTER TABLE submissions ADD COLUMN assigned_individual_topic TEXT")
        if 'drive_url' not in cols_s:
            cursor.execute("ALTER TABLE submissions ADD COLUMN drive_url TEXT")
        if 'youtube_url' not in cols_s:
            cursor.execute("ALTER TABLE submissions ADD COLUMN youtube_url TEXT")
        if 'pdf_url' not in cols_s:
            cursor.execute("ALTER TABLE submissions ADD COLUMN pdf_url TEXT")

        # created_assessments migrations
        cursor.execute("PRAGMA table_info(created_assessments)")
        cols_ca = [row['name'] if isinstance(row, sqlite3.Row) else row[1] for row in cursor.fetchall()]
        if 'show_marks_to_students' not in cols_ca:
            cursor.execute("ALTER TABLE created_assessments ADD COLUMN show_marks_to_students INTEGER DEFAULT 1")

        # teachers migrations for validity and extension
        cursor.execute("PRAGMA table_info(teachers)")
        cols_tch = [row['name'] if isinstance(row, sqlite3.Row) else row[1] for row in cursor.fetchall()]
        if 'validity_start' not in cols_tch:
            cursor.execute("ALTER TABLE teachers ADD COLUMN validity_start TEXT")
        if 'validity_end' not in cols_tch:
            cursor.execute("ALTER TABLE teachers ADD COLUMN validity_end TEXT")
        if 'academic_year' not in cols_tch:
            cursor.execute("ALTER TABLE teachers ADD COLUMN academic_year TEXT DEFAULT '2026–27'")
        if 'extension_requested' not in cols_tch:
            cursor.execute("ALTER TABLE teachers ADD COLUMN extension_requested INTEGER DEFAULT 0")
        if 'extension_requested_at' not in cols_tch:
            cursor.execute("ALTER TABLE teachers ADD COLUMN extension_requested_at TEXT")
        if 'extension_requested_year' not in cols_tch:
            cursor.execute("ALTER TABLE teachers ADD COLUMN extension_requested_year TEXT")
        if 'approval_type' not in cols_tch:
            cursor.execute("ALTER TABLE teachers ADD COLUMN approval_type TEXT DEFAULT 'new'")

        ADMIN_EMAIL = 'rajushikalgar@gmail.com'

        # Initialize existing approved teachers with standard academic year validity if NULL
        acad_yr, val_start, val_end = get_current_academic_year()
        cursor.execute("""
        UPDATE teachers 
        SET validity_start = ?, validity_end = ?, academic_year = COALESCE(academic_year, ?)
        WHERE status = 'approved' AND (validity_end IS NULL OR validity_end = '')
        """, (val_start, val_end, acad_yr))
    except Exception as e:
        print("Migration notice:", e)

    # Normalize all teacher codes in database to clean uppercase
    cursor.execute("UPDATE teachers SET teacher_code = UPPER(teacher_code) WHERE teacher_code IS NOT NULL")

    # High-Performance Indexes for Instant Queries
    indexes = [
        "CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status)",
        "CREATE INDEX IF NOT EXISTS idx_teachers_stream ON teachers(faculty_stream)",
        "CREATE INDEX IF NOT EXISTS idx_teachers_email ON teachers(email)",
        "CREATE INDEX IF NOT EXISTS idx_teachers_code ON teachers(teacher_code)",
        
        "CREATE INDEX IF NOT EXISTS idx_roster_teacher ON teacher_rosters(teacher_id)",
        "CREATE INDEX IF NOT EXISTS idx_roster_teacher_class ON teacher_rosters(teacher_id, class_name)",
        "CREATE INDEX IF NOT EXISTS idx_roster_prn ON teacher_rosters(prn)",
        "CREATE INDEX IF NOT EXISTS idx_roster_teacher_prn ON teacher_rosters(teacher_id, prn)",
        
        "CREATE INDEX IF NOT EXISTS idx_ts_teacher ON teacher_subjects(teacher_id)",
        "CREATE INDEX IF NOT EXISTS idx_ts_stream ON teacher_subjects(faculty_stream)",
        
        "CREATE INDEX IF NOT EXISTS idx_tam_teacher_sub ON teacher_assignment_mappings(teacher_id, subject_id)",
        
        "CREATE INDEX IF NOT EXISTS idx_ca_teacher ON created_assessments(teacher_id)",
        "CREATE INDEX IF NOT EXISTS idx_ca_subject ON created_assessments(subject_id)",
        "CREATE INDEX IF NOT EXISTS idx_ca_teacher_subject ON created_assessments(teacher_id, subject_id)",
        
        "CREATE INDEX IF NOT EXISTS idx_sub_teacher ON submissions(teacher_id)",
        "CREATE INDEX IF NOT EXISTS idx_sub_created_asm ON submissions(created_assessment_id)",
        "CREATE INDEX IF NOT EXISTS idx_sub_roster_asm ON submissions(roster_id, created_assessment_id)",
        "CREATE INDEX IF NOT EXISTS idx_sub_teacher_prn ON submissions(teacher_id, prn)",
        "CREATE INDEX IF NOT EXISTS idx_sub_status ON submissions(status)",
        "CREATE INDEX IF NOT EXISTS idx_sub_code ON submissions(submission_id)",
        
        "CREATE INDEX IF NOT EXISTS idx_eval_sub ON evaluations(submission_id)",
        "CREATE INDEX IF NOT EXISTS idx_eval_teacher ON evaluations(evaluated_by_teacher_id)",
        
        "CREATE INDEX IF NOT EXISTS idx_audit_sub ON audit_logs(submission_id)",
        
        "CREATE INDEX IF NOT EXISTS idx_ann_teacher ON teacher_announcements(teacher_id)",
        "CREATE INDEX IF NOT EXISTS idx_mat_teacher ON teacher_study_materials(teacher_id)",
        "CREATE INDEX IF NOT EXISTS idx_admin_ann_active ON admin_announcements(is_active, id DESC)"
    ]
    for idx_sql in indexes:
        try:
            cursor.execute(idx_sql)
        except Exception:
            pass

    cursor.execute("PRAGMA optimize")

    conn.commit()
    conn.close()

def seed_database():
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Seed / Ensure Admin with username, email, and password
    admin_user = os.environ.get('ADMIN_USERNAME', 'rajekhan.in').strip()
    admin_email = os.environ.get('ADMIN_EMAIL', 'rajushikalgar@gmail.com').strip()
    raw_admin_pwd = os.environ.get('ADMIN_PASSWORD', 'Saeed:Saud2').strip()
    admin_pwd_hash = hash_password(raw_admin_pwd)
    cursor.execute("SELECT id FROM admins WHERE username = 'rajekhan.in' OR username = 'admin' OR email = 'rajushikalgar@gmail.com'")
    existing_admin = cursor.fetchone()
    if existing_admin:
        cursor.execute("""
        UPDATE admins 
        SET username = ?, email = ?, password_hash = ?, name = ? 
        WHERE id = ?
        """, (admin_user, admin_email, admin_pwd_hash, 'Dr. Rajekhan Shikalgar', existing_admin['id']))
    else:
        cursor.execute("""
        INSERT INTO admins (username, email, name, password_hash)
        VALUES (?, ?, ?, ?)
        """, (admin_user, admin_email, 'Dr. Rajekhan Shikalgar', admin_pwd_hash))
    conn.commit()

    # 2. Seed & Synchronize Standard CIE Assessment Types
    master_assessment_types = [
        ("Seminar", "Academic presentation on curriculum topic", 0, [
            {"id": "seminar_title", "label": "Seminar Title", "type": "text", "required": True, "placeholder": "e.g. Fluvial Landforms in Western Ghats"},
            {"id": "topic", "label": "Seminar Topic", "type": "text", "required": True, "placeholder": "Specific focused topic"},
            {"id": "presentation_date", "label": "Presentation Date", "type": "date", "required": True},
            {"id": "introduction", "label": "Introduction & Background", "type": "textarea", "required": True, "placeholder": "Brief introductory context..."},
            {"id": "objectives", "label": "Objectives of Seminar", "type": "textarea", "required": True, "placeholder": "1. Understand... 2. Analyze..."},
            {"id": "conclusion", "label": "Conclusion", "type": "textarea", "required": True, "placeholder": "Summary of points..."},
            {"id": "learning_outcome", "label": "Learning Outcome", "type": "textarea", "required": True, "placeholder": "Key conceptual takeaway..."}
        ]),
        ("Unit Test", "Periodic classroom assessment test", 0, [
            {"id": "test_title", "label": "Unit Test Title", "type": "text", "required": True, "placeholder": "e.g. Unit Test I"},
            {"id": "test_date", "label": "Test Date", "type": "date", "required": True},
            {"id": "unit_covered", "label": "Units / Chapters Covered", "type": "text", "required": True, "placeholder": "e.g. Unit 1 & 2"},
            {"id": "num_questions", "label": "Number of Questions", "type": "number", "required": True, "placeholder": "e.g. 5"}
        ]),
        ("Mid Term Test", "Mid-semester periodic comprehensive evaluation test", 0, [
            {"id": "test_title", "label": "Mid Term Test Title", "type": "text", "required": True, "placeholder": "e.g. Mid Term Examination (सत्र मध्य परीक्षा)"},
            {"id": "test_date", "label": "Test Date", "type": "date", "required": True},
            {"id": "units_covered", "label": "Units / Topics Covered", "type": "text", "required": True, "placeholder": "e.g. Unit 1, 2 & 3"},
            {"id": "num_questions", "label": "Number of Questions", "type": "number", "required": True, "placeholder": "e.g. 5"},
            {"id": "learning_outcome", "label": "Learning Outcome", "type": "textarea", "required": True, "placeholder": "Key conceptual clarity achieved..."}
        ]),
        ("Open Book Examination", "Higher-order analytical and conceptual open book examination", 0, [
            {"id": "exam_title", "label": "Exam Title", "type": "text", "required": True, "placeholder": "e.g. Open Book Analytical Assessment (मुक्त पुस्तक परीक्षा)"},
            {"id": "exam_date", "label": "Exam Date", "type": "date", "required": True},
            {"id": "allowed_materials", "label": "Allowed Materials & References", "type": "text", "required": True, "placeholder": "Textbooks, reference manuals, journals permitted"},
            {"id": "core_question", "label": "Analytical Question / Problem Assigned", "type": "textarea", "required": True, "placeholder": "Core analytical problem or question..."},
            {"id": "critical_analysis", "label": "Critical Analysis & Synthesis", "type": "textarea", "required": True, "placeholder": "Synthesized arguments, evidence, and critical evaluation..."}
        ]),
        ("Research Paper Review", "Critical appraisal and structured review of published academic research", 0, [
            {"id": "paper_title", "label": "Research Paper Title", "type": "text", "required": True, "placeholder": "e.g. Remote Sensing Applications in Watershed Management"},
            {"id": "journal_author", "label": "Author(s) & Publication Details", "type": "text", "required": True, "placeholder": "e.g. Dr. Patil et al., Indian Geographical Journal (2025)"},
            {"id": "research_objectives", "label": "Objectives & Methodology", "type": "textarea", "required": True, "placeholder": "Research objectives, hypothesis, and methodology..."},
            {"id": "key_findings", "label": "Key Findings & Conclusions", "type": "textarea", "required": True, "placeholder": "Key empirical findings and insights..."},
            {"id": "critical_review", "label": "Student's Critical Review", "type": "textarea", "required": True, "placeholder": "Critique of methodology, strengths, and future scope..."}
        ]),
        ("Problem Solving", "Structured problem identification, algorithmic solution and optimization", 0, [
            {"id": "problem_title", "label": "Problem Scenario Title", "type": "text", "required": True, "placeholder": "e.g. Water Resource Optimization Model"},
            {"id": "problem_statement", "label": "Problem Statement & Context", "type": "textarea", "required": True, "placeholder": "Detailed description of the problem/case..."},
            {"id": "methodology", "label": "Methodology & Solution Strategy", "type": "textarea", "required": True, "placeholder": "Step-by-step logic, equations, or techniques..."},
            {"id": "solution_results", "label": "Derived Solution & Verification", "type": "textarea", "required": True, "placeholder": "Solution obtained and verification steps..."},
            {"id": "practical_outcome", "label": "Practical Implications & Takeaway", "type": "textarea", "required": True, "placeholder": "Real-world significance and recommendations..."}
        ]),
        ("Book Review", "Comprehensive literary or academic text analysis and review", 0, [
            {"id": "book_title", "label": "Book Title & Author", "type": "text", "required": True, "placeholder": "e.g. Principles of Geomorphology by W.D. Thornbury"},
            {"id": "publisher_year", "label": "Publisher & Edition", "type": "text", "required": True, "placeholder": "e.g. John Wiley & Sons, Reprint Edition"},
            {"id": "book_theme", "label": "Central Theme & Overview", "type": "textarea", "required": True, "placeholder": "Core subject matter, chapter summary, and structural flow..."},
            {"id": "critical_appreciation", "label": "Critical Appreciation & Analysis", "type": "textarea", "required": True, "placeholder": "Analytical review of key concepts, style, and depth..."},
            {"id": "learning_relevance", "label": "Relevance to Syllabus & Learning", "type": "textarea", "required": True, "placeholder": "How this book enriched subject understanding..."}
        ]),
        ("Group Discussion", "Collaborative topic deliberation", 1, [
            {"id": "group_name", "label": "Group Name", "type": "text", "required": True, "placeholder": "e.g. Discussion Group 3"},
            {"id": "discussion_topic", "label": "Discussion Topic", "type": "text", "required": True, "placeholder": "e.g. Climate Impact on Monsoons"},
            {"id": "discussion_date", "label": "Date of Discussion", "type": "date", "required": True},
            {"id": "group_members", "label": "Group Members", "type": "textarea", "required": True, "placeholder": "Names & Roll Nos of all members..."},
            {"id": "individual_contribution", "label": "Student's Individual Contribution", "type": "textarea", "required": True, "placeholder": "Key points argued by you..."},
            {"id": "discussion_summary", "label": "Summary of Consensus", "type": "textarea", "required": True, "placeholder": "Collective outcome of discussion..."}
        ]),
        ("Case Study", "In-depth investigation of phenomenon or region", 0, [
            {"id": "case_title", "label": "Case Study Title", "type": "text", "required": True, "placeholder": "e.g. Drought Management in Marathwada"},
            {"id": "study_area", "label": "Study Area / Region", "type": "text", "required": True, "placeholder": "e.g. Beed & Jalna Districts"},
            {"id": "background", "label": "Background & Context", "type": "textarea", "required": True, "placeholder": "Setting and history..."},
            {"id": "problem_statement", "label": "Problem Statement", "type": "textarea", "required": True, "placeholder": "Core challenge observed..."},
            {"id": "findings", "label": "Key Findings & Observations", "type": "textarea", "required": True, "placeholder": "Critical insights..."},
            {"id": "conclusion", "label": "Conclusion & Recommendations", "type": "textarea", "required": True, "placeholder": "Sustainable solutions..."}
        ]),
        ("Group Activity", "Collaborative team assignment or exercise", 1, [
            {"id": "group_name", "label": "Group Name", "type": "text", "required": True, "placeholder": "e.g. Team Explorer"},
            {"id": "activity_title", "label": "Activity Title", "type": "text", "required": True, "placeholder": "e.g. Field Survey Exercise"},
            {"id": "objectives", "label": "Activity Objectives", "type": "textarea", "required": True, "placeholder": "Objectives..."},
            {"id": "group_members", "label": "Group Members", "type": "textarea", "required": True, "placeholder": "List members..."},
            {"id": "individual_contribution", "label": "Student's Contribution", "type": "textarea", "required": True, "placeholder": "Your tasks performed..."},
            {"id": "outcome", "label": "Activity Outcome", "type": "textarea", "required": True, "placeholder": "Results achieved..."}
        ]),
        ("Oral Examination", "Verbal evaluation on theory and concepts", 0, [
            {"id": "exam_title", "label": "Oral Exam Title", "type": "text", "required": True, "placeholder": "e.g. Theory Viva Assessment"},
            {"id": "exam_date", "label": "Examination Date", "type": "date", "required": True},
            {"id": "topics_covered", "label": "Topics Assessed", "type": "text", "required": True, "placeholder": "Core syllabus modules"},
            {"id": "questions_discussed", "label": "Key Questions Answered", "type": "textarea", "required": True, "placeholder": "Questions asked..."},
            {"id": "learning_outcome", "label": "Learning Outcome", "type": "textarea", "required": True, "placeholder": "Clarity achieved..."}
        ]),
        ("Project Work", "Comprehensive academic or field-based project", 1, [
            {"id": "project_title", "label": "Project Title", "type": "text", "required": True, "placeholder": "e.g. Basin Morphometry Analysis"},
            {"id": "study_area", "label": "Study Area / Region", "type": "text", "required": True, "placeholder": "Study Region"},
            {"id": "objectives", "label": "Objectives", "type": "textarea", "required": True, "placeholder": "Research objectives..."},
            {"id": "methodology", "label": "Methodology Used", "type": "textarea", "required": True, "placeholder": "Data sources and methods..."},
            {"id": "findings", "label": "Key Findings", "type": "textarea", "required": True, "placeholder": "Major discoveries..."},
            {"id": "conclusion", "label": "Conclusion", "type": "textarea", "required": True, "placeholder": "Project summary..."}
        ]),
        ("Quiz", "Objective or structured questions quiz", 0, [
            {"id": "quiz_title", "label": "Quiz Title", "type": "text", "required": True, "placeholder": "e.g. Climatology Quiz"},
            {"id": "topic", "label": "Quiz Topic", "type": "text", "required": True, "placeholder": "Topic covered"},
            {"id": "quiz_date", "label": "Quiz Date", "type": "date", "required": True},
            {"id": "num_questions", "label": "Number of Questions", "type": "number", "required": True, "placeholder": "e.g. 10"}
        ]),
        ("Class Assignment", "In-class structured writing assignment", 0, [
            {"id": "assignment_title", "label": "Assignment Title", "type": "text", "required": True, "placeholder": "e.g. Economic Geography Assignment"},
            {"id": "topic", "label": "Topic", "type": "text", "required": True, "placeholder": "Topic"},
            {"id": "introduction", "label": "Introduction", "type": "textarea", "required": True, "placeholder": "Overview..."},
            {"id": "conclusion", "label": "Conclusion", "type": "textarea", "required": True, "placeholder": "Concluding remarks..."}
        ]),
        ("Home Assignment", "Take-home comprehensive writing assignment", 0, [
            {"id": "assignment_title", "label": "Home Assignment Title", "type": "text", "required": True, "placeholder": "e.g. Climatic Classification Analysis"},
            {"id": "topic", "label": "Topic", "type": "text", "required": True, "placeholder": "Topic"},
            {"id": "introduction", "label": "Introduction", "type": "textarea", "required": True, "placeholder": "Context..."},
            {"id": "conclusion", "label": "Conclusion", "type": "textarea", "required": True, "placeholder": "Conclusions..."},
            {"id": "references", "label": "References / Books Consulted", "type": "textarea", "required": True, "placeholder": "Citations..."}
        ]),
        ("Assessment of Journal", "Continuous evaluation of laboratory journal", 0, [
            {"id": "journal_title", "label": "Journal Title", "type": "text", "required": True, "placeholder": "e.g. Practical Cartography Journal"},
            {"id": "total_practicals", "label": "Total Practicals Completed", "type": "number", "required": True, "placeholder": "e.g. 10"},
            {"id": "practicals_index", "label": "Index of Practicals", "type": "textarea", "required": True, "placeholder": "List of practical exercises..."}
        ]),
        ("Assessment of Practical Notebook", "Lab notebook record evaluation", 0, [
            {"id": "notebook_title", "label": "Notebook Title", "type": "text", "required": True, "placeholder": "e.g. Surveying Notebook"},
            {"id": "practical_number", "label": "Practical Exercise Number(s)", "type": "text", "required": True, "placeholder": "e.g. Practicals 1 to 6"}
        ]),
        ("Field Work", "Field survey, geographic excursion and ground observation", 0, [
            {"id": "field_title", "label": "Field Work Title", "type": "text", "required": True, "placeholder": "e.g. Coastal Landform Study Excursion"},
            {"id": "location", "label": "Location", "type": "text", "required": True, "placeholder": "Field location"},
            {"id": "field_dates", "label": "Field Date(s)", "type": "text", "required": True, "placeholder": "Dates"},
            {"id": "findings", "label": "Observations & Findings", "type": "textarea", "required": True, "placeholder": "Observations..."}
        ]),
        ("Map Work", "Cartographic map reading and drafting exercises", 0, [
            {"id": "map_title", "label": "Map Work Title", "type": "text", "required": True, "placeholder": "e.g. Toposheet 47 L/3 Geomorphological Interpretation"},
            {"id": "map_type", "label": "Type of Map / Projection", "type": "text", "required": True, "placeholder": "e.g. Topographical Map / Zenithal Equal Area Projection"},
            {"id": "scale_symbols", "label": "Scale & Conventional Signs Used", "type": "text", "required": True, "placeholder": "e.g. R.F. 1:50,000, Contour Interval 20m"},
            {"id": "map_interpretation", "label": "Interpretation & Key Observations", "type": "textarea", "required": True, "placeholder": "Drainage patterns, slope analysis, settlement distribution..."}
        ]),
        ("Presentation", "Classroom slide presentation & defense", 0, [
            {"id": "presentation_title", "label": "Presentation Title", "type": "text", "required": True, "placeholder": "e.g. Remote Sensing Applications in Land Use Analysis"},
            {"id": "topic", "label": "Presentation Topic", "type": "text", "required": True, "placeholder": "Specific presentation theme"},
            {"id": "presentation_date", "label": "Presentation Date", "type": "date", "required": True},
            {"id": "slide_highlights", "label": "Key Slide Highlights & Overview", "type": "textarea", "required": True, "placeholder": "Summary of 5-10 core slides, conceptual diagrams and conclusions..."}
        ]),
        ("Poster Presentation", "Visual academic poster design and summary", 0, [
            {"id": "poster_title", "label": "Poster Title", "type": "text", "required": True, "placeholder": "e.g. Watershed Management & Soil Conservation"},
            {"id": "theme", "label": "Theme / Sub-area", "type": "text", "required": True, "placeholder": "Theme / Concept"},
            {"id": "presentation_date", "label": "Presentation Date", "type": "date", "required": True},
            {"id": "key_highlights", "label": "Key Highlights & Visual Points", "type": "textarea", "required": True, "placeholder": "Visual infographic highlights, diagrams, data points, and message..."}
        ]),
        ("Viva Voce", "Comprehensive oral evaluation", 0, [
            {"id": "viva_title", "label": "Viva Voce Title", "type": "text", "required": True, "placeholder": "e.g. Practical Cartography & Research Viva"},
            {"id": "viva_date", "label": "Examination Date", "type": "date", "required": True},
            {"id": "syllabus_units", "label": "Topics / Units Assessed", "type": "text", "required": True, "placeholder": "Core syllabus units assessed"},
            {"id": "key_questions", "label": "Key Questions Answered & Defense", "type": "textarea", "required": True, "placeholder": "Questions asked by evaluator and answers defended..."}
        ]),
        ("Research Activity", "Small-scale research inquiry or literature review", 0, [
            {"id": "research_title", "label": "Research Title", "type": "text", "required": True, "placeholder": "e.g. Urban Heat Island Effects in Kolhapur City"},
            {"id": "research_question", "label": "Research Question & Hypothesis", "type": "textarea", "required": True, "placeholder": "Primary research question, hypothesis and objective..."},
            {"id": "data_sources", "label": "Data Sources & Methodology", "type": "textarea", "required": True, "placeholder": "Primary/secondary data sources, field sampling methods..."},
            {"id": "findings_summary", "label": "Key Findings & Summary", "type": "textarea", "required": True, "placeholder": "Key observations, empirical conclusions, and references..."}
        ]),
        ("Classroom Activity", "Interactive classroom participatory assignment", 0, [
            {"id": "activity_title", "label": "Activity Title", "type": "text", "required": True, "placeholder": "e.g. Live Geological Map Decoding & Role-play"},
            {"id": "activity_date", "label": "Activity Date", "type": "date", "required": True},
            {"id": "activity_description", "label": "Activity Description & Tasks", "type": "textarea", "required": True, "placeholder": "Classroom task performed..."},
            {"id": "student_role", "label": "Student's Active Role & Takeaway", "type": "textarea", "required": True, "placeholder": "Individual contribution and key learning outcome..."}
        ]),
        ("Attendance / Participation", "Academic participation and regular attendance assessment", 0, [
            {"id": "record_period", "label": "Assessment Period / Semester", "type": "text", "required": True, "placeholder": "e.g. Academic Year 2026-27 (Semester V)"},
            {"id": "total_lectures", "label": "Total Lectures Conducted", "type": "number", "required": True, "placeholder": "e.g. 60"},
            {"id": "attended_lectures", "label": "Lectures Attended", "type": "number", "required": True, "placeholder": "e.g. 54"},
            {"id": "percentage", "label": "Attendance Percentage (%)", "type": "number", "required": True, "placeholder": "e.g. 90"}
        ]),
        ("Other", "Custom assessment type as defined by teacher", 0, [
            {"id": "custom_type_name", "label": "Custom Assessment Type Name", "type": "text", "required": True, "placeholder": "Enter custom assessment mode..."},
            {"id": "title", "label": "Assessment Title", "type": "text", "required": True, "placeholder": "Title of the assessment..."},
            {"id": "custom_details", "label": "Assessment Details & Submission", "type": "textarea", "required": True, "placeholder": "Specific instructions or details required by faculty..."}
        ])
    ]
    for name, desc, is_grp, fields in master_assessment_types:
        cursor.execute("SELECT id FROM assessment_types WHERE name = ?", (name,))
        existing = cursor.fetchone()
        if not existing:
            cursor.execute("""
            INSERT INTO assessment_types (name, description, is_group, fields_schema_json, is_active)
            VALUES (?, ?, ?, ?, 1)
            """, (name, desc, is_grp, json.dumps(fields)))
        else:
            cursor.execute("""
            UPDATE assessment_types 
            SET description = ?, is_group = ?, fields_schema_json = ?
            WHERE id = ?
            """, (desc, is_grp, json.dumps(fields), existing['id']))

    # 3. Mark database configuration initialized
    cursor.execute("CREATE TABLE IF NOT EXISTS system_config (key TEXT PRIMARY KEY, value TEXT)")
    cursor.execute("INSERT OR REPLACE INTO system_config (key, value) VALUES ('sample_data_seeded', '1')")

    # 4. Clean up legacy dummy demo accounts and all associated demo records
    dummy_cond = "email IN ('patil@college.edu', 'rajekhan@rajekhan.in') OR teacher_code IN ('TCH-RAJ-01', 'TCH-ECO-02') OR name LIKE '%Suresh Mohan Patil%' OR college_name LIKE '%Chhatrapati Shahu Arts College%'"
    cursor.execute(f"""
    DELETE FROM evaluations WHERE submission_id IN (
        SELECT id FROM submissions WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})
    )
    """)
    cursor.execute(f"""
    DELETE FROM audit_logs WHERE submission_id IN (
        SELECT id FROM submissions WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})
    )
    """)
    cursor.execute(f"DELETE FROM submissions WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})")
    cursor.execute(f"DELETE FROM created_assessments WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})")
    cursor.execute(f"DELETE FROM teacher_assignment_mappings WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})")
    cursor.execute(f"DELETE FROM teacher_subjects WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})")
    cursor.execute(f"DELETE FROM teacher_rosters WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})")
    cursor.execute(f"DELETE FROM teacher_study_materials WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})")
    cursor.execute(f"DELETE FROM student_dismissed_announcements WHERE announcement_id IN (SELECT id FROM teacher_announcements WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond}))")
    cursor.execute(f"DELETE FROM teacher_announcements WHERE teacher_id IN (SELECT id FROM teachers WHERE {dummy_cond})")
    cursor.execute(f"DELETE FROM teachers WHERE {dummy_cond}")

    # 5. Seed Master Streams, Subjects, and Classes if empty
    cursor.execute("SELECT COUNT(*) as cnt FROM master_streams")
    if cursor.fetchone()['cnt'] == 0:
        seed_master_mapping_defaults(cursor)

    conn.commit()
    conn.close()

def seed_master_mapping_defaults(cursor):
    """Seed master streams, subjects, and classes from canonical MASTER_DISCIPLINES and MASTER_STREAM_CLASSES."""
    cursor.execute("DELETE FROM master_subjects")
    cursor.execute("DELETE FROM master_classes")
    cursor.execute("DELETE FROM master_streams")
    
    canonical_11_streams = [
        "कला व ललित कला (Arts & Fine Arts)",
        "विज्ञान (Science)",
        "वाणिज्य व व्यवस्थापन (Commerce & Management)",
        "कृषी व संलग्न विज्ञान (Agriculture & Allied Sciences)",
        "अभियांत्रिकी व तंत्रज्ञान (Engineering & Technology)",
        "वैद्यकीय, फार्मसी व आरोग्य विज्ञान (Medical, Pharmacy & Health Sciences)",
        "विधी व कायदेविषयक अभ्यास (Law & Legal Studies)",
        "शिक्षणशास्त्र व शारीरिक शिक्षण (Education & Physical Education)",
        "मानव्यविद्या व सामाजिक शास्त्रे (Humanities & Social Sciences)",
        "आंतरविद्याशाखा (Interdisciplinary)",
        "इतर / विशेष विद्याशाखा (Other / Custom Faculty Stream)"
    ]
    
    stream_order = 1
    for stream_name in canonical_11_streams:
        subjects = MASTER_DISCIPLINES.get(stream_name, [])
        cursor.execute("""
        INSERT INTO master_streams (stream_name, display_order, is_active)
        VALUES (?, ?, 1)
        """, (stream_name, stream_order))
        stream_id = cursor.lastrowid
        stream_order += 1
        
        # Insert subjects
        sub_order = 1
        for sub_name in subjects:
            cursor.execute("""
            INSERT INTO master_subjects (stream_id, stream_name, subject_name, display_order, is_active)
            VALUES (?, ?, ?, ?, 1)
            """, (stream_id, stream_name, sub_name, sub_order))
            sub_order += 1
            
        # Insert classes
        classes = MASTER_STREAM_CLASSES.get(stream_name, [])
        cls_order = 1
        for cls_name in classes:
            cursor.execute("""
            INSERT INTO master_classes (stream_id, stream_name, class_name, display_order, is_active)
            VALUES (?, ?, ?, ?, 1)
            """, (stream_id, stream_name, cls_name, cls_order))
            cls_order += 1

def get_db_master_disciplines():
    """Retrieve active streams and their active subjects dynamically from database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, stream_name FROM master_streams WHERE is_active = 1 ORDER BY display_order ASC, id ASC")
    streams = cursor.fetchall()
    
    disciplines = {}
    for s in streams:
        cursor.execute("SELECT subject_name FROM master_subjects WHERE stream_id = ? AND is_active = 1 ORDER BY display_order ASC, id ASC", (s['id'],))
        subs = [r['subject_name'] for r in cursor.fetchall()]
        disciplines[s['stream_name']] = subs
    conn.close()
    return disciplines if disciplines else MASTER_DISCIPLINES

def get_db_stream_classes():
    """Retrieve active stream classes dynamically from database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, stream_name FROM master_streams WHERE is_active = 1 ORDER BY display_order ASC, id ASC")
    streams = cursor.fetchall()
    
    stream_classes = {}
    for s in streams:
        cursor.execute("SELECT class_name FROM master_classes WHERE stream_id = ? AND is_active = 1 ORDER BY display_order ASC, id ASC", (s['id'],))
        classes = [r['class_name'] for r in cursor.fetchall()]
        stream_classes[s['stream_name']] = classes
    conn.close()
    return stream_classes if stream_classes else MASTER_STREAM_CLASSES

def get_all_master_mapping_data():
    """Retrieve comprehensive master mapping data for Admin management."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, stream_name, display_order, is_active, created_at FROM master_streams ORDER BY display_order ASC, id ASC")
    streams = [dict(r) for r in cursor.fetchall()]
    
    cursor.execute("""
    SELECT s.id, s.stream_id, s.stream_name, s.subject_name, s.display_order, s.is_active, s.created_at, ms.stream_name as parent_stream_name
    FROM master_subjects s
    LEFT JOIN master_streams ms ON s.stream_id = ms.id
    ORDER BY s.stream_name ASC, s.display_order ASC, s.id ASC
    """)
    subjects = [dict(r) for r in cursor.fetchall()]
    
    cursor.execute("""
    SELECT c.id, c.stream_id, c.stream_name, c.class_name, c.display_order, c.is_active, c.created_at, ms.stream_name as parent_stream_name
    FROM master_classes c
    LEFT JOIN master_streams ms ON c.stream_id = ms.id
    ORDER BY c.stream_name ASC, c.display_order ASC, c.id ASC
    """)
    classes = [dict(r) for r in cursor.fetchall()]
    
    cursor.execute("SELECT id, name, description, is_group, is_active FROM assessment_types ORDER BY id ASC")
    assessment_types = [dict(r) for r in cursor.fetchall()]
    
    conn.close()
    return {
        "streams": streams,
        "subjects": subjects,
        "classes": classes,
        "assessment_types": assessment_types
    }

def reset_master_mapping_to_defaults():
    """Reset all master mapping data to default standard values."""
    conn = get_db_connection()
    cursor = conn.cursor()
    seed_master_mapping_defaults(cursor)
    conn.commit()
    conn.close()

def generate_next_submission_id(year_str=None, offset=0):
    if not year_str:
        year_str = str(datetime.datetime.now().year)
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT submission_id FROM submissions WHERE submission_id LIKE ? ORDER BY id DESC LIMIT 1",
                   (f"RAJ-IA-{year_str}-%",))
    row = cursor.fetchone()
    if row:
        last_id = row['submission_id']
        parts = last_id.split('-')
        if len(parts) == 4 and parts[3].isdigit():
            next_seq = int(parts[3]) + 1
        else:
            next_seq = 1
    else:
        next_seq = 101
    conn.close()
    return f"RAJ-IA-{year_str}-{(next_seq + offset):06d}"
