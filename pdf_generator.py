import os
import io
import json
import re
import html
import qrcode
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, Image as RLImage
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Register Unicode TrueType font supporting both Latin (English) and Devanagari (Marathi)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(ROOT_DIR, 'static', 'fonts')
UNIFIED_REGULAR_FONT = os.path.join(FONTS_DIR, 'NotoSansDevanagari-Unified.ttf')
UNIFIED_BOLD_FONT = os.path.join(FONTS_DIR, 'NotoSansDevanagari-Bold-Unified.ttf')
ROOT_REGULAR_FONT = os.path.join(ROOT_DIR, 'NotoSansDevanagari-Unified.ttf')
ROOT_BOLD_FONT = os.path.join(ROOT_DIR, 'NotoSansDevanagari-Bold-Unified.ttf')

SYSTEM_FONT_CANDIDATES = [
    UNIFIED_REGULAR_FONT,
    ROOT_REGULAR_FONT,
    os.path.join(FONTS_DIR, 'NotoSansDevanagari-Regular.ttf'),
    os.path.join(ROOT_DIR, 'NotoSansDevanagari-Regular.ttf'),
    '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf',
    '/usr/share/fonts/truetype/freefont/FreeSerif.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    '/Library/Fonts/Arial Unicode.ttf',
    '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'
]

def _ensure_devanagari_font():
    for fp in SYSTEM_FONT_CANDIDATES:
        if os.path.exists(fp):
            return fp
    tmp_path = '/tmp/NotoSansDevanagari-Regular.ttf'
    if os.path.exists(tmp_path):
        return tmp_path
    # Auto-download Google Noto Sans Devanagari font from CDN if missing
    try:
        import urllib.request, ssl
        ctx = ssl._create_unverified_context()
        url = 'https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = resp.read()
            if len(data) > 50000:
                with open(tmp_path, 'wb') as f:
                    f.write(data)
                print(f"[FONT LOAD] Automatically downloaded NotoSansDevanagari ({len(data)} bytes) to /tmp!")
                return tmp_path
    except Exception as e:
        print("[FONT DOWNLOAD NOTICE]", e)
    return None

PDF_FONT_NORMAL = 'Helvetica'
PDF_FONT_BOLD = 'Helvetica-Bold'

resolved_font = _ensure_devanagari_font()
if resolved_font:
    try:
        ttfont = TTFont('UnicodeFont', resolved_font)
        ttfont.shapable = True
        pdfmetrics.registerFont(ttfont)
        bold_candidate = UNIFIED_BOLD_FONT if os.path.exists(UNIFIED_BOLD_FONT) else (ROOT_BOLD_FONT if os.path.exists(ROOT_BOLD_FONT) else None)
        if bold_candidate and os.path.exists(bold_candidate):
            try:
                ttfont_bold = TTFont('UnicodeFont-Bold', bold_candidate)
                ttfont_bold.shapable = True
                pdfmetrics.registerFont(ttfont_bold)
                registerFontFamily('UnicodeFont', normal='UnicodeFont', bold='UnicodeFont-Bold', italic='UnicodeFont', boldItalic='UnicodeFont-Bold')
                PDF_FONT_BOLD = 'UnicodeFont-Bold'
            except Exception:
                registerFontFamily('UnicodeFont', normal='UnicodeFont', bold='UnicodeFont', italic='UnicodeFont', boldItalic='UnicodeFont')
                PDF_FONT_BOLD = 'UnicodeFont'
        else:
            registerFontFamily('UnicodeFont', normal='UnicodeFont', bold='UnicodeFont', italic='UnicodeFont', boldItalic='UnicodeFont')
            PDF_FONT_BOLD = 'UnicodeFont'
        PDF_FONT_NORMAL = 'UnicodeFont'
        print(f"[PDF ENGINE SUCCESS] Unicode font registered from: {resolved_font} (Bold: {PDF_FONT_BOLD})")
    except Exception as e:
        print("[PDF ENGINE FONT ERROR]", e)


class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically add total page numbers and official academic footer."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont(PDF_FONT_NORMAL, 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header banner line
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(40, 800, 555, 800)
        self.drawString(40, 805, "rajekhan.in • Academic Assessment Portal • Continuous Internal Evaluation")
        
        # Footer
        self.line(40, 45, 555, 45)
        footer_text = f"Official Internal Assessment Record | Page {self._pageNumber} of {page_count}"
        self.drawString(40, 32, footer_text)
        self.drawRightString(555, 32, "Confidential Academic Document")
        
        # Watermark border (fine aesthetic academic frame)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.rect(30, 20, 535, 802, stroke=1, fill=0)
        
        self.restoreState()


def clean_html_for_reportlab(html_text):
    """
    Sanitizes HTML from Quill or rich text editors so ReportLab's XML parser
    can parse it without crashing on invalid attributes (like style, class, data-list).
    Converts math and common HTML entities to unicode for proper ReportLab rendering.
    """
    if not html_text:
        return ""
    text = str(html_text)
    # Convert HTML entities to font-supported unicode/ascii symbols so ReportLab doesn't display raw entities
    text = text.replace("&nbsp;", " ")
    text = text.replace("&ge;", ">=")
    text = text.replace("&le;", "<=")
    text = text.replace("≥", ">=")
    text = text.replace("≤", "<=")
    text = text.replace("&times;", "×")
    text = text.replace("&divide;", "÷")
    text = text.replace("&#x27;", "'")
    text = text.replace("&apos;", "'")
    text = text.replace("&quot;", '"')
    
    # Block level transformations
    text = re.sub(r'<(?:h1|h2|h3|h4|h5|h6)[^>]*>(.*?)</(?:h1|h2|h3|h4|h5|h6)>', r'<br/><b>\1</b><br/>', text, flags=re.I|re.S)
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'<br/>• \1', text, flags=re.I|re.S)
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\1<br/><br/>', text, flags=re.I|re.S)
    text = re.sub(r'<div[^>]*>(.*?)</div>', r'\1<br/><br/>', text, flags=re.I|re.S)
    text = re.sub(r'<hr\s*/?>', '<br/>----------------------------------------<br/>', text, flags=re.I)
    text = re.sub(r'<br\s*/?>', '<br/>', text, flags=re.I)
    
    # Strip dangerous tags like script, style
    text = re.sub(r'<(?:script|style)[^>]*>.*?</(?:script|style)>', '', text, flags=re.I|re.S)
    
    # Replace strong/em with b/i
    text = re.sub(r'<strong[^>]*>', '<b>', text, flags=re.I)
    text = re.sub(r'</strong>', '</b>', text, flags=re.I)
    text = re.sub(r'<em[^>]*>', '<i>', text, flags=re.I)
    text = re.sub(r'</em>', '</i>', text, flags=re.I)
    text = re.sub(r'<u[^>]*>', '<u>', text, flags=re.I)
    
    # Clean a tags: keep only href attribute
    def clean_a(m):
        href_m = re.search(r'href=[\"\']([^\"\']+)[\"\']', m.group(0), re.I)
        href = href_m.group(1) if href_m else '#'
        return f'<a href="{href}">'
    text = re.sub(r'<a\s+[^>]*>', clean_a, text, flags=re.I)
    
    # Clean font tags: keep only color, size
    def clean_font(m):
        tag = m.group(0)
        c_m = re.search(r'color=[\"\']([^\"\']+)[\"\']', tag, re.I)
        s_m = re.search(r'size=[\"\']([^\"\']+)[\"\']', tag, re.I)
        attrs = []
        if c_m: attrs.append(f'color="{c_m.group(1)}"')
        if s_m: attrs.append(f'size="{s_m.group(1)}"')
        return f'<font {" ".join(attrs)}>' if attrs else '<font>'
    text = re.sub(r'<font\s+[^>]*>', clean_font, text, flags=re.I)
    
    # Strip attributes from b, i, u, sub, sup, strike
    text = re.sub(r'<(b|i|u|sub|sup|strike)\s+[^>]*>', r'<\1>', text, flags=re.I)
    
    # Strip all other container tags
    text = re.sub(r'</?(?:span|ul|ol|table|thead|tbody|tr|td|th|blockquote|pre|code|section|article|figure|figcaption|header|footer|nav|main|aside)[^>]*>', '', text, flags=re.I)
    
    # Strip any remaining unrecognized tags
    text = re.sub(r'<(?!/?(?:b|i|u|font|br|sub|sup|strike|a\b))[^>]+>', '', text, flags=re.I)
    
    # Fix stray ampersands not part of valid entities
    text = re.sub(r'&(?!(?:amp|lt|gt|quot|apos|#\d+);)', '&amp;', text)
    
    # Clean excessive br
    text = re.sub(r'(?:<br/>\s*){3,}', '<br/><br/>', text)
    return text.strip()


def safe_paragraph(text, style):
    """
    Wraps text in a ReportLab Paragraph safely with multi-tier fallback
    so PDF generation never crashes on malformed markup.
    Automatically enables OpenType complex script shaping for Devanagari.
    """
    if text is None:
        text = ""
    if hasattr(style, 'shaping'):
        style.shaping = 1

    cleaned = clean_html_for_reportlab(str(text))
    try:
        return Paragraph(cleaned, style)
    except Exception:
        try:
            plain = re.sub(r'<[^>]+>', ' ', str(text))
            plain = plain.replace('&ge;', '≥').replace('&times;', '×').replace('&le;', '≤').replace('&#x27;', "'").replace('&apos;', "'")
            plain = plain.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br/>')
            return Paragraph(plain, style)
        except Exception:
            try:
                escaped = html.escape(str(text), quote=False).replace('\n', '<br/>')
                return Paragraph(escaped, style)
            except Exception:
                return Paragraph("—", style)


def generate_assessment_pdf(sub_data, eval_data=None, hide_marks=True):
    """
    Generates an official academic PDF record from teacher and student data.
    By default hide_marks=True ensures student copies display only evaluation status without numerical marks.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()
    styles['Normal'].shaping = True
    styles['Normal'].fontName = PDF_FONT_NORMAL
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=13,
        leading=16,
        alignment=1, # Center
        textColor=colors.HexColor("#0F172A")
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName=PDF_FONT_NORMAL,
        fontSize=8.5,
        leading=12,
        alignment=1,
        textColor=colors.HexColor("#475569")
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor("#1E3A8A"), # Deep Navy
        spaceBefore=7,
        spaceAfter=4
    )
    
    cell_bold = ParagraphStyle(
        'CellBold',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#1E293B")
    )
    
    cell_regular = ParagraphStyle(
        'CellRegular',
        parent=styles['Normal'],
        fontName=PDF_FONT_NORMAL,
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#334155")
    )

    body_content_style = ParagraphStyle(
        'BodyContent',
        parent=styles['Normal'],
        fontName=PDF_FONT_NORMAL,
        fontSize=8.5,
        leading=13,
        textColor=colors.HexColor("#1E293B"),
        spaceBefore=3,
        spaceAfter=4
    )

    story = []

    # 1. Institutional Header Block
    college_name = sub_data.get('college_name') or 'College / Institution of Higher Learning'
    univ_name = sub_data.get('university_name') or 'Affiliated University'
    teacher_name = sub_data.get('teacher_name') or 'Concerned Faculty'
    faculty_stream = sub_data.get('faculty_stream') or ''
    subject_name = sub_data.get('subject_name') or ''

    story.append(safe_paragraph(f"<b>{college_name.upper()}</b>", title_style))
    story.append(safe_paragraph(f"Affiliated to {univ_name}", subtitle_style))
    if faculty_stream or subject_name:
        story.append(safe_paragraph(f"<b>Faculty of {faculty_stream} • Subject: {subject_name}</b>", ParagraphStyle('Subj', parent=subtitle_style, fontName=PDF_FONT_BOLD, textColor=colors.HexColor('#1E3A8A'))))
    story.append(Spacer(1, 4))
    story.append(safe_paragraph("<b>INTERNAL ASSESSMENT OFFICIAL RECORD</b>", ParagraphStyle('IAR', parent=title_style, fontSize=11, leading=14, textColor=colors.HexColor('#B91C1C'))))
    story.append(safe_paragraph("Continuous Internal Evaluation (CIE) Digital Record", subtitle_style))
    story.append(Spacer(1, 6))

    # 2. Submission Metadata ID Strip
    submission_id = sub_data.get('submission_id', 'RAJ-IA-2026-XXXXXX')
    status = str(sub_data.get('status', 'Submitted')).upper()
    submitted_at = sub_data.get('submitted_at', '')

    id_strip_data = [
        [
            safe_paragraph(f"<b>SUBMISSION ID:</b> <font color='#1E3A8A' size='8.5'><b>{submission_id}</b></font>", cell_regular),
            safe_paragraph(f"<b>STATUS:</b> <font color='{'#166534' if status=='ASSESSED' else '#92400E'}'><b>{status}</b></font>", cell_regular),
            safe_paragraph(f"<b>DATE:</b> {submitted_at}", cell_regular)
        ]
    ]
    id_table = Table(id_strip_data, colWidths=[190, 130, 195])
    id_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(id_table)
    story.append(Spacer(1, 6))

    def to_roman(n):
        romans = ["I", "II", "III", "IV", "V", "VI", "VII"]
        return romans[n - 1] if 1 <= n <= len(romans) else str(n)

    sec_idx = 1
    # 3. Student & Academic Information Table (Pre-verified from Teacher Roster)
    story.append(safe_paragraph(f"{to_roman(sec_idx)}. STUDENT & COURSE DETAILS (OFFICIAL ROSTER RECORD)", section_heading))
    sec_idx += 1
    
    student_name = sub_data.get('student_name', '')
    roll_no = sub_data.get('roll_number', '')
    prn = sub_data.get('prn', '')
    class_name = sub_data.get('class_name', '')
    division = sub_data.get('division', 'A')
    semester = sub_data.get('semester', '')
    course_code = sub_data.get('course_code', '')
    course_name = sub_data.get('course_name', '')
    assessment_type_name = sub_data.get('assessment_type_name', '')
    topic = sub_data.get('topic', '')
    group_code = sub_data.get('group_code', 'N/A')

    academic_data = [
        [
            safe_paragraph("<b>Student Name:</b>", cell_bold), safe_paragraph(student_name, cell_regular),
            safe_paragraph("<b>PRN / Reg. No:</b>", cell_bold), safe_paragraph(f"<b>{prn}</b>", cell_regular)
        ],
        [
            safe_paragraph("<b>Roll Number:</b>", cell_bold), safe_paragraph(str(roll_no), cell_regular),
            safe_paragraph("<b>Class & Div:</b>", cell_bold), safe_paragraph(f"{class_name} (Div {division})", cell_regular)
        ],
        [
            safe_paragraph("<b>Semester:</b>", cell_bold), safe_paragraph(semester, cell_regular),
            safe_paragraph("<b>Course Code:</b>", cell_bold), safe_paragraph(f"<b>{course_code}</b>", cell_regular)
        ],
        [
            safe_paragraph("<b>Course / Paper:</b>", cell_bold), safe_paragraph(course_name, cell_regular),
            safe_paragraph("<b>Concerned Faculty:</b>", cell_bold), safe_paragraph(f"<b>{teacher_name}</b>", cell_regular)
        ],
        [
            safe_paragraph("<b>Assessment Type:</b>", cell_bold), safe_paragraph(f"<b>{assessment_type_name}</b>", cell_regular),
            safe_paragraph("<b>Group ID:</b>", cell_bold), safe_paragraph(group_code or "N/A", cell_regular)
        ],
        [
            safe_paragraph("<b>Assessment Topic:</b>", cell_bold), safe_paragraph(f"<b>{topic}</b>", cell_regular),
            safe_paragraph("<b>Submission Mode:</b>", cell_bold), safe_paragraph("Direct Online Form", cell_regular)
        ]
    ]

    acad_table = Table(academic_data, colWidths=[110, 150, 110, 145])
    acad_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.white),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#94A3B8")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#F1F5F9")),
        ('BACKGROUND', (2, 0), (2, -1), colors.HexColor("#F1F5F9")),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(acad_table)
    story.append(Spacer(1, 6))

    # 4. Assessment Specific Structured Answers
    dynamic_json_str = sub_data.get('dynamic_data_json', '{}')
    try:
        dynamic_dict = json.loads(dynamic_json_str) if isinstance(dynamic_json_str, str) else dynamic_json_str
    except Exception:
        dynamic_dict = {}

    if dynamic_dict and isinstance(dynamic_dict, dict):
        story.append(safe_paragraph(f"{to_roman(sec_idx)}. STRUCTURED ASSESSMENT DETAILS", section_heading))
        sec_idx += 1
        dyn_rows = []
        for key, val in dynamic_dict.items():
            label = key.replace('_', ' ').title()
            val_str = str(val).replace('\n', '<br/>')
            # If val contains a URL, wrap in clickable link
            for u in re.findall(r'https?://[^\s<>"\'\)]+', str(val)):
                val_str = val_str.replace(u, f"<font color='#1D4ED8'><u><a href='{u}'>{u}</a></u></font>")
            dyn_rows.append([
                safe_paragraph(f"<b>{label}:</b>", cell_bold),
                safe_paragraph(val_str, cell_regular)
            ])
        
        dyn_table = Table(dyn_rows, colWidths=[140, 375])
        dyn_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#F8FAFC")),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#94A3B8")),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('TOPPADDING', (0, 0), (-1, -1), 3.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
            ('LEFTPADDING', (0, 0), (-1, -1), 5),
            ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ]))
        story.append(dyn_table)
        story.append(Spacer(1, 6))

    # 4b. Comprehensive Cloud & Digital Submission Links (Drive, YouTube, Scanned PDF, Oral/Viva Recordings, Presentation links)
    collected_links = []
    seen_links = set()

    def add_link_item(raw_url, default_type=None):
        if not raw_url:
            return
        u = str(raw_url).strip()
        if u.startswith('/api/download-submission-pdf') or u.startswith('/api/student/download-submission-pdf'):
            return
        if not u or u in seen_links:
            return
        
        # Ensure protocol
        href = u if re.match(r'^https?://', u, re.I) else f"https://{u}"
        u_clean = u.rstrip('.,;')
        seen_links.add(u)
        seen_links.add(href)
        seen_links.add(u_clean)

        # Categorize
        u_lower = href.lower()
        asm_type_lower = str(sub_data.get('assessment_type_name') or '').lower()
        
        if 'youtube.com' in u_lower or 'youtu.be' in u_lower or default_type == 'youtube':
            cat_title = "YouTube Video / Presentation Recording"
            cat_mr = "व्हिडिओ व्याख्यान / सादरीकरण रेकॉर्डिंग"
            color = "#B91C1C" # Red
        elif u_lower.endswith('.pdf') or '.pdf?' in u_lower or default_type == 'pdf' or 'journal' in asm_type_lower or 'practical' in asm_type_lower:
            cat_title = "Scanned Journal / Practical / Report PDF"
            cat_mr = "स्कॅन केलेले जर्नल / प्रात्यक्षिक वही PDF"
            color = "#047857" # Emerald
        elif 'drive.google.com' in u_lower or 'docs.google.com' in u_lower or 'dropbox.com' in u_lower or 'onedrive' in u_lower or default_type == 'drive':
            cat_title = "Google Drive / Cloud Materials Link"
            cat_mr = "गुगल ड्राइव्ह / क्लाउड सादरीकरण लिंक"
            color = "#1D4ED8" # Blue
        elif 'oral' in asm_type_lower or 'viva' in asm_type_lower or 'seminar' in asm_type_lower:
            cat_title = "Oral Exam / Viva Voce / Seminar Link"
            cat_mr = "तोंडी परीक्षा / सेमिनार सादरीकरण लिंक"
            color = "#7C3AED" # Violet
        else:
            cat_title = "Online Material / Project Web Link"
            cat_mr = "ऑनलाईन साहित्य / प्रकल्प वेब लिंक"
            color = "#4338CA" # Indigo

        collected_links.append({
            'cat_title': cat_title,
            'cat_mr': cat_mr,
            'href': href,
            'display_url': href,
            'color': color
        })

    # 1. Direct model fields
    if sub_data.get('pdf_url'):
        add_link_item(sub_data['pdf_url'], 'pdf')
    if sub_data.get('drive_url'):
        add_link_item(sub_data['drive_url'], 'drive')
    if sub_data.get('youtube_url'):
        add_link_item(sub_data['youtube_url'], 'youtube')
    if sub_data.get('cloud_url'):
        add_link_item(sub_data['cloud_url'])
    if sub_data.get('link'):
        add_link_item(sub_data['link'])
    if sub_data.get('url'):
        add_link_item(sub_data['url'])

    # 2. Extract embedded URLs from typed_content_html and dynamic fields
    raw_content_for_links = str(sub_data.get('typed_content_html') or sub_data.get('content') or '')
    for found_url in re.findall(r'https?://[^\s<>"\'\)]+', raw_content_for_links):
        add_link_item(found_url.rstrip('.,;'))
    for found_domain_url in re.findall(r'(?:(?:drive|docs)\.google\.com|youtu\.be|youtube\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/[^\s<>"\'\)]+', raw_content_for_links):
        add_link_item(found_domain_url.rstrip('.,;'))

    for d_val in dynamic_dict.values():
        if isinstance(d_val, str):
            for found_url in re.findall(r'https?://[^\s<>"\'\)]+', d_val):
                add_link_item(found_url.rstrip('.,;'))
            for found_domain_url in re.findall(r'(?:(?:drive|docs)\.google\.com|youtu\.be|youtube\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/[^\s<>"\'\)]+', d_val):
                add_link_item(found_domain_url.rstrip('.,;'))

    if collected_links:
        cloud_rows = []
        for l_item in collected_links:
            cloud_rows.append([
                safe_paragraph(f"<b>{l_item['cat_title']}:</b><br/><font color='#64748B' size='6.5'>{l_item['cat_mr']}</font>", cell_bold),
                safe_paragraph(f"<font color='{l_item['color']}'><b><u><a href='{l_item['href']}'>{l_item['display_url']}</a></u></b></font><br/><font color='#047857' size='6.5'><i>(Clickable Hyperlink • थेट उघडण्यासाठी क्लिक करा)</i></font>", cell_regular)
            ])

        cloud_table = Table(cloud_rows, colWidths=[150, 365])
        cloud_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#EFF6FF")),
            ('BOX', (0, 0), (-1, -1), 1.2, colors.HexColor("#3B82F6")),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#DBEAFE")),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('TOPPADDING', (0, 0), (-1, -1), 4.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(safe_paragraph(f"{to_roman(sec_idx)}. DIGITAL CLOUD SUBMISSION & VERIFIED HYPERLINKS (क्लाउड व डिजिटल सादरीकरण लिंक्स)", section_heading))
        sec_idx += 1
        story.append(Spacer(1, 3))
        story.append(cloud_table)
        story.append(Spacer(1, 6))

    # 5. Quiz / MCQ Question Paper & Student Response Sheet
    mcq_q_raw = sub_data.get('mcq_questions_json') or sub_data.get('assessment_mcq_questions_json')
    mcq_a_raw = sub_data.get('mcq_answers_json')
    
    questions = []
    if mcq_q_raw:
        try:
            questions = json.loads(mcq_q_raw) if isinstance(mcq_q_raw, str) else mcq_q_raw
        except Exception:
            questions = []
            
    student_answers = {}
    if mcq_a_raw:
        try:
            student_answers = json.loads(mcq_a_raw) if isinstance(mcq_a_raw, str) else mcq_a_raw
        except Exception:
            student_answers = {}

    opt_letters = ['A', 'B', 'C', 'D', 'E', 'F']
    has_rendered_mcq = False

    if questions and isinstance(questions, list) and len(questions) > 0:
        has_rendered_mcq = True
        story.append(safe_paragraph(f"{to_roman(sec_idx)}. QUIZ / MCQ QUESTION PAPER & STUDENT RESPONSE SHEET (ऑनलाइन बहुपर्यायी प्रश्नोत्तर पत्रिका)", section_heading))
        sec_idx += 1
        story.append(Spacer(1, 3))
        
        for q_idx, q in enumerate(questions):
            q_text = q.get('question') or f"Question {q_idx + 1}"
            q_marks = q.get('marks') or 1
            
            # Fetch student answer
            raw_s_ans = student_answers.get(str(q_idx))
            if raw_s_ans is None:
                raw_s_ans = student_answers.get(str(q_idx + 1))
            
            s_opt_idx = None
            if raw_s_ans is not None:
                try:
                    s_opt_idx = int(raw_s_ans)
                except (ValueError, TypeError):
                    if isinstance(raw_s_ans, str) and raw_s_ans.strip().upper() in opt_letters:
                        s_opt_idx = opt_letters.index(raw_s_ans.strip().upper())
            
            opts = q.get('options')
            if not opts or not isinstance(opts, list):
                opts = [q[k] for k in ['option_a', 'option_b', 'option_c', 'option_d', 'option_e', 'option_f'] if q.get(k)]
            
            correct_idx = q.get('correct_index')
            if correct_idx is None and q.get('correct_option'):
                co = str(q.get('correct_option')).strip().upper()
                if co in opt_letters:
                    correct_idx = opt_letters.index(co)
            try:
                correct_idx = int(correct_idx) if correct_idx is not None else None
            except:
                correct_idx = None

            # Render Question Card
            if hide_marks:
                q_badge = "वस्तुनिष्ठ प्रश्न (Objective Question)"
            else:
                q_badge = f"<b>{q_marks} Mark{'s' if float(q_marks) > 1 else ''}</b>"

            q_card_data = [
                [
                    safe_paragraph(f"<b>Q{q_idx + 1}. {q_text}</b>", cell_bold),
                    safe_paragraph(q_badge, ParagraphStyle('QM', parent=cell_bold, alignment=2, textColor=colors.HexColor("#1E3A8A")))
                ]
            ]
            
            opts_lines = []
            for o_i, opt in enumerate(opts):
                o_let = opt_letters[o_i] if o_i < len(opt_letters) else str(o_i + 1)
                is_selected = (s_opt_idx is not None and s_opt_idx == o_i)
                if is_selected:
                    opts_lines.append(f"<font color='#1E3A8A'><b>[✔] {o_let}) {opt}</b> <i>(विद्यार्थ्याने निवडलेले उत्तर / Selected)</i></font>")
                else:
                    opts_lines.append(f"<font color='#475569'>[○] {o_let}) {opt}</font>")
            
            opts_paragraph = "<br/>".join(opts_lines)
            
            s_let = opt_letters[s_opt_idx] if (s_opt_idx is not None and 0 <= s_opt_idx < len(opt_letters)) else ""
            s_ans_text = opts[s_opt_idx] if (s_opt_idx is not None and 0 <= s_opt_idx < len(opts)) else "Not Attempted (अनुत्तरित)"
            
            summary_text = f"<b>विद्यार्थ्याचे नोंदवलेले उत्तर (Student Chosen Response):</b> <font color='#1E3A8A'><b>{s_let + ') ' if s_let else ''}{s_ans_text}</b></font>"
            if not hide_marks and correct_idx is not None:
                c_let = opt_letters[correct_idx] if 0 <= correct_idx < len(opt_letters) else str(correct_idx + 1)
                c_text = opts[correct_idx] if 0 <= correct_idx < len(opts) else ""
                is_correct = (s_opt_idx == correct_idx)
                res_badge = f"<font color='#166534'><b>[ बरोबर / Correct (+{q_marks}) ]</b></font>" if is_correct else f"<font color='#B91C1C'><b>[ चुकीचे / Incorrect (0/{q_marks}) ]</b></font>"
                summary_text += f"<br/><b>अधिकृत उत्तर (Correct Answer):</b> {c_let}) {c_text} &nbsp;&nbsp;{res_badge}"
            
            q_card_data.append([
                safe_paragraph(f"{opts_paragraph}<br/><br/>{summary_text}", cell_regular),
                safe_paragraph("", cell_regular)
            ])
            
            q_table = Table(q_card_data, colWidths=[430, 85])
            q_table.setStyle(TableStyle([
                ('SPAN', (0, 1), (1, 1)),
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#F1F5F9")),
                ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor("#FFFFFF")),
                ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#CBD5E1")),
                ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
                ('TOPPADDING', (0, 0), (-1, -1), 3),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
                ('LEFTPADDING', (0, 0), (-1, -1), 5),
                ('RIGHTPADDING', (0, 0), (-1, -1), 5),
            ]))
            
            story.append(q_table)
            story.append(Spacer(1, 4))
            
        story.append(Spacer(1, 4))

    # 6. Typed Main Content (Direct Online Typing & Additional Answers)
    raw_content = sub_data.get('typed_content_html', '')
    if raw_content and len(str(raw_content).strip()) > 0:
        # If we already rendered structured MCQ, check if there's non-mcq text to render
        should_render_content = True
        cleaned = clean_html_for_reportlab(str(raw_content))
        
        if has_rendered_mcq:
            # Strip out duplicate mcq header/breakdown if present in typed_content_html
            cleaned_non_mcq = re.sub(r'Online MCQ Unit Test.*?(?=----------------------------------------|$)', '', cleaned, flags=re.S|re.I)
            cleaned_non_mcq = re.sub(r'----------------------------------------', '', cleaned_non_mcq).strip()
            if not cleaned_non_mcq or len(cleaned_non_mcq) < 5:
                should_render_content = False
            else:
                cleaned = cleaned_non_mcq

        if should_render_content:
            sec_title = "ADDITIONAL STUDENT NOTES / REPORT" if has_rendered_mcq else "STUDENT ASSESSMENT CONTENT / REPORT"
            story.append(safe_paragraph(f"{to_roman(sec_idx)}. {sec_title}", section_heading))
            sec_idx += 1
            story.append(Spacer(1, 4))
            
            chunks = [c.strip() for c in re.split(r'(?:<br/>\s*){2,}', cleaned) if c.strip()]
            if not chunks:
                chunks = [cleaned] if cleaned.strip() else []

            for chunk in chunks:
                if not chunk:
                    continue
                story.append(safe_paragraph(chunk, body_content_style))
                story.append(Spacer(1, 4))
                
            story.append(Spacer(1, 6))

    # 7. Faculty Assessment & Evaluation Block
    story.append(safe_paragraph(f"{to_roman(sec_idx)}. FACULTY EVALUATION & VERIFICATION", section_heading))
    sec_idx += 1
    
    raw_status = str(sub_data.get('status', 'Submitted')).strip()
    if raw_status.lower() in ['assessed', 'evaluated', 'verified']:
        status_display = "SUBMITTED & VERIFIED (मूल्यांकन पूर्ण)"
        status_color = "#166534"
    elif raw_status.lower() == 'reopened':
        status_display = "REOPENED FOR REVISION (पुन्हा सादर करा)"
        status_color = "#C2410C"
    else:
        status_display = "SUBMITTED / UNDER REVIEW (सादर केलेले)"
        status_color = "#1E40AF"

    if eval_data:
        eval_date = eval_data.get('evaluated_at') or submitted_at or '—'
        eval_by = eval_data.get('evaluator_name') or teacher_name
    else:
        eval_date = submitted_at or "—"
        eval_by = teacher_name

    eval_table_data = [
        [
            safe_paragraph("<b>Evaluation Status:</b><br/><font size='6.5' color='#64748B'>मूल्यांकन स्थिती</font>", cell_bold),
            safe_paragraph(f"<font color='{status_color}' size='8'><b>{status_display}</b></font>", cell_bold),
            safe_paragraph("<b>Date:</b><br/><font size='6.5' color='#64748B'>सादरीकरण / तपासणी</font>", cell_bold),
            safe_paragraph(str(eval_date), cell_regular)
        ],
        [
            safe_paragraph("<b>Concerned Faculty:</b><br/><font size='6.5' color='#64748B'>संबंधित प्राध्यापक</font>", cell_bold),
            safe_paragraph(f"<b>{eval_by}</b>", cell_regular),
            safe_paragraph("<b>Official Certification:</b><br/><font size='6.5' color='#64748B'>अधिकृत डिजिटल नोंद</font>", cell_bold),
            safe_paragraph("<font color='#1E3A8A'><b>VERIFIED DIGITAL CIE RECORD</b></font>", cell_bold)
        ]
    ]

    if eval_data:
        # If teacher/admin copy with marks enabled
        if not hide_marks and eval_data.get('marks_obtained') is not None:
            m_obt = eval_data.get('marks_obtained')
            m_max = eval_data.get('maximum_marks') or 20.0
            eval_table_data.append([
                safe_paragraph("<b>Marks Obtained:</b><br/><font size='6.5' color='#64748B'>प्राप्त गुण</font>", cell_bold),
                safe_paragraph(f"<font color='#166534' size='9'><b>{m_obt} / {m_max}</b></font>", cell_bold),
                safe_paragraph("<b>Record Mode:</b>", cell_bold),
                safe_paragraph("Official Faculty Marksheet Copy", cell_regular)
            ])
        
        if eval_data.get('remarks'):
            remarks_text = str(eval_data.get('remarks'))
            if hide_marks:
                # Sanitize any marks references in remarks so student copy never reveals numerical marks
                remarks_text = re.sub(r'Auto-Graded MCQ Test:.*', 'Auto-Graded MCQ Test: Verified Digital Examination Record (डिजिटल परीक्षा मूल्यांकन संपन्न).', remarks_text, flags=re.I)
                remarks_text = re.sub(r'\(\s*[\d.]+\s*/\s*[\d.]+\s*marks?\s*\)', '', remarks_text, flags=re.I)
                remarks_text = re.sub(r'\b[\d.]+\s*/\s*[\d.]+\s*marks?\b', '', remarks_text, flags=re.I)
            eval_table_data.append([
                safe_paragraph("<b>Faculty Remarks:</b><br/><font size='6.5' color='#64748B'>शिक्षकांचा शेरा</font>", cell_bold),
                safe_paragraph(remarks_text, cell_regular),
                safe_paragraph("<b>Record Mode:</b>", cell_bold),
                safe_paragraph("Official Student Copy" if hide_marks else "Confidential Evaluation", cell_regular)
            ])

    eval_table = Table(eval_table_data, colWidths=[120, 140, 110, 145])
    eval_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor("#1E3A8A")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#EFF6FF")),
        ('BACKGROUND', (2, 0), (2, -1), colors.HexColor("#EFF6FF")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    
    # Verification QR Code generation with complete assessment details
    student_email = sub_data.get('student_email') or sub_data.get('email') or ''
    if not student_email and isinstance(sub_data.get('dynamic_data_json'), str):
        try:
            d_json = json.loads(sub_data['dynamic_data_json'])
            student_email = d_json.get('student_email') or d_json.get('email') or ''
        except Exception:
            pass

    qr_data_lines = [
        "CIEMS VERIFIED ASSESSMENT RECORD",
        "----------------------------------------",
        f"Student: {student_name}",
        f"PRN: {prn} | Roll No: {roll_no}",
        f"Class: {class_name} ({semester})",
        f"Subject: {subject_name} ({course_code})",
        f"Assessment: {assessment_type_name}",
        f"Topic: {topic}",
        f"Faculty: {teacher_name}",
        f"College: {college_name}",
        f"Submission ID: {submission_id}",
        f"Status: {status.upper() if status else 'VERIFIED'}",
        f"Date: {submitted_at}",
        "----------------------------------------",
        "CIEMS Academic Evaluation System"
    ]
    qr_full_text = "\n".join([line for line in qr_data_lines if line])
    qr_img = None
    try:
        qr = qrcode.QRCode(
            version=None,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=6,
            border=2
        )
        qr.add_data(qr_full_text)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        qr_io = io.BytesIO()
        img.save(qr_io, format="PNG")
        qr_io.seek(0)
        qr_img = RLImage(qr_io, width=72, height=72)
    except Exception:
        qr_img = None

    # Signature & Verification row
    qr_content = []
    if qr_img:
        qr_content.append(qr_img)
    qr_content.append(safe_paragraph("<font size='6' color='#1E3A8A'><b>Scan to Verify Record</b></font><br/><font size='5.5' color='#64748B'>डिजिटल सत्यता पडताळणी</font>", ParagraphStyle('QRLabel', parent=subtitle_style, alignment=1)))

    sig_data = [
        [
            safe_paragraph("<br/><br/>___________________________<br/><b>Student Signature</b><br/><font size='6.5' color='#64748B'>विद्यार्थी स्वाक्षरी</font>", ParagraphStyle('Sig1', parent=subtitle_style, alignment=0)),
            safe_paragraph("<br/><br/>___________________________<br/><b>Teacher Signature</b><br/><font size='6.5' color='#64748B'>विषय शिक्षक स्वाक्षरी</font>", ParagraphStyle('Sig2', parent=subtitle_style, alignment=1)),
            qr_content
        ]
    ]
    sig_table = Table(sig_data, colWidths=[175, 175, 165])
    sig_table.setStyle(TableStyle([
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ALIGN', (2, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    story.append(eval_table)
    story.append(Spacer(1, 8))
    story.append(KeepTogether(sig_table))

    doc.build(story, canvasmaker=NumberedCanvas)
    buffer.seek(0)
    return buffer.getvalue()


def generate_college_naac_attainment_pdf(college_name, university_name, data):
    """
    Generates an official NAAC Criterion 2.6 Institutional Learning Outcomes &
    Attainment Assessment Report (PDF) with executive summary, PO attainment matrix,
    participating faculty breakdown (with names), and mathematical methodology.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    styles['Normal'].shaping = 1
    styles['Normal'].fontName = PDF_FONT_NORMAL

    def xml_clean(val):
        if val is None:
            return ""
        val = html.unescape(str(val))
        val = val.replace('&ge;', '>=').replace('&times;', '×').replace('&le;', '<=').replace('&#x27;', "'").replace('&apos;', "'")
        val = val.replace('≥', '>=').replace('≤', '<=')
        return val.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    
    def to_clean_english(text):
        if not text:
            return ""
        text = str(text).strip()
        # If text has format "मराठी (English)", extract the English part
        m = re.search(r'\(([^)]+)\)', text)
        if m:
            inside = m.group(1).strip()
            if re.search(r'[A-Za-z]', inside):
                prefix = "Department of " if text.lower().startswith('department of') else ""
                return prefix + inside
        stream_translations = {
            'कला व ललित कला': 'Arts & Fine Arts',
            'कला': 'Arts & Humanities',
            'वाणिज्य व व्यवस्थापन': 'Commerce & Management',
            'वाणिज्य': 'Commerce & Management',
            'विज्ञान व तंत्रज्ञान': 'Science & Technology',
            'विज्ञान': 'Science & Technology',
            'मानव्यविद्या': 'Humanities',
            'आंतरविद्याशाखीय अभ्यास': 'Interdisciplinary Studies',
            'शिक्षणशास्त्र': 'Education',
            'विधी': 'Law',
            'भूगोल': 'Geography',
            'इतिहास': 'History',
            'अर्थशास्त्र': 'Economics',
            'मराठी': 'Marathi',
            'हिंदी': 'Hindi',
            'इंग्रजी': 'English',
            'राज्यशास्त्र': 'Political Science',
            'समाजशास्त्र': 'Sociology',
            'रसायनशास्त्र': 'Chemistry',
            'भौतिकशास्त्र': 'Physics',
            'गणित': 'Mathematics',
            'प्राणीशास्त्र': 'Zoology',
            'वनस्पतीशास्त्र': 'Botany'
        }
        for mr_k, en_v in stream_translations.items():
            if mr_k in text:
                text = text.replace(mr_k, en_v)
        cleaned = re.sub(r'[\u0900-\u097F]+', '', text)
        cleaned = re.sub(r'\(\s*\)', '', cleaned)
        cleaned = re.sub(r'\s+', ' ', cleaned).strip()
        if cleaned.startswith('of '):
            cleaned = 'Department ' + cleaned
        if cleaned in ['Department of', 'Department', '']:
            cleaned = text
        return cleaned

    header_naac_style = ParagraphStyle(
        'NAACHeader',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=9,
        leading=12,
        alignment=1,
        shaping=1,
        textColor=colors.HexColor("#1E3A8A")
    )
    
    college_title_style = ParagraphStyle(
        'CollegeTitle',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=13,
        leading=16,
        alignment=1,
        shaping=1,
        textColor=colors.HexColor("#0F172A")
    )
    
    univ_sub_style = ParagraphStyle(
        'UnivSub',
        parent=styles['Normal'],
        fontName=PDF_FONT_NORMAL,
        fontSize=8.5,
        leading=11,
        alignment=1,
        shaping=1,
        textColor=colors.HexColor("#475569")
    )
    
    section_h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=10,
        leading=13,
        shaping=1,
        textColor=colors.HexColor("#1E3A8A"),
        spaceBefore=8,
        spaceAfter=4
    )
    
    cell_bold = ParagraphStyle(
        'CellBold',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=7.5,
        leading=9.5,
        shaping=1,
        textColor=colors.HexColor("#1E293B")
    )
    
    cell_regular = ParagraphStyle(
        'CellRegular',
        parent=styles['Normal'],
        fontName=PDF_FONT_NORMAL,
        fontSize=7.5,
        leading=9.5,
        shaping=1,
        textColor=colors.HexColor("#334155")
    )
    
    th_style = ParagraphStyle(
        'THStyle',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=7.5,
        leading=9.5,
        alignment=1,
        shaping=1,
        textColor=colors.white
    )

    story = []

    # 1. Official Header
    acad_yr = data.get('academic_year', '2026–27')
    summary = data.get('summary', {})
    aishe_code = data.get('aishe_code') or (summary.get('aishe_code') if summary else None) or ''
    college_code = data.get('college_code') or (summary.get('college_code') if summary else None) or ''

    clean_college_name = to_clean_english(college_name)
    clean_university_name = to_clean_english(university_name)

    header_html = "<b>NATIONAL ASSESSMENT AND ACCREDITATION COUNCIL (NAAC)</b><br/>" \
                  "<font size='9' color='#1E3A8A'><b>STUDENT PERFORMANCE AND LEARNING OUTCOMES</b></font><br/>" \
                  "<font size='7.5' color='#475569'>Institutional Outcome-Based Education (OBE) Attainment Assessment Report</font>"
    story.append(safe_paragraph(header_html, header_naac_style))
    story.append(Spacer(1, 4))
    
    code_sub = []
    if aishe_code and aishe_code != 'N/A':
        code_sub.append(f"AISHE Code: <b>{xml_clean(aishe_code)}</b>")
    if college_code and college_code != 'N/A':
        code_sub.append(f"Affiliation / College Code: <b>{xml_clean(college_code)}</b>")
    code_sub.append(f"Affiliated to {xml_clean(clean_university_name)}")
    code_sub.append(f"Academic Year: <b>{acad_yr}</b>")
    code_str = " &nbsp;|&nbsp; ".join(code_sub)

    college_header_box = [
        [
            safe_paragraph(f"<b>{xml_clean(clean_college_name.upper())}</b>", college_title_style)
        ],
        [
            safe_paragraph(code_str, univ_sub_style)
        ]
    ]
    college_tbl = Table(college_header_box, colWidths=[523])
    college_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor("#1E3A8A")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    story.append(college_tbl)
    story.append(Spacer(1, 6))

    # 2. Executive Summary Metrics
    tot_courses = summary.get('total_courses_count', 0)
    eval_courses = summary.get('evaluated_courses_count', 0)
    coverage_pct = summary.get('coverage_percentage', 0.0)
    tch_count = summary.get('participating_teachers_count', 0)
    students_count = summary.get('total_students_evaluated', 0)
    overall_attainment = summary.get('overall_attainment_percentage', 0.0)
    overall_level = summary.get('overall_naac_level', 1)

    level_color_map = {
        3: "#16A34A", # Green
        2: "#2563EB", # Blue
        1: "#D97706", # Amber
        0: "#DC2626"  # Red
    }
    lvl_color = level_color_map.get(overall_level, "#2563EB")

    story.append(safe_paragraph("<b>1. Executive Attainment Summary & Institutional Performance Indicators</b>", section_h2_style))
    
    summary_data = [
        [
            safe_paragraph("<b>Total Courses Mapped:</b>", cell_bold),
            safe_paragraph(f"<b>{tot_courses} Courses</b>", cell_regular),
            safe_paragraph("<b>Evaluated Courses:</b>", cell_bold),
            safe_paragraph(f"<b>{eval_courses} Courses</b>", cell_regular),
            safe_paragraph("<b>Academic Audit Coverage:</b>", cell_bold),
            safe_paragraph(f"<b>{coverage_pct:.1f}%</b>", cell_regular)
        ],
        [
            safe_paragraph("<b>Participating Faculty:</b>", cell_bold),
            safe_paragraph(f"<b>{tch_count} Members</b>", cell_regular),
            safe_paragraph("<b>Students Evaluated:</b>", cell_bold),
            safe_paragraph(f"<b>{students_count} Students</b>", cell_regular),
            safe_paragraph("<b>Institutional Attainment:</b>", cell_bold),
            safe_paragraph(f"<font color='{lvl_color}'><b>{overall_attainment:.1f}% (Level {overall_level})</b></font>", cell_bold)
        ]
    ]
    summary_table = Table(summary_data, colWidths=[105, 65, 95, 65, 110, 83])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#94A3B8")),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#EFF6FF")),
        ('BACKGROUND', (2, 0), (2, -1), colors.HexColor("#EFF6FF")),
        ('BACKGROUND', (4, 0), (4, -1), colors.HexColor("#EFF6FF")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 6))

    # 2. Academic Term-wise Attainment Summary (Term I, Term II & Annual Attainment)
    term_list = data.get('term_summary', [])
    if term_list:
        story.append(safe_paragraph("<b>2. Academic Term-wise Attainment Summary (Term I, Term II & Annual Consolidation)</b>", section_h2_style))
        term_table_data = [
            [
                safe_paragraph("Academic Term / Cycle", th_style),
                safe_paragraph("Semesters Included", th_style),
                safe_paragraph("Courses (Total / Eval)", th_style),
                safe_paragraph("Students Evaluated", th_style),
                safe_paragraph("Direct Attainment (%)", th_style),
                safe_paragraph("NAAC Level", th_style)
            ]
        ]
        for t in term_list:
            t_lvl = t.get('naac_level', 0)
            t_color = level_color_map.get(t_lvl, "#2563EB")
            is_annual = (t.get('term_number') == 'Annual')
            term_table_data.append([
                safe_paragraph(f"<b>{xml_clean(t.get('term_name', ''))}</b>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center>{xml_clean(t.get('semesters_included', ''))}</center>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center>{t.get('total_courses', 0)} / {t.get('evaluated_courses', 0)}</center>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center>{t.get('students_evaluated', 0)}</center>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center><b>{t.get('attainment_pct', 0.0):.1f}%</b></center>", cell_bold),
                safe_paragraph(f"<center><font color='{t_color}'><b>Level {t_lvl}</b></font></center>", cell_bold)
            ])
        t_table = Table(term_table_data, colWidths=[173, 100, 85, 60, 65, 40])
        t_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#065F46")), # Emerald Dark
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#065F46")),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
            ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor("#ECFDF5")]),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor("#D1FAE5")), # Highlight annual row
        ]))
        story.append(t_table)
        story.append(Spacer(1, 6))

    # 3. Faculty / Stream-wise Attainment Summary
    stream_list = data.get('stream_summary', [])
    if stream_list:
        story.append(safe_paragraph("<b>3. Faculty / Stream-wise Attainment Summary (Inter-Disciplinary Overview)</b>", section_h2_style))
        stream_table_data = [
            [
                safe_paragraph("Faculty / Academic Stream", th_style),
                safe_paragraph("Departments", th_style),
                safe_paragraph("Courses (Total / Eval)", th_style),
                safe_paragraph("Students Evaluated", th_style),
                safe_paragraph("Average Attainment (%)", th_style),
                safe_paragraph("NAAC Level", th_style)
            ]
        ]
        for s in stream_list:
            s_lvl = s.get('naac_level', 0)
            s_color = level_color_map.get(s_lvl, "#2563EB")
            s_name_clean = to_clean_english(s.get('stream_name', ''))
            stream_table_data.append([
                safe_paragraph(f"<b>{xml_clean(s_name_clean)}</b>", cell_bold),
                safe_paragraph(f"<center>{s.get('departments_count', 0)} Departments</center>", cell_regular),
                safe_paragraph(f"<center>{s.get('total_courses', 0)} / {s.get('evaluated_courses', 0)}</center>", cell_regular),
                safe_paragraph(f"<center>{s.get('students_evaluated', 0)}</center>", cell_regular),
                safe_paragraph(f"<center><b>{s.get('attainment_pct', 0.0):.1f}%</b></center>", cell_bold),
                safe_paragraph(f"<center><font color='{s_color}'><b>Level {s_lvl}</b></font></center>", cell_bold)
            ])
        s_table = Table(stream_table_data, colWidths=[153, 80, 95, 75, 75, 45])
        s_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#312E81")), # Indigo
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#312E81")),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#EEF2FF")]),
        ]))
        story.append(s_table)
        story.append(Spacer(1, 6))

    # 4. Department-wise Attainment Summary
    dept_list = data.get('department_summary', [])
    if dept_list:
        story.append(safe_paragraph("<b>4. Department-wise Attainment Summary (Academic Units Attainment Index)</b>", section_h2_style))
        dept_table_data = [
            [
                safe_paragraph("Department / Academic Unit", th_style),
                safe_paragraph("Faculty Stream", th_style),
                safe_paragraph("Faculty", th_style),
                safe_paragraph("Courses (Tot / Eval)", th_style),
                safe_paragraph("Students Evaluated", th_style),
                safe_paragraph("Attainment (%)", th_style),
                safe_paragraph("Level", th_style)
            ]
        ]
        for d in dept_list:
            d_lvl = d.get('naac_level', 0)
            d_color = level_color_map.get(d_lvl, "#2563EB")
            d_name_clean = to_clean_english(d.get('department_name', ''))
            d_stream_clean = to_clean_english(d.get('faculty_stream', ''))
            dept_table_data.append([
                safe_paragraph(f"<b>{xml_clean(d_name_clean)}</b>", cell_bold),
                safe_paragraph(f"<font size='6.5' color='#64748B'>{xml_clean(d_stream_clean)}</font>", cell_regular),
                safe_paragraph(f"<center>{d.get('teachers_count', 0)}</center>", cell_regular),
                safe_paragraph(f"<center>{d.get('total_courses', 0)} / {d.get('evaluated_courses', 0)}</center>", cell_regular),
                safe_paragraph(f"<center>{d.get('students_evaluated', 0)}</center>", cell_regular),
                safe_paragraph(f"<center><b>{d.get('attainment_pct', 0.0):.1f}%</b></center>", cell_bold),
                safe_paragraph(f"<center><font color='{d_color}'><b>L-{d_lvl}</b></font></center>", cell_bold)
            ])
        d_table = Table(dept_table_data, colWidths=[140, 105, 45, 80, 58, 55, 40])
        d_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#065F46")), # Emerald Dark
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#065F46")),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#ECFDF5")]),
        ]))
        story.append(d_table)
        story.append(Spacer(1, 6))

    # 5A. Programme Outcomes (PO1 to PO12) Attainment Matrix
    story.append(safe_paragraph("<b>5A. Programme Outcomes (PO1–PO12) Institutional Attainment Matrix</b>", section_h2_style))
    
    po_list = data.get('po_attainment_list', [])
    po_table_data = [
        [
            safe_paragraph("PO Code", th_style),
            safe_paragraph("Programme Outcome (PO) Title & Purpose Scope", th_style),
            safe_paragraph("Courses Mapped", th_style),
            safe_paragraph("Attainment (%)", th_style),
            safe_paragraph("NAAC Level", th_style),
            safe_paragraph("Outcome Status", th_style)
        ]
    ]

    for p in po_list:
        lvl = p.get('naac_level', 1)
        p_color = level_color_map.get(lvl, "#2563EB")
        status_label = f"<font color='{p_color}'><b>Level {lvl} (Attained)</b></font>" if lvl >= 1 else "<font color='#DC2626'><b>Not Attained</b></font>"
        po_title_clean = xml_clean(p.get('po_title_en') or p.get('po_title', ''))
        po_desc_raw = xml_clean(p.get('po_description_en') or p.get('po_description', ''))
        po_desc_clean = (po_desc_raw[:120] + '...') if len(po_desc_raw) > 120 else po_desc_raw
        po_table_data.append([
            safe_paragraph(f"<b>{xml_clean(p.get('po_code', ''))}</b>", cell_bold),
            safe_paragraph(f"<b>{po_title_clean}</b><br/><font size='6' color='#64748B'>{po_desc_clean}</font>", cell_regular),
            safe_paragraph(f"<center>{p.get('mapped_courses_count', 0)}</center>", cell_regular),
            safe_paragraph(f"<center><b>{p.get('attainment_pct', 0.0):.1f}%</b></center>", cell_regular),
            safe_paragraph(f"<center><b>Level {lvl}</b></center>", cell_bold),
            safe_paragraph(f"<center>{status_label}</center>", cell_regular)
        ])

    po_table = Table(po_table_data, colWidths=[45, 238, 55, 65, 55, 65])
    po_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1E3A8A")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#1E3A8A")),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
    ]))
    story.append(po_table)
    story.append(Spacer(1, 6))

    # 5B. Department & Program Specific Outcomes (PSOs) Attainment Summary (Grouped by Subject/Course)
    pso_summary_list = data.get('pso_summary', [])
    if pso_summary_list:
        story.append(safe_paragraph("<b>5B. Department &amp; Program Specific Outcomes (PSOs) Attainment Summary</b>", section_h2_style))
        
        # Group by Subject / Course
        grouped_pso = {}
        for p in pso_summary_list:
            key = (
                p.get('department_name', ''),
                p.get('subject_name', ''),
                p.get('course_code', ''),
                p.get('course_name', ''),
                p.get('class_name', ''),
                p.get('semester', '')
            )
            if key not in grouped_pso:
                grouped_pso[key] = []
            grouped_pso[key].append(p)

        pso_table_data = [
            [
                safe_paragraph("PSO Code", th_style),
                safe_paragraph("Program Specific Outcome (PSO) Scope &amp; Purpose", th_style),
                safe_paragraph("Students (Eval / Target)", th_style),
                safe_paragraph("Attainment (%)", th_style),
                safe_paragraph("NAAC Level", th_style),
                safe_paragraph("Outcome Status", th_style)
            ]
        ]
        
        row_styles = []
        current_row = 1
        
        for (d_name, s_name, c_code, c_name, cl_name, sem), p_items in list(grouped_pso.items())[:15]:
            d_clean = to_clean_english(d_name)
            s_clean = to_clean_english(s_name)
            c_clean = to_clean_english(c_name)
            cl_clean = to_clean_english(cl_name)
            
            subj_title = f"<b>Department:</b> {d_clean} &nbsp;|&nbsp; <b>Course:</b> {c_clean} ({c_code or 'CC'}) &nbsp;|&nbsp; <b>Class:</b> {cl_clean} (Sem-{sem})"
            pso_table_data.append([
                safe_paragraph(f"<font size='7' color='#4C1D95'>{subj_title}</font>", cell_bold),
                "", "", "", "", ""
            ])
            row_styles.append(('SPAN', (0, current_row), (5, current_row)))
            row_styles.append(('BACKGROUND', (0, current_row), (5, current_row), colors.HexColor("#F3E8FF"))) # Lavender
            row_styles.append(('TOPPADDING', (0, current_row), (5, current_row), 3))
            row_styles.append(('BOTTOMPADDING', (0, current_row), (5, current_row), 3))
            current_row += 1
            
            for p in p_items:
                p_lvl = p.get('naac_level', 1)
                p_color = level_color_map.get(p_lvl, "#2563EB")
                status_label = f"<font color='{p_color}'><b>Level {p_lvl} (Attained)</b></font>" if p_lvl >= 1 else "<font color='#DC2626'><b>Not Attained</b></font>"
                p_title = xml_clean(p.get('pso_title_en') or p.get('pso_title') or p.get('pso_code', ''))
                p_desc = xml_clean(p.get('pso_description_en') or p.get('pso_description') or '')
                p_desc_clean = (p_desc[:115] + '...') if len(p_desc) > 115 else p_desc
                
                pso_table_data.append([
                    safe_paragraph(f"<b>{xml_clean(p.get('pso_code', ''))}</b>", cell_bold),
                    safe_paragraph(f"<b>{p_title}</b><br/><font size='6' color='#64748B'>{p_desc_clean}</font>", cell_regular),
                    safe_paragraph(f"<center>{p.get('students_evaluated', 0)} / {p.get('students_meeting_target', 0)}</center>", cell_regular),
                    safe_paragraph(f"<center><b>{p.get('attainment_pct', 0.0):.1f}%</b></center>", cell_regular),
                    safe_paragraph(f"<center><b>Level {p_lvl}</b></center>", cell_bold),
                    safe_paragraph(f"<center>{status_label}</center>", cell_regular)
                ])
                current_row += 1

        pso_table = Table(pso_table_data, colWidths=[50, 233, 75, 55, 50, 60])
        pso_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#581C87")), # Deep Purple
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#581C87")),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#FAF5FF")]),
        ] + row_styles))
        story.append(pso_table)
        story.append(Spacer(1, 6))

    # 6. Course-wise & Faculty Breakdown
    story.append(safe_paragraph("<b>6. Faculty & Course-wise Detailed Attainment Record</b>", section_h2_style))
    
    teacher_breakdown = data.get('teacher_breakdown', [])
    t_table_data = [
        [
            safe_paragraph("Faculty Member", th_style),
            safe_paragraph("Subject & Course Details", th_style),
            safe_paragraph("Class, Sem & Term", th_style),
            safe_paragraph("Students (Eval / Target)", th_style),
            safe_paragraph("Attainment (%)", th_style),
            safe_paragraph("Level", th_style)
        ]
    ]

    for t in teacher_breakdown[:40]: # Cleanly paginate/limit display
        t_lvl = t.get('naac_level', 1)
        t_color = level_color_map.get(t_lvl, "#2563EB")
        t_term = "Term I" if int(t.get('term_number', 1) or 1) == 1 else "Term II"
        t_tch_clean = to_clean_english(t.get('teacher_name', ''))
        t_des_clean = to_clean_english(t.get('designation', 'Faculty'))
        t_crs_clean = to_clean_english(t.get('course_name', ''))
        t_dpt_clean = to_clean_english(t.get('department_name', t.get('subject_name', '')))
        t_cls_clean = to_clean_english(t.get('class_name', ''))
        
        t_table_data.append([
            safe_paragraph(f"<b>{xml_clean(t_tch_clean)}</b><br/><font size='6' color='#64748B'>{xml_clean(t_des_clean)}</font>", cell_regular),
            safe_paragraph(f"<b>{xml_clean(t_crs_clean)}</b> ({xml_clean(t.get('course_code', ''))})<br/><font size='6' color='#64748B'>{xml_clean(t_dpt_clean)}</font>", cell_regular),
            safe_paragraph(f"<b>{xml_clean(t_cls_clean)}</b><br/><font size='6' color='#0369A1'>Sem-{xml_clean(str(t.get('semester', '')))} ({t_term})</font>", cell_regular),
            safe_paragraph(f"<center>{t.get('students_evaluated', 0)} / {t.get('students_meeting_target', 0)}</center>", cell_regular),
            safe_paragraph(f"<center><b>{t.get('attainment_pct', 0.0):.1f}%</b></center>", cell_bold),
            safe_paragraph(f"<center><font color='{t_color}'><b>L-{t_lvl}</b></font></center>", cell_bold)
        ])

    if len(t_table_data) == 1:
        t_table_data.append([
            safe_paragraph("No courses evaluated yet.", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular)
        ])

    t_table = Table(t_table_data, colWidths=[115, 148, 85, 85, 55, 35])
    t_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0F766E")), # Teal
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#0F766E")),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F0FDFA")]),
    ]))
    story.append(t_table)
    story.append(Spacer(1, 6))

    # 7. Mathematical Methodology & NAAC Benchmarks (100% English, Multi-row Splittable Table)
    story.append(safe_paragraph("<b>7. Mathematical Calculation Methodology & NAAC Attainment Framework</b>", section_h2_style))
    
    math_items = [
        ("1. Student Level Benchmark Threshold:",
         "An individual student is deemed to have attained the course competency benchmark if they score <b>≥ 60%</b> in Continuous Internal Evaluation (CIE) components (Unit Tests, Home Assignments, Seminars, Group Discussions, Practicals)."),
        ("2. Course Outcome (CO) Direct Attainment Formula:",
         "The attainment percentage for each course is computed as the proportion of evaluated students meeting the 60% benchmark:<br/><b>Course Attainment (%) = [ (Number of Students Scoring ≥ 60% in CIE) / (Total Number of Students Evaluated) ] × 100</b>"),
        ("3. Academic Term-wise (Odd/Even Semesters) & Annual Attainment Consolidation:",
         "• <b>Term I Attainment (%):</b> Average direct attainment of all evaluated courses conducted in Odd Semesters (Semesters 1, 3, 5, 7).<br/>• <b>Term II Attainment (%):</b> Average direct attainment of all evaluated courses conducted in Even Semesters (Semesters 2, 4, 6, 8).<br/>• <b>Annual Institutional Attainment (%):</b> Weighted arithmetic mean across both terms for the complete academic year."),
        ("4. NAAC 3-Point Attainment Level Scale:",
         "• <b>Level 3 (High Attainment):</b> ≥ 70% of evaluated students achieve the benchmark score (≥ 60% marks).<br/>• <b>Level 2 (Medium Attainment):</b> 60% to 69.9% of evaluated students achieve the benchmark score.<br/>• <b>Level 1 (Low Attainment):</b> 50% to 59.9% of evaluated students achieve the benchmark score.<br/>• <b>Level 0 (Not Attained):</b> &lt; 50% of evaluated students achieve the benchmark score."),
        ("5. Department-wise and Faculty Stream Attainment Aggregation:",
         "The departmental attainment average is calculated as the arithmetic mean of attainment scores across all audited courses under the department:<br/><b>Department Attainment (%) = [ Σ (Attainment % of Evaluated Department Courses) ] / (Number of Evaluated Courses)</b>"),
        ("6. Institutional Programme Outcome (PO) Attainment Matrix:",
         "For each Programme Outcome (PO1 to PO12), attainment is calculated by aggregating mapped Course Outcomes according to curriculum correlation weights:<br/><b>PO Attainment (%) = [ Σ (Course Attainment % × Mapping Weight) ] / [ Σ (Mapping Weights) ]</b>"),
        ("7. Department & Program Specific Outcomes (PSOs) Attainment:",
         "Program Specific Outcomes (PSOs) evaluate domain-specific competencies for each academic department. Attainment is calculated by aggregating mapped Course Outcomes (COs) for the department:<br/><b>PSO Attainment (%) = [ Σ (Course Outcome Attainment % × PSO Mapping Weight) ] / [ Σ (PSO Mapping Weights) ]</b>"),
        ("8. Academic Audit Scope & Verification Coverage:",
         f"<b>Academic Audit Coverage = ({eval_courses} Evaluated Courses / {tot_courses} Registered Courses) × 100 = {coverage_pct:.1f}%</b>")
    ]
    
    math_table_rows = []
    for title, desc in math_items:
        row_content = f"<b>{title}</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;{desc}"
        math_table_rows.append([safe_paragraph(row_content, cell_regular)])
        
    math_tbl = Table(math_table_rows, colWidths=[523])
    math_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#94A3B8")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(math_tbl)
    story.append(Spacer(1, 10))

    # 8. QR Code & Verification Signatures (100% English)
    qr_lines = [
        "NAAC STUDENT PERFORMANCE AND LEARNING OUTCOMES",
        f"Institution: {college_name}",
        f"AISHE Code: {aishe_code or 'N/A'}",
        f"College Code: {college_code or 'N/A'}",
        f"University: {university_name}",
        f"Academic Year: {acad_yr}",
        f"Institutional Attainment Index: {overall_attainment:.1f}% (Level {overall_level})",
        f"Evaluated Courses: {eval_courses} / {tot_courses} ({coverage_pct:.1f}%)",
        f"Participating Faculty: {tch_count} Members",
        "CIEMS Verified NAAC Compliance Record"
    ]
    qr_text = "\n".join(qr_lines)
    qr_img = None
    try:
        qr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=5, border=2)
        qr.add_data(qr_text)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        qr_io = io.BytesIO()
        img.save(qr_io, format="PNG")
        qr_io.seek(0)
        qr_img = RLImage(qr_io, width=65, height=65)
    except Exception:
        qr_img = None

    qr_cell = []
    if qr_img:
        qr_cell.append(qr_img)
    qr_cell.append(safe_paragraph("<font size='5.5' color='#1E3A8A'><b>NAAC Digital Audit</b></font>", ParagraphStyle('QRL', parent=univ_sub_style, alignment=1)))

    sig_data = [
        [
            safe_paragraph("<br/><br/>_____________________________________<br/><b>IQAC Coordinator / NAAC Steering Committee Head</b><br/><font size='6.5' color='#64748B'>Internal Quality Assurance Cell (IQAC)</font>", cell_bold),
            qr_cell,
            safe_paragraph("<br/><br/>_____________________________________<br/><b>Principal / Head of Institution</b><br/><font size='6.5' color='#64748B'>Official Institutional Signature &amp; Seal</font>", ParagraphStyle('PR', parent=cell_bold, alignment=2))
        ]
    ]
    sig_table = Table(sig_data, colWidths=[200, 123, 200])
    sig_table.setStyle(TableStyle([
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))
    story.append(KeepTogether(sig_table))

    doc.build(story, canvasmaker=NumberedCanvas)
    buffer.seek(0)
    return buffer.getvalue()


def generate_teacher_obe_attainment_pdf(teacher, data):
    """
    Generates an official NAAC & OBE Teacher-Level Performance & Course Attainment Report (PDF).
    Features teacher details, term-wise attainment, course breakdown, PO & PSO attainment matrices,
    mathematical calculation methodology, and QR code verification for PBAS / CAS appraisal.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    styles['Normal'].shaping = 1
    styles['Normal'].fontName = PDF_FONT_NORMAL

    def xml_clean(val):
        if val is None:
            return ""
        val = html.unescape(str(val))
        val = val.replace('&ge;', '>=').replace('&times;', '×').replace('&le;', '<=').replace('&#x27;', "'").replace('&apos;', "'")
        val = val.replace('≥', '>=').replace('≤', '<=')
        return val.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    def to_clean_english(text):
        if not text:
            return ""
        text = str(text).strip()
        m = re.search(r'\(([^)]+)\)', text)
        if m:
            inside = m.group(1).strip()
            if re.search(r'[A-Za-z]', inside):
                prefix = "Department of " if text.lower().startswith('department of') else ""
                return prefix + inside
        stream_translations = {
            'कला व ललित कला': 'Arts & Fine Arts',
            'कला': 'Arts & Humanities',
            'वाणिज्य व व्यवस्थापन': 'Commerce & Management',
            'वाणिज्य': 'Commerce & Management',
            'विज्ञान व तंत्रज्ञान': 'Science & Technology',
            'विज्ञान': 'Science & Technology',
            'मानव्यविद्या': 'Humanities',
            'आंतरविद्याशाखीय अभ्यास': 'Interdisciplinary Studies',
            'शिक्षणशास्त्र': 'Education',
            'विधी': 'Law',
            'भूगोल': 'Geography',
            'इतिहास': 'History',
            'अर्थशास्त्र': 'Economics',
            'मराठी': 'Marathi',
            'हिंदी': 'Hindi',
            'इंग्रजी': 'English',
            'राज्यशास्त्र': 'Political Science',
            'समाजशास्त्र': 'Sociology',
            'रसायनशास्त्र': 'Chemistry',
            'भौतिकशास्त्र': 'Physics',
            'गणित': 'Mathematics',
            'प्राणीशास्त्र': 'Zoology',
            'वनस्पतीशास्त्र': 'Botany'
        }
        for mr_k, en_v in stream_translations.items():
            if mr_k in text:
                text = text.replace(mr_k, en_v)
        cleaned = re.sub(r'[\u0900-\u097F]+', '', text)
        cleaned = re.sub(r'\(\s*\)', '', cleaned)
        cleaned = re.sub(r'\s+', ' ', cleaned).strip()
        if cleaned.startswith('of '):
            cleaned = 'Department ' + cleaned
        if cleaned in ['Department of', 'Department', '']:
            cleaned = text
        return cleaned

    header_naac_style = ParagraphStyle(
        'TeacherNAACHeader',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=9,
        leading=12,
        alignment=1,
        shaping=1,
        textColor=colors.HexColor("#065F46")
    )

    teacher_title_style = ParagraphStyle(
        'TeacherTitle',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=12,
        leading=15,
        alignment=1,
        shaping=1,
        textColor=colors.HexColor("#0F172A")
    )

    sub_info_style = ParagraphStyle(
        'TeacherSubInfo',
        parent=styles['Normal'],
        fontName=PDF_FONT_NORMAL,
        fontSize=8,
        leading=11,
        alignment=1,
        shaping=1,
        textColor=colors.HexColor("#475569")
    )

    section_h2_style = ParagraphStyle(
        'TeacherSecH2',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=9.5,
        leading=12.5,
        shaping=1,
        textColor=colors.HexColor("#065F46"),
        spaceBefore=7,
        spaceAfter=3
    )

    cell_bold = ParagraphStyle(
        'TeacherCellBold',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=7.5,
        leading=9.5,
        shaping=1,
        textColor=colors.HexColor("#1E293B")
    )

    cell_regular = ParagraphStyle(
        'TeacherCellRegular',
        parent=styles['Normal'],
        fontName=PDF_FONT_NORMAL,
        fontSize=7.5,
        leading=9.5,
        shaping=1,
        textColor=colors.HexColor("#334155")
    )

    th_style = ParagraphStyle(
        'TeacherTH',
        parent=styles['Normal'],
        fontName=PDF_FONT_BOLD,
        fontSize=7.5,
        leading=9.5,
        alignment=1,
        shaping=1,
        textColor=colors.white
    )

    story = []

    # 1. Header Banner
    acad_yr = data.get('academic_year', '2026–27')
    t_info = data.get('teacher', teacher) or {}
    t_name = to_clean_english(t_info.get('name', 'Faculty Member'))
    t_des = to_clean_english(t_info.get('designation', 'Faculty'))
    t_dept = to_clean_english(t_info.get('subject_name', 'General Studies'))
    t_stream = to_clean_english(t_info.get('faculty_stream', 'General'))
    t_col = to_clean_english(t_info.get('college_name', 'Affiliated College'))
    t_univ = to_clean_english(t_info.get('university_name', 'University'))
    t_code = t_info.get('teacher_code') or 'FAC-001'
    aishe = t_info.get('aishe_code') or 'N/A'

    header_html = "<b>NATIONAL ASSESSMENT AND ACCREDITATION COUNCIL (NAAC)</b><br/>" \
                  "<font size='9' color='#065F46'><b>FACULTY OBE LEARNING OUTCOMES &amp; COURSE ATTAINMENT REPORT</b></font><br/>" \
                  "<font size='7' color='#475569'>Criterion 2.6 Student Performance &amp; Faculty Outcome-Based Teaching Evaluation</font>"
    story.append(safe_paragraph(header_html, header_naac_style))
    story.append(Spacer(1, 4))

    info_sub = [
        f"Faculty ID: <b>{xml_clean(t_code)}</b>",
        f"Department: <b>{xml_clean(t_dept)}</b>",
        f"Stream: <b>{xml_clean(t_stream)}</b>",
        f"Academic Year: <b>{acad_yr}</b>"
    ]
    info_str = " &nbsp;|&nbsp; ".join(info_sub)
    col_str = f"<b>{xml_clean(t_col)}</b> (AISHE: {xml_clean(aishe)}) &nbsp;|&nbsp; Affiliated to {xml_clean(t_univ)}"

    teacher_header_box = [
        [
            safe_paragraph(f"<b>{xml_clean(t_name.upper())}</b> &nbsp; <font size='9' color='#065F46'>({xml_clean(t_des)})</font>", teacher_title_style)
        ],
        [
            safe_paragraph(info_str, sub_info_style)
        ],
        [
            safe_paragraph(col_str, sub_info_style)
        ]
    ]
    teacher_tbl = Table(teacher_header_box, colWidths=[523])
    teacher_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F0FDF4")),
        ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor("#065F46")),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    story.append(teacher_tbl)
    story.append(Spacer(1, 6))

    # 2. Executive Performance Indicators
    summary = data.get('summary', {})
    tot_courses = summary.get('total_courses_count', 0)
    eval_courses = summary.get('evaluated_courses_count', 0)
    coverage_pct = summary.get('coverage_percentage', 0.0)
    students_count = summary.get('total_students_evaluated', 0)
    overall_attainment = summary.get('overall_attainment_percentage', 0.0)
    overall_level = summary.get('overall_naac_level', 1)

    level_color_map = {
        3: "#16A34A",
        2: "#2563EB",
        1: "#D97706",
        0: "#DC2626"
    }
    lvl_color = level_color_map.get(overall_level, "#2563EB")

    story.append(safe_paragraph("<b>1. Faculty Executive Attainment Summary & Performance Indicators</b>", section_h2_style))

    summary_data = [
        [
            safe_paragraph("<b>Assigned Courses:</b>", cell_bold),
            safe_paragraph(f"<b>{tot_courses} Courses</b>", cell_regular),
            safe_paragraph("<b>Evaluated Courses:</b>", cell_bold),
            safe_paragraph(f"<b>{eval_courses} Courses</b>", cell_regular),
            safe_paragraph("<b>Evaluation Coverage:</b>", cell_bold),
            safe_paragraph(f"<b>{coverage_pct:.1f}%</b>", cell_regular)
        ],
        [
            safe_paragraph("<b>Teaching Stream:</b>", cell_bold),
            safe_paragraph(f"<b>{xml_clean(t_stream)}</b>", cell_regular),
            safe_paragraph("<b>Students Evaluated:</b>", cell_bold),
            safe_paragraph(f"<b>{students_count} Students</b>", cell_regular),
            safe_paragraph("<b>Faculty Attainment:</b>", cell_bold),
            safe_paragraph(f"<font color='{lvl_color}'><b>{overall_attainment:.1f}% (Level {overall_level})</b></font>", cell_bold)
        ]
    ]
    summary_table = Table(summary_data, colWidths=[105, 65, 95, 65, 110, 83])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#065F46")),
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor("#F0FDF4")),
        ('BACKGROUND', (2, 0), (2, -1), colors.HexColor("#F0FDF4")),
        ('BACKGROUND', (4, 0), (4, -1), colors.HexColor("#F0FDF4")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 6))

    # 3. Academic Term-wise Summary (Term I, Term II & Annual Consolidation)
    term_list = data.get('term_summary', [])
    if term_list:
        story.append(safe_paragraph("<b>2. Academic Term-wise Attainment Summary (Term I, Term II & Annual Consolidation)</b>", section_h2_style))
        term_table_data = [
            [
                safe_paragraph("Academic Term / Cycle", th_style),
                safe_paragraph("Semesters Included", th_style),
                safe_paragraph("Courses (Total / Eval)", th_style),
                safe_paragraph("Students Evaluated", th_style),
                safe_paragraph("Direct Attainment (%)", th_style),
                safe_paragraph("NAAC Level", th_style)
            ]
        ]
        for t in term_list:
            t_lvl = t.get('naac_level', 0)
            t_color = level_color_map.get(t_lvl, "#2563EB")
            is_annual = (t.get('term_number') == 'Annual')
            term_table_data.append([
                safe_paragraph(f"<b>{xml_clean(t.get('term_name', ''))}</b>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center>{xml_clean(t.get('semesters_included', ''))}</center>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center>{t.get('total_courses', 0)} / {t.get('evaluated_courses', 0)}</center>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center>{t.get('students_evaluated', 0)}</center>", cell_bold if is_annual else cell_regular),
                safe_paragraph(f"<center><b>{t.get('attainment_pct', 0.0):.1f}%</b></center>", cell_bold),
                safe_paragraph(f"<center><font color='{t_color}'><b>Level {t_lvl}</b></font></center>", cell_bold)
            ])
        t_table = Table(term_table_data, colWidths=[173, 100, 85, 60, 65, 40])
        t_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#065F46")),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#065F46")),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
            ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor("#ECFDF5")]),
            ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor("#D1FAE5")),
        ]))
        story.append(t_table)
        story.append(Spacer(1, 6))

    # 4. Course-wise Detailed Attainment Record
    story.append(safe_paragraph("<b>3. Course-wise Detailed Teaching & Evaluation Record</b>", section_h2_style))
    course_list = data.get('course_breakdown', [])
    c_table_data = [
        [
            safe_paragraph("Course Code & Title", th_style),
            safe_paragraph("Class & Semester", th_style),
            safe_paragraph("Academic Term", th_style),
            safe_paragraph("Students (Eval / Target)", th_style),
            safe_paragraph("Attainment (%)", th_style),
            safe_paragraph("NAAC Level", th_style)
        ]
    ]

    for c in course_list:
        c_lvl = c.get('naac_level', 0)
        c_color = level_color_map.get(c_lvl, "#2563EB")
        t_term = "Term I" if int(c.get('term_number', 1) or 1) == 1 else "Term II"
        c_name_clean = to_clean_english(c.get('course_name', ''))
        c_code_clean = c.get('course_code') or 'CC'
        cl_name_clean = to_clean_english(c.get('class_name', ''))

        c_table_data.append([
            safe_paragraph(f"<b>{xml_clean(c_name_clean)}</b> ({xml_clean(c_code_clean)})", cell_bold),
            safe_paragraph(f"<b>{xml_clean(cl_name_clean)}</b> (Sem-{xml_clean(str(c.get('semester', '')))})", cell_regular),
            safe_paragraph(f"<center>{t_term}</center>", cell_regular),
            safe_paragraph(f"<center>{c.get('students_evaluated', 0)} / {c.get('students_meeting_target', 0)}</center>", cell_regular),
            safe_paragraph(f"<center><b>{c.get('attainment_pct', 0.0):.1f}%</b></center>", cell_bold),
            safe_paragraph(f"<center><font color='{c_color}'><b>Level {c_lvl}</b></font></center>", cell_bold)
        ])

    if len(c_table_data) == 1:
        c_table_data.append([
            safe_paragraph("No courses evaluated yet.", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular),
            safe_paragraph("-", cell_regular)
        ])

    c_table = Table(c_table_data, colWidths=[183, 105, 65, 80, 50, 40])
    c_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0F766E")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#0F766E")),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F0FDFA")]),
    ]))
    story.append(c_table)
    story.append(Spacer(1, 6))

    # 5. Programme Outcomes (PO1 to PO12) Attainment Matrix
    story.append(safe_paragraph("<b>4. Programme Outcomes (PO1–PO12) Faculty Attainment Matrix</b>", section_h2_style))
    po_list = data.get('po_attainment_list', [])
    po_table_data = [
        [
            safe_paragraph("PO Code", th_style),
            safe_paragraph("Programme Outcome (PO) Title & Purpose Scope", th_style),
            safe_paragraph("Courses Mapped", th_style),
            safe_paragraph("Attainment (%)", th_style),
            safe_paragraph("NAAC Level", th_style),
            safe_paragraph("Outcome Status", th_style)
        ]
    ]

    for p in po_list:
        lvl = p.get('naac_level', 1)
        p_color = level_color_map.get(lvl, "#2563EB")
        status_label = f"<font color='{p_color}'><b>Level {lvl} (Attained)</b></font>" if lvl >= 1 else "<font color='#DC2626'><b>Not Attained</b></font>"
        po_title_clean = xml_clean(p.get('po_title_en') or p.get('po_title', ''))
        po_desc_raw = xml_clean(p.get('po_description_en') or p.get('po_description', ''))
        po_desc_clean = (po_desc_raw[:120] + '...') if len(po_desc_raw) > 120 else po_desc_raw
        po_table_data.append([
            safe_paragraph(f"<b>{xml_clean(p.get('po_code', ''))}</b>", cell_bold),
            safe_paragraph(f"<b>{po_title_clean}</b><br/><font size='6' color='#64748B'>{po_desc_clean}</font>", cell_regular),
            safe_paragraph(f"<center>{p.get('mapped_courses_count', 0)}</center>", cell_regular),
            safe_paragraph(f"<center><b>{p.get('attainment_pct', 0.0):.1f}%</b></center>", cell_regular),
            safe_paragraph(f"<center><b>Level {lvl}</b></center>", cell_bold),
            safe_paragraph(f"<center>{status_label}</center>", cell_regular)
        ])

    po_table = Table(po_table_data, colWidths=[45, 238, 55, 65, 55, 65])
    po_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#1E3A8A")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#1E3A8A")),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
    ]))
    story.append(po_table)
    story.append(Spacer(1, 6))

    # 6. Program Specific Outcomes (PSOs) Attainment Summary (Grouped by Course)
    pso_summary_list = data.get('pso_summary', [])
    if pso_summary_list:
        story.append(safe_paragraph("<b>5. Program Specific Outcomes (PSOs) Course-wise Attainment Summary</b>", section_h2_style))
        grouped_pso = {}
        for p in pso_summary_list:
            key = (
                p.get('department_name', ''),
                p.get('subject_name', ''),
                p.get('course_code', ''),
                p.get('course_name', ''),
                p.get('class_name', ''),
                p.get('semester', '')
            )
            if key not in grouped_pso:
                grouped_pso[key] = []
            grouped_pso[key].append(p)

        pso_table_data = [
            [
                safe_paragraph("PSO Code", th_style),
                safe_paragraph("Program Specific Outcome (PSO) Scope &amp; Purpose", th_style),
                safe_paragraph("Students (Eval / Target)", th_style),
                safe_paragraph("Attainment (%)", th_style),
                safe_paragraph("NAAC Level", th_style),
                safe_paragraph("Outcome Status", th_style)
            ]
        ]
        
        row_styles = []
        current_row = 1
        
        for (d_name, s_name, c_code, c_name, cl_name, sem), p_items in list(grouped_pso.items())[:12]:
            d_clean = to_clean_english(d_name)
            s_clean = to_clean_english(s_name)
            c_clean = to_clean_english(c_name)
            cl_clean = to_clean_english(cl_name)
            
            subj_title = f"<b>Course:</b> {c_clean} ({c_code or 'CC'}) &nbsp;|&nbsp; <b>Class:</b> {cl_clean} (Sem-{sem}) &nbsp;|&nbsp; <b>Dept:</b> {d_clean}"
            pso_table_data.append([
                safe_paragraph(f"<font size='7' color='#4C1D95'>{subj_title}</font>", cell_bold),
                "", "", "", "", ""
            ])
            row_styles.append(('SPAN', (0, current_row), (5, current_row)))
            row_styles.append(('BACKGROUND', (0, current_row), (5, current_row), colors.HexColor("#F3E8FF")))
            row_styles.append(('TOPPADDING', (0, current_row), (5, current_row), 3))
            row_styles.append(('BOTTOMPADDING', (0, current_row), (5, current_row), 3))
            current_row += 1
            
            for p in p_items:
                p_lvl = p.get('naac_level', 1)
                p_color = level_color_map.get(p_lvl, "#2563EB")
                status_label = f"<font color='{p_color}'><b>Level {p_lvl} (Attained)</b></font>" if p_lvl >= 1 else "<font color='#DC2626'><b>Not Attained</b></font>"
                p_title = xml_clean(p.get('pso_title_en') or p.get('pso_title') or p.get('pso_code', ''))
                p_desc = xml_clean(p.get('pso_description_en') or p.get('pso_description') or '')
                p_desc_clean = (p_desc[:115] + '...') if len(p_desc) > 115 else p_desc
                
                pso_table_data.append([
                    safe_paragraph(f"<b>{xml_clean(p.get('pso_code', ''))}</b>", cell_bold),
                    safe_paragraph(f"<b>{p_title}</b><br/><font size='6' color='#64748B'>{p_desc_clean}</font>", cell_regular),
                    safe_paragraph(f"<center>{p.get('students_evaluated', 0)} / {p.get('students_meeting_target', 0)}</center>", cell_regular),
                    safe_paragraph(f"<center><b>{p.get('attainment_pct', 0.0):.1f}%</b></center>", cell_regular),
                    safe_paragraph(f"<center><b>Level {p_lvl}</b></center>", cell_bold),
                    safe_paragraph(f"<center>{status_label}</center>", cell_regular)
                ])
                current_row += 1

        pso_table = Table(pso_table_data, colWidths=[50, 233, 75, 55, 50, 60])
        pso_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#581C87")),
            ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#581C87")),
            ('TOPPADDING', (0, 0), (-1, -1), 2.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor("#FAF5FF")]),
        ] + row_styles))
        story.append(pso_table)
        story.append(Spacer(1, 6))

    # 7. Mathematical Methodology & NAAC Framework (Multi-row splittable table)
    story.append(safe_paragraph("<b>6. Mathematical Calculation Methodology & NAAC Attainment Framework</b>", section_h2_style))
    math_items = [
        ("1. Student Benchmark Threshold (60%):",
         "A student attains course competency if their score in Continuous Internal Evaluation (CIE) is <b>≥ 60%</b>."),
        ("2. Course Outcome (CO) Attainment Formula:",
         "<b>Course Attainment (%) = [ (Students Scoring ≥ 60% in CIE) / (Total Students Evaluated) ] × 100</b>"),
        ("3. Term-wise & Annual Attainment:",
         "• <b>Term I:</b> Average attainment of Odd Semesters (Sem 1, 3, 5, 7).<br/>• <b>Term II:</b> Average attainment of Even Semesters (Sem 2, 4, 6, 8).<br/>• <b>Annual:</b> Weighted arithmetic mean across all terms taught in the academic year."),
        ("4. NAAC 3-Point Level Scale:",
         "• <b>Level 3 (High):</b> ≥ 70% students qualify.<br/>• <b>Level 2 (Medium):</b> 60% to 69.9% qualify.<br/>• <b>Level 1 (Low):</b> 50% to 59.9% qualify.<br/>• <b>Level 0:</b> &lt; 50% qualify.")
    ]
    math_table_rows = []
    for title, desc in math_items:
        row_content = f"<b>{title}</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;{desc}"
        math_table_rows.append([safe_paragraph(row_content, cell_regular)])

    math_tbl = Table(math_table_rows, colWidths=[523])
    math_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#94A3B8")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(math_tbl)
    story.append(Spacer(1, 10))

    # 8. QR Code & Official Signatures
    qr_lines = [
        "NAAC FACULTY LEARNING OUTCOMES ATTAINMENT",
        f"Faculty: {t_name} ({t_code})",
        f"Designation: {t_des}",
        f"Department: {t_dept}",
        f"Institution: {t_col}",
        f"Academic Year: {acad_yr}",
        f"Faculty Attainment Index: {overall_attainment:.1f}% (Level {overall_level})",
        f"Courses Evaluated: {eval_courses} / {tot_courses} ({coverage_pct:.1f}%)",
        "CIEMS Verified NAAC Criterion 2.6 PBAS Appraisal"
    ]
    qr_text = "\n".join(qr_lines)
    qr_img = None
    try:
        qr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=5, border=2)
        qr.add_data(qr_text)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        qr_io = io.BytesIO()
        img.save(qr_io, format="PNG")
        qr_io.seek(0)
        qr_img = RLImage(qr_io, width=65, height=65)
    except Exception:
        qr_img = None

    qr_cell = []
    if qr_img:
        qr_cell.append(qr_img)
    qr_cell.append(safe_paragraph("<font size='5.5' color='#065F46'><b>PBAS / NAAC Verified</b></font>", ParagraphStyle('TQRL', parent=sub_info_style, alignment=1)))

    sig_data = [
        [
            safe_paragraph(f"<br/><br/>_____________________________________<br/><b>{xml_clean(t_name)}</b><br/><font size='6.5' color='#64748B'>{xml_clean(t_des)}, {xml_clean(t_dept)}</font>", cell_bold),
            qr_cell,
            safe_paragraph("<br/><br/>_____________________________________<br/><b>Head of Department / Principal</b><br/><font size='6.5' color='#64748B'>Official Institutional Endorsement &amp; Seal</font>", ParagraphStyle('TPR', parent=cell_bold, alignment=2))
        ]
    ]
    sig_table = Table(sig_data, colWidths=[200, 123, 200])
    sig_table.setStyle(TableStyle([
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))
    story.append(KeepTogether(sig_table))

    doc.build(story, canvasmaker=NumberedCanvas)
    buffer.seek(0)
    return buffer.getvalue()



