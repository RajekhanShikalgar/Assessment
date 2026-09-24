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
FONTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'fonts')
UNIFIED_REGULAR_FONT = os.path.join(FONTS_DIR, 'NotoSansDevanagari-Unified.ttf')
UNIFIED_BOLD_FONT = os.path.join(FONTS_DIR, 'NotoSansDevanagari-Bold-Unified.ttf')
BUNDLED_UNICODE_FONT = os.path.join(FONTS_DIR, 'UnicodeFont.ttf')

SYSTEM_FONT_CANDIDATES = [
    UNIFIED_REGULAR_FONT,
    BUNDLED_UNICODE_FONT,
    '/Library/Fonts/Arial Unicode.ttf',
    '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
    os.path.join(FONTS_DIR, 'NotoSansDevanagari-Regular.ttf')
]

PDF_FONT_NORMAL = 'Helvetica'
PDF_FONT_BOLD = 'Helvetica-Bold'

try:
    import uharfbuzz as hb
    HAS_HARFBUZZ = True
except ImportError:
    HAS_HARFBUZZ = False

GLYPH_TO_PUA = {}
HB_FONT = None

for font_path in SYSTEM_FONT_CANDIDATES:
    if os.path.exists(font_path):
        try:
            ttfont = TTFont('UnicodeFont', font_path)
            pdfmetrics.registerFont(ttfont)
            ttfont_bold = None
            if font_path == UNIFIED_REGULAR_FONT and os.path.exists(UNIFIED_BOLD_FONT):
                try:
                    ttfont_bold = TTFont('UnicodeFont-Bold', UNIFIED_BOLD_FONT)
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

            if HAS_HARFBUZZ:
                try:
                    blob = hb.Blob.from_file_path(font_path)
                    hb_face = hb.Face(blob)
                    HB_FONT = hb.Font(hb_face)
                    upem = hb_face.upem or 1000
                    num_glyphs = hb_face.glyph_count
                    for gid in range(num_glyphs):
                        pua_code = 0xE000 + gid
                        ttfont.face.charToGlyph[pua_code] = gid
                        if ttfont_bold is not None:
                            ttfont_bold.face.charToGlyph[pua_code] = gid
                        adv = HB_FONT.get_glyph_h_advance(gid)
                        adv_1000 = int(adv * 1000.0 / upem) if upem else adv
                        ttfont.face.charWidths[pua_code] = adv_1000
                        if ttfont_bold is not None:
                            ttfont_bold.face.charWidths[pua_code] = adv_1000
                        GLYPH_TO_PUA[gid] = chr(pua_code)
                except Exception:
                    pass
            break
        except Exception:
            continue


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


def shape_text_plain(plain_str):
    """Shapes a plain text segment using HarfBuzz if it contains Devanagari."""
    if not plain_str or not HB_FONT or not GLYPH_TO_PUA:
        return plain_str
    if not any('\u0900' <= ch <= '\u097F' for ch in plain_str):
        return plain_str
    try:
        parts = re.split(r'([\u0900-\u097F\u200C\u200D]+)', plain_str)
        out = []
        for p in parts:
            if any('\u0900' <= ch <= '\u097F' for ch in p):
                buf = hb.Buffer()
                buf.add_str(p)
                buf.script = 'Deva'
                buf.language = 'mar'
                buf.direction = 'ltr'
                hb.shape(HB_FONT, buf)
                out.append(''.join(GLYPH_TO_PUA.get(info.codepoint, '?') for info in buf.glyph_infos))
            else:
                out.append(p)
        return ''.join(out)
    except Exception:
        return plain_str


def shape_devanagari_html(html_str):
    """Shapes text within HTML tags while preserving HTML elements."""
    if not html_str or not HB_FONT or not GLYPH_TO_PUA:
        return html_str
    if not any('\u0900' <= ch <= '\u097F' for ch in html_str):
        return html_str
    try:
        parts = re.split(r'(<[^>]+>)', html_str)
        out = []
        for p in parts:
            if p.startswith('<') and p.endswith('>'):
                out.append(p)
            else:
                clean_p = html.unescape(p)
                shaped = shape_text_plain(clean_p)
                out.append(shaped)
        return ''.join(out)
    except Exception:
        return html_str


def clean_html_for_reportlab(html_text):
    """
    Sanitizes HTML from Quill or rich text editors so ReportLab's XML parser
    can parse it without crashing on invalid attributes (like style, class, data-list).
    """
    if not html_text:
        return ""
    text = str(html_text)
    text = text.replace("&nbsp;", " ")
    
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
    Wraps text in a ReportLab Paragraph safely with HarfBuzz Devanagari shaping
    and multi-tier fallback so PDF generation never crashes on malformed markup.
    """
    if text is None:
        text = ""
    cleaned = clean_html_for_reportlab(str(text))
    shaped = shape_devanagari_html(cleaned)
    try:
        return Paragraph(shaped, style)
    except Exception:
        try:
            plain = re.sub(r'<[^>]+>', ' ', str(text))
            plain = plain.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br/>')
            plain_shaped = shape_devanagari_html(plain)
            return Paragraph(plain_shaped, style)
        except Exception:
            try:
                escaped = html.escape(str(text)).replace('\n', '<br/>')
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
    
    # Verification QR Code generation
    sub_raw_id = sub_data.get('submission_id') or sub_data.get('id') or '0'
    verify_url = f"https://rajekhan.in/verify/submission/{sub_raw_id}"
    qr_img = None
    try:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=4,
            border=1
        )
        qr.add_data(verify_url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        qr_io = io.BytesIO()
        img.save(qr_io, format="PNG")
        qr_io.seek(0)
        qr_img = RLImage(qr_io, width=44, height=44)
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

