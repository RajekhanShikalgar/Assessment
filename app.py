import random
import uuid
import os
import io
import gzip
import json
import csv
import zipfile
import re
import datetime
import time
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass
from flask import (
    Flask, render_template, request, jsonify, send_file, session, Response
)
import qrcode
import smtplib
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

import database
import pdf_generator

import jinja2

template_dirs = [
    os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates'),
    os.path.dirname(os.path.abspath(__file__)),
    'templates',
    '.'
]
valid_template_dirs = [d for d in template_dirs if os.path.exists(d)]

app = Flask(__name__, template_folder='templates', static_folder='static')
if valid_template_dirs:
    app.jinja_loader = jinja2.ChoiceLoader([jinja2.FileSystemLoader(d) for d in valid_template_dirs])
app.secret_key = os.environ.get("SECRET_KEY", "rajekhan_internal_assessment_secret_key_2026")
app.config['JSON_SORT_KEYS'] = False
app.config['SESSION_COOKIE_NAME'] = 'ciems_session'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Crucial for cross-site / iframe / Blogger embedding
app.config['PERMANENT_SESSION_LIFETIME'] = datetime.timedelta(days=7)
app.jinja_env.cache_size = 400  # Cache up to 400 compiled templates in memory

@app.before_request
def handle_options_and_session():
    if request.method == 'OPTIONS':
        res = Response()
        origin = request.headers.get('Origin') or '*'
        res.headers['Access-Control-Allow-Origin'] = origin
        res.headers['Access-Control-Allow-Credentials'] = 'true'
        res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Auth-Token, X-Requested-With, Accept, Origin'
        res.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        return res
    session.permanent = False

# ----------------- Automatic Cloud Sync & Database Initialization -----------------
try:
    database.restore_database_from_cloud()
except Exception as _e_rest:
    print("[CLOUD SYNC STARTUP NOTICE]", _e_rest)

database.init_db()
database.seed_database()

# Periodic Background Cloud Backup (Every 10 minutes)
def _periodic_cloud_backup():
    while True:
        try:
            time.sleep(300)
            database.backup_database_to_cloud_async()
        except Exception:
            pass

_backup_bg_thread = threading.Thread(target=_periodic_cloud_backup, daemon=True)
_backup_bg_thread.start()

# ----------------- Server-Side In-Memory Cache -----------------
_admin_stats_cache = {'data': None, 'ts': 0}
_STATS_CACHE_TTL = 30  # seconds

# ----------------- EMAIL NOTIFICATION SERVICE -----------------
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'rajushikalgar@gmail.com')
ADMIN_NAME = os.environ.get('ADMIN_NAME', 'Continuous Internal Evaluation Admin (प्रशासक)')
SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USER = os.environ.get('SMTP_USER', 'rajushikalgar@gmail.com').strip()
SMTP_PASS = os.environ.get('SMTP_PASS', '').strip().replace(' ', '')
APP_BASE_URL = os.environ.get('APP_BASE_URL', 'https://rajekhan.in')

def send_email_async(to_email, subject, html_content, text_content=None, from_email=None, from_name=None):
    if not from_email:
        from_email = ADMIN_EMAIL
    if not from_name:
        from_name = ADMIN_NAME
    thread = threading.Thread(
        target=_send_email_worker,
        args=(to_email, subject, html_content, text_content, from_email, from_name),
        daemon=True
    )
    thread.start()
    return True

def _send_email_http_relay(relay_url, to_email, subject, html_content, text_content=None, from_name=None):
    import urllib.request
    import json
    payload = {
        'to': to_email,
        'subject': subject,
        'html': html_content,
        'text': text_content or '',
        'from_name': from_name or ADMIN_NAME
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        relay_url,
        data=data,
        headers={'Content-Type': 'application/json', 'User-Agent': 'CIEMS-Portal/1.0'}
    )
    with urllib.request.urlopen(req, timeout=15) as response:
        return response.read().decode('utf-8')

def _send_email_brevo_api(brevo_api_key, to_email, subject, html_content, text_content=None, from_email=None, from_name=None):
    import urllib.request
    import json
    sender_email = from_email or os.environ.get('SMTP_USER', SMTP_USER).strip() or ADMIN_EMAIL
    payload = {
        'sender': {'name': from_name or ADMIN_NAME, 'email': sender_email},
        'to': [{'email': to_email}],
        'subject': subject,
        'htmlContent': html_content
    }
    if text_content:
        payload['textContent'] = text_content
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        'https://api.brevo.com/v3/smtp/email',
        data=data,
        headers={
            'accept': 'application/json',
            'api-key': brevo_api_key,
            'content-type': 'application/json'
        }
    )
    with urllib.request.urlopen(req, timeout=15) as response:
        return response.read().decode('utf-8')

def _send_email_worker(to_email, subject, html_content, text_content=None, from_email=None, from_name=None):
    if not to_email:
        return False
    if not from_email:
        from_email = ADMIN_EMAIL
    if not from_name:
        from_name = ADMIN_NAME

    gmail_relay_url = os.environ.get('GMAIL_RELAY_URL', '').strip()
    brevo_api_key = os.environ.get('BREVO_API_KEY', '').strip()
    resend_api_key = os.environ.get('RESEND_API_KEY', '').strip()

    # 1. Preferred for Render: Google Apps Script Web App HTTPS Relay (Port 443, No SMTP Block)
    if gmail_relay_url:
        try:
            res = _send_email_http_relay(gmail_relay_url, to_email, subject, html_content, text_content, from_name)
            print(f"[EMAIL DELIVERED (Google Apps Script HTTPS Relay)] -> To: {to_email} | Response: {res}")
            return True
        except Exception as e_relay:
            print(f"[EMAIL ERROR (Google Apps Script HTTPS Relay)] -> {e_relay}")

    # 2. Alternative HTTPS API: Brevo
    if brevo_api_key:
        try:
            res = _send_email_brevo_api(brevo_api_key, to_email, subject, html_content, text_content, from_email, from_name)
            print(f"[EMAIL DELIVERED (Brevo HTTPS API)] -> To: {to_email} | Response: {res}")
            return True
        except Exception as e_brevo:
            print(f"[EMAIL ERROR (Brevo HTTPS API)] -> {e_brevo}")

    # 3. Alternative HTTPS API: Resend
    if resend_api_key:
        try:
            import urllib.request, json
            payload = {
                'from': f"{from_name} <onboarding@resend.dev>",
                'to': [to_email],
                'subject': subject,
                'html': html_content
            }
            if text_content:
                payload['text'] = text_content
            req = urllib.request.Request(
                'https://api.resend.com/emails',
                data=json.dumps(payload).encode('utf-8'),
                headers={'Authorization': f'Bearer {resend_api_key}', 'Content-Type': 'application/json'}
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                print(f"[EMAIL DELIVERED (Resend HTTPS API)] -> To: {to_email} | Response: {resp.read().decode('utf-8')}")
                return True
        except Exception as e_resend:
            print(f"[EMAIL ERROR (Resend HTTPS API)] -> {e_resend}")

    # 4. Standard Direct SMTP Fallback (Port 587 STARTTLS / Port 465 SSL)
    smtp_user = os.environ.get('SMTP_USER', SMTP_USER).strip()
    smtp_pass = os.environ.get('SMTP_PASS', SMTP_PASS).strip().replace(' ', '')
    smtp_host = os.environ.get('SMTP_HOST', SMTP_HOST)
    smtp_port = int(os.environ.get('SMTP_PORT', SMTP_PORT))

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    sender_addr = smtp_user if smtp_user else from_email
    msg['From'] = f"{from_name} <{sender_addr}>"
    msg['To'] = to_email
    if text_content:
        msg.attach(MIMEText(text_content, 'plain', 'utf-8'))
    msg.attach(MIMEText(html_content, 'html', 'utf-8'))

    if not smtp_user or not smtp_pass:
        print(f"\n[EMAIL DISPATCH (NO SMTP/RELAY CREDENTIALS)] -> From: {from_name} <{sender_addr}> | To: {to_email} | Subject: {subject}")
        print(f"[EMAIL DISPATCH] -> Login credentials / notification logged for: {to_email}.\n")
        return True

    try:
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
        server.ehlo()
        if smtp_port in (587, 25):
            server.starttls()
            server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.sendmail(sender_addr, [to_email], msg.as_string())
        server.quit()
        print(f"[EMAIL DELIVERED (Port {smtp_port})] -> Email delivered successfully from {sender_addr} to {to_email}")
        return True
    except Exception as e1:
        print(f"[EMAIL WARNING (Port {smtp_port})] -> Primary dispatch failed: {e1}. Attempting SSL Port 465 fallback...")
        try:
            import ssl
            ctx = ssl._create_unverified_context()
            server = smtplib.SMTP_SSL(smtp_host, 465, context=ctx, timeout=10)
            server.login(smtp_user, smtp_pass)
            server.sendmail(sender_addr, [to_email], msg.as_string())
            server.quit()
            print(f"[EMAIL DELIVERED (Port 465 SSL)] -> Email delivered successfully via fallback to {to_email}")
            return True
        except Exception as e2:
            print(f"[EMAIL ERROR] -> Failed sending from {sender_addr} to {to_email}: Primary error ({e1}), SSL error ({e2})")
            return False

def get_base_html_template(title, body_content):
    return f"""<!DOCTYPE html>
<html lang="mr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>{title}</title>
  <style>
    :root {{ color-scheme: light; }}
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 20px 10px; -webkit-font-smoothing: antialiased; }}
    .email-wrapper {{ max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }}
    .email-header {{ background: #0f172a; padding: 24px 20px; text-align: center; border-bottom: 3px solid #2563eb; }}
    .email-header h1 {{ margin: 0; font-size: 20px; font-weight: 800; color: #ffffff !important; letter-spacing: 0.2px; line-height: 1.3; }}
    .email-header p {{ margin: 6px 0 0; font-size: 12px; color: #93c5fd !important; font-weight: 500; letter-spacing: 0.3px; }}
    .email-body {{ padding: 28px 24px; background-color: #ffffff; color: #1e293b; }}
    .greeting {{ font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px; }}
    .lead-text {{ font-size: 13.5px; line-height: 1.6; color: #334155; margin-bottom: 18px; }}
    .lead-text-en {{ font-size: 12.5px; line-height: 1.5; color: #64748b; font-style: italic; margin-top: 4px; }}
    
    /* Clean High-Contrast Credentials Table */
    .cred-card {{ background-color: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 10px; margin: 20px 0; overflow: hidden; }}
    .cred-header {{ background-color: #e2e8f0; padding: 10px 16px; font-size: 13px; font-weight: 700; color: #1e293b; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center; }}
    .cred-table {{ width: 100%; border-collapse: collapse; }}
    .cred-table tr {{ border-bottom: 1px solid #e2e8f0; }}
    .cred-table tr:last-child {{ border-bottom: none; }}
    .cred-label {{ padding: 10px 14px; font-size: 12.5px; font-weight: 600; color: #334155; width: 42%; vertical-align: middle; background-color: #f8fafc; }}
    .cred-label-sub {{ font-size: 11px; color: #64748b; font-weight: normal; display: block; }}
    .cred-val {{ padding: 10px 14px; font-size: 13.5px; font-weight: 700; color: #0f172a; vertical-align: middle; background-color: #ffffff; }}
    .badge-code {{ font-family: 'SFMono-Regular', Consolas, Menlo, monospace; color: #1d4ed8; background-color: #eff6ff; padding: 3px 8px; border-radius: 6px; border: 1px solid #bfdbfe; display: inline-block; font-size: 13px; }}
    .badge-pass {{ font-family: 'SFMono-Regular', Consolas, Menlo, monospace; color: #047857; background-color: #ecfdf5; padding: 4px 10px; border-radius: 6px; border: 1px solid #a7f3d0; display: inline-block; font-size: 14px; letter-spacing: 0.5px; }}
    
    /* Call-To-Action Button */
    .btn-container {{ text-align: center; margin: 26px 0 16px; }}
    .btn {{ display: inline-block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 2px 6px rgba(37,99,235,0.3); letter-spacing: 0.2px; }}
    
    /* Security & Instruction Callout */
    .instructions {{ background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-top: 22px; font-size: 12px; color: #166534; line-height: 1.6; }}
    .instructions-en {{ font-size: 11px; color: #15803d; font-style: italic; margin-top: 4px; display: block; }}
    .footer {{ background-color: #f8fafc; padding: 18px 20px; text-align: center; font-size: 11.5px; color: #64748b; border-top: 1px solid #e2e8f0; line-height: 1.5; }}
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <h1>🏛️ सातत्यपूर्ण अंतर्गत मूल्यमापन प्रणाली</h1>
      <p>Continuous Internal Evaluation Management System (CIEMS) • NEP 2020</p>
    </div>
    <div class="email-body">
      {body_content}
    </div>
    <div class="footer">
      <strong>Continuous Internal Evaluation Directorate</strong> • Web: <a href="https://rajekhan.in" style="color: #2563eb; text-decoration: none;">rajekhan.in</a><br>
      Institutional Official Communication • Sent securely by Institutional Administrator: {ADMIN_EMAIL}
    </div>
  </div>
</body>
</html>"""

def send_teacher_registration_received_email(to_email, name, teacher_code, college_name=None, subject_name=None):
    subject = f"नोंदणी अर्ज प्राप्त — Faculty Registration Received: {teacher_code} (CIE Portal)"
    body = f"""
    <div class="greeting">आदरणीय / Respected {name},</div>
    <div class="lead-text">
      आपला सातत्यपूर्ण अंतर्गत मूल्यमापन प्रणालीमधील (CIE Portal) शिक्षक नोंदणी अर्ज यशस्वीरीत्या प्राप्त झाला आहे.
      <div class="lead-text-en">Your faculty registration application has been successfully submitted and is currently under verification by the Administrator.</div>
    </div>
    
    <div class="cred-card">
      <div class="cred-header">
        📋 अर्जाचा तपशील / Registration Details
      </div>
      <table class="cred-table">
        <tr>
          <td class="cred-label">शिक्षक कोड<span class="cred-label-sub">Teacher Code</span></td>
          <td class="cred-val"><span class="badge-code">{teacher_code}</span></td>
        </tr>
        <tr>
          <td class="cred-label">नोंदणीकृत ईमेल<span class="cred-label-sub">Registered Email</span></td>
          <td class="cred-val">{to_email}</td>
        </tr>
        <tr>
          <td class="cred-label">सद्यस्थिती<span class="cred-label-sub">Current Status</span></td>
          <td class="cred-val" style="color: #b45309; font-weight: bold;">⏳ प्रशासकीय मान्यतेसाठी प्रलंबित (Pending Admin Approval)</td>
        </tr>
      </table>
    </div>

    <div class="instructions">
      <strong>📌 पुढील प्रक्रिया / Next Steps:</strong><br>
      • कॉलेज प्रशासकांद्वारे (Admin Approval) आपला अर्ज मंजूर झाल्यानंतर आपला <strong>लॉगिन पासवर्ड थेट याच ईमेलवर</strong> पाठवला जाईल.<br>
      <span class="instructions-en">(Upon verification and approval by the administrator, your official login password will be dispatched to this email.)</span>
    </div>"""
    html = get_base_html_template("Teacher Registration Received", body)
    return send_email_async(to_email, subject, html, from_email=ADMIN_EMAIL, from_name=ADMIN_NAME)

def send_teacher_approval_email(to_email, name, teacher_code, password, college_name=None, subject_name=None, validity_end=None):
    subject = f"शिक्षक नोंदणी मंजूर — Faculty Registration Approved: {teacher_code} (CIE Portal)"
    
    col_row = f"""
    <tr>
      <td class="cred-label">महाविद्यालय<span class="cred-label-sub">Affiliated College</span></td>
      <td class="cred-val">{college_name}</td>
    </tr>""" if college_name else ''
    
    sub_row = f"""
    <tr>
      <td class="cred-label">अध्यापन विषय<span class="cred-label-sub">Teaching Subject</span></td>
      <td class="cred-val">{subject_name}</td>
    </tr>""" if subject_name else ''
    
    val_row = f"""
    <tr>
      <td class="cred-label">खाते वैधता मुदत<span class="cred-label-sub">Account Validity</span></td>
      <td class="cred-val" style="color: #0369a1;">📅 {validity_end} (शैक्षणिक वर्ष / 1 Academic Year)</td>
    </tr>""" if validity_end else ''
    
    body = f"""
    <div class="greeting">आदरणीय / Respected {name},</div>
    <div class="lead-text">
      आपला सातत्यपूर्ण अंतर्गत मूल्यमापन प्रणालीमधील (CIE Portal) शिक्षक नोंदणी अर्ज प्रशासकांद्वारे <strong>मंजूर (Approved)</strong> करण्यात आला आहे.
      <div class="lead-text-en">Your faculty registration application has been successfully verified and approved by the Institutional Administrator.</div>
    </div>
    
    <div class="cred-card">
      <div class="cred-header">
        🔐 अधिकृत लॉगिन माहिती / Official Login Credentials
      </div>
      <table class="cred-table">
        <tr>
          <td class="cred-label">शिक्षक कोड<span class="cred-label-sub">Teacher Code (User ID)</span></td>
          <td class="cred-val"><span class="badge-code">{teacher_code}</span></td>
        </tr>
        <tr>
          <td class="cred-label">नोंदणीकृत ईमेल<span class="cred-label-sub">Registered Email</span></td>
          <td class="cred-val">{to_email}</td>
        </tr>
        <tr>
          <td class="cred-label">लॉगिन पासवर्ड<span class="cred-label-sub">Temporary Password</span></td>
          <td class="cred-val"><span class="badge-pass">{password}</span></td>
        </tr>
        {col_row}
        {sub_row}
        {val_row}
      </table>
    </div>

    <div class="btn-container">
      <a href="{APP_BASE_URL}/teacher" class="btn" style="color:#ffffff !important;">
        👉 शिक्षक कक्षात लॉगिन करा / Login to Teacher Portal &rarr;
      </a>
    </div>

    <div class="instructions">
      <strong>📌 महत्त्वाची मार्गदर्शक माहिती / Key Operational Guidelines:</strong><br>
      • <strong>पासवर्ड सुरक्षा:</strong> लॉगिन केल्यानंतर शिक्षक डॅशबोर्डवरील <strong>'Change Password'</strong> बटण दाबून आपला कायमस्वरूपी पासवर्ड सेट करा.<br>
      <span class="instructions-en">(For security, please update your password after initial login via 'Change Password'.)</span><br>
      • <strong>विद्यार्थी जोडणी:</strong> आपला <strong>शिक्षक कोड ({teacher_code})</strong> आपल्या विद्यार्थ्यांना द्या. विद्यार्थी हा कोड व त्यांचा PRN टाकून थेट स्वाध्याय सोडवू शकतील.<br>
      <span class="instructions-en">(Share your unique Teacher Code with your class students for frictionless access.)</span>
    </div>"""
    
    html = get_base_html_template("Teacher Registration Approved", body)
    return send_email_async(to_email, subject, html, from_email=ADMIN_EMAIL, from_name=ADMIN_NAME)

def send_teacher_forgot_password_email(to_email, name, teacher_code, new_password, college_name=None):
    subject = f"पासवर्ड रीसेट — Password Reset: {teacher_code} (CIE Portal)"
    body = f"""
    <div class="greeting">आदरणीय / Respected {name},</div>
    <div class="lead-text">
      आपल्या विनंतीनुसार आपल्या शिक्षक खात्याचा नवीन सुरक्षित पासवर्ड <strong>ऑटो-जनरेट (Auto-Generated)</strong> करण्यात आला आहे.
      <div class="lead-text-en">As per your request, a new temporary password has been securely generated for your faculty account.</div>
    </div>
    
    <div class="cred-card">
      <div class="cred-header">
        🔑 नवीन लॉगिन माहिती / New Login Credentials
      </div>
      <table class="cred-table">
        <tr>
          <td class="cred-label">शिक्षक कोड<span class="cred-label-sub">Teacher Code (User ID)</span></td>
          <td class="cred-val"><span class="badge-code">{teacher_code}</span></td>
        </tr>
        <tr>
          <td class="cred-label">नोंदणीकृत ईमेल<span class="cred-label-sub">Registered Email</span></td>
          <td class="cred-val">{to_email}</td>
        </tr>
        <tr>
          <td class="cred-label">नवीन पासवर्ड<span class="cred-label-sub">New Password</span></td>
          <td class="cred-val"><span class="badge-pass">{new_password}</span></td>
        </tr>
      </table>
    </div>

    <div class="btn-container">
      <a href="{APP_BASE_URL}/teacher" class="btn" style="color:#ffffff !important;">
        👉 शिक्षक कक्षात लॉगिन करा / Login to Teacher Portal &rarr;
      </a>
    </div>

    <div class="instructions">
      <strong>📌 सूचना / Note:</strong> लॉगिन केल्यानंतर आपण <strong>'Change Password'</strong> बटण दाबून आपल्या पसंतीचा नवीन पासवर्ड सेट करू शकता.<br>
      <span class="instructions-en">(You can set your permanent private password anytime after logging in.)</span>
    </div>"""
    
    html = get_base_html_template("Password Reset Successful", body)
    return send_email_async(to_email, subject, html, from_email=ADMIN_EMAIL, from_name=ADMIN_NAME)

def send_teacher_password_changed_email(to_email, name, teacher_code, college_name=None):
    subject = f"पासवर्ड यशस्वीरीत्या बदलला — Password Changed Confirmation (CIE Portal)"
    body = f"""
    <div class="greeting">आदरणीय / Respected {name},</div>
    <div class="lead-text">
      आपल्या शिक्षक खात्याचा (Teacher Code: <strong>{teacher_code}</strong>) पासवर्ड यशस्वीरीत्या बदलण्यात आला आहे.
      <div class="lead-text-en">The login password for your faculty account ({teacher_code}) has been successfully updated.</div>
    </div>

    <div class="btn-container">
      <a href="{APP_BASE_URL}/teacher" class="btn" style="color:#ffffff !important;">
        👉 शिक्षक कक्षात प्रवेश करा / Access Teacher Portal &rarr;
      </a>
    </div>

    <div class="instructions" style="background-color: #fef2f2; border-left-color: #ef4444; color: #991b1b;">
      <strong>⚠️ सुरक्षा सूचना / Security Alert:</strong> जर हा बदल आपण केलेला नसेल, तर तात्काळ प्रशासकांशी संपर्क साधा किंवा पासवर्ड रीसेट करा.<br>
      <span class="instructions-en" style="color: #b91c1c;">(If you did not initiate this change, contact your institutional admin immediately.)</span>
    </div>"""
    
    html = get_base_html_template("Password Changed Confirmation", body)
    return send_email_async(to_email, subject, html, from_email=ADMIN_EMAIL, from_name=ADMIN_NAME)

def send_teacher_extension_approved_email(to_email, name, teacher_code, academic_year, validity_end, college_name=None):
    subject = f"शिक्षक खाते मुदतवाढ मंजूर — Academic Validity Extended: {academic_year} (CIE Portal)"
    col_row = f"""
    <tr>
      <td class="cred-label">महाविद्यालय<span class="cred-label-sub">Affiliated College</span></td>
      <td class="cred-val">{college_name}</td>
    </tr>""" if college_name else ''
    
    body = f"""
    <div class="greeting">आदरणीय / Respected {name},</div>
    <div class="lead-text">
      आपल्या शिक्षक खात्याची (Teacher Code: <strong>{teacher_code}</strong>) शैक्षणिक वर्ष <strong>{academic_year}</strong> साठीची मुदतवाढ विनंती प्रशासकांद्वारे <strong>मंजूर (Approved)</strong> करण्यात आली आहे.
      <div class="lead-text-en">Your faculty account validity extension request for academic year {academic_year} has been approved.</div>
    </div>
    
    <div class="cred-card">
      <div class="cred-header">
        📅 मुदतवाढ तपशील / Validity Extension Details
      </div>
      <table class="cred-table">
        <tr>
          <td class="cred-label">शिक्षक कोड<span class="cred-label-sub">Teacher Code</span></td>
          <td class="cred-val"><span class="badge-code">{teacher_code}</span></td>
        </tr>
        <tr>
          <td class="cred-label">शैक्षणिक वर्ष<span class="cred-label-sub">Academic Year</span></td>
          <td class="cred-val" style="color: #047857;">{academic_year}</td>
        </tr>
        <tr>
          <td class="cred-label">नवीन अंतिम तारीख<span class="cred-label-sub">New Expiry Date</span></td>
          <td class="cred-val" style="color: #0369a1;">📅 {validity_end} (३१ मे)</td>
        </tr>
        {col_row}
      </table>
    </div>

    <div class="btn-container">
      <a href="{APP_BASE_URL}/teacher" class="btn" style="color:#ffffff !important;">
        👉 शिक्षक कक्षात प्रवेश करा / Access Teacher Portal &rarr;
      </a>
    </div>

    <div class="instructions">
      आपण आपले वर्ग, विषय, स्वाध्याय व मूल्यमापन पूर्ववत अखंडितपणे सुरू ठेवू शकता.<br>
      <span class="instructions-en">You can continue managing course rosters, assignments, and evaluations seamlessly.</span>
    </div>"""
    
    html = get_base_html_template("Teacher Validity Extended", body)
    return send_email_async(to_email, subject, html, from_email=ADMIN_EMAIL, from_name=ADMIN_NAME)

def send_admin_forgot_password_email(to_email, name, username, new_password):
    subject = f"प्रशासक पासवर्ड रीसेट — Admin Password Reset: {username} (CIE Portal)"
    body = f"""
    <div class="greeting">आदरणीय / Respected {name},</div>
    <div class="lead-text">
      आपल्या विनंतीनुसार आपल्या <strong>प्रशासकीय (Admin) खात्याचा</strong> नवीन सुरक्षित पासवर्ड <strong>ऑटो-जनरेट (Auto-Generated)</strong> करण्यात आला आहे.
      <div class="lead-text-en">As per your request, a new master password has been generated for your administrator account.</div>
    </div>
    
    <div class="cred-card">
      <div class="cred-header">
        🏛️ प्रशासक लॉगिन माहिती / Master Admin Credentials
      </div>
      <table class="cred-table">
        <tr>
          <td class="cred-label">प्रशासक युझरनेम<span class="cred-label-sub">Admin Username</span></td>
          <td class="cred-val"><span class="badge-code">{username}</span></td>
        </tr>
        <tr>
          <td class="cred-label">नोंदणीकृत ईमेल<span class="cred-label-sub">Admin Email</span></td>
          <td class="cred-val">{to_email}</td>
        </tr>
        <tr>
          <td class="cred-label">नवीन पासवर्ड<span class="cred-label-sub">New Admin Password</span></td>
          <td class="cred-val"><span class="badge-pass" style="color: #7e22ce; background-color: #faf5ff; border-color: #d8b4fe;">{new_password}</span></td>
        </tr>
      </table>
    </div>

    <div class="btn-container">
      <a href="{APP_BASE_URL}/admin" class="btn" style="background-color: #0f172a; color:#ffffff !important;">
        👉 ॲडमिन पोर्टलमध्ये लॉगिन करा / Login to Admin Portal &rarr;
      </a>
    </div>

    <div class="instructions" style="background-color: #fff7ed; border-left-color: #f97316; color: #9a3412;">
      <strong>⚠️ प्रशासकीय सुरक्षा सूचना / Master Security Policy:</strong><br>
      • हा पासवर्ड अत्यंत गोपनीय असून कोणाशीही शेअर करू नका.<br>
      <span class="instructions-en" style="color: #c2410c;">(This is a master administrative credential. Keep it strictly confidential.)</span>
    </div>"""
    
    html = get_base_html_template("Admin Password Reset Successful", body)
    return send_email_async(to_email, subject, html, from_email=ADMIN_EMAIL, from_name=ADMIN_NAME)

# ----------------- Live Email Diagnostic Test Route -----------------
@app.route('/api/test-email', methods=['GET', 'POST'])
def api_test_email():
    target = request.args.get('to') or request.form.get('to') or 'rajushikalgar@gmail.com'
    smtp_user = os.environ.get('SMTP_USER', SMTP_USER).strip()
    smtp_pass = os.environ.get('SMTP_PASS', SMTP_PASS).strip().replace(' ', '')
    smtp_host = os.environ.get('SMTP_HOST', SMTP_HOST)
    smtp_port = int(os.environ.get('SMTP_PORT', SMTP_PORT))
    
    gmail_relay_url = os.environ.get('GMAIL_RELAY_URL', '').strip()
    brevo_api_key = os.environ.get('BREVO_API_KEY', '').strip()
    resend_api_key = os.environ.get('RESEND_API_KEY', '').strip()

    debug_info = {
        'target_email': target,
        'gmail_relay_configured': bool(gmail_relay_url),
        'brevo_api_configured': bool(brevo_api_key),
        'resend_api_configured': bool(resend_api_key),
        'smtp_user': smtp_user,
        'smtp_pass_configured': bool(smtp_pass),
        'smtp_pass_length': len(smtp_pass) if smtp_pass else 0,
        'smtp_host': smtp_host,
        'smtp_port': smtp_port,
        'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    # Test 1: Google Apps Script HTTPS Relay
    if gmail_relay_url:
        try:
            res = _send_email_http_relay(
                gmail_relay_url,
                target,
                'CIEMS Direct Google Apps Script HTTPS Test Email',
                f"This is a direct HTTPS test email sent from CIEMS server via Google Apps Script Web App Relay at {debug_info['timestamp']}.\n\nIf you see this, email sending is 100% operational on Render!",
                from_name="Continuous Internal Evaluation Admin"
            )
            return jsonify({
                'success': True,
                'channel': 'Google Apps Script HTTPS Relay (Port 443)',
                'message': f'Email successfully dispatched to {target} via Google Apps Script Relay!',
                'relay_response': res,
                'details': debug_info
            })
        except Exception as e_relay:
            return jsonify({
                'success': False,
                'channel': 'Google Apps Script HTTPS Relay',
                'error': f'Failed sending via Google Apps Script HTTPS Relay: {str(e_relay)}',
                'details': debug_info
            }), 500

    # Test 2: Brevo HTTPS API
    if brevo_api_key:
        try:
            res = _send_email_brevo_api(
                brevo_api_key,
                target,
                'CIEMS Brevo HTTPS API Test Email',
                f"This is a direct HTTPS test email sent from CIEMS server via Brevo API at {debug_info['timestamp']}.\n\nIf you see this, email sending is 100% operational on Render!"
            )
            return jsonify({
                'success': True,
                'channel': 'Brevo HTTPS API (Port 443)',
                'message': f'Email successfully dispatched to {target} via Brevo API!',
                'brevo_response': res,
                'details': debug_info
            })
        except Exception as e_brevo:
            return jsonify({
                'success': False,
                'channel': 'Brevo HTTPS API',
                'error': f'Failed sending via Brevo HTTPS API: {str(e_brevo)}',
                'details': debug_info
            }), 500

    if not smtp_pass:
        return jsonify({
            'success': False,
            'error': 'No email delivery method configured. Please set GMAIL_RELAY_URL or BREVO_API_KEY or SMTP_PASS in Render Environment Variables.',
            'details': debug_info
        }), 500
        
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'CIEMS Direct Server Live Test Email'
    msg['From'] = f"Continuous Internal Evaluation Admin <{smtp_user}>"
    msg['To'] = target
    msg.attach(MIMEText(f"This is a direct server diagnostic test email sent from CIEMS server at {debug_info['timestamp']}.\n\nIf you see this, email sending is 100% operational!", 'plain', 'utf-8'))
    
    # Try Port 587
    try:
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
        server.ehlo()
        if smtp_port in (587, 25):
            server.starttls()
            server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, [target], msg.as_string())
        server.quit()
        return jsonify({
            'success': True,
            'message': f'Email successfully dispatched to {target} via Port {smtp_port} STARTTLS!',
            'details': debug_info
        })
    except Exception as e587:
        # Fallback to Port 465 SSL
        try:
            import ssl
            ctx = ssl._create_unverified_context()
            server = smtplib.SMTP_SSL(smtp_host, 465, context=ctx, timeout=10)
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, [target], msg.as_string())
            server.quit()
            return jsonify({
                'success': True,
                'message': f'Email successfully dispatched to {target} via Port 465 SSL fallback!',
                'details': debug_info,
                'port_587_warning': str(e587)
            })
        except Exception as e465:
            return jsonify({
                'success': False,
                'error': f'Failed sending email: Port 587 error: ({str(e587)}), Port 465 error: ({str(e465)})',
                'details': debug_info
            }), 500

# ----------------- Live Cloud Database Persistence Diagnostic Routes -----------------
@app.route('/api/cloud-sync/status', methods=['GET'])
def api_cloud_sync_status():
    relay_url = os.environ.get('GMAIL_RELAY_URL', '').strip()
    db_size = os.path.getsize(database.DB_PATH) if os.path.exists(database.DB_PATH) else 0
    return jsonify({
        'cloud_relay_configured': bool(relay_url),
        'db_path': database.DB_PATH,
        'db_size_bytes': db_size,
        'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/api/cloud-sync/backup', methods=['GET', 'POST'])
def api_cloud_sync_backup():
    try:
        database._backup_worker()
        return jsonify({
            'success': True,
            'message': 'Database snapshot successfully pushed and permanently preserved in Google Drive!',
            'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/cloud-sync/restore', methods=['GET', 'POST'])
def api_cloud_sync_restore():
    try:
        restored = database.restore_database_from_cloud()
        return jsonify({
            'success': True,
            'restored': restored,
            'message': 'Database restored from Google Drive!' if restored else 'No remote backup found or already up to date.',
            'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# ----------------- Token & Session Auth Helpers -----------------
def get_auth_serializer():
    return URLSafeTimedSerializer(app.secret_key)

def generate_auth_token(role, user_id):
    s = get_auth_serializer()
    return s.dumps({'role': role, 'id': int(user_id), 'ts': time.time()})

def decode_auth_token(token):
    if not token:
        return None
    token = str(token).strip()
    if token.startswith('Bearer '):
        token = token[7:].strip()
    s = get_auth_serializer()
    try:
        # Token valid for 30 days
        data = s.loads(token, max_age=86400 * 30)
        return data
    except (BadSignature, SignatureExpired, Exception):
        return None

def extract_request_token():
    return (
        request.headers.get('Authorization') or
        request.headers.get('X-Auth-Token') or
        request.args.get('auth_token') or
        request.form.get('auth_token')
    )

def get_current_teacher():
    t_id = session.get('teacher_id')
    if not t_id:
        tok_data = decode_auth_token(extract_request_token())
        if tok_data and tok_data.get('role') == 'teacher':
            t_id = tok_data.get('id')

    if t_id:
        conn = database.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM teachers WHERE id = ?", (t_id,))
        row = cursor.fetchone()
        conn.close()
        if row and row['status'] == 'approved':
            return dict(row)
    return None

def get_current_admin():
    a_id = session.get('admin_id')
    if not a_id:
        tok_data = decode_auth_token(extract_request_token())
        if tok_data and tok_data.get('role') == 'admin':
            a_id = tok_data.get('id')

    if a_id:
        conn = database.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM admins WHERE id = ?", (a_id,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return dict(row)
    return None

def teacher_required(f):
    def wrapper(*args, **kwargs):
        teacher = get_current_teacher()
        if not teacher:
            return jsonify({'error': 'Unauthorized. Teacher login required.'}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

def admin_required(f):
    def wrapper(*args, **kwargs):
        admin = get_current_admin()
        if not admin:
            return jsonify({'error': 'Unauthorized. Admin login required.'}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# ----------------- Performance, Compression & Web UI Routes -----------------
@app.after_request
def add_performance_and_compression_headers(response):
    if request.path.startswith('/static/'):
        response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    elif request.path.startswith('/api/'):
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    
    accept_encoding = request.headers.get('Accept-Encoding', '')
    if (
        'gzip' in accept_encoding.lower() and
        response.status_code < 300 and
        not response.direct_passthrough and
        ('Content-Encoding' not in response.headers) and
        (response.mimetype in ['text/html', 'text/css', 'application/javascript', 'application/json', 'text/plain', 'image/svg+xml'])
    ):
        try:
            data = response.get_data()
            if len(data) > 500:
                gzip_buffer = io.BytesIO()
                with gzip.GzipFile(mode='wb', fileobj=gzip_buffer, compresslevel=6) as gzip_file:
                    gzip_file.write(data)
                compressed = gzip_buffer.getvalue()
                if len(compressed) < len(data):
                    response.set_data(compressed)
                    response.headers['Content-Encoding'] = 'gzip'
                    response.headers['Content-Length'] = len(compressed)
        except Exception:
            pass

    # Cross-Origin, Third-party Cookie & Iframe Embedding Support
    origin = request.headers.get('Origin')
    if origin:
        response.headers['Access-Control-Allow-Origin'] = origin
    else:
        response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Auth-Token, X-Requested-With, Accept, Origin'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    
    # Allow embedding in Blogger, rajekhan.in, and all subdomains
    response.headers.pop('X-Frame-Options', None)
    response.headers['Content-Security-Policy'] = "frame-ancestors * https://rajekhan.in https://*.rajekhan.in https://*.blogger.com https://*.blogspot.com http://localhost:* http://127.0.0.1:*;"

    return response

@app.route('/')
def index():
    return render_template('index.html', active_view='landing')

@app.route('/login')
def login_route():
    teacher_code = request.args.get('teacher', '')
    return render_template('index.html', active_view='login', teacher_code=teacher_code)

@app.route('/student')
@app.route('/submit')
def student_route():
    teacher_code = request.args.get('teacher', '')
    return render_template('index.html', active_view='student-portal', teacher_code=teacher_code)

@app.route('/teacher')
def teacher_route():
    return render_template('index.html', active_view='teacher-portal')

@app.route('/admin')
def admin_route():
    return render_template('index.html', active_view='admin-portal')

@app.route('/guidelines')
def guidelines_route():
    return render_template('index.html', active_view='landing')

# ----------------- QR Code Generator -----------------
@app.route('/api/qr-image')
def qr_image():
    text = request.args.get('text', 'https://rajekhan.in')
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=8,
        border=2,
    )
    qr.add_data(text)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#1E3A8A", back_color="white")
    
    img_io = io.BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

# ----------------- Master Disciplines & 21 Assessment Types -----------------
@app.route('/api/disciplines')
@app.route('/api/master/disciplines')
def get_master_disciplines():
    return jsonify({
        'disciplines': database.get_db_master_disciplines(),
        'classes': database.get_db_stream_classes()
    })

@app.route('/api/master/classes')
def get_master_classes():
    return jsonify({
        'classes': database.get_db_stream_classes()
    })

@app.route('/api/assessment-types')
def get_assessment_types():
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assessment_types WHERE is_active = 1 ORDER BY id")
    types = []
    for r in cursor.fetchall():
        item = dict(r)
        try:
            item['fields_schema'] = json.loads(item['fields_schema_json'])
        except:
            item['fields_schema'] = []
        types.append(item)
    conn.close()
    return jsonify({'assessment_types': types, 'types': types})

@app.route('/api/user-manual', methods=['GET'])
def get_user_manual():
    lang = request.args.get('lang', 'mr').strip().lower()
    base_dir = os.path.dirname(os.path.abspath(__file__))
    filename = 'complete_portal_user_manual_book_english.md' if lang == 'en' else 'complete_portal_user_manual_book.md'
    
    candidate_paths = [
        os.path.join(base_dir, 'manuals', filename),
        os.path.join(base_dir, filename),
        os.path.join(os.getcwd(), 'manuals', filename),
        os.path.join(os.getcwd(), filename),
    ]
    
    found_path = None
    for p in candidate_paths:
        if os.path.exists(p):
            found_path = p
            break
            
    if not found_path:
        return jsonify({'success': False, 'error': f'User manual file {filename} not found.'}), 404
        
    try:
        with open(found_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return jsonify({'success': True, 'lang': lang, 'content': content})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# =========================================================================
# 1. ADMIN PORTAL & APPROVAL QUEUE
# =========================================================================
@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Admin logged out successfully.'})

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json or {}
    username = str(data.get('username') or '').strip()
    password = str(data.get('password') or '').strip()

    if not (username and password):
        return jsonify({'error': 'Please enter admin username and password.'}), 400

    pwd_hash = database.hash_password(password)
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM admins 
    WHERE (LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?) OR (LOWER(?) = 'admin' AND (LOWER(username) = 'rajekhan.in' OR LOWER(username) = 'admin')))
      AND password_hash = ?
    """, (username, username, username, pwd_hash))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({'error': 'Invalid Admin credentials.'}), 401

    session.clear()
    session['admin_id'] = user['id']
    session['admin_username'] = user['username']
    session['role'] = 'admin'

    token = generate_auth_token('admin', user['id'])

    return jsonify({
        'success': True,
        'message': 'Admin login successful',
        'admin': dict(user),
        'token': token
    })

@app.route('/api/admin/forgot-password', methods=['POST'])
def admin_forgot_password():
    data = request.json or {}
    identifier = str(data.get('identifier') or data.get('username') or data.get('email') or '').strip()
    
    if not identifier:
        return jsonify({'error': 'Please enter your admin username or registered email (ॲडमिन युझरनेम किंवा नोंदणीकृत ईमेल प्रविष्ट करा).'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admins WHERE LOWER(username) = ? OR LOWER(email) = ?", (identifier.lower(), identifier.lower()))
    admin = cursor.fetchone()
    
    if not admin:
        conn.close()
        return jsonify({'error': 'No administrator account found with this username/email (या युझरनेम किंवा ईमेलने कोणतेही प्रशासक खाते सापडले नाही).'}), 404
        
    new_password = database.generate_random_password(10)
    pwd_hash = database.hash_password(new_password)
    
    cursor.execute("UPDATE admins SET password_hash = ? WHERE id = ?", (pwd_hash, admin['id']))
    conn.commit()
    conn.close()

    # Send reset password email to admin
    admin_email = admin['email']
    if admin_email:
        send_admin_forgot_password_email(
            to_email=admin_email,
            name=admin['name'],
            username=admin['username'],
            new_password=new_password
        )
    
    masked_email = admin_email
    if '@' in admin_email:
        parts = admin_email.split('@')
        u = parts[0]
        d = parts[1]
        masked_email = (u[:2] + '***@' + d) if len(u) > 2 else (u[:1] + '***@' + d)

    return jsonify({
        'success': True,
        'message': f'नवीन पासवर्ड आपल्या नोंदणीकृत प्रशासकीय ईमेलवर ({masked_email}) पाठवला आहे.',
        'username': admin['username'],
        'email_masked': masked_email
    })

@app.route('/api/admin/me')
def admin_me():
    admin = get_current_admin()
    if not admin:
        return jsonify({'authenticated': False}), 200
    return jsonify({'authenticated': True, 'admin': admin})

@app.route('/api/admin/teachers')
@admin_required
def get_admin_teachers():
    filter_type = str(request.args.get('filter_type') or 'all').strip().lower()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT t.*, 
           COALESCE(r.roster_count, 0) as roster_count,
           COALESCE(s.subjects_count, 0) as subjects_count,
           COALESCE(sub.submissions_count, 0) as submissions_count
    FROM teachers t
    LEFT JOIN (
        SELECT teacher_id, COUNT(*) as roster_count FROM teacher_rosters GROUP BY teacher_id
    ) r ON t.id = r.teacher_id
    LEFT JOIN (
        SELECT teacher_id, COUNT(*) as subjects_count FROM teacher_subjects GROUP BY teacher_id
    ) s ON t.id = s.teacher_id
    LEFT JOIN (
        SELECT teacher_id, COUNT(*) as submissions_count FROM submissions GROUP BY teacher_id
    ) sub ON t.id = sub.teacher_id
    ORDER BY CASE WHEN (t.status = 'pending' OR t.extension_requested = 1) THEN 0 ELSE 1 END, t.id DESC
    """)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()

    # Categorize into pending (requiring admin action), new registrations, and update/extensions
    pending_all = [r for r in rows if r.get('status') == 'pending' or r.get('extension_requested') == 1]
    new_requests = [r for r in rows if r.get('status') == 'pending' and (not r.get('extension_requested'))]
    update_requests = [r for r in rows if r.get('extension_requested') == 1 or r.get('approval_type') == 'update']
    approved = [r for r in rows if r.get('status') == 'approved' and (not r.get('extension_requested'))]

    # Filtered view based on tab selection
    if filter_type == 'new':
        display_list = new_requests
    elif filter_type == 'update':
        display_list = update_requests
    else:
        display_list = rows

    return jsonify({
        'teachers': display_list,
        'all_teachers': rows,
        'pending_teachers': pending_all,
        'new_requests': new_requests,
        'update_requests': update_requests,
        'approved_teachers': approved,
        'count_pending': len(pending_all),
        'count_new': len(new_requests),
        'count_update': len(update_requests),
        'count_approved': len(approved)
    })

@app.route('/api/admin/dashboard-stats')
@admin_required
def get_admin_dashboard_stats():
    global _admin_stats_cache
    force = request.args.get('force', '0') == '1'
    # Return cached result if still fresh (30s TTL) and not forced
    if not force and _admin_stats_cache['data'] is not None and (time.time() - _admin_stats_cache['ts'] < _STATS_CACHE_TTL):
        return jsonify(_admin_stats_cache['data'])

    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) FROM teachers WHERE status != "pending"')
    approved_teachers = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM teachers WHERE status = "pending" OR extension_requested = 1')
    pending_teachers = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(DISTINCT prn) FROM teacher_rosters')
    total_students = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM created_assessments')
    total_assessments = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM submissions')
    total_submissions = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM teacher_subjects')
    total_courses = cursor.fetchone()[0]
    
    # Predefined Faculty Streams Breakdown (Matching Teacher Portal & Master Disciplines)
    predefined_streams = [
        {
            'stream_key': 'Arts',
            'name_en': 'Arts & Languages',
            'name_mr': 'कला (Arts)',
            'match_terms': ['arts', 'कला', 'भाषा', 'भूगोल', 'इतिहास', 'राज्यशास्त्र', 'समाजशास्त्र', 'अर्थशास्त्र'],
            'master_key': 'कला (Arts)',
            'icon': 'fa-book-open',
            'gradient': 'from-purple-50 to-indigo-50/60',
            'border': 'border-purple-200',
            'text_color': 'text-purple-950',
            'icon_color': 'text-purple-600',
            'badge_bg': 'bg-purple-100',
            'badge_text': 'text-purple-800'
        },
        {
            'stream_key': 'Commerce',
            'name_en': 'Commerce & Management',
            'name_mr': 'वाणिज्य (Commerce)',
            'match_terms': ['commerce', 'वाणिज्य', 'अकाउंटन्सी', 'व्यवस्थापन', 'b.com', 'm.com', 'bba', 'mba'],
            'master_key': 'वाणिज्य (Commerce)',
            'icon': 'fa-chart-pie',
            'gradient': 'from-emerald-50 to-teal-50/60',
            'border': 'border-emerald-200',
            'text_color': 'text-emerald-950',
            'icon_color': 'text-emerald-600',
            'badge_bg': 'bg-emerald-100',
            'badge_text': 'text-emerald-800'
        },
        {
            'stream_key': 'Science',
            'name_en': 'Science & Technology',
            'name_mr': 'विज्ञान (Science)',
            'match_terms': ['science', 'विज्ञान', 'भौतिकशास्त्र', 'रसायनशास्त्र', 'वनस्पतीशास्त्र', 'प्राणीशास्त्र', 'गणित'],
            'master_key': 'विज्ञान (Science)',
            'icon': 'fa-flask',
            'gradient': 'from-sky-50 to-cyan-50/60',
            'border': 'border-sky-200',
            'text_color': 'text-sky-950',
            'icon_color': 'text-sky-600',
            'badge_bg': 'bg-sky-100',
            'badge_text': 'text-sky-800'
        },
        {
            'stream_key': 'Agriculture',
            'name_en': 'Agriculture & Allied Sciences',
            'name_mr': 'कृषी व संलग्न विज्ञान (Agriculture)',
            'match_terms': ['agri', 'कृषी', 'agriculture', 'शेती', 'horticulture', 'सस्यशास्त्र', 'मृदाशास्त्र'],
            'master_key': 'कृषी व संलग्न विज्ञान (Agriculture & Allied Sciences)',
            'icon': 'fa-seedling',
            'gradient': 'from-lime-50 to-green-50/60',
            'border': 'border-lime-200',
            'text_color': 'text-lime-950',
            'icon_color': 'text-lime-600',
            'badge_bg': 'bg-lime-100',
            'badge_text': 'text-lime-800'
        },
        {
            'stream_key': 'Engineering',
            'name_en': 'Engineering & Technology',
            'name_mr': 'अभियांत्रिकी व तंत्रज्ञान (Engineering & Tech)',
            'match_terms': ['engineering', 'अभियांत्रिकी', 'tech', 'तंत्रज्ञान', 'computer', 'mechanical', 'civil', 'b.tech', 'b.e'],
            'master_key': 'अभियांत्रिकी व तंत्रज्ञान (Engineering & Technology)',
            'icon': 'fa-microchip',
            'gradient': 'from-blue-50 to-cyan-50/60',
            'border': 'border-blue-200',
            'text_color': 'text-blue-950',
            'icon_color': 'text-blue-600',
            'badge_bg': 'bg-blue-100',
            'badge_text': 'text-blue-800'
        },
        {
            'stream_key': 'Medical & Pharmacy',
            'name_en': 'Medical, Pharmacy & Health Sciences',
            'name_mr': 'वैद्यकीय व आरोग्य विज्ञान (Medical & Pharmacy)',
            'match_terms': ['medical', 'pharmacy', 'वैद्यकीय', 'आरोग्य', 'औषधनिर्माणशास्त्र', 'health', 'nursing', 'b.pharm'],
            'master_key': 'वैद्यकीय, फार्मसी व आरोग्य विज्ञान (Medical, Pharmacy & Health Sciences)',
            'icon': 'fa-notes-medical',
            'gradient': 'from-rose-50 to-red-50/60',
            'border': 'border-rose-200',
            'text_color': 'text-rose-950',
            'icon_color': 'text-rose-600',
            'badge_bg': 'bg-rose-100',
            'badge_text': 'text-rose-800'
        },
        {
            'stream_key': 'Law',
            'name_en': 'Law & Legal Studies',
            'name_mr': 'विधी व कायदेविषयक अभ्यास (Law)',
            'match_terms': ['law', 'विधी', 'कायदा', 'legal', 'llb', 'll.b', 'न्याय'],
            'master_key': 'विधी व कायदेविषयक अभ्यास (Law & Legal Studies)',
            'icon': 'fa-scale-balanced',
            'gradient': 'from-amber-50 to-yellow-50/60',
            'border': 'border-amber-200',
            'text_color': 'text-amber-950',
            'icon_color': 'text-amber-600',
            'badge_bg': 'bg-amber-100',
            'badge_text': 'text-amber-800'
        },
        {
            'stream_key': 'Education & Physical Education',
            'name_en': 'Education & Physical Education',
            'name_mr': 'शिक्षणशास्त्र व शारीरिक शिक्षण (Education)',
            'match_terms': ['education', 'physical', 'शिक्षणशास्त्र', 'शारीरिक', 'b.ed', 'm.ed', 'b.p.ed'],
            'master_key': 'शिक्षणशास्त्र व शारीरिक शिक्षण (Education & Physical Education)',
            'icon': 'fa-graduation-cap',
            'gradient': 'from-pink-50 to-fuchsia-50/60',
            'border': 'border-pink-200',
            'text_color': 'text-pink-950',
            'icon_color': 'text-pink-600',
            'badge_bg': 'bg-pink-100',
            'badge_text': 'text-pink-800'
        },
        {
            'stream_key': 'Humanities',
            'name_en': 'Humanities & Social Sciences',
            'name_mr': 'मानव्यविद्या व सामाजिक शास्त्रे (Humanities)',
            'match_terms': ['humanities', 'मानव्यविद्या', 'social', 'सामाजिक', 'archaeology', 'पुरातत्व', 'पर्यटन'],
            'master_key': 'मानव्यविद्या व सामाजिक शास्त्रे (Humanities & Social Sciences)',
            'icon': 'fa-landmark-dome',
            'gradient': 'from-teal-50 to-emerald-50/60',
            'border': 'border-teal-200',
            'text_color': 'text-teal-950',
            'icon_color': 'text-teal-600',
            'badge_bg': 'bg-teal-100',
            'badge_text': 'text-teal-800'
        },
        {
            'stream_key': 'Interdisciplinary',
            'name_en': 'Interdisciplinary Studies',
            'name_mr': 'आंतरविद्याशाखा (Interdisciplinary)',
            'match_terms': ['interdisciplinary', 'आंतरविद्याशाखा', 'पर्यावरण', 'environmental', 'msw'],
            'master_key': 'आंतरविद्याशाखा (Interdisciplinary)',
            'icon': 'fa-diagram-project',
            'gradient': 'from-indigo-50 to-violet-50/60',
            'border': 'border-indigo-200',
            'text_color': 'text-indigo-950',
            'icon_color': 'text-indigo-600',
            'badge_bg': 'bg-indigo-100',
            'badge_text': 'text-indigo-800'
        },
        {
            'stream_key': 'Other / Custom Faculty Stream',
            'name_en': 'Other / Custom Faculty Stream',
            'name_mr': 'इतर / विशेष विद्याशाखा (Other / Custom Faculty Stream)',
            'match_terms': ['other', 'इतर', 'विशेष', 'vocational', 'व्यावसायिक', 'custom'],
            'master_key': 'इतर / विशेष विद्याशाखा (Other / Custom Faculty Stream)',
            'icon': 'fa-shapes',
            'gradient': 'from-slate-50 to-gray-50/60',
            'border': 'border-slate-200',
            'text_color': 'text-slate-950',
            'icon_color': 'text-slate-600',
            'badge_bg': 'bg-slate-100',
            'badge_text': 'text-slate-800'
        }
    ]

    cursor.execute('''
        SELECT faculty_stream, COUNT(*) as teacher_count
        FROM teachers
        WHERE status != "pending"
        GROUP BY faculty_stream
    ''')
    stream_counts = {r['faculty_stream']: r['teacher_count'] for r in cursor.fetchall()}

    # Pre-fetch teacher_rosters student counts per (teacher_id, class_name) in 1 query
    cursor.execute('SELECT teacher_id, class_name, COUNT(DISTINCT prn) as s_count FROM teacher_rosters GROUP BY teacher_id, class_name')
    roster_counts = {(r['teacher_id'], r['class_name']): r['s_count'] for r in cursor.fetchall()}

    # Pre-fetch teacher_subjects with teacher info in 1 query
    cursor.execute("""
        SELECT ts.id, ts.teacher_id, ts.subject_name, ts.class_name, ts.faculty_stream, t.faculty_stream as t_stream
        FROM teacher_subjects ts
        JOIN teachers t ON ts.teacher_id = t.id
        WHERE t.status != 'pending'
    """)
    all_ts = [dict(r) for r in cursor.fetchall()]

    # Pre-fetch teachers in 1 query
    cursor.execute("SELECT id, subject_name, faculty_stream FROM teachers WHERE status != 'pending'")
    all_teachers = [dict(r) for r in cursor.fetchall()]

    stream_breakdown = []
    # Collect all match terms from defined streams
    all_defined_terms = []
    for other_def in predefined_streams[:-1]:
        all_defined_terms.extend(other_def['match_terms'])

    for s_def in predefined_streams:
        s_key = s_def['stream_key']
        match_terms = s_def['match_terms']
        
        t_cnt = 0
        for st_name, count in stream_counts.items():
            if not st_name:
                continue
            st_lower = str(st_name).lower()
            if any(term in st_lower for term in match_terms):
                t_cnt += count
            elif s_key == 'Other / Custom Faculty Stream':
                # If this stream was not matched by any other stream
                if not any(term in st_lower for term in all_defined_terms):
                    t_cnt += count

        # In-memory subject-wise summary for this stream
        db_subjects = {}
        for ts in all_ts:
            ts_stream = str(ts.get('faculty_stream') or ts.get('t_stream') or '').lower()
            matches = False
            if s_key == 'Other / Custom Faculty Stream':
                if any(k in ts_stream for k in ['other', 'इतर', 'custom', 'विशेष']) or not any(term in ts_stream for term in all_defined_terms):
                    matches = True
            else:
                if any(term in ts_stream for term in match_terms):
                    matches = True
            
            if matches:
                sname = ts.get('subject_name')
                if sname:
                    if sname not in db_subjects:
                        db_subjects[sname] = {
                            'subject_name': sname,
                            'teacher_ids': set(),
                            'course_ids': set(),
                            'students_count': 0
                        }
                    db_subjects[sname]['teacher_ids'].add(ts['teacher_id'])
                    db_subjects[sname]['course_ids'].add(ts['id'])
                    db_subjects[sname]['students_count'] += roster_counts.get((ts['teacher_id'], ts['class_name']), 0)

        for t in all_teachers:
            t_stream = str(t.get('faculty_stream') or '').lower()
            matches = False
            if s_key == 'Other / Custom Faculty Stream':
                if any(k in t_stream for k in ['other', 'इतर', 'custom', 'विशेष']) or not any(term in t_stream for term in all_defined_terms):
                    matches = True
            else:
                if any(term in t_stream for term in match_terms):
                    matches = True
            if matches:
                sname = t.get('subject_name')
                if sname:
                    if sname not in db_subjects:
                        db_subjects[sname] = {
                            'subject_name': sname,
                            'teacher_ids': {t['id']},
                            'course_ids': set(),
                            'students_count': 0
                        }
                    else:
                        db_subjects[sname]['teacher_ids'].add(t['id'])

        # Master list subjects for fallback/completeness
        master_subs = database.MASTER_DISCIPLINES.get(s_def['master_key'], [])

        subject_list = []
        for sname, sinfo in db_subjects.items():
            subject_list.append({
                'subject_name': sname,
                'teacher_count': len(sinfo['teacher_ids']),
                'courses_count': len(sinfo['course_ids']),
                'students_count': sinfo['students_count'],
                'is_active': True
            })
        for msub in master_subs:
            if not any(s['subject_name'] == msub or msub in s['subject_name'] for s in subject_list):
                subject_list.append({
                    'subject_name': msub,
                    'teacher_count': 0,
                    'courses_count': 0,
                    'students_count': 0,
                    'is_active': False
                })

        stream_breakdown.append({
            'stream_key': s_key,
            'name_en': s_def['name_en'],
            'name_mr': s_def['name_mr'],
            'faculty_stream': s_def['name_mr'],
            'teacher_count': t_cnt,
            'teachers_count': t_cnt,
            'students_count': sum(s['students_count'] for s in subject_list) or (total_students if t_cnt > 0 else 0),
            'courses_count': sum(s['courses_count'] for s in subject_list) or (total_courses if t_cnt > 0 else 0),
            'assessments_count': total_assessments if t_cnt > 0 else 0,
            'subjects': subject_list,
            'icon': s_def['icon'],
            'gradient': s_def['gradient'],
            'border': s_def['border'],
            'text_color': s_def['text_color'],
            'icon_color': s_def['icon_color'],
            'badge_bg': s_def['badge_bg'],
            'badge_text': s_def['badge_text']
        })
    
    # Recent teachers
    cursor.execute('''
        SELECT id, teacher_code, name, designation, college_name, university_name, faculty_stream, subject_name, email, mobile, status, validity_start, validity_end, academic_year, extension_requested, approval_type, created_at
        FROM teachers
        ORDER BY id DESC LIMIT 6
    ''')
    recent_teachers = [dict(r) for r in cursor.fetchall()]
    
    conn.close()
    
    result = {
        'success': True,
        'stats': {
            'approved_teachers': approved_teachers,
            'pending_teachers': pending_teachers,
            'total_students': total_students,
            'total_assessments': total_assessments,
            'total_submissions': total_submissions,
            'total_courses': total_courses
        },
        'stream_breakdown': stream_breakdown,
        'recent_teachers': recent_teachers
    }
    # Store in server-side cache
    _admin_stats_cache['data'] = result
    _admin_stats_cache['ts'] = time.time()
    return jsonify(result)

@app.route('/api/admin/faculty/search')
@admin_required
def admin_faculty_search():
    q = str(request.args.get('q') or '').strip()
    stream = str(request.args.get('stream') or '').strip()
    college = str(request.args.get('college') or '').strip()
    university = str(request.args.get('university') or '').strip()
    subject = str(request.args.get('subject') or '').strip()
    status = str(request.args.get('status') or '').strip()

    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Get distinct options for filter dropdowns strictly from existing teachers
    cursor.execute("SELECT DISTINCT college_name FROM teachers WHERE college_name IS NOT NULL AND TRIM(college_name) != '' ORDER BY college_name")
    colleges = [r['college_name'] for r in cursor.fetchall()]

    cursor.execute("SELECT DISTINCT university_name FROM teachers WHERE university_name IS NOT NULL AND TRIM(university_name) != '' ORDER BY university_name")
    universities = [r['university_name'] for r in cursor.fetchall()]

    cursor.execute("SELECT DISTINCT faculty_stream FROM teachers WHERE faculty_stream IS NOT NULL AND TRIM(faculty_stream) != '' ORDER BY faculty_stream")
    streams = [r['faculty_stream'] for r in cursor.fetchall()]

    # If stream is provided, get subjects strictly for teachers in that stream
    if stream and stream != 'ALL':
        cursor.execute("SELECT DISTINCT subject_name FROM teachers WHERE faculty_stream = ? AND subject_name IS NOT NULL AND TRIM(subject_name) != '' ORDER BY subject_name", (stream,))
        subjects = [r['subject_name'] for r in cursor.fetchall()]
    else:
        cursor.execute("SELECT DISTINCT subject_name FROM teachers WHERE subject_name IS NOT NULL AND TRIM(subject_name) != '' ORDER BY subject_name")
        subjects = [r['subject_name'] for r in cursor.fetchall()]

    sql = """
    SELECT t.*,
           COALESCE(ts.courses_count, 0) as courses_count,
           COALESCE(tr.students_count, 0) as students_count,
           COALESCE(ca.assessments_count, 0) as assessments_count,
           COALESCE(s.submissions_count, 0) as submissions_count
    FROM teachers t
    LEFT JOIN (SELECT teacher_id, COUNT(*) as courses_count FROM teacher_subjects GROUP BY teacher_id) ts ON t.id = ts.teacher_id
    LEFT JOIN (SELECT teacher_id, COUNT(DISTINCT prn) as students_count FROM teacher_rosters GROUP BY teacher_id) tr ON t.id = tr.teacher_id
    LEFT JOIN (SELECT teacher_id, COUNT(*) as assessments_count FROM created_assessments GROUP BY teacher_id) ca ON t.id = ca.teacher_id
    LEFT JOIN (SELECT teacher_id, COUNT(*) as submissions_count FROM submissions GROUP BY teacher_id) s ON t.id = s.teacher_id
    WHERE 1=1
    """
    params = []

    if q:
        sql += """ AND (
            LOWER(t.name) LIKE ? OR
            LOWER(t.teacher_code) LIKE ? OR
            LOWER(t.email) LIKE ? OR
            LOWER(t.mobile) LIKE ? OR
            LOWER(t.college_name) LIKE ? OR
            LOWER(t.university_name) LIKE ? OR
            LOWER(t.subject_name) LIKE ?
        )"""
        pattern = f"%{q.lower()}%"
        params.extend([pattern] * 7)

    if stream and stream != 'ALL':
        sql += " AND t.faculty_stream = ?"
        params.append(stream)

    if college and college != 'ALL':
        sql += " AND t.college_name = ?"
        params.append(college)

    if university and university != 'ALL':
        sql += " AND t.university_name = ?"
        params.append(university)

    if subject and subject != 'ALL':
        sql += " AND t.subject_name = ?"
        params.append(subject)

    if status and status != 'ALL':
        sql += " AND t.status = ?"
        params.append(status)

    sql += " ORDER BY t.id DESC"
    cursor.execute(sql, params)
    teachers = [dict(r) for r in cursor.fetchall()]
    conn.close()

    return jsonify({
        'success': True,
        'teachers': teachers,
        'colleges': colleges,
        'universities': universities,
        'subjects': subjects,
        'streams': streams,
        'count': len(teachers)
    })

@app.route('/api/admin/teachers/<int:teacher_id>/approve', methods=['POST'])
@admin_required
def admin_direct_approve_teacher(teacher_id):
    global _admin_stats_cache
    admin = get_current_admin()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE id = ?", (teacher_id,))
    teacher = cursor.fetchone()
    if not teacher:
        conn.close()
        return jsonify({'error': 'Teacher not found.'}), 404
        
    t_dict = dict(teacher)
    now = datetime.datetime.now()
    now_str = now.strftime('%Y-%m-%d %H:%M:%S')

    payload = request.get_json(silent=True) or {}
    custom_days = payload.get('validity_days')
    if custom_days is not None:
        try:
            custom_days = int(custom_days)
        except (ValueError, TypeError):
            custom_days = None

    # Check if this is an extension / update renewal
    if t_dict.get('extension_requested') == 1 or t_dict.get('approval_type') == 'update':
        if custom_days and custom_days > 0:
            base_date = now.date()
            if t_dict.get('validity_end'):
                try:
                    curr_end = datetime.datetime.strptime(str(t_dict['validity_end'])[:10], '%Y-%m-%d').date()
                    if curr_end >= base_date:
                        base_date = curr_end
                except Exception:
                    pass
            new_end_date = base_date + datetime.timedelta(days=custom_days)
            next_end = new_end_date.strftime('%Y-%m-%d')
            start_year = new_end_date.year if new_end_date.month >= 6 else new_end_date.year - 1
            next_acad = f"{start_year}-{start_year+1}"
        else:
            next_acad, next_start, next_end = database.get_next_academic_year(t_dict.get('validity_end'))

        cursor.execute("""
        UPDATE teachers 
        SET validity_end = ?, academic_year = ?, extension_requested = 0, approval_type = 'new', approved_at = ?, approved_by = ?
        WHERE id = ?
        """, (next_end, next_acad, now_str, admin['name'], teacher_id))
        conn.commit()
        conn.close()

        _admin_stats_cache['data'] = None

        if t_dict.get('email'):
            send_teacher_extension_approved_email(
                to_email=t_dict['email'],
                name=t_dict['name'],
                teacher_code=t_dict['teacher_code'],
                academic_year=next_acad,
                validity_end=next_end,
                college_name=t_dict.get('college_name')
            )

        return jsonify({
            'success': True,
            'is_extension': True,
            'message': f'Teacher {t_dict["name"]} validity extended until {next_end} ({custom_days or "Academic Year"} days)! (मुदतवाढ यशस्वीरीत्या मंजूर केली)',
            'teacher_code': t_dict['teacher_code'],
            'email': t_dict['email'],
            'academic_year': next_acad,
            'validity_end': next_end,
            'validity_days': custom_days
        })
    else:
        # New Registration Approval
        generated_password = database.generate_random_password(8)
        pwd_hash = database.hash_password(generated_password)
        
        if custom_days and custom_days > 0:
            val_start = now.strftime('%Y-%m-%d')
            new_end_date = now.date() + datetime.timedelta(days=custom_days)
            val_end = new_end_date.strftime('%Y-%m-%d')
            start_year = now.year if now.month >= 6 else now.year - 1
            acad_yr = f"{start_year}-{start_year+1}"
        else:
            acad_yr, val_start, val_end = database.get_current_academic_year()

        cursor.execute("""
        UPDATE teachers 
        SET status = 'approved', password_hash = ?, temp_plain_password = ?, validity_start = ?, validity_end = ?, academic_year = ?, extension_requested = 0, approval_type = 'new', approved_at = ?, approved_by = ?
        WHERE id = ?
        """, (pwd_hash, generated_password, val_start, val_end, acad_yr, now_str, admin['name'], teacher_id))
        conn.commit()
        conn.close()

        _admin_stats_cache['data'] = None
        database.backup_database_to_cloud_async()

        if t_dict.get('email'):
            send_teacher_approval_email(
                to_email=t_dict['email'],
                name=t_dict['name'],
                teacher_code=t_dict['teacher_code'],
                password=generated_password,
                college_name=t_dict.get('college_name'),
                subject_name=t_dict.get('subject_name'),
                validity_end=val_end
            )

        return jsonify({
            'success': True,
            'is_extension': False,
            'message': f'Teacher {t_dict["name"]} approved successfully until {val_end}! (नवीन शिक्षक नोंदणी मंजूर केली)',
            'teacher_code': t_dict['teacher_code'],
            'email': t_dict['email'],
            'temporary_password': generated_password,
            'generated_password': generated_password,
            'validity_end': val_end,
            'validity_days': custom_days
        })

@app.route('/api/admin/teachers/<int:teacher_id>/reject', methods=['POST'])
@admin_required
def admin_direct_reject_teacher(teacher_id):
    admin = get_current_admin()
    data = request.json or {}
    reason = data.get('reason') or data.get('rejection_reason') or 'Incomplete details'
    conn = database.get_db_connection()
    cursor = conn.cursor()
    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute("""
    UPDATE teachers 
    SET status = 'rejected', extension_requested = 0, rejection_reason = ?, approved_at = ?, approved_by = ?
    WHERE id = ?
    """, (reason, now_str, admin['name'], teacher_id))
    conn.commit()
    conn.close()

    global _admin_stats_cache
    _admin_stats_cache['data'] = None

    return jsonify({'success': True, 'message': 'Teacher request rejected.'})

def delete_teachers_and_dependents(cursor, teacher_ids):
    """
    Safely deletes teacher records and all cascaded dependents using chunking
    and SQL subqueries to prevent SQLite variable limits ('too many SQL variables').
    """
    if not teacher_ids:
        return 0
    clean_ids = []
    for tid in teacher_ids:
        try:
            clean_ids.append(int(tid))
        except (ValueError, TypeError):
            pass
    if not clean_ids:
        return 0

    chunk_size = 50
    for i in range(0, len(clean_ids), chunk_size):
        chunk = clean_ids[i:i + chunk_size]
        ph = ','.join('?' for _ in chunk)

        # 1. Dismissed announcements
        cursor.execute(f"""
            DELETE FROM student_dismissed_announcements 
            WHERE announcement_id IN (
                SELECT id FROM teacher_announcements WHERE teacher_id IN ({ph})
            )
        """, chunk)

        # 2. Evaluations linked to submissions or evaluated by teacher
        cursor.execute(f"""
            DELETE FROM evaluations 
            WHERE evaluated_by_teacher_id IN ({ph})
               OR submission_id IN (
                   SELECT id FROM submissions 
                   WHERE teacher_id IN ({ph}) 
                      OR created_assessment_id IN (SELECT id FROM created_assessments WHERE teacher_id IN ({ph}))
                      OR roster_id IN (SELECT id FROM teacher_rosters WHERE teacher_id IN ({ph}))
               )
        """, chunk + chunk + chunk + chunk)

        # 3. Audit logs linked to submissions
        cursor.execute(f"""
            DELETE FROM audit_logs 
            WHERE submission_id IN (
                SELECT id FROM submissions 
                WHERE teacher_id IN ({ph}) 
                   OR created_assessment_id IN (SELECT id FROM created_assessments WHERE teacher_id IN ({ph}))
                   OR roster_id IN (SELECT id FROM teacher_rosters WHERE teacher_id IN ({ph}))
            )
        """, chunk + chunk + chunk)

        # 4. Submissions linked to teacher, assessments, or rosters
        cursor.execute(f"""
            DELETE FROM submissions 
            WHERE teacher_id IN ({ph}) 
               OR created_assessment_id IN (SELECT id FROM created_assessments WHERE teacher_id IN ({ph}))
               OR roster_id IN (SELECT id FROM teacher_rosters WHERE teacher_id IN ({ph}))
        """, chunk + chunk + chunk)

        # 5. Announcements & study materials
        cursor.execute(f"DELETE FROM teacher_announcements WHERE teacher_id IN ({ph})", chunk)
        cursor.execute(f"DELETE FROM teacher_study_materials WHERE teacher_id IN ({ph})", chunk)

        # 6. Assessments, mappings, subjects, connections, rosters
        cursor.execute(f"DELETE FROM created_assessments WHERE teacher_id IN ({ph})", chunk)
        cursor.execute(f"DELETE FROM teacher_assignment_mappings WHERE teacher_id IN ({ph})", chunk)
        cursor.execute(f"DELETE FROM teacher_subjects WHERE teacher_id IN ({ph})", chunk)
        cursor.execute(f"DELETE FROM student_connections WHERE teacher_id IN ({ph})", chunk)
        cursor.execute(f"DELETE FROM teacher_rosters WHERE teacher_id IN ({ph})", chunk)

        # 7. Teachers table
        cursor.execute(f"DELETE FROM teachers WHERE id IN ({ph})", chunk)

    return len(clean_ids)

@app.route('/api/admin/teachers/bulk-delete', methods=['POST'])
@admin_required
def admin_bulk_delete_teachers():
    data = request.json or {}
    teacher_ids = data.get('teacher_ids', [])
    if not teacher_ids:
        return jsonify({'error': 'No teachers selected for deletion. (कोणतेही रेकॉर्ड निवडले नाहीत)'}), 400

    conn = None
    try:
        conn = database.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("PRAGMA foreign_keys = OFF")

        deleted_count = delete_teachers_and_dependents(cursor, teacher_ids)
        if deleted_count == 0:
            return jsonify({'error': 'Invalid teacher IDs provided.'}), 400

        conn.commit()

        global _admin_stats_cache
        _admin_stats_cache['data'] = None

        return jsonify({
            'success': True,
            'deleted_count': deleted_count,
            'message': f'{deleted_count} record(s) deleted successfully. (निवडलेले {deleted_count} शिक्षक रेकॉर्ड यशस्वीरीत्या हटवले)'
        })
    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({'error': f'Database error during bulk deletion: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/admin/teachers/bulk-approve', methods=['POST'])
@admin_required
def admin_bulk_approve_teachers():
    data = request.json or {}
    teacher_ids = data.get('teacher_ids', [])
    if not teacher_ids:
        return jsonify({'error': 'No teachers selected for approval. (कोणतेही रेकॉर्ड निवडले नाहीत)'}), 400

    custom_days = data.get('validity_days')
    if custom_days is not None:
        try:
            custom_days = int(custom_days)
        except (ValueError, TypeError):
            custom_days = None

    conn = database.get_db_connection()
    cursor = conn.cursor()
    admin = get_current_admin()
    approved_count = 0
    now = datetime.datetime.now()
    now_str = now.strftime('%Y-%m-%d %H:%M:%S')

    for t_id in teacher_ids:
        cursor.execute("SELECT * FROM teachers WHERE id = ?", (t_id,))
        teacher = cursor.fetchone()
        if not teacher:
            continue
        t_dict = dict(teacher)
        if t_dict.get('extension_requested') == 1 or t_dict.get('approval_type') == 'update':
            if custom_days and custom_days > 0:
                base_date = now.date()
                if t_dict.get('validity_end'):
                    try:
                        curr_end = datetime.datetime.strptime(str(t_dict['validity_end'])[:10], '%Y-%m-%d').date()
                        if curr_end >= base_date:
                            base_date = curr_end
                    except Exception:
                        pass
                new_end_date = base_date + datetime.timedelta(days=custom_days)
                n_end = new_end_date.strftime('%Y-%m-%d')
                start_year = new_end_date.year if new_end_date.month >= 6 else new_end_date.year - 1
                n_acad = f"{start_year}-{start_year+1}"
            else:
                n_acad, n_start, n_end = database.get_next_academic_year(t_dict.get('validity_end'))

            cursor.execute("""
            UPDATE teachers 
            SET validity_end = ?, academic_year = ?, extension_requested = 0, approval_type = 'new', approved_at = ?, approved_by = ?
            WHERE id = ?
            """, (n_end, n_acad, now_str, admin['name'], t_id))
            if t_dict.get('email'):
                send_teacher_extension_approved_email(t_dict['email'], t_dict['name'], t_dict['teacher_code'], n_acad, n_end, t_dict.get('college_name'))
        else:
            generated_password = database.generate_random_password(8)
            pwd_hash = database.hash_password(generated_password)
            
            if custom_days and custom_days > 0:
                val_start = now.strftime('%Y-%m-%d')
                new_end_date = now.date() + datetime.timedelta(days=custom_days)
                val_end = new_end_date.strftime('%Y-%m-%d')
                start_year = now.year if now.month >= 6 else now.year - 1
                acad_yr = f"{start_year}-{start_year+1}"
            else:
                acad_yr, val_start, val_end = database.get_current_academic_year()

            cursor.execute("""
            UPDATE teachers 
            SET status = 'approved', password_hash = ?, temp_plain_password = ?, validity_start = ?, validity_end = ?, academic_year = ?, extension_requested = 0, approval_type = 'new', approved_at = ?, approved_by = ?
            WHERE id = ?
            """, (pwd_hash, generated_password, val_start, val_end, acad_yr, now_str, admin['name'], t_id))
            if t_dict.get('email'):
                send_teacher_approval_email(t_dict['email'], t_dict['name'], t_dict['teacher_code'], generated_password, t_dict.get('college_name'), t_dict.get('subject_name'), val_end)
        approved_count += 1

    conn.commit()
    conn.close()
    return jsonify({'success': True, 'approved_count': approved_count, 'message': f'{approved_count} request(s) approved successfully. (निवडलेल्या सर्व विनंत्या मंजूर केल्या)'})

@app.route('/api/admin/teacher-action', methods=['POST'])
@admin_required
def admin_teacher_action():
    data = request.json or {}
    teacher_id = data.get('teacher_id')
    action = data.get('action') # approve, reject, deactivate, activate
    rejection_reason = data.get('rejection_reason', '').strip()

    if not (teacher_id and action):
        return jsonify({'error': 'Teacher ID and action are required.'}), 400

    admin = get_current_admin()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE id = ?", (teacher_id,))
    teacher = cursor.fetchone()
    if not teacher:
        conn.close()
        return jsonify({'error': 'Teacher not found.'}), 404

    t_dict = dict(teacher)
    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if action == 'approve':
        if t_dict.get('extension_requested') == 1 or t_dict.get('approval_type') == 'update':
            next_acad, next_start, next_end = database.get_next_academic_year(t_dict.get('validity_end'))
            cursor.execute("""
            UPDATE teachers 
            SET validity_end = ?, academic_year = ?, extension_requested = 0, approval_type = 'new', approved_at = ?, approved_by = ?
            WHERE id = ?
            """, (next_end, next_acad, now_str, admin['name'], teacher_id))
            conn.commit()
            conn.close()

            if t_dict.get('email'):
                send_teacher_extension_approved_email(
                    to_email=t_dict['email'],
                    name=t_dict['name'],
                    teacher_code=t_dict['teacher_code'],
                    academic_year=next_acad,
                    validity_end=next_end,
                    college_name=t_dict.get('college_name')
                )

            return jsonify({
                'message': f'Teacher {t_dict["name"]} validity extended for academic year {next_acad}!',
                'teacher_code': t_dict['teacher_code'],
                'email': t_dict['email'],
                'is_extension': True
            })
        else:
            generated_password = database.generate_random_password(8)
            pwd_hash = database.hash_password(generated_password)
            acad_yr, val_start, val_end = database.get_current_academic_year()
            cursor.execute("""
            UPDATE teachers 
            SET status = 'approved', password_hash = ?, temp_plain_password = ?, validity_start = ?, validity_end = ?, academic_year = ?, extension_requested = 0, approval_type = 'new', approved_at = ?, approved_by = ?
            WHERE id = ?
            """, (pwd_hash, generated_password, val_start, val_end, acad_yr, now_str, admin['name'], teacher_id))
            conn.commit()
            conn.close()

            if t_dict.get('email'):
                send_teacher_approval_email(
                    to_email=t_dict['email'],
                    name=t_dict['name'],
                    teacher_code=t_dict['teacher_code'],
                    password=generated_password,
                    college_name=t_dict.get('college_name'),
                    subject_name=t_dict.get('subject_name'),
                    validity_end=val_end
                )

            database.backup_database_to_cloud_async()
            return jsonify({
                'message': f'Teacher {t_dict["name"]} approved successfully!',
                'teacher_code': t_dict['teacher_code'],
                'email': t_dict['email'],
                'generated_password': generated_password,
                'is_extension': False
            })

    elif action == 'reject':
        cursor.execute("""
        UPDATE teachers 
        SET status = 'rejected', extension_requested = 0, rejection_reason = ?, approved_at = ?, approved_by = ?
        WHERE id = ?
        """, (rejection_reason, now_str, admin['name'], teacher_id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Teacher request rejected.'})

    elif action == 'deactivate':
        cursor.execute("UPDATE teachers SET status = 'deactivated' WHERE id = ?", (teacher_id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Teacher account deactivated.'})

    elif action == 'activate':
        cursor.execute("UPDATE teachers SET status = 'approved' WHERE id = ?", (teacher_id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Teacher account activated.'})

    conn.close()
    return jsonify({'error': 'Invalid action.'}), 400

@app.route('/api/admin/clean-dummy-data', methods=['GET', 'POST'])
@admin_required
def admin_clean_dummy_data():
    conn = database.get_db_connection()
    cursor = conn.cursor()
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
    conn.commit()
    conn.close()

    # Invalidate cache and backup clean state to Google Drive
    global _admin_stats_cache
    _admin_stats_cache['data'] = None
    database.backup_database_to_cloud_async()

    return jsonify({
        'success': True,
        'message': 'सर्व डमी व सॅम्पल शिक्षक डेटा कायमचा हटवला आहे! (All dummy/sample teachers wiped successfully and database cleaned).'
    })

# ----------------- CLOUD SYNC & RESTORE ENDPOINTS -----------------
@app.route('/api/system/cloud-status', methods=['GET'])
def system_cloud_status():
    """Public health-check endpoint to verify Google Drive sync connection."""
    status = database.check_cloud_sync_status()
    return jsonify(status)

@app.route('/api/admin/cloud-sync-status', methods=['GET'])
@admin_required
def admin_cloud_sync_status():
    """Admin endpoint to check full cloud sync health."""
    status = database.check_cloud_sync_status()
    return jsonify(status)

@app.route('/api/admin/cloud-backup-now', methods=['POST'])
@admin_required
def admin_cloud_backup_now():
    """Force immediate database backup to Google Drive."""
    res = database.backup_database_to_cloud_sync()
    return jsonify(res)

@app.route('/api/admin/cloud-restore-now', methods=['POST'])
@admin_required
def admin_cloud_restore_now():
    """Force immediate database restore from Google Drive."""
    success = database.restore_database_from_cloud()
    if success:
        database.init_db()
        database.seed_database()
        global _admin_stats_cache
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': 'Google Drive वरून डेटाबेस यशस्वीरीत्या पूर्ववत केला! (Database successfully restored from Google Drive).'})
    else:
        return jsonify({'success': False, 'error': 'Google Drive वर बॅकअप सापडला नाही किंवा कनेक्शन अयशस्वी झाले.'}), 400

# =========================================================================
# 2. TEACHER REGISTRATION & AUTHENTICATION
# =========================================================================
@app.route('/api/teacher/register', methods=['POST'])
def teacher_register():
    data = request.json or {}
    name = str(data.get('name', '')).strip()
    designation = str(data.get('designation', '')).strip()
    college_name = str(data.get('college_name', '')).strip()
    university_name = str(data.get('university_name', '')).strip()
    faculty_stream = str(data.get('faculty_stream', '')).strip()
    custom_stream = str(data.get('custom_stream', '')).strip()
    subject_name = str(data.get('subject_name', '')).strip()
    custom_subject = str(data.get('custom_subject', '')).strip()
    email = str(data.get('email', '')).strip().lower()
    mobile = str(data.get('mobile', '')).strip()

    final_stream = custom_stream if ('इतर' in faculty_stream or 'Other' in faculty_stream) and custom_stream else faculty_stream
    final_subject = custom_subject if ('इतर' in subject_name or 'Other' in subject_name or 'Custom' in subject_name) and custom_subject else subject_name

    if not (name and designation and college_name and university_name and final_stream and final_subject and email and mobile):
        return jsonify({'error': 'Please fill all required registration fields.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, status FROM teachers WHERE email = ?", (email,))
    existing = cursor.fetchone()
    if existing:
        if existing['status'] == 'rejected':
            cursor.execute("SELECT id FROM teachers ORDER BY id DESC LIMIT 1")
            last_t = cursor.fetchone()
            next_num = (last_t['id'] + 1) if last_t else 1
            teacher_code = database.generate_clean_teacher_code(final_subject, name, next_num)
            cursor.execute("""
            UPDATE teachers 
            SET teacher_code = ?, name = ?, designation = ?, college_name = ?, university_name = ?,
                faculty_stream = ?, custom_stream = ?, subject_name = ?, custom_subject = ?, mobile = ?,
                status = 'pending', rejection_reason = NULL, extension_requested = 0
            WHERE id = ?
            """, (teacher_code, name, designation, college_name, university_name, final_stream, custom_stream, final_subject, custom_subject, mobile, existing['id']))
            conn.commit()
            conn.close()
            return jsonify({
                'message': 'Registration re-submitted successfully! Waiting for Administrator approval.',
                'id': existing['id'],
                'teacher_id': existing['id'],
                'teacher_code': teacher_code
            }), 200
        else:
            conn.close()
            st = existing['status']
            st_text = 'मंजूर (Approved - Already Active)' if st == 'approved' else ('प्रलंबित (Pending Admin Approval)' if st == 'pending' else st)
            return jsonify({
                'error': f'A faculty registration with email "{email}" already exists (Status: {st_text}). If you forgot your password, please use Forgot Password.'
            }), 409

    cursor.execute("SELECT id FROM teachers ORDER BY id DESC LIMIT 1")
    last_t = cursor.fetchone()
    next_num = (last_t['id'] + 1) if last_t else 1
    teacher_code = database.generate_clean_teacher_code(final_subject, name, next_num)

    cursor.execute("""
    INSERT INTO teachers 
    (teacher_code, name, designation, college_name, university_name, faculty_stream, custom_stream, subject_name, custom_subject, email, mobile, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    """, (teacher_code, name, designation, college_name, university_name, final_stream, custom_stream, final_subject, custom_subject, email, mobile))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()

    # Automatically backup state to Google Drive Cloud
    database.backup_database_to_cloud_async()

    send_teacher_registration_received_email(
        to_email=email,
        name=name,
        teacher_code=teacher_code,
        college_name=college_name,
        subject_name=final_subject
    )

    return jsonify({
        'message': 'Registration submitted successfully! Waiting for Administrator approval.',
        'id': new_id,
        'teacher_id': new_id,
        'teacher_code': teacher_code
    }), 201

@app.route('/api/teacher/login', methods=['POST'])
def teacher_login():
    data = request.json or {}
    username = str(data.get('username') or data.get('identifier') or data.get('email') or data.get('teacher_code') or '').strip().lower()
    password = str(data.get('password') or '').strip()

    if not (username and password):
        return jsonify({'error': 'Please provide email/Teacher Code and password.'}), 400

    pwd_hash = database.hash_password(password)
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM teachers
    WHERE (LOWER(email) = ? OR LOWER(teacher_code) = ?) AND password_hash = ?
    """, (username, username, pwd_hash))
    teacher = cursor.fetchone()
    conn.close()

    if not teacher:
        return jsonify({'error': 'Invalid credentials. Check email/code and password.'}), 401

    if teacher['status'] == 'pending':
        return jsonify({'error': 'Your registration is currently pending Admin approval.'}), 403
    elif teacher['status'] == 'deactivated':
        return jsonify({'error': 'Your account has been deactivated by the administrator.'}), 403
    elif teacher['status'] == 'rejected':
        return jsonify({'error': f'Registration rejected: {teacher["rejection_reason"] or "Contact admin"}'}), 403

    session.clear()
    session['teacher_id'] = teacher['id']
    session['teacher_name'] = teacher['name']
    session['role'] = 'teacher'

    token = generate_auth_token('teacher', teacher['id'])

    return jsonify({
        'success': True,
        'message': 'Login successful',
        'teacher': dict(teacher),
        'token': token
    })

@app.route('/api/teacher/forgot-password', methods=['POST'])
def teacher_forgot_password():
    data = request.json or {}
    email = str(data.get('email') or '').strip().lower()
    
    if not email:
        return jsonify({'error': 'Please enter your registered email address (नोंदणीकृत ईमेल आयडी प्रविष्ट करा).'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE LOWER(email) = ?", (email,))
    teacher = cursor.fetchone()
    
    if not teacher:
        conn.close()
        return jsonify({'error': 'No faculty account found with this email (या ईमेलने कोणतीही शिक्षक नोंदणी सापडली नाही). Please check your registered email or contact admin.'}), 404
        
    if teacher['status'] == 'pending':
        conn.close()
        return jsonify({'error': 'Your registration is still pending Admin approval (नोंदणी अजून प्रशासकीय मंजुरीच्या प्रतीक्षेत आहे).'}), 403
    elif teacher['status'] == 'deactivated':
        conn.close()
        return jsonify({'error': 'Your account has been deactivated (खाते निष्क्रिय करण्यात आले आहे).'}), 403
        
    new_password = database.generate_random_password(8)
    pwd_hash = database.hash_password(new_password)
    
    cursor.execute("UPDATE teachers SET password_hash = ?, temp_plain_password = ? WHERE id = ?", (pwd_hash, new_password, teacher['id']))
    conn.commit()
    conn.close()

    # Send reset password email to teacher
    if teacher['email']:
        t_dict = dict(teacher)
        send_teacher_forgot_password_email(
            to_email=t_dict.get('email'),
            name=t_dict.get('name'),
            teacher_code=t_dict.get('teacher_code'),
            new_password=new_password,
            college_name=t_dict.get('college_name')
        )
    
    # Mask teacher email
    t_email = teacher['email']
    masked_email = t_email
    if '@' in t_email:
        parts = t_email.split('@')
        u = parts[0]
        d = parts[1]
        masked_email = (u[:2] + '***@' + d) if len(u) > 2 else (u[:1] + '***@' + d)

    return jsonify({
        'success': True,
        'message': f'नवीन पासवर्ड आपल्या नोंदणीकृत ईमेलवर ({masked_email}) यशस्वीरीत्या पाठवला आहे.',
        'teacher_name': teacher['name'],
        'teacher_code': teacher['teacher_code'],
        'email_masked': masked_email
    })

@app.route('/api/teacher/change-password', methods=['POST'])
@teacher_required
def teacher_change_password():
    teacher_session = get_current_teacher()
    data = request.json or {}
    current_password = str(data.get('current_password') or '').strip()
    new_password = str(data.get('new_password') or '').strip()
    confirm_password = str(data.get('confirm_password') or '').strip()

    if not current_password or not new_password:
        return jsonify({'error': 'Current password and new password are required (सध्याचा पासवर्ड आणि नवीन पासवर्ड आवश्यक आहेत).'}), 400

    if len(new_password) < 6:
        return jsonify({'error': 'New password must be at least 6 characters long (नवीन पासवर्ड किमान ६ वर्णांचा असावा).'}), 400

    if confirm_password and new_password != confirm_password:
        return jsonify({'error': 'New password and confirmation do not match (नवीन पासवर्ड आणि कन्फर्म पासवर्ड जुळत नाहीत).'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE id = ?", (teacher_session['id'],))
    teacher = cursor.fetchone()

    if not teacher:
        conn.close()
        return jsonify({'error': 'Teacher account not found.'}), 404

    if not database.verify_password(current_password, teacher['password_hash']):
        conn.close()
        return jsonify({'error': 'Incorrect current password (सध्याचा पासवर्ड चुकीचा आहे).'}), 400

    new_hash = database.hash_password(new_password)
    cursor.execute("UPDATE teachers SET password_hash = ?, temp_plain_password = ? WHERE id = ?", (new_hash, new_password, teacher['id']))
    conn.commit()
    conn.close()

    # Dispatch confirmation email
    if teacher['email']:
        t_dict = dict(teacher)
        send_teacher_password_changed_email(
            to_email=t_dict.get('email'),
            name=t_dict.get('name'),
            teacher_code=t_dict.get('teacher_code'),
            college_name=t_dict.get('college_name')
        )

    return jsonify({
        'success': True,
        'message': 'Password changed successfully! (पासवर्ड यशस्वीरीत्या बदलला आहे.)'
    })

@app.route('/api/teacher/me')
def teacher_me():
    teacher = get_current_teacher()
    if not teacher:
        return jsonify({'authenticated': False}), 200
    return jsonify({'authenticated': True, 'teacher': teacher})

@app.route('/api/teacher/logout', methods=['POST'])
def teacher_logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'})

# =========================================================================
# 3. UNIFIED TEACHER WORKFLOW APIS (MAPPING, ROSTERS, ASSESSMENTS, INVITES)
# =========================================================================

@app.route('/api/teacher/dashboard-stats')
@teacher_required
def get_teacher_dashboard_stats():
    teacher_id = session['teacher_id']
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    # 1. Basic Counts
    cursor.execute('SELECT COUNT(*) FROM teacher_subjects WHERE teacher_id = ?', (teacher_id,))
    total_courses = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(DISTINCT prn) FROM teacher_rosters WHERE teacher_id = ?', (teacher_id,))
    total_students = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM created_assessments WHERE teacher_id = ?', (teacher_id,))
    total_assessments = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM submissions WHERE teacher_id = ?', (teacher_id,))
    total_submissions = cursor.fetchone()[0]
    
    cursor.execute('''
        SELECT COUNT(*) FROM submissions s 
        WHERE s.teacher_id = ? AND (s.status = 'Assessed' OR EXISTS (SELECT 1 FROM evaluations e WHERE e.submission_id = s.id))
    ''', (teacher_id,))
    evaluated_submissions = cursor.fetchone()[0]
    
    pending_evaluations = max(0, total_submissions - evaluated_submissions)
    
    # 2. Comprehensive Class breakdown
    cursor.execute('''
        SELECT DISTINCT class_name, academic_year FROM teacher_subjects WHERE teacher_id = ?
        UNION
        SELECT DISTINCT class_name, academic_year FROM teacher_rosters WHERE teacher_id = ?
    ''', (teacher_id, teacher_id))
    classes = cursor.fetchall()
    class_breakdown = []
    for cl in classes:
        c_name = cl['class_name']
        ay = cl['academic_year']
        
        cursor.execute('''
            SELECT semester, subject_name, course_code, course_name FROM teacher_subjects
            WHERE teacher_id = ? AND class_name = ?
            ORDER BY id DESC LIMIT 1
        ''', (teacher_id, c_name))
        sub_info = cursor.fetchone()
        
        cursor.execute('SELECT COUNT(DISTINCT prn) FROM teacher_rosters WHERE teacher_id = ? AND class_name = ?', (teacher_id, c_name))
        student_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM created_assessments WHERE teacher_id = ? AND class_name = ?', (teacher_id, c_name))
        asm_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM submissions WHERE teacher_id = ? AND class_name = ?', (teacher_id, c_name))
        sub_count = cursor.fetchone()[0]
        
        class_breakdown.append({
            'academic_year': ay,
            'class_name': c_name,
            'semester': sub_info['semester'] if sub_info else '—',
            'subject_name': sub_info['subject_name'] if sub_info else '—',
            'course_code': sub_info['course_code'] if sub_info else '—',
            'course_name': sub_info['course_name'] if sub_info else '',
            'student_count': student_count,
            'asm_count': asm_count,
            'sub_count': sub_count
        })
    
    # 3. Recent Assessments
    cursor.execute('''
        SELECT ca.*,
               (SELECT COUNT(*) FROM submissions s WHERE s.created_assessment_id = ca.id) as submissions_count,
               (SELECT COUNT(*) FROM submissions s WHERE s.created_assessment_id = ca.id AND (s.status = 'Assessed' OR EXISTS (SELECT 1 FROM evaluations e WHERE e.submission_id = s.id))) as evaluated_count
        FROM created_assessments ca
        WHERE ca.teacher_id = ?
        ORDER BY ca.id DESC LIMIT 5
    ''', (teacher_id,))
    recent_assessments = [dict(r) for r in cursor.fetchall()]
    
    # 4. Recent Submissions
    cursor.execute('''
        SELECT s.*, ca.assessment_session_title, ca.assessment_type_name, ev.marks_obtained, ev.maximum_marks as eval_max_marks, ev.remarks as eval_remarks
        FROM submissions s
        LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
        LEFT JOIN evaluations ev ON ev.submission_id = s.id
        WHERE s.teacher_id = ?
        ORDER BY s.id DESC LIMIT 5
    ''', (teacher_id,))
    recent_submissions = [dict(r) for r in cursor.fetchall()]
    
    # Fetch teacher validity details
    cursor.execute("SELECT validity_start, validity_end, academic_year, extension_requested, extension_requested_at, extension_requested_year, approval_type FROM teachers WHERE id = ?", (teacher_id,))
    val_row = cursor.fetchone()
    teacher_validity = dict(val_row) if val_row else {}
    if teacher_validity:
        teacher_validity['extension_requested'] = bool(teacher_validity.get('extension_requested'))
        now_date = datetime.datetime.now().date()
        days_remaining = None
        is_expiring_soon = False
        is_expired = False
        
        if teacher_validity.get('validity_end'):
            try:
                end_d = datetime.datetime.strptime(str(teacher_validity['validity_end'])[:10], '%Y-%m-%d').date()
                days_remaining = (end_d - now_date).days
                if days_remaining <= 0:
                    is_expired = True
                    teacher_validity['is_valid'] = False
                elif days_remaining <= 30:
                    is_expiring_soon = True
                    teacher_validity['is_valid'] = True
                else:
                    teacher_validity['is_valid'] = True
            except Exception:
                teacher_validity['is_valid'] = True
        else:
            teacher_validity['is_valid'] = True
            
        teacher_validity['days_remaining'] = days_remaining
        teacher_validity['is_expiring_soon'] = is_expiring_soon
        teacher_validity['is_expired'] = is_expired

    conn.close()
    
    return jsonify({
        'success': True,
        'stats': {
            'total_courses': total_courses,
            'total_students': total_students,
            'total_assessments': total_assessments,
            'total_submissions': total_submissions,
            'evaluated_submissions': evaluated_submissions,
            'pending_evaluations': pending_evaluations
        },
        'teacher_validity': teacher_validity,
        'validity': teacher_validity,
        'class_breakdown': class_breakdown,
        'recent_assessments': recent_assessments,
        'recent_submissions': recent_submissions
    })

# --- TEACHER ACADEMIC YEAR VALIDITY EXTENSION REQUEST API ---
@app.route('/api/teacher/request-extension', methods=['POST'])
@teacher_required
def teacher_request_extension():
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    next_acad, next_start, next_end = database.get_next_academic_year(teacher.get('validity_end'))
    cursor.execute("""
    UPDATE teachers 
    SET extension_requested = 1, extension_requested_at = ?, extension_requested_year = ?, approval_type = 'update'
    WHERE id = ?
    """, (now_str, next_acad, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({
        'success': True,
        'message': f'शैक्षणिक वर्ष {next_acad} साठी मुदतवाढ विनंती यशस्वीरीत्या पाठवली आहे. (Validity extension requested for {next_acad}).',
        'requested_year': next_acad,
        'validity_start': next_start,
        'validity_end': next_end
    })

# --- TEACHER STUDENT SEARCH API (WITH 6-FILTER LOOKUP) ---
@app.route('/api/teacher/students/search')
@teacher_required
def teacher_students_search():
    teacher = get_current_teacher()
    t_id = teacher['id'] if teacher else None
    q = str(request.args.get('q') or '').strip()
    class_name = str(request.args.get('class_name') or '').strip()
    stream = str(request.args.get('faculty_stream') or request.args.get('stream') or '').strip()
    subject = str(request.args.get('subject_name') or request.args.get('subject') or '').strip()
    college = str(request.args.get('college_name') or request.args.get('college') or '').strip()
    university = str(request.args.get('university_name') or request.args.get('university') or '').strip()

    conn = database.get_db_connection()
    cursor = conn.cursor()

    sql = """
    SELECT tr.*,
           t.name as teacher_name,
           t.teacher_code,
           t.college_name,
           t.university_name,
           COALESCE(ts.faculty_stream, t.faculty_stream) as faculty_stream,
           COALESCE(ts.subject_name, t.subject_name) as subject_name,
           COALESCE(s.sub_count, 0) as submissions_count,
           COALESCE(s.assessed_count, 0) as assessed_count
    FROM teacher_rosters tr
    JOIN teachers t ON tr.teacher_id = t.id
    LEFT JOIN teacher_subjects ts ON ts.teacher_id = tr.teacher_id AND ts.class_name = tr.class_name
    LEFT JOIN (
        SELECT roster_id,
               COUNT(*) as sub_count,
               SUM(CASE WHEN status = 'Assessed' THEN 1 ELSE 0 END) as assessed_count
        FROM submissions
        GROUP BY roster_id
    ) s ON s.roster_id = tr.id
    WHERE 1=1
    """
    params = []
    if t_id:
        sql += " AND tr.teacher_id = ?"
        params.append(t_id)

    if q:
        sql += """ AND (
            LOWER(tr.student_name) LIKE ? OR
            LOWER(tr.prn) LIKE ? OR
            LOWER(tr.roll_number) LIKE ? OR
            LOWER(tr.email) LIKE ? OR
            LOWER(tr.mobile) LIKE ?
        )"""
        pattern = f"%{q.lower()}%"
        params.extend([pattern] * 5)

    if class_name and class_name != 'ALL':
        sql += " AND tr.class_name = ?"
        params.append(class_name)

    if stream and stream != 'ALL':
        sql += " AND (t.faculty_stream = ? OR ts.faculty_stream = ?)"
        params.extend([stream, stream])

    if subject and subject != 'ALL':
        sql += " AND (t.subject_name = ? OR ts.subject_name = ?)"
        params.extend([subject, subject])

    if college and college != 'ALL':
        sql += " AND t.college_name = ?"
        params.append(college)

    if university and university != 'ALL':
        sql += " AND t.university_name = ?"
        params.append(university)

    sql += " GROUP BY tr.id ORDER BY tr.class_name ASC, CAST(tr.roll_number AS INTEGER) ASC, tr.roll_number ASC"
    cursor.execute(sql, params)
    students = [dict(r) for r in cursor.fetchall()]
    conn.close()

    return jsonify({
        'success': True,
        'students': students,
        'count': len(students)
    })

@app.route('/api/teacher/students/filter-options')
@teacher_required
def teacher_students_filter_options():
    teacher = get_current_teacher()
    t_id = teacher['id'] if teacher else None
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Classes: ONLY from this teacher's roster & mapped subjects
    cursor.execute("""
    SELECT DISTINCT class_name FROM (
        SELECT class_name FROM teacher_rosters WHERE teacher_id = ? AND class_name IS NOT NULL AND class_name != ''
        UNION
        SELECT class_name FROM teacher_subjects WHERE teacher_id = ? AND class_name IS NOT NULL AND class_name != ''
    ) ORDER BY class_name
    """, (t_id, t_id))
    classes = [r['class_name'] for r in cursor.fetchall() if r['class_name']]

    # Streams: ONLY from this teacher's profile & mapped subjects
    cursor.execute("""
    SELECT DISTINCT faculty_stream FROM (
        SELECT faculty_stream FROM teacher_subjects WHERE teacher_id = ? AND faculty_stream IS NOT NULL AND faculty_stream != ''
        UNION
        SELECT faculty_stream FROM teachers WHERE id = ? AND faculty_stream IS NOT NULL AND faculty_stream != ''
    ) ORDER BY faculty_stream
    """, (t_id, t_id))
    streams = [r['faculty_stream'] for r in cursor.fetchall() if r['faculty_stream']]

    # Subjects: ONLY from this teacher's profile & mapped subjects
    cursor.execute("""
    SELECT DISTINCT subject_name FROM (
        SELECT subject_name FROM teacher_subjects WHERE teacher_id = ? AND subject_name IS NOT NULL AND subject_name != ''
        UNION
        SELECT subject_name FROM teachers WHERE id = ? AND subject_name IS NOT NULL AND subject_name != ''
    ) ORDER BY subject_name
    """, (t_id, t_id))
    subjects = [r['subject_name'] for r in cursor.fetchall() if r['subject_name']]

    # College & University for this teacher
    cursor.execute("SELECT college_name, university_name FROM teachers WHERE id = ?", (t_id,))
    t_row = cursor.fetchone()
    colleges = [t_row['college_name']] if (t_row and t_row['college_name']) else []
    universities = [t_row['university_name']] if (t_row and t_row['university_name']) else []

    conn.close()

    filter_options = {
        'classes': classes,
        'streams': streams,
        'subjects': subjects,
        'colleges': colleges,
        'universities': universities
    }

    return jsonify({
        'success': True,
        'filter_options': filter_options,
        'classes': classes,
        'streams': streams,
        'subjects': subjects,
        'colleges': colleges,
        'universities': universities
    })

# --- TEACHER ANNOUNCEMENTS / NOTICES API ---
@app.route('/api/teacher/announcements', methods=['GET'])
@teacher_required
def get_teacher_announcements():
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM teacher_announcements
    WHERE teacher_id = ?
    ORDER BY id DESC
    """, (teacher['id'],))
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'success': True, 'announcements': rows, 'count': len(rows)})

@app.route('/api/teacher/announcements', methods=['POST'])
@teacher_required
def create_teacher_announcement():
    teacher = get_current_teacher()
    data = request.json or {}
    title = str(data.get('title') or '').strip()
    message = str(data.get('message') or '').strip()
    target_class = str(data.get('target_class') or 'ALL').strip()
    reference_url = str(data.get('reference_url') or '').strip()

    if not title or not message:
        return jsonify({'error': 'Announcement title and notice message are required. (शीर्षक व सूचना तपशील आवश्यक आहे)'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Find recipient student emails from roster
    if target_class == 'ALL' or not target_class:
        cursor.execute("""
        SELECT DISTINCT email, student_name FROM teacher_rosters
        WHERE teacher_id = ? AND email IS NOT NULL AND email != ''
        """, (teacher['id'],))
    else:
        cursor.execute("""
        SELECT DISTINCT email, student_name FROM teacher_rosters
        WHERE teacher_id = ? AND class_name = ? AND email IS NOT NULL AND email != ''
        """, (teacher['id'], target_class))

    students = cursor.fetchall()
    sent_count = 0

    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute("""
    INSERT INTO teacher_announcements (teacher_id, title, message, target_class, reference_url, email_sent_count, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (teacher['id'], title, message, target_class, reference_url, len(students), now_str))
    announcement_id = cursor.lastrowid
    conn.commit()
    conn.close()

    # Dispatch email notice to students strictly using Teacher Email as sender
    for st in students:
        email = st['email']
        s_name = st['student_name']
        print(f"[EMAIL DISPATCH] -> From: {teacher['name']} <{teacher['email']}> | To: {email} ({s_name}) | Subject: [CIE Notice - {teacher['name']}] {title}")
        print(f"[EMAIL DISPATCH] -> Message: {message[:100]}... | Target: {target_class}")
        
        subj_line = f"[CIE Notice - {teacher['name']}] {title}"
        notice_html = f"""<h2 style="font-size: 15px; color: #0f172a; margin-top: 0;">आदरणीय विद्यार्थी,</h2>
<p style="font-size: 13px; line-height: 1.6; color: #334155;">
  आपले विषय शिक्षक <strong>{teacher['name']}</strong> ({teacher.get('college_name', '')}) यांनी अंतर्गत मूल्यमापनाबाबत खालील महत्त्वाची सूचना प्रसिद्ध केली आहे:
</p>
<div class="card" style="background: #fff1f2; border-color: #fecdd3;">
  <div style="font-size: 14px; font-weight: 700; color: #9f1239; margin-bottom: 6px;">{title}</div>
  <p style="font-size: 12.5px; color: #334155; line-height: 1.5; margin: 0; white-space: pre-wrap;">{message}</p>
  {f'<div style="margin-top: 10px;"><a href="{reference_url}" style="color: #2563eb; font-weight: 600; font-size: 12px;" target="_blank">🔗 संदर्भ साहित्य लिंक (Reference Material)</a></div>' if reference_url else ''}
</div>
<div class="notice">
  वर्ग / लक्षित गट: <strong>{target_class}</strong> • शिक्षक: <strong>{teacher['name']} ({teacher['teacher_code']})</strong><br>
  ईमेल संपर्क: {teacher['email']}
</div>"""
        full_html = get_base_html_template(title, notice_html)
        send_email_async(
            to_email=email,
            subject=subj_line,
            html_content=full_html,
            from_email=teacher['email'],
            from_name=teacher['name']
        )
        sent_count += 1

    return jsonify({
        'success': True,
        'message': f'Announcement published and dispatched to {sent_count} student email(s)! (सूचना यशस्वीरीत्या प्रसिद्ध केली व विद्यार्थ्यांना पाठवली)',
        'announcement_id': announcement_id,
        'id': announcement_id,
        'email_sent_count': sent_count
    }), 201

@app.route('/api/teacher/announcements/<int:announcement_id>', methods=['GET'])
@teacher_required
def get_single_teacher_announcement(announcement_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM teacher_announcements
    WHERE id = ? AND teacher_id = ?
    """, (announcement_id, teacher['id']))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return jsonify({'error': 'Announcement not found.'}), 404
    return jsonify({'success': True, 'announcement': dict(row)})

@app.route('/api/teacher/announcements/<int:announcement_id>', methods=['PUT'])
@teacher_required
def update_teacher_announcement(announcement_id):
    teacher = get_current_teacher()
    data = request.json or {}
    title = str(data.get('title') or '').strip()
    message = str(data.get('message') or '').strip()
    target_class = str(data.get('target_class') or 'ALL').strip()
    reference_url = str(data.get('reference_url') or '').strip()

    if not title or not message:
        return jsonify({'error': 'Announcement title and message are required.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE teacher_announcements
    SET title = ?, message = ?, target_class = ?, reference_url = ?
    WHERE id = ? AND teacher_id = ?
    """, (title, message, target_class, reference_url, announcement_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Announcement updated successfully. (सूचना यशस्वीरीत्या संपादित केली)'})

@app.route('/api/teacher/announcements/<int:announcement_id>', methods=['DELETE'])
@teacher_required
def delete_teacher_announcement(announcement_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM teacher_announcements WHERE id = ? AND teacher_id = ?", (announcement_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Announcement deleted successfully.'})

# --- TEACHER STUDY MATERIALS & LINKS (अभ्यास साहित्य व लिंक्स) ---
@app.route('/api/teacher/study-materials', methods=['GET'])
@teacher_required
def get_teacher_study_materials():
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM teacher_study_materials
    WHERE teacher_id = ?
    ORDER BY id DESC
    """, (teacher['id'],))
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'success': True, 'study_materials': rows, 'materials': rows, 'count': len(rows)})

@app.route('/api/teacher/study-materials', methods=['POST'])
@teacher_required
def create_teacher_study_material():
    teacher = get_current_teacher()
    data = request.json or {}
    class_name = str(data.get('class_name') or 'ALL').strip()
    subject_name = str(data.get('subject_name') or '').strip()
    topic_title = str(data.get('topic_title') or '').strip()
    resource_type = str(data.get('resource_type') or 'Web Link').strip()
    resource_url = str(data.get('resource_url') or '').strip()
    description = str(data.get('description') or '').strip()

    if not topic_title:
        return jsonify({'error': 'Topic title is required. (साहित्याचे शीर्षक आवश्यक आहे)'}), 400
    if not resource_url:
        return jsonify({'error': 'Resource URL / Link is required. (वेब अथवा संदर्भ लिंक आवश्यक आहे)'}), 400

    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO teacher_study_materials (teacher_id, class_name, subject_name, topic_title, resource_type, resource_url, description, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (teacher['id'], class_name, subject_name, topic_title, resource_type, resource_url, description, now_str))
    material_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'message': 'Study material link added successfully! (अभ्यास साहित्य व संदर्भ लिंक यशस्वीरीत्या जोडली)',
        'material_id': material_id,
        'id': material_id
    }), 201

@app.route('/api/teacher/study-materials/<int:material_id>', methods=['GET'])
@teacher_required
def get_single_teacher_study_material(material_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM teacher_study_materials
    WHERE id = ? AND teacher_id = ?
    """, (material_id, teacher['id']))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return jsonify({'error': 'Study material not found.'}), 404
    return jsonify({'success': True, 'study_material': dict(row), 'material': dict(row)})

@app.route('/api/teacher/study-materials/<int:material_id>', methods=['PUT'])
@teacher_required
def update_teacher_study_material(material_id):
    teacher = get_current_teacher()
    data = request.json or {}
    class_name = str(data.get('class_name') or 'ALL').strip()
    subject_name = str(data.get('subject_name') or '').strip()
    topic_title = str(data.get('topic_title') or '').strip()
    resource_type = str(data.get('resource_type') or 'Web Link').strip()
    resource_url = str(data.get('resource_url') or '').strip()
    description = str(data.get('description') or '').strip()

    if not topic_title or not resource_url:
        return jsonify({'error': 'Topic title and Resource URL are required.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE teacher_study_materials
    SET class_name = ?, subject_name = ?, topic_title = ?, resource_type = ?, resource_url = ?, description = ?
    WHERE id = ? AND teacher_id = ?
    """, (class_name, subject_name, topic_title, resource_type, resource_url, description, material_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Study material updated successfully. (अभ्यास साहित्य यशस्वीरीत्या संपादित केले)'})

@app.route('/api/teacher/study-materials/<int:material_id>', methods=['DELETE'])
@teacher_required
def delete_teacher_study_material(material_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM teacher_study_materials WHERE id = ? AND teacher_id = ?", (material_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Study material deleted successfully.'})


@app.route('/api/qr', methods=['GET'])
def generate_qr_code_image():
    data = request.args.get('data', '').strip()
    if not data:
        return jsonify({'error': 'Missing data parameter'}), 400
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0f172a", back_color="#ffffff")
    
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

@app.route('/notice/<int:announcement_id>', methods=['GET'])
def public_notice_view(announcement_id):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT a.*, t.name as teacher_name, t.designation as teacher_designation,
           t.college_name as teacher_college, t.university_name as teacher_university,
           t.subject_name as teacher_subject, t.faculty_stream as teacher_stream,
           t.teacher_code as teacher_code
    FROM teacher_announcements a
    JOIN teachers t ON a.teacher_id = t.id
    WHERE a.id = ?
    """, (announcement_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return render_template('notice_view.html', notice=None, not_found=True), 404
    
    notice = dict(row)
    base_url = request.host_url.rstrip('/')
    notice_url = f"{base_url}/notice/{announcement_id}"
    portal_url = f"{base_url}/login?teacher={notice.get('teacher_code', '')}"
    
    return render_template(
        'notice_view.html',
        notice=notice,
        not_found=False,
        notice_url=notice_url,
        portal_url=portal_url
    )

# --- 1. UNIFIED 1-STEP SUBJECT & ASSIGNMENT MAPPING ---
@app.route('/api/teacher/courses', methods=['GET'])
@teacher_required
def get_teacher_courses():
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM teacher_subjects 
    WHERE teacher_id = ? 
    ORDER BY academic_year DESC, class_name ASC, semester ASC, id DESC
    """, (teacher['id'],))
    courses = [dict(r) for r in cursor.fetchall()]

    distinct_classes = sorted(list(set(c['class_name'] for c in courses if c.get('class_name'))))
    distinct_years = sorted(list(set(c['academic_year'] for c in courses if c.get('academic_year'))), reverse=True)
    
    conn.close()
    return jsonify({
        'success': True,
        'courses': courses,
        'distinct_classes': distinct_classes,
        'distinct_years': distinct_years,
        'count': len(courses)
    })

@app.route('/api/teacher/courses', methods=['POST'])
@teacher_required
def save_teacher_course():
    teacher = get_current_teacher()
    data = request.json or {}
    
    course_id = data.get('id')
    academic_year = str(data.get('academic_year') or '2026–27').strip()
    faculty_stream = str(data.get('faculty_stream') or teacher.get('faculty_stream') or '').strip()
    subject_name = str(data.get('subject_name') or teacher.get('subject_name') or '').strip()
    class_name = str(data.get('class_name') or '').strip()
    semester = str(data.get('semester') or '').strip()
    program_code = str(data.get('program_code') or '').strip()
    program_name = str(data.get('program_name') or '').strip()
    course_code = str(data.get('course_code') or data.get('paper_code') or '').strip()
    course_name = str(data.get('course_name') or data.get('paper_name') or '').strip()
    credits = int(data.get('credits') or 4)
    total_internal_max_marks = float(data.get('total_internal_max_marks') or 40.0)

    if not (class_name and semester and course_code and course_name):
        return jsonify({'error': 'Class Name, Semester, Course Code, and Course Name are required (वर्ग, सेमिस्टर, पेपर कोड आणि पेपरचे नाव आवश्यक आहेत).'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    try:
        if course_id:
            cursor.execute("""
            UPDATE teacher_subjects
            SET academic_year = ?, faculty_stream = ?, subject_name = ?, class_name = ?, semester = ?,
                program_code = ?, program_name = ?, course_code = ?, course_name = ?, credits = ?,
                total_internal_max_marks = ?
            WHERE id = ? AND teacher_id = ?
            """, (academic_year, faculty_stream, subject_name, class_name, semester, program_code, program_name, course_code, course_name, credits, total_internal_max_marks, course_id, teacher['id']))
            saved_id = course_id
        else:
            cursor.execute("""
            INSERT INTO teacher_subjects
            (teacher_id, academic_year, faculty_stream, subject_name, class_name, semester, program_code, program_name, course_code, course_name, credits, total_internal_max_marks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(teacher_id, academic_year, course_code, semester) DO UPDATE SET
              faculty_stream = excluded.faculty_stream,
              subject_name = excluded.subject_name,
              class_name = excluded.class_name,
              program_code = excluded.program_code,
              program_name = excluded.program_name,
              course_name = excluded.course_name,
              credits = excluded.credits,
              total_internal_max_marks = excluded.total_internal_max_marks
            """, (teacher['id'], academic_year, faculty_stream, subject_name, class_name, semester, program_code, program_name, course_code, course_name, credits, total_internal_max_marks))
            
            cursor.execute("SELECT id FROM teacher_subjects WHERE teacher_id = ? AND academic_year = ? AND course_code = ? AND semester = ?",
                           (teacher['id'], academic_year, course_code, semester))
            row = cursor.fetchone()
            saved_id = row['id'] if row else course_id

        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({'error': f'Database error: {str(e)}'}), 400

    conn.close()
    status_code = 200 if course_id else 201
    return jsonify({
        'success': True,
        'message': f'Course & Class "{class_name} — {course_code}: {course_name}" saved successfully!',
        'course_id': saved_id,
        'id': saved_id
    }), status_code

@app.route('/api/teacher/courses/<int:course_id>', methods=['DELETE'])
@teacher_required
def delete_teacher_course(course_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teacher_subjects WHERE id = ? AND teacher_id = ?", (course_id, teacher['id']))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return jsonify({'error': 'Course not found.'}), 404

    # 1. Clean up created_assessments and their submissions, evaluations, and audit logs
    cursor.execute("SELECT id FROM created_assessments WHERE subject_id = ? AND teacher_id = ?", (course_id, teacher['id']))
    asm_rows = cursor.fetchall()
    asm_ids = [r['id'] for r in asm_rows]
    if asm_ids:
        placeholders = ','.join('?' for _ in asm_ids)
        cursor.execute(f"SELECT id FROM submissions WHERE created_assessment_id IN ({placeholders})", asm_ids)
        sub_ids = [s['id'] for s in cursor.fetchall()]
        if sub_ids:
            sub_placeholders = ','.join('?' for _ in sub_ids)
            cursor.execute(f"DELETE FROM evaluations WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM audit_logs WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM submissions WHERE id IN ({sub_placeholders})", sub_ids)
        cursor.execute(f"DELETE FROM created_assessments WHERE id IN ({placeholders})", asm_ids)

    # 2. Delete teacher assignment mappings
    cursor.execute("DELETE FROM teacher_assignment_mappings WHERE subject_id = ? AND teacher_id = ?", (course_id, teacher['id']))
    
    # 3. Delete course from teacher_subjects
    cursor.execute("DELETE FROM teacher_subjects WHERE id = ? AND teacher_id = ?", (course_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': f'Course "{row["course_name"]}" deleted successfully.'})

@app.route('/api/teacher/unified-mapping', methods=['GET', 'POST'])
@teacher_required
def create_unified_mapping():
    if request.method == 'GET':
        return get_unified_mappings()

    teacher = get_current_teacher()
    data = request.json or {}
    
    academic_year = data.get('academic_year', '2026–27').strip()
    faculty_stream = data.get('faculty_stream', '').strip()
    custom_stream = data.get('custom_stream', '').strip()
    subject_name = data.get('subject_name', '').strip()
    custom_subject = data.get('custom_subject', '').strip()
    class_name = data.get('class_name', '').strip()
    semester = data.get('semester', '').strip()
    program_code = data.get('program_code', '').strip()
    program_name = data.get('program_name', '').strip()
    course_code = data.get('course_code', '').strip()
    course_name = data.get('course_name', '').strip()
    credits = int(data.get('credits', 4))
    total_internal_max_marks = float(data.get('total_internal_max_marks', 40.0))
    
    # List of selected assignments: [{ "type_id": 1, "type_name": "Seminar", "marks": 10.0, "desc": "" }, ...]
    raw_asms = data.get('assignments') or data.get('components') or []
    assignments = []
    for item in raw_asms:
        assignments.append({
            'type_id': int(item.get('type_id') or item.get('id') or 1),
            'type_name': str(item.get('type_name') or item.get('name') or ''),
            'marks': float(item.get('marks') or item.get('max_marks') or 10.0),
            'desc': str(item.get('desc') or item.get('description') or '')
        })

    final_stream = custom_stream if ('इतर' in faculty_stream or 'Other' in faculty_stream) and custom_stream else faculty_stream
    final_subject = custom_subject if ('इतर' in subject_name or 'Other' in subject_name or 'Custom' in subject_name) and custom_subject else subject_name

    if not (final_stream and final_subject and class_name and semester and course_code and course_name):
        return jsonify({'error': 'Please fill all required subject and class details.'}), 400

    if not assignments or len(assignments) == 0:
        return jsonify({'error': 'Please select at least one assessment type and allocate marks.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    try:
        # Insert or replace subject
        cursor.execute("""
        INSERT INTO teacher_subjects
        (teacher_id, academic_year, faculty_stream, subject_name, class_name, semester, program_code, program_name, course_code, course_name, credits, total_internal_max_marks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(teacher_id, academic_year, course_code, semester) DO UPDATE SET
          faculty_stream=excluded.faculty_stream,
          subject_name=excluded.subject_name,
          class_name=excluded.class_name,
          program_code=excluded.program_code,
          program_name=excluded.program_name,
          course_name=excluded.course_name,
          credits=excluded.credits,
          total_internal_max_marks=excluded.total_internal_max_marks
        """, (teacher['id'], academic_year, final_stream, final_subject, class_name, semester, program_code, program_name, course_code, course_name, credits, total_internal_max_marks))
        
        # Get subject id
        cursor.execute("SELECT id FROM teacher_subjects WHERE teacher_id = ? AND academic_year = ? AND course_code = ? AND semester = ?",
                       (teacher['id'], academic_year, course_code, semester))
        sub_row = cursor.fetchone()
        if not sub_row:
            cursor.execute("SELECT id FROM teacher_subjects WHERE teacher_id = ? AND course_code = ? ORDER BY id DESC LIMIT 1", (teacher['id'], course_code))
            sub_row = cursor.fetchone()
        sub_id = sub_row['id']

        # Existing mappings for this subject
        cursor.execute("SELECT * FROM teacher_assignment_mappings WHERE teacher_id = ? AND subject_id = ?", (teacher['id'], sub_id))
        existing_rows = cursor.fetchall()
        existing_by_type_id = {int(row['assessment_type_id']): dict(row) for row in existing_rows}
        existing_by_name = {str(row['assessment_type_name']).strip().lower(): dict(row) for row in existing_rows}

        active_mapping_ids = set()
        total_mapped_marks = 0.0

        for asm in assignments:
            type_id = int(asm.get('type_id') or asm.get('id') or 0)
            type_name = str(asm.get('type_name') or asm.get('name') or '').strip()
            marks = float(asm.get('marks') or asm.get('max_marks') or 10.0)
            desc = str(asm.get('desc') or asm.get('description') or '')
            total_mapped_marks += marks

            matched_existing = existing_by_type_id.get(type_id) or existing_by_name.get(type_name.lower())

            if matched_existing:
                m_id = matched_existing['id']
                cursor.execute("""
                UPDATE teacher_assignment_mappings
                SET assessment_type_id = ?, assessment_type_name = ?, max_marks = ?, description = ?
                WHERE id = ? AND teacher_id = ?
                """, (type_id, type_name, marks, desc, m_id, teacher['id']))
                active_mapping_ids.add(m_id)
            else:
                cursor.execute("""
                INSERT INTO teacher_assignment_mappings
                (teacher_id, subject_id, assessment_type_id, assessment_type_name, max_marks, description)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (teacher['id'], sub_id, type_id, type_name, marks, desc))
                active_mapping_ids.add(cursor.lastrowid)

        # For old mappings that were unchecked/removed:
        for old_row in existing_rows:
            old_id = old_row['id']
            if old_id not in active_mapping_ids:
                cursor.execute("SELECT COUNT(*) as cnt FROM created_assessments WHERE assignment_mapping_id = ?", (old_id,))
                cnt = cursor.fetchone()['cnt']
                if cnt == 0:
                    cursor.execute("DELETE FROM teacher_assignment_mappings WHERE id = ? AND teacher_id = ?", (old_id, teacher['id']))
                else:
                    # Keep mapping to maintain referential integrity with created assessments
                    pass

        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({'error': f'Database error: {str(e)}'}), 400

    conn.close()
    return jsonify({
        'success': True,
        'message': f'Subject "{course_name}" and {len(assignments)} assignment components mapped successfully!',
        'subject_id': sub_id,
        'total_mapped_marks': total_mapped_marks
    }), 201

@app.route('/api/teacher/unified-mappings', methods=['GET', 'POST'])
@teacher_required
def get_unified_mappings():
    if request.method == 'POST':
        return create_unified_mapping()
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM teacher_subjects WHERE teacher_id = ? ORDER BY id DESC", (teacher['id'],))
    subjects = [dict(r) for r in cursor.fetchall()]

    mapped_subjects = []
    for s in subjects:
        cursor.execute("SELECT * FROM teacher_assignment_mappings WHERE subject_id = ? ORDER BY id ASC", (s['id'],))
        asms = [dict(r) for r in cursor.fetchall()]
        s['assignments'] = asms
        if len(asms) > 0:
            mapped_subjects.append(s)

    conn.close()
    return jsonify({'subjects': mapped_subjects, 'mappings': mapped_subjects, 'all_subjects': subjects})

@app.route('/api/teacher/subjects', methods=['GET', 'POST'])
@teacher_required
def manage_teacher_subjects():
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()

    if request.method == 'POST':
        data = request.json or {}
        academic_year = data.get('assessment_year', data.get('academic_year', '2026–27')).strip()
        faculty_stream = data.get('faculty_stream', 'कला (Arts)').strip()
        course_name = data.get('course_name', '').strip()
        class_name = data.get('class_name', '').strip()
        semester = data.get('semester', '').strip()
        course_code = data.get('course_code', '').strip()
        credits = int(data.get('credits', 4))
        total_max_marks = float(data.get('total_internal_max_marks', 40.0))
        prog_name = data.get('program_name', course_name)

        if not (class_name and semester and course_code and course_name):
            conn.close()
            return jsonify({'error': 'Please fill all required fields.'}), 400

        cursor.execute("""
        INSERT INTO teacher_subjects 
        (teacher_id, academic_year, faculty_stream, subject_name, class_name, semester, course_code, course_name, credits, total_internal_max_marks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(teacher_id, academic_year, course_code, semester) DO UPDATE SET
          class_name=excluded.class_name,
          course_name=excluded.course_name,
          credits=excluded.credits,
          total_internal_max_marks=excluded.total_internal_max_marks
        """, (teacher['id'], academic_year, faculty_stream, prog_name, class_name, semester, course_code, course_name, credits, total_max_marks))
        conn.commit()
        
        cursor.execute("SELECT id FROM teacher_subjects WHERE teacher_id = ? AND academic_year = ? AND course_code = ? AND semester = ?",
                       (teacher['id'], academic_year, course_code, semester))
        sub_id = cursor.fetchone()['id']
        conn.close()
        return jsonify({'message': 'Subject mapped successfully!', 'id': sub_id}), 201

    # GET
    cursor.execute("""
    SELECT s.*, 
           COUNT(m.id) as mapped_assignments_count
    FROM teacher_subjects s
    LEFT JOIN teacher_assignment_mappings m ON s.id = m.subject_id
    WHERE s.teacher_id = ?
    GROUP BY s.id
    ORDER BY s.id DESC
    """, (teacher['id'],))
    subjects = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'subjects': subjects, 'mappings': subjects})

@app.route('/api/teacher/subjects/<int:subject_id>', methods=['DELETE'])
@app.route('/api/teacher/unified-mapping/<int:subject_id>', methods=['DELETE'])
@teacher_required
def delete_unified_mapping(subject_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    # 1. Find all created assessments for this subject
    cursor.execute("SELECT id FROM created_assessments WHERE subject_id = ? AND teacher_id = ?", (subject_id, teacher['id']))
    asm_ids = [row['id'] for row in cursor.fetchall()]
    
    if asm_ids:
        placeholders = ','.join('?' for _ in asm_ids)
        # Find all submissions under these created assessments
        cursor.execute(f"SELECT id FROM submissions WHERE created_assessment_id IN ({placeholders})", asm_ids)
        sub_ids = [row['id'] for row in cursor.fetchall()]
        
        if sub_ids:
            sub_placeholders = ','.join('?' for _ in sub_ids)
            cursor.execute(f"DELETE FROM evaluations WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM audit_logs WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM submissions WHERE id IN ({sub_placeholders})", sub_ids)
        
        cursor.execute(f"DELETE FROM created_assessments WHERE id IN ({placeholders})", asm_ids)
    
    # 2. Delete teacher assignment mappings
    cursor.execute("DELETE FROM teacher_assignment_mappings WHERE subject_id = ? AND teacher_id = ?", (subject_id, teacher['id']))
    
    # 3. Delete teacher subject
    cursor.execute("DELETE FROM teacher_subjects WHERE id = ? AND teacher_id = ?", (subject_id, teacher['id']))
    
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Subject and all mapped components deleted successfully.'})

@app.route('/api/teacher/assignment-mapping', methods=['GET', 'POST'])
@teacher_required
def manage_assignment_mappings():
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()

    if request.method == 'POST':
        data = request.json or {}
        subject_id = data.get('subject_id')
        type_id = data.get('assessment_type_id', 1)
        type_name = data.get('assessment_type_name', '').strip()
        marks = float(data.get('max_marks', 10.0))
        desc = data.get('description', '')

        if not (subject_id and type_name):
            conn.close()
            return jsonify({'error': 'Subject ID and Assessment Type are required.'}), 400

        cursor.execute("""
        INSERT INTO teacher_assignment_mappings (teacher_id, subject_id, assessment_type_id, assessment_type_name, max_marks, description)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (teacher['id'], subject_id, type_id, type_name, marks, desc))
        conn.commit()
        map_id = cursor.lastrowid
        conn.close()
        return jsonify({'message': 'Assignment component mapped successfully!', 'id': map_id}), 201

    # GET
    sub_id = request.args.get('subject_id')
    sql = """
    SELECT m.*, s.class_name, s.semester, s.course_code, s.course_name
    FROM teacher_assignment_mappings m
    JOIN teacher_subjects s ON m.subject_id = s.id
    WHERE m.teacher_id = ?
    """
    params = [teacher['id']]
    if sub_id:
        sql += " AND m.subject_id = ?"
        params.append(int(sub_id))
    sql += " ORDER BY m.id ASC"

    cursor.execute(sql, params)
    mappings = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'mappings': mappings})

@app.route('/api/teacher/assignment-mapping/<int:mapping_id>', methods=['DELETE'])
@teacher_required
def delete_assignment_mapping(mapping_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    # Find created assessments linked to this mapping
    cursor.execute("SELECT id FROM created_assessments WHERE assignment_mapping_id = ? AND teacher_id = ?", (mapping_id, teacher['id']))
    asm_ids = [row['id'] for row in cursor.fetchall()]
    if asm_ids:
        placeholders = ','.join('?' for _ in asm_ids)
        cursor.execute(f"SELECT id FROM submissions WHERE created_assessment_id IN ({placeholders})", asm_ids)
        sub_ids = [row['id'] for row in cursor.fetchall()]
        if sub_ids:
            sub_placeholders = ','.join('?' for _ in sub_ids)
            cursor.execute(f"DELETE FROM evaluations WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM audit_logs WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM submissions WHERE id IN ({sub_placeholders})", sub_ids)
        cursor.execute(f"DELETE FROM created_assessments WHERE id IN ({placeholders})", asm_ids)

    cursor.execute("DELETE FROM teacher_assignment_mappings WHERE id = ? AND teacher_id = ?", (mapping_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Assignment component deleted successfully.'})

# --- 2. CLASS-WISE STUDENT ROSTER (ADD MODAL + CSV) ---
@app.route('/api/teacher/student', methods=['POST'])
@app.route('/api/teacher/student/add', methods=['POST'])
@app.route('/api/teacher/roster', methods=['POST'])
@teacher_required
def add_single_student_roster():
    teacher = get_current_teacher()
    data = request.json or {}
    academic_year = data.get('academic_year', '2026–27').strip()
    class_name = data.get('class_name', '').strip()
    division = data.get('division', 'A').strip()
    roll_number = str(data.get('roll_number') or data.get('roll_no') or '').strip()
    prn = str(data.get('prn', '')).strip()
    student_name = str(data.get('student_name') or data.get('name') or '').strip()
    gender = data.get('gender', 'Male')
    email = str(data.get('email', '')).strip()
    mobile = str(data.get('mobile', '')).strip()
    is_repeater = 1 if data.get('is_repeater') else 0

    if not (class_name and roll_number and prn and student_name):
        return jsonify({'error': 'Please fill Class, Roll Number, PRN, and Student Name.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        INSERT INTO teacher_rosters 
        (teacher_id, academic_year, class_name, division, roll_number, prn, student_name, gender, email, mobile, is_repeater)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(teacher_id, academic_year, class_name, prn) DO UPDATE SET
          roll_number=excluded.roll_number,
          student_name=excluded.student_name,
          gender=excluded.gender,
          email=excluded.email,
          mobile=excluded.mobile,
          is_repeater=excluded.is_repeater
        """, (teacher['id'], academic_year, class_name, division, roll_number, prn, student_name, gender, email, mobile, is_repeater))
        conn.commit()
        sid = cursor.lastrowid
    except Exception as e:
        conn.close()
        return jsonify({'error': f'Database error: {str(e)}'}), 400

    conn.close()
    database.backup_database_to_cloud_async()
    return jsonify({'success': True, 'message': f'Student {student_name} added to roster!', 'id': sid}), 201

@app.route('/api/teacher/roster/bulk', methods=['POST'])
@app.route('/api/teacher/student/bulk', methods=['POST'])
@teacher_required
def bulk_student_roster():
    teacher = get_current_teacher()
    data = request.json or {}
    academic_year = str(data.get('academic_year', '2026–27')).strip()
    class_name = str(data.get('class_name', '')).strip()
    raw_text = data.get('raw_text', '').strip()
    is_repeater = 1 if data.get('is_repeater') else 0

    if not (class_name and raw_text):
        return jsonify({'error': 'Class name and student data are required.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    inserted_count = 0
    errors = []

    lines = raw_text.splitlines()
    for line_idx, line in enumerate(lines, start=1):
        line = line.strip()
        if not line:
            continue
        
        if '\t' in line:
            parts = [p.strip() for p in line.split('\t')]
        else:
            reader = csv.reader([line])
            parts = [p.strip() for p in next(reader, [])]

        if len(parts) < 3:
            errors.append(f"Line {line_idx}: Needs at least Roll No, PRN, Name")
            continue

        roll_no = parts[0]
        prn = parts[1]
        name = parts[2]
        gender = parts[3] if len(parts) > 3 else 'Unspecified'
        email = parts[4] if len(parts) > 4 else ''
        mobile = parts[5] if len(parts) > 5 else ''
        division = parts[6] if len(parts) > 6 else 'A'

        try:
            cursor.execute("""
            INSERT INTO teacher_rosters 
            (teacher_id, academic_year, class_name, division, roll_number, prn, student_name, gender, email, mobile, is_repeater)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(teacher_id, academic_year, class_name, prn) DO UPDATE SET
              roll_number=excluded.roll_number,
              student_name=excluded.student_name,
              gender=excluded.gender,
              email=excluded.email,
              mobile=excluded.mobile,
              is_repeater=excluded.is_repeater
            """, (teacher['id'], academic_year, class_name, division, roll_no, prn, name, gender, email, mobile, is_repeater))
            inserted_count += 1
        except Exception as e:
            errors.append(f"Line {line_idx} ({name}): {str(e)}")

    conn.commit()
    conn.close()
    database.backup_database_to_cloud_async()

    return jsonify({
        'message': f'Roster updated: {inserted_count} student(s) successfully processed.',
        'inserted': inserted_count,
        'errors': errors
    })

@app.route('/api/teacher/roster', methods=['GET'])
@teacher_required
def get_roster():
    teacher = get_current_teacher()
    class_name_raw = str(request.args.get('class_name') or '').strip()
    is_repeater = request.args.get('is_repeater')

    conn = database.get_db_connection()
    cursor = conn.cursor()
    sql = "SELECT * FROM teacher_rosters WHERE teacher_id = ?"
    params = [teacher['id']]

    if class_name_raw:
        classes = [c.strip() for c in class_name_raw.split(',') if c.strip()]
        if classes:
            placeholders = ','.join('?' for _ in classes)
            sql += f" AND class_name IN ({placeholders})"
            params.extend(classes)

    if is_repeater is not None and is_repeater != '':
        sql += " AND is_repeater = ?"
        params.append(int(is_repeater))

    sql += " ORDER BY class_name ASC, CAST(roll_number AS INTEGER) ASC, student_name ASC"
    cursor.execute(sql, params)
    students = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT DISTINCT class_name FROM teacher_rosters WHERE teacher_id = ? ORDER BY class_name", (teacher['id'],))
    distinct_classes = [r['class_name'] for r in cursor.fetchall()]

    conn.close()
    return jsonify({'roster': students, 'classes': distinct_classes, 'count': len(students)})

@app.route('/api/teacher/roster/<int:roster_id>', methods=['DELETE'])
@app.route('/api/teacher/student/<int:roster_id>', methods=['DELETE'])
@teacher_required
def delete_roster_student(roster_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id FROM submissions WHERE roster_id = ? AND teacher_id = ?", (roster_id, teacher['id']))
    sub_ids = [row['id'] for row in cursor.fetchall()]
    if sub_ids:
        sub_placeholders = ','.join('?' for _ in sub_ids)
        cursor.execute(f"DELETE FROM evaluations WHERE submission_id IN ({sub_placeholders})", sub_ids)
        cursor.execute(f"DELETE FROM audit_logs WHERE submission_id IN ({sub_placeholders})", sub_ids)
        cursor.execute(f"DELETE FROM submissions WHERE id IN ({sub_placeholders})", sub_ids)
    
    cursor.execute("DELETE FROM student_connections WHERE roster_id = ? AND teacher_id = ?", (roster_id, teacher['id']))
    cursor.execute("DELETE FROM teacher_rosters WHERE id = ? AND teacher_id = ?", (roster_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Student removed from roster successfully.'})

# --- 3. AUTO-SYNCED CREATE ASSESSMENT SESSION ---
@app.route('/api/teacher/create-assessment', methods=['GET', 'POST'])
@teacher_required
def manage_created_assessments():
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()

    if request.method == 'POST':
        data = request.json or {}
        subject_id = data.get('subject_id')
        assignment_mapping_id = data.get('assignment_mapping_id')
        asm_type_name = data.get('assessment_type_name', '').strip()
        session_title = str(data.get('assessment_session_title') or data.get('title') or data.get('assessment_name') or '').strip()
        topic = str(data.get('assignment_topic') or data.get('topic_question') or data.get('topic') or data.get('assessment_name') or 'General Assessment').strip()
        deadline = str(data.get('submission_deadline') or data.get('deadline') or data.get('due_date') or '')
        allow_late = 1 if data.get('allow_late', data.get('allow_late_submission', True)) else 0
        is_group = 1 if data.get('is_group', data.get('is_group_assessment', False)) else 0
        student_groups = data.get('student_groups') or {}
        if isinstance(student_groups, str):
            try:
                student_groups = json.loads(student_groups)
            except:
                student_groups = {}
        student_groups_json = json.dumps(student_groups, ensure_ascii=False)

        cursor.execute("SELECT * FROM teacher_subjects WHERE id = ? AND teacher_id = ?", (subject_id, teacher['id']))
        sub = cursor.fetchone()
        
        asm = None
        if not assignment_mapping_id:
            if asm_type_name:
                cursor.execute("SELECT * FROM teacher_assignment_mappings WHERE subject_id = ? AND teacher_id = ? AND assessment_type_name LIKE ?", 
                               (subject_id, teacher['id'], f"%{asm_type_name.split('(')[0].strip()}%"))
                asm = cursor.fetchone()
            if not asm:
                cursor.execute("SELECT * FROM teacher_assignment_mappings WHERE subject_id = ? AND teacher_id = ? ORDER BY id ASC LIMIT 1", (subject_id, teacher['id']))
                asm = cursor.fetchone()
            if asm:
                assignment_mapping_id = asm['id']
            else:
                a_type_id = data.get('assessment_type_id') or 1
                cursor.execute("SELECT name FROM assessment_types WHERE id = ?", (a_type_id,))
                a_type_row = cursor.fetchone()
                a_type_name_val = a_type_row['name'] if a_type_row else (asm_type_name or 'गृहपाठ / स्वाध्याय (Home Assignment)')
                max_m = float(data.get('max_marks') or 20.0)
                cursor.execute("""
                INSERT INTO teacher_assignment_mappings (teacher_id, subject_id, assessment_type_id, assessment_type_name, max_marks, description)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (teacher['id'], subject_id, a_type_id, a_type_name_val, max_m, session_title or 'Auto-created mapping'))
                assignment_mapping_id = cursor.lastrowid
                cursor.execute("SELECT * FROM teacher_assignment_mappings WHERE id = ?", (assignment_mapping_id,))
                asm = cursor.fetchone()
        else:
            cursor.execute("SELECT * FROM teacher_assignment_mappings WHERE id = ? AND teacher_id = ?", (assignment_mapping_id, teacher['id']))
            asm = cursor.fetchone()

        if not (subject_id and assignment_mapping_id and session_title and topic):
            conn.close()
            return jsonify({'error': 'Please fill all required assessment session details.'}), 400

        if not (sub and asm):
            conn.close()
            return jsonify({'error': 'Selected subject or mapped assignment not found.'}), 404

        is_mcq = 1 if data.get('is_mcq') else 0
        mcq_questions = data.get('mcq_questions') or []
        if isinstance(mcq_questions, str):
            try:
                mcq_questions = json.loads(mcq_questions)
            except:
                mcq_questions = []
        mcq_questions_json = json.dumps(mcq_questions)

        is_individual_topics = 1 if data.get('is_individual_topics') else 0
        student_topics = data.get('student_topics') or {}
        if isinstance(student_topics, str):
            try:
                student_topics = json.loads(student_topics)
            except:
                student_topics = {}
        student_topics_json = json.dumps(student_topics, ensure_ascii=False)

        study_materials = data.get('study_materials') or []
        if isinstance(study_materials, str):
            try:
                study_materials = json.loads(study_materials)
            except:
                study_materials = []
        study_materials_json = json.dumps(study_materials, ensure_ascii=False)

        target_students = data.get('target_students') or data.get('target_students_json') or []
        if isinstance(target_students, str):
            try:
                target_students = json.loads(target_students)
            except:
                target_students = []
        target_students_json = json.dumps(target_students, ensure_ascii=False)

        meeting_url = str(data.get('meeting_url') or '').strip()
        meeting_time = str(data.get('meeting_time') or '').strip()
        show_marks_to_students = 0 if data.get('show_marks_to_students') in [0, '0', False, 'false'] else 1
        duration_minutes = int(data.get('duration_minutes') or 0)

        if is_mcq and mcq_questions:
            calc_marks = sum(float(q.get('marks', 1)) for q in mcq_questions if isinstance(q, dict))
            max_marks = calc_marks if calc_marks > 0 else float(data.get('max_marks') or asm['max_marks'])
        else:
            max_marks = float(data.get('max_marks') or asm['max_marks'])

        now_tag = f"{datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')}-{uuid.uuid4().hex[:6].upper()}"
        asm_code = f"ASM-{now_tag}-{sub['course_code']}-{asm['id']}"

        cursor.execute("""
        INSERT INTO created_assessments
        (assessment_code, teacher_id, subject_id, assignment_mapping_id, academic_year, class_name, semester,
         course_code, course_name, assessment_type_name, assessment_session_title, assignment_topic, max_marks,
         submission_deadline, allow_late, is_group, student_groups_json, is_mcq, mcq_questions_json, is_individual_topics, student_topics_json, study_materials_json, target_students_json, meeting_url, meeting_time, show_marks_to_students, duration_minutes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
        """, (
            asm_code, teacher['id'], subject_id, assignment_mapping_id, sub['academic_year'], sub['class_name'],
            sub['semester'], sub['course_code'], sub['course_name'], asm['assessment_type_name'],
            session_title, topic, max_marks, deadline, allow_late, is_group, student_groups_json, is_mcq, mcq_questions_json,
            is_individual_topics, student_topics_json, study_materials_json, target_students_json, meeting_url, meeting_time, show_marks_to_students, duration_minutes
        ))
        conn.commit()
        new_id = cursor.lastrowid
        conn.close()
        database.backup_database_to_cloud_async()
        return jsonify({'success': True, 'message': 'Assessment session created successfully!', 'assessment_code': asm_code, 'id': new_id, 'assessment_id': new_id, 'show_marks_to_students': show_marks_to_students, 'duration_minutes': duration_minutes}), 201

    # GET
    cursor.execute("""
    SELECT c.*, 
           COUNT(s.id) as submissions_count
    FROM created_assessments c
    LEFT JOIN submissions s ON c.id = s.created_assessment_id
    WHERE c.teacher_id = ?
    GROUP BY c.id
    ORDER BY c.id DESC
    """, (teacher['id'],))
    created = [dict(r) for r in cursor.fetchall()]
    cursor.execute("SELECT * FROM teacher_subjects WHERE teacher_id = ? ORDER BY id DESC", (teacher['id'],))
    subjects = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'created_assessments': created, 'assessments': created, 'subjects': subjects})

@app.route('/api/teacher/assessments/<int:assessment_id>/toggle-marks-visibility', methods=['POST'])
@teacher_required
def toggle_assessment_marks_visibility(assessment_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, show_marks_to_students, assessment_session_title FROM created_assessments WHERE id = ? AND teacher_id = ?", (assessment_id, teacher['id']))
    asm = cursor.fetchone()
    if not asm:
        conn.close()
        return jsonify({'error': 'Assessment session not found.'}), 404

    cur_val = asm['show_marks_to_students']
    new_val = 0 if cur_val == 1 else 1
    cursor.execute("UPDATE created_assessments SET show_marks_to_students = ? WHERE id = ?", (new_val, assessment_id))
    conn.commit()
    conn.close()

    status_str = "विद्यार्थ्यांसाठी गुण सुरू (दृश्यमान) केले" if new_val == 1 else "विद्यार्थ्यांपासून गुण लपवले (राखीव ठेवले)"
    return jsonify({
        'success': True,
        'assessment_id': assessment_id,
        'show_marks_to_students': new_val,
        'message': f"'{asm['assessment_session_title']}': {status_str}."
    })

# --- 4. TEACHER INVITE LINK & CONNECTED ROSTER STATS ---
@app.route('/api/teacher/invite-link')
@teacher_required
def get_teacher_invite_link():
    teacher = get_current_teacher()
    base_url = request.host_url.rstrip('/')
    direct_link = f"{base_url}/submit?teacher={teacher['teacher_code']}"
    qr_img_url = f"/api/qr-image?text={direct_link}"

    return jsonify({
        'teacher_code': teacher['teacher_code'],
        'teacher_name': teacher['name'],
        'college_name': teacher['college_name'],
        'subject_name': teacher['subject_name'],
        'invite_url': direct_link,
        'qr_url': qr_img_url
    })

# =========================================================================
# 4. STUDENT VERIFICATION, ONLINE TYPING & SUBMISSION
# =========================================================================
@app.route('/api/student/lookup-teachers', methods=['GET'])
def student_lookup_teachers():
    email = request.args.get('email', '').strip().lower()
    prn = request.args.get('prn', '').strip()

    if not email and not prn:
        return jsonify({'success': True, 'count': 0, 'teachers': []})

    conn = database.get_db_connection()
    cursor = conn.cursor()

    where_clauses = []
    params = []

    if email and prn:
        where_clauses.append("""
            (
                LOWER(TRIM(r.prn)) = LOWER(?)
             OR LOWER(TRIM(r.roll_number)) = LOWER(?)
             OR REPLACE(r.prn, ' ', '') = REPLACE(?, ' ', '')
             OR LOWER(TRIM(r.email)) = LOWER(?)
            )
        """)
        params.extend([prn, prn, prn, email])
    elif email:
        where_clauses.append("LOWER(TRIM(r.email)) = LOWER(?)")
        params.append(email)
    elif prn:
        where_clauses.append("(LOWER(TRIM(r.prn)) = LOWER(?) OR LOWER(TRIM(r.roll_number)) = LOWER(?) OR REPLACE(r.prn, ' ', '') = REPLACE(?, ' ', ''))")
        params.extend([prn, prn, prn])

    query = f"""
        SELECT 
            t.id as teacher_id,
            t.teacher_code,
            t.name as teacher_name,
            t.designation,
            t.college_name,
            t.university_name,
            t.faculty_stream,
            t.subject_name,
            r.id as roster_id,
            r.student_name,
            r.prn,
            r.roll_number,
            r.class_name,
            r.division,
            r.email as roster_email
        FROM teacher_rosters r
        JOIN teachers t ON r.teacher_id = t.id
        WHERE t.status = 'approved' AND {' AND '.join(where_clauses)}
        ORDER BY t.name ASC
    """
    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()

    teachers = []
    seen_keys = set()
    for r in rows:
        key = (r['teacher_id'], r['class_name'], r['prn'])
        if key in seen_keys:
            continue
        seen_keys.add(key)
        t_dict = dict(r)
        cursor.execute("""
            SELECT COUNT(*) as asm_count FROM created_assessments 
            WHERE teacher_id = ? AND class_name = ? AND status = 'active'
        """, (r['teacher_id'], r['class_name']))
        c_row = cursor.fetchone()
        t_dict['active_assessments_count'] = c_row['asm_count'] if c_row else 0
        teachers.append(t_dict)

    conn.close()
    return jsonify({
        'success': True,
        'count': len(teachers),
        'teachers': teachers
    })

@app.route('/api/student/teacher-classes')
def student_teacher_classes():
    raw_code = request.args.get('teacher_code', '')
    teacher_code = re.sub(r'[^A-Z0-9\/-]', '', raw_code.strip().upper())
    if not teacher_code:
        return jsonify({'error': 'Teacher Code is required.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, teacher_code, name, designation, college_name, university_name, faculty_stream, subject_name FROM teachers WHERE UPPER(teacher_code) = UPPER(?) AND status = 'approved'", (teacher_code,))
    teacher = cursor.fetchone()
    if not teacher:
        conn.close()
        return jsonify({'error': 'Invalid or inactive Teacher Code (अवैध किंवा निष्क्रिय शिक्षक कोड).'}), 404

    # Fetch distinct classes configured by teacher
    cursor.execute("""
    SELECT DISTINCT class_name FROM teacher_subjects 
    WHERE teacher_id = ? AND class_name IS NOT NULL AND class_name != ''
    ORDER BY class_name ASC
    """, (teacher['id'],))
    classes = [r['class_name'] for r in cursor.fetchall()]

    if not classes:
        cursor.execute("SELECT DISTINCT class_name FROM teacher_rosters WHERE teacher_id = ? AND class_name IS NOT NULL", (teacher['id'],))
        classes = [r['class_name'] for r in cursor.fetchall()]

    # Fetch courses with semester details
    cursor.execute("""
    SELECT id, class_name, semester, course_code, course_name, program_code, program_name, total_internal_max_marks 
    FROM teacher_subjects WHERE teacher_id = ? ORDER BY class_name, semester
    """, (teacher['id'],))
    courses = [dict(r) for r in cursor.fetchall()]

    cursor.execute("""
    SELECT DISTINCT semester FROM teacher_subjects 
    WHERE teacher_id = ? AND semester IS NOT NULL AND semester != ''
    ORDER BY semester ASC
    """, (teacher['id'],))
    semesters = [r['semester'] for r in cursor.fetchall()]
    if not semesters:
        semesters = ['Semester I', 'Semester II', 'Semester III', 'Semester IV', 'Semester V', 'Semester VI']

    conn.close()
    return jsonify({
        'success': True,
        'teacher': dict(teacher),
        'classes': classes,
        'semesters': semesters,
        'courses': courses
    })

# --- STUDENT VERIFY & CONNECT ---
@app.route('/api/student/connect-verify', methods=['GET', 'POST'])
@app.route('/api/student/verify-connection', methods=['GET', 'POST'])
@app.route('/api/student/verify', methods=['GET', 'POST'])
def student_connect_verify():
    if request.method == 'POST':
        data = request.get_json(silent=True) or request.form or {}
    else:
        data = request.args or {}

    raw_teacher_code = str(data.get('teacher_code') or '').strip().upper()
    teacher_code = re.sub(r'[^A-Z0-9\/-]', '', raw_teacher_code)
    clean_code = re.sub(r'[^A-Z0-9]', '', raw_teacher_code)
    prn = str(data.get('prn') or '').strip()
    student_email = str(data.get('student_email') or data.get('email') or '').strip().lower()

    if not prn:
        return jsonify({'error': 'Please enter your Student PRN / Enrollment Number. (कृपया आपला PRN प्रविष्ट करा)'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Query all matching roster rows for this student across ALL approved teachers
    cursor.execute("""
    SELECT r.*, t.id as teacher_id, t.name as teacher_name, t.teacher_code, t.designation as teacher_designation,
           t.college_name as teacher_college, t.university_name as teacher_university, t.faculty_stream as teacher_faculty
    FROM teacher_rosters r
    JOIN teachers t ON r.teacher_id = t.id
    WHERE t.status = 'approved' 
      AND (
          LOWER(TRIM(r.prn)) = LOWER(TRIM(?))
       OR LOWER(TRIM(r.roll_number)) = LOWER(TRIM(?))
       OR REPLACE(r.prn, ' ', '') = REPLACE(?, ' ', '')
      )
    ORDER BY 
      CASE WHEN (? != '' AND (UPPER(t.teacher_code) = UPPER(?) OR UPPER(REPLACE(REPLACE(t.teacher_code, '-', ''), ' ', '')) = UPPER(?))) THEN 0 ELSE 1 END,
      r.id ASC
    """, (prn, prn, prn, teacher_code, teacher_code, clean_code))

    roster_rows = cursor.fetchall()

    if not roster_rows:
        # Check if PRN exists under unapproved teachers
        cursor.execute("""
        SELECT t.name, t.teacher_code FROM teacher_rosters r
        JOIN teachers t ON r.teacher_id = t.id
        WHERE t.status != 'approved' AND (
            LOWER(TRIM(r.prn)) = LOWER(TRIM(?)) OR LOWER(TRIM(r.roll_number)) = LOWER(TRIM(?))
        )
        """, (prn, prn))
        pending_t = cursor.fetchone()
        conn.close()
        if pending_t:
            return jsonify({'error': f'Teacher account for ({pending_t["name"]}) is pending administrator approval. (शिक्षकांचे खाते मंजुरीच्या प्रतीक्षेत आहे.)'}), 403

        return jsonify({
            'error': f'PRN / Roll No "{prn}" was not found in any registered teacher roster. Please check your PRN or contact your subject teacher. (आपला PRN कोणत्याही शिक्षकांच्या यादीत सापडला नाही. कृपया PRN तपासा अथवा शिक्षकांशी संपर्क साधा.)'
        }), 404

    # Handle Email verification & update
    matching_rosters = []
    if student_email:
        for r in roster_rows:
            r_email = str(r['email'] or '').strip().lower()
            if not r_email:
                # Update missing roster email with student's active email
                cursor.execute("UPDATE teacher_rosters SET email = ? WHERE id = ?", (student_email, r['id']))
                conn.commit()
                r_dict = dict(r)
                r_dict['email'] = student_email
                matching_rosters.append(r_dict)
            elif r_email == student_email:
                matching_rosters.append(r)
        
        # If no strict email match found, check if roster has a differing email
        if not matching_rosters:
            first_r_email = str(roster_rows[0]['email'] or '').strip()
            if first_r_email and first_r_email.lower() != student_email:
                conn.close()
                return jsonify({
                    'error': f'Entered Email ({student_email}) does not match registered roster email for PRN {prn}. (प्रविष्ट केलेला ईमेल हजेरीपटातील ईमेलशी जुळत नाही. कृपया नोंदणीकृत ईमेल वापरा)'
                }), 400
            matching_rosters = list(roster_rows)
    else:
        matching_rosters = list(roster_rows)

    if not matching_rosters:
        matching_rosters = list(roster_rows)

    primary_roster = matching_rosters[0]
    active_email = student_email or str(primary_roster['email'] or '').strip()

    # Build primary student object
    student_info = {
        'id': primary_roster['id'],
        'roster_id': primary_roster['id'],
        'student_name': primary_roster['student_name'],
        'roll_number': primary_roster['roll_number'],
        'prn': primary_roster['prn'],
        'class_name': primary_roster['class_name'],
        'division': primary_roster['division'],
        'email': active_email,
        'mobile': primary_roster['mobile'],
        'academic_year': primary_roster['academic_year']
    }

    # Primary teacher object for backwards compatibility
    primary_teacher = {
        'id': primary_roster['teacher_id'],
        'name': primary_roster['teacher_name'],
        'teacher_code': primary_roster['teacher_code'],
        'designation': primary_roster['teacher_designation'],
        'college_name': primary_roster['teacher_college'],
        'university_name': primary_roster['teacher_university'],
        'faculty_stream': primary_roster['teacher_faculty']
    }

    # Enrolled teachers & classes
    enrolled_teachers = []
    seen_teacher_class = set()
    for r in matching_rosters:
        key = (r['teacher_id'], r['class_name'])
        if key not in seen_teacher_class:
            seen_teacher_class.add(key)
            enrolled_teachers.append({
                'teacher_id': r['teacher_id'],
                'teacher_name': r['teacher_name'],
                'teacher_code': r['teacher_code'],
                'designation': r['teacher_designation'],
                'college_name': r['teacher_college'],
                'university_name': r['teacher_university'],
                'faculty_stream': r['teacher_faculty'],
                'class_name': r['class_name'],
                'division': r['division'],
                'roster_id': r['id']
            })

    # Fetch active assessments across all enrolled classes and teachers
    all_active_assessments = []
    seen_asm_ids = set()

    for et in enrolled_teachers:
        t_id = et['teacher_id']
        c_name = et['class_name']
        r_id = et['roster_id']

        cursor.execute("""
        SELECT ca.*, t.name as teacher_name, t.teacher_code, t.designation as teacher_designation,
               t.college_name as teacher_college, t.university_name as teacher_university
        FROM created_assessments ca
        JOIN teachers t ON ca.teacher_id = t.id
        WHERE ca.teacher_id = ? 
          AND (
              ca.class_name = 'ALL' 
              OR UPPER(ca.class_name) = 'ALL' 
              OR ca.class_name = ? 
              OR LOWER(REPLACE(ca.class_name, ' ', '')) = LOWER(REPLACE(?, ' ', ''))
          )
          AND ca.status = 'active'
        ORDER BY ca.id DESC
        """, (t_id, c_name, c_name))
        asms = cursor.fetchall()

        for asm in asms:
            if asm['id'] in seen_asm_ids:
                continue

            # Check if this assessment is targeted to specific students only
            target_json = asm['target_students_json'] if 'target_students_json' in asm.keys() else None
            if target_json:
                try:
                    target_prns = json.loads(target_json)
                    if isinstance(target_prns, list) and len(target_prns) > 0:
                        stu_prn = str(student_info['prn'] or '').strip()
                        stu_r_id = str(r_id)
                        target_set = {str(x).strip() for x in target_prns if x is not None}
                        if stu_prn not in target_set and stu_r_id not in target_set:
                            continue # Skip this assessment: student is not in selected target list
                except:
                    pass

            seen_asm_ids.add(asm['id'])

            d = dict(asm)
            d['teacher_id'] = t_id
            d['roster_id'] = r_id

            # Sanitize MCQs
            if d.get('is_mcq') and d.get('mcq_questions_json'):
                try:
                    qs = json.loads(d['mcq_questions_json'])
                    student_qs = []
                    for q in qs:
                        sq = dict(q)
                        sq.pop('correct_index', None) # Hide correct answer
                        student_qs.append(sq)
                    d['mcq_questions_for_student'] = student_qs
                except:
                    d['mcq_questions_for_student'] = []

            # Individual topic allocation
            if d.get('is_individual_topics') and d.get('student_topics_json'):
                try:
                    stopics = json.loads(d['student_topics_json'])
                    stu_prn = str(student_info['prn'] or '').strip()
                    if stu_prn in stopics and stopics[stu_prn]:
                        d['individual_topic'] = stopics[stu_prn]
                        d['assigned_topic'] = stopics[stu_prn]
                    elif str(r_id) in stopics and stopics[str(r_id)]:
                        d['individual_topic'] = stopics[str(r_id)]
                        d['assigned_topic'] = stopics[str(r_id)]
                except:
                    pass

            # Group allocation
            if d.get('is_group') and d.get('student_groups_json'):
                try:
                    sgroups = json.loads(d['student_groups_json'])
                    stu_prn = str(student_info['prn'] or '').strip()
                    gInfo = sgroups.get(stu_prn) or sgroups.get(str(r_id))
                    if gInfo:
                        if isinstance(gInfo, dict):
                            d['assigned_group'] = gInfo.get('group', '')
                            d['is_group_leader'] = gInfo.get('is_leader', False)
                            d['group_topic'] = gInfo.get('topic', '')
                        else:
                            d['assigned_group'] = str(gInfo)
                except:
                    pass

            # Attached study materials
            if d.get('study_materials_json'):
                try:
                    d['study_materials'] = json.loads(d['study_materials_json'])
                except:
                    d['study_materials'] = []
            else:
                d['study_materials'] = []

            # Check if student already submitted this assessment
            cursor.execute("""
            SELECT s.id, s.submission_id, s.submitted_at, s.status, s.typed_content_html, s.drive_url, s.pdf_url as sub_pdf_url, s.youtube_url, e.marks_obtained
            FROM submissions s
            LEFT JOIN evaluations e ON e.submission_id = s.id
            WHERE s.created_assessment_id = ? AND (s.prn = ? OR s.roster_id = ?)
            ORDER BY s.id DESC LIMIT 1
            """, (d['id'], student_info['prn'], r_id))
            sub = cursor.fetchone()
            if sub:
                is_reopened = (sub['status'] == 'Reopened')
                show_marks = (d.get('show_marks_to_students') != 0)
                marks_val = sub['marks_obtained'] if show_marks else None
                d['student_submission'] = {
                    'id': sub['id'],
                    'submission_id': sub['submission_id'],
                    'status': sub['status'],
                    'marks_obtained': marks_val,
                    'marks_hidden': (not show_marks and sub['marks_obtained'] is not None),
                    'submitted_at': sub['submitted_at'],
                    'prev_content': sub['typed_content_html'] if is_reopened else None,
                    'prev_drive_url': sub['drive_url'] if is_reopened else None,
                    'prev_pdf_url': sub['sub_pdf_url'] if is_reopened else None,
                    'prev_youtube_url': sub['youtube_url'] if is_reopened else None,
                    'pdf_url': f"/api/student/download-submission-pdf/{sub['id']}" if sub['id'] else None
                }
                d['is_reopened'] = is_reopened
                d['is_submitted'] = False if is_reopened else True
            else:
                d['student_submission'] = None
                d['is_submitted'] = False
                d['is_reopened'] = False

            all_active_assessments.append(d)

    # Fetch all reopened submissions for this student across all teachers
    cursor.execute("""
    SELECT s.*, 
           ca.assessment_session_title, ca.assessment_type_name as ca_type_name, 
           ca.assignment_topic as ca_assignment_topic, ca.max_marks as ca_max_marks, 
           ca.submission_deadline as ca_deadline, ca.is_mcq as ca_is_mcq, 
           ca.mcq_questions_json as ca_mcq_json, ca.study_materials_json as ca_materials_json, 
           ca.meeting_url as ca_meeting_url, ca.meeting_time as ca_meeting_time,
           t.name as teacher_name, t.teacher_code, t.designation as teacher_designation,
           t.college_name as teacher_college, t.university_name as teacher_university
    FROM submissions s
    LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
    JOIN teachers t ON s.teacher_id = t.id
    WHERE (LOWER(TRIM(s.prn)) = LOWER(TRIM(?)) OR s.roster_id = ?) 
      AND s.status = 'Reopened'
    ORDER BY s.id DESC
    """, (student_info['prn'], primary_roster['id']))
    reopened_subs = cursor.fetchall()

    for r_sub in reopened_subs:
        matched_existing = None
        for asm_item in all_active_assessments:
            if r_sub['created_assessment_id'] and asm_item.get('id') == r_sub['created_assessment_id']:
                matched_existing = asm_item
                break
        
        if matched_existing:
            matched_existing['is_reopened'] = True
            matched_existing['is_submitted'] = False
            matched_existing['student_submission'] = {
                'id': r_sub['id'],
                'submission_id': r_sub['submission_id'],
                'status': 'Reopened',
                'marks_obtained': None,
                'submitted_at': r_sub['submitted_at'],
                'prev_content': r_sub['typed_content_html'],
                'prev_drive_url': r_sub['drive_url'],
                'prev_pdf_url': r_sub['pdf_url'],
                'prev_youtube_url': r_sub['youtube_url'],
                'pdf_url': f"/api/student/download-submission-pdf/{r_sub['id']}"
            }
        else:
            asm_id = r_sub['created_assessment_id'] or r_sub['id']
            if asm_id not in seen_asm_ids:
                seen_asm_ids.add(asm_id)
                study_mats = []
                if r_sub['ca_materials_json']:
                    try:
                        study_mats = json.loads(r_sub['ca_materials_json'])
                    except:
                        pass
                synth_asm = {
                    'id': asm_id,
                    'created_assessment_id': r_sub['created_assessment_id'],
                    'teacher_id': r_sub['teacher_id'],
                    'roster_id': r_sub['roster_id'] or primary_roster['id'],
                    'assessment_session_title': r_sub['assessment_session_title'] or f"{r_sub['course_name'] or 'Course'} - {r_sub['assessment_type_name']}",
                    'assessment_type': r_sub['assessment_type_name'],
                    'assessment_type_name': r_sub['assessment_type_name'],
                    'class_name': r_sub['class_name'] or student_info['class_name'],
                    'division': r_sub['division'] or student_info['division'],
                    'semester': r_sub['semester'] or 'Sem 1',
                    'course_code': r_sub['course_code'] or '',
                    'course_name': r_sub['course_name'] or '',
                    'assignment_topic': r_sub['ca_assignment_topic'] or r_sub['topic'],
                    'individual_topic': r_sub['topic'],
                    'assigned_topic': r_sub['topic'],
                    'max_marks': r_sub['ca_max_marks'] or 20,
                    'submission_deadline': r_sub['ca_deadline'] or 'Reopened for Revision',
                    'is_mcq': r_sub['ca_is_mcq'] or 0,
                    'meeting_url': r_sub['ca_meeting_url'] or '',
                    'meeting_time': r_sub['ca_meeting_time'] or '',
                    'study_materials': study_mats,
                    'teacher_name': r_sub['teacher_name'],
                    'teacher_code': r_sub['teacher_code'],
                    'teacher_designation': r_sub['teacher_designation'],
                    'teacher_college': r_sub['teacher_college'],
                    'teacher_university': r_sub['teacher_university'],
                    'student_submission': {
                        'id': r_sub['id'],
                        'submission_id': r_sub['submission_id'],
                        'status': 'Reopened',
                        'marks_obtained': None,
                        'submitted_at': r_sub['submitted_at'],
                        'prev_content': r_sub['typed_content_html'],
                        'prev_drive_url': r_sub['drive_url'],
                        'prev_pdf_url': r_sub['pdf_url'],
                        'prev_youtube_url': r_sub['youtube_url'],
                        'pdf_url': f"/api/student/download-submission-pdf/{r_sub['id']}"
                    },
                    'is_reopened': True,
                    'is_submitted': False
                }
                all_active_assessments.append(synth_asm)

    # Fetch dismissed announcement IDs for this student
    cursor.execute("SELECT announcement_id FROM student_dismissed_announcements WHERE prn = ?", (student_info['prn'],))
    dismissed_ann_ids = {r['announcement_id'] for r in cursor.fetchall()}

    # Fetch active announcements across all enrolled teachers & classes
    all_announcements = []
    seen_ann_ids = set()
    for et in enrolled_teachers:
        t_id = et['teacher_id']
        c_name = et['class_name']
        cursor.execute("""
        SELECT ta.*, t.name as teacher_name, t.teacher_code, t.designation as teacher_designation,
               t.college_name as teacher_college
        FROM teacher_announcements ta
        JOIN teachers t ON ta.teacher_id = t.id
        WHERE ta.teacher_id = ? AND (ta.target_class = 'ALL' OR ta.target_class = ?)
        ORDER BY ta.created_at DESC, ta.id DESC
        """, (t_id, c_name))
        for a in cursor.fetchall():
            if a['id'] not in seen_ann_ids and a['id'] not in dismissed_ann_ids:
                seen_ann_ids.add(a['id'])
                all_announcements.append(dict(a))

    # Sort latest announcements first
    all_announcements.sort(key=lambda x: (x.get('created_at') or '', x.get('id') or 0), reverse=True)

    # Fetch Study Materials across all enrolled teachers & classes
    all_study_materials = []
    seen_mat_ids = set()
    for et in enrolled_teachers:
        t_id = et['teacher_id']
        c_name = et['class_name']
        cursor.execute("""
        SELECT sm.*, t.name as teacher_name, t.teacher_code, t.designation as teacher_designation,
               t.college_name as teacher_college
        FROM teacher_study_materials sm
        JOIN teachers t ON sm.teacher_id = t.id
        WHERE sm.teacher_id = ? AND (sm.class_name = 'ALL' OR sm.class_name = ?)
        ORDER BY sm.created_at DESC, sm.id DESC
        """, (t_id, c_name))
        for m in cursor.fetchall():
            if m['id'] not in seen_mat_ids:
                seen_mat_ids.add(m['id'])
                all_study_materials.append(dict(m))

    # Sort latest study materials and assessments first
    all_study_materials.sort(key=lambda x: (x.get('created_at') or '', x.get('id') or 0), reverse=True)
    all_active_assessments.sort(key=lambda x: (x.get('created_at') or '', x.get('id') or 0), reverse=True)

    # Summary metrics
    total_assignments = len(all_active_assessments)
    submitted_count = sum(1 for a in all_active_assessments if a.get('is_submitted'))
    pending_count = total_assignments - submitted_count

    summary = {
        'total_enrolled_teachers': len(enrolled_teachers),
        'total_assignments': total_assignments,
        'submitted_assignments': submitted_count,
        'pending_assignments': pending_count,
        'total_announcements': len(all_announcements),
        'total_study_materials': len(all_study_materials)
    }

    # Record student connections
    for et in enrolled_teachers:
        try:
            cursor.execute("""
            INSERT INTO student_connections (teacher_id, roster_id, prn, student_name, class_name, academic_year)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(teacher_id, prn) DO NOTHING
            """, (et['teacher_id'], et['roster_id'], student_info['prn'], student_info['student_name'], et['class_name'], student_info['academic_year']))
        except:
            pass
    conn.commit()
    conn.close()

    return jsonify({
        'verified': True,
        'in_roster': True,
        'student': student_info,
        'teacher': primary_teacher,
        'enrolled_teachers': enrolled_teachers,
        'active_assessments': all_active_assessments,
        'announcements': all_announcements,
        'study_materials': all_study_materials,
        'summary': summary
    })

@app.route('/api/student/dismiss-announcement', methods=['POST'])
def student_dismiss_announcement():
    data = request.json or {}
    prn = str(data.get('prn', '')).strip()
    announcement_id = data.get('announcement_id')
    if not (prn and announcement_id):
        return jsonify({'error': 'PRN and announcement_id are required.'}), 400
    
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO student_dismissed_announcements (prn, announcement_id)
    VALUES (?, ?)
    ON CONFLICT(prn, announcement_id) DO NOTHING
    """, (prn, announcement_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Announcement dismissed from student view.'})

@app.route('/api/submissions', methods=['POST'])
def create_student_submission():
    data = request.json or {}
    teacher_id = data.get('teacher_id')
    roster_id = data.get('roster_id')
    created_assessment_id = data.get('created_assessment_id')
    topic = str(data.get('topic', '')).strip()
    typed_content_html = data.get('typed_content_html', '').strip()
    dynamic_data = data.get('dynamic_data', {})
    group_code = data.get('group_code', '').strip()
    drive_url = str(data.get('drive_url') or '').strip()
    youtube_url = str(data.get('youtube_url') or '').strip()
    pdf_url = str(data.get('pdf_url') or '').strip()
    cloud_url = str(data.get('cloud_url') or data.get('link') or data.get('url') or '').strip()

    if cloud_url and not (drive_url or youtube_url or pdf_url):
        if 'youtube.com' in cloud_url or 'youtu.be' in cloud_url:
            youtube_url = cloud_url
        elif cloud_url.lower().endswith('.pdf') or '.pdf?' in cloud_url:
            pdf_url = cloud_url
        else:
            drive_url = cloud_url

    if not (drive_url or youtube_url or pdf_url) and isinstance(dynamic_data, dict):
        for v in dynamic_data.values():
            if isinstance(v, str):
                m_urls = re.findall(r'https?://[^\s<>"\'\)]+', v)
                if m_urls:
                    u_clean = m_urls[0].rstrip('.,;')
                    if 'youtube.com' in u_clean or 'youtu.be' in u_clean:
                        youtube_url = u_clean
                    elif u_clean.lower().endswith('.pdf') or '.pdf?' in u_clean:
                        pdf_url = u_clean
                    else:
                        drive_url = u_clean
                    break

    if not (drive_url or youtube_url or pdf_url) and typed_content_html:
        m_urls = re.findall(r'https?://[^\s<>"\'\)]+', typed_content_html)
        if m_urls:
            u_clean = m_urls[0].rstrip('.,;')
            if 'youtube.com' in u_clean or 'youtu.be' in u_clean:
                youtube_url = u_clean
            elif u_clean.lower().endswith('.pdf') or '.pdf?' in u_clean:
                pdf_url = u_clean
            else:
                drive_url = u_clean
    mcq_answers = data.get('mcq_answers', {})
    if isinstance(mcq_answers, str):
        try:
            mcq_answers = json.loads(mcq_answers)
        except:
            mcq_answers = {}

    conn = database.get_db_connection()
    cursor = conn.cursor()

    student = None
    if roster_id and teacher_id:
        cursor.execute("SELECT * FROM teacher_rosters WHERE id = ? AND teacher_id = ?", (roster_id, teacher_id))
        student = cursor.fetchone()

    prn = str(data.get('prn') or '').strip()
    if not student and prn and teacher_id:
        cursor.execute("""
        SELECT * FROM teacher_rosters 
        WHERE teacher_id = ? AND (
            LOWER(TRIM(prn)) = LOWER(?) 
         OR REPLACE(prn, ' ', '') = REPLACE(?, ' ', '') 
         OR LOWER(TRIM(roll_number)) = LOWER(?)
        )
        """, (teacher_id, prn, prn, prn))
        student = cursor.fetchone()
        if student:
            roster_id = student['id']

    if not student and roster_id:
        cursor.execute("SELECT * FROM teacher_rosters WHERE id = ?", (roster_id,))
        any_student = cursor.fetchone()
        if any_student and teacher_id:
            stu_prn = any_student['prn']
            cursor.execute("""
            SELECT * FROM teacher_rosters 
            WHERE teacher_id = ? AND (
                LOWER(TRIM(prn)) = LOWER(?) 
             OR REPLACE(prn, ' ', '') = REPLACE(?, ' ', '') 
             OR LOWER(TRIM(roll_number)) = LOWER(?)
            )
            """, (teacher_id, stu_prn, stu_prn, stu_prn))
            student = cursor.fetchone()
            if student:
                roster_id = student['id']

    if not student:
        conn.close()
        return jsonify({'error': 'Student roster record not found.'}), 404

    cursor.execute("SELECT * FROM teachers WHERE id = ?", (teacher_id,))
    teacher = cursor.fetchone()
    cursor.execute("SELECT * FROM created_assessments WHERE id = ? AND teacher_id = ?", (created_assessment_id, teacher_id))
    assessment = cursor.fetchone()

    if not (teacher and assessment):
        conn.close()
        return jsonify({'error': 'Assessment session not found.'}), 404

    is_mcq = 1 if assessment['is_mcq'] else 0

    if not topic:
        topic = assessment['assignment_topic'] or assessment['assessment_session_title']

    if not is_mcq and not typed_content_html and not drive_url and not youtube_url and not pdf_url:
        conn.close()
        return jsonify({'error': 'Please fill all required fields and type your answers online or provide your Scanned PDF / Drive / YouTube link.'}), 400

    if not typed_content_html and (drive_url or youtube_url or pdf_url):
        links_summary = []
        if pdf_url:
            links_summary.append(f"<p><strong>Scanned Journal / Practical / Report PDF Link:</strong> <a href='{pdf_url}' target='_blank'>{pdf_url}</a></p>")
        if drive_url:
            links_summary.append(f"<p><strong>Google Drive Submission Link:</strong> <a href='{drive_url}' target='_blank'>{drive_url}</a></p>")
        if youtube_url:
            links_summary.append(f"<p><strong>YouTube Presentation Link:</strong> <a href='{youtube_url}' target='_blank'>{youtube_url}</a></p>")
        typed_content_html = "<h4>Online Assessment & Document Submission Links</h4>" + "".join(links_summary)

    # Duplicate check
    cursor.execute("""
    SELECT id, submission_id, status FROM submissions 
    WHERE (roster_id = ? OR (prn = ? AND prn != '')) AND created_assessment_id = ?
    """, (roster_id, student['prn'], created_assessment_id))
    existing = cursor.fetchone()
    if existing and existing['status'] != 'Reopened':
        conn.close()
        return jsonify({
            'error': f'You have already submitted this assessment (Submission ID: {existing["submission_id"]}, Status: {existing["status"]}). Duplicate submissions are blocked.',
            'existing_submission_id': existing['submission_id']
        }), 409

    # Check late
    is_late = 0
    if assessment['submission_deadline']:
        try:
            deadline_dt = datetime.datetime.strptime(assessment['submission_deadline'], '%Y-%m-%d')
            if datetime.datetime.now() > deadline_dt:
                if not assessment['allow_late']:
                    conn.close()
                    return jsonify({'error': f'Submission deadline ({assessment["submission_deadline"]}) has passed. Submissions are closed.'}), 403
                is_late = 1
        except:
            pass

    now = datetime.datetime.now()
    year_str = str(now.year)
    submission_id = database.generate_next_submission_id(year_str)
    submitted_at_str = now.strftime('%Y-%m-%d %H:%M:%S')

    # MCQ Auto-Grading Calculation
    is_auto_graded = 0
    calculated_marks = 0.0
    total_mcq_max_marks = float(assessment['max_marks'])
    auto_remarks = ""
    correct_count = 0
    total_q_count = 0

    if is_mcq:
        try:
            questions = json.loads(assessment['mcq_questions_json'] or '[]')
        except:
            questions = []
        
        total_q_count = len(questions)
        q_breakdown_html = ["<div class='mcq-submission-review space-y-3'>"]
        
        opt_letters = ['A', 'B', 'C', 'D', 'E', 'F']
        for idx, q in enumerate(questions):
            q_id = str(idx)
            raw_ans = mcq_answers.get(q_id)
            if raw_ans is None:
                raw_ans = mcq_answers.get(str(idx + 1))
            
            student_ans_idx = None
            if raw_ans is not None:
                try:
                    student_ans_idx = int(raw_ans)
                except (ValueError, TypeError):
                    if isinstance(raw_ans, str) and raw_ans.strip().upper() in opt_letters:
                        student_ans_idx = opt_letters.index(raw_ans.strip().upper())

            opts = q.get('options')
            if not opts or not isinstance(opts, list):
                opts = [q[k] for k in ['option_a', 'option_b', 'option_c', 'option_d', 'option_e', 'option_f'] if q.get(k)]
            
            correct_idx = q.get('correct_index')
            if correct_idx is None and q.get('correct_option'):
                co = str(q.get('correct_option')).strip().upper()
                if co in opt_letters:
                    correct_idx = opt_letters.index(co)
            try:
                correct_idx = int(correct_idx) if correct_idx is not None else 0
            except:
                correct_idx = 0
            q_marks = float(q.get('marks', 1.0))
            
            is_correct = (student_ans_idx is not None and student_ans_idx == correct_idx)
            if is_correct:
                calculated_marks += q_marks
                correct_count += 1

            student_letter = opt_letters[student_ans_idx] if (student_ans_idx is not None and 0 <= student_ans_idx < len(opt_letters)) else ""
            student_ans_text = opts[student_ans_idx] if (student_ans_idx is not None and 0 <= student_ans_idx < len(opts)) else "Not Attempted (अनुत्तरित)"

            opts_formatted = []
            for o_i, opt in enumerate(opts):
                o_let = opt_letters[o_i] if o_i < len(opt_letters) else str(o_i + 1)
                is_selected_opt = (student_ans_idx == o_i)
                if is_selected_opt:
                    opts_formatted.append(f"<p style='margin-left: 12px; margin-top: 2px; font-weight: bold; color: #1e3a8a;'>● {o_let}) {opt} <em>(विद्यार्थ्याने निवडलेले उत्तर / Selected)</em></p>")
                else:
                    opts_formatted.append(f"<p style='margin-left: 12px; margin-top: 2px; color: #475569;'>○ {o_let}) {opt}</p>")

            q_breakdown_html.append(f"""
            <div style='border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; margin-bottom: 10px; background: #f8fafc;'>
              <p style='font-size: 13px;'><strong>प्रश्न {idx+1}. {q.get('question','')}</strong></p>
              {''.join(opts_formatted)}
              <p style='margin-top: 6px; font-size: 12px; font-weight: bold; color: #0f172a;'>विद्यार्थ्याचे उत्तर (Student Response): {student_letter + ') ' if student_letter else ''}{student_ans_text}</p>
            </div>
            """)
        
        q_breakdown_html.append("</div>")
        
        mcq_sheet_header = f"<h4>Online MCQ Unit Test / Quiz Student Answer Sheet (ऑनलाइन बहुपर्यायी चाचणी उत्तरपत्रिका)</h4><p>Total Questions: {total_q_count}</p>"
        mcq_full_sheet = mcq_sheet_header + "".join(q_breakdown_html)
        
        clean_typed = (typed_content_html or '').strip()
        if not clean_typed or clean_typed in ['<p><br></p>', '<p></p>', '<div><br></div>']:
            typed_content_html = mcq_full_sheet
        else:
            typed_content_html = mcq_full_sheet + "<br/><hr/><br/>" + clean_typed
        
        is_auto_graded = 1
        auto_remarks = f"Auto-Graded MCQ Test: {correct_count}/{total_q_count} correct answers ({calculated_marks}/{total_mcq_max_marks} marks)."

    status = 'Assessed' if is_auto_graded else 'Submitted'
    mcq_answers_json = json.dumps(mcq_answers)
    dynamic_data_json = json.dumps(dynamic_data)

    group_code = str(data.get('group_code') or '').strip()
    group_members_to_sync = []
    
    if assessment['is_group'] and assessment['student_groups_json']:
        try:
            sgroups = json.loads(assessment['student_groups_json'])
            student_prn = student['prn']
            if not group_code and student_prn in sgroups:
                gdata = sgroups[student_prn]
                if isinstance(gdata, dict):
                    group_code = gdata.get('group', '')
                    if gdata.get('topic'):
                        topic = gdata.get('topic')
                else:
                    group_code = str(gdata)

            if group_code:
                for g_prn, g_info in sgroups.items():
                    g_name = g_info.get('group', '') if isinstance(g_info, dict) else str(g_info)
                    if g_name.strip() == group_code.strip():
                        group_members_to_sync.append(str(g_prn).strip())
        except Exception:
            pass

    if not group_members_to_sync:
        group_members_to_sync = [student['prn']]

    # Fetch roster records for all group members
    placeholders = ', '.join(['?'] * len(group_members_to_sync))
    cursor.execute(
        f"SELECT * FROM teacher_rosters WHERE teacher_id = ? AND prn IN ({placeholders})",
        [teacher['id']] + group_members_to_sync
    )
    roster_members = [dict(r) for r in cursor.fetchall()]
    if not roster_members:
        roster_members = [dict(student)]

    # Compute sequential submission IDs for new entries
    cursor.execute("SELECT submission_id FROM submissions WHERE submission_id LIKE ? ORDER BY id DESC LIMIT 1",
                   (f"RAJ-IA-{year_str}-%",))
    last_sub_row = cursor.fetchone()
    if last_sub_row:
        parts = last_sub_row['submission_id'].split('-')
        base_seq = int(parts[3]) + 1 if len(parts) == 4 and parts[3].isdigit() else 1
    else:
        base_seq = 101

    primary_sub_id = None
    primary_submission_code = None
    assigned_idx = 0

    for idx, m in enumerate(roster_members):
        m_prn = m['prn']

        # Check if this student already has an existing submission
        cursor.execute(
            "SELECT id, submission_id FROM submissions WHERE roster_id = ? AND created_assessment_id = ?",
            (m['id'], created_assessment_id)
        )
        existing_sub = cursor.fetchone()

        if existing_sub:
            cursor.execute("""
                UPDATE submissions SET
                  group_code = ?, topic = ?, typed_content_html = ?, mcq_answers_json = ?, drive_url = ?, youtube_url = ?, pdf_url = ?, status = ?, is_auto_graded = ?, submitted_at = ?
                WHERE id = ?
            """, (group_code, topic, typed_content_html, mcq_answers_json, drive_url, youtube_url, pdf_url, status, is_auto_graded, submitted_at_str, existing_sub['id']))
            if is_auto_graded:
                cursor.execute("""
                INSERT OR REPLACE INTO evaluations
                (submission_id, marks_obtained, maximum_marks, remarks, evaluated_by_teacher_id, evaluated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (existing_sub['id'], calculated_marks, total_mcq_max_marks, auto_remarks, teacher['id'], submitted_at_str))
            if m_prn == student['prn'] or primary_sub_id is None:
                primary_sub_id = existing_sub['id']
                primary_submission_code = existing_sub['submission_id']
            continue

        m_sub_code = f"RAJ-IA-{year_str}-{(base_seq + assigned_idx):06d}"
        assigned_idx += 1

        cursor.execute("""
        INSERT INTO submissions
        (submission_id, teacher_id, roster_id, created_assessment_id, student_name, roll_number, prn,
         class_name, division, semester, course_code, course_name, teacher_name, college_name, university_name,
         assessment_type_name, topic, group_code, dynamic_data_json, typed_content_html, mcq_answers_json,
         drive_url, youtube_url, pdf_url, is_auto_graded, status, is_late, submitted_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            m_sub_code, teacher_id, m['id'], created_assessment_id,
            m['student_name'], m['roll_number'], m['prn'],
            m['class_name'], m['division'], assessment['semester'],
            assessment['course_code'], assessment['course_name'], teacher['name'],
            teacher['college_name'], teacher['university_name'],
            assessment['assessment_type_name'], topic, group_code,
            dynamic_data_json, typed_content_html, mcq_answers_json,
            drive_url, youtube_url, pdf_url, is_auto_graded, status, is_late, submitted_at_str
        ))
        new_row_id = cursor.lastrowid
        if m_prn == student['prn'] or primary_sub_id is None:
            primary_sub_id = new_row_id
            primary_submission_code = m_sub_code

        # If auto graded, insert evaluation record and audit log immediately!
        if is_auto_graded:
            cursor.execute("""
            INSERT INTO evaluations
            (submission_id, marks_obtained, maximum_marks, remarks, evaluated_by_teacher_id, evaluated_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (new_row_id, calculated_marks, total_mcq_max_marks, auto_remarks, teacher['id'], submitted_at_str))

            cursor.execute("""
            INSERT INTO audit_logs (submission_id, action, performed_by, role, details, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (new_row_id, 'ASSESSED', 'CIE Auto-Grader', 'System', f"Auto-graded MCQ score: {calculated_marks}/{total_mcq_max_marks}", submitted_at_str))
        else:
            cursor.execute("""
            INSERT INTO audit_logs (submission_id, action, performed_by, role, details, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (new_row_id, 'SUBMITTED', f"{m['student_name']} ({m['prn']})", 'Student', f"Submitted {assessment['assessment_type_name']} with ID {m_sub_code}", submitted_at_str))

    conn.commit()
    conn.close()
    database.backup_database_to_cloud_async()

    return jsonify({
        'success': True,
        'message': 'Assessment submitted successfully!',
        'id': primary_sub_id,
        'submission_id': primary_submission_code,
        'is_auto_graded': bool(is_auto_graded),
        'marks_obtained': calculated_marks if is_auto_graded else None,
        'maximum_marks': total_mcq_max_marks if is_auto_graded else assessment['max_marks'],
        'summary': {
            'submission_id': primary_submission_code,
            'student_name': student['student_name'],
            'prn': student['prn'],
            'roll_number': student['roll_number'],
            'class_name': student['class_name'],
            'course_name': assessment['course_name'],
            'assessment_type': assessment['assessment_type_name'],
            'topic': topic,
            'teacher_name': teacher['name'],
            'submitted_at': submitted_at_str,
            'status': status
        }
    }), 201

@app.route('/api/student/my-status')
@app.route('/api/student/status')
def get_student_status():
    prn = str(request.args.get('prn') or '').strip()
    teacher_code = str(request.args.get('teacher_code') or '').strip().upper()
    if not prn:
        return jsonify({'error': 'Please enter your PRN to check status.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()
    sql = """
    SELECT s.id, s.submission_id, s.created_assessment_id, s.student_name, s.roll_number, s.prn, s.class_name,
           s.semester, s.course_code, s.course_name, s.assessment_type_name, s.topic,
           s.status, s.submitted_at, s.teacher_name, s.college_name
    FROM submissions s
    WHERE s.prn = ?
    """
    params = [prn]
    if teacher_code:
        cursor.execute("SELECT id FROM teachers WHERE teacher_code = ?", (teacher_code,))
        t = cursor.fetchone()
        if t:
            sql += " AND s.teacher_id = ?"
            params.append(t['id'])

    sql += " ORDER BY s.id DESC"
    cursor.execute(sql, params)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'submissions': rows, 'results': rows, 'count': len(rows)})

# =========================================================================
# 5. TEACHER EVALUATION, DASHBOARD & SEMESTER MATRIX
# =========================================================================
@app.route('/api/teacher/submissions')
@teacher_required
def get_teacher_submissions():
    teacher = get_current_teacher()
    class_name_raw = str(request.args.get('class_name') or '').strip()
    semester = request.args.get('semester')
    course_code = request.args.get('course_code')
    status = request.args.get('status')
    search = request.args.get('search', '').strip()

    conn = database.get_db_connection()
    cursor = conn.cursor()
    sql = """
    SELECT s.*, 
           e.marks_obtained, COALESCE(e.maximum_marks, ca.max_marks, 20) as maximum_marks, ca.max_marks as assessment_max_marks, e.remarks
    FROM submissions s
    LEFT JOIN evaluations e ON s.id = e.submission_id
    LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
    WHERE s.teacher_id = ?
    """
    params = [teacher['id']]
    if class_name_raw:
        classes = [c.strip() for c in class_name_raw.split(',') if c.strip()]
        if classes:
            placeholders = ','.join('?' for _ in classes)
            sql += f" AND s.class_name IN ({placeholders})"
            params.extend(classes)
    if semester:
        sql += " AND s.semester = ?"
        params.append(semester)
    if course_code:
        sql += " AND s.course_code = ?"
        params.append(course_code)
    if status:
        sql += " AND s.status = ?"
        params.append(status)
    assessment_id = request.args.get('assessment_id') or request.args.get('created_assessment_id')
    if assessment_id:
        sql += " AND s.created_assessment_id = ?"
        params.append(assessment_id)
    if search:
        sql += " AND (s.student_name LIKE ? OR s.roll_number LIKE ? OR s.prn LIKE ? OR s.submission_id LIKE ? OR s.topic LIKE ?)"
        wc = f"%{search}%"
        params.extend([wc, wc, wc, wc, wc])

    sql += " ORDER BY s.id DESC"
    cursor.execute(sql, params)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'submissions': rows, 'count': len(rows)})

@app.route('/api/teacher/evaluate', methods=['POST'])
@app.route('/api/teacher/submissions/<int:sub_id>/evaluate', methods=['POST'])
@teacher_required
def evaluate_submission(sub_id=None):
    teacher = get_current_teacher()
    data = request.json or {}
    submission_id = sub_id if sub_id is not None else data.get('submission_id')
    marks_obtained = data.get('marks_obtained')
    remarks = str(data.get('remarks') or '').strip()
    apply_to_group = data.get('apply_to_group', True)

    if submission_id is None or marks_obtained is None:
        return jsonify({'error': 'Please provide submission ID and marks obtained.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Find the target submission with its assessment session's configured max marks
    cursor.execute("""
        SELECT s.*, ca.max_marks as assessment_max_marks
        FROM submissions s
        LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
        WHERE s.id = ? AND s.teacher_id = ?
    """, (submission_id, teacher['id']))
    sub_row = cursor.fetchone()
    if not sub_row:
        conn.close()
        return jsonify({'error': 'Submission not found.'}), 404
    sub = dict(sub_row)

    raw_max = data.get('maximum_marks')
    if raw_max is not None:
        try:
            max_val = float(raw_max)
        except (ValueError, TypeError):
            max_val = float(sub.get('assessment_max_marks') or 20.0)
    else:
        max_val = float(sub.get('assessment_max_marks') or 20.0)

    try:
        marks_val = float(marks_obtained)
    except (ValueError, TypeError):
        conn.close()
        return jsonify({'error': 'Marks must be valid numbers.'}), 400

    if marks_val > max_val or marks_val < 0:
        conn.close()
        return jsonify({'error': f'Marks ({marks_val}) cannot exceed maximum ({max_val}) or be negative.'}), 400

    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    target_sub_ids = [sub['id']]
    # If submission belongs to a group and apply_to_group is true, propagate to all group members
    if apply_to_group and sub.get('group_code') and sub.get('created_assessment_id'):
        cursor.execute(
            "SELECT id FROM submissions WHERE teacher_id = ? AND created_assessment_id = ? AND group_code = ?",
            (teacher['id'], sub['created_assessment_id'], sub['group_code'])
        )
        group_rows = cursor.fetchall()
        target_sub_ids = [r['id'] for r in group_rows]

    for s_id in target_sub_ids:
        cursor.execute("""
        INSERT INTO evaluations
        (submission_id, marks_obtained, maximum_marks, remarks, evaluated_by_teacher_id, evaluated_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(submission_id) DO UPDATE SET
          marks_obtained=excluded.marks_obtained,
          maximum_marks=excluded.maximum_marks,
          remarks=excluded.remarks,
          evaluated_by_teacher_id=excluded.evaluated_by_teacher_id,
          evaluated_at=excluded.evaluated_at
        """, (s_id, marks_val, max_val, remarks, teacher['id'], now_str))

        cursor.execute("UPDATE submissions SET status = 'Assessed', updated_at = ? WHERE id = ? AND teacher_id = ?", (now_str, s_id, teacher['id']))

        cursor.execute("""
        INSERT INTO audit_logs (submission_id, action, performed_by, role, details, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (s_id, 'ASSESSED', teacher['name'], 'Teacher', f"Marks recorded: {marks_val}/{max_val}", now_str))

    conn.commit()
    conn.close()
    database.backup_database_to_cloud_async()
    
    msg = f"गट '{sub.get('group_code')}' मधील सर्व {len(target_sub_ids)} सदस्यांचे गुण यशस्वीरीत्या नोंदवले!" if (len(target_sub_ids) > 1 and sub.get('group_code')) else 'Evaluation saved successfully!'
    return jsonify({'success': True, 'message': msg, 'status': 'Assessed', 'updated_count': len(target_sub_ids)})

@app.route('/api/teacher/reopen', methods=['POST'])
@teacher_required
def reopen_submission():
    teacher = get_current_teacher()
    data = request.json or {}
    submission_id = data.get('submission_id')
    reason = data.get('reason', 'Teacher requested corrections.').strip()

    if not submission_id:
        return jsonify({'error': 'Submission ID required'}), 400

    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE submissions SET status = 'Reopened', updated_at = ? WHERE id = ? AND teacher_id = ?", (now_str, submission_id, teacher['id']))
    cursor.execute("""
    INSERT INTO audit_logs (submission_id, action, performed_by, role, details, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (submission_id, 'REOPENED', teacher['name'], 'Teacher', f"Reopened for student: {reason}", now_str))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Submission reopened for student edits.'})

# --- SEMESTER ASSESSMENT MARKS MATRIX ---
@app.route('/api/teacher/matrix')
@teacher_required
def get_teacher_semester_matrix():
    teacher = get_current_teacher()
    class_name = request.args.get('class_name', '').strip()
    subject_id_raw = request.args.get('subject_id', '').strip()
    semester = request.args.get('semester', '').strip()
    course_code = request.args.get('course_code', '').strip()

    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Get all subjects for this teacher
    cursor.execute("""
    SELECT id, subject_name, course_code, course_name, class_name, semester, total_internal_max_marks 
    FROM teacher_subjects 
    WHERE teacher_id = ? 
    ORDER BY id ASC
    """, (teacher['id'],))
    teacher_subjects = [dict(r) for r in cursor.fetchall()]

    selected_subject = None
    subject_id = None
    if subject_id_raw:
        try:
            subject_id = int(subject_id_raw)
            selected_subject = next((s for s in teacher_subjects if s['id'] == subject_id), None)
            if selected_subject:
                class_name = selected_subject['class_name']
                if not course_code:
                    course_code = selected_subject['course_code']
                if not semester:
                    semester = selected_subject['semester']
        except:
            subject_id = None

    # Get all distinct classes for this teacher
    cursor.execute("""
    SELECT DISTINCT class_name FROM teacher_rosters WHERE teacher_id = ? AND class_name IS NOT NULL AND class_name != ''
    UNION
    SELECT DISTINCT class_name FROM teacher_subjects WHERE teacher_id = ? AND class_name IS NOT NULL AND class_name != ''
    ORDER BY class_name ASC
    """, (teacher['id'], teacher['id']))
    classes_list = [r[0] for r in cursor.fetchall() if r[0]]

    # 1. Fetch mapped components
    type_params = [teacher['id']]
    if subject_id:
        type_query = """
        SELECT DISTINCT a.assessment_type_name, a.max_marks
        FROM teacher_assignment_mappings a
        WHERE a.teacher_id = ? AND a.subject_id = ?
        ORDER BY a.id ASC
        """
        type_params.append(subject_id)
    else:
        type_query = """
        SELECT DISTINCT a.assessment_type_name, a.max_marks
        FROM teacher_assignment_mappings a
        JOIN teacher_subjects s ON a.subject_id = s.id
        WHERE a.teacher_id = ?
        """
        if class_name:
            classes = [c.strip() for c in class_name.split(',') if c.strip()]
            if classes:
                placeholders = ','.join('?' for _ in classes)
                type_query += f" AND s.class_name IN ({placeholders})"
                type_params.extend(classes)
        if semester:
            type_query += " AND s.semester = ?"
            type_params.append(semester)
        if course_code:
            type_query += " AND s.course_code = ?"
            type_params.append(course_code)

    cursor.execute(type_query, type_params)
    columns = [dict(r) for r in cursor.fetchall()]

    # Fallback to created_assessments or submissions if no assignment mappings exist
    if not columns:
        if subject_id:
            cursor.execute("""
            SELECT DISTINCT assessment_type_name, max_marks 
            FROM created_assessments 
            WHERE teacher_id = ? AND subject_id = ? AND status = 'active'
            """, (teacher['id'], subject_id))
        else:
            cursor.execute("""
            SELECT DISTINCT assessment_type_name, max_marks 
            FROM created_assessments 
            WHERE teacher_id = ? AND status = 'active'
            """, (teacher['id'],))
        columns = [dict(r) for r in cursor.fetchall()]

    if not columns:
        cursor.execute("""
        SELECT DISTINCT assessment_type_name, 20 as max_marks 
        FROM submissions 
        WHERE teacher_id = ?
        """, (teacher['id'],))
        columns = [dict(r) for r in cursor.fetchall()]

    # 2. Fetch target students if this subject has selective targeting
    selective_target_prns = set()
    if subject_id:
        cursor.execute("""
        SELECT target_students_json 
        FROM created_assessments 
        WHERE teacher_id = ? AND subject_id = ? AND target_students_json IS NOT NULL AND target_students_json != '[]'
        """, (teacher['id'], subject_id))
        rows_ca = cursor.fetchall()
        for r_ca in rows_ca:
            try:
                t_prns = json.loads(r_ca['target_students_json'])
                if isinstance(t_prns, list) and len(t_prns) > 0:
                    for p in t_prns:
                        selective_target_prns.add(str(p).strip())
            except:
                pass

    # 3. Fetch students from roster
    roster_query = "SELECT * FROM teacher_rosters WHERE teacher_id = ?"
    roster_params = [teacher['id']]
    if class_name:
        classes = [c.strip() for c in class_name.split(',') if c.strip()]
        if classes:
            placeholders = ','.join('?' for _ in classes)
            roster_query += f" AND class_name IN ({placeholders})"
            roster_params.extend(classes)
    roster_query += " ORDER BY CAST(roll_number AS INTEGER) ASC, student_name ASC"
    cursor.execute(roster_query, roster_params)
    raw_roster_students = [dict(r) for r in cursor.fetchall()]

    # Filter roster if subject is selective
    if selective_target_prns:
        roster_students = [st for st in raw_roster_students if str(st.get('prn')).strip() in selective_target_prns or str(st.get('id')).strip() in selective_target_prns]
    else:
        roster_students = raw_roster_students

    # 4. Fetch submissions & evaluations
    sub_query = """
    SELECT s.id as submission_id, s.roster_id, s.assessment_type_name, e.marks_obtained, e.maximum_marks, s.status
    FROM submissions s
    LEFT JOIN evaluations e ON s.id = e.submission_id
    LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
    WHERE s.teacher_id = ?
    """
    sub_params = [teacher['id']]
    if subject_id:
        sub_query += " AND (ca.subject_id = ? OR s.course_code = ?)"
        sub_params.extend([subject_id, course_code or ''])
    else:
        if class_name:
            sub_query += " AND s.class_name = ?"
            sub_params.append(class_name)
        if semester:
            sub_query += " AND s.semester = ?"
            sub_params.append(semester)
        if course_code:
            sub_query += " AND s.course_code = ?"
            sub_params.append(course_code)

    cursor.execute(sub_query, sub_params)
    sub_rows = cursor.fetchall()
    conn.close()

    sub_map = {}
    for sr in sub_rows:
        rid = sr['roster_id']
        atype = sr['assessment_type_name']
        if rid not in sub_map:
            sub_map[rid] = {}
        sub_map[rid][atype] = {
            'submission_id': sr['submission_id'],
            'marks_obtained': sr['marks_obtained'],
            'maximum_marks': sr['maximum_marks'],
            'status': sr['status']
        }

    total_max_marks = sum(float(c.get('max_marks') or 0) for c in columns)

    matrix_students = []
    for st in roster_students:
        rid = st['id']
        scores = {}
        total_obt = 0.0
        for col in columns:
            cname = col['assessment_type_name']
            entry = sub_map.get(rid, {}).get(cname)
            if entry:
                if entry['marks_obtained'] is not None:
                    marks_val = float(entry['marks_obtained'])
                    scores[cname] = marks_val
                    total_obt += marks_val
                else:
                    scores[cname] = 'Submitted'
            else:
                scores[cname] = None
        
        pct = round((total_obt / total_max_marks * 100), 1) if total_max_marks > 0 else 0.0
        matrix_students.append({
            'id': st['id'],
            'roll_number': st['roll_number'],
            'prn': st['prn'],
            'student_name': st['student_name'],
            'class_name': st.get('class_name') or 'N/A',
            'academic_year': st.get('academic_year') or '2026–27',
            'division': st.get('division') or 'A',
            'is_repeater': st.get('is_repeater', 0),
            'scores': scores,
            'total_obtained': total_obt,
            'total_max': total_max_marks,
            'percentage': pct,
            'status': 'Evaluated' if total_obt > 0 else ('Pending' if any(scores.get(c['assessment_type_name']) for c in columns) else 'Not Submitted')
        })

    return jsonify({
        'columns': columns,
        'components': [{'id': idx, 'name': c['assessment_type_name'], 'max_marks': c.get('max_marks', 20)} for idx, c in enumerate(columns)],
        'students': matrix_students,
        'matrix': matrix_students,
        'classes': classes_list,
        'subjects': teacher_subjects,
        'selected_subject': selected_subject,
        'total_max': total_max_marks,
        'count': len(matrix_students)
    })

@app.route('/api/teacher/export-matrix-csv')
@teacher_required
def export_teacher_matrix_csv():
    teacher = get_current_teacher()
    class_name = request.args.get('class_name', '')
    subject_id = request.args.get('subject_id', '').strip()
    semester = request.args.get('semester', '').strip()

    matrix_res = get_teacher_semester_matrix()
    matrix_data = matrix_res.get_json()

    cols = matrix_data.get('columns', [])
    col_names = [c['assessment_type_name'] for c in cols]
    students = matrix_data.get('students', [])

    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow([f"Internal Assessment Semester Matrix - {teacher['college_name']}"])
    writer.writerow([f"Faculty: {teacher['name']}", f"Subject: {teacher['subject_name']}", f"Class: {class_name or 'All'}", f"Semester: {semester or 'All'}"])
    writer.writerow([])
    
    header_row = ["Roll No", "PRN", "Student Name", "Type"] + col_names + ["Total Internal Marks"]
    writer.writerow(header_row)

    for st in students:
        row = [
            st['roll_number'], st['prn'], st['student_name'],
            "Repeater" if st['is_repeater'] else "Regular"
        ]
        for cn in col_names:
            val = st['scores'].get(cn)
            row.append(val if val is not None else "—")
        row.append(st['total_obtained'])
        writer.writerow(row)

    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": f"attachment;filename=Internal_Assessment_Matrix_{class_name or 'All'}.csv"}
    )

# =========================================================================
# 6. OFFICIAL PDF RECORD DOWNLOAD
# =========================================================================
@app.route('/api/submissions/<id_or_code>')
def get_submission_detail(id_or_code):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT s.*, 
           e.marks_obtained, COALESCE(e.maximum_marks, ca.max_marks, 20) as maximum_marks, ca.max_marks as assessment_max_marks, e.remarks, e.evaluated_at
    FROM submissions s
    LEFT JOIN evaluations e ON s.id = e.submission_id
    LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
    WHERE s.id = ? OR s.submission_id = ?
    """, (id_or_code, id_or_code))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return jsonify({'error': 'Submission not found'}), 404

    sub = dict(row)
    try:
        sub['dynamic_data'] = json.loads(sub['dynamic_data_json'])
    except:
        sub['dynamic_data'] = {}

    cursor.execute("SELECT * FROM audit_logs WHERE submission_id = ? ORDER BY id ASC", (sub['id'],))
    sub['audit_logs'] = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'submission': sub})

@app.route('/api/submissions/<id_or_code>/pdf')
@app.route('/api/student/download-submission-pdf/<id_or_code>')
def download_submission_pdf(id_or_code):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT s.*, 
           tr.email as student_email,
           t.email as teacher_email,
           e.marks_obtained, COALESCE(e.maximum_marks, ca.max_marks, 20) as maximum_marks, ca.max_marks as assessment_max_marks, e.remarks, e.evaluated_at,
           ca.is_mcq as assessment_is_mcq, ca.mcq_questions_json as assessment_mcq_questions_json,
           ca.show_marks_to_students
    FROM submissions s
    LEFT JOIN teacher_rosters tr ON s.roster_id = tr.id
    LEFT JOIN teachers t ON s.teacher_id = t.id
    LEFT JOIN evaluations e ON s.id = e.submission_id
    LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
    WHERE s.id = ? OR s.submission_id = ?
    """, (id_or_code, id_or_code))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return jsonify({'error': 'Submission not found'}), 404

    sub = dict(row)
    if not sub.get('mcq_questions_json') and sub.get('assessment_mcq_questions_json'):
        sub['mcq_questions_json'] = sub['assessment_mcq_questions_json']
    eval_data = {
        'marks_obtained': sub.get('marks_obtained'),
        'maximum_marks': sub.get('maximum_marks'),
        'remarks': sub.get('remarks'),
        'evaluated_at': sub.get('evaluated_at'),
        'evaluator_name': sub.get('teacher_name')
    } if sub.get('status') == 'Assessed' else None

    conn.close()

    # Determine whether marks should be hidden or shown on PDF:
    is_teacher_admin = ('teacher_id' in session) or ('admin_id' in session)
    
    # 1. Explicit query parameter check
    if request.args.get('show_marks') == '1':
        hide_marks = False
    elif request.args.get('show_marks') == '0':
        hide_marks = True
    elif request.args.get('for') == 'student':
        # Default protected student copy when specifically requested with ?for=student
        hide_marks = True
    elif is_teacher_admin:
        # Teachers and Admins should see evaluated marks on official records by default
        hide_marks = False
    else:
        # For students without explicit params: Respect teacher's show_marks_to_students toggle (1 = Show, 0 = Hide)
        asm_show_marks = sub.get('show_marks_to_students')
        if asm_show_marks == 0:
            hide_marks = True
        else:
            hide_marks = False

    pdf_bytes = pdf_generator.generate_assessment_pdf(sub, eval_data, hide_marks=hide_marks)
    filename = f"Internal_Assessment_{sub['submission_id']}_{sub['roll_number']}.pdf"

    is_download = request.args.get('download') == '1' or request.args.get('attachment') == '1'
    resp = send_file(
        io.BytesIO(pdf_bytes),
        mimetype='application/pdf',
        as_attachment=is_download,
        download_name=filename
    )
    if not is_download:
        resp.headers['Content-Disposition'] = f'inline; filename="{filename}"'
    resp.headers['X-Content-Type-Options'] = 'nosniff'
    return resp


# --- 2A-1. PUBLIC DIGITAL VERIFICATION (QR CODE TARGET) ---
@app.route('/verify/submission/<string:submission_id>')
@app.route('/api/verify/submission/<string:submission_id>')
def verify_submission(submission_id):
    """
    Publicly verifies authentic academic submission records via QR code.
    Accessible without login. Returns certified authenticity details.
    """
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT s.*, 
           t.name as teacher_name, t.college_name as teacher_college, t.university_name as teacher_university,
           t.designation as teacher_designation,
           r.student_name, r.roll_number, r.prn, r.class_name, r.division, r.email as student_email,
           ca.assessment_session_title, ca.assignment_topic, ca.assessment_type_name, ca.course_code, ca.course_name, ca.max_marks as assessment_max_marks,
           e.marks_obtained, e.maximum_marks as eval_max_marks, e.remarks as eval_remarks, e.evaluated_at
    FROM submissions s
    JOIN teachers t ON s.teacher_id = t.id
    LEFT JOIN teacher_rosters r ON s.roster_id = r.id
    LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
    LEFT JOIN evaluations e ON e.submission_id = s.id
    WHERE s.submission_id = ? OR s.id = ? OR UPPER(s.submission_id) = UPPER(?)
    ORDER BY s.id DESC LIMIT 1
    """, (submission_id, int(submission_id) if submission_id.isdigit() else -1, submission_id))
    row = cursor.fetchone()
    conn.close()

    if not row:
        if request.args.get('format') == 'json' or request.path.startswith('/api/'):
            return jsonify({'valid': False, 'error': 'Submission record not found or invalid QR code.'}), 404
        return render_template('index.html', verification_error='Record Not Found / Invalid Verification QR Code')

    sub_info = dict(row)
    if request.args.get('format') == 'json' or request.path.startswith('/api/'):
        return jsonify({
            'valid': True,
            'submission_id': sub_info['submission_id'],
            'student_name': sub_info['student_name'],
            'roll_number': sub_info['roll_number'],
            'prn': sub_info['prn'],
            'class_name': sub_info['class_name'],
            'division': sub_info['division'],
            'course_code': sub_info['course_code'],
            'course_name': sub_info['course_name'],
            'assessment_title': sub_info['assessment_session_title'] or sub_info['assignment_topic'] or sub_info['topic'],
            'assessment_type': sub_info['assessment_type_name'],
            'submitted_at': sub_info['submitted_at'],
            'status': sub_info['status'],
            'teacher_name': sub_info['teacher_name'],
            'college_name': sub_info['teacher_college'],
            'university_name': sub_info['teacher_university'],
            'evaluated_at': sub_info['evaluated_at'],
            'is_authentic': True
        })

    return render_template('index.html', verified_submission=sub_info)


@app.route('/verify/cie/<int:subject_id>')
@app.route('/api/verify/cie/<int:subject_id>')
def verify_cie_course(subject_id):
    """
    Publicly verifies course and CIE structure.
    """
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT ts.*, t.name as teacher_name, t.college_name as teacher_college, t.university_name as teacher_university
    FROM teacher_subjects ts
    JOIN teachers t ON ts.teacher_id = t.id
    WHERE ts.id = ?
    """, (subject_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        if request.args.get('format') == 'json' or request.path.startswith('/api/'):
            return jsonify({'valid': False, 'error': 'Course record not found.'}), 404
        return render_template('index.html', verification_error='Course Not Found')

    course_info = dict(row)
    if request.args.get('format') == 'json' or request.path.startswith('/api/'):
        return jsonify({'valid': True, 'course': course_info, 'is_authentic': True})

    return render_template('index.html', verified_course=course_info)


# --- 2A-2. 1-CLICK SEMESTER ZIP ARCHIVE EXPORT ---
@app.route('/api/teacher/courses/<int:subject_id>/export-archive-zip', methods=['GET', 'POST'])
@teacher_required
def export_course_archive_zip(subject_id):
    """
    Generates a single ZIP package containing consolidated CSV marksheet and all
    individual verified student submission PDFs for external NAAC/exam cell audit.
    """
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()

    # Verify ownership of subject
    cursor.execute("SELECT * FROM teacher_subjects WHERE id = ? AND teacher_id = ?", (subject_id, teacher['id']))
    subject = cursor.fetchone()
    if not subject:
        conn.close()
        return jsonify({'error': 'Course not found.'}), 404

    # Fetch all submissions for this subject
    cursor.execute("""
    SELECT s.*, 
           t.name as teacher_name, t.college_name as teacher_college, t.university_name as teacher_university,
           t.designation as teacher_designation,
           r.student_name, r.roll_number, r.prn, r.class_name, r.division, r.email as student_email,
           ca.assessment_session_title, ca.assignment_topic, ca.assessment_type_name, ca.course_code, ca.course_name,
           ca.max_marks as assessment_max_marks, ca.mcq_questions_json as assessment_mcq_questions_json,
           e.marks_obtained, e.maximum_marks, e.remarks, e.evaluated_at
    FROM submissions s
    JOIN created_assessments ca ON s.created_assessment_id = ca.id
    JOIN teachers t ON s.teacher_id = t.id
    LEFT JOIN teacher_rosters r ON s.roster_id = r.id
    LEFT JOIN evaluations e ON e.submission_id = s.id
    WHERE ca.subject_id = ? AND s.teacher_id = ?
    ORDER BY r.roll_number ASC, s.id ASC
    """, (subject_id, teacher['id']))
    subs = [dict(r) for r in cursor.fetchall()]

    conn.close()

    # Build ZIP Archive in memory
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        # 1. Consolidated Marksheet CSV
        csv_buffer = io.StringIO()
        csv_writer = csv.writer(csv_buffer)
        csv_writer.writerow([
            "Continuous Internal Evaluation (CIEMS) - Semester Consolidated Marksheet",
            f"Course: {subject['course_code']} - {subject['course_name']}",
            f"Class: {subject['class_name']} (Semester {subject['semester']})",
            f"Academic Year: {subject['academic_year']}",
            f"Faculty: {teacher['name']} ({teacher['college_name']})"
        ])
        csv_writer.writerow([])
        csv_writer.writerow(["Roll No", "PRN", "Student Name", "Division", "Assessment / Topic", "Type", "Submission Status", "Marks Obtained", "Max Marks", "Evaluated Date"])

        for sub in subs:
            csv_writer.writerow([
                sub.get('roll_number', ''),
                sub.get('prn', ''),
                sub.get('student_name', ''),
                sub.get('division', 'A'),
                sub.get('assessment_session_title') or sub.get('assignment_topic') or sub.get('topic', ''),
                sub.get('assessment_type_name', ''),
                sub.get('status', 'Submitted'),
                sub.get('marks_obtained', 'Pending'),
                sub.get('maximum_marks') or sub.get('assessment_max_marks', 20),
                sub.get('evaluated_at', sub.get('submitted_at', ''))
            ])

        zip_file.writestr(f"00_Consolidated_Marksheet_{subject['course_code']}.csv", csv_buffer.getvalue().encode('utf-8-sig'))

        # 2. Individual Assessment PDFs
        for idx, sub in enumerate(subs):
            try:
                eval_data = {
                    'marks_obtained': sub.get('marks_obtained'),
                    'maximum_marks': sub.get('maximum_marks') or sub.get('assessment_max_marks', 20),
                    'remarks': sub.get('remarks'),
                    'evaluated_at': sub.get('evaluated_at'),
                    'evaluator_name': sub.get('teacher_name')
                } if sub.get('status') == 'Assessed' or sub.get('marks_obtained') is not None else None

                pdf_data = pdf_generator.generate_assessment_pdf(sub, eval_data=eval_data, hide_marks=False)
                clean_name = re.sub(r'[^a-zA-Z0-9_-]', '_', str(sub.get('student_name', 'Student')))[:30]
                roll = str(sub.get('roll_number', idx + 1)).zfill(3)
                sub_id_tag = sub.get('submission_id') or str(sub.get('id', idx + 1))
                pdf_filename = f"Individual_PDFs/Roll_{roll}_{clean_name}_{sub_id_tag}.pdf"
                zip_file.writestr(pdf_filename, pdf_data)
            except Exception:
                pass

    zip_buffer.seek(0)
    safe_course_code = re.sub(r'[^a-zA-Z0-9_-]', '_', subject['course_code'])
    archive_name = f"CIEMS_Archive_{safe_course_code}_{subject['academic_year'].replace('–', '_').replace('-', '_')}.zip"

    return send_file(
        zip_buffer,
        mimetype='application/zip',
        as_attachment=True,
        download_name=archive_name
    )



# --- 2B. EDIT SINGLE STUDENT IN ROSTER ---
@app.route('/api/teacher/student/<int:roster_id>', methods=['GET', 'PUT', 'DELETE'])
@teacher_required
def manage_single_student(roster_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("SELECT * FROM teacher_rosters WHERE id = ? AND teacher_id = ?", (roster_id, teacher['id']))
        row = cursor.fetchone()
        conn.close()
        if not row:
            return jsonify({'error': 'Student not found.'}), 404
        return jsonify({'student': dict(row)})

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM submissions WHERE roster_id = ? AND teacher_id = ?", (roster_id, teacher['id']))
        cursor.execute("DELETE FROM student_connections WHERE roster_id = ? AND teacher_id = ?", (roster_id, teacher['id']))
        cursor.execute("DELETE FROM teacher_rosters WHERE id = ? AND teacher_id = ?", (roster_id, teacher['id']))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Student removed from roster.'})

    # PUT (Update)
    data = request.json or {}
    cursor.execute("SELECT * FROM teacher_rosters WHERE id = ? AND teacher_id = ?", (roster_id, teacher['id']))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        return jsonify({'error': 'Student not found in your roster.'}), 404

    academic_year = str(data.get('academic_year') or existing['academic_year'] or '2026–27').strip()
    class_name = str(data.get('class_name') or existing['class_name'] or '').strip()
    roll_number = str(data.get('roll_number') or data.get('roll_no') or existing['roll_number'] or '').strip()
    prn = str(data.get('prn') or existing['prn'] or '').strip()
    student_name = str(data.get('student_name') or data.get('name') or existing['student_name'] or '').strip()
    gender = str(data.get('gender') or existing['gender'] or 'Male')
    division = str(data.get('division') or existing['division'] or 'A').strip()
    email = str(data.get('email') or existing['email'] or '').strip()
    mobile = str(data.get('mobile') or existing['mobile'] or '').strip()
    is_repeater = 1 if data.get('is_repeater', existing['is_repeater']) else 0

    if not (class_name and roll_number and prn and student_name):
        conn.close()
        return jsonify({'error': 'Class, Roll Number, PRN, and Student Name are required.'}), 400

    try:
        cursor.execute("""
        UPDATE teacher_rosters
        SET academic_year = ?, class_name = ?, roll_number = ?, prn = ?,
            student_name = ?, gender = ?, division = ?, email = ?, mobile = ?, is_repeater = ?
        WHERE id = ? AND teacher_id = ?
        """, (academic_year, class_name, roll_number, prn, student_name, gender, division, email, mobile, is_repeater, roster_id, teacher['id']))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Student updated successfully!'})
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 400

# --- 3B. GET, EDIT & DELETE CREATED ASSESSMENT SESSION ---
@app.route('/api/teacher/assessments/<int:assessment_id>', methods=['GET', 'PUT', 'DELETE'])
@teacher_required
def manage_single_created_assessment(assessment_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("""
        SELECT c.*, COUNT(s.id) as submissions_count
        FROM created_assessments c
        LEFT JOIN submissions s ON c.id = s.created_assessment_id
        WHERE c.id = ? AND c.teacher_id = ?
        GROUP BY c.id
        """, (assessment_id, teacher['id']))
        row = cursor.fetchone()
        conn.close()
        if not row:
            return jsonify({'error': 'Assessment session not found.'}), 404
        return jsonify({'assessment': dict(row)})

    elif request.method == 'PUT':
        data = request.json or {}
        session_title = str(data.get('assessment_session_title') or data.get('title') or '').strip()
        topic = str(data.get('assignment_topic') or data.get('topic_question') or data.get('topic') or '').strip()
        deadline = str(data.get('submission_deadline') or data.get('deadline') or '').strip()
        allow_late = 1 if data.get('allow_late', data.get('allow_late_submission', True)) else 0
        is_group = 1 if data.get('is_group', data.get('is_group_assessment', False)) else 0
        status = str(data.get('status') or 'active').strip()

        is_indiv = 1 if data.get('is_individual_topics') else 0
        stopics = data.get('student_topics') or {}
        if isinstance(stopics, str):
            try:
                stopics = json.loads(stopics)
            except:
                stopics = {}
        stopics_json = json.dumps(stopics, ensure_ascii=False)

        sgroups = data.get('student_groups') or {}
        if isinstance(sgroups, str):
            try:
                sgroups = json.loads(sgroups)
            except:
                sgroups = {}
        sgroups_json = json.dumps(sgroups, ensure_ascii=False)

        study_materials = data.get('study_materials') or []
        if isinstance(study_materials, str):
            try:
                study_materials = json.loads(study_materials)
            except:
                study_materials = []
        study_materials_json = json.dumps(study_materials, ensure_ascii=False)

        target_students = data.get('target_students') or data.get('target_students_json')
        if target_students is not None:
            if isinstance(target_students, str):
                try:
                    target_students = json.loads(target_students)
                except:
                    target_students = []
            target_students_json = json.dumps(target_students, ensure_ascii=False)
        else:
            target_students_json = None

        meeting_url = str(data.get('meeting_url') or '').strip()
        meeting_time = str(data.get('meeting_time') or '').strip()

        if not (session_title and topic):
            conn.close()
            return jsonify({'error': 'Session Title and Topic are required.'}), 400

        max_marks = data.get('max_marks')
        if max_marks is not None:
            try:
                max_marks_val = float(max_marks)
            except:
                max_marks_val = None
        else:
            max_marks_val = None

        show_marks = 1 if data.get('show_marks_to_students', 1) else 0
        duration_minutes = int(data.get('duration_minutes', 0))

        if target_students_json is not None and max_marks_val is not None:
            cursor.execute("""
            UPDATE created_assessments
            SET assessment_session_title = ?, assignment_topic = ?, submission_deadline = ?,
                allow_late = ?, is_group = ?, status = ?, is_individual_topics = ?, student_topics_json = ?, student_groups_json = ?, study_materials_json = ?,
                target_students_json = ?, max_marks = ?, meeting_url = ?, meeting_time = ?, show_marks_to_students = ?, duration_minutes = ?
            WHERE id = ? AND teacher_id = ?
            """, (session_title, topic, deadline, allow_late, is_group, status, is_indiv, stopics_json, sgroups_json, study_materials_json, target_students_json, max_marks_val, meeting_url, meeting_time, show_marks, duration_minutes, assessment_id, teacher['id']))
        elif target_students_json is not None:
            cursor.execute("""
            UPDATE created_assessments
            SET assessment_session_title = ?, assignment_topic = ?, submission_deadline = ?,
                allow_late = ?, is_group = ?, status = ?, is_individual_topics = ?, student_topics_json = ?, student_groups_json = ?, study_materials_json = ?,
                target_students_json = ?, meeting_url = ?, meeting_time = ?, show_marks_to_students = ?, duration_minutes = ?
            WHERE id = ? AND teacher_id = ?
            """, (session_title, topic, deadline, allow_late, is_group, status, is_indiv, stopics_json, sgroups_json, study_materials_json, target_students_json, meeting_url, meeting_time, show_marks, duration_minutes, assessment_id, teacher['id']))
        elif max_marks_val is not None:
            cursor.execute("""
            UPDATE created_assessments
            SET assessment_session_title = ?, assignment_topic = ?, submission_deadline = ?,
                allow_late = ?, is_group = ?, status = ?, is_individual_topics = ?, student_topics_json = ?, student_groups_json = ?, study_materials_json = ?,
                max_marks = ?, meeting_url = ?, meeting_time = ?, show_marks_to_students = ?, duration_minutes = ?
            WHERE id = ? AND teacher_id = ?
            """, (session_title, topic, deadline, allow_late, is_group, status, is_indiv, stopics_json, sgroups_json, study_materials_json, max_marks_val, meeting_url, meeting_time, show_marks, duration_minutes, assessment_id, teacher['id']))
        else:
            cursor.execute("""
            UPDATE created_assessments
            SET assessment_session_title = ?, assignment_topic = ?, submission_deadline = ?,
                allow_late = ?, is_group = ?, status = ?, is_individual_topics = ?, student_topics_json = ?, student_groups_json = ?, study_materials_json = ?,
                meeting_url = ?, meeting_time = ?, show_marks_to_students = ?, duration_minutes = ?
            WHERE id = ? AND teacher_id = ?
            """, (session_title, topic, deadline, allow_late, is_group, status, is_indiv, stopics_json, sgroups_json, study_materials_json, meeting_url, meeting_time, show_marks, duration_minutes, assessment_id, teacher['id']))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Assessment session updated successfully!'})

    elif request.method == 'DELETE':
        cursor.execute("SELECT id FROM submissions WHERE created_assessment_id = ? AND teacher_id = ?", (assessment_id, teacher['id']))
        sub_ids = [row['id'] for row in cursor.fetchall()]
        if sub_ids:
            sub_placeholders = ','.join('?' for _ in sub_ids)
            cursor.execute(f"DELETE FROM evaluations WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM audit_logs WHERE submission_id IN ({sub_placeholders})", sub_ids)
            cursor.execute(f"DELETE FROM submissions WHERE id IN ({sub_placeholders})", sub_ids)
        cursor.execute("DELETE FROM created_assessments WHERE id = ? AND teacher_id = ?", (assessment_id, teacher['id']))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Assessment session deleted successfully!'})

# --- 4B. DELETE STUDENT SUBMISSION ---
@app.route('/api/teacher/submissions/<int:submission_id>', methods=['DELETE'])
@teacher_required
def delete_submission(submission_id):
    teacher = get_current_teacher()
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM evaluations WHERE submission_id = ?", (submission_id,))
    cursor.execute("DELETE FROM audit_logs WHERE submission_id = ?", (submission_id,))
    cursor.execute("DELETE FROM submissions WHERE id = ? AND teacher_id = ?", (submission_id, teacher['id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Submission record deleted successfully.'})

# --- 1B. ADMIN: GET, EDIT, DELETE TEACHER ---
@app.route('/api/admin/teachers/<int:teacher_id>', methods=['GET', 'PUT', 'DELETE'])
@admin_required
def admin_manage_teacher(teacher_id):
    conn = database.get_db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("SELECT * FROM teachers WHERE id = ?", (teacher_id,))
        row = cursor.fetchone()
        conn.close()
        if not row:
            return jsonify({'error': 'Teacher not found.'}), 404
        return jsonify({'teacher': dict(row)})

    elif request.method == 'PUT':
        data = request.json or {}
        name = data.get('name', '').strip()
        teacher_code = data.get('teacher_code', '').strip()
        designation = data.get('designation', '').strip()
        college_name = data.get('college_name', '').strip()
        university_name = data.get('university_name', '').strip()
        faculty_stream = data.get('faculty_stream', '').strip()
        subject_name = data.get('subject_name', '').strip()
        email = data.get('email', '').strip()
        mobile = data.get('mobile', '').strip()
        status = data.get('status', 'approved').strip()
        new_password = data.get('new_password', '').strip() or data.get('password', '').strip()

        if not (name and email and mobile):
            conn.close()
            return jsonify({'error': 'Name, Email, and Mobile are required.'}), 400

        # Check if email is unique for other teachers
        cursor.execute("SELECT id FROM teachers WHERE LOWER(email) = ? AND id != ?", (email.lower(), teacher_id))
        if cursor.fetchone():
            conn.close()
            return jsonify({'error': 'This email address is already assigned to another teacher.'}), 400

        # If teacher_code is provided, check uniqueness
        if teacher_code:
            cursor.execute("SELECT id FROM teachers WHERE LOWER(teacher_code) = ? AND id != ?", (teacher_code.lower(), teacher_id))
            if cursor.fetchone():
                conn.close()
                return jsonify({'error': 'This Teacher Code is already in use.'}), 400

        validity_end = data.get('validity_end', '').strip()
        validity_days = data.get('validity_days')
        if validity_days:
            try:
                days = int(validity_days)
                base = datetime.datetime.now().date()
                if validity_end:
                    try:
                        base = datetime.datetime.strptime(validity_end[:10], '%Y-%m-%d').date()
                    except Exception:
                        pass
                validity_end = (base + datetime.timedelta(days=days)).strftime('%Y-%m-%d')
            except Exception:
                pass

        acad_yr = None
        if validity_end and len(validity_end) >= 10:
            try:
                y = int(validity_end[:4])
                m = int(validity_end[5:7])
                s_yr = y if m >= 6 else y - 1
                acad_yr = f"{s_yr}-{s_yr+1}"
            except Exception:
                pass

        if new_password:
            pwd_hash = database.hash_password(new_password)
            if validity_end:
                cursor.execute("""
                UPDATE teachers
                SET teacher_code = ?, name = ?, designation = ?, college_name = ?, university_name = ?,
                    faculty_stream = ?, subject_name = ?, email = ?, mobile = ?, status = ?,
                    password_hash = ?, temp_plain_password = ?, validity_end = ?, academic_year = COALESCE(?, academic_year)
                WHERE id = ?
                """, (teacher_code or None, name, designation, college_name, university_name, faculty_stream, subject_name, email, mobile, status, pwd_hash, new_password, validity_end, acad_yr, teacher_id))
            else:
                cursor.execute("""
                UPDATE teachers
                SET teacher_code = ?, name = ?, designation = ?, college_name = ?, university_name = ?,
                    faculty_stream = ?, subject_name = ?, email = ?, mobile = ?, status = ?,
                    password_hash = ?, temp_plain_password = ?
                WHERE id = ?
                """, (teacher_code or None, name, designation, college_name, university_name, faculty_stream, subject_name, email, mobile, status, pwd_hash, new_password, teacher_id))
        else:
            if validity_end:
                cursor.execute("""
                UPDATE teachers
                SET teacher_code = ?, name = ?, designation = ?, college_name = ?, university_name = ?,
                    faculty_stream = ?, subject_name = ?, email = ?, mobile = ?, status = ?,
                    validity_end = ?, academic_year = COALESCE(?, academic_year)
                WHERE id = ?
                """, (teacher_code or None, name, designation, college_name, university_name, faculty_stream, subject_name, email, mobile, status, validity_end, acad_yr, teacher_id))
            else:
                cursor.execute("""
                UPDATE teachers
                SET teacher_code = ?, name = ?, designation = ?, college_name = ?, university_name = ?,
                    faculty_stream = ?, subject_name = ?, email = ?, mobile = ?, status = ?
                WHERE id = ?
                """, (teacher_code or None, name, designation, college_name, university_name, faculty_stream, subject_name, email, mobile, status, teacher_id))

        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Teacher profile and credentials updated successfully!'})

    elif request.method == 'DELETE':
        conn = None
        try:
            conn = database.get_db_connection()
            cursor = conn.cursor()
            cursor.execute("PRAGMA foreign_keys = OFF")

            delete_teachers_and_dependents(cursor, [teacher_id])
            conn.commit()

            global _admin_stats_cache
            _admin_stats_cache['data'] = None

            return jsonify({'success': True, 'message': 'Teacher account and associated records deleted.'})
        except Exception as e:
            if conn:
                conn.rollback()
            return jsonify({'error': f'Failed to delete teacher: {str(e)}'}), 500
        finally:
            if conn:
                conn.close()

@app.route('/api/admin/teachers/<int:teacher_id>/reset-password', methods=['POST'])
@admin_required
def admin_reset_teacher_password(teacher_id):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE id = ?", (teacher_id,))
    t = cursor.fetchone()
    if not t:
        conn.close()
        return jsonify({'error': 'Teacher not found.'}), 404
    data = request.json or {}
    new_password = (data.get('new_password') or '').strip()
    if not new_password:
        new_password = database.generate_random_password(8)
    
    pwd_hash = database.hash_password(new_password)
    cursor.execute("UPDATE teachers SET password_hash = ?, temp_plain_password = ? WHERE id = ?", (pwd_hash, new_password, teacher_id))
    conn.commit()
    conn.close()
    return jsonify({
        'success': True,
        'message': f'Password for {t["name"]} updated successfully!',
        'teacher_code': t['teacher_code'],
        'email': t['email'],
        'new_password': new_password
    })

@app.route('/api/admin/teachers/<int:teacher_id>/validity', methods=['POST', 'PUT'])
@admin_required
def admin_update_teacher_validity(teacher_id):
    data = request.json or {}
    val_end = data.get('validity_end')
    val_days = data.get('validity_days')
    academic_year = data.get('academic_year')
    
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE id = ?", (teacher_id,))
    t = cursor.fetchone()
    if not t:
        conn.close()
        return jsonify({'error': 'Teacher not found.'}), 404
        
    t_dict = dict(t)
    if val_days:
        try:
            val_days = int(val_days)
            new_end = datetime.datetime.now().date() + datetime.timedelta(days=val_days)
            val_end = new_end.strftime('%Y-%m-%d')
            start_yr = new_end.year if new_end.month >= 6 else new_end.year - 1
            academic_year = f"{start_yr}–{str(start_yr+1)[-2:]}"
        except:
            pass
            
    if not val_end:
        next_acad, next_start, next_end = database.get_next_academic_year(t_dict.get('validity_end'))
        val_end = next_end
        if not academic_year:
            academic_year = next_acad
            
    if not academic_year:
        try:
            end_d = datetime.datetime.strptime(val_end[:10], '%Y-%m-%d').date()
            start_yr = end_d.year if end_d.month >= 6 else end_d.year - 1
            academic_year = f"{start_yr}–{str(start_yr+1)[-2:]}"
        except:
            academic_year = t_dict.get('academic_year', '2026–27')
            
    cursor.execute("""
    UPDATE teachers 
    SET validity_end = ?, academic_year = ?, extension_requested = 0 
    WHERE id = ?
    """, (val_end, academic_year, teacher_id))
    conn.commit()
    conn.close()
    
    return jsonify({
        'success': True,
        'message': f'Validity for {t_dict["name"]} updated to {val_end} ({academic_year}).',
        'validity_end': val_end,
        'academic_year': academic_year
    })

# ----------------- Admin Course & CIE Master Mapping Management -----------------
@app.route('/api/admin/master-mapping', methods=['GET'])
@admin_required
def admin_get_master_mapping():
    try:
        data = database.get_all_master_mapping_data()
        return jsonify({
            'success': True,
            'data': data
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/admin/master-stream/add', methods=['POST'])
@admin_required
def admin_add_master_stream():
    req = request.get_json() or {}
    stream_name = str(req.get('stream_name') or '').strip()
    display_order = int(req.get('display_order') or 0)
    
    if not stream_name:
        return jsonify({'success': False, 'error': 'विद्याशाखेचे नाव आवश्यक आहे (Stream name is required).'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id FROM master_streams WHERE stream_name = ?", (stream_name,))
        if cursor.fetchone():
            return jsonify({'success': False, 'error': 'ही विद्याशाखा आधीच उपलब्ध आहे (Stream already exists).'}), 400
            
        cursor.execute("INSERT INTO master_streams (stream_name, display_order, is_active) VALUES (?, ?, 1)",
                       (stream_name, display_order))
        conn.commit()
        return jsonify({'success': True, 'message': f'विद्याशाखा "{stream_name}" यशस्वीरित्या जोडली गेली.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-stream/edit', methods=['POST'])
@admin_required
def admin_edit_master_stream():
    global _admin_stats_cache
    req = request.get_json() or {}
    stream_id = req.get('stream_id') or req.get('id')
    stream_name = str(req.get('stream_name') or '').strip()
    display_order = int(req.get('display_order') or 0)
    is_active = 1 if req.get('is_active', True) else 0
    
    if not stream_id or not stream_name:
        return jsonify({'success': False, 'error': 'वैध विद्याशाखा तपशील आवश्यक आहेत (Valid stream details required).'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT stream_name FROM master_streams WHERE id = ?", (stream_id,))
        row = cursor.fetchone()
        if not row:
            return jsonify({'success': False, 'error': 'विद्याशाखा आढळली नाही.'}), 404
            
        old_name = row['stream_name']
        cursor.execute("UPDATE master_streams SET stream_name = ?, display_order = ?, is_active = ? WHERE id = ?",
                       (stream_name, display_order, is_active, stream_id))
                       
        if old_name != stream_name:
            cursor.execute("UPDATE master_subjects SET stream_name = ? WHERE stream_id = ? OR stream_name = ?",
                           (stream_name, stream_id, old_name))
            cursor.execute("UPDATE master_classes SET stream_name = ? WHERE stream_id = ? OR stream_name = ?",
                           (stream_name, stream_id, old_name))
                           
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'विद्याशाखा "{stream_name}" अद्ययावत केली गेली.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-stream/delete', methods=['POST'])
@admin_required
def admin_delete_master_stream():
    global _admin_stats_cache
    req = request.get_json() or {}
    stream_id = req.get('stream_id') or req.get('id')
    if not stream_id:
        return jsonify({'success': False, 'error': 'Stream ID is required.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT stream_name FROM master_streams WHERE id = ?", (stream_id,))
        row = cursor.fetchone()
        if not row:
            return jsonify({'success': False, 'error': 'विद्याशाखा आढळली नाही.'}), 404
            
        stream_name = row['stream_name']
        cursor.execute("DELETE FROM master_subjects WHERE stream_id = ? OR stream_name = ?", (stream_id, stream_name))
        cursor.execute("DELETE FROM master_classes WHERE stream_id = ? OR stream_name = ?", (stream_id, stream_name))
        cursor.execute("DELETE FROM master_streams WHERE id = ?", (stream_id,))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'विद्याशाखा "{stream_name}" व संबंधित सर्व विषय व वर्ग हटवले गेले.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-subject/add', methods=['POST'])
@admin_required
def admin_add_master_subject():
    global _admin_stats_cache
    req = request.get_json() or {}
    stream_id = req.get('stream_id')
    stream_name = str(req.get('stream_name') or '').strip()
    subject_name = str(req.get('subject_name') or '').strip()
    display_order = int(req.get('display_order') or 0)
    
    if not subject_name:
        return jsonify({'success': False, 'error': 'विषयाचे नाव आवश्यक आहे (Subject name is required).'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        if stream_id and not stream_name:
            cursor.execute("SELECT stream_name FROM master_streams WHERE id = ?", (stream_id,))
            r = cursor.fetchone()
            if r:
                stream_name = r['stream_name']
        elif stream_name and not stream_id:
            cursor.execute("SELECT id FROM master_streams WHERE stream_name = ?", (stream_name,))
            r = cursor.fetchone()
            if r:
                stream_id = r['id']
                
        if not stream_name:
            return jsonify({'success': False, 'error': 'विद्याशाखा निवडणे आवश्यक आहे (Stream is required).'}), 400
            
        cursor.execute("INSERT INTO master_subjects (stream_id, stream_name, subject_name, display_order, is_active) VALUES (?, ?, ?, ?, 1)",
                       (stream_id, stream_name, subject_name, display_order))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'विषय "{subject_name}" विद्याशाखेत यशस्वीरित्या जोडला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-subject/edit', methods=['POST'])
@admin_required
def admin_edit_master_subject():
    global _admin_stats_cache
    req = request.get_json() or {}
    subject_id = req.get('subject_id') or req.get('id')
    stream_id = req.get('stream_id')
    stream_name = str(req.get('stream_name') or '').strip()
    subject_name = str(req.get('subject_name') or '').strip()
    display_order = int(req.get('display_order') or 0)
    is_active = 1 if req.get('is_active', True) else 0
    
    if not subject_id or not subject_name:
        return jsonify({'success': False, 'error': 'विषय तपशील आवश्यक आहेत.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        if stream_id and not stream_name:
            cursor.execute("SELECT stream_name FROM master_streams WHERE id = ?", (stream_id,))
            r = cursor.fetchone()
            if r:
                stream_name = r['stream_name']
        elif stream_name and not stream_id:
            cursor.execute("SELECT id FROM master_streams WHERE stream_name = ?", (stream_name,))
            r = cursor.fetchone()
            if r:
                stream_id = r['id']
                
        cursor.execute("""
        UPDATE master_subjects 
        SET stream_id = COALESCE(?, stream_id),
            stream_name = COALESCE(?, stream_name),
            subject_name = ?,
            display_order = ?,
            is_active = ?
        WHERE id = ?
        """, (stream_id, stream_name, subject_name, display_order, is_active, subject_id))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'विषय "{subject_name}" अद्ययावत केला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-subject/delete', methods=['POST'])
@admin_required
def admin_delete_master_subject():
    global _admin_stats_cache
    req = request.get_json() or {}
    subject_id = req.get('subject_id') or req.get('id')
    if not subject_id:
        return jsonify({'success': False, 'error': 'Subject ID is required.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM master_subjects WHERE id = ?", (subject_id,))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': 'विषय यशस्वीरित्या हटवला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-class/add', methods=['POST'])
@admin_required
def admin_add_master_class():
    global _admin_stats_cache
    req = request.get_json() or {}
    stream_id = req.get('stream_id')
    stream_name = str(req.get('stream_name') or '').strip()
    class_name = str(req.get('class_name') or '').strip()
    display_order = int(req.get('display_order') or 0)
    
    if not class_name:
        return jsonify({'success': False, 'error': 'वर्गाचे नाव आवश्यक आहे (Class name is required).'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        if stream_id and not stream_name:
            cursor.execute("SELECT stream_name FROM master_streams WHERE id = ?", (stream_id,))
            r = cursor.fetchone()
            if r:
                stream_name = r['stream_name']
        elif stream_name and not stream_id:
            cursor.execute("SELECT id FROM master_streams WHERE stream_name = ?", (stream_name,))
            r = cursor.fetchone()
            if r:
                stream_id = r['id']
                
        if not stream_name:
            return jsonify({'success': False, 'error': 'विद्याशाखा निवडणे आवश्यक आहे.'}), 400
            
        cursor.execute("INSERT INTO master_classes (stream_id, stream_name, class_name, display_order, is_active) VALUES (?, ?, ?, ?, 1)",
                       (stream_id, stream_name, class_name, display_order))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'वर्ग "{class_name}" यशस्वीरित्या जोडला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-class/edit', methods=['POST'])
@admin_required
def admin_edit_master_class():
    global _admin_stats_cache
    req = request.get_json() or {}
    class_id = req.get('class_id') or req.get('id')
    stream_id = req.get('stream_id')
    stream_name = str(req.get('stream_name') or '').strip()
    class_name = str(req.get('class_name') or '').strip()
    display_order = int(req.get('display_order') or 0)
    is_active = 1 if req.get('is_active', True) else 0
    
    if not class_id or not class_name:
        return jsonify({'success': False, 'error': 'वर्ग तपशील आवश्यक आहेत.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        if stream_id and not stream_name:
            cursor.execute("SELECT stream_name FROM master_streams WHERE id = ?", (stream_id,))
            r = cursor.fetchone()
            if r:
                stream_name = r['stream_name']
        elif stream_name and not stream_id:
            cursor.execute("SELECT id FROM master_streams WHERE stream_name = ?", (stream_name,))
            r = cursor.fetchone()
            if r:
                stream_id = r['id']
                
        cursor.execute("""
        UPDATE master_classes 
        SET stream_id = COALESCE(?, stream_id),
            stream_name = COALESCE(?, stream_name),
            class_name = ?,
            display_order = ?,
            is_active = ?
        WHERE id = ?
        """, (stream_id, stream_name, class_name, display_order, is_active, class_id))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'वर्ग "{class_name}" अद्ययावत केला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-class/delete', methods=['POST'])
@admin_required
def admin_delete_master_class():
    global _admin_stats_cache
    req = request.get_json() or {}
    class_id = req.get('class_id') or req.get('id')
    if not class_id:
        return jsonify({'success': False, 'error': 'Class ID is required.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM master_classes WHERE id = ?", (class_id,))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': 'वर्ग यशस्वीरित्या हटवला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-assessment-type/add', methods=['POST'])
@admin_required
def admin_add_master_assessment_type():
    global _admin_stats_cache
    req = request.get_json() or {}
    name = str(req.get('name') or '').strip()
    description = str(req.get('description') or '').strip()
    is_group = 1 if req.get('is_group') else 0
    fields_schema_json = req.get('fields_schema_json')
    if not fields_schema_json:
        fields_schema_json = json.dumps([
            {"id": "title", "label": f"{name} Title", "type": "text", "required": True},
            {"id": "details", "label": "Details / Summary", "type": "textarea", "required": True}
        ])
    elif isinstance(fields_schema_json, (list, dict)):
        fields_schema_json = json.dumps(fields_schema_json)
        
    if not name:
        return jsonify({'success': False, 'error': 'मूल्यमापन घटकाचे नाव आवश्यक आहे.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id FROM assessment_types WHERE name = ?", (name,))
        if cursor.fetchone():
            return jsonify({'success': False, 'error': 'हा मूल्यमापन घटक आधीच अस्तित्वात आहे.'}), 400
            
        cursor.execute("INSERT INTO assessment_types (name, description, is_group, fields_schema_json, is_active) VALUES (?, ?, ?, ?, 1)",
                       (name, description, is_group, fields_schema_json))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'मूल्यमापन घटक "{name}" जोडला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-assessment-type/edit', methods=['POST'])
@admin_required
def admin_edit_master_assessment_type():
    global _admin_stats_cache
    req = request.get_json() or {}
    type_id = req.get('id') or req.get('type_id')
    name = str(req.get('name') or '').strip()
    description = str(req.get('description') or '').strip()
    is_group = 1 if req.get('is_group') else 0
    is_active = 1 if req.get('is_active', True) else 0
    
    if not type_id or not name:
        return jsonify({'success': False, 'error': 'मूल्यमापन घटक तपशील आवश्यक आहेत.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("UPDATE assessment_types SET name = ?, description = ?, is_group = ?, is_active = ? WHERE id = ?",
                       (name, description, is_group, is_active, type_id))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': f'मूल्यमापन घटक "{name}" अद्ययावत केला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-assessment-type/delete', methods=['POST'])
@admin_required
def admin_delete_master_assessment_type():
    global _admin_stats_cache
    req = request.get_json() or {}
    type_id = req.get('id') or req.get('type_id')
    if not type_id:
        return jsonify({'success': False, 'error': 'Type ID is required.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM assessment_types WHERE id = ?", (type_id,))
        conn.commit()
        _admin_stats_cache['data'] = None
        return jsonify({'success': True, 'message': 'मूल्यमापन घटक हटवला गेला.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/admin/master-mapping/reset', methods=['POST'])
@admin_required
def admin_reset_master_mapping():
    try:
        database.reset_master_mapping_to_defaults()
        return jsonify({'success': True, 'message': 'कोर्स व CIE मॅपिंग डीफॉल्ट मानकांवर पूर्ववत (Reset) करण्यात आले.'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# =========================================================================
# ADMIN ANNOUNCEMENTS & OFFICIAL NOTICES (शिक्षकांसाठी प्रशासकीय सूचना)
# =========================================================================

@app.route('/api/admin/announcements', methods=['GET'])
@admin_required
def admin_get_announcements():
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT * FROM admin_announcements 
    ORDER BY id DESC
    """)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'success': True, 'announcements': rows})

@app.route('/api/admin/announcements/add', methods=['POST'])
@admin_required
def admin_add_announcement():
    data = request.json or {}
    title = str(data.get('title') or '').strip()
    content = str(data.get('content') or '').strip()
    priority = str(data.get('priority') or 'NORMAL').strip().upper()
    badge_type = str(data.get('badge_type') or 'OFFICIAL').strip().upper()
    reference_url = str(data.get('reference_url') or '').strip()

    if not title:
        return jsonify({'success': False, 'error': 'Title is required (सूचना शीर्षक आवश्यक आहे).'}), 400
    if not content:
        return jsonify({'success': False, 'error': 'Content is required (सूचनेचा तपशील आवश्यक आहे).'}), 400

    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        INSERT INTO admin_announcements (title, content, priority, badge_type, reference_url, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 1, ?, ?)
        """, (title, content, priority, badge_type, reference_url, now_str, now_str))
        conn.commit()
        ann_id = cursor.lastrowid
        return jsonify({'success': True, 'id': ann_id, 'message': 'Admin announcement created successfully (प्रशासकीय सूचना यशस्वीरित्या जोडली गेली).'})
    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/admin/announcements/edit', methods=['POST'])
@admin_required
def admin_edit_announcement():
    data = request.json or {}
    ann_id = data.get('id')
    title = str(data.get('title') or '').strip()
    content = str(data.get('content') or '').strip()
    priority = str(data.get('priority') or 'NORMAL').strip().upper()
    badge_type = str(data.get('badge_type') or 'OFFICIAL').strip().upper()
    reference_url = str(data.get('reference_url') or '').strip()
    is_active = 1 if data.get('is_active', 1) in (1, '1', True, 'true') else 0

    if not ann_id:
        return jsonify({'success': False, 'error': 'Announcement ID is required.'}), 400
    if not title:
        return jsonify({'success': False, 'error': 'Title is required (सूचना शीर्षक आवश्यक आहे).'}), 400
    if not content:
        return jsonify({'success': False, 'error': 'Content is required (सूचनेचा तपशील आवश्यक आहे).'}), 400

    now_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        UPDATE admin_announcements 
        SET title = ?, content = ?, priority = ?, badge_type = ?, reference_url = ?, is_active = ?, updated_at = ?
        WHERE id = ?
        """, (title, content, priority, badge_type, reference_url, is_active, now_str, ann_id))
        conn.commit()
        return jsonify({'success': True, 'message': 'Admin announcement updated successfully (प्रशासकीय सूचना यशस्वीरित्या अद्ययावत केली गेली).'})
    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/admin/announcements/delete', methods=['POST'])
@admin_required
def admin_delete_announcement():
    data = request.json or {}
    ann_id = data.get('id')
    if not ann_id:
        return jsonify({'success': False, 'error': 'Announcement ID is required.'}), 400

    conn = database.get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM admin_announcements WHERE id = ?", (ann_id,))
        conn.commit()
        return jsonify({'success': True, 'message': 'Announcement deleted successfully (सूचना यशस्वीरित्या हटवली गेली).'})
    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/teacher/admin-announcements', methods=['GET'])
@teacher_required
def teacher_get_admin_announcements():
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT id, title, content, priority, badge_type, reference_url, created_at, updated_at
    FROM admin_announcements
    WHERE is_active = 1
    ORDER BY id DESC
    """)
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return jsonify({'success': True, 'announcements': rows})

@app.route('/api/student/assessments', methods=['GET'])
def student_assessments_list():
    teacher_code = re.sub(r'[^A-Z0-9\/-]', '', str(request.args.get('teacher_code') or '').strip().upper())
    prn = str(request.args.get('prn') or '').strip()
    
    if not teacher_code:
        return jsonify({'error': 'Teacher Code is required.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE UPPER(teacher_code) = UPPER(?) AND status = 'approved'", (teacher_code,))
    teacher = cursor.fetchone()
    if not teacher:
        conn.close()
        return jsonify({'error': 'Teacher not found.'}), 404
        
    if prn:
        cursor.execute("SELECT class_name FROM teacher_rosters WHERE teacher_id = ? AND LOWER(TRIM(prn)) = LOWER(TRIM(?))", (teacher['id'], prn))
        stu = cursor.fetchone()
        if stu:
            cursor.execute("SELECT * FROM created_assessments WHERE teacher_id = ? AND class_name = ? AND status = 'active' ORDER BY id DESC", (teacher['id'], stu['class_name']))
        else:
            cursor.execute("SELECT * FROM created_assessments WHERE teacher_id = ? AND status = 'active' ORDER BY id DESC", (teacher['id'],))
    else:
        cursor.execute("SELECT * FROM created_assessments WHERE teacher_id = ? AND status = 'active' ORDER BY id DESC", (teacher['id'],))
        
    raw_asm = [dict(r) for r in cursor.fetchall()]
    assessments = []
    for a in raw_asm:
        if a.get('is_individual_topics') and a.get('student_topics_json') and prn:
            try:
                stopics = json.loads(a['student_topics_json'])
                if prn in stopics and stopics[prn]:
                    a['individual_topic'] = stopics[prn]
                    a['assigned_topic'] = stopics[prn]
            except:
                pass
        if a.get('is_group') and a.get('student_groups_json') and prn:
            try:
                sgroups = json.loads(a['student_groups_json'])
                if prn in sgroups:
                    gdata = sgroups[prn]
                    if isinstance(gdata, dict):
                        a['assigned_group'] = gdata.get('group', '')
                        a['group_topic'] = gdata.get('topic', '')
                    else:
                        a['assigned_group'] = str(gdata)
            except:
                pass
        assessments.append(a)
    conn.close()
    return jsonify({'assessments': assessments})

@app.route('/api/student/submit', methods=['POST'])
def student_direct_submit():
    data = request.form if request.form else (request.json or {})
    teacher_code = re.sub(r'[^A-Z0-9\/-]', '', str(data.get('teacher_code') or '').strip().upper())
    prn = str(data.get('prn') or '').strip()
    assessment_id = data.get('assessment_id') or data.get('created_assessment_id')
    content_text = data.get('content_text') or data.get('typed_content_html') or ''
    drive_url = str(data.get('drive_url') or '').strip()
    youtube_url = str(data.get('youtube_url') or '').strip()
    pdf_url = str(data.get('pdf_url') or '').strip()
    
    if not (teacher_code and prn and assessment_id):
        return jsonify({'error': 'Teacher code, PRN and Assessment ID are required.'}), 400
        
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM teachers WHERE UPPER(teacher_code) = UPPER(?) AND status = 'approved'", (teacher_code,))
    teacher = cursor.fetchone()
    if not teacher:
        conn.close()
        return jsonify({'error': 'Teacher not found.'}), 404
        
    cursor.execute("SELECT id, student_name, roll_number, class_name, academic_year FROM teacher_rosters WHERE teacher_id = ? AND prn = ?", (teacher['id'], prn))
    student = cursor.fetchone()
    if not student:
        conn.close()
        return jsonify({'error': 'Student not in roster.'}), 404
        
    cursor.execute("SELECT * FROM created_assessments WHERE id = ? AND teacher_id = ?", (assessment_id, teacher['id']))
    asm_row = cursor.fetchone()
    if not asm_row:
        conn.close()
        return jsonify({'error': 'Assessment not found.'}), 404
    asm = dict(asm_row)
        
    now = datetime.datetime.now()
    submission_code = f"SUB-{now.strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"
    type_name = asm.get('assessment_type_name', 'Home Assignment')
    now_str = now.strftime('%Y-%m-%d %H:%M:%S')
    topic = asm.get('assignment_topic', '')
    if asm.get('is_individual_topics') and asm.get('student_topics_json'):
        try:
            stopics = json.loads(asm['student_topics_json'])
            if prn in stopics and stopics[prn]:
                topic = stopics[prn]
        except:
            pass

    if not content_text and (pdf_url or drive_url or youtube_url):
        links_summary = []
        if pdf_url:
            links_summary.append(f"<p><strong>Scanned Journal / Practical PDF Link:</strong> <a href='{pdf_url}' target='_blank'>{pdf_url}</a></p>")
        if drive_url:
            links_summary.append(f"<p><strong>Google Drive Submission Link:</strong> <a href='{drive_url}' target='_blank'>{drive_url}</a></p>")
        if youtube_url:
            links_summary.append(f"<p><strong>YouTube Presentation Link:</strong> <a href='{youtube_url}' target='_blank'>{youtube_url}</a></p>")
        content_text = "<h4>Online Presentation / Journal / Project Submission Links</h4>" + "".join(links_summary)

    group_code = str(data.get('group_code') or '').strip()
    group_members_to_sync = []
    
    if asm.get('is_group') and asm.get('student_groups_json'):
        try:
            sgroups = json.loads(asm['student_groups_json'])
            # If group_code wasn't passed directly, find this student's group
            if not group_code and prn in sgroups:
                gdata = sgroups[prn]
                if isinstance(gdata, dict):
                    group_code = gdata.get('group', '')
                    if gdata.get('topic'):
                        topic = gdata.get('topic')
                else:
                    group_code = str(gdata)

            # If we have a group_code, find all other students in this session assigned to the same group
            if group_code:
                for g_prn, g_info in sgroups.items():
                    g_name = g_info.get('group', '') if isinstance(g_info, dict) else str(g_info)
                    if g_name.strip() == group_code.strip():
                        group_members_to_sync.append(str(g_prn).strip())
        except Exception:
            pass

    if not group_members_to_sync:
        group_members_to_sync = [prn]

    # Query roster info for all group members
    placeholders = ', '.join(['?'] * len(group_members_to_sync))
    cursor.execute(
        f"SELECT id, student_name, roll_number, prn, class_name, academic_year FROM teacher_rosters WHERE teacher_id = ? AND prn IN ({placeholders})",
        [teacher['id']] + group_members_to_sync
    )
    roster_members = [dict(r) for r in cursor.fetchall()]
    if not roster_members:
        roster_members = [dict(student)]

    submitted_ids = []
    main_sub_code = ""

    for m in roster_members:
        m_prn = m['prn']
        m_sub_code = f"SUB-{now.strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"
        if m_prn == prn:
            main_sub_code = m_sub_code

        # Check if this student already has an existing submission for this assessment session
        cursor.execute(
            "SELECT id FROM submissions WHERE teacher_id = ? AND created_assessment_id = ? AND prn = ?",
            (teacher['id'], asm['id'], m_prn)
        )
        existing_sub = cursor.fetchone()

        if existing_sub:
            cursor.execute("""
            UPDATE submissions SET
              topic = ?, group_code = ?, typed_content_html = ?, pdf_url = ?, drive_url = ?, youtube_url = ?, status = 'Submitted',
              submitted_at = ?, updated_at = ?
            WHERE id = ?
            """, (topic, group_code, str(content_text), pdf_url, drive_url, youtube_url, now_str, now_str, existing_sub['id']))
            submitted_ids.append(existing_sub['id'])
        else:
            cursor.execute("""
            INSERT INTO submissions
            (submission_id, teacher_id, roster_id, created_assessment_id, student_name, roll_number, prn,
             class_name, division, semester, course_code, course_name, teacher_name, college_name, university_name,
             assessment_type_name, topic, group_code, dynamic_data_json, typed_content_html, pdf_url, drive_url, youtube_url, status, is_late, submitted_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '{}', ?, ?, ?, ?, 'Submitted', 0, ?)
            """, (
                m_sub_code, teacher['id'], m['id'], asm['id'],
                m['student_name'], m['roll_number'], m_prn,
                m['class_name'], 'A', asm['semester'], asm['course_code'], asm['course_name'],
                teacher['name'], teacher['college_name'], teacher['university_name'],
                type_name, topic, group_code, str(content_text), pdf_url, drive_url, youtube_url, now_str
            ))
            submitted_ids.append(cursor.lastrowid)

    conn.commit()
    conn.close()

    if len(roster_members) > 1 and group_code:
        msg = f"गट '{group_code}' मधील सर्व {len(roster_members)} विद्यार्थ्यांचे असाइनमेंट यशस्वीरीत्या सादर झाले!"
    else:
        msg = "Assignment submitted successfully!"

    return jsonify({
        'success': True,
        'message': msg,
        'submission_id': submitted_ids[0] if submitted_ids else None,
        'submission_code': main_sub_code or (f"SUB-{now.strftime('%Y%m%d')}-0000"),
        'group_synced_count': len(roster_members)
    }), 201

@app.route('/api/student/submissions', methods=['GET'])
def student_submissions_list():
    teacher_code = re.sub(r'[^A-Z0-9\/-]', '', str(request.args.get('teacher_code') or '').strip().upper())
    prn = str(request.args.get('prn') or '').strip()
    
    conn = database.get_db_connection()
    cursor = conn.cursor()
    if teacher_code:
        cursor.execute("SELECT id FROM teachers WHERE teacher_code = ?", (teacher_code,))
        t = cursor.fetchone()
        t_id = t['id'] if t else None
    else:
        t_id = None
        
    query = """
    SELECT s.*, ca.show_marks_to_students, e.marks_obtained as eval_marks_obtained
    FROM submissions s
    LEFT JOIN created_assessments ca ON s.created_assessment_id = ca.id
    LEFT JOIN evaluations e ON e.submission_id = s.id
    """
    params = []
    if t_id and prn:
        query += " WHERE s.teacher_id = ? AND s.prn = ? ORDER BY s.id DESC"
        params = [t_id, prn]
    elif prn:
        query += " WHERE s.prn = ? ORDER BY s.id DESC"
        params = [prn]
    else:
        query += " ORDER BY s.id DESC LIMIT 50"
        
    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()
    subs = []
    for r in rows:
        d = dict(r)
        show_marks = (d.get('show_marks_to_students') is None or d.get('show_marks_to_students') == 1)
        if not show_marks:
            d['marks_obtained'] = None
            d['eval_marks_obtained'] = None
            d['marks_hidden'] = True
        else:
            if d.get('eval_marks_obtained') is not None:
                d['marks_obtained'] = d['eval_marks_obtained']
            d['marks_hidden'] = False
        subs.append(d)
        
    conn.close()
    return jsonify({'submissions': subs})

@app.route('/api/teacher/export-pdf', methods=['POST'])
@teacher_required
def export_teacher_pdf_matrix():
    teacher = get_current_teacher()
    data = request.json or {}
    subject_id = data.get('subject_id')
    
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM submissions WHERE teacher_id = ? ORDER BY id DESC LIMIT 1", (teacher['id'],))
    sub = cursor.fetchone()
    conn.close()
    
    if sub:
        pdf_bytes = pdf_generator.generate_assessment_pdf(dict(sub))
    else:
        # Generate generic summary PDF
        dummy_sub = {
            'submission_id': 'SUMMARY-REPORT',
            'assessment_type_name': 'Continuous Internal Evaluation',
            'college_name': teacher['college_name'],
            'university_name': teacher['university_name'],
            'faculty_stream': teacher['faculty_stream'],
            'subject_name': teacher['subject_name'],
            'course_name': 'Internal Assessment Matrix',
            'course_code': 'CIE-2026',
            'class_name': 'All Classes',
            'academic_year': '2026–27',
            'semester': 'All Semesters',
            'teacher_name': teacher['name'],
            'teacher_code': teacher['teacher_code'],
            'roll_number': 'N/A',
            'student_name': 'Official Institutional Copy',
            'student_prn': 'N/A',
            'topic': 'Continuous Internal Evaluation Consolidated Report',
            'created_at': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'status': 'certified',
            'marks_obtained': 0.0,
            'max_marks': 40.0,
            'evaluator_remarks': 'Certified Official Academic Evaluation Record',
            'evaluated_at': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'typed_content_html': '<p>Continuous Internal Evaluation System Record.</p>'
        }
        pdf_bytes = pdf_generator.generate_assessment_pdf(dummy_sub)
        
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype='application/pdf',
        as_attachment=True,
        download_name=f"CIE_Report_{teacher['teacher_code']}.pdf"
    )

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting Unified Continuous Internal Evaluation Management System (CIEMS) on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
