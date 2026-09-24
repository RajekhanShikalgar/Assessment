# Continuous Internal Evaluation Management System (CIEMS) (rajekhan.in)

A professional, mobile-friendly, and responsive web-based **Continuous Internal Evaluation Management System (CIEMS)** designed for **rajekhan.in** (Higher Education, Academic Teaching, Research, and NEP 2020 Continuous Evaluation).

---

## 🌟 Core Principle

> **"Structured Internal Assessment Record, Not Assignment File Storage."**
> 
> Students **type their assessments directly into the online structured forms** using a clean rich-text editor. 
> - 🚫 No handwritten scanning required
> - 🚫 No compulsory PDF uploads
> - 📄 The system stores structured academic data in the database and automatically generates an official, standardized **Internal Assessment Record PDF** with faculty marks, remarks, and signatures.

---

## ✨ Key Features

1. **6-Step Student Submission Wizard**:
   - **Step 1**: Academic Information (Academic Year, Course Type, Programme/Course, Class, Semester, Subject cascade, Department, Faculty)
   - **Step 2**: Student Information (Name, Roll No, PRN/Enrollment No, Division, Mobile, Email)
   - **Step 3**: Assessment Type (21 built-in types + custom) & Topic
   - **Step 4**: Dynamic Assessment Fields (custom questions per type) + Direct Online Rich-Text Editor (Quill.js)
   - **Step 5**: Live Preview & Warning Notice
   - **Step 6**: Unique Submission ID generation (`RAJ-IA-YYYY-NNNNNN`) & confirmation card

2. **21 Recognized Assessment Types Supported with Dynamic Schemas**:
   - Seminar, Unit Test, Group Discussion, Case Study, Group Activity, Oral Examination, Project Work, Quiz, Class Assignment, Home Assignment, Assessment of Journal, Assessment of Practical Notebook, Field Work, Map Work, Presentation, Viva Voce, Poster Presentation, Research Activity, Classroom Activity, Attendance / Participation, Other.

3. **QR Code Assessment Link Engine**:
   - Faculty can create an assessment session with 1 click.
   - Generates scannable QR Code and shareable direct link (`https://rajekhan.in/submit?preset=...`) that automatically pre-fills Course, Class, Semester, Subject, and Faculty to prevent student selection mistakes.

4. **Duplicate Submission Blocker**:
   - Automatically prevents duplicate submissions for the same Student + Year + Course + Semester + Subject + Assessment Type unless reopened by faculty.

5. **Faculty Evaluation Dashboard**:
   - Real-time statistics: Total, Pending, Assessed, Today's Submissions.
   - Multi-criteria filter table (Year, Class, Semester, Subject, Assessment Type, Status, Search).
   - Grade evaluation modal: Award Marks (Obtained / Max), Remarks, Suggestions, Learning Outcomes, and status transitions (`Draft` $\rightarrow$ `Submitted` $\rightarrow$ `Under Review` $\rightarrow$ `Assessed` $\rightarrow$ `Reopened` $\rightarrow$ `Resubmitted`).
   - Complete audit trail of all actions.

6. **Semester Assessment Marks Matrix**:
   - Cross-tabulation view of students and their marks across all internal assessment types with automatic totals.
   - 1-click export to CSV / Excel and printable view.

7. **Automated Academic PDF Engine**:
   - Generates official college/institution Internal Assessment Record PDF using ReportLab with institutional headers, student details, typed content, faculty marks block, remarks, and signature lines.

8. **Bilingual Support (English | मराठी)**:
   - Instant toggle between English and Marathi for all UI headers, wizard steps, form labels, and instructions.

9. **Group Assessment Hub**:
   - Supports team projects and discussions with unique Group IDs (`RAJ-GA-YYYY-NNNNN`) linking member submissions with individual contributions.

---

## 🚀 Quick Start & How to Run

### 1. Activate Environment & Run
```bash
# In project root directory:
.venv/bin/python app.py
```
Or run directly:
```bash
python3 app.py
```

### 2. Access the Application
Open your web browser and navigate to:
```
http://localhost:5001
```

### 3. Default Demo Credentials

| Role | Email / Faculty Code | Password | Access |
| :--- | :--- | :--- | :--- |
| **Faculty & Admin** | `rajekhan@rajekhan.in` (or `FAC-RAJ-01`) | `admin123` | Full Evaluation, QR Presets, Matrix, Admin Hub |
| **Faculty Member** | `patil@rajekhan.in` (or `FAC-GEO-02`) | `faculty123` | Evaluation Dashboard, QR Presets, Matrix |
| **Student** | Direct Access (No password required) | — | Submit assessments, lookup status by PRN |

---

## 🧪 Running Automated Tests

Run the full automated test suite:
```bash
.venv/bin/python -m unittest test_app.py
```

---

## 📁 Project Structure

| File / Directory | Description |
| :--- | :--- |
| `app.py` | Flask application & REST API endpoints |
| `database.py` | SQLite schema, queries, validation & seed data |
| `pdf_generator.py` | HarfBuzz-powered official academic PDF generation engine |
| `test_app.py` | Comprehensive automated unit and integration test suite |
| `assessment.db` | Relational SQLite database |
| `templates/index.html` | Responsive bilingual academic interface |
| `static/css/style.css` | Institutional academic theme styling & print layouts |
| `static/js/app.js` | Client-side reactive logic, voice typing, and EN/MR localization |
| `manuals/` | Complete operational user manual books (Marathi & English) |
