/**
 * rajekhan.in - Continuous Internal Evaluation (CIE) Academic Management System
 * Comprehensive JavaScript Application Logic
 */

// =========================================================================
// I18N MULTI-LANGUAGE DICTIONARY (ENGLISH & MARATHI)
// =========================================================================
const I18N = {
  en: {
    "header_user_manual_btn": "User Manual (Guide)",
    "active_mappings_header": "Active Subject & Assessment Mappings",
    "admin_dash_sub": "Approve new teacher registrations, manage faculty codes, and oversee continuous internal evaluation records.",
    "admin_dash_title": "Institutional Administration & Faculty Registry",
    "admin_inst_desc": "Strictly restricted to authorized central institutional administrators. Oversee faculty roster approvals, departmental masters, and continuous evaluation audits.",
    "admin_inst_title": "Administrative Access Notice",
    "admin_login_sub": "Supervisory portal for Head of Department, Principal, and Examination In-Charge.",
    "admin_login_title": "Administrative Login",
    "app_title": "Continuous Internal Evaluation Management System (CIEMS)",
    "approved_teachers_title": "Approved & Active Faculty Directory",
    "badge_ugc_nep": "UGC & NEP 2020 Compliant",
    "btn_add_master_course": "+ Add Course & Class",
    "btn_add_mcq_q": "+ Add Question",
    "btn_add_student": "Add Single Student",
    "btn_auto_generate_pwd": "Auto-Generate New Password",
    "btn_bulk_import": "Bulk Import Students",
    "btn_bulk_paste_mcq": "Quick Paste / Bulk Import",
    "btn_cancel": "Cancel",
    "btn_change_password": "Change Password",
    "btn_close": "Close",
    "btn_copy_link": "Copy Student Link",
    "btn_create_session": "Create New Assessment Session",
    "btn_custom_class": "+ Other / Custom Class",
    "btn_disconnect": "Disconnect",
    "btn_do_import": "Import Students Data",
    "btn_download_matrix_csv": "Export Matrix CSV",
    "btn_download_archive_zip": "1-Click Semester ZIP Archive",
    "lbl_duration_minutes": "Time Limit (Mins)",
    "stu_timer_title": "Timed Assessment",
    "stu_timer_sub": "Auto-submits on timer expiry.",
    "btn_edit_allocated_topics": "🎯 Allocated Topics List",
    "btn_forgot_password": "Forgot Password?",
    "btn_generate_pwd": "Auto-Generate",
    "btn_import_roster": "Import Roster Data",
    "btn_login_admin": "Login to Admin Portal",
    "btn_login_teacher": "Login to Teacher Portal",
    "btn_logout": "Logout",
    "btn_map_new_subject": "Map New Subject",
    "btn_new_submission": "New Submission",
    "btn_new_teacher_reg": "New Faculty? Register Here",
    "btn_open_admin": "Open Admin Portal",
    "btn_open_guidelines": "Read Guidelines",
    "btn_open_student": "Open Student Portal",
    "btn_open_teacher": "Open Teacher Portal",
    "btn_parse_mcq": "Generate Question Cards",
    "btn_print_qr": "Print QR Code",
    "btn_refresh_matrix": "Refresh Matrix",
    "btn_refresh_subs": "Refresh Submissions",
    "btn_return_submission": "← Return to Assignment Form",
    "btn_save_changes": "Save Changes",
    "btn_save_course": "Save Course & Class",
    "btn_save_evaluation": "Save Evaluation & Marks",
    "btn_save_mapping": "Save Subject & Assessment Mapping",
    "btn_submit_assessment": "Submit Assessment & Generate Official PDF",
    "btn_submit_reg": "Submit Faculty Registration",
    "btn_update_password": "Update Password",
    "btn_update_session": "Update Assessment Session",
    "btn_use_new_password": "Use This Password to Login Now",
    "btn_verify_profile": "Verify Profile & Open Exam Room",
    "btn_view_history_pdf": "View History & PDF Print",
    "btn_view_prev_subs": "View Past Submissions",
    "bulk_drawer_title": "Bulk Upload Students Class Roster",
    "bulk_import_header": "Paste Excel / CSV Roster Data (Format: Roll No | PRN | Student Name | Mobile | Email)",
    "bulk_paste_hint": "Note: You can copy tabular columns from Excel and paste here directly.",
    "card_admin_desc": "Institutional oversight: approve pending faculty registrations, manage department faculties, and audit university CIE records.",
    "card_admin_title": "Admin Portal",
    "card_guidelines_desc": "Explore standardized academic assessment types, grading weightages, university circulars, and assessment rules.",
    "card_guidelines_title": "Evaluation Guidelines",
    "card_student_desc": "Enter Teacher Code and PRN to view active assignments, submit answers online, attach files, and view graded scores.",
    "card_student_title": "Student Portal",
    "card_teacher_desc": "Manage classes, create custom assessments, map continuous evaluation types, grade submissions, and export master marksheets.",
    "card_teacher_title": "Teacher Portal",
    "change_pwd_help": "Enter your current login password and choose a new password (min 6 characters).",
    "cie_header_tag": "| Continuous Internal Evaluation",
    "course_form_new_title": "Add New Course & Class Definition",
    "course_panel_sub": "Define your teaching classes, semesters, program codes, course codes, credits, and internal marks. All dropdowns will automatically synchronize from here.",
    "course_panel_title": "Course & Class Master Setup",
    "created_sessions_header": "Active Assessment Sessions",
    "demo_creds": "Demo Login Credentials",
    "demo_login": "Quick Demo Credentials",
    "eval_panel_sub": "Grade student submissions, view submitted attachments, enter marks, and export master marksheets.",
    "eval_panel_title": "Submission Evaluation & Master CIE Matrix",
    "faculty_portal_tag": "Faculty Portal",
    "forgot_pwd_help": "Enter your registered faculty email address. A new secure password will be generated automatically for immediate login.",
    "gate_admin_badge": "1. Admin Access",
    "gate_admin_desc": "Institutional controls & faculty approvals",
    "gate_admin_sub": "System Oversight & Approvals",
    "gate_admin_title": "Admin Login",
    "gate_btn_open": "Open Portal →",
    "gate_student_badge": "3. Student Access",
    "gate_student_desc": "Verify identity, submit assessments & view results",
    "gate_student_sub": "Live Assignment & MCQ Room",
    "gate_student_title": "Student Portal",
    "gate_teacher_badge": "2. Faculty Access",
    "gate_teacher_desc": "Courses, roster, question papers & marks",
    "gate_teacher_sub": "Assessments & Marksheet Matrix",
    "gate_teacher_title": "Teacher Login",
    "guide_badge": "Continuous Internal Evaluation & Online Assessment System",
    "guide_dir_count": "Certified Methods",
    "guide_dir_sub": "Standardized internal evaluation modes and assessment parameters",
    "guide_dir_title": "Assessment Modes Directory",
    "guide_process_sub": "Smooth, quick, and structured digital workflows for faculty and students",
    "guide_process_title": "System Process & Workflow",
    "guide_sub": "A highly user-friendly, transparent, rapid, and 100% paperless modern internal evaluation and examination system for teachers and students.",
    "guide_title": "Continuous Internal Evaluation (CIE) & Online Examination Architecture",
    "guide_wf_student_badge": "4 Steps",
    "guide_wf_student_title": "Student Portal Workflow",
    "guide_wf_teacher_badge": "5 Steps",
    "guide_wf_teacher_title": "Teacher Portal Workflow",
    "header_sub_tagline": "<span class='block font-black text-slate-950 whitespace-nowrap'>A user-friendly, transparent, rapid & 100% paperless</span><span class='block font-bold text-slate-800 whitespace-nowrap'>internal evaluation & examination system for teachers & students.</span>",
    "hint_email_match": "Email must match the student email registered in the teacher's class roster.",
    "home_main_sub": "Academic guidelines, standard evaluation parameters, university regulations, and structured workflow principles.",
    "home_main_title": "Continuous Internal Evaluation (CIE) Guidelines & System Architecture",
    "invite_card_badge": "Active Faculty Credentials",
    "invite_card_sub": "Share your Teacher Code with your students so they can submit their internal assessments.",
    "lbl_academic_year": "Academic Year *",
    "lbl_admin_pass": "Admin Password *",
    "lbl_admin_user": "Admin Username or Email *",
    "lbl_allow_late": "Allow Late Submissions",
    "lbl_asm_topic_q": "Assignment Topic / Question *",
    "lbl_bulk_mcq_input": "Paste Questions (Format: Question? | Opt A | Opt B | Opt C | Opt D | Correct Opt)",
    "lbl_category_filter": "Filter by Type:",
    "lbl_class_filter": "Filter by Class:",
    "lbl_class_name": "Class / Program Name *",
    "lbl_college": "College Name *",
    "lbl_confirm_pwd": "Confirm New Password *",
    "lbl_course_code": "Course / Paper Code *",
    "lbl_course_title": "Course / Paper Title *",
    "lbl_credits": "Credits *",
    "lbl_curr_pwd": "Current Password *",
    "lbl_current_password": "Current / Temp Password",
    "lbl_custom_sub_title": "Custom Subject / Title (Other Class) *",
    "lbl_custom_subject": "Custom Subject Name",
    "lbl_deadline": "Submission Deadline",
    "lbl_designation": "Designation *",
    "lbl_division": "Division (Optional)",
    "lbl_email": "Email Address *",
    "lbl_enable_mcq": "Create MCQ Question Paper",
    "lbl_filter_classes": "Filter by Classes:",
    "lbl_gender": "Gender *",
    "lbl_group_asm": "Group / Collaborative Assessment",
    "lbl_internal_marks": "Total Internal Marks *",
    "lbl_main_topic_info": "Main Subject / General Topic",
    "lbl_marks_obtained": "Marks Obtained *",
    "lbl_max_marks": "Maximum Marks",
    "lbl_mobile": "Mobile Number (WhatsApp) *",
    "lbl_new_password": "Change / Reset Password",
    "lbl_new_pwd": "New Password *",
    "lbl_password": "Password *",
    "lbl_paste_roster_data": "Paste Roster Text (One student per line):",
    "lbl_prn": "Student PRN / Enrollment Number *",
    "lbl_prn_enter": "Student PRN / Enrollment Number *",
    "lbl_prog_code": "Program Code",
    "lbl_prog_name": "Program Name",
    "lbl_raw_student_data": "Student Data (RollNo, PRN, StudentName, Gender, Email, Mobile) *",
    "lbl_registered_email": "Registered Faculty Email *",
    "lbl_remarks": "Evaluator Remarks & Guidance:",
    "lbl_repeater_chk": "Repeater / ATKT Student",
    "lbl_roll_no": "Roll Number *",
    "lbl_select_class": "Select Class *",
    "lbl_select_mapped_subject": "Select Mapped Subject *",
    "lbl_select_mapped_type": "Select Mapped Assessment Component *",
    "lbl_select_master_course": "Auto-Fill from Master Courses:",
    "lbl_select_semester": "Semester *",
    "lbl_semester": "Semester *",
    "lbl_session_title": "Assessment Session Title *",
    "lbl_session_topic": "Assignment Topic / Question *",
    "lbl_status": "Status",
    "lbl_stream": "Faculty Stream *",
    "lbl_stu_typed_content": "Online Typed Answer / Report Content *",
    "lbl_student_email": "Student Email ID",
    "lbl_student_email_verify": "Registered Student Email ID *",
    "lbl_student_fullname": "Full Student Name *",
    "lbl_student_mobile": "Mobile Number",
    "lbl_student_name": "Student Full Name *",
    "lbl_subject": "Subject *",
    "lbl_teacher_code": "Teacher Code (User ID) *",
    "lbl_teacher_credentials_heading": "Faculty Login Credentials & Security",
    "lbl_teacher_email": "Email or Teacher Code *",
    "lbl_teacher_name": "Full Name (with Title) *",
    "lbl_university": "University Name *",
    "m_add_student_title": "Add Single Student to Roster",
    "m_admin_edit_t_title": "Edit Faculty Profile",
    "m_change_pwd_title": "Change Faculty Password",
    "m_edit_asm_title": "Edit Assessment Session",
    "m_edit_student_title": "Edit Student Details",
    "m_forgot_pwd_title": "Reset Teacher Password",
    "m_grading_title": "Student Assessment Evaluation & Grading",
    "m_reg_title": "Faculty Registration",
    "m_view_stopics_title": "Allocated Student Topics List",
    "mapping_panel_sub": "Map your teaching subjects, course codes, and select continuous university assessment patterns.",
    "mapping_panel_title": "Subject & Assessment Types Mapping",
    "mapping_step1_header": "Step 1: Course & Class Details",
    "mapping_step2_header": "Step 2: Select Internal Assessment Patterns & Marks",
    "master_courses_table_title": "Your Configured Teaching Courses & Classes",
    "matrix_panel_sub": "Consolidated marksheet of all assessment components per student.",
    "matrix_panel_title": "Continuous Internal Evaluation Marksheet",
    "mcq_auto_grade_notice": "Student submissions will be auto-evaluated and scores recorded in marksheet instantly.",
    "mcq_builder_sub": "Enter questions, 4 options, and select the correct answer.",
    "mcq_builder_title": "MCQ Question Paper Builder",
    "no_scan_notice": "<i class='fa-solid fa-lock mr-1'></i> No scanning / uploads required",
    "num_1": "1",
    "num_2": "2",
    "num_3": "3",
    "num_4": "4",
    "num_5": "5",
    "obj1_desc": "Holistic ongoing evaluation across individual tasks, group projects, and coursework throughout the semester.",
    "obj1_title": "Continuous & Collaborative Evaluation",
    "obj2_desc": "Verified student logins, digital submission audit trails, Devanagari Unicode PDF generation, and evaluator feedback.",
    "obj2_title": "100% Transparency & Audit-Ready",
    "obj3_desc": "Direct online submissions, automated MCQ scoring, and instant marksheet matrix sync without paperwork.",
    "obj3_title": "Paperless & Instant MCQ Auto-Grading",
    "obj4_desc": "Flexible support for diverse certified evaluation methods, video/notes study materials, QR notice boards, and email broadcast.",
    "obj4_title": "Multi-Format & Digital Resources",
    "obj_badge_1": "Objective 1",
    "obj_badge_2": "Objective 2",
    "obj_badge_3": "Objective 3",
    "obj_badge_4": "Objective 4",
    "p1_desc": "Ongoing assessment throughout the semester rather than relying solely on end-semester exams.",
    "p1_title": "Continuous & Formative",
    "p2_desc": "Pre-defined evaluation criteria shared with students to maintain absolute objectivity and clarity.",
    "p2_title": "Transparent & Rubric Based",
    "p3_desc": "Secured records with unique Teacher Codes, student enrollment validation, and digital record exports.",
    "p3_title": "Confidential & Tamper-Proof",
    "p4_desc": "Instant generation of NAAC / University compliant internal assessment marksheets and PDF records.",
    "p4_title": "Audit & Compliance Ready",
    "pending_approvals_title": "Pending Faculty Registration Approvals",
    "ph_casm_title": "e.g. B.A. III Geography Home Assignment (Sem V)",
    "ph_casm_topic": "e.g. Explain the physiographic divisions of India and coastal landforms in detail.",
    "ph_course_code": "e.g. GEO-301",
    "ph_course_name": "e.g. Physical Geography of India",
    "ph_custom_subject": "Enter custom subject name",
    "ph_grade_remarks": "e.g. Well researched analysis. Focus more on geomorphic classifications.",
    "ph_m_stu_class": "e.g. B.A. III or B.Sc. II",
    "ph_m_stu_name": "e.g. Ramesh Shankar Patil",
    "ph_m_stu_roll": "e.g. 101",
    "ph_mobile": "9876543210",
    "ph_prn": "e.g. 2024016400012345",
    "ph_reg_college": "e.g. Rajeshree Shahu Arts & Commerce College, Rukadi",
    "ph_reg_name": "e.g. Dr. Rajekhan Shikalgar",
    "ph_reg_univ": "e.g. Shivaji University, Kolhapur",
    "ph_roster_class": "e.g. B.A. III or B.Sc. II",
    "ph_roster_raw": "101, 2024016400012345, Ramesh Patil, Male, ramesh@gmail.com, 9876543210\n102, 2024016400012346, Anita Shinde, Female, anita@gmail.com, 9876543211",
    "ph_stu_email": "student@gmail.com",
    "ph_student_email": "e.g. amit@student.in",
    "ph_teacher_code": "e.g. TCH-RAJ-01",
    "ph_teacher_email": "e.g. rajekhan@rajekhan.in or TCH-RAJ-01",
    "ph_um_class": "e.g. B.A. III or M.A. I",
    "pwd_reset_success": "Password Reset Successful!",
    "reg_approval_notice": "Registration requires administrative approval before your Teacher Code is activated for assessment creation.",
    "roster_panel_sub": "Manage class lists, student roll numbers, and enrollment PRNs for internal evaluation.",
    "roster_panel_title": "Student Class Roster Management",
    "s_inst_1": "Enter the designated Teacher Code provided by your subject instructor.",
    "s_inst_2": "Input your official PRN / Enrollment Number and your registered email address.",
    "s_inst_3": "Upon verified match, access active class assignments, write answers online, and receive digital receipts.",
    "sessions_panel_sub": "Create assignments, seminar topics, practicals, project tasks, and set deadlines.",
    "sessions_panel_title": "Assessment Sessions Management",
    "step1_badge": "Phase 1",
    "step1_desc": "Faculty registers, configures discipline, semester, academic year, and assigns continuous assessment patterns per syllabus.",
    "step1_title": "1. Faculty Subject & Class Mapping",
    "step2_badge": "Phase 2",
    "step2_desc": "Faculty uploads class roster with Roll, PRN, Name. Students authenticate seamlessly via PRN + Teacher Code.",
    "step2_title": "2. Student Roster Import & Verification",
    "step3_badge": "Phase 3",
    "step3_desc": "Teacher announces topic and deadline. Students draft and submit answers online with rich text and file uploads.",
    "step3_title": "3. Assignment Creation & Submission",
    "step4_badge": "Phase 4",
    "step4_desc": "Teacher evaluates submissions, enters marks & feedback. Generates printable marksheets and digitally stamped PDFs.",
    "step4_title": "4. Rubric Evaluation & Verified Records",
    "stu_connect_sub": "Enter your course Teacher Code and your official PRN to verify profile and write assignments.",
    "stu_connect_title": "Student Examination & Submission Room",
    "stu_declaration": "I hereby declare that this assignment submission is my own original academic work.",
    "stu_mcq_exam_title": "Online MCQ Examination Room",
    "stu_step1_title": "1. Select Active Assessment Session",
    "stu_step2_title": "2. Compose & Submit Your Work",
    "student_inst_badge": "Guidelines",
    "student_inst_title": "Student Guidelines & Instructions",
    "sub_select_master_course": "Select any course you configured in Tab 1 to auto-fill all course and class fields.",
    "subs_history_sub": "Track submission status, timestamps, awarded marks, and evaluator feedback.",
    "svc_summary_badge": "100% Paperless & NEP 2020 Compliant",
    "svc_summary_sub": "Unified modern academic toolkit for faculty members and enrolled students",
    "svc_summary_title": "Comprehensive System Capabilities & Modern Services",
    "svc1_desc": "Bilingual (Marathi/English) Speech-to-Text voice typing with 10-second automatic draft protection.",
    "svc1_title": "Marathi Voice Typing",
    "svc2_desc": "Live countdown exam timer for Unit Tests/Quizzes and automated scoring.",
    "svc2_title": "MCQ & Live Timer",
    "svc3_desc": "Dynamic QR code on every PDF; instant 100% authenticity verification via mobile camera.",
    "svc3_title": "Digital Verification QR",
    "svc4_desc": "Consolidated semester CSV grade sheet and complete archive of student assessed PDFs.",
    "svc4_title": "1-Click Semester ZIP",
    "svc5_desc": "Live Red/Green toggle button to release or withhold student marks on dashboard & PDF.",
    "svc5_title": "1-Click Marks Control",
    "svc6_desc": "HarfBuzz complex Marathi font shaping, NEP 2020 and 100% NAAC audit compliant.",
    "svc6_title": "Devanagari PDF & NAAC Ready",
    "swf_1_desc": "Login using official PRN number and registered email address to connect with enrolled faculty.",
    "swf_1_title": "Verified Secure Login",
    "swf_2_desc": "Access class assignments, individual topics, MCQ quizzes, Drive/YouTube references, and real-time notices.",
    "swf_2_title": "Active Tasks, Study Materials & Notices",
    "swf_3_desc": "Type answers directly in the online rich editor or take timed MCQ tests with instant evaluation.",
    "swf_3_title": "Online Answer Submission & MCQ Test",
    "swf_4_desc": "Track submission status, dismiss completed notices, and print certified submission receipts without marks disclosure.",
    "swf_4_title": "Submission History & Certified Print Receipt",
    "t_inst_1": "Login using your registered email address or assigned Teacher Code (e.g. TCH-GEO-65).",
    "t_inst_2": "New faculty must click 'Teacher Registration'; credentials will be dispatched upon administrative approval.",
    "t_inst_3": "Configure course master, manage student rosters, and create assignment/MCQ exam sessions.",
    "tab_admin": "Admin Portal",
    "tab_guidelines": "Guidelines",
    "tab_home": "Home",
    "tab_login": "Login",
    "tab_student": "Student Portal",
    "tab_teacher": "Teacher Portal",
    "teacher_inst_badge": "Guidelines",
    "teacher_inst_title": "Faculty Guidelines & Instructions",
    "teacher_login_sub": "Secure access for college faculties to manage classes, assessments, and continuous internal evaluations.",
    "teacher_login_title": "Teacher Portal Login",
    "th_academic_year": "Academic Year",
    "th_actions": "Actions",
    "th_category": "Category",
    "th_class": "Class",
    "th_class_div": "Class & Division",
    "th_class_sem": "Class / Sem",
    "th_code_date": "Teacher Code & Reg Date",
    "th_college_univ": "College & University",
    "th_comp_marks": "Internal Marks",
    "th_comp_type": "Assessment Type",
    "th_contact": "Contact",
    "th_course_code_name": "Course Code & Name",
    "th_course_name": "Course Name",
    "th_credits": "Credits",
    "th_date": "Date Submitted",
    "th_deadline": "Deadline",
    "th_decision": "Approval Action",
    "th_email_mobile": "Email & Mobile",
    "th_faculty": "Faculty Details",
    "th_gender": "Gender",
    "th_internal_marks": "Internal Max Marks",
    "th_login_password": "Login Password",
    "th_marks": "Marks Awarded",
    "th_name": "Student Name",
    "th_pdf_print": "Official PDF / Print",
    "th_prn": "PRN / Enrollment No",
    "th_prog_stream": "Program & Stream",
    "th_roll": "Roll No",
    "th_roll_no": "Roll No",
    "th_session_title": "Session Title",
    "th_status": "Status",
    "th_stream_subject": "Stream & Subject",
    "th_student_name": "Student Name",
    "th_student_roll": "Student / Roll",
    "th_subject": "Subject",
    "th_subject_paper": "Subject / Paper",
    "th_submission_id": "Submission ID",
    "th_subs_count": "Submissions",
    "th_teacher_code_id": "Teacher Code / User ID",
    "th_teacher_desig": "Teacher Name & Designation",
    "th_topic": "Topic / Question",
    "th_type": "Type",
    "ttab_courses_sub": "Course, Class & CIE Setup",
    "ttab_courses_title": "Course & CIE Mapping",
    "ttab_eval_sub": "Grade Submissions & Matrix",
    "ttab_eval_title": "Evaluation & Marks",
    "ttab_roster_sub": "Class Lists & Students (Add Here)",
    "ttab_roster_title": "Student Roster",
    "ttab_sessions_sub": "Create & Manage Tasks",
    "ttab_sessions_title": "Assessment Sessions",
    "twf_1_desc": "Configure teaching classes, semesters, courses, and total internal marks.",
    "twf_1_title": "Course & Class Setup",
    "twf_2_desc": "Select evaluation components (Assignments, MCQs, Seminars, Projects) and set mark distributions.",
    "twf_2_title": "Assessment & Component Mapping",
    "twf_3_desc": "Import class lists via Excel/CSV, allocate individual student topics, and form project groups with leaders.",
    "twf_3_title": "Student Class Roster & Groups",
    "twf_4_desc": "Publish prompts, build MCQ papers with auto-grading, attach Drive/YouTube study materials, and broadcast email notices.",
    "twf_4_title": "Session, MCQ & Study Material Creation",
    "twf_5_desc": "Grade online submissions with group sync, view auto-graded MCQs, and generate consolidated Devanagari PDF marksheets.",
    "twf_5_title": "Evaluation, Group Sync & Marksheet",
    "verified_identity_badge": "Verified Student Profile",
    "wf_title": "Continuous Assessment Lifecycle & Process Flow",
    "ttab_dashboard_title": "Dashboard Overview",
    "ttab_dashboard_sub": "Analytics & KPIs",
    "teacher_dash_overview_title": "Teacher Performance & Academic Overview",
    "teacher_dash_overview_sub": "Comprehensive real-time summary of configured courses, enrolled students, active CIE assessments, and evaluation progress.",
    "btn_refresh_stats": "Refresh Stats",
    "stat_total_courses": "Courses & Classes",
    "stat_total_students": "Total Students",
    "stat_total_assessments": "CIE Sessions",
    "stat_total_submissions": "Submissions",
    "stat_evaluated": "Evaluated",
    "stat_pending_eval": "Pending",
    "eval_progress_title": "Evaluation Completion Rate",
    "btn_open_evaluation": "Open Grading",
    "quick_actions_title": "Quick Academic Actions",
    "class_breakdown_title": "Class-wise Academic Breakdown",
    "recent_assessments_title": "Recent Assessment Sessions",
    "recent_submissions_title": "Recent Student Submissions",
    "th_class_sem": "Class & Semester",
    "th_subject_code": "Subject & Code",
    "th_students": "Students",
    "th_assessments": "Assessments",
    "th_submissions": "Submissions",
    "admin_tab_overview": "Admin Overview",
    "admin_tab_overview_sub": "System Metrics & Total Stats",
    "admin_tab_pending": "Pending Approvals",
    "admin_tab_pending_sub": "Faculty Verification Queue",
    "admin_tab_approved": "Approved Faculty",
    "admin_tab_approved_sub": "Faculty Roster & Details",
    "admin_summary_title": "System & Institutional Analytics Summary",
    "admin_summary_sub": "Consolidated total metrics of faculty members, enrolled students, continuous assessments, and evaluation activity.",
    "stat_approved_teachers": "Approved Faculty",
    "stat_pending_teachers": "Pending Requests",
    "stat_total_students_admin": "Total Students",
    "stat_total_asm_admin": "CIE Sessions",
    "stat_total_subs_admin": "Submissions",
    "faculty_stream_dist": "Faculty Stream Distribution",
    "recent_registrations_title": "Recent Faculty Registrations",
    "ttab_search_title": "Student Search",
    "ttab_search_sub": "Search Across Classes",
    "ttab_announcements_title": "Announcements",
    "ttab_announcements_sub": "Email & Notice Board",
    "teacher_student_search_title": "Student Global Search & Academic Lookup",
    "teacher_student_search_sub": "Search enrolled students across all assigned classes by Name, PRN, Roll Number, Email or Contact.",
    "teacher_announcements_title": "Teacher Announcements & Student Notice Board",
    "teacher_announcements_sub": "Publish assignments/class announcements. Automatic email notices will be dispatched to students in the selected class.",
    "admin_tab_faculty_search": "Faculty Search",
    "admin_tab_faculty_search_sub": "Search Across College",
    "admin_tab_announcements": "News & Notices",
    "admin_tab_announcements_sub": "Faculty Circulars & Notices",
    "admin_faculty_search_title": "Faculty Global Search & College Directory",
    "admin_faculty_search_sub": "Search registered and pending faculty members across faculties, streams, subjects, and colleges.",
    "lbl_num_faculty": "Number of Faculty:",
    "lbl_enable_study_materials": "📚 Add Study Notes, Materials & Video Links",
    "study_materials_builder_title": "Assessment Study Materials & Video Resources",
    "stu_materials_title": "Study Materials & Reference Resources",
    "btn_add_material_link": "+ Add Resource Link",
    "btn_broadcast_announcement": "Publish & Send Email",
    "published_notices_header": "Published Announcements & Email Dispatch Logs",
    "lbl_ann_target_class": "Target Class",
    "lbl_ann_title": "Notice Title / Subject",
    "lbl_ann_message": "Announcement Details / Message Body",
    "lbl_ann_ref_url": "Reference Material Link / Video URL (Optional)",
    "stu_dash_title": "Student Assignment Dashboard",
    "stu_dash_sub": "All Mapped Continuous Internal Evaluations",
    "stu_tab_dashboard": "Dashboard",
    "stu_tab_dashboard_sub": "Summary & Progress",
    "stu_tab_assignments": "Assignments",
    "stu_tab_notices": "Notices",
    "stu_tab_notes": "Study Material",
    "stu_tab_history": "Submission History",
    "stu_kpi_total_lbl": "Total Assigned",
    "stu_kpi_total_sub": "Total Course Tasks",
    "stu_kpi_submitted_lbl": "Submitted",
    "stu_kpi_submitted_sub": "Submitted & Done",
    "stu_kpi_pending_lbl": "Pending",
    "stu_kpi_pending_sub": "Tasks Remaining",
    "stu_kpi_teachers_lbl": "Faculty & Subjects",
    "stu_kpi_teachers_sub": "Enrolled Faculty",
    "stu_kpi_materials_lbl": "Study Material",
    "stu_kpi_materials_sub": "Notes & References",
    "stu_progress_title": "CIE Completion Status",
    "stu_progress_sub": "Complete and submit all continuous internal evaluation tasks on time.",
    "stu_pending_tasks_title": "Active Tasks to Solve",
    "btn_view_all": "View All",
    "btn_delete": "Delete",
    "lbl_deadline": "Deadline",
    "stu_enrolled_teachers_title": "Enrolled Faculty & Classes",
    "stu_assignments_title": "Continuous Internal Evaluations",
    "stu_assignments_sub": "Click any assessment card to solve and submit online.",
    "stu_filter_all": "All",
    "stu_filter_pending": "Pending",
    "stu_filter_submitted": "Submitted",
    "stu_back_to_assignments": "Back to Assignments List",
    "stu_announcements_title": "Teacher Announcements & Notice Board",
    "stu_announcements_sub": "Official notices published by your course teachers.",
    "stu_materials_title": "Study Materials & Reference Resources",
    "stu_materials_sub": "Topic-wise and paper-wise study notes, reference videos, and resources.",
    "stu_history_title": "Submission History & PDF Print",
    "stu_history_sub": "View evaluation status of submitted assignments and download official PDF copy.",
    "stu_th_submission_id": "Submission ID",
    "stu_th_class_subject": "Class & Subject",
    "stu_th_assessment_type": "Assessment Type",
    "stu_th_topic": "Topic / Assignment",
    "stu_th_submitted_date": "Submitted Date",
    "stu_th_faculty": "Concerned Faculty",
    "stu_th_status": "Evaluation Status",
    "stu_th_action": "Official PDF / Print",
    "btn_back_to_login": "← Back to Login",
    "btn_send_admin_pwd_email": "Send Password to Email",
    "btn_send_pwd_email": "Send Password to Email",
    "admin_forgot_pwd_help": "Enter your admin username or registered email address. A new secure password will be generated and dispatched directly to your registered administrator email.",
    "m_admin_forgot_pwd_title": "Reset Admin Password",
    "lbl_admin_user_or_email": "Admin Username or Registered Email *",
    "admin_pwd_reset_success": "Admin Password Reset Successful!",
    "admin_pwd_sent_to_email_notice": "For security reasons, your new administrator password has been dispatched directly to your registered email address. Please check your inbox and login using that password.",
    "pwd_sent_to_email_notice": "For security reasons, your new password has been dispatched directly to your registered faculty email address. Please check your inbox and login using that password.",
    "faculty_stream_dist": "Faculty Stream Distribution & Subject Summary",
    "recent_registrations_title": "Recent Faculty Registrations",
    "pending_approvals_title": "Pending Teacher Approval Requests",
    "pending_approvals_sub": "Review new registrations and academic year validity extension requests.",
    "filter_appr_all": "All Requests",
    "filter_appr_new": "✨ New Registrations",
    "filter_appr_update": "🔄 Validity Renewals",
    "btn_bulk_approve": "Bulk Approve",
    "btn_bulk_delete": "Bulk Delete",
    "th_type_code_date": "Type, Code & Date",
    "th_validity_requested": "Validity Period",
    "lbl_validity": "Validity:",
    "btn_extend_validity": "Extend Validity",
    "m_extend_validity_title": "Academic Year Validity Renewal",
    "lbl_validity_cycle": "Standard Academic Cycle: 1 June to 31 May",
    "extend_validity_expl": "Teacher accounts are valid for 1 academic year (1 June – 31 May). Renewal requests for the upcoming academic year are reviewed and approved by the central Administrator.",
    "lbl_curr_validity": "Current Validity Period",
    "lbl_req_year": "Request Extension For",
    "btn_send_extension_req": "Send Renewal Request",
    "teacher_student_search_title": "Student Global Search & Academic Lookup",
    "teacher_student_search_sub": "Filter enrolled students by Name, PRN, Stream, Subject, College, Class, and University.",
    "stream_summary_title": "Subject-Wise Directory & Summary",
    "stream_summary_sub": "Detailed breakdown of subjects, teachers, course masters, and students for this stream.",
    "admin_tab_course_cie": "Master Mapping",
    "admin_tab_course_cie_sub": "Streams, Subjects, Classes & CIE",
    "admin_course_cie_title": "Master Course & CIE Assessment Mapping",
    "admin_course_cie_sub": "Direct management of Faculty Streams, Subjects, Classes, and CIE Assessment Types. Changes apply immediately across all portals.",
    "btn_reset_master": "Reset to Defaults",
    "btn_refresh_data": "Refresh Data",
    "mm_tab_streams": "Faculty Streams",
    "mm_tab_subjects": "Master Subjects",
    "mm_tab_classes": "Master Classes",
    "mm_tab_types": "CIE Assessment Types",
    "mm_add_stream_title": "Add New Faculty Stream / Discipline",
    "mm_lbl_stream_name": "Stream Name *",
    "mm_lbl_display_order": "Display Order",
    "btn_add_stream": "Add Stream",
    "mm_th_id": "ID",
    "mm_th_stream_name": "Faculty Stream Name",
    "mm_th_order": "Order",
    "mm_th_status": "Status",
    "mm_th_actions": "Actions",
    "mm_add_subject_title": "Add New Master Subject to Stream",
    "mm_lbl_select_stream": "Select Faculty Stream *",
    "mm_lbl_subject_name": "Subject Name *",
    "btn_add_subject": "Add Subject",
    "mm_filter_sub_lbl": "Filter Subjects by Stream:",
    "mm_all_streams": "All Streams",
    "mm_total_subjects": "Total Subjects:",
    "mm_th_stream": "Faculty Stream",
    "mm_th_subject_name": "Subject Name",
    "mm_add_class_title": "Add New Master Class to Stream",
    "mm_lbl_class_name": "Class Name *",
    "btn_add_class": "Add Class",
    "mm_filter_cls_lbl": "Filter Classes by Stream:",
    "mm_total_classes": "Total Classes:",
    "mm_th_class_name": "Class Name",
    "mm_add_type_title": "Add New CIE Assessment Type",
    "mm_lbl_type_name": "Assessment Name *",
    "mm_lbl_type_desc": "Description",
    "mm_lbl_type_nature": "Assessment Nature",
    "mm_opt_individual": "Individual Assessment",
    "mm_opt_group": "Group Assessment",
    "btn_add_type": "Add Assessment Type",
    "mm_th_type_name": "Assessment Type",
    "mm_th_type_desc": "Description",
    "mm_th_nature": "Nature",
    "modal_edit_stream_title": "Edit Faculty Stream",
    "modal_edit_subject_title": "Edit Master Subject",
    "modal_edit_class_title": "Edit Master Class",
    "modal_edit_type_title": "Edit CIE Assessment Type",
    "lbl_is_active": "Is Active / Enabled",
    "btn_edit_action": "Edit",
    "btn_delete_action": "Delete",
    "status_badge_active": "Active",
    "status_badge_disabled": "Disabled",
    "badge_nature_group": "Group",
    "badge_nature_individual": "Individual",
    "no_streams_found": "No faculty streams available.",
    "no_subjects_found": "No subjects found in this stream.",
    "no_classes_found": "No classes found in this stream.",
    "no_types_found": "No CIE assessment types available."
  },
  mr: {
    "header_user_manual_btn": "वापरकर्ता पुस्तिका (User Manual)",
    "active_mappings_header": "सक्रिय विषय व मूल्यमापन रचना",
    "admin_dash_sub": "नवीन शिक्षक नोंदणी मंजूर करा, शिक्षक कोड व्यवस्थापित करा आणि सर्व मूल्यमापन अभिलेख तपासा.",
    "admin_dash_title": "महाविद्यालयीन प्रशासन व शिक्षक नोंदणी व्यवस्थापन",
    "admin_inst_desc": "हा कक्ष केवळ अधिकृत मुख्य प्रशासकांसाठी राखीव आहे. शिक्षक नोंदणी मंजुरी, विभाग व्यवस्थापन व अंतर्गत परीक्षा तपासणीचे अधिकार येथे उपलब्ध आहेत.",
    "admin_inst_title": "प्रशासकीय सूचना (Admin Notice)",
    "admin_login_sub": "विभागप्रमुख, प्राचार्य व परीक्षा समन्वयकांसाठी पर्यवेक्षण मंच.",
    "admin_login_title": "प्रशासक लॉगिन",
    "app_title": "सातत्यपूर्ण अंतर्गत मूल्यमापन व्यवस्थापन प्रणाली (CIEMS)",
    "approved_teachers_title": "मंजूर व सक्रिय प्राध्यापक सूची",
    "badge_ugc_nep": "यूजीसी व राष्ट्रीय शैक्षणिक धोरण (NEP 2020) सुसंगत",
    "btn_add_master_course": "+ नवीन वर्ग व कोर्स जोडा",
    "btn_add_mcq_q": "+ नवीन प्रश्न जोडा",
    "btn_add_student": "एक विद्यार्थी जोडा",
    "btn_auto_generate_pwd": "नवीन पासवर्ड आपोआप तयार करा",
    "btn_bulk_import": "एकाचवेळी अनेक विद्यार्थी जोडा (Bulk)",
    "btn_bulk_paste_mcq": "प्रश्नांची यादी पेस्ट करा (Bulk Import)",
    "btn_cancel": "रद्द करा",
    "btn_change_password": "पासवर्ड बदला",
    "btn_close": "बंद करा",
    "btn_copy_link": "विद्यार्थी लिंक कॉपी करा",
    "btn_create_session": "नवीन असाइनमेंट सत्र तयार करा",
    "btn_custom_class": "+ इतर / नवीन वर्ग",
    "btn_disconnect": "बाहेर पडा (Disconnect)",
    "btn_do_import": "विद्यार्थी माहिती समाविष्ट करा",
    "btn_download_matrix_csv": "गुणपत्रिका CSV डाउनलोड करा",
    "btn_download_archive_zip": "१-क्लिक संपूर्ण सेमिस्टर ZIP संचिका",
    "lbl_duration_minutes": "वेळ मर्यादा (मिनिटे)",
    "stu_timer_title": "परीक्षा कालावधी (Timed Assessment)",
    "stu_timer_sub": "वेळ संपल्यावर उत्तर आपोआप सबमिट होईल.",
    "btn_edit_allocated_topics": "🎯 विद्यार्थीनिहाय वाटप यादी",
    "btn_forgot_password": "पासवर्ड विसरलात?",
    "btn_generate_pwd": "नवीन पासवर्ड जनरेट करा",
    "btn_import_roster": "हजेरी पट आयात करा",
    "btn_login_admin": "प्रशासक कक्षात प्रवेश करा",
    "btn_login_teacher": "शिक्षक कक्षात प्रवेश करा",
    "btn_logout": "लॉगआउट",
    "btn_map_new_subject": "नवीन विषय मॅप करा",
    "btn_new_submission": "नवीन सबमिशन",
    "btn_new_teacher_reg": "नवीन शिक्षक? येथे नोंदणी करा",
    "btn_open_admin": "प्रशासक कक्ष उघडा",
    "btn_open_guidelines": "मार्गदर्शक तत्त्वे वाचा",
    "btn_open_student": "विद्यार्थी कक्ष उघडा",
    "btn_open_teacher": "शिक्षक कक्ष उघडा",
    "btn_parse_mcq": "प्रश्न तयार करा",
    "btn_print_qr": "क्युआर कोड प्रिंट करा",
    "btn_refresh_matrix": "मॅट्रिक्स ताजी करा",
    "btn_refresh_subs": "यादी ताजी करा",
    "btn_return_submission": "← मुख्य परीक्षा कक्षाकडे परत जा",
    "btn_save_changes": "बदल जतन करा",
    "btn_save_course": "वर्ग व कोर्स जतन करा",
    "btn_save_evaluation": "गुण व मूल्यमापन जतन करा",
    "btn_save_mapping": "विषय व मूल्यमापन मॅपिंग जतन करा",
    "btn_submit_assessment": "असाइनमेंट ऑनलाइन सादर करा व PDF मिळवा",
    "btn_submit_reg": "शिक्षक नोंदणी सादर करा",
    "btn_update_password": "पासवर्ड अद्यतनित करा",
    "btn_update_session": "असाइनमेंट अद्यतनित करा",
    "btn_use_new_password": "या पासवर्डने आताच लॉगिन करा",
    "btn_verify_profile": "ओळख पडताळा व परीक्षा कक्ष उघडा",
    "btn_view_history_pdf": "इतिहास व PDF प्रिंट पहा",
    "btn_view_prev_subs": "पूर्वी सादर केलेली उत्तरे पहा",
    "bulk_drawer_title": "विद्यार्थ्यांची यादी एकदम अपलोड करा",
    "bulk_import_header": "Excel / CSV हजेरी पट माहिती पेस्ट करा (स्वरूप: रोल नं | PRN | विद्यार्थ्याचे नाव | मोबाईल | ईमेल)",
    "bulk_paste_hint": "टीप: आपण एक्सेल (Excel) मधील रकाने थेट कॉपी करून येथे पेस्ट करू शकता.",
    "card_admin_desc": "महाविद्यालयीन स्तरावर शिक्षक नोंदणी मंजुरी, प्राध्यापक व्यवस्थापन व अंतर्गत परीक्षा अभिलेख तपासणी.",
    "card_admin_title": "प्रशासक कक्ष (Admin Portal)",
    "card_guidelines_desc": "मूल्यमापन प्रकार, भारांश, विद्यापीठ परिपत्रके आणि सातत्यपूर्ण अंतर्गत मूल्यमापनाचे सर्व नियम वाचा.",
    "card_guidelines_title": "मूल्यमापन मार्गदर्शक तत्त्वे",
    "card_student_desc": "शिक्षक कोड व पीआरएन नोंदवून सक्रिय असाइनमेंट्स पहा, ऑनलाइन उत्तरे सादर करा व प्राप्त गुण तपासा.",
    "card_student_title": "विद्यार्थी कक्ष (Student Portal)",
    "card_teacher_desc": "वर्ग व्यवस्थापन, स्वाध्याय निर्मिती, मूल्यमापन प्रकार मॅपिंग, गुणदान आणि संपूर्ण गुणपत्रिका डाउनलोड करा.",
    "card_teacher_title": "शिक्षक कक्ष (Teacher Portal)",
    "change_pwd_help": "आपला सध्याचा पासवर्ड टाका व नवीन सुरक्षित पासवर्ड सेट करा (किमान ६ अक्षरे).",
    "cie_header_tag": "| सातत्यपूर्ण अंतर्गत मूल्यमापन (CIE)",
    "course_form_new_title": "नवीन वर्ग व कोर्स माहिती भरा",
    "course_panel_sub": "आपण शिकवत असलेल्या वर्गांची, सेमिस्टर, प्रोग्राम कोड, कोर्स कोड, क्रेडिट्स व अंतर्गत गुणांची मास्टर नोंदणी करा. यामुळे सर्व ठिकाणी ड्रॉपडाउनमध्ये एकवाक्यता राहील.",
    "course_panel_title": "वर्ग व अभ्यासक्रम मास्टर रचना (Course & Class Master)",
    "created_sessions_header": "सक्रिय मूल्यमापन सत्रे",
    "demo_creds": "डेमो लॉगिन माहिती",
    "demo_login": "प्रात्यक्षिक लॉगिन माहिती (Demo)",
    "eval_panel_sub": "विद्यार्थ्यांची उत्तरे तपासा, फायली पहा, गुण व अभिप्राय नोंदवा आणि एकत्रित गुणपत्रिका तयार करा.",
    "eval_panel_title": "सादरीकरण मूल्यमापन व अंतिम CIE मॅट्रिक्स",
    "faculty_portal_tag": "शिक्षक कक्ष (Faculty Portal)",
    "forgot_pwd_help": "आपला नोंदणीकृत प्राध्यापक ईमेल प्रविष्ट करा. त्वरित लॉगिनसाठी नवीन सुरक्षित पासवर्ड आपोआप तयार होईल.",
    "gate_admin_badge": "१. प्रशासक प्रवेश",
    "gate_admin_desc": "महाविद्यालयीन व प्रशासकीय नियंत्रण कक्ष",
    "gate_admin_sub": "प्रशासकीय नियंत्रण व मंजुरी कक्ष",
    "gate_admin_title": "प्रशासक लॉगिन",
    "gate_btn_open": "पोर्टल उघडा →",
    "gate_student_badge": "३. विद्यार्थी प्रवेश",
    "gate_student_desc": "ओळख पडताळणी, परीक्षा व निकाल कक्ष",
    "gate_student_sub": "थेट अंतर्गत परीक्षा व स्वाध्याय कक्ष",
    "gate_student_title": "विद्यार्थी पोर्टल",
    "gate_teacher_badge": "२. शिक्षक प्रवेश",
    "gate_teacher_desc": "वर्ग, विषय, प्रश्नपत्रिका व अंतर्गत गुणदान",
    "gate_teacher_sub": "मूल्यमापन व गुणतक्ता निर्मिती",
    "gate_teacher_title": "शिक्षक लॉगिन",
    "guide_badge": "सातत्यपूर्ण अंतर्गत मूल्यमापन व ऑनलाइन परीक्षा प्रणाली",
    "guide_dir_count": "प्रमाणित पद्धती",
    "guide_dir_sub": "सातत्यपूर्ण अंतर्गत मूल्यमापनाचे प्रमाणित प्रकार",
    "guide_dir_title": "मूल्यमापन पद्धतींची सूची",
    "guide_process_sub": "शिक्षक व विद्यार्थ्यांसाठी सुलभ आणि जलद डिजिटल कार्यपद्धती",
    "guide_process_title": "कार्यप्रणाली व टप्पे",
    "guide_sub": "शिक्षकांसाठी आणि विद्यार्थ्यांसाठी अत्यंत सुलभ, पारदर्शक, जलद व १००% कागदविरहित आधुनिक सातत्यपूर्ण अंतर्गत मूल्यमापन व ऑनलाइन परीक्षा व्यवस्थापन प्रणाली.",
    "guide_title": "सातत्यपूर्ण अंतर्गत मूल्यमापन व ऑनलाइन परीक्षा प्रणाली",
    "guide_wf_student_badge": "४ सोपे टप्पे",
    "guide_wf_student_title": "विद्यार्थी पोर्टल कार्यप्रणाली",
    "guide_wf_teacher_badge": "५ सोपे टप्पे",
    "guide_wf_teacher_title": "शिक्षक पोर्टल कार्यप्रणाली",
    "header_sub_tagline": "<span class='block font-black text-slate-950 whitespace-nowrap'>अत्यंत सुलभ, पारदर्शक, जलद व १००% कागदविरहित</span><span class='block font-bold text-slate-800 whitespace-nowrap'>सातत्यपूर्ण अंतर्गत मूल्यमापन व्यवस्थापन प्रणाली.</span>",
    "hint_email_match": "हा ईमेल शिक्षकांनी रोस्टरमध्ये नोंदवलेल्या ईमेलशी जुळणे आवश्यक आहे.",
    "home_main_sub": "शैक्षणिक मार्गदर्शक तत्त्वे, मानक मूल्यमापन निकष, विद्यापीठ नियमावली आणि संरचित कार्यपद्धती.",
    "home_main_title": "सातत्यपूर्ण अंतर्गत मूल्यमापन (CIE) मार्गदर्शक तत्त्वे व कार्यप्रणाली",
    "invite_card_badge": "सक्रिय शिक्षक माहिती",
    "invite_card_sub": "हा शिक्षक कोड तुमच्या विद्यार्थ्यांना द्या जेणेकरून ते त्यांची उत्तरे थेट सादर करू शकतील.",
    "lbl_academic_year": "शैक्षणिक वर्ष *",
    "lbl_admin_pass": "प्रशासक पासवर्ड *",
    "lbl_admin_user": "प्रशासक युझरनेम *",
    "lbl_allow_late": "अंतिम तारखेनंतरही सबमिशन स्वीकारायचे का?",
    "lbl_asm_topic_q": "असाइनमेंट विषय / प्रश्न *",
    "lbl_bulk_mcq_input": "प्रश्नांची यादी पेस्ट करा (रचना: प्रश्न? | पर्याय १ | पर्याय २ | पर्याय ३ | पर्याय ४ | बरोबर पर्याय)",
    "lbl_category_filter": "प्रकारानुसार फिल्टर:",
    "lbl_class_filter": "वर्गानुसार फिल्टर:",
    "lbl_class_name": "वर्ग / अभ्यासक्रम नाव *",
    "lbl_college": "महाविद्यालयाचे नाव *",
    "lbl_confirm_pwd": "नवीन पासवर्ड पुन्हा प्रविष्ट करा *",
    "lbl_course_code": "विषय / पेपर कोड *",
    "lbl_course_title": "विषय / पेपर शीर्षक *",
    "lbl_credits": "क्रेडिट्स (Credits) *",
    "lbl_curr_pwd": "सध्याचा पासवर्ड *",
    "lbl_current_password": "सध्याचा पासवर्ड",
    "lbl_custom_sub_title": "इतर / नवीन विषयाचे नाव *",
    "lbl_custom_subject": "इतर विषयाचे नाव",
    "lbl_deadline": "सादर करण्याची अंतिम तारीख",
    "lbl_designation": "पदनाम (Designation) *",
    "lbl_division": "तुकडी (ऐच्छिक)",
    "lbl_email": "ईमेल पत्ता *",
    "lbl_enable_mcq": "बहुपर्यायी प्रश्नपत्रिका तयार करा (MCQ)",
    "lbl_filter_classes": "वर्गानुसार फिल्टर निवडा:",
    "lbl_gender": "लिंग (Gender) *",
    "lbl_group_asm": "गट / सामूहिक असाइनमेंट",
    "lbl_internal_marks": "एकूण अंतर्गत गुण *",
    "lbl_main_topic_info": "मुख्य सामान्य विषय",
    "lbl_marks_obtained": "प्राप्त गुण *",
    "lbl_max_marks": "कमाल गुण",
    "lbl_mobile": "मोबाईल नंबर (WhatsApp) *",
    "lbl_new_password": "नवीन पासवर्ड सेट करा / बदला",
    "lbl_new_pwd": "नवीन पासवर्ड *",
    "lbl_password": "पासवर्ड *",
    "lbl_paste_roster_data": "हजेरी पट माहिती पेस्ट करा (प्रत्येक ओळीवर १ विद्यार्थी):",
    "lbl_prn": "पीआरएन / नोंदणी क्रमांक (PRN) *",
    "lbl_prn_enter": "विद्यार्थी पीआरएन / नोंदणी क्रमांक (PRN) *",
    "lbl_prog_code": "प्रोग्राम कोड (उदा. BA)",
    "lbl_prog_name": "प्रोग्रामचे नाव (उदा. Bachelor of Arts)",
    "lbl_raw_student_data": "विद्यार्थी माहिती (RollNo, PRN, Name, Gender, Email, Mobile) *",
    "lbl_registered_email": "नोंदणीकृत प्राध्यापक ईमेल *",
    "lbl_remarks": "परीक्षक अभिप्राय व मार्गदर्शन:",
    "lbl_repeater_chk": "पुनरावृत्ती / एटीकेटी विद्यार्थी (Repeater)",
    "lbl_roll_no": "हजेरी क्रमांक *",
    "lbl_select_class": "वर्ग निवडा *",
    "lbl_select_mapped_subject": "मॅप केलेला विषय निवडा *",
    "lbl_select_mapped_type": "मॅप केलेला मूल्यमापन प्रकार निवडा *",
    "lbl_select_master_course": "मास्टर कोर्समधून निवडा (Auto-Fill):",
    "lbl_select_semester": "सेमिस्टर निवडा *",
    "lbl_semester": "सत्र (Semester) *",
    "lbl_session_title": "असाइनमेंट शीर्षक *",
    "lbl_session_topic": "असाइनमेंट विषय / प्रश्न *",
    "lbl_status": "स्थिती (Status)",
    "lbl_stream": "शाखा (Stream) *",
    "lbl_stu_typed_content": "ऑनलाइन उत्तर / अहवाल मजकूर *",
    "lbl_student_email": "विद्यार्थी ईमेल आयडी",
    "lbl_student_email_verify": "नोंदणीकृत ईमेल आयडी (Email ID) *",
    "lbl_student_fullname": "विद्यार्थ्याचे पूर्ण नाव *",
    "lbl_student_mobile": "मोबाईल नंबर",
    "lbl_student_name": "विद्यार्थ्याचे पूर्ण नाव *",
    "lbl_subject": "विषय (Subject) *",
    "lbl_teacher_code": "शिक्षक कोड (User ID) *",
    "lbl_teacher_credentials_heading": "शिक्षक लॉगिन आयडी व पासवर्ड व्यवस्थापन",
    "lbl_teacher_email": "ईमेल किंवा शिक्षक कोड *",
    "lbl_teacher_name": "पूर्ण नाव (पदवीसहित) *",
    "lbl_university": "विद्यापीठाचे नाव *",
    "m_add_student_title": "यादीमध्ये नवीन विद्यार्थी जोडा",
    "m_admin_edit_t_title": "शिक्षक प्रोफाइल संपादित करा",
    "m_change_pwd_title": "शिक्षकांचा पासवर्ड बदला (Change Password)",
    "m_edit_asm_title": "असाइनमेंट सत्र संपादित करा",
    "m_edit_student_title": "विद्यार्थी माहिती संपादित करा",
    "m_forgot_pwd_title": "प्राध्यापक पासवर्ड रीसेट करा",
    "m_grading_title": "विद्यार्थी उत्तर मूल्यमापन व गुणदान",
    "m_reg_title": "नवीन शिक्षक नोंदणी",
    "m_view_stopics_title": "विद्यार्थीनिहाय वाटप केलेले विषय",
    "mapping_panel_sub": "शिकवत असलेले विषय, अभ्यासक्रम कोड आणि अधिकृत अंतर्गत मूल्यमापन प्रकार निवडा.",
    "mapping_panel_title": "विषय व अंतर्गत मूल्यमापन मॅपिंग",
    "mapping_step1_header": "टप्पा १: विषय व वर्ग तपशील",
    "mapping_step2_header": "टप्पा २: अंतर्गत मूल्यमापन प्रकार निवडा व गुण ठरवा",
    "master_courses_table_title": "आपण तयार केलेल्या वर्ग व विषयांची यादी",
    "matrix_panel_sub": "सर्व विद्यार्थ्यांचे अंतर्गत मूल्यमापन प्रकारानिहाय एकत्रित गुणांचे विवरण.",
    "matrix_panel_title": "सातत्यपूर्ण अंतर्गत मूल्यमापन अंतिम गुणपत्रिका (Master Matrix)",
    "mcq_auto_grade_notice": "विद्यार्थ्यांचे पेपर आपोआप तपासून गुण तात्काळ गुणतक्त्यात नोंदवले जातील.",
    "mcq_builder_sub": "प्रश्न आणि ४ पर्याय लिहा, तसेच योग्य उत्तराच्या गोल हिरव्या बटणावर टिक करा.",
    "mcq_builder_title": "MCQ प्रश्नपत्रिका रचना",
    "no_scan_notice": "<i class='fa-solid fa-lock mr-1'></i> स्कॅनिंग किंवा फाईल अपलोडची गरज नाही",
    "num_1": "१",
    "num_2": "२",
    "num_3": "३",
    "num_4": "४",
    "num_5": "५",
    "obj1_desc": "संपूर्ण शैक्षणिक सत्रात वैयक्तिक स्वाध्याय, गट प्रकल्प आणि सहयोगात्मक घटकांद्वारे विद्यार्थ्यांचे निरंतर मूल्यमापन.",
    "obj1_title": "सातत्यपूर्ण व सहयोगात्मक मूल्यमापन",
    "obj2_desc": "विद्यार्थी ओळख पडताळणी, डिजिटल नोंद, देवनागरी युनिकोड PDF निर्मिती आणि शिक्षकांचे मार्गदर्शनपर अभिप्राय.",
    "obj2_title": "१००% पारदर्शकता व ऑडिट-सज्ज",
    "obj3_desc": "प्रत्यक्ष कागदविरहित उत्तर लेखन, बहुपर्यायी प्रश्नांचे (MCQ) स्वयंचलित गुणदान आणि तात्काळ एकत्रित गुणतक्ता.",
    "obj3_title": "कागदविरहित व स्वयंचलित निकाल",
    "obj4_desc": "विविध प्रमाणित परीक्षा पद्धती, व्हिडिओ/नोट्स अभ्यास साहित्य, क्युआर कोड सूचना फलक आणि ईमेल प्रसारण.",
    "obj4_title": "बहुआयामी मूल्यमापन व अभ्यास साहित्य",
    "obj_badge_1": "उद्दिष्ट १",
    "obj_badge_2": "उद्दिष्ट २",
    "obj_badge_3": "उद्दिष्ट ३",
    "obj_badge_4": "उद्दिष्ट ४",
    "p1_desc": "केवळ सत्रांत परीक्षेवर अवलंबून न राहता संपूर्ण शैक्षणिक सत्रात निरंतर चालणारे सर्वसमावेशक मूल्यमापन.",
    "p1_title": "सातत्यपूर्ण व रचनात्मक",
    "p2_desc": "मूल्यमापनाचे निकष व रुब्रिक्स आधीच स्पष्ट करून पूर्ण निष्पक्षता आणि गुणवत्ता सुनिश्चित करणे.",
    "p2_title": "पारदर्शक व वस्तुनिष्ठ निकष",
    "p3_desc": "विशिष्ट शिक्षक कोड, अचूक विद्यार्थी नोंदणी पडताळणी आणि डिजिटल स्वाक्षरीयुक्त सुरक्षित रेकॉर्ड्स.",
    "p3_title": "गोपनीय व सुरक्षित अभिलेख",
    "p4_desc": "नॅक (NAAC) व विद्यापीठ नियमावलीनुसार क्षणात तयार होणाऱ्या अधिकृत गुणपत्रिका व पीडीएफ दस्तऐवज.",
    "p4_title": "नॅक व विद्यापीठ सुसंगत",
    "pending_approvals_title": "मंजुरीच्या प्रतीक्षेत असलेली शिक्षक नोंदणी",
    "ph_casm_title": "उदा. बी.ए. ३ भूगोल गृहस्वाध्याय (सत्र ५)",
    "ph_casm_topic": "उदा. भारताचे प्राकृतिक विभाग व किनारपट्टीच्या भूरूपांचे सविस्तर वर्णन करा.",
    "ph_course_code": "उदा. GEO-301",
    "ph_course_name": "उदा. भारताचा प्राकृतिक भूगोल",
    "ph_custom_subject": "इतर विषयाचे नाव लिहा",
    "ph_grade_remarks": "उदा. सखोल अभ्यास व विश्लेषण. भूरूपशास्त्राच्या वर्गीकरणावर अधिक भर द्या.",
    "ph_m_stu_class": "उदा. बी.ए. भाग ३",
    "ph_m_stu_name": "उदा. रमेश शंकर पाटील",
    "ph_m_stu_roll": "उदा. १०१",
    "ph_mobile": "9876543210",
    "ph_prn": "उदा. 2024016400012345",
    "ph_reg_college": "उदा. राजर्षी शाहू कला व वाणिज्य महाविद्यालय, रुकडी",
    "ph_reg_name": "उदा. डॉ. राजेखान शिकलगार",
    "ph_reg_univ": "उदा. शिवाजी विद्यापीठ, कोल्हापूर",
    "ph_roster_class": "उदा. बी.ए. भाग ३ किंवा बी.एस्सी. भाग २",
    "ph_roster_raw": "101, 2024016400012345, रमेश पाटील, Male, ramesh@gmail.com, 9876543210\n102, 2024016400012346, अनिता शिंदे, Female, anita@gmail.com, 9876543211",
    "ph_stu_email": "student@gmail.com",
    "ph_student_email": "उदा. amit@student.in",
    "ph_teacher_code": "उदा. TCH-RAJ-01",
    "ph_teacher_email": "उदा. rajekhan@rajekhan.in किंवा TCH-RAJ-01",
    "ph_um_class": "उदा. बी.ए. भाग ३ किंवा एम.ए. भाग १",
    "pwd_reset_success": "पासवर्ड रीसेट यशस्वी!",
    "reg_approval_notice": "नोंदणीनंतर प्रशासकीय मंजुरी आवश्यक आहे, त्यानंतरच असाइनमेंट निर्मितीसाठी शिक्षक कोड सक्रिय होईल.",
    "roster_panel_sub": "मूल्यमापनासाठी वर्ग यादी, विद्यार्थ्यांचे हजेरी क्रमांक आणि पीआरएन व्यवस्थापित करा.",
    "roster_panel_title": "वर्गनिहाय विद्यार्थी यादी व्यवस्थापन",
    "s_inst_1": "विषय शिक्षकांनी दिलेला अधिकृत 'शिक्षक कोड' (Teacher Code) अचूक टाका.",
    "s_inst_2": "आपला अधिकृत PRN नंबर व शिक्षकांकडे नोंदणी असलेला ईमेल आयडी प्रविष्ट करा.",
    "s_inst_3": "माहिती जुळल्यानंतर थेट अंतर्गत परीक्षा / स्वाध्याय कक्ष उघडून उत्तरे वेळेत सादर करता येतील.",
    "sessions_panel_sub": "स्वाध्याय, सेमिनार, प्रात्यक्षिक किंवा प्रकल्प विषय तयार करा आणि अंतिम तारीख निश्चित करा.",
    "sessions_panel_title": "असाइनमेंट व मूल्यमापन सत्र व्यवस्थापन",
    "step1_badge": "टप्पा १",
    "step1_desc": "शिक्षक नोंदणी करून शाखा, सेमिस्टर व शैक्षणिक वर्ष निवडून अभ्यासक्रमानुसार अंतर्गत मूल्यमापन प्रकार मॅप करतात.",
    "step1_title": "१. शिक्षकांची विषय व वर्गनिहाय मॅपिंग",
    "step2_badge": "टप्पा २",
    "step2_desc": "शिक्षक वर्गातील विद्यार्थ्यांची यादी अपलोड करतात. विद्यार्थी शिक्षक कोड व पीआरएन टाकून थेट ऑनलाइन जोडले जातात.",
    "step2_title": "२. विद्यार्थी यादी नोंदणी व ओळख पडताळणी",
    "step3_badge": "टप्पा ३",
    "step3_desc": "शिक्षक विषय व अंतिम तारीख निश्चित करतात. विद्यार्थी उत्तरे थेट ऑनलाइन टाइप करून व फायली जोडून सादर करतात.",
    "step3_title": "३. असाइनमेंट निर्मिती व ऑनलाइन सबमिशन",
    "step4_badge": "टप्पा ४",
    "step4_desc": "शिक्षक विद्यार्थ्यांच्या उत्तरांची तपासणी करून गुण व अभिप्राय देतात आणि विद्यापीठ सुसंगत अंतिम गुणपत्रिका व पीडीएफ तयार करतात.",
    "step4_title": "४. गुणदान, मूल्यमापन व प्रमाणित अभिलेख",
    "stu_connect_sub": "तुमच्या विषयाच्या शिक्षकांचा कोड आणि तुमचा पीआरएन (PRN) क्रमांक टाकून सक्रिय असाइनमेंट्स सुरू करा.",
    "stu_connect_title": "विद्यार्थी परीक्षा व स्वाध्याय कक्ष (Student Room)",
    "stu_declaration": "मी याद्वारे घोषित करतो/करते की हे असाइनमेंट माझे स्वतःचे मूळ शैक्षणिक काम आहे.",
    "stu_mcq_exam_title": "ऑनलाइन बहुपर्यायी प्रश्न चाचणी (MCQ Exam)",
    "stu_step1_title": "१. सक्रिय असाइनमेंट / चाचणी निवडा",
    "stu_step2_title": "२. तुमचे उत्तर तयार करा व सादर करा",
    "student_inst_badge": "सूचना",
    "student_inst_title": "विद्यार्थ्यांसाठी मार्गदर्शक सूचना",
    "sub_select_master_course": "टॅब १ मध्ये तयार केलेला कोर्स निवडल्यास वर्ग, सेमिस्टर व पेपरचे नाव आपोआप भरले जाईल.",
    "subs_history_sub": "सादरीकरण स्थिती, दिनांक, मिळालेले गुण आणि शिक्षकांचा अभिप्राय तपासा.",
    "subs_history_title": "आपले सादर केलेले असेसमेंट रेकॉर्ड्स व अधिकृत PDF",
    "svc_summary_badge": "१००% सुरक्षित व NEP २०२० सुसंगत",
    "svc_summary_sub": "शिक्षकांसाठी व विद्यार्थ्यांसाठी एकाच ठिकाणी उपलब्ध आधुनिक शैक्षणिक साधने",
    "svc_summary_title": "प्रणालीतील सर्वसमावेशक सुविधा व आधुनिक डिजिटल सेवा",
    "svc1_desc": "द्विभाषिक (मराठी/इंग्रजी) स्पीच-टू-टेक्स्ट व दर १० सेकंदाला ऑटो-ड्राफ्ट सेव्ह.",
    "svc1_title": "मराठी व्हॉईस टायपिंग",
    "svc2_desc": "घटक चाचणी व क्विझसाठी लाइव्ह काउंटडाउन घड्याळ व स्वयंचलित निकाल.",
    "svc2_title": "MCQ व लाइव्ह टाइमर",
    "svc3_desc": "प्रत्येक PDF वर डायनॅमिक QR कोड; स्कॅन करून निकाल सत्यतेची १००% पडताळणी.",
    "svc3_title": "डिजिटल पडताळणी QR",
    "svc4_desc": "संपूर्ण सेमिस्टरचे एकत्रित CSV निकालपत्रक व सर्व विद्यार्थ्यांच्या अधिकृत PDF संचिका.",
    "svc4_title": "१-क्लिक सेमिस्टर ZIP",
    "svc5_desc": "हिरव्या/लाल टॉगल बटणाद्वारे विद्यार्थ्यांचे गुण सुरू किंवा राखीव ठेवण्याची थेट मुभा.",
    "svc5_title": "१-क्लिक गुण नियंत्रण",
    "svc6_desc": "HarfBuzz कॉम्प्लेक्स मराठी फॉन्ट शेपिंगसह १००% विद्यापीठ व NAAC ऑडिट सज्ज.",
    "svc6_title": "देवनागरी PDF व नॅक सज्ज",
    "swf_1_desc": "विद्यार्थी अधिकृत PRN नंबर आणि नोंदणीकृत ईमेल आयडी टाकून शिक्षकांशी थेट जोडले जातात.",
    "swf_1_title": "सुरक्षित लॉगिन व ओळख पडताळणी",
    "swf_2_desc": "आपल्या वर्गाचे चालू स्वाध्याय, स्वतंत्र विषय, MCQ चाचण्या, संदर्भ साहित्य (Drive/YouTube) व सूचना पाहणे.",
    "swf_2_title": "सक्रिय स्वाध्याय, अभ्यास साहित्य व सूचना",
    "swf_3_desc": "विद्यार्थी एडिटरमध्ये उत्तरे टाइप करून सादर करतात किंवा वेळेत ऑनलाइन MCQ चाचणी सोडवतात.",
    "swf_3_title": "थेट ऑनलाइन उत्तर लेखन व MCQ चाचणी",
    "swf_4_desc": "सादर केलेल्या उत्तरांचा इतिहास पाहणे, सूचना काढून टाकणे आणि गुणविरहित अधिकृत PDF पावती प्रिंट करणे.",
    "swf_4_title": "सबमिशन इतिहास व छापील पावती",
    "t_inst_1": "नोंदणीकृत ईमेल आयडी अथवा शिक्षक कोड (उदा. TCH-GEO-65) वापरून लॉगिन करा.",
    "t_inst_2": "नवीन शिक्षकांनी 'शिक्षक नोंदणी' करावी; प्रशासकीय मंजुरीनंतर लॉगिन कोड ईमेलवर प्राप्त होईल.",
    "t_inst_3": "वर्ग, अभ्यासक्रम, विद्यार्थी हजेरी पट आणि प्रश्नपत्रिका तयार करून ऑनलाइन अंतर्गत मूल्यमापन पूर्ण करा.",
    "tab_admin": "प्रशासक कक्ष",
    "tab_guidelines": "मार्गदर्शक तत्त्वे",
    "tab_home": "मुख्य पृष्ठ",
    "tab_login": "लॉगिन",
    "tab_student": "विद्यार्थी कक्ष",
    "tab_teacher": "शिक्षक कक्ष",
    "teacher_inst_badge": "सूचना",
    "teacher_inst_title": "शिक्षकांसाठी मार्गदर्शक सूचना",
    "teacher_login_sub": "महाविद्यालयीन प्राध्यापकांसाठी वर्ग, असाइनमेंट्स व सातत्यपूर्ण अंतर्गत मूल्यमापन व्यवस्थापन मंच.",
    "teacher_login_title": "शिक्षक लॉगिन (Teacher Portal)",
    "th_academic_year": "शैक्षणिक वर्ष",
    "th_actions": "क्रिया",
    "th_category": "प्रवर्ग",
    "th_class": "वर्ग",
    "th_class_div": "वर्ग व तुकडी",
    "th_class_sem": "वर्ग / सेमिस्टर",
    "th_code_date": "शिक्षक कोड व नोंदणी दिनांक",
    "th_college_univ": "महाविद्यालय व विद्यापीठ",
    "th_comp_marks": "अंतर्गत गुण",
    "th_comp_type": "मूल्यमापन प्रकार",
    "th_contact": "संपर्क",
    "th_course_code_name": "अभ्यासक्रम कोड व नाव",
    "th_course_name": "अभ्यासक्रमाचे नाव",
    "th_credits": "क्रेडिट्स",
    "th_date": "सादरीकरण दिनांक",
    "th_deadline": "अंतिम तारीख",
    "th_decision": "मंजुरी कृती",
    "th_email_mobile": "ईमेल व मोबाईल",
    "th_faculty": "प्राध्यापक तपशील",
    "th_gender": "लिंग",
    "th_internal_marks": "अंतर्गत कमाल गुण",
    "th_login_password": "लॉगिन पासवर्ड",
    "th_marks": "दिलेले गुण",
    "th_name": "विद्यार्थ्याचे नाव",
    "th_pdf_print": "अधिकृत PDF / प्रिंट",
    "th_prn": "पीआरएन (PRN) / नोंदणी क्र.",
    "th_prog_stream": "पदवी व शाखा",
    "th_roll": "हजेरी क्र.",
    "th_roll_no": "हजेरी क्र. (Roll No)",
    "th_session_title": "असाइनमेंट शीर्षक",
    "th_status": "स्थिती",
    "th_stream_subject": "शाखा व विषय",
    "th_student_name": "विद्यार्थ्याचे नाव",
    "th_student_roll": "विद्यार्थी / हजेरी क्र.",
    "th_subject": "विषय",
    "th_subject_paper": "विषय / पेपर",
    "th_submission_id": "सबमिशन आयडी",
    "th_subs_count": "सादर उत्तरे",
    "th_teacher_code_id": "शिक्षक कोड / User ID",
    "th_teacher_desig": "शिक्षकांचे नाव व पद",
    "th_topic": "विषय / प्रश्न",
    "th_type": "प्रकार",
    "ttab_courses_sub": "वर्ग व कोर्स मास्टर रचना",
    "ttab_courses_title": "वर्ग व अभ्यासक्रम",
    "ttab_eval_sub": "उत्तरे तपासा व संकलित मार्कशीट",
    "ttab_eval_title": "मूल्यमापन व गुणदान",
    "ttab_roster_sub": "वर्गनिहाय विद्यार्थी यादी (येथेच जोडा)",
    "ttab_roster_title": "विद्यार्थी यादी (रोस्टर)",
    "ttab_sessions_sub": "स्वाध्याय सत्र तयार व व्यवस्थापन",
    "ttab_sessions_title": "परीक्षा / सत्र निर्मिती",
    "twf_1_desc": "शिक्षक शिकवत असलेल्या वर्गाची, सेमिस्टर, विषयाची आणि एकूण अंतर्गत गुणांची मास्टर नोंदणी करतात.",
    "twf_1_title": "वर्ग व विषय रचना",
    "twf_2_desc": "अभ्यासक्रमानुसार आवश्यक अंतर्गत घटक (स्वाध्याय, MCQ, सेमिनार, प्रकल्प) निवडून गुण निश्चित करतात.",
    "twf_2_title": "घटक व गुण विभाजन",
    "twf_3_desc": "विद्यार्थी हजेरी पट आयात करणे, स्वतंत्र विषय वाटप करणे आणि गटप्रमुखासह गट प्रकल्प निश्चित करणे.",
    "twf_3_title": "विद्यार्थी हजेरी पट व गट रचना",
    "twf_4_desc": "स्वाध्याय देणे, स्वयंचलित MCQ प्रश्नपत्रिका तयार करणे, Drive/YouTube साहित्य जोडणे व ईमेल सूचना देणे.",
    "twf_4_title": "सत्र, MCQ व अभ्यास साहित्य निर्मिती",
    "twf_5_desc": "उत्तरे ऑनलाइन तपासून गुण देणे, गट गुणांचे स्वयंचलित सिंक करणे आणि देवनागरी PDF गुणतक्ता तयार करणे.",
    "twf_5_title": "ऑनलाइन गुणदान, गट सिंक व संकलित तक्ता",
    "verified_identity_badge": "प्रमाणित विद्यार्थी प्रोफाइल",
    "wf_title": "सातत्यपूर्ण अंतर्गत मूल्यमापनाची टप्पेनिहाय कार्यप्रणाली",
    "ttab_dashboard_title": "डॅशबोर्ड विहंगावलोकन",
    "ttab_dashboard_sub": "सांख्यिकी व माहिती",
    "teacher_dash_overview_title": "शिक्षक कार्यप्रदर्शन व सांख्यिकी (Teacher Overview)",
    "teacher_dash_overview_sub": "अभ्यासक्रम, नोंदणीकृत विद्यार्थी, सक्रिय मूल्यमापन सत्रे आणि पेपर तपासणी प्रगतीचा थेट सारांश.",
    "btn_refresh_stats": "रिफ्रेश माहिती",
    "stat_total_courses": "वर्ग व अभ्यासक्रम",
    "stat_total_students": "एकूण विद्यार्थी",
    "stat_total_assessments": "मूल्यमापन सत्रे",
    "stat_total_submissions": "एकूण उत्तरे",
    "stat_evaluated": "तपासलेली उत्तरे",
    "stat_pending_eval": "तपासणी बाकी",
    "eval_progress_title": "मूल्यमापन पूर्णता दर",
    "btn_open_evaluation": "गुण नोंदवा",
    "quick_actions_title": "जलद शैक्षणिक कृती (Quick Actions)",
    "class_breakdown_title": "वर्गनिहाय विहंगावलोकन (Class Breakdown)",
    "recent_assessments_title": "अलीकडील मूल्यमापन सत्रे",
    "recent_submissions_title": "अलीकडील प्राप्त विद्यार्थी उत्तरे",
    "th_class_sem": "वर्ग व सेमिस्टर",
    "th_subject_code": "विषय व कोड",
    "th_students": "विद्यार्थी",
    "th_assessments": "चाचण्या",
    "th_submissions": "प्राप्त उत्तरे",
    "admin_tab_overview": "डॅशबोर्ड सांख्यिकी",
    "admin_tab_overview_sub": "संस्था विहंगावलोकन व मेट्रिक्स",
    "admin_tab_pending": "प्रलंबित शिक्षक मंजुरी",
    "admin_tab_pending_sub": "शिक्षक पडताळणी अर्ज",
    "admin_tab_approved": "मंजूर शिक्षक यादी",
    "admin_tab_approved_sub": "कार्यरत प्राध्यापक डिरेक्टरी",
    "admin_summary_title": "प्रणाली सांख्यिकी व सर्वसमावेशक माहिती (Analytics)",
    "admin_summary_sub": "नोंदणीकृत प्राध्यापक, विद्यार्थी, अंतर्गत चाचण्या आणि मूल्यमापनाची एकत्रित सांख्यिकी.",
    "stat_approved_teachers": "मंजूर शिक्षक",
    "stat_pending_teachers": "प्रलंबित अर्ज",
    "stat_total_students_admin": "एकूण विद्यार्थी",
    "stat_total_asm_admin": "मूल्यमापन सत्रे",
    "stat_total_subs_admin": "एकूण उत्तरे",
    "faculty_stream_dist": "विद्याशाखानिहाय शिक्षक संख्या",
    "recent_registrations_title": "अलीकडील शिक्षक नोंदणी",
    "ttab_search_title": "विद्यार्थी शोध",
    "ttab_search_sub": "सर्व वर्गांतून शोध",
    "ttab_announcements_title": "सूचना व प्रसारण",
    "ttab_announcements_sub": "ईमेल व नोटीस बोर्ड",
    "teacher_student_search_title": "विद्यार्थी शोध व शैक्षणिक तपशील (Student Search)",
    "teacher_student_search_sub": "हजेरीपटातील विद्यार्थी नाव, PRN, रोल नंबर, ईमेल किंवा मोबाईलने शोधा.",
    "teacher_announcements_title": "महत्त्वाच्या सूचना व ईमेल प्रसारण (Teacher Announcements)",
    "teacher_announcements_sub": "वर्गासाठी महत्त्वाची सूचना जाहीर करा; संबंधित सर्व विद्यार्थ्यांना थेट ईमेल पाठवला जाईल.",
    "admin_tab_faculty_search": "प्राध्यापक शोध",
    "admin_tab_faculty_search_sub": "महाविद्यालयीन प्राध्यापक डिरेक्टरी",
    "admin_tab_announcements": "न्यूज व परिपत्रके",
    "admin_tab_announcements_sub": "शिक्षकांसाठी सूचना",
    "admin_faculty_search_title": "प्राध्यापक शोध व महाविद्यालयीन डिरेक्टरी (Faculty Search)",
    "admin_faculty_search_sub": "सर्व विद्याशाखा, विषय व महाविद्यालयांमधील प्राध्यापकांची माहिती व आकडेवारी शोधा.",
    "lbl_num_faculty": "एकूण शिक्षक संख्या (Number of Faculty):",
    "lbl_enable_study_materials": "📚 अभ्यास साहित्य, नोट्स व संदर्भ व्हिडिओ लिंक जोडा",
    "study_materials_builder_title": "अभ्यास साहित्य, नोट्स व संदर्भ व्हिडिओ",
    "stu_materials_title": "अभ्यास साहित्य व संदर्भ व्हिडिओ",
    "btn_add_material_link": "+ संदर्भ लिंक जोडा",
    "btn_broadcast_announcement": "प्रसारित करा व ईमेल पाठवा",
    "published_notices_header": "प्रसारित केलेल्या सूचना व ईमेल लॉग",
    "lbl_ann_target_class": "लक्षित वर्ग (Target Class)",
    "lbl_ann_title": "सूचनेचे शीर्षक (Title)",
    "lbl_ann_message": "सविस्तर सूचना मजकूर (Message)",
    "lbl_ann_ref_url": "संदर्भ साहित्य किंवा व्हिडिओ लिंक (ऐच्छिक)",
    "stu_dash_title": "विद्यार्थी असाइनमेंट डॅशबोर्ड",
    "stu_dash_sub": "सर्व अंतर्गत चाचण्या व स्वाध्याय यादी",
    "stu_tab_dashboard": "डॅशबोर्ड",
    "stu_tab_dashboard_sub": "प्रगती व सारांश",
    "stu_tab_assignments": "स्वाध्याय",
    "stu_tab_notices": "नोटीस बोर्ड",
    "stu_tab_notes": "अभ्यास साहित्य",
    "stu_tab_history": "सबमिशन इतिहास",
    "stu_kpi_total_lbl": "एकूण स्वाध्याय",
    "stu_kpi_total_sub": "शिक्षकांनी दिलेले स्वाध्याय",
    "stu_kpi_submitted_lbl": "सादर केलेले",
    "stu_kpi_submitted_sub": "यशस्वीरीत्या सादर",
    "stu_kpi_pending_lbl": "बाकी असलेले",
    "stu_kpi_pending_sub": "सोडवणे बाकी",
    "stu_kpi_teachers_lbl": "प्राध्यापक व विषय",
    "stu_kpi_teachers_sub": "संलग्न शिक्षक",
    "stu_kpi_materials_lbl": "अभ्यास साहित्य",
    "stu_kpi_materials_sub": "नोट्स व संदर्भ",
    "stu_progress_title": "स्वाध्याय पूर्णता स्थिती",
    "stu_progress_sub": "आपले सर्व अंतर्गत मूल्यमापन स्वाध्याय वेळेत पूर्ण करून सबमिट करा.",
    "stu_pending_tasks_title": "सोडवण्यासाठी उपलब्ध स्वाध्याय",
    "btn_view_all": "सर्व पहा",
    "btn_delete": "काढून टाका",
    "lbl_deadline": "अंतिम मुदत",
    "stu_enrolled_teachers_title": "नोंदणीकृत शिक्षक व वर्ग",
    "stu_assignments_title": "सर्व स्वाध्याय व चाचण्या",
    "stu_assignments_sub": "कोणत्याही स्वाध्याय कार्डवर क्लिक करून थेट ऑनलाइन सोडवा",
    "stu_filter_all": "सर्व",
    "stu_filter_pending": "बाकी",
    "stu_filter_submitted": "सादर केलेले",
    "stu_back_to_assignments": "स्वाध्याय यादीकडे परत जा",
    "stu_announcements_title": "प्राध्यापक सूचना व नोटीस फलक",
    "stu_announcements_sub": "आपल्या विषय शिक्षकांनी पाठवलेल्या सर्व अधिकृत सूचना.",
    "stu_materials_title": "अभ्यास साहित्य व संदर्भ संसाधने",
    "stu_materials_sub": "Topic-wise & Paper-wise व्हिडिओ व्याख्याने, नोट्स व संदर्भ साहित्य.",
    "stu_history_title": "सादर केलेले स्वाध्याय व अधिकृत PDF",
    "stu_history_sub": "आपण सादर केलेल्या स्वाध्यायांची तपासणी स्थिती व अधिकृत PDF प्रत डाऊनलोड करा.",
    "stu_th_submission_id": "सबमिशन आयडी",
    "stu_th_class_subject": "वर्ग व विषय",
    "stu_th_assessment_type": "मूल्यमापन प्रकार",
    "stu_th_topic": "विषय / स्वाध्याय",
    "stu_th_submitted_date": "सादर तारीख",
    "stu_th_faculty": "संबंधित शिक्षक",
    "stu_th_status": "तपासणी स्थिती",
    "stu_th_action": "अधिकृत PDF / प्रिंट",
    "btn_back_to_login": "← लॉगिन कडे परत जा",
    "btn_send_admin_pwd_email": "पासवर्ड ईमेलवर पाठवा",
    "btn_send_pwd_email": "पासवर्ड ईमेलवर पाठवा",
    "admin_forgot_pwd_help": "आपले ॲडमिन युझरनेम किंवा नोंदणीकृत ईमेल प्रविष्ट करा. नवीन सुरक्षित पासवर्ड थेट आपल्या प्रशासकीय ईमेलवर पाठवला जाईल.",
    "m_admin_forgot_pwd_title": "प्रशासक पासवर्ड रीसेट करा",
    "lbl_admin_user_or_email": "ॲडमिन युझरनेम किंवा नोंदणीकृत ईमेल *",
    "admin_pwd_reset_success": "प्रशासक पासवर्ड रीसेट यशस्वी झाला!",
    "admin_pwd_sent_to_email_notice": "सुरक्षेच्या कारणास्तव, नवीन प्रशासकीय पासवर्ड थेट आपल्या नोंदणीकृत ईमेलवर पाठवण्यात आला आहे. कृपया आपला ईमेल तपासा आणि दिलेल्या पासवर्डने ॲडमिन पोर्टलमध्ये लॉगिन करा.",
    "pwd_sent_to_email_notice": "सुरक्षेच्या कारणास्तव, नवीन पासवर्ड थेट आपल्या नोंदणीकृत ईमेलवर पाठवला गेला आहे. कृपया आपला ईमेल तपासा आणि ईमेलमधील पासवर्डने लॉगिन करा.",
    "faculty_stream_dist": "विद्याशाखानिहाय सारांश व विषय माहिती",
    "recent_registrations_title": "अलीकडील शिक्षक नोंदणी",
    "pending_approvals_title": "प्रलंबित शिक्षक मंजुरी विनंत्या",
    "pending_approvals_sub": "नवीन शिक्षक नोंदणी व वार्षिक मुदतवाढ विनंत्यांची तपासणी करा.",
    "filter_appr_all": "सर्व विनंत्या",
    "filter_appr_new": "✨ नवीन नोंदणी",
    "filter_appr_update": "🔄 मुदतवाढ विनंती",
    "btn_bulk_approve": "एकत्रित मंजूर करा",
    "btn_bulk_delete": "एकत्रित हटवा",
    "th_type_code_date": "प्रकार, कोड व दिनांक",
    "th_validity_requested": "मुदत कालावधी",
    "lbl_validity": "मुदत:",
    "btn_extend_validity": "मुदत वाढवा",
    "m_extend_validity_title": "शैक्षणिक वर्ष मुदतवाढ विनंती",
    "lbl_validity_cycle": "प्रमाणित शैक्षणिक चक्र: १ जून ते ३१ मे",
    "extend_validity_expl": "शिक्षक खात्याची मुदत दरवर्षी एका शैक्षणिक वर्षासाठी (१ जून ते ३१ मे) असते. पुढील शैक्षणिक वर्षासाठी मुदतवाढ विनंती प्रशासकांकडे (Admin) मंजुरीसाठी पाठवली जाईल.",
    "lbl_curr_validity": "सध्याची मुदत",
    "lbl_req_year": "पुढील शैक्षणिक वर्ष",
    "btn_send_extension_req": "मुदतवाढ विनंती पाठवा",
    "teacher_student_search_title": "विद्यार्थी शोध व शैक्षणिक तपशील",
    "teacher_student_search_sub": "नाव, PRN, विद्याशाखा, विषय, महाविद्यालय, वर्ग व विद्यापीठानूसार विद्यार्थी शोधा.",
    "stream_summary_title": "विषयनिहाय सारांश व यादी",
    "stream_summary_sub": "या विद्याशाखेतील विषय, शिक्षक, कोर्सेस आणि विद्यार्थ्यांचा सविस्तर तपशील.",
    "admin_tab_course_cie": "कोर्स व CIE मॅपिंग",
    "admin_tab_course_cie_sub": "विद्याशाखा, विषय, वर्ग व CIE",
    "admin_course_cie_title": "कोर्स व CIE मास्टर मॅपिंग",
    "admin_course_cie_sub": "विद्याशाखा, विषय, वर्ग आणि अंतर्गत मूल्यमापन घटकांचे थेट व्यवस्थापन. येथे केलेले बदल शिक्षक व विद्यार्थी पोर्टलवर तात्काळ लागू होतात.",
    "btn_reset_master": "डीफॉल्ट मानकांवर पूर्ववत करा",
    "btn_refresh_data": "रिफ्रेश करा",
    "mm_tab_streams": "विद्याशाखा",
    "mm_tab_subjects": "विषय",
    "mm_tab_classes": "वर्ग / इयत्ता",
    "mm_tab_types": "CIE मूल्यमापन घटक",
    "mm_add_stream_title": "नवीन विद्याशाखा जोडा",
    "mm_lbl_stream_name": "विद्याशाखेचे नाव *",
    "mm_lbl_display_order": "प्रदर्शन क्रम",
    "btn_add_stream": "विद्याशाखा जोडा",
    "mm_th_id": "क्रमांक (ID)",
    "mm_th_stream_name": "विद्याशाखेचे नाव",
    "mm_th_order": "क्रम",
    "mm_th_status": "स्थिती",
    "mm_th_actions": "कृती",
    "mm_add_subject_title": "नवीन विषय जोडा",
    "mm_lbl_select_stream": "विद्याशाखा निवडा *",
    "mm_lbl_subject_name": "विषयाचे नाव *",
    "btn_add_subject": "विषय जोडा",
    "mm_filter_sub_lbl": "विद्याशाखेनुसार विषय फिल्टर करा:",
    "mm_all_streams": "सर्व विद्याशाखा",
    "mm_total_subjects": "एकूण विषय:",
    "mm_th_stream": "विद्याशाखा",
    "mm_th_subject_name": "विषयाचे नाव",
    "mm_add_class_title": "नवीन वर्ग / इयत्ता जोडा",
    "mm_lbl_class_name": "वर्गाचे नाव *",
    "btn_add_class": "वर्ग जोडा",
    "mm_filter_cls_lbl": "विद्याशाखेनुसार वर्ग फिल्टर करा:",
    "mm_total_classes": "एकूण वर्ग:",
    "mm_th_class_name": "वर्गाचे नाव",
    "mm_add_type_title": "नवीन अंतर्गत मूल्यमापन घटक जोडा",
    "mm_lbl_type_name": "घटकाचे नाव *",
    "mm_lbl_type_desc": "वर्णन",
    "mm_lbl_type_nature": "मूल्यमापन प्रकार",
    "mm_opt_individual": "वैयक्तिक",
    "mm_opt_group": "गट कार्य",
    "btn_add_type": "घटक जोडा",
    "mm_th_type_name": "मूल्यमापन घटक नाव",
    "mm_th_type_desc": "वर्णन",
    "mm_th_nature": "प्रकार",
    "modal_edit_stream_title": "विद्याशाखा संपादन",
    "modal_edit_subject_title": "विषय संपादन",
    "modal_edit_class_title": "वर्ग / इयत्ता संपादन",
    "modal_edit_type_title": "मूल्यमापन घटक संपादन",
    "lbl_is_active": "सक्रिय ठेवा",
    "btn_edit_action": "संपादन",
    "btn_delete_action": "हटवा",
    "status_badge_active": "सक्रिय",
    "status_badge_disabled": "निष्क्रिय",
    "badge_nature_group": "गट कार्य",
    "badge_nature_individual": "वैयक्तिक",
    "no_streams_found": "कोणतीही विद्याशाखा उपलब्ध नाही.",
    "no_subjects_found": "या विद्याशाखेत कोणताही विषय आढळला नाही.",
    "no_classes_found": "या विद्याशाखेत कोणताही वर्ग आढळला नाही.",
    "no_types_found": "कोणताही मूल्यमापन घटक उपलब्ध नाही."
  }
};

let currentLanguage = 'en';

function setLanguage(lang) {
  if (!['en', 'mr'].includes(lang)) lang = 'en';
  currentLanguage = lang;
  try {
    localStorage.setItem('cie_lang', lang);
  } catch (e) {}

  // Update Language Button states
  const btnEn = document.getElementById('lang-en-btn');
  const btnMr = document.getElementById('lang-mr-btn');
  if (btnEn && btnMr) {
    if (lang === 'mr') {
      btnMr.className = 'px-2.5 py-1 rounded-lg transition-all bg-blue-600 text-white shadow-sm font-bold';
      btnEn.className = 'px-2.5 py-1 rounded-lg transition-all text-slate-300 hover:text-white font-medium';
    } else {
      btnEn.className = 'px-2.5 py-1 rounded-lg transition-all bg-blue-600 text-white shadow-sm font-bold';
      btnMr.className = 'px-2.5 py-1 rounded-lg transition-all text-slate-300 hover:text-white font-medium';
    }
  }

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key]) {
      if (I18N[lang][key].includes('<')) {
        el.innerHTML = I18N[lang][key];
      } else {
        el.textContent = I18N[lang][key];
      }
    }
  });

  // If user manual modal is open, sync its language as well
  const manModal = document.getElementById('modal-user-manual');
  if (manModal && !manModal.classList.contains('hidden')) {
    if (typeof switchManualLanguage === 'function') {
      switchManualLanguage(lang);
    }
  }

  // Update all [data-i18n-ph] input placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (I18N[lang] && I18N[lang][key]) {
      el.placeholder = I18N[lang][key];
    }
  });

  if (assessmentTypesList && assessmentTypesList.length > 0) {
    renderGuidelinesDirectory();
  }

  // Update discipline dropdowns
  if (masterDisciplines && Object.keys(masterDisciplines).length > 0) {
    try {
      populateDisciplinesDropdowns();
    } catch (e) {}
  }

  // Bulk validity dropdown options update
  const bulkDaysSelect = document.getElementById('bulk-validity-days');
  if (bulkDaysSelect) {
    const curVal = bulkDaysSelect.value || '365';
    bulkDaysSelect.innerHTML = (lang === 'mr') ? `
      <option value="365" ${curVal==='365'?'selected':''}>३६५ दिवस (१ वर्ष)</option>
      <option value="180" ${curVal==='180'?'selected':''}>१८० दिवस (६ महिने)</option>
      <option value="90" ${curVal==='90'?'selected':''}>९० दिवस (३ महिने)</option>
      <option value="60" ${curVal==='60'?'selected':''}>६० दिवस (२ महिने)</option>
      <option value="30" ${curVal==='30'?'selected':''}>३० दिवस (१ महिना)</option>
      <option value="730" ${curVal==='730'?'selected':''}>७३० दिवस (२ वर्षे)</option>
    ` : `
      <option value="365" ${curVal==='365'?'selected':''}>365 Days (1 Year)</option>
      <option value="180" ${curVal==='180'?'selected':''}>180 Days (6 Months)</option>
      <option value="90" ${curVal==='90'?'selected':''}>90 Days (3 Months)</option>
      <option value="60" ${curVal==='60'?'selected':''}>60 Days (2 Months)</option>
      <option value="30" ${curVal==='30'?'selected':''}>30 Days (1 Month)</option>
      <option value="730" ${curVal==='730'?'selected':''}>730 Days (2 Years)</option>
    `;
  }

  // Refresh active view components in-place without triggering navigation redirects
  if (verifiedStudentData) {
    try {
      const studentPortalView = document.getElementById('view-student-portal');
      if (studentPortalView && studentPortalView.classList.contains('active')) {
        renderStudentVerifiedForm(false);
      }
    } catch (e) {
      console.error('Error re-rendering student form on language change:', e);
    }
  }

  if (currentTeacher) {
    try {
      const teacherPortalView = document.getElementById('view-teacher-portal');
      if (teacherPortalView && teacherPortalView.classList.contains('active')) {
        const activeSubSec = document.querySelector('.t-sub-section.active');
        const activeSecId = activeSubSec ? activeSubSec.id.replace('t-sec-', '') : 'dashboard';
        if (typeof showTeacherSection === 'function') {
          showTeacherSection(activeSecId);
        }
      }
    } catch (e) {}
  }

  if (currentAdmin) {
    try {
      const adminPortalView = document.getElementById('view-admin-portal');
      if (adminPortalView && adminPortalView.classList.contains('active')) {
        const activeAdminSec = document.querySelector('.admin-sub-section.active');
        const secId = activeAdminSec ? activeAdminSec.id.replace('admin-sec-', '') : 'overview';
        if (secId === 'teachers' && typeof loadAdminTeachers === 'function') {
          loadAdminTeachers();
        } else if (secId === 'search' && typeof loadAdminFacultySearch === 'function') {
          loadAdminFacultySearch();
        } else if (typeof loadAdminDashboardStats === 'function') {
          loadAdminDashboardStats();
        }
      }
    } catch (e) {}
  }

  if (typeof _adminMasterMappingData !== 'undefined' && _adminMasterMappingData) {
    try {
      if (_adminMasterMappingData.streams) {
        populateMasterStreamSelects(_adminMasterMappingData.streams);
        renderMasterStreamsTable(_adminMasterMappingData.streams);
      }
      if (_adminMasterMappingData.subjects) renderMasterSubjectsTable(_adminMasterMappingData.subjects);
      if (_adminMasterMappingData.classes) renderMasterClassesTable(_adminMasterMappingData.classes);
      if (_adminMasterMappingData.assessment_types) renderMasterAssessmentTypesTable(_adminMasterMappingData.assessment_types);
    } catch (e) {}
  }
}

let currentTeacher = null;
let currentAdmin = null;
let studentQuill = null;
let assessmentTypesList = [];
let verifiedStudentData = null;
let masterDisciplines = {};
let masterStreamClasses = {};

let _lastLiveSyncTime = 0;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const savedLang = localStorage.getItem('cie_lang') || 'en';
    setLanguage(savedLang);
  } catch (e) {}

  try {
    initStudentQuill();
  } catch (err) {
    console.warn('Quill editor init deferred:', err);
  }

  // Load master data and auth checks concurrently in parallel (single round trip)
  try {
    await Promise.allSettled([
      loadMasterDisciplines(),
      loadAssessmentTypes(),
      checkAuthStates()
    ]);
  } catch (err) {
    console.error('Parallel initial data load error:', err);
  }

  try {
    handleUrlParams();
  } catch (err) {
    console.error('URL params handling error:', err);
  }
  try {
    setupAutoDataSync();
  } catch (err) {
    console.error('Auto data sync setup error:', err);
  }
});

function setupAutoDataSync() {
  // Debounced sync when user switches back to tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      triggerLiveSync();
    }
  });

  // Periodic background sync every 60 seconds
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      triggerLiveSync();
    }
  }, 60000);
}

function triggerLiveSync() {
  const now = Date.now();
  if (now - _lastLiveSyncTime < 15000) return; // Debounce: max once every 15s
  _lastLiveSyncTime = now;

  try {
    if (currentAdmin) {
      loadAdminDashboardStats();
    }
    if (currentTeacher) {
      loadTeacherDashboardStats();
    }
    if (verifiedStudentData) {
      refreshStudentData(true);
    }
  } catch (err) {
    console.debug('Live sync heartbeat:', err);
  }
}

function initStudentQuill() {
  const el = document.getElementById('student-quill-editor');
  if (el && typeof Quill !== 'undefined') {
    try {
      studentQuill = new Quill('#student-quill-editor', {
        theme: 'snow',
        placeholder: 'Type your detailed answers, analysis, observations, conclusions, or report directly here online...',
        modules: {
          toolbar: [
            [{ 'header': [2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['clean']
          ]
        }
      });
    } catch (e) {
      console.warn('Quill instantiation issue:', e);
    }
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-800' : (type === 'error' ? 'bg-red-800' : 'bg-slate-800');
  const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info');
  
  toast.className = `toast px-4 py-3 rounded-xl shadow-xl text-white text-xs font-semibold flex items-center space-x-2 border border-white/20 pointer-events-auto ${bg}`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ------------------- NAVIGATION -------------------
function navigateTo(viewId) {
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));

  const targetView = document.getElementById('view-' + viewId);
  if (targetView) {
    targetView.classList.add('active');
  }

  const activeTabBtn = document.querySelector(`.nav-tab[data-tab="${viewId}"]`);
  if (activeTabBtn) activeTabBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'landing') {
    if (assessmentTypesList && assessmentTypesList.length > 0) {
      renderGuidelinesDirectory();
    }
  } else if (viewId === 'teacher-portal') {
    const loginBox = document.getElementById('teacher-login-box');
    const dashView = document.getElementById('teacher-dashboard-view');
    if (currentTeacher) {
      if (loginBox) loginBox.classList.add('hidden');
      if (dashView) dashView.classList.remove('hidden');
      loadTeacherDashboard();
      loadTeacherDashboardStats();
    } else {
      if (loginBox) loginBox.classList.remove('hidden');
      if (dashView) dashView.classList.add('hidden');
    }
  } else if (viewId === 'student-portal') {
    const connectBox = document.getElementById('student-connect-box');
    const activeView = document.getElementById('student-active-submission-view');
    const statusView = document.getElementById('student-status-view');
    if (statusView && !statusView.classList.contains('active-history')) {
      statusView.classList.add('hidden');
    }
    if (verifiedStudentData) {
      if (connectBox) connectBox.classList.add('hidden');
      if (activeView && (!statusView || statusView.classList.contains('hidden'))) {
        activeView.classList.remove('hidden');
      }
      refreshStudentData(true);
      showStudentSection('dashboard');
    } else {
      if (connectBox && (!statusView || statusView.classList.contains('hidden'))) {
        connectBox.classList.remove('hidden');
      }
      if (activeView) activeView.classList.add('hidden');
    }
  } else if (viewId === 'admin-portal') {
    const loginBox = document.getElementById('admin-login-box');
    const dashView = document.getElementById('admin-dashboard-view');
    if (currentAdmin) {
      if (loginBox) loginBox.classList.add('hidden');
      if (dashView) dashView.classList.remove('hidden');
      showAdminSection('admin-overview');
    } else {
      if (loginBox) loginBox.classList.remove('hidden');
      if (dashView) dashView.classList.add('hidden');
    }
  }
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

// ------------------- AUTH STATE CHECKER -------------------
async function checkAuthStates() {
  const container = document.getElementById('auth-actions-container');
  if (!container) return;

  // Check Teacher
  try {
    const tRes = await fetch('/api/teacher/me');
    const tData = await tRes.json();
    if (tData.authenticated && tData.teacher) {
      currentTeacher = tData.teacher;
      updateTeacherProfileUI();
      container.innerHTML = `
        <div class="flex items-center space-x-1.5 sm:space-x-2">
          <button onclick="navigateTo('teacher-portal')" class="px-2.5 py-1 rounded-lg bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center space-x-1 border border-emerald-500/40 shadow-sm" title="Open Teacher Portal">
            <i class="fa-solid fa-chalkboard-user text-emerald-300"></i>
            <span class="hidden sm:inline">${currentTeacher.name}</span>
          </button>
          <button onclick="handleTeacherLogout()" class="btn-3d-glass px-2.5 py-1 rounded-lg text-red-700 text-xs font-bold shadow-sm">Logout</button>
        </div>
      `;
      const tLoginBox = document.getElementById('teacher-login-box');
      const tDashView = document.getElementById('teacher-dashboard-view');
      if (tLoginBox && tDashView) {
        tLoginBox.classList.add('hidden');
        tDashView.classList.remove('hidden');
        loadTeacherDashboardStats();
      }
      return;
    }
  } catch (e) {}

  // Check Admin
  try {
    const aRes = await fetch('/api/admin/me', { credentials: 'include' });
    const aData = await aRes.json();
    if (aData.authenticated && aData.admin) {
      currentAdmin = aData.admin;
      try { localStorage.setItem('ciems_admin_session', JSON.stringify(aData.admin)); } catch(e) {}
      container.innerHTML = `
        <div class="flex items-center space-x-1.5 sm:space-x-2">
          <button onclick="navigateTo('admin-portal')" class="px-2.5 py-1 rounded-lg bg-purple-700/80 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center space-x-1 border border-purple-500/40 shadow-sm" title="Open Admin Portal">
            <i class="fa-solid fa-shield-halved text-purple-300"></i>
            <span class="hidden sm:inline">Admin</span>
          </button>
          <button onclick="handleAdminLogout()" class="btn-3d-glass px-2.5 py-1 rounded-lg text-red-700 text-xs font-bold shadow-sm">Logout</button>
        </div>
      `;
      const aLoginBox = document.getElementById('admin-login-box');
      const aDashView = document.getElementById('admin-dashboard-view');
      if (aLoginBox && aDashView) {
        aLoginBox.classList.add('hidden');
        aDashView.classList.remove('hidden');
        showAdminSection('admin-overview');
      }
      return;
    } else if (currentAdmin) {
      return;
    }
  } catch (e) {
    if (currentAdmin) return;
  }

  // Neither logged in - keep container clean
  currentTeacher = null;
  currentAdmin = null;
  container.innerHTML = '';
}

// ------------------- URL PARAMETERS -------------------
function handleUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const teacherCode = urlParams.get('teacher');
  const path = window.location.pathname;

  if (teacherCode) {
    const el = document.getElementById('stu-teacher-code');
    if (el) el.value = teacherCode;
    navigateTo('student-portal');
  } else if (path.includes('teacher')) {
    navigateTo('teacher-portal');
  } else if (path.includes('admin')) {
    navigateTo('admin-portal');
  } else if (path.includes('student') || path.includes('submit')) {
    navigateTo('student-portal');
  } else if (path.includes('guidelines')) {
    navigateTo('guidelines');
  }
}

// ------------------- MASTER DISCIPLINES & 21 TYPES -------------------
async function loadMasterDisciplines() {
  try {
    const res = await fetch('/api/master/disciplines');
    const data = await res.json();
    masterDisciplines = data.disciplines || {};
    masterStreamClasses = data.classes || {};
    populateDisciplinesDropdowns();
  } catch (e) {
    console.error('Error loading master disciplines:', e);
  }
}

function populateDisciplinesDropdowns() {
  const lang = currentLanguage || 'en';
  const umStream = document.getElementById('um-stream');
  if (umStream) {
    const prevVal = umStream.value;
    const opts = Object.keys(masterDisciplines).map(streamName => {
      const display = formatBilingualText(streamName, lang);
      return `<option value="${streamName}" ${streamName === prevVal ? 'selected' : ''}>${display}</option>`;
    }).join('');
    umStream.innerHTML = opts;
    onUnifiedStreamChange();
  }

  const regStream = document.getElementById('reg-stream');
  if (regStream) {
    const prevVal = regStream.value;
    const otherLabel = lang === 'mr' ? 'इतर' : 'Other';
    const opts = Object.keys(masterDisciplines).map(streamName => {
      const display = formatBilingualText(streamName, lang);
      return `<option value="${streamName}" ${streamName === prevVal ? 'selected' : ''}>${display}</option>`;
    });
    opts.push(`<option value="इतर (Other)" ${'इतर (Other)' === prevVal ? 'selected' : ''}>${otherLabel}</option>`);
    regStream.innerHTML = opts.join('');
    onRegStreamChange();
  }

  // Populate Admin Faculty Stream Filter
  const adminStreamSel = document.getElementById('admin-faculty-stream-filter');
  if (adminStreamSel) {
    const prevAdminStream = adminStreamSel.value;
    const allLabel = lang === 'mr' ? 'All Streams (सर्व शाखा)' : 'All Streams (सर्व शाखा)';
    const opts = [`<option value="">${allLabel}</option>`];
    Object.keys(masterDisciplines).forEach(streamName => {
      opts.push(`<option value="${escapeHtml(streamName)}" ${streamName === prevAdminStream ? 'selected' : ''}>${escapeHtml(streamName)}</option>`);
    });
    adminStreamSel.innerHTML = opts.join('');
    if (prevAdminStream) adminStreamSel.value = prevAdminStream;
  }
}

function onUnifiedStreamChange() {
  const lang = currentLanguage || 'en';
  const stream = document.getElementById('um-stream').value;
  const subjects = masterDisciplines[stream] || [];
  const subjectSelect = document.getElementById('um-subject');
  if (!subjectSelect) return;

  const prevVal = subjectSelect.value;
  const customSubLabel = lang === 'mr' ? 'इतर विषय' : 'Other / Custom Subject';
  const opts = subjects.map(sub => {
    const display = formatBilingualText(sub, lang);
    return `<option value="${sub}" ${sub === prevVal ? 'selected' : ''}>${display}</option>`;
  });
  opts.push(`<option value="इतर (Custom Subject)" ${'इतर (Custom Subject)' === prevVal ? 'selected' : ''}>${customSubLabel}</option>`);
  subjectSelect.innerHTML = opts.join('');
  onUnifiedSubjectChange();
}

function onUnifiedSubjectChange() {
  const subjectSelect = document.getElementById('um-subject');
  const customBox = document.getElementById('um-custom-subject-box');
  if (subjectSelect && customBox) {
    if (subjectSelect.value.includes('Custom') || subjectSelect.value.includes('इतर')) {
      customBox.classList.remove('hidden');
    } else {
      customBox.classList.add('hidden');
    }
  }
}

function onRegStreamChange() {
  const lang = currentLanguage || 'en';
  const stream = document.getElementById('reg-stream').value;
  const subjects = masterDisciplines[stream] || [];
  const subjectSelect = document.getElementById('reg-subject');
  if (!subjectSelect) return;

  const prevVal = subjectSelect.value;
  const customSubLabel = lang === 'mr' ? 'इतर विषय' : 'Other Subject';
  const opts = subjects.map(sub => {
    const display = formatBilingualText(sub, lang);
    return `<option value="${sub}" ${sub === prevVal ? 'selected' : ''}>${display}</option>`;
  });
  opts.push(`<option value="इतर (Other Subject)" ${'इतर (Other Subject)' === prevVal ? 'selected' : ''}>${customSubLabel}</option>`);
  subjectSelect.innerHTML = opts.join('');
  onRegSubjectChange();
}

function onRegSubjectChange() {
  const subjectSelect = document.getElementById('reg-subject');
  const customBox = document.getElementById('reg-custom-subject-box');
  if (subjectSelect && customBox) {
    if (subjectSelect.value.includes('Other') || subjectSelect.value.includes('इतर')) {
      customBox.classList.remove('hidden');
    } else {
      customBox.classList.add('hidden');
    }
  }
}

async function loadAssessmentTypes() {
  try {
    const res = await fetch('/api/assessment-types');
    const data = await res.json();
    assessmentTypesList = data.assessment_types || [];
    renderGuidelinesDirectory();
    renderUnified21TypesChecklist();
  } catch (e) {
    console.error('Error loading types:', e);
  }
}

function toLangDigits(n, lang) {
  if (lang === 'mr') {
    const mrDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return String(n).split('').map(d => mrDigits[parseInt(d)] !== undefined ? mrDigits[parseInt(d)] : d).join('');
  }
  return String(n);
}

function formatBilingualText(val, lang = currentLanguage) {
  if (!val || typeof val !== 'string') return val || '';
  const match = val.match(/^([^(]+)\s*\(([^)]+)\)$/);
  if (match) {
    const mrPart = match[1].trim();
    const enPart = match[2].trim();
    return (lang === 'mr') ? mrPart : enPart;
  }
  return val;
}

function openAssessmentTypePreviewModal(typeName) {
  const t = findAssessmentTypeObj(typeName);
  if (!t) return;
  const lang = currentLanguage || 'en';

  const modal = document.getElementById('modal-preview-assessment-type');
  if (!modal) return;

  document.getElementById('preview-type-title').innerText = lang === 'mr' ? 'असाइनमेंट प्रकार तपशील व स्वयंचलित फील्ड्स' : 'Assessment Type Details & Dynamic Fields';
  document.getElementById('preview-type-name').innerText = t.name;
  document.getElementById('preview-type-desc').innerText = t.description || (lang === 'mr' ? 'या पद्धतीसाठी अधिकृत शैक्षणिक मूल्यांकन रचना' : 'Standard academic evaluation pattern');

  const gBadge = document.getElementById('preview-type-group-badge');
  if (gBadge) {
    if (t.is_group) {
      gBadge.className = 'px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 font-bold border border-emerald-300 text-[10px]';
      gBadge.innerText = lang === 'mr' ? '👥 गट असेसमेंट (Group)' : '👥 Group Assessment';
    } else {
      gBadge.className = 'px-2 py-0.5 rounded-md bg-blue-100 text-blue-950 font-bold border border-blue-200 text-[10px]';
      gBadge.innerText = lang === 'mr' ? '👤 वैयक्तिक असेसमेंट (Individual)' : '👤 Individual Assessment';
    }
  }

  const fields = t.fields_schema || [];
  const fieldsCountEl = document.getElementById('preview-type-fields-count');
  if (fieldsCountEl) {
    fieldsCountEl.innerText = `${fields.length} Fields (${lang === 'mr' ? 'फील्ड्स' : 'fields'})`;
  }

  const listContainer = document.getElementById('preview-type-fields-list');
  if (listContainer) {
    if (fields.length === 0) {
      listContainer.innerHTML = `<div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-center font-medium">${lang === 'mr' ? 'या असाइनमेंटसाठी थेट ऑनलाइन उत्तर संपादन व फाइल अपलोड उपलब्ध आहे.' : 'Standard descriptive answer editor & file upload mode.'}</div>`;
    } else {
      listContainer.innerHTML = fields.map((f, fIdx) => `
        <div class="p-3 rounded-xl bg-slate-50/90 border border-slate-200/90 hover:border-teal-300 transition">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
              <span class="w-4 h-4 rounded bg-teal-100 text-teal-800 text-[9.5px] font-black flex items-center justify-center">${fIdx + 1}</span>
              <span>${escapeHtml(f.label)}</span>
              ${f.required ? '<span class="text-rose-500 font-bold">*</span>' : ''}
            </span>
            <span class="text-[9.5px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">${f.type}</span>
          </div>
          ${f.placeholder ? `<div class="text-[10px] text-slate-500 font-medium pl-5 italic">Placeholder: "${escapeHtml(f.placeholder)}"</div>` : ''}
        </div>
      `).join('');
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('open');
}

function closeAssessmentTypePreviewModal() {
  const modal = document.getElementById('modal-preview-assessment-type');
  if (modal) {
    modal.classList.remove('open');
    modal.classList.add('hidden');
  }
}

function renderGuidelinesDirectory() {
  const dirContainer = document.getElementById('assessment-types-directory');
  if (!dirContainer) return;
  const lang = currentLanguage || 'en';

  const countBadge = document.getElementById('guide-dir-count-badge');
  if (countBadge) {
    countBadge.innerText = lang === 'mr' 
      ? `${toLangDigits(assessmentTypesList.length, lang)} प्रमाणित पद्धती` 
      : `${assessmentTypesList.length} Certified Methods`;
  }

  dirContainer.innerHTML = assessmentTypesList.map((t, idx) => {
    const isGroupBadge = t.is_group 
      ? `<span class="px-2 py-0.5 rounded-md bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-950 border border-emerald-300/80 text-[9.5px] font-black shrink-0 shadow-2xs">${lang === 'mr' ? 'गट कार्य' : 'Group'}</span>` 
      : '';
    
    const fieldCount = (t.fields_schema && t.fields_schema.length > 0) ? `${t.fields_schema.length} fields` : 'Standard';

    return `
      <div onclick="openAssessmentTypePreviewModal('${escapeHtml(t.name)}')" class="bg-gradient-to-b from-white to-slate-50/80 hover:from-teal-50/40 hover:to-white p-3 rounded-xl border border-slate-200/80 hover:border-teal-400 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_18px_rgba(20,184,166,0.12)] hover:-translate-y-0.5 transition-all duration-200 flex items-start space-x-2.5 group cursor-pointer" title="${lang === 'mr' ? 'या पद्धतीची स्वयंचलित फील्ड्स पाहण्यासाठी क्लिक करा' : 'Click to preview custom dynamic fields schema'}">
        <span class="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200/90 text-teal-800 font-black flex items-center justify-center text-[10.5px] shrink-0 mt-0.5 shadow-2xs group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition">${toLangDigits(idx + 1, lang)}</span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-1 mb-0.5">
            <h5 class="text-xs font-black text-slate-900 truncate group-hover:text-teal-950 transition tracking-tight">${t.name}</h5>
            ${isGroupBadge}
          </div>
          <p class="text-[10.5px] text-slate-600 line-clamp-2 leading-tight font-medium mb-1.5">${t.description || ''}</p>
          <div class="flex items-center justify-between pt-1 border-t border-slate-100">
            <span class="text-[9.5px] text-teal-700 font-bold flex items-center gap-1 group-hover:text-teal-900">
              <i class="fa-solid fa-sliders text-teal-500"></i>
              <span>${lang === 'mr' ? 'फील्ड्स पूर्वावलोकन' : 'View Fields'} (${fieldCount})</span>
            </span>
            <i class="fa-solid fa-chevron-right text-[9px] text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition"></i>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderUnified21TypesChecklist() {
  const container = document.getElementById('um-21-types-container');
  if (!container) return;

  container.innerHTML = assessmentTypesList.map((t, idx) => {
    const isDefaultChecked = (idx < 4);
    const checkedAttr = isDefaultChecked ? 'checked' : '';

    return `
      <div class="flex items-center justify-between p-2.5 px-3 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 transition text-xs shadow-xs">
        <div class="flex items-center space-x-2 font-bold text-slate-800 flex-1 truncate mr-2">
          <input type="checkbox" id="um-chk-${t.id}" value="${t.id}" data-name="${t.name}" ${checkedAttr} onchange="updateUnifiedMarksSummary()" class="um-type-chk rounded text-blue-600 w-4 h-4 cursor-pointer shrink-0">
          <label for="um-chk-${t.id}" class="cursor-pointer truncate" title="${idx + 1}. ${t.name}">
            <span>${idx + 1}. ${t.name}</span>
          </label>
          ${t.is_group ? '<span class="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold shrink-0">Group</span>' : ''}
          <button type="button" onclick="openAssessmentTypePreviewModal('${escapeHtml(t.name)}')" class="text-teal-600 hover:text-teal-800 p-0.5 ml-1 shrink-0 cursor-pointer" title="या पद्धतीतील स्वयंचलित फील्ड्स पहा">
            <i class="fa-solid fa-circle-info text-[11px]"></i>
          </button>
        </div>

        <div class="flex items-center space-x-1 shrink-0">
          <input type="number" id="um-marks-${t.id}" value="10" min="1" max="100" step="1" oninput="updateUnifiedMarksSummary()" class="w-14 text-xs font-bold text-blue-900 py-1 px-1 rounded-lg border border-slate-300 bg-slate-50 text-center focus:bg-white focus:border-blue-500">
          <span class="text-[11px] font-bold text-slate-500">M</span>
          <input type="hidden" id="um-desc-${t.id}" value="">
        </div>
      </div>
    `;
  }).join('');

  updateUnifiedMarksSummary();
}

function updateUnifiedMarksSummary() {
  const targetMarks = parseFloat(document.getElementById('um-max-marks')?.value || 40);
  const targetSpan = document.getElementById('um-target-marks');
  if (targetSpan) targetSpan.innerText = targetMarks;

  let totalAllocated = 0;
  document.querySelectorAll('.um-type-chk:checked').forEach(chk => {
    const typeId = chk.value;
    const marksInput = document.getElementById(`um-marks-${typeId}`);
    const marks = parseFloat(marksInput ? marksInput.value : 0) || 0;
    totalAllocated += marks;
  });

  const allocatedSpan = document.getElementById('um-allocated-marks');
  const counterBox = document.getElementById('um-marks-counter');

  if (allocatedSpan) {
    allocatedSpan.innerText = totalAllocated;
    if (totalAllocated === targetMarks) {
      allocatedSpan.className = 'text-emerald-700 font-extrabold';
      if (counterBox) counterBox.className = 'px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900';
    } else {
      allocatedSpan.className = 'text-red-700 font-extrabold';
      if (counterBox) counterBox.className = 'px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900';
    }
  }
}

// =========================================================================
// 1. STUDENT PORTAL (DYNAMIC CLASS / SEMESTER & VERIFIED PROFILE)
// =========================================================================
let studentLookupDebounce = null;
let currentStudentTeacherData = null;

function fillStudentDemo(code, prn, email) {
  const emInput = document.getElementById('stu-email');
  if (emInput && email) emInput.value = email;
  const pInput = document.getElementById('stu-prn');
  if (pInput) pInput.value = prn;

  const loginEm = document.getElementById('login-stu-email');
  if (loginEm && email) loginEm.value = email;
  const loginP = document.getElementById('login-stu-prn');
  if (loginP) loginP.value = prn;

  handleStudentEmailOrPrnInput('portal', code);
  handleStudentEmailOrPrnInput('login', code);
}

async function handleStudentEmailOrPrnInput(context, autoSelectCode) {
  clearTimeout(studentLookupDebounce);
  const isLogin = context === 'login';
  const emEl = isLogin ? document.getElementById('login-stu-email') : document.getElementById('stu-email');
  const prnEl = isLogin ? document.getElementById('login-stu-prn') : document.getElementById('stu-prn');
  const selectEl = isLogin ? document.getElementById('login-stu-teacher-select') : document.getElementById('stu-teacher-select');
  const spinnerEl = isLogin ? document.getElementById('login-stu-lookup-spinner') : document.getElementById('stu-teacher-lookup-spinner');
  const bannerEl = isLogin ? document.getElementById('login-stu-teacher-banner') : document.getElementById('stu-teacher-info-banner');

  const email = (emEl ? emEl.value : '').trim().toLowerCase();
  const prn = (prnEl ? prnEl.value : '').trim();

  if (!email && !prn) {
    if (selectEl) {
      selectEl.innerHTML = '<option value="">-- आधी ईमेल व PRN प्रविष्ट करा --</option>';
    }
    if (bannerEl) bannerEl.classList.add('hidden');
    return;
  }

  studentLookupDebounce = setTimeout(async () => {
    if (spinnerEl) spinnerEl.classList.remove('hidden');

    try {
      const res = await fetch(`/api/student/lookup-teachers?email=${encodeURIComponent(email)}&prn=${encodeURIComponent(prn)}`);
      if (spinnerEl) spinnerEl.classList.add('hidden');

      if (!res.ok) {
        if (selectEl) selectEl.innerHTML = '<option value="">-- संबंधित शिक्षक सापडले नाहीत --</option>';
        if (bannerEl) bannerEl.classList.add('hidden');
        return;
      }

      const data = await res.json();
      const teachers = data.teachers || [];

      if (!selectEl) return;

      if (teachers.length === 0) {
        selectEl.innerHTML = '<option value="">-- या माहितीसाठी शिक्षक सापडले नाहीत (No mapped teacher) --</option>';
        if (bannerEl) bannerEl.classList.add('hidden');
        return;
      }

      selectEl.innerHTML = '';
      if (teachers.length > 1) {
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = '-- शिक्षक निवडा / Select Mapped Teacher --';
        selectEl.appendChild(defaultOpt);
      }

      teachers.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.teacher_code;
        opt.textContent = `${t.teacher_code} — ${t.teacher_name} (${t.subject_name || t.faculty_stream || ''})`;
        opt.dataset.teacherName = t.teacher_name;
        opt.dataset.designation = t.designation || 'Faculty';
        opt.dataset.college = t.college_name || '';
        opt.dataset.subject = t.subject_name || '';
        opt.dataset.stream = t.faculty_stream || '';
        opt.dataset.studentName = t.student_name || '';
        opt.dataset.className = t.class_name || '';
        opt.dataset.prn = t.prn || '';
        opt.dataset.roll = t.roll_number || '';
        opt.dataset.email = t.roster_email || '';
        selectEl.appendChild(opt);
      });

      // Auto-select if specific code requested or only 1 teacher mapped
      let targetCode = autoSelectCode;
      if (!targetCode && teachers.length === 1) {
        targetCode = teachers[0].teacher_code;
      }

      if (targetCode) {
        selectEl.value = targetCode;
        handleStudentTeacherSelectChange(targetCode, context);
      } else {
        if (bannerEl) bannerEl.classList.add('hidden');
      }

    } catch (err) {
      if (spinnerEl) spinnerEl.classList.add('hidden');
      console.error('Student teacher lookup error:', err);
    }
  }, 100);
}

function handleStudentTeacherSelectChange(selectedCode, context) {
  const isLogin = context === 'login';
  const selectEl = isLogin ? document.getElementById('login-stu-teacher-select') : document.getElementById('stu-teacher-select');
  const hiddenCodeEl = isLogin ? document.getElementById('login-stu-teacher-code') : document.getElementById('stu-teacher-code');
  const bannerEl = isLogin ? document.getElementById('login-stu-teacher-banner') : document.getElementById('stu-teacher-info-banner');
  const nameEl = isLogin ? document.getElementById('login-stu-banner-name') : document.getElementById('stu-banner-teacher-name');
  const collegeEl = isLogin ? document.getElementById('login-stu-banner-college') : document.getElementById('stu-banner-college-info');
  const codeBadgeEl = isLogin ? document.getElementById('login-stu-banner-code') : null;

  if (hiddenCodeEl) hiddenCodeEl.value = selectedCode || '';

  if (!selectedCode || !selectEl) {
    if (bannerEl) bannerEl.classList.add('hidden');
    return;
  }

  const selectedOpt = selectEl.options[selectEl.selectedIndex];
  if (selectedOpt && selectedOpt.value) {
    const tName = selectedOpt.dataset.teacherName || '';
    const tDesig = selectedOpt.dataset.designation || 'Faculty';
    const tCollege = selectedOpt.dataset.college || '';
    const tSubject = selectedOpt.dataset.subject || '';

    if (nameEl) nameEl.innerText = `${tName} (${tDesig})`;
    if (collegeEl) collegeEl.innerText = `${tCollege} • ${tSubject}`;
    if (codeBadgeEl) codeBadgeEl.innerText = selectedCode;
    if (bannerEl) bannerEl.classList.remove('hidden');
  } else {
    if (bannerEl) bannerEl.classList.add('hidden');
  }
}

async function handleStudentTeacherCodeLookup(code, context) {
  // Maintained for backward-compatibility
  handleStudentEmailOrPrnInput(context, code);
}

let currentStudentAssignmentFilter = 'all';

async function handleStudentVerify(e) {
  if (e) e.preventDefault();
  let teacherCode = '';
  let prn = '';
  let email = '';
  let btn = null;

  const form = (e && e.target) ? e.target : null;

  if (form) {
    btn = form.querySelector('button[type="submit"]');
    const tcSel = form.querySelector('[name="teacher_select"]');
    const tcEl = form.querySelector('[name="teacher_code"]') || form.querySelector('#login-stu-teacher-code') || form.querySelector('#stu-teacher-code');
    const prnEl = form.querySelector('[name="prn"]') || form.querySelector('#login-stu-prn') || form.querySelector('#stu-prn');
    const emEl = form.querySelector('[name="email"]') || form.querySelector('#login-stu-email') || form.querySelector('#stu-email');
    if (tcSel && tcSel.value) teacherCode = tcSel.value.trim().toUpperCase();
    else if (tcEl) teacherCode = tcEl.value.trim().toUpperCase();
    if (prnEl) prn = prnEl.value.trim();
    if (emEl) email = emEl.value.trim().toLowerCase();
  }

  if (!prn) {
    const el = document.getElementById('login-stu-prn') || document.getElementById('stu-prn');
    prn = el ? el.value.trim() : '';
  }
  if (!email) {
    const el = document.getElementById('login-stu-email') || document.getElementById('stu-email');
    email = el ? el.value.trim().toLowerCase() : '';
  }

  if (!btn) {
    btn = document.getElementById('login-btn-verify-student') || document.getElementById('btn-verify-student');
  }

  if (!prn) {
    showToast('कृपया आपला PRN नंबर प्रविष्ट करा. (Please enter your Student PRN / Enrollment Number)', 'error');
    return;
  }

  const origBtnHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Verifying Profile...</span>';
  }

  try {
    const payload = {
      teacher_code: teacherCode,
      prn: prn,
      email: email,
      student_email: email
    };

    const res = await fetch('/api/student/connect-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok || !data.verified || !data.student) {
      showToast(data.error || 'Verification failed. Please check PRN and Registered Email ID.', 'error');
      return;
    }

    verifiedStudentData = data;
    
    // Sync inputs
    const pPrn = document.getElementById('stu-prn');
    const pEm = document.getElementById('stu-email');
    if (pPrn) pPrn.value = prn;
    if (pEm) pEm.value = email || data.student.email || '';

    renderStudentVerifiedForm();
    showToast(`Welcome, ${data.student?.student_name}! Your profile is verified.`, 'success');

  } catch (err) {
    console.error('Student verify error:', err);
    showToast('Could not contact server. Please check connection.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origBtnHtml || '<i class="fa-solid fa-right-to-bracket"></i> <span>Verify Profile & Open Portal</span>';
    }
  }
}

async function refreshStudentData(preserveSection = true) {
  if (!verifiedStudentData || !verifiedStudentData.student) return;
  const prn = verifiedStudentData.student.prn;
  const email = verifiedStudentData.student.email;
  const teacherCode = verifiedStudentData.teacher?.teacher_code || '';

  try {
    const res = await fetch('/api/student/connect-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teacher_code: teacherCode,
        prn: prn,
        email: email,
        student_email: email
      })
    });
    const data = await res.json();
    if (res.ok && data.verified && data.student) {
      verifiedStudentData = data;
      
      const s = verifiedStudentData.student;
      const enrolledTeachers = verifiedStudentData.enrolled_teachers || [];
      const assessments = verifiedStudentData.active_assessments || [];
      const announcements = verifiedStudentData.announcements || [];
      const materials = verifiedStudentData.study_materials || [];
      const summary = verifiedStudentData.summary || {
        total_assignments: assessments.length,
        submitted_assignments: assessments.filter(a => a.is_submitted).length,
        pending_assignments: assessments.filter(a => !a.is_submitted).length,
        total_enrolled_teachers: enrolledTeachers.length,
        total_announcements: announcements.length,
        total_study_materials: materials.length
      };

      // Header profile elements
      if (document.getElementById('stu-verified-name')) document.getElementById('stu-verified-name').innerText = s.student_name;
      if (document.getElementById('stu-verified-prn')) document.getElementById('stu-verified-prn').innerText = s.prn;
      if (document.getElementById('stu-verified-roll')) document.getElementById('stu-verified-roll').innerText = s.roll_number;
      if (document.getElementById('stu-verified-class')) document.getElementById('stu-verified-class').innerText = `${s.class_name} (Div ${s.division || 'A'})`;
      if (document.getElementById('stu-verified-email')) document.getElementById('stu-verified-email').innerText = s.email || '';

      // Tab badges
      const isMr = currentLanguage === 'mr';
      const pendingCount = summary.pending_assignments;
      if (document.getElementById('stu-tab-asm-badge')) {
        document.getElementById('stu-tab-asm-badge').innerText = `${summary.total_assignments} ${isMr ? 'स्वाध्याय' : 'Tasks'}`;
      }
      const pendingPill = document.getElementById('stu-tab-asm-pending-pill');
      if (pendingPill) {
        if (pendingCount > 0) {
          pendingPill.classList.remove('hidden');
          pendingPill.innerText = `${pendingCount} ${isMr ? 'बाकी' : 'Pending'}`;
        } else {
          pendingPill.classList.add('hidden');
        }
      }
      if (document.getElementById('stu-tab-ann-badge')) {
        document.getElementById('stu-tab-ann-badge').innerText = `${summary.total_announcements} ${isMr ? 'सूचना' : 'Notices'}`;
      }
      if (document.getElementById('stu-tab-mat-badge')) {
        document.getElementById('stu-tab-mat-badge').innerText = `${summary.total_study_materials} ${isMr ? 'लिंक्स' : 'Links'}`;
      }
      if (document.getElementById('stu-tab-history-badge')) {
        document.getElementById('stu-tab-history-badge').innerText = `${summary.submitted_assignments || 0} ${isMr ? 'नोंदी' : 'Records'}`;
      }

      // Populate hidden Session select for submission form
      const sessionSelect = document.getElementById('stu-session-select');
      if (sessionSelect) {
        const curVal = sessionSelect.value;
        sessionSelect.innerHTML = '<option value="">-- Select Assessment Session --</option>';
        assessments.forEach(asm => {
          const displayTopic = asm.individual_topic || asm.assigned_topic || asm.assignment_topic;
          sessionSelect.innerHTML += `
            <option value="${asm.id}">${escapeHtml(asm.assessment_session_title)} — ${escapeHtml(displayTopic)} (${asm.max_marks} Marks)</option>
          `;
        });
        if (curVal) sessionSelect.value = curVal;
      }

      // Re-render subsections
      try { renderStudentDashboard(); } catch (err) {}
      try { renderStudentAssignments('all'); } catch (err) {}
      try { renderStudentAnnouncements(); } catch (err) {}
      try { renderStudentStudyMaterial(); } catch (err) {}
      try { loadStudentHistory(); } catch (err) {}
    }
  } catch (err) {
    console.error('refreshStudentData error:', err);
  }
}

function showStudentSection(secName) {
  document.querySelectorAll('.stu-sub-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.stu-btn-nav').forEach(b => b.classList.remove('active'));

  const target = document.getElementById('stu-sec-' + secName);
  if (target) {
    target.classList.add('active');
  }

  const activeBtn = document.getElementById('stu-tab-btn-' + secName) || document.querySelector(`.stu-btn-nav[data-sec="${secName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  if (secName === 'assignments') {
    closeStudentAssignmentSolver();
  }
  if (secName === 'history') {
    loadStudentHistory();
  }
}

function renderStudentVerifiedForm(shouldNavigate = true) {
  if (!verifiedStudentData) return;
  const s = verifiedStudentData.student;
  const t = verifiedStudentData.teacher || {};
  const enrolledTeachers = verifiedStudentData.enrolled_teachers || [];
  const assessments = verifiedStudentData.active_assessments || [];
  const announcements = verifiedStudentData.announcements || [];
  const materials = verifiedStudentData.study_materials || [];
  const summary = verifiedStudentData.summary || {
    total_assignments: assessments.length,
    submitted_assignments: assessments.filter(a => a.is_submitted).length,
    pending_assignments: assessments.filter(a => !a.is_submitted).length,
    total_enrolled_teachers: enrolledTeachers.length,
    total_announcements: announcements.length,
    total_study_materials: materials.length
  };

  // Header profile elements
  if (document.getElementById('stu-verified-name')) document.getElementById('stu-verified-name').innerText = s.student_name;
  if (document.getElementById('stu-verified-prn')) document.getElementById('stu-verified-prn').innerText = s.prn;
  if (document.getElementById('stu-verified-roll')) document.getElementById('stu-verified-roll').innerText = s.roll_number;
  if (document.getElementById('stu-verified-class')) document.getElementById('stu-verified-class').innerText = `${s.class_name} (Div ${s.division || 'A'})`;
  if (document.getElementById('stu-verified-email')) document.getElementById('stu-verified-email').innerText = s.email || '';

  // Tab count badges
  const isMr = currentLanguage === 'mr';
  const pendingCount = summary.pending_assignments;
  if (document.getElementById('stu-tab-asm-badge')) {
    document.getElementById('stu-tab-asm-badge').innerText = `${summary.total_assignments} ${isMr ? 'स्वाध्याय' : 'Tasks'}`;
  }
  const pendingPill = document.getElementById('stu-tab-asm-pending-pill');
  if (pendingPill) {
    if (pendingCount > 0) {
      pendingPill.classList.remove('hidden');
      pendingPill.innerText = `${pendingCount} ${isMr ? 'बाकी' : 'Pending'}`;
    } else {
      pendingPill.classList.add('hidden');
    }
  }
  if (document.getElementById('stu-tab-ann-badge')) {
    document.getElementById('stu-tab-ann-badge').innerText = `${summary.total_announcements} ${isMr ? 'सूचना' : 'Notices'}`;
  }
  if (document.getElementById('stu-tab-mat-badge')) {
    document.getElementById('stu-tab-mat-badge').innerText = `${summary.total_study_materials} ${isMr ? 'लिंक्स' : 'Links'}`;
  }
  if (document.getElementById('stu-tab-history-badge')) {
    document.getElementById('stu-tab-history-badge').innerText = `${summary.submitted_assignments || 0} ${isMr ? 'नोंदी' : 'Records'}`;
  }

  // Render Subsections safely
  try { renderStudentDashboard(); } catch (err) { console.error('Dashboard render error:', err); }
  try { renderStudentAssignments('all'); } catch (err) { console.error('Assignments render error:', err); }
  try { renderStudentAnnouncements(); } catch (err) { console.error('Announcements render error:', err); }
  try { renderStudentStudyMaterial(); } catch (err) { console.error('Study materials render error:', err); }
  try { loadStudentHistory(); } catch (err) { console.error('History load error:', err); }

  // Populate hidden Session select for submission form
  const sessionSelect = document.getElementById('stu-session-select');
  if (sessionSelect) {
    sessionSelect.innerHTML = '<option value="">-- Select Assessment Session --</option>';
    assessments.forEach(asm => {
      const displayTopic = asm.individual_topic || asm.assigned_topic || asm.assignment_topic;
      sessionSelect.innerHTML += `
        <option value="${asm.id}">${escapeHtml(asm.assessment_session_title)} — ${escapeHtml(displayTopic)} (${asm.max_marks} Marks)</option>
      `;
    });
  }

  if (shouldNavigate) {
    document.getElementById('student-connect-box')?.classList.add('hidden');
    document.getElementById('student-status-view')?.classList.add('hidden');
    document.getElementById('student-active-submission-view')?.classList.remove('hidden');
    
    navigateTo('student-portal');
    showStudentSection('dashboard');
  }
}

function renderStudentDashboard() {
  if (!verifiedStudentData) return;
  const isMr = currentLanguage === 'mr';
  const s = verifiedStudentData.student;
  const summary = verifiedStudentData.summary || {};
  const assessments = verifiedStudentData.active_assessments || [];
  const enrolledTeachers = verifiedStudentData.enrolled_teachers || [];

  const totalAsm = summary.total_assignments || assessments.length;
  const submittedAsm = summary.submitted_assignments || assessments.filter(a => a.is_submitted).length;
  const pendingAsm = summary.pending_assignments || (totalAsm - submittedAsm);
  const totalTeachers = summary.total_enrolled_teachers || enrolledTeachers.length;
  const totalMaterials = summary.total_study_materials || (verifiedStudentData.study_materials || []).length;

  if (document.getElementById('stu-dash-kpi-total')) document.getElementById('stu-dash-kpi-total').innerText = totalAsm;
  if (document.getElementById('stu-dash-kpi-submitted')) document.getElementById('stu-dash-kpi-submitted').innerText = submittedAsm;
  if (document.getElementById('stu-dash-kpi-pending')) document.getElementById('stu-dash-kpi-pending').innerText = pendingAsm;
  if (document.getElementById('stu-dash-kpi-teachers')) document.getElementById('stu-dash-kpi-teachers').innerText = totalTeachers;
  if (document.getElementById('stu-dash-kpi-materials')) document.getElementById('stu-dash-kpi-materials').innerText = totalMaterials;

  // Completion Progress
  const percent = totalAsm > 0 ? Math.round((submittedAsm / totalAsm) * 100) : 0;
  const bar = document.getElementById('stu-dash-progress-bar');
  const percentLabel = document.getElementById('stu-dash-progress-percent');
  if (bar) bar.style.width = `${percent}%`;
  if (percentLabel) {
    percentLabel.innerText = isMr ? `${percent}% पूर्ण (${submittedAsm}/${totalAsm})` : `${percent}% Completed (${submittedAsm}/${totalAsm})`;
  }

  // Pending Tasks List (Includes non-submitted and Reopened for revision assignments)
  const pendingContainer = document.getElementById('stu-dash-pending-list');
  const pendingTasks = assessments.filter(a => !a.is_submitted || a.is_reopened);
  if (pendingContainer) {
    if (pendingTasks.length === 0) {
      pendingContainer.innerHTML = `
        <div class="p-6 text-center bg-emerald-50/60 rounded-2xl border border-emerald-200 text-emerald-900 space-y-1">
          <i class="fa-solid fa-circle-check text-2xl text-emerald-600"></i>
          <p class="font-bold text-xs">${isMr ? 'सर्व स्वाध्याय सादर करण्यात आले आहेत!' : 'All current assignments submitted successfully!'}</p>
          <p class="text-[11px] text-emerald-700">${isMr ? 'आपले सर्व अंतर्गत स्वाध्याय यशस्वीरीत्या सबमिट झाले आहेत.' : 'Great work! No pending tasks remaining.'}</p>
        </div>
      `;
    } else {
      pendingContainer.innerHTML = pendingTasks.map(asm => {
        const displayTopic = asm.individual_topic || asm.assigned_topic || asm.assignment_topic;
        const isReopened = Boolean(asm.is_reopened);
        return `
          <div class="p-4 rounded-2xl ${isReopened ? 'bg-orange-50/90 border-2 border-orange-400 ring-2 ring-orange-200' : 'bg-amber-50/50 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'} transition shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="space-y-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                ${isReopened 
                  ? `<span class="px-2.5 py-0.5 rounded-full bg-orange-200 text-orange-950 font-extrabold text-[10px] animate-pulse border border-orange-400">🔄 ${isMr ? 'सुधारणेसाठी पुन्हा उघडले' : 'Reopened for Revision'}</span>`
                  : `<span class="px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold text-[10px]">${escapeHtml(asm.assessment_type || 'CIE')}</span>`
                }
                <span class="text-[11px] font-bold text-slate-700">${escapeHtml(asm.class_name || s.class_name)}</span>
                <span class="text-[10px] text-slate-400 font-mono">• ${escapeHtml(asm.teacher_name || '')} (${escapeHtml(asm.teacher_code || '')})</span>
              </div>
              <h5 class="font-bold text-slate-900 text-xs">${escapeHtml(asm.assessment_session_title)}</h5>
              <p class="text-[11px] text-slate-600 line-clamp-1"><i class="fa-regular fa-file-lines text-slate-400 mr-1"></i>${escapeHtml(displayTopic)}</p>
              <div class="text-[10.5px] text-slate-500 flex items-center gap-3 pt-0.5">
                <span>${isMr ? 'गुण:' : 'Marks:'} <strong class="text-emerald-700 font-bold">${asm.max_marks}</strong></span>
                <span>${isMr ? 'अंतिम मुदत:' : 'Deadline:'} <strong class="text-rose-700">${asm.submission_deadline || (isMr ? 'खुले' : 'Open')}</strong></span>
              </div>
            </div>
            <button type="button" onclick="openStudentAssignment(${asm.id})" class="btn-3d-amber ${isReopened ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500' : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600'} text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow shrink-0 flex items-center justify-center gap-1.5 cursor-pointer">
              <i class="fa-solid ${isReopened ? 'fa-rotate' : 'fa-pen-to-square'}"></i>
              <span>${isReopened ? (isMr ? 'सुधारणा करा' : 'Revise & Submit') : (isMr ? 'सोडवा' : 'Solve Now')}</span>
            </button>
          </div>
        `;
      }).join('');
    }
  }

  // Enrolled Teachers List
  const teachersContainer = document.getElementById('stu-dash-teachers-list');
  const teachersBadge = document.getElementById('stu-dash-teachers-count-badge');
  if (teachersBadge) teachersBadge.innerText = `${enrolledTeachers.length} ${isMr ? 'शिक्षक' : 'Faculty'}`;
  if (teachersContainer) {
    if (enrolledTeachers.length === 0) {
      teachersContainer.innerHTML = `<p class="text-xs text-slate-400 p-4 text-center">${isMr ? 'कोणतेही शिक्षक जोडलेले नाहीत.' : 'No faculty enrolled yet.'}</p>`;
    } else {
      teachersContainer.innerHTML = enrolledTeachers.map(t => `
        <div class="p-3 bg-slate-50 hover:bg-indigo-50/40 rounded-xl border border-slate-200 flex items-center justify-between gap-2 transition">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
              <i class="fa-solid fa-chalkboard-user"></i>
            </span>
            <div class="min-w-0">
              <h5 class="font-bold text-slate-900 text-xs truncate">${escapeHtml(t.teacher_name)}</h5>
              <p class="text-[10px] text-slate-500 truncate">${escapeHtml(t.designation || (isMr ? 'प्राध्यापक' : 'Faculty'))} • ${escapeHtml(t.class_name)}</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-mono font-bold text-[10px] shrink-0">${escapeHtml(t.teacher_code)}</span>
        </div>
      `).join('');
    }
  }
}

function filterStudentAssignments(filter) {
  currentStudentAssignmentFilter = filter;
  document.querySelectorAll('.stu-asm-filter').forEach(btn => {
    btn.classList.remove('active', 'bg-white', 'text-slate-900', 'shadow-xs');
    btn.classList.add('text-slate-600');
  });
  const activeBtn = document.getElementById('stu-filter-' + filter);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-white', 'text-slate-900', 'shadow-xs');
    activeBtn.classList.remove('text-slate-600');
  }
  renderStudentAssignments(filter);
}

function renderStudentAssignments(filter = 'all') {
  const container = document.getElementById('stu-assignments-cards-grid');
  if (!container || !verifiedStudentData) return;
  const isMr = currentLanguage === 'mr';
  const assessments = verifiedStudentData.active_assessments || [];
  const s = verifiedStudentData.student;

  let list = assessments;
  if (filter === 'pending') {
    list = assessments.filter(a => !a.is_submitted || a.is_reopened);
  } else if (filter === 'submitted') {
    list = assessments.filter(a => a.is_submitted && !a.is_reopened);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
        <i class="fa-solid fa-folder-open text-3xl text-slate-300"></i>
        <p class="text-xs font-bold text-slate-700">${isMr ? 'या श्रेणीत कोणतेही स्वाध्याय उपलब्ध नाहीत.' : 'No assignments found in this category.'}</p>
        <p class="text-[11px]">${isMr ? 'नवीन स्वाध्यायासाठी कृपया नंतर पुन्हा तपासा.' : 'Please check back later for active assignments.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(asm => {
    const displayTopic = asm.individual_topic || asm.assigned_topic || asm.assignment_topic;
    const isReopened = Boolean(asm.is_reopened);
    const isSubmitted = Boolean(asm.is_submitted) && !isReopened;
    const sub = asm.student_submission;

    return `
      <div class="bg-white rounded-2xl p-5 border ${isReopened ? 'border-orange-300 bg-gradient-to-b from-orange-50/40 to-white shadow-xs ring-1 ring-orange-200' : (isSubmitted ? 'border-emerald-200 bg-gradient-to-b from-emerald-50/20 to-white shadow-xs' : 'border-slate-200 hover:border-amber-400 hover:shadow-md')} transition flex flex-col justify-between space-y-4">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            ${isReopened ? `
              <span class="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-extrabold text-[10.5px] flex items-center gap-1">
                <i class="fa-solid fa-rotate-right text-orange-600 animate-spin" style="animation-duration: 3s;"></i>
                <span>${isMr ? 'सुधारणेसाठी पुनरुज्जीवित' : 'Reopened for Revision'}</span>
              </span>
            ` : `
              <span class="px-2.5 py-0.5 rounded-full ${isSubmitted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'} font-bold text-[10.5px]">
                ${escapeHtml(asm.assessment_type || (isMr ? 'मूल्यमापन' : 'Assessment'))}
              </span>
            `}
            <span class="text-xs font-mono font-bold text-slate-400">${escapeHtml(asm.class_name || s.class_name)}</span>
          </div>

          <div>
            <h4 class="font-extrabold text-slate-900 text-sm leading-snug">${escapeHtml(asm.assessment_session_title)}</h4>
            <div class="mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
              <span class="text-[10px] text-slate-400 font-bold block mb-0.5">${isMr ? 'विषय / प्रश्न:' : 'Topic / Question:'}</span>
              <p class="line-clamp-2 font-medium">${escapeHtml(displayTopic)}</p>
            </div>
          </div>

          <div class="text-[11px] text-slate-500 space-y-1 pt-1">
            <div class="flex items-center justify-between">
              <span>${isMr ? 'शिक्षक:' : 'Teacher:'} <strong class="text-slate-800">${escapeHtml(asm.teacher_name || '')}</strong></span>
              <span class="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">${escapeHtml(asm.teacher_code || '')}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>${isMr ? 'एकूण गुण:' : 'Max Marks:'} <strong class="text-emerald-700 font-bold">${asm.max_marks} ${isMr ? 'गुण' : 'Marks'}</strong></span>
              <span>${isMr ? 'अंतिम मुदत:' : 'Deadline:'} <strong class="${isSubmitted ? 'text-slate-500' : 'text-rose-700'}">${asm.submission_deadline || (isMr ? 'खुले' : 'Open')}</strong></span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          ${isReopened ? `
            <button type="button" onclick="openStudentAssignment(${asm.id})" class="w-full btn-3d-amber bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs shadow flex items-center justify-center gap-2 transition cursor-pointer">
              <i class="fa-solid fa-rotate-right text-white"></i>
              <span>${isMr ? 'सुधारणा करून पुन्हा सादर करा (Revise & Resubmit)' : 'Revise & Resubmit'}</span>
            </button>
          ` : isSubmitted ? `
            <div class="flex items-center justify-between w-full">
              <span class="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5">
                <i class="fa-solid fa-circle-check text-emerald-600"></i>
                <span>${isMr ? 'सादर केले' : 'Submitted'}</span>
                ${sub && sub.marks_hidden ? ` • <span class="text-amber-800 font-bold" title="शिक्षकांनी निकाल राखीव ठेवला आहे">🔒 ${isMr ? 'गुण राखीव' : 'Marks Withheld'}</span>` : (sub && sub.marks_obtained !== null && sub.marks_obtained !== undefined ? ` • <strong>${sub.marks_obtained}/${asm.max_marks} M</strong>` : '')}
              </span>
              ${sub && sub.pdf_url ? `
                <a href="${sub.pdf_url}${sub.marks_hidden ? '?for=student' : '?show_marks=1'}" target="_blank" class="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 transition shadow-2xs" title="${isMr ? 'अधिकृत PDF प्रत डाउनलोड करा' : 'Download Official PDF'}">
                  <i class="fa-solid fa-file-pdf text-sm"></i>
                  <span>PDF</span>
                </a>
              ` : ''}
            </div>
          ` : `
            <button type="button" onclick="openStudentAssignment(${asm.id})" class="w-full btn-3d-amber bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs shadow flex items-center justify-center gap-2 transition cursor-pointer">
              <i class="fa-solid fa-pen-to-square text-white"></i>
              <span>${isMr ? 'स्वाध्याय सोडवा' : 'Solve Assignment'}</span>
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function openStudentAssignment(asmId) {
  showStudentSection('assignments');
  const listContainer = document.getElementById('stu-assignments-list-container');
  const solverContainer = document.getElementById('stu-assignment-solver-container');
  const sessionSelect = document.getElementById('stu-session-select');

  if (listContainer) listContainer.classList.add('hidden');
  if (solverContainer) solverContainer.classList.remove('hidden');

  if (sessionSelect) {
    sessionSelect.value = asmId;
    onStudentSessionChange();
  }

  window.scrollTo({ top: solverContainer?.offsetTop ? solverContainer.offsetTop - 80 : 0, behavior: 'smooth' });
}

function closeStudentAssignmentSolver() {
  const listContainer = document.getElementById('stu-assignments-list-container');
  const solverContainer = document.getElementById('stu-assignment-solver-container');
  if (solverContainer) solverContainer.classList.add('hidden');
  if (listContainer) listContainer.classList.remove('hidden');
  startQuizCountdownTimer(0);
  if (autoDraftSaveTimerInterval) {
    clearInterval(autoDraftSaveTimerInterval);
    autoDraftSaveTimerInterval = null;
  }
}

function selectStudentAssessmentById(asmId) {
  openStudentAssignment(asmId);
}

function renderStudentAnnouncements() {
  const container = document.getElementById('stu-announcements-list');
  const countBadge = document.getElementById('stu-announcements-count-badge');
  if (!container || !verifiedStudentData) return;
  const isMr = currentLanguage === 'mr';
  const announcements = verifiedStudentData.announcements || [];

  if (countBadge) countBadge.innerText = `${announcements.length} ${isMr ? 'सूचना' : (announcements.length === 1 ? 'Notice' : 'Notices')}`;

  if (announcements.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
        <i class="fa-solid fa-bullhorn text-3xl text-slate-300"></i>
        <p class="text-xs font-bold text-slate-700">${isMr ? 'कोणतीही नवीन नोटीस उपलब्ध नाही.' : 'No active announcements available.'}</p>
        <p class="text-[11px]">${isMr ? 'शिक्षकांनी पाठवलेल्या सूचना येथे दिसतील.' : 'Notices published by your teachers will appear here.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = announcements.map(a => `
    <div class="p-5 bg-white rounded-2xl border border-rose-200 shadow-sm space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-rose-100">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0">
            <i class="fa-solid fa-bullhorn"></i>
          </span>
          <div>
            <h4 class="font-extrabold text-slate-900 text-sm">${escapeHtml(a.title)}</h4>
            <p class="text-[10px] text-slate-500">
              <span class="font-semibold text-rose-800">${escapeHtml(a.teacher_name || (isMr ? 'शिक्षक' : 'Teacher'))}</span> • 
              <span>${escapeHtml(a.teacher_designation || '')}</span> • 
              <span class="font-mono">${a.created_at ? a.created_at.slice(0, 16) : ''}</span>
            </p>
          </div>
        </div>
        <span class="px-2.5 py-0.5 rounded-full ${a.target_class === 'ALL' ? 'bg-purple-100 text-purple-800' : 'bg-rose-100 text-rose-800'} font-bold text-[10.5px] self-start sm:self-center">
          ${a.target_class === 'ALL' ? (isMr ? 'सर्व वर्ग' : 'ALL') : escapeHtml(a.target_class)}
        </span>
      </div>

      <p class="text-slate-700 text-xs leading-relaxed whitespace-pre-line">${escapeHtml(a.message)}</p>

      <div class="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div>
          ${a.reference_url ? `
            <a href="${escapeHtml(a.reference_url)}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline">
              <i class="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
              <span>${isMr ? 'संदर्भ साहित्य लिंक उघडा' : 'Open Reference Material'}</span>
            </a>
          ` : `<span class="text-[11px] text-slate-400">${isMr ? 'अधिकृत सूचना' : 'Official Notice'}</span>`}
        </div>

        <div class="flex items-center gap-1.5">
          <button type="button" onclick="shareNoticeWhatsApp(${a.id}, '${escapeJsString(a.title)}', '${escapeJsString(a.target_class)}')" class="p-1.5 px-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold transition flex items-center gap-1">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>${isMr ? 'शेअर करा' : 'Share'}</span>
          </button>
          <button type="button" onclick="openNoticeQRCodeModal(${a.id}, '${escapeJsString(a.title)}', '${escapeJsString(a.target_class)}')" class="p-1.5 px-2.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white border border-purple-200 text-xs font-bold transition flex items-center gap-1">
            <i class="fa-solid fa-qrcode text-xs"></i>
            <span>${isMr ? 'क्युआर कोड' : 'QR Code'}</span>
          </button>
          <button type="button" onclick="deleteStudentAnnouncement(${a.id})" class="p-1.5 px-2.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 text-xs font-bold transition flex items-center gap-1" title="${isMr ? 'सूचना काढून टाका' : 'Delete Notice'}">
            <i class="fa-solid fa-trash-can text-xs"></i>
            <span>${isMr ? 'काढून टाका' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

async function deleteStudentAnnouncement(annId) {
  if (!verifiedStudentData || !verifiedStudentData.student) return;
  const prn = verifiedStudentData.student.prn;
  const isMr = currentLanguage === 'mr';

  // Update in-memory announcements
  verifiedStudentData.announcements = (verifiedStudentData.announcements || []).filter(a => a.id !== annId);
  if (verifiedStudentData.summary) {
    verifiedStudentData.summary.total_announcements = verifiedStudentData.announcements.length;
  }
  
  // Re-render UI immediately
  renderStudentAnnouncements();
  const badge = document.getElementById('stu-tab-notices-badge');
  if (badge) badge.innerText = `${verifiedStudentData.announcements.length} ${isMr ? 'सूचना' : (verifiedStudentData.announcements.length === 1 ? 'Notice' : 'Notices')}`;

  showToast(isMr ? 'सूचना काढून टाकण्यात आली आहे.' : 'Notice removed from your view.', 'info');

  try {
    await fetch('/api/student/dismiss-announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prn: prn, announcement_id: annId })
    });
  } catch (err) {
    console.error('Error saving notice dismissal:', err);
  }
}

function renderStudentStudyMaterial() {
  const container = document.getElementById('stu-study-materials-container');
  const countBadge = document.getElementById('stu-study-materials-count-badge');
  if (!container || !verifiedStudentData) return;
  const isMr = currentLanguage === 'mr';
  const materials = verifiedStudentData.study_materials || [];

  if (countBadge) countBadge.innerText = `${materials.length} ${isMr ? 'संसाधने' : (materials.length === 1 ? 'Resource' : 'Resources')}`;

  if (materials.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
        <i class="fa-solid fa-book-open-reader text-3xl text-slate-300"></i>
        <p class="text-xs font-bold text-slate-700">${isMr ? 'कोणतेही अभ्यास साहित्य उपलब्ध नाही.' : 'No study materials available.'}</p>
        <p class="text-[11px]">${isMr ? 'शिक्षकांनी पाठवलेले संदर्भ साहित्य व लेक्चर्स येथे दिसतील.' : 'Study materials shared by your teachers will appear here.'}</p>
      </div>
    `;
    return;
  }

  // Group materials by subject_name / paper
  const grouped = {};
  materials.forEach(m => {
    const subj = m.subject_name || (isMr ? 'इतर विषय / संदर्भ' : 'General / Other Subjects');
    if (!grouped[subj]) grouped[subj] = [];
    grouped[subj].push(m);
  });

  let html = '';
  Object.keys(grouped).forEach(subj => {
    const items = grouped[subj];
    html += `
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-xs font-bold shrink-0">
              <i class="fa-solid fa-book-bookmark"></i>
            </span>
            <h4 class="font-extrabold text-slate-900 text-sm">${escapeHtml(subj)}</h4>
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900 font-bold text-xs">${items.length} ${isMr ? 'संसाधने' : (items.length === 1 ? 'Resource' : 'Resources')}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${items.map(m => {
            let icon = 'fa-globe';
            let bg = 'bg-cyan-100 text-cyan-900';
            const rType = m.resource_type || 'Web Link';
            if (rType === 'YouTube Video') {
              icon = 'fa-video';
              bg = 'bg-rose-100 text-rose-900';
            } else if (rType === 'Google Drive Notes') {
              icon = 'fa-folder-open';
              bg = 'bg-amber-100 text-amber-900';
            } else if (rType === 'Online PDF Document') {
              icon = 'fa-file-pdf';
              bg = 'bg-red-100 text-red-900';
            } else if (rType === 'Web Article / Reference') {
              icon = 'fa-newspaper';
              bg = 'bg-blue-100 text-blue-900';
            }

            return `
              <div class="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-cyan-400 hover:shadow-md transition flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <span class="px-2.5 py-0.5 rounded-md ${bg} text-[10.5px] font-bold inline-flex items-center gap-1.5">
                      <i class="fa-solid ${icon}"></i>
                      <span>${escapeHtml(rType)}</span>
                    </span>
                    <span class="text-[10.5px] text-slate-400 font-medium">${escapeHtml(m.class_name || '')}</span>
                  </div>

                  <h5 class="font-bold text-slate-900 text-xs leading-snug">${escapeHtml(m.topic_title)}</h5>
                  ${m.description ? `<p class="text-[11px] text-slate-600 leading-relaxed">${escapeHtml(m.description)}</p>` : ''}
                </div>

                <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-[10px] text-slate-400"><i class="fa-solid fa-chalkboard-user mr-1"></i>${escapeHtml(m.teacher_name || '')}</span>
                  <a href="${escapeHtml(m.resource_url)}" target="_blank" rel="noopener" class="btn-3d-cyan bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold px-3.5 py-1.5 rounded-xl text-xs shadow flex items-center gap-1.5 transition">
                    <span>${isMr ? 'साहित्य उघडा' : 'Open Resource'}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}


function findAssessmentTypeObj(typeName) {
  if (!typeName) return null;
  const target = typeName.trim().toLowerCase();
  return assessmentTypesList.find(t => {
    const tname = (t.name || '').trim().toLowerCase();
    return tname === target || target.includes(tname) || tname.includes(target);
  }) || null;
}

let currentStudentMcqAnswers = {};

function onStudentSessionChange() {
  const sessionId = parseInt(document.getElementById('stu-session-select').value);
  const infoBox = document.getElementById('stu-session-info-box');
  const studyMatBox = document.getElementById('stu-session-study-materials-box');
  const studyMatList = document.getElementById('stu-session-study-materials-list');
  const studyMatBadge = document.getElementById('stu-materials-count-badge');
  const dynContainer = document.getElementById('stu-dynamic-fields-container');
  const mcqSection = document.getElementById('stu-mcq-exam-section');
  const descSection = document.getElementById('stu-descriptive-editor-section');
  const liveMeetBox = document.getElementById('stu-live-meet-box');
  const liveMeetScheduleText = document.getElementById('stu-meet-schedule-text');
  const liveMeetJoinBtn = document.getElementById('stu-meet-join-btn');

  // Clear cloud link inputs & editor
  if (document.getElementById('stu-cloud-url')) document.getElementById('stu-cloud-url').value = '';
  if (document.getElementById('stu-pdf-url')) document.getElementById('stu-pdf-url').value = '';
  if (document.getElementById('stu-drive-url')) document.getElementById('stu-drive-url').value = '';
  if (document.getElementById('stu-youtube-url')) document.getElementById('stu-youtube-url').value = '';
  if (studentQuill) studentQuill.root.innerHTML = '';

  currentStudentMcqAnswers = {};

  // Update active border/glow on Assignment Dashboard card
  document.querySelectorAll('.stu-dash-card').forEach(card => {
    const cardId = parseInt(card.getAttribute('data-asm-id') || '0');
    if (cardId === sessionId) {
      card.classList.add('bg-blue-50/80', 'border-blue-500', 'ring-2', 'ring-blue-400');
      card.classList.remove('bg-slate-50/70', 'border-slate-200');
    } else {
      card.classList.remove('bg-blue-50/80', 'border-blue-500', 'ring-2', 'ring-blue-400');
      card.classList.add('bg-slate-50/70', 'border-slate-200');
    }
  });

  if (!sessionId || !verifiedStudentData) {
    if (infoBox) infoBox.classList.add('hidden');
    if (studyMatBox) studyMatBox.classList.add('hidden');
    if (liveMeetBox) liveMeetBox.classList.add('hidden');
    if (dynContainer) dynContainer.innerHTML = '';
    if (mcqSection) mcqSection.classList.add('hidden');
    if (descSection) descSection.classList.remove('hidden');
    startQuizCountdownTimer(0);
    return;
  }

  const asm = (verifiedStudentData.active_assessments || []).find(a => a.id === sessionId);
  if (!asm) return;

  // Initialize Auto-Save Draft and Quiz Timer
  initAutoSaveDraftForSolver(sessionId);
  startQuizCountdownTimer(asm.duration_minutes || 0);

  // If reopened or has prior submission details, prefill content and cloud url
  if (asm.student_submission) {
    const prevLink = asm.student_submission.prev_drive_url || asm.student_submission.prev_pdf_url || asm.student_submission.prev_youtube_url || '';
    if (prevLink && document.getElementById('stu-cloud-url')) {
      document.getElementById('stu-cloud-url').value = prevLink;
    }
    if (asm.student_submission.prev_content && studentQuill) {
      studentQuill.root.innerHTML = asm.student_submission.prev_content;
    }
  }

  if (infoBox) infoBox.classList.remove('hidden');
  if (document.getElementById('stu-info-title')) document.getElementById('stu-info-title').innerText = asm.assessment_session_title;
  if (document.getElementById('stu-info-type')) document.getElementById('stu-info-type').innerText = asm.assessment_type_name || '';

  // Highlight PDF container for Journal / Practical / Fieldwork / Projects
  const pdfContainer = document.getElementById('stu-pdf-field-container');
  if (pdfContainer) {
    const isPracticalJournal = /(Journal|Practical|Field|Map|Project|जर्नल|प्रात्यक्षिक|प्रकल्प)/i.test(asm.assessment_type_name || '');
    if (isPracticalJournal) {
      pdfContainer.classList.add('ring-2', 'ring-teal-500', 'bg-teal-100/90');
      pdfContainer.classList.remove('bg-teal-50');
    } else {
      pdfContainer.classList.remove('ring-2', 'ring-teal-500', 'bg-teal-100/90');
      pdfContainer.classList.add('bg-teal-50');
    }
  }

  // Render Live Google Meet Schedule & Join Link if configured
  if (liveMeetBox && liveMeetJoinBtn) {
    if (asm.meeting_url && asm.meeting_url.trim()) {
      liveMeetBox.classList.remove('hidden');
      if (liveMeetScheduleText) {
        liveMeetScheduleText.innerText = asm.meeting_time && asm.meeting_time.trim() 
          ? `वेळापत्रक (Meeting Schedule): ${asm.meeting_time.trim()}` 
          : 'शिक्षकांनी ठरवलेल्या वेळेत दिलेल्या Google Meet लिंकवर थेट जॉइन करा.';
      }
      liveMeetJoinBtn.href = asm.meeting_url.trim();
    } else {
      liveMeetBox.classList.add('hidden');
    }
  }

  // Render Assessment-specific Study Materials
  const materials = asm.study_materials || [];
  if (studyMatBox && studyMatList) {
    if (materials.length > 0) {
      studyMatBox.classList.remove('hidden');
      if (studyMatBadge) studyMatBadge.innerText = `${materials.length} Resource(s)`;
      studyMatList.innerHTML = materials.map((m, idx) => {
        let icon = 'fa-file-lines';
        let typeBadge = 'Notes / Material';
        let bg = 'bg-amber-100 text-amber-900';

        if (m.type === 'youtube' || (m.url && (m.url.includes('youtube.com') || m.url.includes('youtu.be')))) {
          icon = 'fa-video';
          typeBadge = 'YouTube Video';
          bg = 'bg-rose-100 text-rose-900';
        } else if (m.type === 'pdf' || (m.url && m.url.endsWith('.pdf'))) {
          icon = 'fa-file-pdf';
          typeBadge = 'PDF Document';
          bg = 'bg-red-100 text-red-900';
        } else if (m.type === 'reference') {
          icon = 'fa-globe';
          typeBadge = 'Reference Website';
          bg = 'bg-blue-100 text-blue-900';
        }

        return `
          <div class="p-3 bg-white rounded-xl border border-amber-200 flex flex-col justify-between shadow-xs">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="px-2 py-0.5 rounded ${bg} text-[10px] font-bold inline-flex items-center gap-1 mb-1">
                  <i class="fa-solid ${icon}"></i> ${typeBadge}
                </span>
                <h5 class="font-bold text-slate-900 text-xs leading-snug">${escapeHtml(m.title || 'Study Resource ' + (idx + 1))}</h5>
              </div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span class="text-[10px] text-slate-400 truncate max-w-[150px]">${escapeHtml(m.url)}</span>
              <a href="${escapeHtml(m.url)}" target="_blank" rel="noopener" class="btn-3d-glass px-2.5 py-1 rounded-lg text-blue-700 font-bold text-[11px] flex items-center gap-1 hover:bg-blue-50">
                <span>Open / उघडा</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          </div>
        `;
      }).join('');
    } else {
      studyMatBox.classList.add('hidden');
      studyMatList.innerHTML = '';
    }
  }
  const indivTopic = asm.individual_topic || asm.assigned_topic || '';
  if (indivTopic) {
    document.getElementById('stu-info-topic').innerHTML = `
      <div class="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold">
        <span class="text-xs text-indigo-700 font-bold flex items-center gap-1.5 mb-1">
          <i class="fa-solid fa-bullseye text-indigo-600"></i>
          <span>आपल्यासाठी वाटप केलेला विषय (Assigned Topic / Question):</span>
        </span>
        <div class="text-sm font-extrabold text-slate-900">${escapeHtml(indivTopic)}</div>
      </div>
    `;
  } else {
    document.getElementById('stu-info-topic').innerHTML = `
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold">
        <span class="text-xs text-slate-500 font-bold flex items-center gap-1.5 mb-1">
          <i class="fa-solid fa-file-lines text-slate-500"></i>
          <span>विषय / प्रश्न (Topic / Question):</span>
        </span>
        <div class="text-sm font-extrabold text-slate-900">${escapeHtml(asm.assignment_topic)}</div>
      </div>
    `;
  }
  document.getElementById('stu-info-marks').innerText = `${asm.max_marks} Marks`;
  document.getElementById('stu-info-deadline').innerText = asm.submission_deadline || 'Open';

  if (asm.is_group === 1) {
    const assignedGroup = asm.assigned_group || '';
    const isLeader = asm.is_group_leader;
    const groupTopic = asm.group_topic;

    const groupCardHtml = `
      <div class="mt-2.5 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-emerald-950">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
            <i class="fa-solid fa-users text-emerald-600"></i>
            <span>गट असेसमेंट (Group Assessment)</span>
          </span>
          ${assignedGroup ? `<span class="px-2.5 py-0.5 bg-emerald-200 text-emerald-950 rounded-md font-extrabold text-xs">गट: ${escapeHtml(assignedGroup)} ${isLeader ? '👑 (गटप्रमुख / Leader)' : ''}</span>` : '<span class="text-slate-500 text-xs">गट असेसमेंट सक्रिय</span>'}
        </div>
        ${groupTopic ? `<div class="mt-1 text-xs text-slate-700"><b>गट विषय:</b> ${escapeHtml(groupTopic)}</div>` : ''}
      </div>
    `;
    const topicBox = document.getElementById('stu-info-topic');
    if (topicBox) topicBox.innerHTML += groupCardHtml;
  }

  // Check if assessment is MCQ
  const isMcq = (asm.is_mcq === 1 || (asm.mcq_questions_for_student && asm.mcq_questions_for_student.length > 0));
  
  if (isMcq) {
    if (mcqSection) mcqSection.classList.remove('hidden');
    if (descSection) descSection.classList.add('hidden');
    renderStudentMcqQuestions(asm);
  } else {
    if (mcqSection) mcqSection.classList.add('hidden');
    if (descSection) descSection.classList.remove('hidden');
  }

  if (dynContainer) {
    dynContainer.innerHTML = '';
    const typeObj = findAssessmentTypeObj(asm.assessment_type_name);
    if (typeObj && typeObj.fields_schema && !isMcq) {
      typeObj.fields_schema.forEach(f => {
        let fieldHtml = '';
        if (f.type === 'textarea') {
          fieldHtml = `<textarea id="dyn-${f.id}" ${f.required ? 'required' : ''} placeholder="${f.placeholder || ''}" rows="3" class="w-full rounded-xl border border-slate-300 p-2.5 bg-white font-medium"></textarea>`;
        } else {
          fieldHtml = `<input type="${f.type}" id="dyn-${f.id}" ${f.required ? 'required' : ''} placeholder="${f.placeholder || ''}" class="w-full rounded-xl border border-slate-300 p-2.5 bg-white font-medium">`;
        }
        dynContainer.innerHTML += `
          <div>
            <label class="block font-semibold text-slate-700 mb-1">${f.label} ${f.required ? '*' : ''}</label>
            ${fieldHtml}
          </div>
        `;
      });
    }
  }
}

function renderStudentMcqQuestions(asm) {
  const container = document.getElementById('stu-mcq-questions-container');
  if (!container) return;
  container.innerHTML = '';

  let questions = asm.mcq_questions_for_student || [];
  if ((!questions || questions.length === 0) && asm.mcq_questions_json) {
    try {
      questions = JSON.parse(asm.mcq_questions_json);
    } catch (e) {
      questions = [];
    }
  }

  document.getElementById('stu-mcq-total-count').innerText = questions.length;
  updateStudentMcqProgress(questions.length);

  if (questions.length === 0) {
    container.innerHTML = `<div class="p-6 bg-white rounded-xl text-center text-slate-400 font-medium">No MCQ questions available for this session. (या परीक्षेसाठी प्रश्न उपलब्ध नाहीत.)</div>`;
    return;
  }

  const optLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  questions.forEach((q, qIdx) => {
    const qMarks = q.marks || 1;
    let optionsHtml = '';

    (q.options || []).forEach((optText, optIdx) => {
      const optLetter = optLabels[optIdx] || String(optIdx + 1);
      optionsHtml += `
        <label id="stu-mcq-opt-${qIdx}-${optIdx}" class="stu-opt-card flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-teal-50/50 hover:border-teal-400 cursor-pointer transition shadow-xs">
          <input type="radio" name="stu_mcq_q_${qIdx}" value="${optIdx}" onchange="selectStudentMcqOption(${qIdx}, ${optIdx}, ${questions.length})" class="w-4 h-4 text-teal-600 focus:ring-teal-500 cursor-pointer">
          <span class="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">${optLetter}</span>
          <span class="text-xs text-slate-800 font-medium flex-1">${escapeHtml(optText)}</span>
        </label>
      `;
    });

    container.innerHTML += `
      <div id="stu-mcq-card-${qIdx}" class="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div class="flex items-center space-x-2">
            <span class="w-6 h-6 rounded-lg bg-teal-800 text-white font-bold flex items-center justify-center text-xs shrink-0">Q${qIdx + 1}</span>
            <h4 class="font-bold text-slate-900 text-xs sm:text-sm">${escapeHtml(q.question)}</h4>
          </div>
          <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px] shrink-0 font-mono">${qMarks} M</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          ${optionsHtml}
        </div>
      </div>
    `;
  });
}

function selectStudentMcqOption(qIdx, optIdx, totalCount) {
  currentStudentMcqAnswers[String(qIdx)] = optIdx;

  // Highlight selected card visually
  document.querySelectorAll(`[id^="stu-mcq-opt-${qIdx}-"]`).forEach(el => {
    el.classList.remove('border-teal-600', 'bg-teal-50', 'ring-1', 'ring-teal-500');
    el.classList.add('bg-white', 'border-slate-200');
  });

  const selectedEl = document.getElementById(`stu-mcq-opt-${qIdx}-${optIdx}`);
  if (selectedEl) {
    selectedEl.classList.remove('bg-white', 'border-slate-200');
    selectedEl.classList.add('border-teal-600', 'bg-teal-50', 'ring-1', 'ring-teal-500');
  }

  updateStudentMcqProgress(totalCount);
}

function updateStudentMcqProgress(totalCount) {
  const answered = Object.keys(currentStudentMcqAnswers).length;
  const badge = document.getElementById('stu-mcq-answered-count');
  if (badge) badge.innerText = answered;
}

async function handleStudentSubmission(e) {
  e.preventDefault();
  const sessionId = parseInt(document.getElementById('stu-session-select').value);
  if (!sessionId || !verifiedStudentData) {
    showToast('Please select an assessment session.', 'error');
    return;
  }

  const asm = verifiedStudentData.active_assessments.find(a => a.id === sessionId);
  if (!asm) return;

  const isMcq = (asm.is_mcq === 1 || (asm.mcq_questions_for_student && asm.mcq_questions_for_student.length > 0));
  let typedHtml = studentQuill ? studentQuill.root.innerHTML : '';
  let rawCloudUrl = document.getElementById('stu-cloud-url')?.value.trim() || '';
  let pdfUrl = document.getElementById('stu-pdf-url')?.value.trim() || '';
  let driveUrl = document.getElementById('stu-drive-url')?.value.trim() || '';
  let youtubeUrl = document.getElementById('stu-youtube-url')?.value.trim() || '';

  // Auto-prepend https:// if student entered a domain or URL without protocol
  if (rawCloudUrl && !/^https?:\/\//i.test(rawCloudUrl)) {
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(rawCloudUrl) || rawCloudUrl.includes('/') || rawCloudUrl.includes('drive') || rawCloudUrl.includes('youtu')) {
      rawCloudUrl = 'https://' + rawCloudUrl;
      const cloudInput = document.getElementById('stu-cloud-url');
      if (cloudInput) cloudInput.value = rawCloudUrl;
    }
  }

  if (rawCloudUrl) {
    if (rawCloudUrl.includes('youtube.com') || rawCloudUrl.includes('youtu.be')) {
      youtubeUrl = rawCloudUrl;
    } else if (rawCloudUrl.toLowerCase().endsWith('.pdf') || rawCloudUrl.includes('.pdf?')) {
      pdfUrl = rawCloudUrl;
    } else {
      driveUrl = rawCloudUrl;
    }
  }

  if (isMcq) {
    let questions = asm.mcq_questions_for_student || [];
    if ((!questions || questions.length === 0) && asm.mcq_questions_json) {
      try { questions = JSON.parse(asm.mcq_questions_json); } catch (e) { questions = []; }
    }
    const totalQ = questions.length;
    const answeredQ = Object.keys(currentStudentMcqAnswers).length;

    if (totalQ > 0 && answeredQ < totalQ) {
      if (!confirm(`You have answered ${answeredQ} out of ${totalQ} questions. Are you sure you want to submit? (तुम्ही ${totalQ} पैकी ${answeredQ} प्रश्न सोडवले आहेत. सबमिट करायचे का?)`)) {
        return;
      }
    }
  } else {
    if ((!typedHtml || typedHtml === '<p><br></p>') && !pdfUrl && !driveUrl && !youtubeUrl && !rawCloudUrl) {
      showToast('Please type your assessment answers online or provide your Scanned Journal PDF / Google Drive / YouTube link.', 'error');
      return;
    }
  }

  const dynamicData = {};
  const typeObj = findAssessmentTypeObj(asm.assessment_type_name);
  if (typeObj && typeObj.fields_schema && !isMcq) {
    typeObj.fields_schema.forEach(f => {
      const el = document.getElementById(`dyn-${f.id}`);
      if (el) dynamicData[f.id] = el.value.trim();
    });
  }

  const payload = {
    teacher_id: asm.teacher_id || verifiedStudentData.teacher?.id,
    roster_id: asm.roster_id || verifiedStudentData.student?.id,
    prn: verifiedStudentData.student?.prn,
    created_assessment_id: sessionId,
    topic: asm.individual_topic || asm.assigned_topic || asm.assignment_topic || asm.assessment_session_title,
    dynamic_data: dynamicData,
    typed_content_html: typedHtml,
    pdf_url: pdfUrl,
    drive_url: driveUrl,
    youtube_url: youtubeUrl,
    cloud_url: rawCloudUrl,
    mcq_answers: currentStudentMcqAnswers
  };

  try {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || 'Submission failed.', 'error');
      return;
    }

    if (data.is_auto_graded) {
      alert(`🏆 Online Examination / Test Submitted Successfully!

Official Submission ID: ${data.submission_id}
Student: ${verifiedStudentData.student.student_name} (${verifiedStudentData.student.prn})

Your responses have been recorded and digitally stored.`);
    } else {
      alert(`Assessment submitted successfully!

Official Submission ID: ${data.submission_id}

Click OK to view your digital submission record.`);
    }

    if (verifiedStudentData?.student?.prn) {
      try {
        localStorage.removeItem(`ciems_draft_${verifiedStudentData.student.prn}_${sessionId}`);
      } catch (e) {}
    }
    if (studentQuizCountdownTimerInterval) {
      clearInterval(studentQuizCountdownTimerInterval);
      studentQuizCountdownTimerInterval = null;
    }
    if (autoDraftSaveTimerInterval) {
      clearInterval(autoDraftSaveTimerInterval);
      autoDraftSaveTimerInterval = null;
    }

    await refreshStudentData(true);
    showStudentSection('history');

  } catch (err) {
    showToast('Error during submission.', 'error');
  }
}

async function loadStudentHistory() {
  const tbody = document.getElementById('stu-history-tbody');
  const countBadge = document.getElementById('stu-history-count-badge');
  const tabBadge = document.getElementById('stu-tab-history-badge');

  if (!verifiedStudentData) return;
  const s = verifiedStudentData.student;
  const prn = s.prn;

  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading your submission records...</td></tr>';
  }

  try {
    const isMr = currentLanguage === 'mr';
    const res = await fetch(`/api/student/status?prn=${encodeURIComponent(prn)}`);
    const data = await res.json();
    const rows = data.submissions || data.results || [];

    if (countBadge) countBadge.innerText = `${rows.length} ${isMr ? 'सबमिशन' : (rows.length !== 1 ? 'Submissions' : 'Submission')}`;
    if (tabBadge) tabBadge.innerText = `${rows.length} ${isMr ? 'नोंदी' : 'Records'}`;

    if (!tbody) return;

    if (rows.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="p-8 text-center text-slate-500 space-y-2">
            <i class="fa-solid fa-clock-rotate-left text-3xl text-slate-300"></i>
            <p class="font-bold text-xs text-slate-700">${isMr ? 'अद्याप कोणतेही स्वाध्याय सादर केलेले नाहीत.' : 'No assignments submitted yet.'}</p>
            <p class="text-[11px] text-slate-400">${isMr ? 'आपण अद्याप कोणतेही स्वाध्याय सादर केलेले नाहीत. सोडवण्यासाठी "स्वाध्याय" टॅब निवडा.' : 'You have not submitted any assignments yet. Select the "Assignments" tab to submit coursework.'}</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = rows.map(r => {
      let statusBadge = '';
      if (r.status === 'Assessed' || r.status === 'Evaluated') {
        statusBadge = `<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-circle-check text-emerald-600"></i> ${isMr ? 'तपासणी व मूल्यांकन पूर्ण' : 'Evaluated & Verified'}</span>`;
      } else if (r.status === 'Reopened') {
        statusBadge = `<span class="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-rotate text-orange-600"></i> ${isMr ? 'सुधारणेसाठी परत' : 'Reopened for Revision'}</span>`;
      } else {
        statusBadge = `<span class="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-clock text-blue-600"></i> ${isMr ? 'सादर केले / तपासणी सुरू' : 'Submitted / Under Review'}</span>`;
      }

      return `
        <tr class="hover:bg-purple-50/30 transition">
          <td class="p-3 font-mono font-bold text-purple-950 text-xs">${escapeHtml(r.submission_id)}</td>
          <td class="p-3">
            <div class="font-bold text-slate-900 text-xs">${escapeHtml(r.class_name || s.class_name || '')}</div>
            <div class="text-[11px] text-slate-600 font-medium">${escapeHtml(r.course_name || r.course_code || 'CIE Assessment')}</div>
          </td>
          <td class="p-3">
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[11px]">
              ${escapeHtml(r.assessment_type_name || 'Assignment')}
            </span>
          </td>
          <td class="p-3">
            <h5 class="font-bold text-slate-900 text-xs">${escapeHtml(r.topic || 'Internal Assessment Task')}</h5>
          </td>
          <td class="p-3 text-[11px] text-slate-500 font-medium whitespace-nowrap">
            ${r.submitted_at ? r.submitted_at.slice(0, 16) : ''}
          </td>
          <td class="p-3">
            <span class="font-bold text-slate-800 text-xs">${escapeHtml(r.teacher_name || 'Faculty')}</span>
          </td>
          <td class="p-3 whitespace-nowrap">${statusBadge}</td>
          <td class="p-3 text-right whitespace-nowrap">
            ${r.status === 'Reopened' ? `
              <button type="button" onclick="openStudentAssignment(${r.created_assessment_id || r.id})" class="btn-3d-amber bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1.5 shadow-sm hover:shadow transition mr-1.5 cursor-pointer" title="${isMr ? 'सुधारणा करून पुन्हा सादर करा' : 'Revise and submit assignment'}">
                <i class="fa-solid fa-rotate-right"></i>
                <span>${isMr ? 'सुधारणा करा' : 'Revise & Submit'}</span>
              </button>
            ` : ''}
            <a href="/api/submissions/${r.id || r.submission_id}/pdf${r.show_marks_to_students === 0 ? '?for=student' : '?show_marks=1'}" target="_blank" class="btn-3d-blue bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1.5 shadow-sm hover:shadow transition" title="Download Official Student PDF Copy (अधिकृत PDF प्रत)">
              <i class="fa-solid fa-print"></i>
              <span>Print / PDF</span>
            </a>
          </td>
        </tr>
      `;
    }).join('');

  } catch (err) {
    console.error('Error loading student history:', err);
    if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-red-500">Error loading submission records.</td></tr>';
  }
}

async function viewStudentSubmissionsStatus() {
  if (verifiedStudentData) {
    showStudentSection('history');
    return;
  }

  let teacherCode = document.getElementById('login-stu-teacher-code')?.value.trim().toUpperCase() || document.getElementById('stu-teacher-code')?.value.trim().toUpperCase() || '';
  let prn = document.getElementById('login-stu-prn')?.value.trim() || document.getElementById('stu-prn')?.value.trim() || '';

  if (!prn) {
    prn = prompt('Please enter your Student PRN to view your submission history & PDF copies:\n(कृपया तुमचा PRN क्रमांक प्रविष्ट करा:)', '2024016400012345');
    if (!prn || !prn.trim()) return;
    prn = prn.trim();
    if (document.getElementById('stu-prn')) {
      document.getElementById('stu-prn').value = prn;
    }
  }

  try {
    const res = await fetch(`/api/student/status?prn=${encodeURIComponent(prn)}&teacher_code=${encodeURIComponent(teacherCode)}`);
    const data = await res.json();
    const rows = data.submissions || data.results || [];

    const tbody = document.getElementById('stu-status-tbody');
    if (tbody) {
      tbody.innerHTML = '';

      if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400">No previous submissions found for PRN: <strong>${escapeHtml(prn)}</strong>. (या PRN साठी कोणतेही सबमिशन आढळले नाही.)</td></tr>`;
      } else {
        tbody.innerHTML = rows.map(r => {
          let statusBadge = '';
          if (r.status === 'Assessed' || r.status === 'Evaluated') {
            statusBadge = `<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10.5px] inline-flex items-center"><i class="fa-solid fa-circle-check mr-1 text-emerald-600"></i>Submitted & Verified (मूल्यांकन पूर्ण)</span>`;
          } else if (r.status === 'Reopened') {
            statusBadge = `<span class="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 font-bold text-[10.5px] inline-flex items-center"><i class="fa-solid fa-rotate mr-1 text-orange-600"></i>Reopened for Revision (पुन्हा सादर करा)</span>`;
          } else {
            statusBadge = `<span class="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-[10.5px] inline-flex items-center"><i class="fa-solid fa-clock mr-1 text-blue-600"></i>Submitted / Under Review (सादर केले)</span>`;
          }

          return `
            <tr class="hover:bg-slate-50 transition">
              <td class="p-3 font-mono font-bold text-blue-900">${escapeHtml(r.submission_id || '')}</td>
              <td class="p-3 font-medium text-slate-800">${escapeHtml(r.course_name || r.course_code || 'Internal Assessment')}</td>
              <td class="p-3 font-bold text-indigo-900">${escapeHtml(r.assessment_type_name || '')}</td>
              <td class="p-3 text-slate-700 max-w-xs truncate" title="${escapeHtml(r.topic || '')}">${escapeHtml(r.topic || '')}</td>
              <td class="p-3 text-[11px] text-slate-500">${r.submitted_at ? escapeHtml(r.submitted_at.split(' ')[0]) : ''}</td>
              <td class="p-3 font-semibold text-slate-700">${escapeHtml(r.teacher_name || 'Faculty')}</td>
              <td class="p-3">${statusBadge}</td>
              <td class="p-3 text-right whitespace-nowrap">
                <a href="/api/submissions/${r.id || r.submission_id}/pdf?for=student" target="_blank" class="btn-3d-blue px-3 py-1.5 text-white rounded-lg text-xs font-bold inline-flex items-center space-x-1.5 shadow-sm">
                  <i class="fa-solid fa-print"></i>
                  <span>Print / PDF</span>
                </a>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    const connBox = document.getElementById('student-connect-box');
    if (connBox) connBox.classList.add('hidden');
    const actView = document.getElementById('student-active-submission-view');
    if (actView) actView.classList.add('hidden');
    const statView = document.getElementById('student-status-view');
    if (statView) statView.classList.remove('hidden');
    navigateTo('student-portal');
  } catch (e) {
    showToast('Failed to load submission history.', 'error');
  }
}

function resetStudentForm() {
  document.getElementById('student-connect-box')?.classList.remove('hidden');
  document.getElementById('student-active-submission-view')?.classList.add('hidden');
  document.getElementById('student-status-view')?.classList.add('hidden');
  verifiedStudentData = null;
  if (studentQuill) studentQuill.setText('');
}

// =========================================================================
// 2. TEACHER REGISTRATION MODAL
// =========================================================================
function openTeacherRegisterModal() {
  const m = document.getElementById('modal-teacher-register');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('open', 'flex');
  }
}

function closeTeacherRegisterModal() {
  const m = document.getElementById('modal-teacher-register');
  if (m) {
    m.classList.remove('open', 'flex');
    m.classList.add('hidden');
  }
}

async function handleTeacherRegisterSubmit(e) {
  e.preventDefault();
  const stream = document.getElementById('reg-stream').value;
  const subject = document.getElementById('reg-subject').value;
  const customSub = document.getElementById('reg-custom-subject') ? document.getElementById('reg-custom-subject').value.trim() : '';

  const payload = {
    name: document.getElementById('reg-name').value.trim(),
    designation: document.getElementById('reg-designation').value,
    college_name: document.getElementById('reg-college').value.trim(),
    university_name: document.getElementById('reg-univ').value.trim(),
    faculty_stream: stream,
    subject_name: subject,
    custom_subject: customSub,
    email: document.getElementById('reg-email').value.trim(),
    mobile: document.getElementById('reg-mobile').value.trim()
  };

  try {
    const res = await fetch('/api/teacher/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Registration failed.', 'error');
      return;
    }

    alert(`Registration application submitted successfully!

Your Teacher Code: ${data.teacher_code}

After admin approval, password will be activated.`);
    closeTeacherRegisterModal();
  } catch (e) {
    showToast('Error during teacher registration.', 'error');
  }
}

// =========================================================================
// 3. TEACHER DASHBOARD & 4-TAB WORKFLOW
// =========================================================================
function fillTeacherDemo(email, pass) {
  document.getElementById('teacher-login-email').value = email;
  document.getElementById('teacher-login-pass').value = pass;
}

async function handleTeacherLogin(e) {
  e.preventDefault();
  const username = document.getElementById('teacher-login-email').value.trim();
  const password = document.getElementById('teacher-login-pass').value.trim();

  try {
    const res = await fetch('/api/teacher/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Login failed.', 'error');
      return;
    }

    currentTeacher = data.teacher;
    updateTeacherProfileUI();
    await checkAuthStates();
    document.getElementById('teacher-login-box').classList.add('hidden');
    document.getElementById('teacher-dashboard-view').classList.remove('hidden');
    loadTeacherDashboard();
    navigateTo('teacher-portal');
    showToast(`Welcome, ${currentTeacher.name}!`, 'success');
  } catch (e) {
    showToast('Error during login.', 'error');
  }
}

async function handleTeacherLogout() {
  await fetch('/api/teacher/logout', { method: 'POST' });
  currentTeacher = null;
  await checkAuthStates();
  navigateTo('landing');
}

function updateTeacherProfileUI() {
  if (!currentTeacher) return;
  document.getElementById('t-profile-name').innerText = currentTeacher.name;
  document.getElementById('t-profile-designation').innerText = currentTeacher.designation;
  document.getElementById('t-profile-college').innerText = currentTeacher.college_name;
  document.getElementById('t-profile-univ').innerText = currentTeacher.university_name;
  document.getElementById('t-profile-code').innerText = currentTeacher.teacher_code;
}

// ------------------- TAB 1: MASTER COURSE & CLASS SETUP (SINGLE SOURCE OF TRUTH) -------------------
let teacherMasterCourses = [];
let teacherMasterClasses = [];

async function loadTeacherCourses() {
  try {
    const res = await fetch('/api/teacher/courses');
    if (!res.ok) return;
    const data = await res.json();
    teacherMasterCourses = data.courses || [];
    teacherMasterClasses = data.distinct_classes || [];

    const badge = document.getElementById('badge-master-course-count');
    if (badge) badge.innerText = `${teacherMasterCourses.length} Courses`;

    const tbody = document.getElementById('table-teacher-courses-body');
    if (tbody) {
      if (teacherMasterCourses.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" class="p-8 text-center text-slate-500">
              <div class="max-w-md mx-auto space-y-2">
                <i class="fa-solid fa-graduation-cap text-3xl text-teal-400"></i>
                <p class="font-bold text-slate-700">No teaching courses configured yet (अद्याप कोणताही वर्ग किंवा कोर्स जोडलेला नाही).</p>
                <p class="text-xs text-slate-500">Fill the form above to add your classes (उदा. B.A. III, B.Sc. II) and papers. This standardizes all dropdowns across student roster and assessment mapping.</p>
              </div>
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = '';
        teacherMasterCourses.forEach((c, idx) => {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-slate-50/80 transition';
          tr.innerHTML = `
            <td class="p-3 font-mono font-bold text-slate-500">${idx + 1}</td>
            <td class="p-3 font-semibold text-slate-800">${escapeHtml(c.academic_year || '2026–27')}</td>
            <td class="p-3">
              <span class="px-2 py-0.5 rounded-lg bg-teal-100 text-teal-900 font-bold text-xs">${escapeHtml(c.class_name)}</span>
              <span class="ml-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">${escapeHtml(c.semester)}</span>
            </td>
            <td class="p-3">
              <div class="font-bold text-slate-900 font-mono text-teal-950">${escapeHtml(c.course_code)}</div>
              <div class="text-slate-600 font-medium text-xs">${escapeHtml(c.course_name)}</div>
            </td>
            <td class="p-3">
              <div class="font-bold text-slate-800">${escapeHtml(c.program_name || c.program_code || c.class_name)}</div>
              <div class="text-[11px] text-slate-500">${escapeHtml(c.faculty_stream || '')} • ${escapeHtml(c.subject_name || '')}</div>
            </td>
            <td class="p-3 text-center font-bold text-slate-800">${c.credits || 4}</td>
            <td class="p-3 text-center">
              <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">${c.total_internal_max_marks || 40} M</span>
            </td>
            <td class="p-3 text-right">
              <div class="flex items-center justify-end space-x-1.5">
                <button type="button" onclick="editTeacherCourse(${c.id})" class="btn-3d-glass px-2.5 py-1 text-blue-700 rounded-lg text-xs font-bold" title="Edit Course">
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button type="button" onclick="quickMapCIEForCourse(${c.id})" class="btn-3d-blue px-2.5 py-1 text-white rounded-lg text-xs font-bold" title="Map CIE Components">
                  <i class="fa-solid fa-layer-group mr-1"></i> Map CIE
                </button>
                <button type="button" onclick="deleteTeacherCourse(${c.id}, '${escapeHtml(c.course_name)}')" class="btn-3d-glass px-2 py-1 text-red-700 rounded-lg text-xs font-bold" title="Delete Course">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    }

    populateMasterClassDropdowns(teacherMasterCourses, teacherMasterClasses);

  } catch (err) {
    console.error('Error loading master courses:', err);
  }
}

function populateMasterClassDropdowns(courses, distinctClasses) {
  // 1. Roster Add Single Student modal: #m-stu-class
  const mStuClass = document.getElementById('m-stu-class');
  if (mStuClass) {
    const curr = mStuClass.value;
    mStuClass.innerHTML = '<option value="">-- Select Master Class (वर्ग निवडा) --</option>';
    distinctClasses.forEach(c => {
      mStuClass.innerHTML += `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`;
    });
    if (curr) mStuClass.value = curr;
  }

  // 2. Roster Bulk Import drawer: #roster-class
  const rosterClass = document.getElementById('roster-class');
  if (rosterClass) {
    const curr = rosterClass.value;
    rosterClass.innerHTML = '<option value="">-- Select Master Class (वर्ग निवडा) --</option>';
    distinctClasses.forEach(c => {
      rosterClass.innerHTML += `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`;
    });
    if (curr) rosterClass.value = curr;
  }

  // 3. Edit Student modal: #edit-stu-class
  const editStuClass = document.getElementById('edit-stu-class');
  if (editStuClass) {
    const curr = editStuClass.value;
    editStuClass.innerHTML = '<option value="">-- Select Master Class (वर्ग निवडा) --</option>';
    distinctClasses.forEach(c => {
      editStuClass.innerHTML += `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`;
    });
    if (curr) editStuClass.value = curr;
  }

  // 4. Unified Mapping form class select: #um-class
  const umClass = document.getElementById('um-class');
  if (umClass) {
    const curr = umClass.value;
    umClass.innerHTML = '<option value="">-- Select Class --</option>';
    distinctClasses.forEach(c => {
      umClass.innerHTML += `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`;
    });
    if (curr) umClass.value = curr;
  }

  // 5. Unified Mapping top course picker: #map-select-course
  const mapSelCourse = document.getElementById('map-select-course');
  if (mapSelCourse) {
    const curr = mapSelCourse.value;
    mapSelCourse.innerHTML = '<option value="">-- Choose Master Course (कोर्स निवडा) --</option>';
    courses.forEach(c => {
      mapSelCourse.innerHTML += `<option value="${c.id}">${escapeHtml(c.class_name)} • ${escapeHtml(c.course_code)}: ${escapeHtml(c.course_name)} (${escapeHtml(c.semester)})</option>`;
    });
    if (curr) mapSelCourse.value = curr;
  }
}

function quickMapCIEForCourse(courseId) {
  showTeacherSection('courses');
  const picker = document.getElementById('map-select-course');
  if (picker) {
    picker.value = courseId;
    onSelectMasterCourseForMapping(courseId);
  }
  const form = document.getElementById('unified-mapping-form');
  if (form && form.classList.contains('hidden')) {
    form.classList.remove('hidden');
  }
  setTimeout(() => {
    document.getElementById('unified-mapping-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

async function onSelectMasterCourseForMapping(courseId) {
  if (!courseId) return;
  let course = (teacherMasterCourses || []).find(c => c.id == courseId);
  if (!course) {
    try {
      const res = await fetch('/api/teacher/unified-mappings');
      const data = await res.json();
      course = (data.all_subjects || data.subjects || []).find(s => s.id == courseId);
    } catch(e) {}
  }
  if (!course) return;

  if (document.getElementById('um-year')) document.getElementById('um-year').value = course.academic_year || '2026–27';
  if (document.getElementById('um-stream')) document.getElementById('um-stream').value = course.faculty_stream || '';
  if (document.getElementById('um-subject')) document.getElementById('um-subject').value = course.subject_name || '';
  if (document.getElementById('um-class')) document.getElementById('um-class').value = course.class_name || '';
  if (document.getElementById('um-semester')) document.getElementById('um-semester').value = course.semester || '';
  if (document.getElementById('um-program-code')) document.getElementById('um-program-code').value = course.program_code || '';
  if (document.getElementById('um-course-code')) document.getElementById('um-course-code').value = course.course_code || '';
  if (document.getElementById('um-course-name')) document.getElementById('um-course-name').value = course.course_name || '';
  if (document.getElementById('um-max-marks')) {
    document.getElementById('um-max-marks').value = course.total_internal_max_marks || 40;
  }

  // Update Summary Preview Card
  const dispClass = document.getElementById('um-disp-class-badge');
  const dispSem = document.getElementById('um-disp-sem-badge');
  const dispCode = document.getElementById('um-disp-code');
  const dispTitle = document.getElementById('um-disp-title');
  const dispMeta = document.getElementById('um-disp-meta');
  const dispMarks = document.getElementById('um-disp-marks');

  if (dispClass) dispClass.innerText = course.class_name || 'Class';
  if (dispSem) dispSem.innerText = course.semester || 'Semester';
  if (dispCode) dispCode.innerText = course.course_code || '';
  if (dispTitle) dispTitle.innerText = `${course.course_code ? course.course_code + ': ' : ''}${course.course_name || ''}`;
  if (dispMeta) dispMeta.innerText = `${course.faculty_stream || ''} • ${course.subject_name || ''} • ${course.academic_year || '2026–27'}`;
  if (dispMarks) dispMarks.innerText = `${course.total_internal_max_marks || 40} Marks`;

  // Check if this course has existing mapped components
  try {
    const res = await fetch('/api/teacher/unified-mappings');
    const data = await res.json();
    const mapped = (data.subjects || []).find(s => s.id == courseId);
    if (mapped && mapped.assignments && mapped.assignments.length > 0) {
      document.querySelectorAll('.um-type-chk').forEach(chk => { chk.checked = false; });
      mapped.assignments.forEach(a => {
        let chk = document.querySelector(`.um-type-chk[value="${a.assessment_type_id}"]`);
        if (!chk) {
          chk = Array.from(document.querySelectorAll('.um-type-chk')).find(c => c.getAttribute('data-name') === a.assessment_type_name);
        }
        if (chk) {
          chk.checked = true;
          const tid = chk.value;
          const marksInput = document.getElementById(`um-marks-${tid}`);
          if (marksInput) marksInput.value = a.max_marks;
          const descInput = document.getElementById(`um-desc-${tid}`);
          if (descInput && a.description) descInput.value = a.description;
        }
      });
    }
  } catch (err) {
    console.error('Error fetching mapped assignments for course:', err);
  }

  updateUnifiedMarksSummary();
  showToast(`Loaded "${course.course_name}" details into CIE mapping form below.`, 'info');
}

function toggleCourseMasterForm() {
  const form = document.getElementById('form-teacher-course');
  if (form) {
    form.classList.toggle('hidden');
  }
}

function resetCourseMasterForm() {
  const form = document.getElementById('form-teacher-course');
  if (form) form.reset();
  const editId = document.getElementById('course-edit-id');
  if (editId) editId.value = '';
  const heading = document.getElementById('course-form-heading');
  if (heading) heading.innerHTML = '<i class="fa-solid fa-circle-plus text-teal-600"></i> <span>Add New Course & Class Definition</span>';
  const saveBtn = document.getElementById('btn-save-course');
  if (saveBtn) saveBtn.innerText = 'Save Course & Class (जतन करा)';
  if (document.getElementById('course-academic-year')) document.getElementById('course-academic-year').value = '2026–27';
  if (document.getElementById('course-credits')) document.getElementById('course-credits').value = '4';
  if (document.getElementById('course-internal-marks')) document.getElementById('course-internal-marks').value = '40';
  const customSubBox = document.getElementById('course-custom-subject-box');
  if (customSubBox) customSubBox.classList.add('hidden');
  const customSubInput = document.getElementById('course-custom-subject');
  if (customSubInput) customSubInput.value = '';
  populateCourseStreams();
}

function openAddCustomClassModal() {
  const modal = document.getElementById('modal-add-custom-class');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('open', 'flex');
    const input = document.getElementById('custom-class-name-input');
    if (input) {
      input.value = '';
      input.focus();
    }
    if (document.getElementById('custom-class-code-input')) document.getElementById('custom-class-code-input').value = '';
    if (document.getElementById('custom-class-title-input')) document.getElementById('custom-class-title-input').value = '';
  }
}

function closeAddCustomClassModal() {
  const modal = document.getElementById('modal-add-custom-class');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('open', 'flex');
  }
}

function handleApplyCustomClass(e) {
  e.preventDefault();
  const className = document.getElementById('custom-class-name-input')?.value.trim();
  const sem = document.getElementById('custom-class-sem-input')?.value;
  const pCode = document.getElementById('custom-class-code-input')?.value.trim();
  const pTitle = document.getElementById('custom-class-title-input')?.value.trim();

  if (!className) {
    showToast('Please enter class name.', 'error');
    return;
  }

  // Set values in Course Master form
  const classInput = document.getElementById('course-class-name');
  if (classInput) classInput.value = className;

  const semInput = document.getElementById('course-semester');
  if (semInput && sem) semInput.value = sem;

  const pCodeInput = document.getElementById('course-program-code');
  if (pCodeInput && pCode) pCodeInput.value = pCode;

  const pTitleInput = document.getElementById('course-program-name');
  if (pTitleInput && pTitle) pTitleInput.value = pTitle;

  // Add to datalist if not already present
  const dl = document.getElementById('dl-master-classes');
  if (dl) {
    let exists = false;
    for (let opt of dl.options) {
      if (opt.value && opt.value.toLowerCase() === className.toLowerCase()) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      const opt = document.createElement('option');
      opt.value = className;
      dl.appendChild(opt);
    }
  }

  closeAddCustomClassModal();
  showToast(`Custom class "${className}" applied to Course Master!`, 'success');
}

function populateCourseStreams() {
  const streamSel = document.getElementById('course-faculty-stream');
  if (!streamSel) return;
  const streams = Object.keys(masterDisciplines);
  streamSel.innerHTML = '';
  streams.forEach(s => {
    streamSel.innerHTML += `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`;
  });
  if (currentTeacher && currentTeacher.faculty_stream) {
    streamSel.value = currentTeacher.faculty_stream;
  }
  onCourseStreamChange();
}

function onCourseStreamChange() {
  const streamSel = document.getElementById('course-faculty-stream');
  const subjectSel = document.getElementById('course-subject-name');
  if (!streamSel || !subjectSel) return;
  const s = streamSel.value;
  const subjs = masterDisciplines[s] || [];
  subjectSel.innerHTML = '';
  subjs.forEach(sub => {
    subjectSel.innerHTML += `<option value="${escapeHtml(sub)}">${escapeHtml(sub)}</option>`;
  });
  if (currentTeacher && currentTeacher.subject_name && subjs.includes(currentTeacher.subject_name)) {
    subjectSel.value = currentTeacher.subject_name;
  }

  // Dynamically update class datalist options and placeholder for this specific faculty stream
  const dl = document.getElementById('dl-master-classes');
  const classInput = document.getElementById('course-class-name');
  const streamClasses = (masterStreamClasses && masterStreamClasses[s]) ? masterStreamClasses[s] : [];
  if (dl && streamClasses.length > 0) {
    dl.innerHTML = '';
    streamClasses.forEach(cls => {
      dl.innerHTML += `<option value="${escapeHtml(cls)}">`;
    });
    if (classInput && !classInput.value) {
      classInput.placeholder = `उदा. ${streamClasses.slice(0, 3).join(', ')}`;
    }
  }

  onCourseSubjectChange();
}

function onCourseSubjectChange() {
  const subjectSel = document.getElementById('course-subject-name');
  const customBox = document.getElementById('course-custom-subject-box');
  if (!subjectSel || !customBox) return;
  const val = subjectSel.value;
  if (val && (val.includes('इतर') || val.includes('Other'))) {
    customBox.classList.remove('hidden');
    const customInp = document.getElementById('course-custom-subject');
    if (customInp && !customInp.value) customInp.focus();
  } else {
    customBox.classList.add('hidden');
  }
}

async function handleSaveTeacherCourse(e) {
  e.preventDefault();
  const id = document.getElementById('course-edit-id')?.value;
  const academic_year = document.getElementById('course-academic-year')?.value.trim();
  const faculty_stream = document.getElementById('course-faculty-stream')?.value.trim();
  let subject_name = document.getElementById('course-subject-name')?.value.trim();
  const custom_subject = document.getElementById('course-custom-subject')?.value.trim();
  if (subject_name && (subject_name.includes('इतर') || subject_name.includes('Other')) && custom_subject) {
    subject_name = custom_subject;
  }
  const class_name = document.getElementById('course-class-name')?.value.trim();
  const semester = document.getElementById('course-semester')?.value.trim();
  const program_code = document.getElementById('course-program-code')?.value.trim();
  const program_name = document.getElementById('course-program-name')?.value.trim();
  const course_code = document.getElementById('course-paper-code')?.value.trim();
  const course_name = document.getElementById('course-paper-name')?.value.trim();
  const credits = parseInt(document.getElementById('course-credits')?.value || '4');
  const total_internal_max_marks = parseFloat(document.getElementById('course-internal-marks')?.value || '40');

  if (!class_name || !semester || !course_code || !course_name) {
    showToast('Please fill all required course and class fields.', 'error');
    return;
  }

  const btn = document.getElementById('btn-save-course');
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Saving...';
  }

  try {
    const res = await fetch('/api/teacher/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id || null,
        academic_year,
        faculty_stream,
        subject_name,
        class_name,
        semester,
        program_code,
        program_name,
        course_code,
        course_name,
        credits,
        total_internal_max_marks
      })
    });
    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || 'Failed to save course.', 'error');
      if (btn) {
        btn.disabled = false;
        btn.innerText = 'Save Course & Class (जतन करा)';
      }
      return;
    }

    resetCourseMasterForm();
    await loadTeacherCourses();
    await loadUnifiedMappings();
    loadTeacherDashboardStats();

    if (data.course_id) {
      quickMapCIEForCourse(data.course_id);
      showToast(data.message || 'Course & Class saved! Now configure CIE components below.', 'success');
    } else {
      showToast(data.message || 'Course & Class saved successfully!', 'success');
    }

  } catch (err) {
    showToast('Network error while saving course.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Save Course & Class (जतन करा)';
    }
  }
}

function editTeacherCourse(id) {
  const c = teacherMasterCourses.find(item => item.id == id);
  if (!c) return;
  const form = document.getElementById('form-teacher-course');
  if (form) {
    form.classList.remove('hidden');
  }
  document.getElementById('course-edit-id').value = c.id;
  if (document.getElementById('course-academic-year')) document.getElementById('course-academic-year').value = c.academic_year || '2026–27';
  if (document.getElementById('course-faculty-stream')) {
    document.getElementById('course-faculty-stream').value = c.faculty_stream;
    onCourseStreamChange();
  }
  if (document.getElementById('course-subject-name')) {
    const subjSel = document.getElementById('course-subject-name');
    let hasSubj = false;
    for (let opt of subjSel.options) {
      if (opt.value === c.subject_name) {
        hasSubj = true;
        break;
      }
    }
    if (hasSubj) {
      subjSel.value = c.subject_name;
      onCourseSubjectChange();
    } else {
      // It's a custom subject, set to Other option if exists and fill custom text input
      for (let opt of subjSel.options) {
        if (opt.value.includes('इतर') || opt.value.includes('Other')) {
          subjSel.value = opt.value;
          break;
        }
      }
      onCourseSubjectChange();
      const customSubInput = document.getElementById('course-custom-subject');
      if (customSubInput) customSubInput.value = c.subject_name;
    }
  }
  if (document.getElementById('course-class-name')) document.getElementById('course-class-name').value = c.class_name;
  if (document.getElementById('course-semester')) document.getElementById('course-semester').value = c.semester;
  if (document.getElementById('course-program-code')) document.getElementById('course-program-code').value = c.program_code || '';
  if (document.getElementById('course-program-name')) document.getElementById('course-program-name').value = c.program_name || '';
  if (document.getElementById('course-paper-code')) document.getElementById('course-paper-code').value = c.course_code;
  if (document.getElementById('course-paper-name')) document.getElementById('course-paper-name').value = c.course_name;
  if (document.getElementById('course-credits')) document.getElementById('course-credits').value = c.credits || 4;
  if (document.getElementById('course-internal-marks')) document.getElementById('course-internal-marks').value = c.total_internal_max_marks || 40;

  const heading = document.getElementById('course-form-heading');
  if (heading) heading.innerHTML = `<i class="fa-solid fa-pen-to-square text-teal-600"></i> <span>Edit Course Definition: ${escapeHtml(c.course_name)}</span>`;
  const saveBtn = document.getElementById('btn-save-course');
  if (saveBtn) saveBtn.innerText = 'Update Course & Class (बदल जतन करा)';

  document.getElementById('form-teacher-course')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function deleteTeacherCourse(id, name) {
  if (!confirm(`Are you sure you want to delete course "${name}"? Any mapped assignments for this course will also be removed.`)) {
    return;
  }

  try {
    const res = await fetch(`/api/teacher/courses/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to delete course.', 'error');
      return;
    }
    showToast(data.message || 'Course deleted successfully.', 'success');
    await loadTeacherCourses();
    await loadUnifiedMappings();
    loadTeacherDashboardStats();
  } catch (err) {
    showToast('Network error while deleting course.', 'error');
  }
}

async function loadTeacherDashboardStats() {
  try {
    const res = await fetch('/api/teacher/dashboard-stats');
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success) return;
    
    const s = data.stats || {};
    if (document.getElementById('t-stat-courses')) document.getElementById('t-stat-courses').innerText = s.total_courses || 0;
    if (document.getElementById('t-stat-students')) document.getElementById('t-stat-students').innerText = s.total_students || 0;
    if (document.getElementById('t-stat-assessments')) document.getElementById('t-stat-assessments').innerText = s.total_assessments || 0;
    if (document.getElementById('t-stat-submissions')) document.getElementById('t-stat-submissions').innerText = s.total_submissions || 0;
    if (document.getElementById('t-stat-evaluated')) document.getElementById('t-stat-evaluated').innerText = s.evaluated_submissions || 0;
    if (document.getElementById('t-stat-pending')) document.getElementById('t-stat-pending').innerText = s.pending_evaluations || 0;

    // Teacher 1 Academic Year Validity Badge & Extension Status
    const val = data.teacher_validity || {};
    window._currentTeacherValidity = val;
    const valPeriodEl = document.getElementById('t-validity-period');
    const valStatusEl = document.getElementById('t-validity-badge-status');
    const btnExtend = document.getElementById('btn-extend-validity');

    if (valPeriodEl) {
      if (val.validity_start && val.validity_end) {
        valPeriodEl.innerText = `${val.validity_start} – ${val.validity_end}`;
      } else if (val.academic_year) {
        valPeriodEl.innerText = `${val.academic_year}`;
      } else {
        valPeriodEl.innerText = '1 Jun – 31 May';
      }
    }

    if (valStatusEl) {
      if (val.extension_requested) {
        valStatusEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300';
        valStatusEl.innerText = (currentLanguage === 'mr') ? 'मुदतवाढ प्रलंबित' : 'Renewal Pending';
      } else if (val.is_valid !== false) {
        valStatusEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800';
        valStatusEl.innerText = (currentLanguage === 'mr') ? 'सक्रिय' : 'Active';
      } else {
        valStatusEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800';
        valStatusEl.innerText = (currentLanguage === 'mr') ? 'मुदत संपली' : 'Expired';
      }
    }

    if (btnExtend) {
      if (val.extension_requested) {
        btnExtend.disabled = true;
        btnExtend.classList.add('opacity-60', 'cursor-not-allowed');
        btnExtend.innerHTML = `<i class="fa-solid fa-hourglass-half mr-1 text-amber-600"></i> <span>${currentLanguage === 'mr' ? 'विनंती पाठवली' : 'Renewal Requested'}</span>`;
      } else {
        btnExtend.disabled = false;
        btnExtend.classList.remove('opacity-60', 'cursor-not-allowed');
        btnExtend.innerHTML = `<i class="fa-solid fa-clock-rotate-left mr-1 text-emerald-600"></i> <span>${currentLanguage === 'mr' ? 'मुदत वाढवा' : 'Extend Validity'}</span>`;
      }
    }

    // Prominent 1-Month (30 Days) Validity Expiry Warning Banner
    const expiryBanner = document.getElementById('teacher-validity-expiry-banner');
    if (expiryBanner) {
      const daysLeft = val.days_remaining;
      const isExpiringSoon = val.is_expiring_soon; // <= 30 days
      const isExpired = val.is_expired; // <= 0 days
      const extReq = val.extension_requested;

      if (extReq) {
        expiryBanner.className = 'rounded-2xl p-4 bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between flex-wrap gap-3 shadow-xs';
        expiryBanner.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 text-lg font-bold shrink-0">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm text-blue-950">${currentLanguage === 'mr' ? 'खाते मुदतवाढ विनंती प्रलंबित' : 'Account Validity Extension Pending'}</h4>
              <p class="text-xs text-blue-800">${currentLanguage === 'mr' ? 'आपली मुदतवाढ विनंती प्रशासकाकडे पाठवली आहे. प्रशासक मान्यतेनंतर मुदतवाढ लागू होईल.' : 'Your extension request has been submitted to the Admin for approval.'}</p>
            </div>
          </div>
          <span class="px-3 py-1 bg-blue-100 border border-blue-300 text-blue-900 rounded-lg text-xs font-bold">${currentLanguage === 'mr' ? 'विनंती पाठवली' : 'Request Pending'}</span>
        `;
        expiryBanner.classList.remove('hidden');
      } else if (isExpired) {
        expiryBanner.className = 'rounded-2xl p-4 bg-rose-50 border-2 border-rose-300 text-rose-900 flex items-center justify-between flex-wrap gap-3 shadow-sm';
        expiryBanner.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 text-lg font-bold shrink-0">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm text-rose-950">${currentLanguage === 'mr' ? 'खात्याची शैक्षणिक मुदत संपली आहे!' : 'Account Academic Validity Expired!'}</h4>
              <p class="text-xs text-rose-800">${currentLanguage === 'mr' ? 'आपल्या खात्याची मुदत संपली आहे. पुढील मूल्यांकन व कामकाजासाठी कृपया खालील बटणावर क्लिक करून मुदतवाढ मिळवा.' : 'Your account validity has expired. Please click below to request an extension.'}</p>
            </div>
          </div>
          <button onclick="requestTeacherValidityExtension()" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer flex items-center space-x-1.5">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <span>${currentLanguage === 'mr' ? 'मुदतवाढ विनंती करा' : 'Extend Validity Now'}</span>
          </button>
        `;
        expiryBanner.classList.remove('hidden');
      } else if (isExpiringSoon && daysLeft !== null && daysLeft !== undefined) {
        expiryBanner.className = 'rounded-2xl p-4 bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-center justify-between flex-wrap gap-3 shadow-sm';
        expiryBanner.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 text-lg font-bold shrink-0">
              <i class="fa-solid fa-bell animate-bounce"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm text-amber-950">${currentLanguage === 'mr' ? `सूचना: खात्याची मुदत संपण्यासाठी फक्त ${daysLeft} दिवस शिल्लक आहेत!` : `Notice: Account Validity Expiring in ${daysLeft} Day${daysLeft === 1 ? '' : 's'}!`}</h4>
              <p class="text-xs text-amber-800">${currentLanguage === 'mr' ? 'आपली वार्षिक मुदत लवकरच समाप्त होत आहे. अखंड सेवेसाठी त्वरित मुदतवाढ विनंती पाठवा.' : 'Your academic year validity will expire soon. Click the button to request an extension.'}</p>
            </div>
          </div>
          <button onclick="requestTeacherValidityExtension()" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer flex items-center space-x-1.5">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <span>${currentLanguage === 'mr' ? 'मुदतवाढ विनंती करा' : 'Extend Validity'}</span>
          </button>
        `;
        expiryBanner.classList.remove('hidden');
      } else {
        expiryBanner.classList.add('hidden');
      }
    }

    // Evaluation progress bar
    const totalSubs = s.total_submissions || 0;
    const evalSubs = s.evaluated_submissions || 0;
    const pct = totalSubs > 0 ? Math.round((evalSubs / totalSubs) * 100) : 0;
    
    if (document.getElementById('t-stat-progress-bar')) {
      document.getElementById('t-stat-progress-bar').style.width = `${pct}%`;
    }
    if (document.getElementById('t-stat-progress-pct')) {
      document.getElementById('t-stat-progress-pct').innerText = `${pct}%`;
    }
    if (document.getElementById('t-stat-progress-sub')) {
      document.getElementById('t-stat-progress-sub').innerText = totalSubs > 0 
        ? `${evalSubs} of ${totalSubs} student submissions evaluated (${pct}% completed).`
        : `0 student submissions received so far.`;
    }

    // Class Breakdown Table
    const cTbody = document.getElementById('t-dash-class-tbody');
    if (cTbody) {
      cTbody.innerHTML = '';
      const classes = data.class_breakdown || [];
      if (classes.length === 0) {
        cTbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400">No courses or classes configured yet. Click "+ Add Course" to get started.</td></tr>';
      } else {
        classes.forEach(c => {
          cTbody.innerHTML += `
            <tr class="hover:bg-teal-50/30 transition">
              <td class="p-3">
                <span class="font-bold text-slate-900">${escapeHtml(c.class_name)}</span>
                <span class="text-[10px] text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded ml-1 font-semibold">${escapeHtml(c.semester || '')}</span>
                <div class="text-[10px] text-slate-400 mt-0.5">${escapeHtml(c.academic_year || '')}</div>
              </td>
              <td class="p-3">
                <span class="font-semibold text-slate-800">${escapeHtml(c.subject_name || '')}</span>
                <div class="text-[10px] font-mono text-slate-400">${escapeHtml(c.course_code || '')} ${c.course_name ? '• ' + escapeHtml(c.course_name) : ''}</div>
              </td>
              <td class="p-3 text-center">
                <span class="font-bold font-mono text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 text-xs">${c.student_count || 0}</span>
              </td>
              <td class="p-3 text-center">
                <span class="font-bold font-mono text-purple-900 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 text-xs">${c.asm_count || 0}</span>
              </td>
              <td class="p-3 text-center">
                <span class="font-bold font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-xs">${c.sub_count || 0}</span>
              </td>
              <td class="p-3 text-right">
                <button onclick="showTeacherSection('create-asm')" class="btn-3d-glass px-2.5 py-1 text-purple-700 rounded text-[11px] font-bold">
                  <i class="fa-solid fa-plus mr-1"></i> Assessment
                </button>
              </td>
            </tr>
          `;
        });
      }
    }

    // Recent Assessments
    const rAsmBox = document.getElementById('t-dash-recent-asm');
    if (rAsmBox) {
      rAsmBox.innerHTML = '';
      const recentAsm = data.recent_assessments || [];
      if (recentAsm.length === 0) {
        rAsmBox.innerHTML = '<p class="text-slate-400 text-center py-2 text-[11px]">No assessment sessions created yet.</p>';
      } else {
        recentAsm.forEach(a => {
          const isClosed = a.status === 'closed';
          rAsmBox.innerHTML += `
            <div class="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-purple-300 transition flex items-center justify-between">
              <div class="min-w-0 pr-2">
                <div class="font-bold text-slate-800 text-xs truncate">${escapeHtml(a.assessment_session_title || a.assessment_type_name || 'Assessment')}</div>
                <div class="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span class="font-semibold text-purple-800">${escapeHtml(a.class_name)}</span>
                  <span>•</span>
                  <span>${a.submissions_count || 0} Subs</span>
                  <span>•</span>
                  <span>Max: ${a.max_marks || 0} M</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isClosed ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'} flex-shrink-0">
                ${isClosed ? 'Closed' : 'Active'}
              </span>
            </div>
          `;
        });
      }
    }

    // Recent Submissions
    const rSubsBox = document.getElementById('t-dash-recent-subs');
    if (rSubsBox) {
      rSubsBox.innerHTML = '';
      const recentSubs = data.recent_submissions || [];
      if (recentSubs.length === 0) {
        rSubsBox.innerHTML = '<p class="text-slate-400 text-center py-2 text-[11px]">No student submissions received yet.</p>';
      } else {
        recentSubs.forEach(sub => {
          const isEval = (sub.status === 'Assessed' || sub.status === 'evaluated' || sub.marks_obtained != null);
          const scoreDisplay = sub.marks_obtained != null ? `${sub.marks_obtained} M` : 'Assessed';
          rSubsBox.innerHTML += `
            <div class="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition flex items-center justify-between">
              <div class="min-w-0 pr-2">
                <div class="font-bold text-slate-900 text-xs truncate">${escapeHtml(sub.student_name || 'Student')}</div>
                <div class="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span class="font-mono">${escapeHtml(sub.prn || '')}</span>
                  <span>•</span>
                  <span>${escapeHtml(sub.class_name || '')}</span>
                  <span>•</span>
                  <span class="font-semibold text-slate-600">${escapeHtml(sub.assessment_session_title || sub.assessment_type_name || '')}</span>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isEval ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                  ${isEval ? scoreDisplay : 'Pending'}
                </span>
              </div>
            </div>
          `;
        });
      }
    }

    try {
      loadTeacherAdminAnnouncements();
    } catch (annErr) {
      console.error('Error in loadTeacherAdminAnnouncements:', annErr);
    }

  } catch (e) {
    console.error('Error loading teacher dashboard stats:', e);
  }
}

function openExtendValidityModal() {
  const modal = document.getElementById('modal-extend-validity');
  if (!modal) return;
  const val = window._currentTeacherValidity || {};
  
  const currInput = document.getElementById('extend-curr-validity');
  const nextInput = document.getElementById('extend-next-year');
  const alertBox = document.getElementById('extend-validity-alert');
  if (alertBox) {
    alertBox.className = 'hidden p-3 rounded-xl text-xs font-semibold';
    alertBox.innerText = '';
  }

  if (currInput) {
    currInput.value = (val.validity_start && val.validity_end) 
      ? `${val.validity_start} to ${val.validity_end} (${val.academic_year || ''})`
      : (val.academic_year || 'Current Academic Year');
  }

  if (nextInput) {
    nextInput.value = val.extension_requested_year || 'Next Academic Year (1 Jun – 31 May)';
  }

  modal.classList.remove('hidden');
  modal.classList.add('open', 'flex');
}

function closeExtendValidityModal() {
  const modal = document.getElementById('modal-extend-validity');
  if (modal) {
    modal.classList.remove('open', 'flex');
    modal.classList.add('hidden');
  }
}

async function submitTeacherExtensionRequest(e) {
  if (e) e.preventDefault();
  const alertBox = document.getElementById('extend-validity-alert');
  const btn = document.getElementById('btn-submit-extension');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Submitting...`;
  }

  try {
    const res = await fetch('/api/teacher/request-extension', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      if (alertBox) {
        alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-red-50 text-red-800 border border-red-200';
        alertBox.innerText = data.error || 'Failed to submit extension request.';
      }
      return;
    }

    showToast(data.message || 'Validity renewal request submitted to Administrator successfully.', 'success');
    closeExtendValidityModal();
    await loadTeacherDashboardStats();
  } catch (err) {
    if (alertBox) {
      alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-red-50 text-red-800 border border-red-200';
      alertBox.innerText = 'Network error while submitting request.';
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-paper-plane mr-1"></i> <span data-i18n="btn_send_extension_req">Send Renewal Request</span>`;
    }
  }
}

function showTeacherSection(secName) {
  if (secName === 'unified-mapping') {
    secName = 'courses';
  }

  document.querySelectorAll('.t-sub-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.t-btn-nav').forEach(b => b.classList.remove('active'));

  const target = document.getElementById('t-sec-' + secName);
  if (target) {
    target.classList.add('active');
  }

  const activeBtn = document.querySelector(`.t-btn-nav[data-sec="${secName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  try {
    if (secName === 'dashboard') {
      loadTeacherDashboardStats();
    }
    if (secName === 'courses') {
      populateCourseStreams();
      loadTeacherCourses();
      loadUnifiedMappings();
      loadAssessmentTypes();
    }
    if (secName === 'roster') {
      loadTeacherCourses();
      loadTeacherRoster();
    }
    if (secName === 'create-asm') {
      loadAssessmentTypes();
      loadTeacherCreatedAssessments();
      loadTeacherJoiningLink();
    }
    if (secName === 'eval-matrix') {
      loadTeacherSubmissions();
      loadTeacherMatrix();
    }
    if (secName === 'student-search') {
      loadTeacherStudentFilterOptions();
      loadTeacherStudentSearch();
    }
    if (secName === 'announcements') {
      loadTeacherAnnouncements();
      populateTeacherAnnouncementClasses();
    }
    if (secName === 'study-materials') {
      loadTeacherStudyMaterials();
      populateTeacherStudyMaterialClasses();
    }
  } catch (e) {
    console.error('Section loader error for ' + secName + ':', e);
  }
}

async function loadTeacherDashboard() {
  const dashView = document.getElementById('teacher-dashboard-view');
  const loginBox = document.getElementById('teacher-login-box');
  if (dashView) dashView.classList.remove('hidden');
  if (loginBox) loginBox.classList.add('hidden');
  populateCourseStreams();
  showTeacherSection('dashboard');
}

// ------------------- MULTI-CLASS FILTER STATE & HELPER -------------------
let selectedRosterClasses = new Set();
let selectedSubsClasses = new Set();
let selectedMatrixClasses = new Set();

function renderClassFilterPills(containerId, classes, selectedSet, onToggleCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  const lang = currentLanguage || 'en';
  
  // "All Classes" Pill
  const isAll = (selectedSet.size === 0);
  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = `px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
    isAll 
      ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-500/50' 
      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
  }`;
  const allLabel = (lang === 'mr') ? 'सर्व वर्ग' : 'All Classes';
  allBtn.innerHTML = `<i class="fa-solid fa-list-check text-[10px]"></i> <span>${allLabel}</span>`;
  allBtn.onclick = () => {
    selectedSet.clear();
    onToggleCallback();
  };
  container.appendChild(allBtn);

  // Individual Class Pills
  classes.forEach(c => {
    const isSelected = selectedSet.has(c);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
      isSelected 
        ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-400' 
        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
    }`;
    btn.innerHTML = `<span>${c}</span> ${isSelected ? '<i class="fa-solid fa-check text-[10px]"></i>' : ''}`;
    btn.onclick = () => {
      if (selectedSet.has(c)) {
        selectedSet.delete(c);
      } else {
        selectedSet.add(c);
      }
      onToggleCallback();
    };
    container.appendChild(btn);
  });
}

// ------------------- TEACHER FORGOT PASSWORD MODAL -------------------
function openTeacherForgotPasswordModal() {
  const m = document.getElementById('modal-teacher-forgot-password');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('open');
  }
  const resBox = document.getElementById('forgot-pwd-result');
  if (resBox) resBox.classList.add('hidden');
  const loginEmail = document.getElementById('teacher-login-email')?.value.trim();
  if (loginEmail && document.getElementById('forgot-teacher-email')) {
    document.getElementById('forgot-teacher-email').value = loginEmail;
  }
}

function closeTeacherForgotPasswordModal() {
  const m = document.getElementById('modal-teacher-forgot-password');
  if (m) {
    m.classList.remove('open');
    m.classList.add('hidden');
  }
}

async function handleTeacherForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-teacher-email')?.value.trim();
  if (!email) {
    showToast('Please enter your faculty email.', 'error');
    return;
  }

  const btn = document.getElementById('btn-submit-forgot-pwd');
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Sending...';
  }

  try {
    const res = await fetch('/api/teacher/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Password reset failed.', 'error');
      if (btn) {
        btn.disabled = false;
        btn.innerText = 'Send Password to Email';
      }
      return;
    }

    showToast(data.message || 'New password dispatched to your email address!', 'success');
    
    const resBox = document.getElementById('forgot-pwd-result');
    if (resBox) {
      const emailElem = document.getElementById('reset-res-email');
      if (emailElem) emailElem.innerText = data.email_masked || email;
      resBox.classList.remove('hidden');
    }

    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Send Password to Email';
    }
  } catch (err) {
    showToast('Network error while resetting password.', 'error');
    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Send Password to Email';
    }
  }
}

// ------------------- ADMIN FORGOT PASSWORD MODAL -------------------
function openAdminForgotPasswordModal() {
  const m = document.getElementById('modal-admin-forgot-password');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('open');
  }
  const resBox = document.getElementById('admin-forgot-pwd-result');
  if (resBox) resBox.classList.add('hidden');
  const adminUser = document.getElementById('admin-login-user')?.value.trim();
  if (adminUser && document.getElementById('forgot-admin-identifier')) {
    document.getElementById('forgot-admin-identifier').value = adminUser;
  }
}

function closeAdminForgotPasswordModal() {
  const m = document.getElementById('modal-admin-forgot-password');
  if (m) {
    m.classList.remove('open');
    m.classList.add('hidden');
  }
}

async function handleAdminForgotPassword(e) {
  e.preventDefault();
  const identifier = document.getElementById('forgot-admin-identifier')?.value.trim();
  if (!identifier) {
    showToast('Please enter your admin username or email.', 'error');
    return;
  }

  const btn = document.getElementById('btn-submit-admin-forgot-pwd');
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Sending...';
  }

  try {
    const res = await fetch('/api/admin/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: identifier })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Admin password reset failed.', 'error');
      if (btn) {
        btn.disabled = false;
        btn.innerText = 'Send Password to Email';
      }
      return;
    }

    showToast(data.message || 'New admin password dispatched to registered email!', 'success');
    
    const resBox = document.getElementById('admin-forgot-pwd-result');
    if (resBox) {
      const emailElem = document.getElementById('admin-reset-res-email');
      if (emailElem) emailElem.innerText = data.email_masked || identifier;
      resBox.classList.remove('hidden');
    }

    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Send Password to Email';
    }
  } catch (err) {
    showToast('Network error while resetting admin password.', 'error');
    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Send Password to Email';
    }
  }
}

// ------------------- TEACHER CHANGE PASSWORD MODAL -------------------
function openTeacherChangePasswordModal() {
  const m = document.getElementById('modal-teacher-change-password');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('open');
  }
  const form = document.getElementById('form-teacher-change-pwd');
  if (form) form.reset();
  const alertBox = document.getElementById('change-pwd-alert');
  if (alertBox) {
    alertBox.classList.add('hidden');
    alertBox.innerText = '';
  }
}

function closeTeacherChangePasswordModal() {
  const m = document.getElementById('modal-teacher-change-password');
  if (m) {
    m.classList.remove('open');
    m.classList.add('hidden');
  }
}

async function handleTeacherChangePassword(e) {
  e.preventDefault();
  const current_password = document.getElementById('change-pwd-current')?.value.trim();
  const new_password = document.getElementById('change-pwd-new')?.value.trim();
  const confirm_password = document.getElementById('change-pwd-confirm')?.value.trim();
  const alertBox = document.getElementById('change-pwd-alert');
  const btn = document.getElementById('btn-submit-change-pwd');

  if (!current_password || !new_password) {
    showToast('Please enter current and new password.', 'error');
    return;
  }

  if (new_password.length < 6) {
    if (alertBox) {
      alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-800';
      alertBox.innerText = 'New password must be at least 6 characters long (नवीन पासवर्ड किमान ६ अक्षरांचा असावा).';
      alertBox.classList.remove('hidden');
    }
    return;
  }

  if (confirm_password && new_password !== confirm_password) {
    if (alertBox) {
      alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-800';
      alertBox.innerText = 'New password and confirmation do not match (नवीन पासवर्ड व कन्फर्म पासवर्ड जुळत नाहीत).';
      alertBox.classList.remove('hidden');
    }
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Updating...';
  }

  try {
    const res = await fetch('/api/teacher/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_password: current_password,
        new_password: new_password,
        confirm_password: confirm_password
      })
    });
    const data = await res.json();

    if (!res.ok) {
      if (alertBox) {
        alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-800';
        alertBox.innerText = data.error || 'Failed to update password.';
        alertBox.classList.remove('hidden');
      }
      showToast(data.error || 'Failed to update password.', 'error');
      if (btn) {
        btn.disabled = false;
        btn.innerText = 'Update Password';
      }
      return;
    }

    showToast(data.message || 'Password changed successfully! A confirmation email has been sent.', 'success');
    if (alertBox) {
      alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800';
      alertBox.innerText = data.message || 'Password changed successfully!';
      alertBox.classList.remove('hidden');
    }

    setTimeout(() => {
      closeTeacherChangePasswordModal();
    }, 1400);

  } catch (err) {
    showToast('Network error while changing password.', 'error');
    if (alertBox) {
      alertBox.className = 'p-3 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-800';
      alertBox.innerText = 'Network error while updating password.';
      alertBox.classList.remove('hidden');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = 'Update Password';
    }
  }
}

// ------------------- TAB 1: CLASS ROSTER (ADD, EDIT, DELETE, BULK) -------------------
function openAddStudentModal() {
  const m = document.getElementById('modal-add-student');
  if (m) {
    m.classList.remove('hidden');
    m.classList.add('open');
  }
}

function closeAddStudentModal() {
  const m = document.getElementById('modal-add-student');
  if (m) {
    m.classList.remove('open');
    m.classList.add('hidden');
  }
}

async function handleSingleStudentSubmit(e) {
  e.preventDefault();
  const payload = {
    academic_year: document.getElementById('m-stu-year').value.trim(),
    class_name: document.getElementById('m-stu-class').value.trim(),
    roll_number: document.getElementById('m-stu-roll').value.trim(),
    prn: document.getElementById('m-stu-prn').value.trim(),
    student_name: document.getElementById('m-stu-name').value.trim(),
    gender: document.getElementById('m-stu-gender').value,
    division: document.getElementById('m-stu-div').value.trim() || 'A',
    email: document.getElementById('m-stu-email').value.trim(),
    mobile: document.getElementById('m-stu-mobile').value.trim(),
    is_repeater: document.getElementById('m-stu-repeater').checked
  };

  try {
    const res = await fetch('/api/teacher/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to add student.', 'error');
      return;
    }

    showToast(`Student ${payload.student_name} added to roster!`, 'success');
    closeAddStudentModal();
    loadTeacherRoster();
    loadTeacherDashboardStats();
  } catch (e) {
    showToast('Error adding student.', 'error');
  }
}

const handleAddStudentSubmit = handleSingleStudentSubmit;

async function openEditStudentModal(rosterId) {
  try {
    const res = await fetch(`/api/teacher/student/${rosterId}`);
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Student not found.', 'error');
      return;
    }
    const s = data.student;
    document.getElementById('edit-stu-id').value = s.id;
    document.getElementById('edit-stu-year').value = s.academic_year;
    document.getElementById('edit-stu-class').value = s.class_name;
    document.getElementById('edit-stu-roll').value = s.roll_number;
    document.getElementById('edit-stu-div').value = s.division || 'A';
    document.getElementById('edit-stu-gender').value = s.gender || 'Male';
    document.getElementById('edit-stu-prn').value = s.prn;
    document.getElementById('edit-stu-name').value = s.student_name;
    document.getElementById('edit-stu-email').value = s.email || '';
    document.getElementById('edit-stu-mobile').value = s.mobile || '';
    document.getElementById('edit-stu-repeater').checked = (s.is_repeater === 1);

    const m = document.getElementById('modal-edit-student');
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('open');
    }
  } catch (e) {
    showToast('Error loading student details.', 'error');
  }
}

function closeEditStudentModal() {
  const m = document.getElementById('modal-edit-student');
  if (m) {
    m.classList.remove('open');
    m.classList.add('hidden');
  }
}

async function handleEditStudentSubmit(e) {
  e.preventDefault();
  const rosterId = document.getElementById('edit-stu-id').value;
  const payload = {
    academic_year: document.getElementById('edit-stu-year').value.trim(),
    class_name: document.getElementById('edit-stu-class').value.trim(),
    roll_number: document.getElementById('edit-stu-roll').value.trim(),
    prn: document.getElementById('edit-stu-prn').value.trim(),
    student_name: document.getElementById('edit-stu-name').value.trim(),
    gender: document.getElementById('edit-stu-gender').value,
    division: document.getElementById('edit-stu-div').value.trim() || 'A',
    email: document.getElementById('edit-stu-email').value.trim(),
    mobile: document.getElementById('edit-stu-mobile').value.trim(),
    is_repeater: document.getElementById('edit-stu-repeater').checked
  };

  try {
    const res = await fetch(`/api/teacher/student/${rosterId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to update student.', 'error');
      return;
    }

    showToast('Student record updated successfully!', 'success');
    closeEditStudentModal();
    loadTeacherRoster();
    loadTeacherDashboardStats();
  } catch (e) {
    showToast('Error updating student.', 'error');
  }
}

function toggleRosterForm() {
  document.getElementById('roster-bulk-form').classList.toggle('hidden');
}

function handleRosterFileSelect(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    const content = evt.target.result;
    const rawTextarea = document.getElementById('roster-raw-text');
    if (rawTextarea) {
      rawTextarea.value = content;
      const rowCount = content.split('\n').filter(l => l.trim().length > 0).length;
      showToast(`Loaded CSV "${file.name}" (${rowCount} rows). Click "Import Student Roster" to save.`, 'info');
    }
  };
  reader.readAsText(file);
}

async function handleBulkRosterUpload() {
  const academicYear = document.getElementById('roster-year').value.trim();
  const className = document.getElementById('roster-class').value.trim();
  const rawText = document.getElementById('roster-raw-text').value.trim();
  const isRepeater = document.getElementById('roster-repeater').checked;

  if (!className || !rawText) {
    showToast('Please provide class name and student rows.', 'error');
    return;
  }

  try {
    const res = await fetch('/api/teacher/student/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        academic_year: academicYear,
        class_name: className,
        raw_text: rawText,
        is_repeater: isRepeater
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Bulk import failed.', 'error');
      return;
    }

    showToast(data.message, 'success');
    document.getElementById('roster-raw-text').value = '';
    document.getElementById('roster-bulk-form').classList.add('hidden');
    loadTeacherRoster();
    loadTeacherDashboardStats();
  } catch (e) {
    showToast('Error importing data.', 'error');
  }
}

async function loadTeacherRoster() {
  try {
    const classFilter = Array.from(selectedRosterClasses).join(',');
    const repFilter = document.getElementById('roster-filter-repeater')?.value || '';

    let url = '/api/teacher/roster?';
    if (classFilter) url += `class_name=${encodeURIComponent(classFilter)}&`;
    if (repFilter !== '') url += `is_repeater=${encodeURIComponent(repFilter)}&`;

    const res = await fetch(url);
    const data = await res.json();
    const list = data.roster || [];
    const classes = data.classes || [];

    // Render interactive multi-class pills
    renderClassFilterPills('roster-class-pills', classes, selectedRosterClasses, () => loadTeacherRoster());

    let regCount = 0;
    let repCount = 0;
    list.forEach(s => s.is_repeater ? repCount++ : regCount++);

    if (document.getElementById('roster-count-total')) document.getElementById('roster-count-total').innerText = list.length;
    if (document.getElementById('roster-count-reg')) document.getElementById('roster-count-reg').innerText = regCount;
    if (document.getElementById('roster-count-rep')) document.getElementById('roster-count-rep').innerText = repCount;

    const tbody = document.getElementById('teacher-roster-tbody');
    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400">No students found in roster. Click "+ Add Student" or "Bulk Import" to get started.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(st => `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3 font-bold text-slate-800">${escapeHtml(st.class_name)} <span class="text-[10px] text-slate-400 block font-normal">Div ${escapeHtml(st.division || 'A')} (${escapeHtml(st.academic_year || '')})</span></td>
        <td class="p-3 font-mono font-bold">${escapeHtml(st.roll_number)}</td>
        <td class="p-3 font-mono text-blue-900 font-bold">${escapeHtml(st.prn)}</td>
        <td class="p-3 font-semibold text-slate-900">${escapeHtml(st.student_name)}</td>
        <td class="p-3">${escapeHtml(st.gender || '—')}</td>
        <td class="p-3 text-[11px] font-mono text-slate-500">${escapeHtml(st.mobile || '')}<br>${escapeHtml(st.email || '')}</td>
        <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${st.is_repeater ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">${st.is_repeater ? 'Repeater' : 'Regular'}</span></td>
        <td class="p-3 text-right whitespace-nowrap space-x-1">
          <button onclick="openEditStudentModal(${st.id})" class="btn-3d-glass px-2.5 py-1 text-blue-700 rounded text-[11px] font-bold">
            <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
          </button>
          <button onclick="deleteRosterStudent(${st.id})" class="btn-3d-glass px-2.5 py-1 text-red-700 rounded text-[11px] font-bold">
            <i class="fa-solid fa-trash mr-1"></i> Delete
          </button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error('Roster error:', e);
  }
}

async function deleteRosterStudent(id) {
  if (!confirm('Are you sure you want to remove this student and their records from the roster? (हा विद्यार्थी यादीतून हटवायचा आहे का?)')) return;
  try {
    const res = await fetch(`/api/teacher/roster/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || 'Student removed from roster.', 'success');
      loadTeacherRoster();
      loadTeacherDashboardStats();
    } else {
      showToast(data.error || 'Failed to remove student.', 'error');
    }
  } catch (e) {
    showToast('Network error while removing student.', 'error');
  }
}

// ------------------- TAB 2: UNIFIED SUBJECT & ASSIGNMENT MAPPING -------------------
function toggleUnifiedMappingForm() {
  document.getElementById('unified-mapping-form').classList.toggle('hidden');
}

async function handleUnifiedMappingSubmit(e) {
  e.preventDefault();
  const year = document.getElementById('um-year')?.value || '2026–27';
  const stream = document.getElementById('um-stream')?.value || '';
  const subject = document.getElementById('um-subject')?.value || '';
  const customSubject = document.getElementById('um-custom-subject') ? document.getElementById('um-custom-subject').value.trim() : '';
  const className = document.getElementById('um-class')?.value.trim() || '';
  const semester = document.getElementById('um-semester')?.value || '';
  const programCode = document.getElementById('um-program-code')?.value.trim() || '';
  const courseCode = document.getElementById('um-course-code')?.value.trim() || '';
  const courseName = document.getElementById('um-course-name')?.value.trim() || '';
  const totalMaxMarks = parseFloat(document.getElementById('um-max-marks')?.value || 40);

  const assignments = [];
  document.querySelectorAll('.um-type-chk:checked').forEach(chk => {
    const typeId = parseInt(chk.value);
    const typeName = chk.getAttribute('data-name');
    const marksInput = document.getElementById(`um-marks-${typeId}`);
    const descInput = document.getElementById(`um-desc-${typeId}`);
    const marks = parseFloat(marksInput ? marksInput.value : 10) || 10;
    const desc = descInput ? descInput.value.trim() : '';
    assignments.push({
      type_id: typeId,
      type_name: typeName,
      max_marks: marks,
      description: desc
    });
  });

  if (assignments.length === 0) {
    showToast('Please select at least 1 assessment component.', 'error');
    return;
  }

  const payload = {
    academic_year: year,
    faculty_stream: stream,
    subject_name: subject,
    custom_subject: customSubject,
    class_name: className,
    semester: semester,
    program_code: programCode,
    course_code: courseCode,
    course_name: courseName,
    credits: 4,
    total_internal_max_marks: totalMaxMarks,
    assignments: assignments
  };

  try {
    const res = await fetch('/api/teacher/unified-mapping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Mapping failed.', 'error');
      return;
    }

    showToast(data.message || 'Subject & assignment components mapped successfully!', 'success');
    document.getElementById('unified-mapping-form').classList.add('hidden');
    try { loadUnifiedMappings(); } catch(e) {}
    try { loadTeacherCourses(); } catch(e) {}
    try { loadTeacherCreatedAssessments(); } catch(e) {}
    try { loadTeacherDashboardStats(); } catch(e) {}
  } catch (e) {
    console.error('Error saving subject mapping:', e);
    showToast('Error saving subject mapping.', 'error');
  }
}

async function loadUnifiedMappings() {
  try {
    const res = await fetch('/api/teacher/unified-mappings');
    const data = await res.json();
    const subjects = (data.subjects || []).filter(sub => sub.assignments && sub.assignments.length > 0);
    const container = document.getElementById('unified-mappings-cards-container');
    if (!container) return;

    container.innerHTML = '';
    if (subjects.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 p-8 text-center text-slate-400 bg-slate-50/80 rounded-2xl border border-slate-200">
          <i class="fa-solid fa-clipboard-check text-3xl text-slate-300 mb-2 block"></i>
          <p class="font-bold text-slate-700">No active CIE assessment mappings yet (कोणतेही CIE घटक मॅपिंग उपलब्ध नाही).</p>
          <p class="text-xs text-slate-500 mt-1">Select a course above and map CIE components to see active mappings here. (वरील यादीतून विषय निवडून खाली घटक मॅप करा व जतन करा.)</p>
        </div>
      `;
      return;
    }

    container.innerHTML = subjects.map(sub => {
      const asmsHtml = (sub.assignments || []).map(a => `
        <div class="flex justify-between items-center p-2 rounded-lg bg-white border border-slate-200 text-xs">
          <span class="font-bold text-slate-800"><i class="fa-solid fa-angle-right text-blue-500 mr-1"></i> ${escapeHtml(a.assessment_type_name)}</span>
          <span class="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${a.max_marks} Marks</span>
        </div>
      `).join('');

      return `
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">${escapeHtml(sub.class_name)} • ${escapeHtml(sub.semester)}</span>
                <h4 class="text-sm font-bold text-slate-900 mt-1.5">${escapeHtml(sub.course_name)} <span class="text-xs text-blue-800 font-mono">(${escapeHtml(sub.course_code)})</span></h4>
                <p class="text-xs text-slate-500">${escapeHtml(sub.faculty_stream || '')} • ${escapeHtml(sub.subject_name || '')}</p>
              </div>
              <div class="flex items-center space-x-1.5">
                <button onclick="quickMapCIEForCourse(${sub.id})" class="btn-3d-glass px-2.5 py-1 text-blue-700 text-xs font-bold rounded-lg" title="Edit CIE Mapping">
                  <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
                </button>
                <button onclick="deleteUnifiedMapping(${sub.id})" class="btn-3d-glass px-2.5 py-1 text-red-700 text-xs font-bold rounded-lg" title="Delete Mapping">
                  <i class="fa-solid fa-trash mr-1"></i> Delete
                </button>
              </div>
            </div>
            <div class="space-y-1.5 pt-3">
              <div class="text-[11px] font-bold text-slate-600 uppercase">Mapped Assessment Breakdown (${sub.total_internal_max_marks} Marks Total):</div>
              ${asmsHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Error loading mappings:', e);
  }
}

async function deleteUnifiedMapping(subjectId) {
  if (!confirm('Are you sure you want to delete this subject mapping and all its mapped components? (हा विषय व सर्व असाइनमेंट मॅपिंग हटवायचे आहे का?)')) return;
  try {
    const res = await fetch(`/api/teacher/unified-mapping/${subjectId}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || 'Subject mapping deleted successfully.', 'success');
      loadUnifiedMappings();
      loadTeacherCreatedAssessments();
    } else {
      showToast(data.error || 'Failed to delete subject mapping.', 'error');
    }
  } catch (e) {
    showToast('Network error while deleting subject mapping.', 'error');
  }
}

// ------------------- TAB 3: CREATE ASSESSMENT SESSIONS (CREATE, EDIT, DELETE) -------------------
async function loadTeacherCreatedAssessments() {
  try {
    const res = await fetch('/api/teacher/create-assessment');
    const data = await res.json();
    const list = data.assessments || [];
    const subjects = data.subjects || [];

    window.teacherCreatedAsmSubjects = subjects;
    const casmSubSelect = document.getElementById('casm-subject');
    if (casmSubSelect) {
      casmSubSelect.innerHTML = '<option value="">-- Select Mapped Subject --</option>' + 
        subjects.map(s => `<option value="${s.id}" data-class="${escapeHtml(s.class_name)}">${escapeHtml(s.class_name)} • ${escapeHtml(s.course_name)} (${escapeHtml(s.course_code)})</option>`).join('');
    }

    const tbody = document.getElementById('teacher-created-asm-tbody');
    if (tbody) {
      if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400">No assessment sessions created yet. Fill the form on the left to create a session.</td></tr>`;
      } else {
        tbody.innerHTML = list.map(asm => {
          let topicsHtml = `<span class="text-slate-700 font-medium">${escapeHtml(asm.assignment_topic)}</span>`;
          if (asm.is_individual_topics === 1) {
            let count = 0;
            if (asm.student_topics_json) {
              try {
                const parsed = JSON.parse(asm.student_topics_json);
                count = Object.values(parsed).filter(v => v && String(v).trim()).length;
              } catch(e) {}
            }
            topicsHtml += `
              <div class="mt-1.5">
                <button type="button" onclick="viewAllocatedStudentTopicsModal(${asm.id})" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-200 text-[10.5px] font-bold shadow-xs transition cursor-pointer">
                  <i class="fa-solid fa-users-viewfinder text-indigo-600"></i>
                  <span>🎯 वैयक्तिक विषय यादी (${count})</span>
                </button>
              </div>
            `;
          }

          if (asm.is_group === 1) {
            let gcount = 0;
            let mcount = 0;
            if (asm.student_groups_json) {
              try {
                const parsedG = JSON.parse(asm.student_groups_json);
                const gNames = new Set();
                Object.values(parsedG).forEach(v => {
                  const gName = (typeof v === 'object' && v !== null) ? v.group : v;
                  if (gName && String(gName).trim()) {
                    gNames.add(String(gName).trim());
                    mcount++;
                  }
                });
                gcount = gNames.size;
              } catch(e) {}
            }
            topicsHtml += `
              <div class="mt-1.5">
                <button type="button" onclick="viewAllocatedStudentGroupsModal(${asm.id})" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-[10.5px] font-bold shadow-xs transition cursor-pointer">
                  <i class="fa-solid fa-users-gear text-emerald-600"></i>
                  <span>👥 गट वाटप यादी (${gcount} Groups • ${mcount} Students)</span>
                </button>
              </div>
            `;
          }

          const isGroupBadge = asm.is_group === 1 ? `<span class="inline-flex items-center gap-1 text-[9.5px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold mt-1"><i class="fa-solid fa-users"></i> Group</span>` : '';

          let targetScopeBadge = '';
          if (asm.target_students_json) {
            try {
              const tPrns = JSON.parse(asm.target_students_json);
              if (Array.isArray(tPrns) && tPrns.length > 0) {
                targetScopeBadge = `<span class="inline-flex items-center gap-1 text-[9.5px] px-1.5 py-0.5 bg-indigo-100 text-indigo-900 rounded font-bold mt-1 shadow-2xs" title="${tPrns.length} निवडक विद्यार्थ्यांना वाटप"><i class="fa-solid fa-user-check text-indigo-600"></i> 🎯 ${tPrns.length} विद्यार्थी</span>`;
              }
            } catch(e) {}
          }
          if (!targetScopeBadge) {
            targetScopeBadge = `<span class="inline-flex items-center gap-1 text-[9.5px] px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-medium mt-1"><i class="fa-solid fa-users"></i> संपूर्ण वर्ग</span>`;
          }

          const isMarksVisible = (asm.show_marks_to_students !== 0);
          const marksBadge = isMarksVisible
            ? `<span class="inline-flex items-center gap-1 text-[9.5px] px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-md font-extrabold mt-1 shadow-2xs" title="विद्यार्थ्यांसाठी निकाल/गुण सुरू आहेत (Marks Visible to Students)"><i class="fa-solid fa-eye text-emerald-600"></i> गुण सुरू (Visible)</span>`
            : `<span class="inline-flex items-center gap-1 text-[9.5px] px-2 py-0.5 bg-rose-100 text-rose-900 border border-rose-300 rounded-md font-extrabold mt-1 shadow-2xs" title="विद्यार्थ्यांपासून निकाल/गुण लपवले आहेत (Marks Hidden / Withheld)"><i class="fa-solid fa-eye-slash text-rose-600"></i> गुण लपवले (Hidden)</span>`;

          return `
            <tr class="hover:bg-slate-50 transition">
              <td class="p-3 font-bold text-slate-900">
                ${escapeHtml(asm.assessment_session_title)} 
                <span class="text-[10px] font-mono text-blue-800 block">${escapeHtml(asm.assessment_code)}</span>
                <div class="flex items-center gap-1 flex-wrap">${isGroupBadge} ${targetScopeBadge} ${marksBadge}</div>
              </td>
              <td class="p-3">${escapeHtml(asm.class_name)} <span class="text-[10px] text-slate-400 block">${escapeHtml(asm.semester)}</span></td>
              <td class="p-3 font-medium">${escapeHtml(asm.course_name)}</td>
              <td class="p-3"><span class="font-bold text-purple-900">${escapeHtml(asm.assessment_type_name)}</span> <span class="text-[11px] text-emerald-700 font-bold block">(${asm.max_marks} M)</span></td>
              <td class="p-3 max-w-xs">${topicsHtml}</td>
              <td class="p-3 text-[11px] text-slate-500">${escapeHtml(asm.submission_deadline || 'Open')}</td>
              <td class="p-3 font-bold text-blue-900 text-center">${asm.submissions_count || 0}</td>
              <td class="p-3 text-right whitespace-nowrap space-x-1">
                <button onclick="toggleAssessmentMarksVisibility(${asm.id})" class="btn-3d-glass px-2.5 py-1 ${isMarksVisible ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-300' : 'text-rose-800 bg-rose-50 hover:bg-rose-100 border-rose-300'} rounded-lg text-[11px] font-extrabold shadow-xs transition" title="${isMarksVisible ? 'विद्यार्थ्यांसाठी गुण सुरू आहेत (क्लिक करून लपवा / Withhold)' : 'विद्यार्थ्यांसाठी गुण लपवले आहेत (क्लिक करून सुरू करा / Make Visible)'}">
                  <i class="fa-solid ${isMarksVisible ? 'fa-eye text-emerald-600' : 'fa-eye-slash text-rose-600'} mr-1"></i> ${isMarksVisible ? 'गुण सुरू' : 'गुण लपवले'}
                </button>
                <button onclick="openEditAssessmentModal(${asm.id})" class="btn-3d-glass px-2.5 py-1 text-blue-700 rounded text-[11px] font-bold">
                  <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
                </button>
                <button onclick="deleteCreatedAssessment(${asm.id})" class="btn-3d-glass px-2.5 py-1 text-red-700 rounded text-[11px] font-bold">
                  <i class="fa-solid fa-trash mr-1"></i> Delete
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  } catch (e) {
    console.error('Error loading assessments:', e);
  }
}

let currentCasmLoadedMappings = [];

async function onCreatedAsmSubjectChange() {
  const subjectId = document.getElementById('casm-subject').value;
  const mappingSelect = document.getElementById('casm-mapping');
  mappingSelect.innerHTML = '<option value="">-- Select Mapped Component --</option>';
  const hintBox = document.getElementById('casm-mapping-preview-hint');
  if (hintBox) hintBox.classList.add('hidden');

  if (!subjectId) return;

  try {
    const res = await fetch('/api/teacher/unified-mappings');
    const data = await res.json();
    const sub = (data.subjects || []).find(s => s.id === parseInt(subjectId));
    if (sub && sub.assignments) {
      currentCasmLoadedMappings = sub.assignments;
      sub.assignments.forEach(a => {
        mappingSelect.innerHTML += `<option value="${a.id}">${a.assessment_type_name} (${a.max_marks} Marks)</option>`;
      });
    }
  } catch (e) {}

  const targetScope = document.querySelector('input[name="casm_target_scope"]:checked')?.value || 'all';
  if (targetScope === 'selected') {
    loadTargetStudentsForScope();
  }

  if (document.getElementById('casm-is-individual-topics')?.checked) {
    loadStudentsForCreateIndividualTopics(true);
  }
  if (document.getElementById('casm-is-group')?.checked) {
    loadStudentsForCreateGroups(true);
  }
}

function onCasmMappingChange() {
  const mappingId = parseInt(document.getElementById('casm-mapping')?.value);
  const hintBox = document.getElementById('casm-mapping-preview-hint');
  const countText = document.getElementById('casm-mapping-fields-count-text');
  if (!hintBox || !countText) return;

  if (!mappingId) {
    hintBox.classList.add('hidden');
    return;
  }

  const mapObj = currentCasmLoadedMappings.find(m => m.id === mappingId);
  if (!mapObj) {
    hintBox.classList.add('hidden');
    return;
  }

  const typeObj = findAssessmentTypeObj(mapObj.assessment_type_name);
  const fields = (typeObj && typeObj.fields_schema) ? typeObj.fields_schema : [];
  countText.innerText = `${mapObj.assessment_type_name} (${fields.length} स्वयंचलित फील्ड्स)`;
  hintBox.classList.remove('hidden');
}

function previewCurrentCasmMappingFields() {
  const mappingId = parseInt(document.getElementById('casm-mapping')?.value);
  const mapObj = currentCasmLoadedMappings.find(m => m.id === mappingId);
  if (mapObj) {
    openAssessmentTypePreviewModal(mapObj.assessment_type_name);
  }
}

let selectedTargetStudentPrns = new Set();
let currentCreatedAsmTargetRoster = [];

function toggleTeacherTargetStudentsScope(scope) {
  const box = document.getElementById('teacher-target-students-box');
  if (!box) return;

  if (scope === 'selected') {
    box.classList.remove('hidden');
    loadTargetStudentsForScope();
  } else {
    box.classList.add('hidden');
    selectedTargetStudentPrns.clear();
    updateTargetStudentsCount();
  }
}

async function loadTargetStudentsForScope() {
  const container = document.getElementById('target-students-list-container');
  if (!container) return;

  const subjectId = document.getElementById('casm-subject')?.value;
  let targetClass = '';
  if (subjectId) {
    const subjects = window.teacherCreatedAsmSubjects || teacherMasterCourses || [];
    const sub = subjects.find(s => s.id == subjectId);
    if (sub) {
      targetClass = sub.class_name || '';
    } else {
      const opt = document.querySelector(`#casm-subject option[value="${subjectId}"]`);
      if (opt) targetClass = opt.getAttribute('data-class') || '';
    }
  }

  if (!subjectId) {
    container.innerHTML = `
      <div class="p-3 text-center text-amber-800 bg-amber-50 rounded-xl border border-amber-200">
        <i class="fa-solid fa-circle-exclamation mr-1 text-amber-600"></i>
        <span>कृपया आधी वरील ड्रॉपडाउनमधून <b>विषय (Mapped Subject)</b> निवडा.</span>
      </div>
    `;
    updateTargetStudentsCount();
    return;
  }

  container.innerHTML = `
    <div class="p-3 text-center text-blue-800 bg-blue-50/60 rounded-xl">
      <i class="fa-solid fa-spinner fa-spin mr-1.5 text-blue-600"></i>
      <span>विद्यार्थी हजेरीपट (Roster) लोड होत आहे...</span>
    </div>
  `;

  try {
    let url = '/api/teacher/roster';
    if (targetClass) url += `?class_name=${encodeURIComponent(targetClass)}`;
    const res = await fetch(url);
    const data = await res.json();
    currentCreatedAsmTargetRoster = data.roster || [];

    if (currentCreatedAsmTargetRoster.length === 0) {
      container.innerHTML = `
        <div class="p-3 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
          <i class="fa-solid fa-user-slash mr-1 text-slate-400"></i>
          <span>या वर्गासाठी (${escapeHtml(targetClass || 'Class')}) हजेरीपटात (Roster) विद्यार्थी आढळले नाहीत.</span>
        </div>
      `;
      updateTargetStudentsCount();
      return;
    }

    renderTargetStudentsList();
  } catch (err) {
    console.error('Error loading target students:', err);
    container.innerHTML = `
      <div class="p-3 text-center text-red-600 bg-red-50 rounded-xl">
        विद्यार्थी यादी लोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.
      </div>
    `;
  }
}

function renderTargetStudentsList(filterQuery = '') {
  const container = document.getElementById('target-students-list-container');
  if (!container) return;

  const query = (filterQuery || document.getElementById('target-students-search')?.value || '').trim().toLowerCase();
  const list = currentCreatedAsmTargetRoster.filter(st => {
    if (!query) return true;
    const roll = String(st.roll_number || '').toLowerCase();
    const prn = String(st.prn || '').toLowerCase();
    const name = String(st.student_name || '').toLowerCase();
    return roll.includes(query) || prn.includes(query) || name.includes(query);
  });

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-3 text-center text-slate-400">
        दिलेल्या शोधानुसार विद्यार्थी आढळले नाहीत.
      </div>
    `;
    updateTargetStudentsCount();
    return;
  }

  container.innerHTML = '';
  list.forEach(st => {
    const prnStr = String(st.prn);
    const isChecked = selectedTargetStudentPrns.has(prnStr);
    const prnEscaped = escapeHtml(prnStr);
    const nameEscaped = escapeHtml(String(st.student_name));
    const rollEscaped = escapeHtml(String(st.roll_number || '—'));
    const classEscaped = escapeHtml(String(st.class_name || ''));

    container.innerHTML += `
      <label class="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50/70 cursor-pointer transition select-none ${isChecked ? 'bg-blue-50/90 font-bold text-blue-950' : ''}">
        <div class="flex items-center space-x-2.5 min-w-0">
          <input type="checkbox" value="${prnEscaped}" ${isChecked ? 'checked' : ''} onchange="onTargetStudentCheckboxChange('${prnEscaped}', this.checked)" class="target-student-cb w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer">
          <span class="w-7 text-center font-mono font-bold text-slate-600 text-[11px] shrink-0 bg-slate-100 rounded px-1">${rollEscaped}</span>
          <div class="truncate">
            <span class="text-slate-900 font-semibold text-xs">${nameEscaped}</span>
            <span class="text-[10.5px] text-blue-900 font-mono ml-1.5 opacity-80">(${prnEscaped})</span>
          </div>
        </div>
        <span class="text-[10px] text-slate-500 font-medium shrink-0 ml-2">${classEscaped}</span>
      </label>
    `;
  });

  updateTargetStudentsCount();
}

function onTargetStudentCheckboxChange(prn, isChecked) {
  if (isChecked) {
    selectedTargetStudentPrns.add(String(prn));
  } else {
    selectedTargetStudentPrns.delete(String(prn));
  }
  updateTargetStudentsCount();
}

function selectAllTargetStudents(shouldSelectAll) {
  const query = (document.getElementById('target-students-search')?.value || '').trim().toLowerCase();
  const list = currentCreatedAsmTargetRoster.filter(st => {
    if (!query) return true;
    const roll = String(st.roll_number || '').toLowerCase();
    const prn = String(st.prn || '').toLowerCase();
    const name = String(st.student_name || '').toLowerCase();
    return roll.includes(query) || prn.includes(query) || name.includes(query);
  });

  list.forEach(st => {
    if (shouldSelectAll) {
      selectedTargetStudentPrns.add(String(st.prn));
    } else {
      selectedTargetStudentPrns.delete(String(st.prn));
    }
  });

  renderTargetStudentsList();
}

function filterTargetStudentsList(query) {
  renderTargetStudentsList(query);
}

function updateTargetStudentsCount() {
  const badge = document.getElementById('target-students-selected-badge');
  if (badge) {
    const total = currentCreatedAsmTargetRoster.length;
    const count = selectedTargetStudentPrns.size;
    badge.innerText = `${count} / ${total} निवडले (Selected)`;
    if (count > 0) {
      badge.className = 'px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[11px] shadow-xs';
    } else {
      badge.className = 'px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold text-[11px]';
    }
  }
}

let currentCreatedAsmRoster = [];

function toggleTeacherIndividualTopics() {
  const isChecked = document.getElementById('casm-is-individual-topics')?.checked || false;
  const builder = document.getElementById('teacher-individual-topics-builder');
  const statsBadge = document.getElementById('individual-topics-stats-badge');

  if (isChecked) {
    if (builder) builder.classList.remove('hidden');
    if (statsBadge) statsBadge.classList.remove('hidden');
    loadStudentsForCreateIndividualTopics(true);
  } else {
    if (builder) builder.classList.add('hidden');
    if (statsBadge) statsBadge.classList.add('hidden');
  }
}

async function loadStudentsForCreateIndividualTopics(preserveValues = true) {
  const tbody = document.getElementById('teacher-individual-topics-tbody');
  if (!tbody) return;

  const subjectId = document.getElementById('casm-subject')?.value;
  let targetClass = '';
  if (subjectId && teacherMasterCourses) {
    const sub = teacherMasterCourses.find(s => s.id == subjectId);
    if (sub) targetClass = sub.class_name;
  }

  // Preserve existing inputs if any
  const existingMap = {};
  if (preserveValues) {
    document.querySelectorAll('.casm-indiv-topic-input').forEach(inp => {
      const prn = inp.getAttribute('data-prn');
      if (prn) existingMap[prn] = inp.value;
    });
  }

  tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Syncing student roster...</td></tr>';

  try {
    let url = '/api/teacher/roster';
    if (targetClass) url += `?class_name=${encodeURIComponent(targetClass)}`;
    const res = await fetch(url);
    const data = await res.json();
    currentCreatedAsmRoster = data.roster || [];

    if (currentCreatedAsmRoster.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-slate-500 bg-amber-50 rounded-xl">या वर्गासाठी विद्यार्थी हजेरीपटात (Roster) अद्याप विद्यार्थी जोडलेले नाहीत. कृपया आधी 'Student Roster' मध्ये विद्यार्थी जोडा.</td></tr>`;
      updateIndividualTopicsCount();
      return;
    }

    tbody.innerHTML = '';
    currentCreatedAsmRoster.forEach(st => {
      const val = existingMap[st.prn] || '';
      tbody.innerHTML += `
        <tr class="hover:bg-indigo-50/40 transition">
          <td class="p-2.5 font-mono font-bold text-slate-700">${st.roll_number}</td>
          <td class="p-2.5 font-mono text-blue-900 font-bold">${st.prn}</td>
          <td class="p-2.5 font-semibold text-slate-900">${escapeHtml(st.student_name)} <span class="text-[10px] text-slate-400 block">${st.class_name}</span></td>
          <td class="p-2.5">
            <input type="text" data-prn="${st.prn}" data-student-id="${st.id}" value="${escapeHtml(val)}" oninput="updateIndividualTopicsCount()" placeholder="उदा. विशेष प्रकल्प / असाइनमेंट विषय..." class="casm-indiv-topic-input w-full rounded-xl border border-indigo-200 p-2 text-xs bg-white focus:border-indigo-500 font-medium">
          </td>
        </tr>
      `;
    });
    updateIndividualTopicsCount();
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500">Failed to load student roster.</td></tr>';
  }
}

function updateIndividualTopicsCount() {
  const inputs = document.querySelectorAll('.casm-indiv-topic-input');
  let assigned = 0;
  inputs.forEach(inp => {
    if (inp.value.trim().length > 0) assigned++;
  });
  const countSpan = document.getElementById('indiv-topics-count');
  const totalSpan = document.getElementById('indiv-total-students-count');
  if (countSpan) countSpan.innerText = assigned;
  if (totalSpan) totalSpan.innerText = inputs.length;
}

function toggleTopicsBulkBox() {
  const box = document.getElementById('topics-bulk-box');
  if (box) box.classList.toggle('hidden');
}

function distributeBulkTopicsSequentially() {
  const rawText = document.getElementById('topics-bulk-raw-text')?.value || '';
  if (!rawText.trim()) {
    showToast('Please paste list of topics first.', 'error');
    return;
  }
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return;

  const inputs = document.querySelectorAll('.casm-indiv-topic-input');
  if (inputs.length === 0) {
    showToast('No students loaded in roster.', 'error');
    return;
  }

  inputs.forEach((inp, idx) => {
    const topicLine = lines[idx % lines.length];
    const cleanTopic = topicLine.replace(/^(\d+[\.\)]\s*|विषय\s*\d+[\s:\-]*|Topic\s*\d+[\s:\-]*)/i, '').trim();
    inp.value = cleanTopic || topicLine;
  });

  updateIndividualTopicsCount();
  toggleTopicsBulkBox();
  showToast(`Distributed topics sequentially to ${inputs.length} students!`, 'success');
}

function applyDefaultTopicToAllBlank() {
  const mainTopic = document.getElementById('casm-topic')?.value.trim();
  if (!mainTopic) {
    showToast('Please type main Assignment Topic first.', 'error');
    return;
  }
  const inputs = document.querySelectorAll('.casm-indiv-topic-input');
  let filled = 0;
  inputs.forEach(inp => {
    if (!inp.value.trim()) {
      inp.value = mainTopic;
      filled++;
    }
  });
  updateIndividualTopicsCount();
  showToast(`Filled ${filled} blank student topics with main topic.`, 'info');
}

// =========================================================================
// GROUP / COLLABORATIVE ASSESSMENT FORMATION SYSTEM
// =========================================================================

function toggleTeacherGroupBuilder() {
  const isChecked = document.getElementById('casm-is-group')?.checked || false;
  const builder = document.getElementById('teacher-group-assessment-builder');

  if (isChecked) {
    if (builder) builder.classList.remove('hidden');
    loadStudentsForCreateGroups(true);
  } else {
    if (builder) builder.classList.add('hidden');
  }
}

async function loadStudentsForCreateGroups(preserveValues = true) {
  const tbody = document.getElementById('teacher-group-assignment-tbody');
  if (!tbody) return;

  const subSelect = document.getElementById('casm-subject');
  const subjectId = subSelect?.value;
  let targetClass = '';
  
  if (subSelect && subSelect.selectedIndex > 0) {
    const selectedOpt = subSelect.options[subSelect.selectedIndex];
    targetClass = selectedOpt.getAttribute('data-class') || '';
    if (!targetClass && window.teacherCreatedAsmSubjects) {
      const sub = window.teacherCreatedAsmSubjects.find(s => s.id == subjectId);
      if (sub) targetClass = sub.class_name;
    }
  }

  if (!subjectId || !targetClass) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-amber-800 bg-amber-50 rounded-xl font-medium"><i class="fa-solid fa-triangle-exclamation mr-1.5 text-amber-600"></i> कृपया प्रथम वरील 'निवडलेला विषय' (Subject / Class) निवडा. निवडलेल्या वर्गाचेच विद्यार्थी येथे दिसतील.</td></tr>`;
    updateTeacherGroupsStats();
    return;
  }

  // Preserve existing inputs if any
  const existingMap = {};
  if (preserveValues) {
    document.querySelectorAll('.casm-group-name-input').forEach(inp => {
      const prn = inp.getAttribute('data-prn');
      const isLeader = document.querySelector(`input[name="casm-group-role-${prn}"]:checked`)?.value === 'leader';
      const topic = document.querySelector(`.casm-group-topic-input[data-prn="${prn}"]`)?.value || '';
      if (prn) existingMap[prn] = { group: inp.value, is_leader: isLeader, topic: topic };
    });
  }

  tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Syncing student roster for ' + escapeHtml(targetClass) + '...</td></tr>';

  try {
    let url = `/api/teacher/roster?class_name=${encodeURIComponent(targetClass)}`;
    const res = await fetch(url);
    const data = await res.json();
    currentCreatedAsmRoster = data.roster || [];

    if (currentCreatedAsmRoster.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-slate-500 bg-amber-50 rounded-xl"><b>${escapeHtml(targetClass)}</b> या वर्गासाठी विद्यार्थी हजेरीपटात (Roster) अद्याप विद्यार्थी जोडलेले नाहीत. कृपया आधी 'Student Roster' मध्ये विद्यार्थी जोडा.</td></tr>`;
      updateTeacherGroupsStats();
      return;
    }

    tbody.innerHTML = '';
    currentCreatedAsmRoster.forEach(st => {
      const curObj = existingMap[st.prn] || { group: '', is_leader: false, topic: '' };
      tbody.innerHTML += `
        <tr class="hover:bg-emerald-50/40 transition" data-prn="${st.prn}">
          <td class="p-2.5 font-mono font-bold text-slate-700">${st.roll_number}</td>
          <td class="p-2.5 font-mono text-blue-900 font-bold">${st.prn}</td>
          <td class="p-2.5 font-semibold text-slate-900">${escapeHtml(st.student_name)} <span class="text-[10px] text-slate-400 block">${st.class_name}</span></td>
          <td class="p-2.5">
            <input type="text" data-prn="${st.prn}" value="${escapeHtml(curObj.group)}" oninput="updateTeacherGroupsStats()" placeholder="उदा. Group 1 / गट १" class="casm-group-name-input w-full rounded-xl border border-emerald-200 p-2 text-xs bg-white focus:border-emerald-500 font-bold text-emerald-950">
          </td>
          <td class="p-2.5 text-center">
            <div class="inline-flex items-center justify-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <label class="inline-flex items-center gap-1 cursor-pointer text-xs font-bold text-amber-900 px-2 py-1 rounded-lg hover:bg-amber-100/60 transition">
                <input type="radio" name="casm-group-role-${st.prn}" value="leader" ${curObj.is_leader ? 'checked' : ''} class="casm-group-role-radio w-3.5 h-3.5 text-amber-600 focus:ring-amber-500">
                <span>👑 प्रमुख</span>
              </label>
              <label class="inline-flex items-center gap-1 cursor-pointer text-xs font-semibold text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-200/60 transition">
                <input type="radio" name="casm-group-role-${st.prn}" value="member" ${!curObj.is_leader ? 'checked' : ''} class="casm-group-role-radio w-3.5 h-3.5 text-slate-600 focus:ring-slate-500">
                <span>👤 सदस्य</span>
              </label>
            </div>
          </td>
          <td class="p-2.5">
            <input type="text" data-prn="${st.prn}" value="${escapeHtml(curObj.topic)}" placeholder="गट प्रकल्प / असाइनमेंट विषय..." class="casm-group-topic-input w-full rounded-xl border border-emerald-200 p-2 text-xs bg-white focus:border-emerald-500 font-medium">
          </td>
        </tr>
      `;
    });
    updateTeacherGroupsStats();
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-red-500">Failed to load student roster for groups.</td></tr>';
  }
}

function autoGenerateTeacherGroups(mode = 'by_groups') {
  const inputs = document.querySelectorAll('.casm-group-name-input');
  if (inputs.length === 0) {
    showToast('No students loaded in roster. Please select subject first.', 'error');
    return;
  }

  const total = inputs.length;
  let numGroups = 4;

  if (mode === 'by_groups') {
    const val = parseInt(document.getElementById('auto-group-num-groups')?.value || '4');
    numGroups = Math.max(1, Math.min(val, total));
  } else if (mode === 'by_size') {
    const size = Math.max(1, parseInt(document.getElementById('auto-group-size')?.value || '4'));
    numGroups = Math.max(1, Math.ceil(total / size));
  }

  const seenLeaderGroup = new Set();

  inputs.forEach((inp, idx) => {
    const groupNum = (idx % numGroups) + 1;
    const gName = `Group ${groupNum}`;
    inp.value = gName;

    const prn = inp.getAttribute('data-prn');
    const leaderRadio = document.querySelector(`input[name="casm-group-role-${prn}"][value="leader"]`);
    const memberRadio = document.querySelector(`input[name="casm-group-role-${prn}"][value="member"]`);
    if (leaderRadio && memberRadio) {
      if (!seenLeaderGroup.has(gName)) {
        leaderRadio.checked = true;
        seenLeaderGroup.add(gName);
      } else {
        memberRadio.checked = true;
      }
    }
  });

  updateTeacherGroupsStats();
  showToast(`Created ${numGroups} groups for ${total} students successfully!`, 'success');
}

function setAllTeacherGroupRoles(role = 'member') {
  document.querySelectorAll(`.casm-group-role-radio[value="${role}"]`).forEach(r => r.checked = true);
  showToast(role === 'member' ? 'All students set as Members (सर्व सदस्य केले).' : 'All students set as Leaders.', 'info');
}

function autoAssignOneLeaderPerGroup() {
  const inputs = document.querySelectorAll('.casm-group-name-input');
  const seenLeaderGroup = new Set();
  let leaderCount = 0;

  inputs.forEach(inp => {
    const gName = inp.value.trim();
    const prn = inp.getAttribute('data-prn');
    const leaderRadio = document.querySelector(`input[name="casm-group-role-${prn}"][value="leader"]`);
    const memberRadio = document.querySelector(`input[name="casm-group-role-${prn}"][value="member"]`);
    
    if (gName && !seenLeaderGroup.has(gName)) {
      if (leaderRadio) leaderRadio.checked = true;
      seenLeaderGroup.add(gName);
      leaderCount++;
    } else {
      if (memberRadio) memberRadio.checked = true;
    }
  });

  showToast(`Assigned 1 Leader each for ${leaderCount} groups (प्रत्येक गटाला १ प्रमुख नियुक्त).`, 'success');
}

function addNewTeacherGroupCard() {
  const inputs = document.querySelectorAll('.casm-group-name-input');
  if (inputs.length === 0) {
    showToast('No students loaded in roster.', 'error');
    return;
  }

  const existingGroups = new Set();
  inputs.forEach(inp => {
    if (inp.value.trim()) existingGroups.add(inp.value.trim());
  });

  const nextNum = existingGroups.size + 1;
  const newGroupName = `Group ${nextNum}`;

  // Find first unassigned student and assign
  let assignedOne = false;
  for (let inp of inputs) {
    if (!inp.value.trim()) {
      inp.value = newGroupName;
      const prn = inp.getAttribute('data-prn');
      const leaderRadio = document.querySelector(`input[name="casm-group-role-${prn}"][value="leader"]`);
      if (leaderRadio) leaderRadio.checked = true;
      assignedOne = true;
      break;
    }
  }

  updateTeacherGroupsStats();
  if (assignedOne) {
    showToast(`Added ${newGroupName} and assigned first available student!`, 'success');
  } else {
    showToast(`Added ${newGroupName}. You can now type "${newGroupName}" for students in the table.`, 'info');
  }
}

function clearAllTeacherGroups() {
  document.querySelectorAll('.casm-group-name-input').forEach(inp => inp.value = '');
  document.querySelectorAll('.casm-group-role-radio[value="member"]').forEach(r => r.checked = true);
  document.querySelectorAll('.casm-group-topic-input').forEach(inp => inp.value = '');
  updateTeacherGroupsStats();
  showToast('Group allocations cleared.', 'info');
}

function updateTeacherGroupsStats() {
  const inputs = document.querySelectorAll('.casm-group-name-input');
  const groupMembersMap = {};
  let assignedCount = 0;

  inputs.forEach(inp => {
    const val = inp.value.trim();
    if (val) {
      assignedCount++;
      if (!groupMembersMap[val]) groupMembersMap[val] = 0;
      groupMembersMap[val]++;
    }
  });

  const groupCount = Object.keys(groupMembersMap).length;
  const totalStudents = inputs.length;

  const countBadge = document.getElementById('group-count-badge');
  const groupedSpan = document.getElementById('grouped-students-count');
  const totalSpan = document.getElementById('group-total-students-count');
  if (countBadge) countBadge.innerText = groupCount;
  if (groupedSpan) groupedSpan.innerText = assignedCount;
  if (totalSpan) totalSpan.innerText = totalStudents;

  // Render group preview badges
  const container = document.getElementById('teacher-formed-groups-container');
  if (container) {
    container.innerHTML = '';
    if (groupCount === 0) {
      container.innerHTML = '<span class="text-[11px] text-slate-400 italic">No groups formed yet. Use auto-group or type group names below.</span>';
    } else {
      Object.entries(groupMembersMap).forEach(([gName, count]) => {
        container.innerHTML += `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs">
            <i class="fa-solid fa-users text-emerald-700 text-[10px]"></i>
            <span>${escapeHtml(gName)}</span>
            <span class="px-1.5 py-0.2 bg-white text-emerald-800 rounded-md text-[10px] font-extrabold">${count}</span>
          </span>
        `;
      });
    }
  }
}

// Edit Modal Group Builder Functions
function toggleEditTeacherGroupBuilder() {
  const isChecked = document.getElementById('edit-casm-is-group')?.checked || false;
  const builder = document.getElementById('edit-teacher-group-assessment-builder');
  if (builder) {
    if (isChecked) builder.classList.remove('hidden');
    else builder.classList.add('hidden');
  }
}

function autoGenerateEditTeacherGroups(numGroups = 4) {
  const inputs = document.querySelectorAll('.edit-casm-group-name-input');
  if (inputs.length === 0) return;
  const total = inputs.length;
  numGroups = Math.max(1, Math.min(numGroups, total));
  const seenLeader = new Set();

  inputs.forEach((inp, idx) => {
    const groupNum = (idx % numGroups) + 1;
    const gName = `Group ${groupNum}`;
    inp.value = gName;
    const prn = inp.getAttribute('data-prn');
    const leaderRadio = document.querySelector(`input[name="edit-casm-group-role-${prn}"][value="leader"]`);
    const memberRadio = document.querySelector(`input[name="edit-casm-group-role-${prn}"][value="member"]`);
    if (leaderRadio && memberRadio) {
      if (!seenLeader.has(gName)) {
        leaderRadio.checked = true;
        seenLeader.add(gName);
      } else {
        memberRadio.checked = true;
      }
    }
  });
  showToast(`Divided into ${numGroups} groups in edit mode!`, 'success');
}

function setAllEditTeacherGroupRoles(role = 'member') {
  document.querySelectorAll(`.edit-casm-group-role-radio[value="${role}"]`).forEach(r => r.checked = true);
  showToast(role === 'member' ? 'All students set as Members.' : 'All students set as Leaders.', 'info');
}

function autoAssignOneEditLeaderPerGroup() {
  const inputs = document.querySelectorAll('.edit-casm-group-name-input');
  const seenLeaderGroup = new Set();
  let leaderCount = 0;

  inputs.forEach(inp => {
    const gName = inp.value.trim();
    const prn = inp.getAttribute('data-prn');
    const leaderRadio = document.querySelector(`input[name="edit-casm-group-role-${prn}"][value="leader"]`);
    const memberRadio = document.querySelector(`input[name="edit-casm-group-role-${prn}"][value="member"]`);
    
    if (gName && !seenLeaderGroup.has(gName)) {
      if (leaderRadio) leaderRadio.checked = true;
      seenLeaderGroup.add(gName);
      leaderCount++;
    } else {
      if (memberRadio) memberRadio.checked = true;
    }
  });

  showToast(`Assigned 1 Leader each for ${leaderCount} groups in edit mode!`, 'success');
}

function clearEditAllTeacherGroups() {
  document.querySelectorAll('.edit-casm-group-name-input').forEach(inp => inp.value = '');
  document.querySelectorAll('.edit-casm-group-role-radio[value="member"]').forEach(r => r.checked = true);
  document.querySelectorAll('.edit-casm-group-topic-input').forEach(inp => inp.value = '');
  showToast('Edit group allocations cleared.', 'info');
}

// View Allocated Student Groups Modal
async function viewAllocatedStudentGroupsModal(id) {
  const m = document.getElementById('modal-view-student-groups');
  if (!m) return;

  const titleEl = document.getElementById('view-sgroups-session-title');
  const topicEl = document.getElementById('view-sgroups-main-topic');
  const badgeEl = document.getElementById('view-sgroups-count-badge');
  const cardsContainer = document.getElementById('view-sgroups-cards-container');
  const tbody = document.getElementById('view-sgroups-tbody');

  tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading group details...</td></tr>';
  if (cardsContainer) cardsContainer.innerHTML = '';
  
  m.classList.remove('hidden');
  m.classList.add('open', 'flex');

  try {
    const res = await fetch(`/api/teacher/assessments/${id}`);
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to load assessment.', 'error');
      return;
    }
    const asm = data.assessment;
    if (titleEl) titleEl.innerText = `${asm.assessment_session_title} (${asm.assessment_code})`;
    if (topicEl) topicEl.innerText = `Main Topic: ${asm.assignment_topic}`;

    let sgroups = {};
    if (asm.student_groups_json) {
      try { sgroups = JSON.parse(asm.student_groups_json); } catch(e) {}
    }

    // Load class roster
    let rurl = `/api/teacher/roster?class_name=${encodeURIComponent(asm.class_name || '')}`;
    const rres = await fetch(rurl);
    const rdata = await rres.json();
    const rlist = rdata.roster || [];

    if (rlist.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400">No students found in class roster.</td></tr>';
      return;
    }

    const groupMap = {};
    tbody.innerHTML = '';
    let assignedCount = 0;

    rlist.forEach(st => {
      const gInfo = sgroups[st.prn] || sgroups[st.id] || null;
      let gName = '';
      let isLeader = false;
      let gTopic = '';

      if (typeof gInfo === 'object' && gInfo !== null) {
        gName = gInfo.group || '';
        isLeader = !!gInfo.is_leader;
        gTopic = gInfo.topic || '';
      } else if (gInfo) {
        gName = String(gInfo);
      }

      if (gName) {
        assignedCount++;
        if (!groupMap[gName]) groupMap[gName] = { leader: '', members: [], topic: gTopic };
        groupMap[gName].members.push(st);
        if (isLeader) groupMap[gName].leader = st.student_name;
        if (gTopic && !groupMap[gName].topic) groupMap[gName].topic = gTopic;
      }

      tbody.innerHTML += `
        <tr class="hover:bg-emerald-50/40 transition">
          <td class="p-2.5 font-mono font-bold text-slate-700">${st.roll_number}</td>
          <td class="p-2.5 font-mono text-blue-900 font-bold">${st.prn}</td>
          <td class="p-2.5 font-semibold text-slate-900">${escapeHtml(st.student_name)}</td>
          <td class="p-2.5 font-bold ${gName ? 'text-emerald-800' : 'text-slate-400'}">${gName ? `<span class="px-2 py-0.5 bg-emerald-100 rounded-md">${escapeHtml(gName)}</span>` : '—'}</td>
          <td class="p-2.5 text-center">${isLeader ? '<span class="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-extrabold text-[10px]">👑 Leader</span>' : '<span class="text-slate-400 text-[11px]">Member</span>'}</td>
          <td class="p-2.5 font-medium text-slate-700">${escapeHtml(gTopic || asm.assignment_topic)}</td>
        </tr>
      `;
    });

    const uniqueGroups = Object.keys(groupMap).length;
    if (badgeEl) badgeEl.innerText = `${uniqueGroups} Groups • ${assignedCount} / ${rlist.length} Students Assigned`;

    // Render group cards
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
      Object.entries(groupMap).forEach(([name, details]) => {
        const memberNames = details.members.map(m => m.student_name).join(', ');
        cardsContainer.innerHTML += `
          <div class="bg-gradient-to-br from-emerald-50/80 to-teal-50/40 p-3.5 rounded-xl border border-emerald-200 space-y-1.5 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                <i class="fa-solid fa-users text-emerald-700"></i> ${escapeHtml(name)}
              </span>
              <span class="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-md font-extrabold text-[10.5px]">${details.members.length} Members</span>
            </div>
            ${details.leader ? `<p class="text-[11px] text-amber-900 font-bold">👑 Leader: ${escapeHtml(details.leader)}</p>` : ''}
            ${details.topic ? `<p class="text-[11px] text-slate-700"><b>Topic:</b> ${escapeHtml(details.topic)}</p>` : ''}
            <p class="text-[10.5px] text-slate-500 line-clamp-2"><b>Members:</b> ${escapeHtml(memberNames)}</p>
          </div>
        `;
      });
    }

  } catch(e) {
    console.error('Error viewing groups modal:', e);
    tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-red-500">Failed to load group details.</td></tr>';
  }
}

function closeAllocatedStudentGroupsModal() {
  const m = document.getElementById('modal-view-student-groups');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('open', 'flex');
  }
}

function toggleEditTeacherIndividualTopics() {
  const isChecked = document.getElementById('edit-casm-is-individual-topics')?.checked || false;
  const builder = document.getElementById('edit-teacher-individual-topics-builder');
  if (builder) {
    if (isChecked) builder.classList.remove('hidden');
    else builder.classList.add('hidden');
  }
}

function applyEditDefaultTopicToAllBlank() {
  const mainTopic = document.getElementById('edit-casm-topic')?.value.trim();
  if (!mainTopic) {
    showToast('Please type main topic first.', 'error');
    return;
  }
  const inputs = document.querySelectorAll('.edit-casm-indiv-topic-input');
  inputs.forEach(inp => {
    if (!inp.value.trim()) inp.value = mainTopic;
  });
  showToast('Applied main topic to blank students.', 'info');
}

let currentTeacherMcqQuestions = [];

function toggleTeacherMcqBuilder() {
  const isChecked = document.getElementById('casm-is-mcq')?.checked || false;
  const builder = document.getElementById('teacher-mcq-builder');
  const statsBadge = document.getElementById('mcq-stats-badge');

  if (isChecked) {
    if (builder) builder.classList.remove('hidden');
    if (statsBadge) statsBadge.classList.remove('hidden');
    if (currentTeacherMcqQuestions.length === 0) {
      addTeacherMcqQuestion();
    }
  } else {
    if (builder) builder.classList.add('hidden');
    if (statsBadge) statsBadge.classList.add('hidden');
  }
  updateTeacherMcqStats();
}

function addTeacherMcqQuestion(qData) {
  currentTeacherMcqQuestions.push({
    question: qData?.question || '',
    options: qData?.options || ['', '', '', ''],
    correct_index: qData?.correct_index !== undefined ? qData.correct_index : 0,
    marks: qData?.marks || 1
  });
  renderTeacherMcqQuestionsList();
}

function removeTeacherMcqQuestion(idx) {
  currentTeacherMcqQuestions.splice(idx, 1);
  renderTeacherMcqQuestionsList();
}

function updateTeacherMcqQuestion(idx, field, value, optIdx) {
  if (!currentTeacherMcqQuestions[idx]) return;
  if (field === 'question') {
    currentTeacherMcqQuestions[idx].question = value;
  } else if (field === 'marks') {
    currentTeacherMcqQuestions[idx].marks = parseFloat(value) || 1;
  } else if (field === 'correct_index') {
    currentTeacherMcqQuestions[idx].correct_index = parseInt(value);
  } else if (field === 'option' && optIdx !== undefined) {
    currentTeacherMcqQuestions[idx].options[optIdx] = value;
  }
  updateTeacherMcqStats();
}

function updateTeacherMcqStats() {
  const totalQ = currentTeacherMcqQuestions.length;
  let totalMarks = 0;
  currentTeacherMcqQuestions.forEach(q => { totalMarks += (parseFloat(q.marks) || 1); });

  const qBadge = document.getElementById('mcq-total-q-count');
  const mBadge = document.getElementById('mcq-total-marks-count');
  if (qBadge) qBadge.innerText = totalQ;
  if (mBadge) mBadge.innerText = totalMarks;
}

function renderTeacherMcqQuestionsList() {
  const container = document.getElementById('teacher-mcq-questions-list');
  if (!container) return;
  container.innerHTML = '';

  if (currentTeacherMcqQuestions.length === 0) {
    container.innerHTML = `<div class="p-4 rounded-xl bg-purple-50 text-center text-purple-700 text-xs">No questions added yet. Click "+ Add Question" to begin.</div>`;
    updateTeacherMcqStats();
    return;
  }

  const optLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  currentTeacherMcqQuestions.forEach((q, qIdx) => {
    let optionsHtml = '';
    (q.options || ['', '', '', '']).forEach((optText, optIdx) => {
      const letter = optLetters[optIdx] || String(optIdx + 1);
      const isCorrect = (q.correct_index === optIdx);
      optionsHtml += `
        <div class="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border ${isCorrect ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200'}">
          <label class="flex items-center space-x-1 shrink-0 cursor-pointer font-bold text-xs ${isCorrect ? 'text-emerald-700' : 'text-slate-600'}" title="Mark as correct answer">
            <input type="radio" name="teacher_mcq_correct_${qIdx}" value="${optIdx}" ${isCorrect ? 'checked' : ''} onchange="updateTeacherMcqQuestion(${qIdx}, 'correct_index', ${optIdx}); renderTeacherMcqQuestionsList();" class="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer">
            <span>${letter})</span>
          </label>
          <input type="text" value="${escapeHtml(optText)}" placeholder="Option ${letter}" oninput="updateTeacherMcqQuestion(${qIdx}, 'option', this.value, ${optIdx})" class="w-full rounded-lg border border-slate-300 p-1.5 text-xs bg-white focus:bg-white focus:border-blue-500">
        </div>
      `;
    });

    container.innerHTML += `
      <div class="p-4 rounded-2xl bg-white border border-purple-200 shadow-xs space-y-3">
        <div class="flex items-center justify-between gap-2 border-b border-purple-100 pb-2">
          <div class="flex items-center space-x-2 flex-1">
            <span class="w-6 h-6 rounded-lg bg-purple-800 text-white font-bold flex items-center justify-center text-xs shrink-0">Q${qIdx + 1}</span>
            <input type="text" value="${escapeHtml(q.question)}" placeholder="Type question statement here (उदा. महाराष्ट्राची उपराजधानी कोणती?)" oninput="updateTeacherMcqQuestion(${qIdx}, 'question', this.value)" class="w-full rounded-xl border border-purple-300 p-2 text-xs font-bold text-slate-900 bg-white">
          </div>
          <div class="flex items-center space-x-2 shrink-0">
            <div class="flex items-center space-x-1">
              <span class="text-[11px] font-bold text-slate-500">Marks:</span>
              <input type="number" value="${q.marks || 1}" min="0.5" step="0.5" oninput="updateTeacherMcqQuestion(${qIdx}, 'marks', this.value)" class="w-12 text-center rounded-lg border border-purple-300 p-1 text-xs font-bold text-purple-900 bg-purple-50">
            </div>
            <button type="button" onclick="removeTeacherMcqQuestion(${qIdx})" class="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition" title="Delete Question">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${optionsHtml}
        </div>
      </div>
    `;
  });

  updateTeacherMcqStats();
}

function toggleMcqBulkBox() {
  const box = document.getElementById('mcq-bulk-box');
  if (box) box.classList.toggle('hidden');
}

function parseBulkMcqQuestions() {
  const rawText = document.getElementById('mcq-bulk-raw-text')?.value || '';
  if (!rawText.trim()) {
    showToast('Please paste MCQ questions in the text box.', 'error');
    return;
  }

  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  let parsedCount = 0;

  lines.forEach(line => {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length >= 3) {
      const questionText = parts[0];
      let options = [];
      let correctIdx = 0;

      if (parts.length >= 6) {
        options = [parts[1], parts[2], parts[3], parts[4]];
        const lastPart = parts[5].toUpperCase();
        if (['A', '1'].includes(lastPart)) correctIdx = 0;
        else if (['B', '2'].includes(lastPart)) correctIdx = 1;
        else if (['C', '3'].includes(lastPart)) correctIdx = 2;
        else if (['D', '4'].includes(lastPart)) correctIdx = 3;
      } else {
        options = parts.slice(1);
        while (options.length < 4) options.push('');
      }

      currentTeacherMcqQuestions.push({
        question: questionText,
        options: options,
        correct_index: correctIdx,
        marks: 1
      });
      parsedCount++;
    }
  });

  if (parsedCount > 0) {
    renderTeacherMcqQuestionsList();
    toggleMcqBulkBox();
    showToast(`Successfully added ${parsedCount} questions from pasted text!`, 'success');
  } else {
    showToast('Could not parse questions. Please check format (Question | Opt A | Opt B | Opt C | Opt D | Correct Opt)', 'error');
  }
}

async function handleCreateAssessmentSubmit(e) {
  e.preventDefault();
  const subjectId = parseInt(document.getElementById('casm-subject').value);
  const mappingId = parseInt(document.getElementById('casm-mapping').value);
  const title = document.getElementById('casm-title').value.trim();
  const topic = document.getElementById('casm-topic').value.trim();
  const deadline = document.getElementById('casm-deadline').value;
  const allowLate = document.getElementById('casm-allow-late').checked;
  const isGroup = document.getElementById('casm-is-group').checked;
  const isMcq = document.getElementById('casm-is-mcq')?.checked || false;
  const isIndividualTopics = document.getElementById('casm-is-individual-topics')?.checked || false;

  const studentTopicsMap = {};
  if (isIndividualTopics) {
    document.querySelectorAll('.casm-indiv-topic-input').forEach(inp => {
      const prn = inp.getAttribute('data-prn');
      const val = inp.value.trim();
      if (prn && val) studentTopicsMap[prn] = val;
    });
  }

  const studentGroupsMap = {};
  if (isGroup) {
    document.querySelectorAll('.casm-group-name-input').forEach(inp => {
      const prn = inp.getAttribute('data-prn');
      const gname = inp.value.trim();
      const isLeader = document.querySelector(`input[name="casm-group-role-${prn}"]:checked`)?.value === 'leader';
      const gtopic = document.querySelector(`.casm-group-topic-input[data-prn="${prn}"]`)?.value.trim() || '';
      if (prn && gname) {
        studentGroupsMap[prn] = {
          group: gname,
          is_leader: isLeader,
          topic: gtopic
        };
      }
    });
  }

  if (isMcq) {
    if (currentTeacherMcqQuestions.length === 0) {
      showToast('Please add at least 1 MCQ question for this examination.', 'error');
      return;
    }
    for (let i = 0; i < currentTeacherMcqQuestions.length; i++) {
      const q = currentTeacherMcqQuestions[i];
      if (!q.question.trim()) {
        showToast(`Please enter question text for Question ${i + 1}.`, 'error');
        return;
      }
      const validOpts = (q.options || []).filter(o => o.trim().length > 0);
      if (validOpts.length < 2) {
        showToast(`Question ${i + 1} must have at least 2 options.`, 'error');
        return;
      }
    }
  }

  const isStudyMaterials = document.getElementById('casm-is-study-materials')?.checked || false;
  const studyMaterialsList = [];
  if (isStudyMaterials) {
    document.querySelectorAll('.casm-study-material-row').forEach(row => {
      const type = row.querySelector('.casm-mat-type')?.value || 'notes';
      const title = row.querySelector('.casm-mat-title')?.value.trim() || '';
      const url = row.querySelector('.casm-mat-url')?.value.trim() || '';
      if (title && url) {
        studyMaterialsList.push({ type, title, url });
      }
    });
  }

  const targetScope = document.querySelector('input[name="casm_target_scope"]:checked')?.value || 'all';
  const targetStudentsList = (targetScope === 'selected') ? Array.from(selectedTargetStudentPrns) : [];

  if (targetScope === 'selected' && targetStudentsList.length === 0) {
    showToast('कृपया किमान १ विद्यार्थी निवडा (Please select at least 1 student for this elective assignment).', 'error');
    return;
  }

  const meetingUrl = document.getElementById('casm-meeting-url')?.value.trim() || '';
  const meetingTime = document.getElementById('casm-meeting-time')?.value.trim() || '';

  try {
    const res = await fetch('/api/teacher/create-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject_id: subjectId,
        assignment_mapping_id: mappingId,
        assessment_session_title: title,
        assignment_topic: topic,
        submission_deadline: deadline,
        allow_late: allowLate,
        is_group: isGroup,
        student_groups: studentGroupsMap,
        is_mcq: isMcq,
        mcq_questions: isMcq ? currentTeacherMcqQuestions : [],
        is_individual_topics: isIndividualTopics,
        student_topics: studentTopicsMap,
        target_students: targetStudentsList,
        study_materials: studyMaterialsList,
        meeting_url: meetingUrl,
        meeting_time: meetingTime,
        duration_minutes: parseInt(document.getElementById('casm-duration-minutes')?.value) || 0,
        show_marks_to_students: document.getElementById('casm-show-marks')?.checked ? 1 : 0
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to create assessment session.', 'error');
      return;
    }

    showToast('Assessment session created successfully!', 'success');
    document.getElementById('teacher-create-asm-form').reset();
    currentTeacherMcqQuestions = [];
    selectedTargetStudentPrns.clear();
    const allScopeRadio = document.querySelector('input[name="casm_target_scope"][value="all"]');
    if (allScopeRadio) allScopeRadio.checked = true;
    toggleTeacherTargetStudentsScope('all');
    toggleTeacherMcqBuilder();
    toggleTeacherIndividualTopics();
    toggleTeacherGroupBuilder();
    toggleTeacherMeetingSection();
    const matRows = document.getElementById('teacher-study-materials-rows');
    if (matRows) matRows.innerHTML = '';
    toggleTeacherStudyMaterialsBuilder();
    loadTeacherCreatedAssessments();
    loadTeacherDashboardStats();
  } catch (e) {
    showToast('Error creating session.', 'error');
  }
}

function toggleTeacherMeetingSection() {
  const isChecked = document.getElementById('casm-is-meeting')?.checked || false;
  const box = document.getElementById('casm-meeting-inputs');
  if (box) {
    if (isChecked) {
      box.classList.remove('hidden');
    } else {
      box.classList.add('hidden');
    }
  }
}

let editSelectedTargetStudentPrns = new Set();
let editCurrentTargetRoster = [];

function toggleEditTeacherTargetStudentsScope(scope) {
  const box = document.getElementById('edit-teacher-target-students-box');
  if (!box) return;
  if (scope === 'selected') {
    box.classList.remove('hidden');
    renderEditTargetStudentsList();
  } else {
    box.classList.add('hidden');
    editSelectedTargetStudentPrns.clear();
    updateEditTargetStudentsCount();
  }
}

function renderEditTargetStudentsList(filterQuery = '') {
  const container = document.getElementById('edit-target-students-list-container');
  if (!container) return;

  const query = (filterQuery || document.getElementById('edit-target-students-search')?.value || '').trim().toLowerCase();
  const list = editCurrentTargetRoster.filter(st => {
    if (!query) return true;
    const roll = String(st.roll_number || '').toLowerCase();
    const prn = String(st.prn || '').toLowerCase();
    const name = String(st.student_name || '').toLowerCase();
    return roll.includes(query) || prn.includes(query) || name.includes(query);
  });

  if (list.length === 0) {
    container.innerHTML = `<div class="p-2 text-center text-slate-400">विद्यार्थी आढळले नाहीत.</div>`;
    updateEditTargetStudentsCount();
    return;
  }

  container.innerHTML = '';
  list.forEach(st => {
    const prnStr = String(st.prn);
    const isChecked = editSelectedTargetStudentPrns.has(prnStr);
    const prnEscaped = escapeHtml(prnStr);
    const nameEscaped = escapeHtml(String(st.student_name));
    const rollEscaped = escapeHtml(String(st.roll_number || '—'));
    const classEscaped = escapeHtml(String(st.class_name || ''));

    container.innerHTML += `
      <label class="flex items-center justify-between p-1.5 rounded-lg hover:bg-blue-50/70 cursor-pointer transition select-none ${isChecked ? 'bg-blue-50/90 font-bold text-blue-950' : ''}">
        <div class="flex items-center space-x-2 min-w-0">
          <input type="checkbox" value="${prnEscaped}" ${isChecked ? 'checked' : ''} onchange="onEditTargetStudentCheckboxChange('${prnEscaped}', this.checked)" class="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer">
          <span class="w-6 text-center font-mono font-bold text-slate-600 text-[10px] shrink-0 bg-slate-100 rounded px-1">${rollEscaped}</span>
          <div class="truncate">
            <span class="text-slate-900 font-semibold text-xs">${nameEscaped}</span>
            <span class="text-[10px] text-blue-900 font-mono ml-1 opacity-80">(${prnEscaped})</span>
          </div>
        </div>
        <span class="text-[10px] text-slate-500 font-medium shrink-0 ml-1">${classEscaped}</span>
      </label>
    `;
  });

  updateEditTargetStudentsCount();
}

function onEditTargetStudentCheckboxChange(prn, isChecked) {
  if (isChecked) {
    editSelectedTargetStudentPrns.add(String(prn));
  } else {
    editSelectedTargetStudentPrns.delete(String(prn));
  }
  updateEditTargetStudentsCount();
}

function selectAllEditTargetStudents(shouldSelectAll) {
  const query = (document.getElementById('edit-target-students-search')?.value || '').trim().toLowerCase();
  const list = editCurrentTargetRoster.filter(st => {
    if (!query) return true;
    const roll = String(st.roll_number || '').toLowerCase();
    const prn = String(st.prn || '').toLowerCase();
    const name = String(st.student_name || '').toLowerCase();
    return roll.includes(query) || prn.includes(query) || name.includes(query);
  });

  list.forEach(st => {
    if (shouldSelectAll) {
      editSelectedTargetStudentPrns.add(String(st.prn));
    } else {
      editSelectedTargetStudentPrns.delete(String(st.prn));
    }
  });

  renderEditTargetStudentsList();
}

function filterEditTargetStudentsList(query) {
  renderEditTargetStudentsList(query);
}

function updateEditTargetStudentsCount() {
  const badge = document.getElementById('edit-target-students-selected-badge');
  if (badge) {
    const total = editCurrentTargetRoster.length;
    const count = editSelectedTargetStudentPrns.size;
    badge.innerText = `${count} / ${total} निवडले`;
    if (count > 0) {
      badge.className = 'px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10.5px]';
    } else {
      badge.className = 'px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10.5px]';
    }
  }
}

async function openEditAssessmentModal(id) {
  try {
    const res = await fetch(`/api/teacher/assessments/${id}`);
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Session not found.', 'error');
      return;
    }
    const asm = data.assessment;
    if (document.getElementById('edit-casm-id')) document.getElementById('edit-casm-id').value = asm.id;
    if (document.getElementById('edit-casm-title')) document.getElementById('edit-casm-title').value = asm.assessment_session_title || '';
    if (document.getElementById('edit-casm-topic')) document.getElementById('edit-casm-topic').value = asm.assignment_topic || '';
    if (document.getElementById('edit-casm-deadline')) document.getElementById('edit-casm-deadline').value = asm.submission_deadline || '';
    if (document.getElementById('edit-casm-status')) document.getElementById('edit-casm-status').value = asm.status || 'active';
    if (document.getElementById('edit-casm-allow-late')) document.getElementById('edit-casm-allow-late').checked = (asm.allow_late === 1);
    if (document.getElementById('edit-casm-show-marks')) document.getElementById('edit-casm-show-marks').checked = (asm.show_marks_to_students !== 0);
    if (document.getElementById('edit-casm-meeting-url')) document.getElementById('edit-casm-meeting-url').value = asm.meeting_url || '';
    if (document.getElementById('edit-casm-meeting-time')) document.getElementById('edit-casm-meeting-time').value = asm.meeting_time || '';
    if (document.getElementById('edit-casm-duration-minutes')) document.getElementById('edit-casm-duration-minutes').value = asm.duration_minutes || 0;
    
    // Target Students scope in edit modal
    editSelectedTargetStudentPrns.clear();
    let targetList = [];
    if (asm.target_students_json) {
      try { targetList = JSON.parse(asm.target_students_json); } catch(e) {}
    }
    if (Array.isArray(targetList) && targetList.length > 0) {
      targetList.forEach(p => editSelectedTargetStudentPrns.add(String(p)));
      const selRadio = document.querySelector('input[name="edit_casm_target_scope"][value="selected"]');
      if (selRadio) selRadio.checked = true;
      toggleEditTeacherTargetStudentsScope('selected');
    } else {
      const allRadio = document.querySelector('input[name="edit_casm_target_scope"][value="all"]');
      if (allRadio) allRadio.checked = true;
      toggleEditTeacherTargetStudentsScope('all');
    }

    const isGroup = (asm.is_group === 1);
    if (document.getElementById('edit-casm-is-group')) document.getElementById('edit-casm-is-group').checked = isGroup;
    toggleEditTeacherGroupBuilder();

    const isIndiv = (asm.is_individual_topics === 1);
    const indivCheck = document.getElementById('edit-casm-is-individual-topics');
    if (indivCheck) indivCheck.checked = isIndiv;
    toggleEditTeacherIndividualTopics();

    // Populate Study Materials
    let smatList = [];
    if (asm.study_materials_json) {
      try { smatList = JSON.parse(asm.study_materials_json); } catch(e) {}
    }
    const editMatCheck = document.getElementById('edit-casm-is-study-materials');
    if (editMatCheck) editMatCheck.checked = (smatList.length > 0);
    toggleEditTeacherStudyMaterialsBuilder();
    renderEditTeacherStudyMaterialRows(smatList);

    // Load roster and populate student topics, groups, and target students
    let stopics = {};
    if (asm.student_topics_json) {
      try { stopics = JSON.parse(asm.student_topics_json); } catch(e) {}
    }
    let sgroups = {};
    if (asm.student_groups_json) {
      try { sgroups = JSON.parse(asm.student_groups_json); } catch(e) {}
    }

    const editTbody = document.getElementById('edit-teacher-individual-topics-tbody');
    const editGroupTbody = document.getElementById('edit-teacher-group-assignment-tbody');

    if (editTbody || editGroupTbody || document.getElementById('edit-target-students-list-container')) {
      if (editTbody) editTbody.innerHTML = '<tr><td colspan="4" class="p-3 text-center text-slate-400">Loading roster...</td></tr>';
      if (editGroupTbody) editGroupTbody.innerHTML = '<tr><td colspan="6" class="p-3 text-center text-slate-400">Loading roster...</td></tr>';

      try {
        let rurl = `/api/teacher/roster?class_name=${encodeURIComponent(asm.class_name || '')}`;
        const rres = await fetch(rurl);
        const rdata = await rres.json();
        const rlist = rdata.roster || [];
        editCurrentTargetRoster = rlist;
        renderEditTargetStudentsList();

        if (rlist.length === 0) {
          if (editTbody) editTbody.innerHTML = '<tr><td colspan="4" class="p-3 text-center text-slate-400">No students in roster.</td></tr>';
          if (editGroupTbody) editGroupTbody.innerHTML = '<tr><td colspan="6" class="p-3 text-center text-slate-400">No students in roster.</td></tr>';
        } else {
          if (editTbody) {
            editTbody.innerHTML = '';
            rlist.forEach(st => {
              const curVal = stopics[st.prn] || stopics[st.id] || '';
              editTbody.innerHTML += `
                <tr class="hover:bg-indigo-50/40">
                  <td class="p-2 font-mono font-bold">${st.roll_number}</td>
                  <td class="p-2 font-mono text-blue-900 font-bold">${st.prn}</td>
                  <td class="p-2 font-semibold text-slate-900">${escapeHtml(st.student_name)}</td>
                  <td class="p-2">
                    <input type="text" data-prn="${st.prn}" value="${escapeHtml(curVal)}" placeholder="Topic..." class="edit-casm-indiv-topic-input w-full p-1.5 border border-indigo-200 rounded-lg text-xs">
                  </td>
                </tr>
              `;
            });
          }

          if (editGroupTbody) {
            editGroupTbody.innerHTML = '';
            rlist.forEach(st => {
              const gInfo = sgroups[st.prn] || sgroups[st.id] || null;
              let gName = '';
              let isLeader = false;
              let gTopic = '';
              if (typeof gInfo === 'object' && gInfo !== null) {
                gName = gInfo.group || '';
                isLeader = !!gInfo.is_leader;
                gTopic = gInfo.topic || '';
              } else if (gInfo) {
                gName = String(gInfo);
              }
              editGroupTbody.innerHTML += `
                <tr class="hover:bg-emerald-50/40">
                  <td class="p-2 font-mono font-bold">${st.roll_number}</td>
                  <td class="p-2 font-mono text-blue-900 font-bold">${st.prn}</td>
                  <td class="p-2 font-semibold text-slate-900">${escapeHtml(st.student_name)}</td>
                  <td class="p-2">
                    <input type="text" data-prn="${st.prn}" value="${escapeHtml(gName)}" placeholder="Group 1..." class="edit-casm-group-name-input w-full p-1 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-950">
                  </td>
                  <td class="p-2 text-center">
                    <div class="inline-flex items-center justify-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
                      <label class="inline-flex items-center gap-0.5 cursor-pointer text-[10.5px] font-bold text-amber-900 px-1 py-0.5 rounded hover:bg-amber-100/60">
                        <input type="radio" name="edit-casm-group-role-${st.prn}" value="leader" ${isLeader ? 'checked' : ''} class="edit-casm-group-role-radio w-3 h-3 text-amber-600">
                        <span>👑 प्रमुख</span>
                      </label>
                      <label class="inline-flex items-center gap-0.5 cursor-pointer text-[10.5px] font-semibold text-slate-700 px-1 py-0.5 rounded hover:bg-slate-200/60">
                        <input type="radio" name="edit-casm-group-role-${st.prn}" value="member" ${!isLeader ? 'checked' : ''} class="edit-casm-group-role-radio w-3 h-3 text-slate-600">
                        <span>👤 सदस्य</span>
                      </label>
                    </div>
                  </td>
                  <td class="p-2">
                    <input type="text" data-prn="${st.prn}" value="${escapeHtml(gTopic)}" placeholder="Topic..." class="edit-casm-group-topic-input w-full p-1 border border-emerald-300 rounded-lg text-xs">
                  </td>
                </tr>
              `;
            });
          }
        }
      } catch(e) {
        if (editTbody) editTbody.innerHTML = '<tr><td colspan="4" class="p-3 text-center text-red-500">Failed to load roster.</td></tr>';
        if (editGroupTbody) editGroupTbody.innerHTML = '<tr><td colspan="6" class="p-3 text-center text-red-500">Failed to load roster.</td></tr>';
      }
    }

    const m = document.getElementById('modal-edit-assessment');
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('open', 'flex');
    }
  } catch (e) {
    console.error('Error in openEditAssessmentModal:', e);
    showToast('Error loading session.', 'error');
  }
}

function closeEditAssessmentModal() {
  const m = document.getElementById('modal-edit-assessment');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('open', 'flex');
  }
}

async function handleEditAssessmentSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('edit-casm-id')?.value;
  if (!id) return;
  const isIndiv = document.getElementById('edit-casm-is-individual-topics')?.checked || false;
  const isGroup = document.getElementById('edit-casm-is-group')?.checked || false;

  const editTopicsMap = {};
  if (isIndiv) {
    document.querySelectorAll('.edit-casm-indiv-topic-input').forEach(inp => {
      const prn = inp.getAttribute('data-prn');
      if (prn) editTopicsMap[prn] = inp.value.trim();
    });
  }

  const editGroupsMap = {};
  if (isGroup) {
    document.querySelectorAll('.edit-casm-group-name-input').forEach(inp => {
      const prn = inp.getAttribute('data-prn');
      const gname = inp.value.trim();
      const isLeader = document.querySelector(`input[name="edit-casm-group-role-${prn}"]:checked`)?.value === 'leader';
      const gtopic = document.querySelector(`.edit-casm-group-topic-input[data-prn="${prn}"]`)?.value.trim() || '';
      if (prn && gname) {
        editGroupsMap[prn] = {
          group: gname,
          is_leader: isLeader,
          topic: gtopic
        };
      }
    });
  }

  const isEditMaterials = document.getElementById('edit-casm-is-study-materials')?.checked || false;
  const editMaterialsList = [];
  if (isEditMaterials) {
    document.querySelectorAll('.edit-casm-study-material-row').forEach(row => {
      const type = row.querySelector('.edit-casm-mat-type')?.value || 'notes';
      const title = row.querySelector('.edit-casm-mat-title')?.value.trim() || '';
      const url = row.querySelector('.edit-casm-mat-url')?.value.trim() || '';
      if (title && url) {
        editMaterialsList.push({ type, title, url });
      }
    });
  }

  const editTargetScope = document.querySelector('input[name="edit_casm_target_scope"]:checked')?.value || 'all';
  const editTargetStudentsList = (editTargetScope === 'selected') ? Array.from(editSelectedTargetStudentPrns) : [];

  const payload = {
    assessment_session_title: document.getElementById('edit-casm-title')?.value.trim() || '',
    assignment_topic: document.getElementById('edit-casm-topic')?.value.trim() || '',
    submission_deadline: document.getElementById('edit-casm-deadline')?.value || '',
    allow_late: document.getElementById('edit-casm-allow-late')?.checked || false,
    is_group: isGroup,
    status: document.getElementById('edit-casm-status')?.value || 'active',
    is_individual_topics: isIndiv,
    student_topics: editTopicsMap,
    student_groups: editGroupsMap,
    target_students: editTargetStudentsList,
    study_materials: editMaterialsList,
    meeting_url: document.getElementById('edit-casm-meeting-url')?.value.trim() || '',
    meeting_time: document.getElementById('edit-casm-meeting-time')?.value.trim() || '',
    duration_minutes: parseInt(document.getElementById('edit-casm-duration-minutes')?.value) || 0,
    show_marks_to_students: document.getElementById('edit-casm-show-marks')?.checked ? 1 : 0
  };

  try {
    const res = await fetch(`/api/teacher/assessments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to update session.', 'error');
      return;
    }

    showToast('Assessment session updated!', 'success');
    closeEditAssessmentModal();
    loadTeacherCreatedAssessments();
    loadTeacherDashboardStats();
  } catch (e) {
    console.error('Error in handleEditAssessmentSubmit:', e);
    showToast('Error updating session.', 'error');
  }
}

async function toggleAssessmentMarksVisibility(id) {
  try {
    const res = await fetch(`/api/teacher/assessments/${id}/toggle-marks-visibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to toggle marks visibility.', 'error');
      return;
    }
    showToast(data.message || 'Marks visibility updated.', 'success');
    loadTeacherCreatedAssessments();
  } catch (e) {
    console.error('Error in toggleAssessmentMarksVisibility:', e);
    showToast('Error updating marks visibility.', 'error');
  }
}

async function deleteCreatedAssessment(id) {
  if (!confirm('Are you sure you want to delete this assessment session? (हे असेसमेंट सत्र हटवायचे आहे का?)')) return;
  try {
    const res = await fetch(`/api/teacher/assessments/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || 'Assessment session deleted successfully.', 'success');
      loadTeacherCreatedAssessments();
      loadTeacherDashboardStats();
    } else {
      showToast(data.error || 'Failed to delete assessment session.', 'error');
    }
  } catch (e) {
    showToast('Network error while deleting assessment session.', 'error');
  }
}

async function viewAllocatedStudentTopicsModal(id) {
  const m = document.getElementById('modal-view-student-topics');
  if (!m) return;
  m.classList.remove('hidden');
  m.classList.add('open', 'flex');
  const tbody = document.getElementById('view-stopics-tbody');
  tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading student topic allocation...</td></tr>';

  try {
    const res = await fetch(`/api/teacher/assessments/${id}`);
    const data = await res.json();
    if (!res.ok) {
      tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500">Failed to load session details.</td></tr>';
      return;
    }
    const asm = data.assessment;
    if (document.getElementById('view-stopics-session-title')) {
      document.getElementById('view-stopics-session-title').innerText = `${asm.assessment_session_title} • ${asm.class_name} (${asm.course_name})`;
    }
    if (document.getElementById('view-stopics-main-topic')) {
      document.getElementById('view-stopics-main-topic').innerText = `मुख्य सामान्य विषय (Main Topic): ${asm.assignment_topic}`;
    }

    let stopics = {};
    if (asm.student_topics_json) {
      try { stopics = JSON.parse(asm.student_topics_json); } catch(e) {}
    }

    const rres = await fetch(`/api/teacher/roster?class_name=${encodeURIComponent(asm.class_name || '')}`);
    const rdata = await rres.json();
    const rlist = rdata.roster || [];

    if (rlist.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-slate-400">No students registered in this class roster.</td></tr>';
      return;
    }

    tbody.innerHTML = '';
    let assignedCount = 0;
    rlist.forEach(st => {
      const isCustom = Boolean(stopics[st.prn] || stopics[st.id]);
      const tval = stopics[st.prn] || stopics[st.id] || asm.assignment_topic;
      if (isCustom) assignedCount++;
      tbody.innerHTML += `
        <tr class="hover:bg-indigo-50/40 transition">
          <td class="p-2.5 font-mono font-bold">${st.roll_number}</td>
          <td class="p-2.5 font-mono text-blue-900 font-bold">${st.prn}</td>
          <td class="p-2.5 font-semibold text-slate-900">${escapeHtml(st.student_name)}</td>
          <td class="p-2.5">
            ${isCustom ? `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-100/90 text-indigo-950 font-bold border border-indigo-200 text-xs">
                <i class="fa-solid fa-bullseye text-indigo-600"></i> ${escapeHtml(tval)}
              </span>
            ` : `
              <span class="text-slate-600 font-medium">
                ${escapeHtml(tval)} <span class="text-[10px] text-slate-400 font-normal italic">(Default Topic)</span>
              </span>
            `}
          </td>
        </tr>
      `;
    });
    if (document.getElementById('view-stopics-count-badge')) {
      document.getElementById('view-stopics-count-badge').innerText = `🎯 ${assignedCount} / ${rlist.length} विद्यार्थ्याना स्वतंत्र विषय वाटप`;
    }
  } catch(e) {
    console.error('Error in viewAllocatedStudentTopicsModal:', e);
    tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500">Error loading student topics.</td></tr>';
  }
}

function closeAllocatedStudentTopicsModal() {
  const m = document.getElementById('modal-view-student-topics');
  if (m) {
    m.classList.add('hidden');
    m.classList.remove('open', 'flex');
  }
}

async function loadTeacherJoiningLink() {
  try {
    const res = await fetch('/api/teacher/invite-link');
    const data = await res.json();
    if (data.invite_url) {
      const urlEl = document.getElementById('t-invite-url-text');
      const qrEl = document.getElementById('t-invite-qr-img');
      if (urlEl) urlEl.innerText = data.invite_url;
      if (qrEl) qrEl.src = data.qr_url;
    }
  } catch (e) {}
}

function copyTeacherInviteUrl() {
  const urlEl = document.getElementById('t-invite-url-text');
  if (urlEl) {
    navigator.clipboard.writeText(urlEl.innerText);
    showToast('Student Invite Link copied to clipboard!', 'success');
  }
}

// ------------------- TAB 4: EVALUATION & MARKS MATRIX -------------------
async function loadTeacherSubmissions() {
  try {
    const lang = currentLanguage || 'en';
    const classFilter = Array.from(selectedSubsClasses).join(',');
    const url = classFilter ? `/api/teacher/submissions?class_name=${encodeURIComponent(classFilter)}` : '/api/teacher/submissions';
    const res = await fetch(url);
    const data = await res.json();
    const subs = data.submissions || [];
    const classes = data.classes || [...new Set(subs.map(s => s.class_name).filter(Boolean))];

    // Render interactive multi-class pills
    renderClassFilterPills('subs-class-pills', classes, selectedSubsClasses, () => loadTeacherSubmissions());

    const tbody = document.getElementById('teacher-submissions-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (subs.length === 0) {
      const emptyText = (lang === 'mr') ? 'कोणतेही सबमिशन उपलब्ध नाही.' : 'No student submissions received for the selected criteria.';
      tbody.innerHTML = `<tr><td colspan="10" class="p-6 text-center text-slate-400 bg-slate-50">${emptyText}</td></tr>`;
      return;
    }

    const pendingLabel = (lang === 'mr') ? 'अपूर्ण' : 'Pending';

    tbody.innerHTML = subs.map(s => {
      const displayMaxMarks = (s.maximum_marks !== null && s.maximum_marks !== undefined) ? s.maximum_marks : (s.assessment_max_marks || 20);
      const marksBadge = (s.marks_obtained !== null && s.marks_obtained !== undefined)
        ? `<strong class="text-emerald-700 font-mono text-sm">${s.marks_obtained}</strong> <span class="text-slate-500 font-normal">/ ${displayMaxMarks}</span>`
        : `<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">${pendingLabel}</span>`;

      return `
        <tr class="hover:bg-slate-50 transition">
          <td class="p-3 font-mono font-bold text-blue-900">${escapeHtml(s.submission_id || '')}</td>
          <td class="p-3 font-semibold text-slate-900">${escapeHtml(s.student_name || '')} <span class="text-[10px] text-slate-400 block font-normal">Roll: ${escapeHtml(s.roll_number || '')} | PRN: ${escapeHtml(s.prn || '')}</span></td>
          <td class="p-3 font-medium text-slate-700">${escapeHtml(s.class_name || 'N/A')}</td>
          <td class="p-3 font-medium text-slate-800">${escapeHtml(s.course_name || s.subject_name || '')}</td>
          <td class="p-3 font-bold text-indigo-900">${escapeHtml(s.assessment_type_name || '')}</td>
          <td class="p-3 text-slate-700 max-w-xs truncate" title="${escapeHtml(s.topic || '')}">${escapeHtml(s.topic || '')}</td>
          <td class="p-3 text-[11px] text-slate-500">${s.submitted_at ? escapeHtml(s.submitted_at.split(' ')[0]) : ''}</td>
          <td class="p-3">${marksBadge}</td>
          <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${s.status==='Assessed'?'bg-emerald-100 text-emerald-800':(s.status==='Reopened'?'bg-orange-100 text-orange-800':'bg-amber-100 text-amber-800')}">${escapeHtml(s.status || '')}</span></td>
          <td class="p-3 text-right whitespace-nowrap space-x-1.5">
            <button onclick="openTeacherGradingModal(${s.id})" class="btn-3d-blue px-3 py-1.5 text-white rounded-lg text-xs font-bold shadow-sm">
              <i class="fa-solid fa-pen-to-square mr-1"></i> Grade
            </button>
            <a href="/api/submissions/${s.id}/pdf?show_marks=1" target="_blank" class="btn-3d-glass px-2.5 py-1.5 text-slate-800 rounded-lg text-xs font-bold inline-flex items-center space-x-1" title="अधिकृत मूल्यांकन PDF पहा">
              <i class="fa-solid fa-file-pdf text-red-600"></i>
              <span>PDF</span>
            </a>
            <button onclick="deleteSubmissionRecord(${s.id})" class="btn-3d-glass px-2.5 py-1.5 text-rose-700 hover:text-rose-900 rounded-lg text-xs font-bold" title="Delete submission">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

  } catch (e) {
    console.error('Teacher subs error:', e);
  }
}

async function openTeacherGradingModal(subId) {
  try {
    const res = await fetch(`/api/submissions/${subId}`);
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to load submission details.', 'error');
      return;
    }
    const s = data.submission;

    document.getElementById('grade-hidden-sub-id').value = s.id;
    document.getElementById('grade-sub-id').innerText = s.submission_id;
    
    const statusBadge = document.getElementById('grade-badge-status');
    if (statusBadge) {
      statusBadge.innerText = s.status || 'Submitted';
    }

    const externalBtn = document.getElementById('grade-pdf-external-btn');
    if (externalBtn) {
      externalBtn.href = `/api/submissions/${s.id}/pdf?show_marks=1`;
    }

    const pdfIframe = document.getElementById('grade-pdf-iframe');
    if (pdfIframe) {
      pdfIframe.src = `/api/submissions/${s.id}/pdf?show_marks=1#toolbar=1&navpanes=0&scrollbar=1&view=FitH`;
    }

    document.getElementById('grade-stu-name').innerText = s.student_name;
    document.getElementById('grade-stu-prn').innerText = `PRN: ${s.prn} (Roll: ${s.roll_number})`;
    document.getElementById('grade-stu-class').innerText = `${s.class_name || 'N/A'} (${s.semester || 'Sem'}) • ${s.course_name || s.subject_name}`;
    document.getElementById('grade-stu-type').innerText = s.assessment_type_name;
    document.getElementById('grade-stu-topic').innerText = s.topic;
    document.getElementById('grade-typed-content').innerHTML = s.typed_content_html || '<p class="text-slate-400 italic">No online typed content provided.</p>';

    // Render dynamic data fields if present
    const dynBox = document.getElementById('grade-dynamic-fields-box');
    const dynContent = document.getElementById('grade-dynamic-fields-content');
    if (dynBox && dynContent) {
      const dynData = s.dynamic_data || {};
      const keys = Object.keys(dynData);
      if (keys.length > 0) {
        dynBox.classList.remove('hidden');
        dynContent.innerHTML = '';
        keys.forEach(k => {
          const val = dynData[k];
          dynContent.innerHTML += `
            <div class="p-2 bg-white rounded-lg border border-slate-200">
              <span class="text-[10px] uppercase font-bold text-slate-500 block">${k.replace(/_/g, ' ')}</span>
              <span class="font-medium text-slate-800">${val || '—'}</span>
            </div>
          `;
        });
      } else {
        dynBox.classList.add('hidden');
      }
    }

    // Render Cloud Submission Links & Live Meet Buttons
    const cloudBanner = document.getElementById('grade-cloud-links-banner');
    const cloudContainer = document.getElementById('grade-cloud-buttons-container');
    if (cloudBanner && cloudContainer) {
      cloudContainer.innerHTML = '';
      let hasCloudLinks = false;

      if (s.pdf_url && s.pdf_url.trim()) {
        hasCloudLinks = true;
        cloudContainer.innerHTML += `
          <a href="${escapeHtml(s.pdf_url.trim())}" target="_blank" rel="noopener" class="btn-3d-teal px-3 py-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <i class="fa-solid fa-file-pdf"></i>
            <span>Scanned Journal / Practical PDF (स्कॅन वही पहा)</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        `;
      }

      if (s.drive_url && s.drive_url.trim()) {
        hasCloudLinks = true;
        cloudContainer.innerHTML += `
          <a href="${escapeHtml(s.drive_url.trim())}" target="_blank" rel="noopener" class="btn-3d-amber px-3 py-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <i class="fa-brands fa-google-drive"></i>
            <span>Google Drive Submission (फाईल/प्रेझेंटेशन पहा)</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        `;
      }

      if (s.youtube_url && s.youtube_url.trim()) {
        hasCloudLinks = true;
        cloudContainer.innerHTML += `
          <a href="${escapeHtml(s.youtube_url.trim())}" target="_blank" rel="noopener" class="btn-3d-rose px-3 py-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <i class="fa-brands fa-youtube"></i>
            <span>YouTube Video (व्हिडिओ प्रेझेंटेशन पहा)</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        `;
      }

      if (s.meeting_url && s.meeting_url.trim()) {
        hasCloudLinks = true;
        cloudContainer.innerHTML += `
          <a href="${escapeHtml(s.meeting_url.trim())}" target="_blank" rel="noopener" class="btn-3d-emerald px-3 py-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <i class="fa-solid fa-video"></i>
            <span>Oral / Viva Meet Link (लाईव्ह मिटिंग)</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        `;
      }

      if (hasCloudLinks) {
        cloudBanner.classList.remove('hidden');
      } else {
        cloudBanner.classList.add('hidden');
      }
    }

    // Group details in grading modal
    const groupOptionBox = document.getElementById('grade-group-option-box');
    const groupNameEl = document.getElementById('grade-group-name');
    const groupBadgeEl = document.getElementById('grade-group-badge');
    const groupCheckEl = document.getElementById('grade-apply-to-group');

    if (s.group_code) {
      if (groupOptionBox) groupOptionBox.classList.remove('hidden');
      if (groupNameEl) groupNameEl.innerText = s.group_code;
      if (groupBadgeEl) groupBadgeEl.innerText = '👥 गट असाइनमेंट';
      if (groupCheckEl) groupCheckEl.checked = true;
    } else {
      if (groupOptionBox) groupOptionBox.classList.add('hidden');
    }

    document.getElementById('grade-marks-obtained').value = (s.marks_obtained !== null && s.marks_obtained !== undefined) ? s.marks_obtained : '';
    document.getElementById('grade-max-marks').value = (s.maximum_marks !== null && s.maximum_marks !== undefined) ? s.maximum_marks : (s.assessment_max_marks || 20);
    document.getElementById('grade-remarks').value = s.remarks || '';

    updateGradeCalculator();
    switchGradingPreviewTab('pdf');

    const m = document.getElementById('modal-teacher-grading');
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('open', 'flex');
    }
  } catch (e) {
    showToast('Failed to load submission details.', 'error');
  }
}

function switchGradingPreviewTab(mode) {
  const pdfTab = document.getElementById('grade-tab-pdf');
  const richTab = document.getElementById('grade-tab-rich');
  const btnPdf = document.getElementById('tab-btn-pdf-preview');
  const btnRich = document.getElementById('tab-btn-rich-preview');

  if (mode === 'pdf') {
    if (pdfTab) pdfTab.classList.remove('hidden');
    if (richTab) richTab.classList.add('hidden');
    if (btnPdf) {
      btnPdf.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-900 text-white shadow-sm flex items-center space-x-1.5";
    }
    if (btnRich) {
      btnRich.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 flex items-center space-x-1.5";
    }
  } else {
    if (pdfTab) pdfTab.classList.add('hidden');
    if (richTab) richTab.classList.remove('hidden');
    if (btnRich) {
      btnRich.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-900 text-white shadow-sm flex items-center space-x-1.5";
    }
    if (btnPdf) {
      btnPdf.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 flex items-center space-x-1.5";
    }
  }
}

function updateGradeCalculator() {
  const obtEl = document.getElementById('grade-marks-obtained');
  const maxEl = document.getElementById('grade-max-marks');
  const pctEl = document.getElementById('grade-score-pct');
  const badgeEl = document.getElementById('grade-score-badge');

  if (!obtEl || !maxEl) return;
  const obt = parseFloat(obtEl.value);
  const max = parseFloat(maxEl.value) || 20;

  if (isNaN(obt) || obt < 0) {
    if (pctEl) pctEl.innerText = '0%';
    if (badgeEl) {
      badgeEl.innerText = 'Enter Marks';
      badgeEl.className = 'px-2 py-0.5 rounded font-bold bg-slate-200 text-slate-700';
    }
    return;
  }

  const pct = Math.min(100, Math.round((obt / max) * 100));
  if (pctEl) pctEl.innerText = `${pct}% (${obt}/${max})`;

  if (badgeEl) {
    if (pct >= 75) {
      badgeEl.innerText = 'Distinction (उत्कृष्ट)';
      badgeEl.className = 'px-2 py-0.5 rounded font-bold bg-emerald-200 text-emerald-900';
    } else if (pct >= 60) {
      badgeEl.innerText = 'First Class (प्रथम श्रेणी)';
      badgeEl.className = 'px-2 py-0.5 rounded font-bold bg-blue-200 text-blue-900';
    } else if (pct >= 40) {
      badgeEl.innerText = 'Pass (उत्तीर्ण)';
      badgeEl.className = 'px-2 py-0.5 rounded font-bold bg-amber-200 text-amber-900';
    } else {
      badgeEl.innerText = 'Needs Improvement (सुधारणा आवश्यक)';
      badgeEl.className = 'px-2 py-0.5 rounded font-bold bg-rose-200 text-rose-900';
    }
  }
}

async function handleReopenCurrentSubmission() {
  const subId = parseInt(document.getElementById('grade-hidden-sub-id')?.value);
  if (!subId) return;

  const reason = prompt('Please enter the reason for reopening submission (विद्यार्थ्यास सबमिशन पुन्हा उघडून देण्याचे कारण):', 'Needs revision of content.');
  if (reason === null) return;

  try {
    const res = await fetch('/api/teacher/reopen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submission_id: subId, reason: reason })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to reopen submission.', 'error');
      return;
    }
    showToast('Submission reopened for student revision.', 'success');
    closeTeacherGradingModal();
    loadTeacherSubmissions();
    loadTeacherMatrix();
  } catch (e) {
    showToast('Error reopening submission.', 'error');
  }
}

function closeTeacherGradingModal() {
  const m = document.getElementById('modal-teacher-grading');
  if (m) {
    m.classList.remove('open', 'flex');
    m.classList.add('hidden');
  }
  const pdfIframe = document.getElementById('grade-pdf-iframe');
  if (pdfIframe) pdfIframe.src = '';
}

async function handleSaveTeacherGrade(e) {
  e.preventDefault();
  const subId = parseInt(document.getElementById('grade-hidden-sub-id').value);
  const marks = parseFloat(document.getElementById('grade-marks-obtained').value);
  const maxMarks = parseFloat(document.getElementById('grade-max-marks').value);
  const remarks = document.getElementById('grade-remarks').value;
  const applyToGroup = document.getElementById('grade-apply-to-group')?.checked ?? true;

  if (isNaN(marks)) {
    showToast('Please enter valid numerical marks.', 'error');
    return;
  }
  if (marks > maxMarks || marks < 0) {
    showToast(`Marks (${marks}) cannot exceed maximum (${maxMarks}) or be negative.`, 'error');
    return;
  }

  try {
    const res = await fetch('/api/teacher/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission_id: subId,
        marks_obtained: marks,
        maximum_marks: maxMarks,
        remarks: remarks,
        apply_to_group: applyToGroup
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Evaluation save failed.', 'error');
      return;
    }

    showToast('Confidential marks and evaluation saved successfully!', 'success');
    closeTeacherGradingModal();
    loadTeacherSubmissions();
    loadTeacherMatrix();
    loadTeacherDashboardStats();
  } catch (e) {
    showToast('Error saving marks.', 'error');
  }
}

async function deleteSubmissionRecord(id) {
  if (!confirm('Are you sure you want to delete this student submission record? (हे सबमिशन रेकॉर्ड हटवायचे आहे का?)')) return;
  try {
    const res = await fetch(`/api/teacher/submissions/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || 'Submission deleted successfully.', 'success');
      loadTeacherSubmissions();
      loadTeacherMatrix();
      loadTeacherDashboardStats();
    } else {
      showToast(data.error || 'Failed to delete submission.', 'error');
    }
  } catch (e) {
    showToast('Network error while deleting submission.', 'error');
  }
}

let selectedMatrixSubjectId = '';

function onMatrixSubjectFilterChange(val) {
  selectedMatrixSubjectId = val;
  if (val && window.teacherMatrixSubjects) {
    const sub = window.teacherMatrixSubjects.find(s => String(s.id) === String(val));
    if (sub && sub.class_name) {
      selectedMatrixClasses.clear();
      selectedMatrixClasses.add(sub.class_name);
    }
  }
  loadTeacherMatrix();
}

async function loadTeacherMatrix() {
  try {
    const lang = currentLanguage || 'en';
    const classFilter = Array.from(selectedMatrixClasses).join(',');
    const params = new URLSearchParams();
    if (classFilter) params.append('class_name', classFilter);
    if (selectedMatrixSubjectId) params.append('subject_id', selectedMatrixSubjectId);

    const url = `/api/teacher/matrix${params.toString() ? '?' + params.toString() : ''}`;
    const res = await fetch(url);
    const data = await res.json();
    const students = data.students || [];
    const columns = data.columns || [];
    const classes = data.classes || [];
    const subjects = data.subjects || [];
    const selectedSub = data.selected_subject;
    const totalMax = data.total_max || 0;

    window.teacherMatrixSubjects = subjects;

    // Synchronize active class pill with selected subject's class
    if (selectedSub && selectedSub.class_name && selectedMatrixSubjectId) {
      if (!selectedMatrixClasses.has(selectedSub.class_name) || selectedMatrixClasses.size !== 1) {
        selectedMatrixClasses.clear();
        selectedMatrixClasses.add(selectedSub.class_name);
      }
    }

    // Render interactive multi-class pills
    renderClassFilterPills('matrix-class-pills', classes, selectedMatrixClasses, () => {
      // If user clicks a different class pill, check if selected subject belongs to it; if not, reset subject dropdown
      if (selectedMatrixSubjectId && window.teacherMatrixSubjects) {
        const curSub = window.teacherMatrixSubjects.find(s => String(s.id) === String(selectedMatrixSubjectId));
        if (curSub && curSub.class_name && !selectedMatrixClasses.has(curSub.class_name)) {
          selectedMatrixSubjectId = '';
        }
      }
      loadTeacherMatrix();
    });

    // Populate Subject dropdown with Course Code and Course Name
    const subjSelect = document.getElementById('matrix-subject-filter');
    if (subjSelect && subjects.length > 0) {
      const curVal = selectedMatrixSubjectId;
      const allSubjText = (lang === 'mr') ? '-- सर्व विषय --' : '-- All Subjects --';
      subjSelect.innerHTML = `<option value="">${allSubjText}</option>`;
      subjects.forEach(s => {
        const isSel = (String(s.id) === String(curVal));
        const cCode = s.course_code ? `${s.course_code}: ` : '';
        const cName = s.course_name ? s.course_name : s.subject_name;
        const sName = (s.subject_name && s.subject_name !== cName) ? ` • ${s.subject_name}` : '';
        const cMarks = s.total_internal_max_marks || 20;
        const marksWord = (lang === 'mr') ? 'गुण' : 'Marks';
        const optLabel = `[${escapeHtml(s.class_name)}] ${escapeHtml(cCode)}${escapeHtml(cName)}${escapeHtml(sName)} (${cMarks} ${marksWord})`;
        subjSelect.innerHTML += `<option value="${s.id}" ${isSel ? 'selected' : ''}>${optLabel}</option>`;
      });
    }

    const container = document.getElementById('teacher-matrix-container');
    if (!container) return;

    const classWord = (lang === 'mr') ? 'वर्ग' : 'Class';
    const subjWord = (lang === 'mr') ? 'विषय' : 'Subject';
    const totInternalWord = (lang === 'mr') ? 'एकूण अंतर्गत गुण' : 'Total Internal Marks';
    const marksWord = (lang === 'mr') ? 'गुण' : 'Marks';

    if (students.length === 0) {
      const emptyBanner = selectedSub 
        ? `<div class="p-3 mb-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-xs text-blue-950 flex items-center justify-between flex-wrap gap-2"><span>📖 ${classWord}: <b class="text-indigo-900">${escapeHtml(selectedSub.class_name)}</b> • ${subjWord}: <b>${escapeHtml(selectedSub.subject_name)}</b> (${escapeHtml(selectedSub.course_code ? selectedSub.course_code + ' - ' : '')}${escapeHtml(selectedSub.course_name)})</span><span class="text-indigo-900 font-extrabold bg-blue-100 px-2 py-0.5 rounded">${totInternalWord}: ${totalMax} ${marksWord}</span></div>`
        : '';
      const noDataMsg = (lang === 'mr') 
        ? 'या निकषांसाठी कोणताही विद्यार्थी किंवा विषय गुणपत्रिका उपलब्ध नाही.'
        : 'No students or marksheet available for selected criteria.';
      container.innerHTML = `
        ${emptyBanner}
        <div class="p-6 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">${noDataMsg}</div>
      `;
      return;
    }

    let compHeaders = '';
    columns.forEach(c => {
      const cname = c.assessment_type_name || c.name;
      const cmax = c.max_marks || 20;
      compHeaders += `<th class="p-3 text-center border-l border-slate-200 bg-slate-100 font-bold text-slate-800">${escapeHtml(cname)}<br><span class="text-[10px] text-indigo-700 font-semibold">(${cmax} ${marksWord})</span></th>`;
    });

    let rowsHtml = '';
    students.forEach((st, idx) => {
      let cells = '';

      columns.forEach(c => {
        const cname = c.assessment_type_name || c.name;
        const scoreVal = (st.scores || {})[cname];

        if (typeof scoreVal === 'number') {
          cells += `
            <td class="p-3 text-center border-l border-slate-100 bg-emerald-50/20">
              <span class="px-2.5 py-1 rounded-lg font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs shadow-2xs">
                ${scoreVal}
              </span>
            </td>
          `;
        } else if (scoreVal === 'Submitted') {
          const subText = (lang === 'mr') ? 'जमा केले' : 'Submitted';
          cells += `
            <td class="p-3 text-center border-l border-slate-100">
              <span class="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 text-[10px] border border-amber-200">
                ${subText}
              </span>
            </td>
          `;
        } else {
          cells += `<td class="p-3 text-center text-slate-300 border-l border-slate-100 font-mono font-bold text-sm">—</td>`;
        }
      });

      const repWord = (lang === 'mr') ? 'रिपीटर' : 'Repeater';
      const repeaterBadge = st.is_repeater ? `<span class="ml-1 px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">${repWord}</span>` : '';
      
      const passText = (lang === 'mr') ? `उत्तीर्ण (${st.percentage}%)` : `PASS (${st.percentage}%)`;
      const failText = (lang === 'mr') ? `अनुत्तीर्ण (${st.percentage}%)` : `FAIL (${st.percentage}%)`;
      const pendText = (lang === 'mr') ? 'अपूर्ण' : 'Pending';

      const passBadge = st.percentage >= 40 
        ? `<span class="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800 text-[11px]">${passText}</span>` 
        : (st.total_obtained > 0 ? `<span class="px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 text-[11px]">${failText}</span>` : `<span class="px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-500 text-[11px]">${pendText}</span>`);

      rowsHtml += `
        <tr class="hover:bg-slate-50/80 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}">
          <td class="p-3 font-mono font-bold text-slate-900">${escapeHtml(st.roll_number || '—')}</td>
          <td class="p-3 font-mono font-bold text-blue-900">${escapeHtml(st.prn)}</td>
          <td class="p-3 font-semibold text-slate-900">${escapeHtml(st.student_name)} ${repeaterBadge}</td>
          <td class="p-3 font-medium text-slate-700 bg-slate-50/50">${escapeHtml(st.class_name || 'N/A')}</td>
          ${cells}
          <td class="p-3 text-center font-mono font-black text-blue-950 bg-blue-50/60 border-l border-blue-200 text-sm">
            ${st.total_obtained} / ${st.total_max || totalMax}
          </td>
          <td class="p-3 text-center border-l border-slate-200">
            ${passBadge}
          </td>
        </tr>
      `;
    });

    const subTitleHeader = selectedSub 
      ? `<div class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-t-xl font-bold text-xs text-blue-950 flex items-center justify-between flex-wrap gap-2"><span>📖 ${classWord}: <b class="text-indigo-900">${escapeHtml(selectedSub.class_name)}</b> • ${subjWord}: <b>${escapeHtml(selectedSub.subject_name)}</b> (${escapeHtml(selectedSub.course_code ? selectedSub.course_code + ': ' : '')}${escapeHtml(selectedSub.course_name)})</span><span class="text-indigo-900 font-extrabold bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs">${totInternalWord}: ${totalMax} ${marksWord}</span></div>`
      : '';

    const thRoll = (lang === 'mr') ? 'हजेरी क्र.' : 'Roll No';
    const thPrn = 'PRN';
    const thName = (lang === 'mr') ? 'विद्यार्थ्याचे नाव' : 'Student Name';
    const thClass = (lang === 'mr') ? 'वर्ग' : 'Class';
    const thTotal = (lang === 'mr') ? 'एकूण गुण' : 'Cumulative Total';
    const thResult = (lang === 'mr') ? 'निकाल / श्रेणी' : 'Result / Grade';

    container.innerHTML = `
      ${subTitleHeader}
      <div class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table class="w-full text-left text-xs bg-white">
          <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">${thRoll}</th>
              <th class="p-3">${thPrn}</th>
              <th class="p-3">${thName}</th>
              <th class="p-3">${thClass}</th>
              ${compHeaders}
              <th class="p-3 text-center bg-blue-100/80 text-blue-950 border-l border-blue-200 font-black">${thTotal}</th>
              <th class="p-3 text-center bg-slate-100 border-l border-slate-200">${thResult}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-600">
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;

  } catch (e) {
    console.error('Matrix error:', e);
  }
}

function exportTeacherMatrixCsv() {
  const classFilter = Array.from(selectedMatrixClasses).join(',');
  const params = new URLSearchParams();
  if (classFilter) params.append('class_name', classFilter);
  if (selectedMatrixSubjectId) params.append('subject_id', selectedMatrixSubjectId);

  const url = `/api/teacher/export-matrix-csv${params.toString() ? '?' + params.toString() : ''}`;
  window.open(url, '_blank');
}

function downloadSelectedCourseArchiveZip(explicitSubjectId = null) {
  let subjectId = explicitSubjectId;
  if (!subjectId) {
    if (selectedMatrixSubjectId) subjectId = selectedMatrixSubjectId;
    else if (document.getElementById('matrix-subject-filter')?.value) subjectId = document.getElementById('matrix-subject-filter').value;
    else if (document.getElementById('casm-subject')?.value) subjectId = document.getElementById('casm-subject').value;
  }

  if (!subjectId) {
    showToast(currentLanguage === 'mr' ? 'कृपया आधी विषय (Subject / Course) निवडा, ज्याचे संपूर्ण सेमिस्टर ZIP डाउनलोड करायचे आहे.' : 'Please select a Subject / Course first to export the Semester ZIP Archive.', 'info');
    return;
  }

  showToast(currentLanguage === 'mr' ? '📦 संपूर्ण सेमिस्टर ZIP संचिका तयार होत आहे (Consolidated CSV + अधिकृत PDFs)...' : '📦 Creating comprehensive Semester ZIP Archive (Consolidated CSV + Verified PDFs)...', 'info');
  const url = `/api/teacher/courses/${subjectId}/export-archive-zip`;
  window.open(url, '_blank');
}

// =========================================================================
// FEATURE 1: AUTO-SAVE DRAFT PROTECTION (EVERY 10S VIA LOCALSTORAGE)
// FEATURE 5: LIVE COUNTDOWN QUIZ TIMER & AUTO-SUBMIT
// =========================================================================
let currentActiveSolverAsmId = null;
let autoDraftSaveTimerInterval = null;
let studentQuizCountdownTimerInterval = null;

function triggerAutoDraftSave() {
  if (!studentQuill || !verifiedStudentData?.student?.prn || !currentActiveSolverAsmId) return;
  const content = studentQuill.root.innerHTML;
  if (!content || content === '<p><br></p>') return;

  const key = `ciems_draft_${verifiedStudentData.student.prn}_${currentActiveSolverAsmId}`;
  try {
    localStorage.setItem(key, content);
  } catch(e) {}

  const badgeText = document.getElementById('stu-draft-status-text');
  if (badgeText) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    badgeText.innerText = currentLanguage === 'mr' ? `मसुदा सुरक्षित (${timeStr})` : `Draft Saved (${timeStr})`;
  }
}

function initAutoSaveDraftForSolver(asmId) {
  currentActiveSolverAsmId = asmId;
  if (autoDraftSaveTimerInterval) clearInterval(autoDraftSaveTimerInterval);
  autoDraftSaveTimerInterval = setInterval(triggerAutoDraftSave, 10000); // every 10 seconds

  // Restore draft if exists
  if (verifiedStudentData?.student?.prn && studentQuill) {
    const key = `ciems_draft_${verifiedStudentData.student.prn}_${asmId}`;
    let savedDraft = null;
    try {
      savedDraft = localStorage.getItem(key);
    } catch(e) {}
    const curContent = studentQuill.root.innerHTML;
    if (savedDraft && (!curContent || curContent === '<p><br></p>')) {
      studentQuill.root.innerHTML = savedDraft;
      const badgeText = document.getElementById('stu-draft-status-text');
      if (badgeText) {
        badgeText.innerText = currentLanguage === 'mr' ? 'मागील मसुदा पुनर्प्राप्त (Draft Restored)' : 'Draft Restored';
      }
      showToast(currentLanguage === 'mr' ? '💾 तुमचा मागील सेव्ह केलेला मसुदा आपोआप सुरक्षित पुनर्प्राप्त केला आहे.' : '💾 Your unsaved draft was automatically restored.', 'success');
    }
  }
}

function startQuizCountdownTimer(durationMinutes) {
  if (studentQuizCountdownTimerInterval) {
    clearInterval(studentQuizCountdownTimerInterval);
    studentQuizCountdownTimerInterval = null;
  }
  const timerBar = document.getElementById('stu-countdown-timer-bar');
  const clockEl = document.getElementById('stu-timer-clock');

  if (!durationMinutes || durationMinutes <= 0) {
    if (timerBar) timerBar.classList.add('hidden');
    return;
  }

  if (timerBar) timerBar.classList.remove('hidden');

  let remainingSeconds = durationMinutes * 60;
  
  function updateClock() {
    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    if (clockEl) {
      clockEl.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    if (remainingSeconds <= 0) {
      clearInterval(studentQuizCountdownTimerInterval);
      studentQuizCountdownTimerInterval = null;
      if (clockEl) clockEl.innerText = '00:00';
      showToast(currentLanguage === 'mr' ? '⏳ चाचणीची वेळ संपली आहे! तुमचे उत्तर आपोआप सबमिट होत आहे...' : '⏳ Time is up! Automatically submitting your assessment...', 'warning');
      setTimeout(() => {
        const form = document.getElementById('student-submission-form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }, 800);
    }
    remainingSeconds--;
  }

  updateClock();
  studentQuizCountdownTimerInterval = setInterval(updateClock, 1000);
}

// =========================================================================
// FEATURE 4: BILINGUAL SPEECH-TO-TEXT VOICE TYPING (MARATHI mr-IN & ENGLISH en-IN)
// =========================================================================
let voiceRecognitionInstance = null;
let isVoiceTypingActive = false;
let shouldRestartVoice = false;

function changeVoiceLanguage(lang) {
  const langSelect = document.getElementById('voice-typing-lang');
  if (langSelect && lang) {
    langSelect.value = lang;
  }
  if (isVoiceTypingActive && voiceRecognitionInstance) {
    shouldRestartVoice = true;
    try { voiceRecognitionInstance.stop(); } catch(e) {}
  }
}

function updateVoiceUI(active, statusText = '') {
  const btn = document.getElementById('btn-voice-typing');
  const label = document.getElementById('voice-typing-label');
  const banner = document.getElementById('stu-voice-live-banner');
  const bannerStatus = document.getElementById('stu-voice-live-status');
  const langSelect = document.getElementById('voice-typing-lang');
  const lang = langSelect?.value || (currentLanguage === 'mr' ? 'mr-IN' : 'en-IN');
  const isMarathi = lang.startsWith('mr');

  if (active) {
    if (btn) btn.classList.add('animate-pulse', 'ring-4', 'ring-red-400', 'bg-red-600', 'text-white');
    if (label) label.innerText = isMarathi ? '🎙️ ऐकत आहे...' : '🎙️ Listening...';
    if (banner) banner.classList.remove('hidden');
    if (bannerStatus) {
      bannerStatus.innerText = isMarathi 
        ? '🎙️ मराठी व्हॉईस टायपिंग सुरू आहे... (मराठीत बोला)' 
        : '🎙️ English Voice Typing Active... (Speak clearly in English)';
    }
  } else {
    if (btn) btn.classList.remove('animate-pulse', 'ring-4', 'ring-red-400', 'bg-red-600', 'text-white');
    if (label) label.innerText = currentLanguage === 'mr' ? 'व्हॉईस टायपिंग (Voice)' : 'Voice Typing';
    if (banner) banner.classList.add('hidden');
    const interimEl = document.getElementById('stu-voice-interim-text');
    if (interimEl) interimEl.innerText = isMarathi ? 'माइकवर स्पष्ट बोला, तुमचे बोलणे येथे टाईप होत आहे...' : 'Speak into microphone, words appear here...';
  }
}

async function toggleVoiceTyping() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('आपल्या ब्राउझरमध्ये व्हॉईस टायपिंग उपलब्ध नाही. कृपया Google Chrome किंवा Microsoft Edge वापरा.', 'error');
    return;
  }

  const langSelect = document.getElementById('voice-typing-lang');

  if (isVoiceTypingActive) {
    isVoiceTypingActive = false;
    shouldRestartVoice = false;
    if (voiceRecognitionInstance) {
      try { voiceRecognitionInstance.stop(); } catch(e) {}
    }
    updateVoiceUI(false);
    showToast(currentLanguage === 'mr' ? 'व्हॉईस टायपिंग थांबवले.' : 'Voice typing stopped.', 'info');
    return;
  }

  // Request microphone permission if needed
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (permErr) {
      console.warn('Microphone permission warning:', permErr);
      if (permErr.name === 'NotAllowedError' || permErr.name === 'PermissionDeniedError') {
        showToast('मायक्रोफोन परवानगी नाकारली आहे. कृपया ॲड्रेस बारमधील कुलूप (Lock) आयकॉनवर क्लिक करून Microphone "Allow" करा.', 'error');
        return;
      }
    }
  }

  try {
    voiceRecognitionInstance = new SpeechRecognition();
    voiceRecognitionInstance.continuous = true;
    voiceRecognitionInstance.interimResults = true;
    voiceRecognitionInstance.maxAlternatives = 1;
    
    const selectedLang = langSelect?.value || (currentLanguage === 'mr' ? 'mr-IN' : 'en-IN');
    voiceRecognitionInstance.lang = selectedLang;

    voiceRecognitionInstance.onstart = function() {
      isVoiceTypingActive = true;
      updateVoiceUI(true);
      showToast(selectedLang.startsWith('mr') 
        ? 'माइक सुरू झाला! आता मराठीत स्पष्ट बोला, तुमचे शब्द आपोआप टाईप होतील.' 
        : 'Microphone active! Speak clearly, speech will type automatically.', 'success');
    };

    voiceRecognitionInstance.onresult = function(event) {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const interimEl = document.getElementById('stu-voice-interim-text');
      if (interimEl && (interimTranscript || finalTranscript)) {
        interimEl.innerText = interimTranscript || finalTranscript;
      }

      if (finalTranscript && studentQuill) {
        const range = studentQuill.getSelection() || { index: studentQuill.getLength() };
        const cleanText = finalTranscript.trim();
        if (cleanText) {
          studentQuill.insertText(range.index, (range.index > 0 ? ' ' : '') + cleanText + ' ');
          studentQuill.setSelection(range.index + cleanText.length + 2);
          triggerAutoDraftSave();
        }
        if (interimEl) {
          setTimeout(() => {
            if (isVoiceTypingActive && interimEl) {
              interimEl.innerText = selectedLang.startsWith('mr') 
                ? 'माइकवर स्पष्ट बोला, तुमचे बोलणे येथे टाईप होत आहे...' 
                : 'Listening... speak into your microphone...';
            }
          }, 1000);
        }
      }
    };

    voiceRecognitionInstance.onerror = function(event) {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        // Normal silence timeout; keep listening if user hasn't explicitly stopped
        return;
      }
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        isVoiceTypingActive = false;
        shouldRestartVoice = false;
        updateVoiceUI(false);
        showToast('मायक्रोफोन ब्लॉक केला आहे. कृपया ब्राऊझर URL बारमधील Lock आयकॉनवर क्लिक करून Microphone Allow करा.', 'error');
        return;
      }
      if (event.error === 'audio-capture') {
        isVoiceTypingActive = false;
        shouldRestartVoice = false;
        updateVoiceUI(false);
        showToast('मायक्रोफोन जोडलेला नाही किंवा काम करत नाही.', 'error');
        return;
      }
      if (event.error === 'network') {
        showToast('व्हॉईस टायपिंगसाठी सक्रिय इंटरनेट कनेक्शन आवश्यक आहे.', 'error');
      }
    };

    voiceRecognitionInstance.onend = function() {
      if (isVoiceTypingActive || shouldRestartVoice) {
        shouldRestartVoice = false;
        try {
          const newLang = langSelect?.value || (currentLanguage === 'mr' ? 'mr-IN' : 'en-IN');
          voiceRecognitionInstance.lang = newLang;
          voiceRecognitionInstance.start();
        } catch (e) {
          console.warn('Auto-restart speech recognition caught:', e);
        }
      } else {
        updateVoiceUI(false);
      }
    };

    isVoiceTypingActive = true;
    voiceRecognitionInstance.start();
  } catch (err) {
    console.error('Failed to start voice recognition:', err);
    isVoiceTypingActive = false;
    updateVoiceUI(false);
    showToast('व्हॉईस टायपिंग सुरू करता आले नाही. कृपया गुगल क्रोम वापरा व माइक तपासा.', 'error');
  }
}

// =========================================================================
// 4. ADMIN PORTAL (APPROVALS, EDIT & DELETE TEACHERS)
// =========================================================================
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function fillAdminDemo(u, p) {
  const uEl = document.getElementById('admin-login-user') || document.getElementById('login-admin-user');
  const pEl = document.getElementById('admin-login-pass') || document.getElementById('login-admin-pass');
  if (uEl) uEl.value = u;
  if (pEl) pEl.value = p;
}

async function handleAdminLogin(e) {
  if (e) e.preventDefault();
  const form = (e && e.target) ? e.target : null;
  let username = '';
  let password = '';

  if (form) {
    const uEl = form.querySelector('[name="username"]') || form.querySelector('#admin-login-user') || form.querySelector('#login-admin-user');
    const pEl = form.querySelector('[name="password"]') || form.querySelector('#admin-login-pass') || form.querySelector('#login-admin-pass');
    if (uEl) username = uEl.value.trim();
    if (pEl) password = pEl.value.trim();
  }

  if (!username) {
    username = document.getElementById('admin-login-user')?.value.trim() || document.getElementById('login-admin-user')?.value.trim() || '';
  }
  if (!password) {
    password = document.getElementById('admin-login-pass')?.value.trim() || document.getElementById('login-admin-pass')?.value.trim() || '';
  }

  if (!username || !password) {
    showToast('Please enter admin username and password.', 'error');
    return;
  }

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      showToast(data.error || 'Admin login failed.', 'error');
      return;
    }

    currentAdmin = data.admin;
    try { localStorage.setItem('ciems_admin_session', JSON.stringify(data.admin)); } catch(e) {}
    invalidateAdminCache();
    document.getElementById('admin-login-box')?.classList.add('hidden');
    document.getElementById('admin-dashboard-view')?.classList.remove('hidden');
    showAdminSection('admin-overview');
    await checkAuthStates();
    await loadAdminDashboardStats(true);
    await loadAdminTeachers(true);
    navigateTo('admin-portal');
    showToast('Welcome, Administrator!', 'success');
  } catch (err) {
    console.error('Admin login error:', err);
    showToast('Error during admin login.', 'error');
  }
}

async function handleAdminLogout() {
  try {
    await fetch('/api/admin/logout', { method: 'POST' });
  } catch (e) {}
  currentAdmin = null;
  invalidateAdminCache();
  await checkAuthStates();
  navigateTo('landing');
}

// Admin Client-Side In-Memory Cache
let _adminStatsCache = null;
let _adminStatsCacheTime = 0;
let _adminTeachersCache = {};
let _adminFacultySearchCache = {};
let _adminAnnouncementsCache = null;

function invalidateAdminCache() {
  _adminStatsCache = null;
  _adminStatsCacheTime = 0;
  _adminTeachersCache = {};
  _adminFacultySearchCache = {};
  _adminAnnouncementsCache = null;
}

function showAdminSection(secName) {
  document.querySelectorAll('.a-sub-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.a-btn-nav').forEach(b => b.classList.remove('active'));

  const target = document.getElementById('a-sec-' + secName);
  if (target) {
    target.classList.add('active');
  }

  const activeBtn = document.querySelector(`.a-btn-nav[data-sec="${secName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  try {
    if (secName === 'admin-overview') {
      loadAdminDashboardStats(false);
    } else if (secName === 'admin-pending' || secName === 'admin-approved') {
      loadAdminTeachers(false);
    } else if (secName === 'admin-faculty-search') {
      loadAdminFacultySearch(false);
    } else if (secName === 'admin-course-cie-mapping') {
      loadAdminMasterMappingData();
    } else if (secName === 'admin-announcements') {
      loadAdminAnnouncements(false);
    }
  } catch (e) {
    console.error('Admin section loader error:', e);
  }
}

async function loadAdminDashboardStats(forceRefresh = false) {
  if (!forceRefresh && _adminStatsCache && (Date.now() - _adminStatsCacheTime < 60000)) {
    renderAdminDashboardStats(_adminStatsCache);
    return;
  }
  try {
    const url = forceRefresh ? '/api/admin/dashboard-stats?force=1' : '/api/admin/dashboard-stats';
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success) return;

    _adminStatsCache = data;
    _adminStatsCacheTime = Date.now();
    renderAdminDashboardStats(data);
  } catch (e) {
    console.error('Error loading admin dashboard stats:', e);
  }
}

function renderAdminDashboardStats(data) {
  try {
    const s = data.stats || {};
    if (document.getElementById('a-stat-teachers')) document.getElementById('a-stat-teachers').innerText = s.approved_teachers ?? 0;
    if (document.getElementById('a-stat-pending')) document.getElementById('a-stat-pending').innerText = s.pending_teachers ?? 0;
    if (document.getElementById('a-stat-students')) document.getElementById('a-stat-students').innerText = s.total_students ?? 0;
    if (document.getElementById('a-stat-assessments')) document.getElementById('a-stat-assessments').innerText = s.total_assessments ?? 0;
    if (document.getElementById('a-stat-submissions')) document.getElementById('a-stat-submissions').innerText = s.total_submissions ?? 0;
    if (document.getElementById('a-stat-courses')) document.getElementById('a-stat-courses').innerText = s.total_courses ?? 0;

  if (document.getElementById('admin-pending-nav-badge')) {
    document.getElementById('admin-pending-nav-badge').innerText = s.pending_teachers || 0;
  }
  if (document.getElementById('admin-approved-nav-badge')) {
    document.getElementById('admin-approved-nav-badge').innerText = s.approved_teachers || 0;
  }

  // Stream Breakdown Cards
  const streamGrid = document.getElementById('a-stream-cards-grid');
  if (streamGrid) {
    const streams = data.stream_breakdown || [];
    window._adminStreamBreakdown = streams;

    if (streams.length === 0) {
      streamGrid.innerHTML = '<p class="text-slate-400 text-xs col-span-4 py-2">No faculty stream records yet.</p>';
    } else {
      streamGrid.innerHTML = streams.map(st => {
        const streamName = (currentLanguage === 'mr') ? (st.name_mr || st.faculty_stream) : (st.name_en || st.stream_key);
        const facultyLbl = (currentLanguage === 'mr') ? 'प्राध्यापक' : 'Faculty';
        const studentsLbl = (currentLanguage === 'mr') ? 'विद्यार्थी' : 'Students';
        const coursesLbl = (currentLanguage === 'mr') ? 'विषय' : 'Courses';
        const gradient = st.gradient || 'from-purple-50 to-indigo-50/60';
        const border = st.border || 'border-purple-200';
        const textColor = st.text_color || 'text-purple-950';
        const iconColor = st.icon_color || 'text-purple-600';
        const badgeBg = st.badge_bg || 'bg-purple-100';
        const badgeText = st.badge_text || 'text-purple-800';
        const icon = st.icon || 'fa-graduation-cap';

        return `
          <div onclick="showStreamSubjectSummary('${escapeHtml(st.stream_key)}')" class="bg-gradient-to-br ${gradient} border ${border} rounded-2xl p-4 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition hover:-translate-y-0.5 cursor-pointer group w-full min-h-[145px] h-full">
            <div class="flex items-center justify-between w-full gap-2">
              <span class="text-xs font-bold ${textColor} leading-snug group-hover:underline">${escapeHtml(streamName)}</span>
              <span class="w-8 h-8 rounded-xl ${badgeBg} ${iconColor} flex items-center justify-center text-xs shrink-0 shadow-2xs">
                <i class="fa-solid ${icon}"></i>
              </span>
            </div>
            <div class="mt-3 flex items-baseline justify-between w-full">
              <div>
                <span class="text-2xl font-black ${textColor} font-mono">${st.teacher_count || 0}</span>
                <span class="text-[11px] ${iconColor} font-bold ml-1">${facultyLbl}</span>
              </div>
              <span class="text-[10px] font-bold ${badgeBg} ${badgeText} px-2.5 py-0.5 rounded-full shadow-2xs">
                ${st.students_count || 0} ${studentsLbl}
              </span>
            </div>
            <div class="mt-2.5 pt-2 border-t ${border}/60 flex items-center justify-between text-[10.5px] text-slate-500 font-medium w-full">
              <span>${st.courses_count || 0} ${coursesLbl}</span>
              <span class="text-slate-500 group-hover:${textColor} group-hover:font-bold transition flex items-center gap-1">
                <span>${currentLanguage === 'mr' ? 'विषय यादी पहा' : 'Subject Summary'}</span>
                <i class="fa-solid fa-chevron-down text-[9px]"></i>
              </span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Recent Teachers Table
  const rTbody = document.getElementById('a-recent-teachers-tbody');
  if (rTbody) {
    const recent = data.recent_teachers || [];
    if (recent.length === 0) {
      rTbody.innerHTML = '<tr><td colspan="5" class="p-3 text-center text-slate-400">No teacher registrations recorded yet.</td></tr>';
    } else {
      rTbody.innerHTML = recent.map(t => {
        const isPend = (t.status === 'pending');
        return `
          <tr class="hover:bg-slate-50 transition">
            <td class="p-2.5 font-mono font-bold text-slate-800">${escapeHtml(t.teacher_code)}</td>
            <td class="p-2.5 font-semibold text-slate-900">${escapeHtml(t.name)}</td>
            <td class="p-2.5 text-slate-600 truncate max-w-[150px]">${escapeHtml(t.college_name || '')}</td>
            <td class="p-2.5 text-slate-600">${escapeHtml(t.faculty_stream || '')} (${escapeHtml(t.subject_name || '')})</td>
            <td class="p-2.5 text-center">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isPend ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                ${isPend ? 'Pending' : 'Approved'}
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
  } catch(e) {
    console.error('renderAdminDashboardStats error:', e);
  }
}

function showStreamSubjectSummary(streamKey) {
  const container = document.getElementById('a-stream-subject-summary-container');
  if (!container) return;

  const streams = window._adminStreamBreakdown || [];
  const st = streams.find(s => s.stream_key === streamKey);
  if (!st) return;

  const streamName = (currentLanguage === 'mr') ? (st.name_mr || st.faculty_stream) : (st.name_en || st.stream_key);
  const subjects = st.subjects || [];

  let subjectsHtml = '';
  if (subjects.length === 0) {
    subjectsHtml = `<tr><td colspan="5" class="p-4 text-center text-slate-400">No registered subjects found in this faculty stream.</td></tr>`;
  } else {
    subjects.forEach((sub, idx) => {
      subjectsHtml += `
        <tr class="hover:bg-white transition border-b border-slate-100">
          <td class="p-2.5 font-bold text-slate-500 font-mono w-10 text-center">${idx + 1}</td>
          <td class="p-2.5">
            <span class="font-bold text-slate-900 text-xs">${escapeHtml(sub.subject_name)}</span>
          </td>
          <td class="p-2.5 text-center">
            <span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">${sub.teacher_count || 0}</span>
          </td>
          <td class="p-2.5 text-center">
            <span class="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs">${sub.courses_count || 0}</span>
          </td>
          <td class="p-2.5 text-center">
            <span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">${sub.students_count || 0}</span>
          </td>
        </tr>
      `;
    });
  }

  container.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-200 pb-3">
      <div class="flex items-center space-x-2.5">
        <span class="w-8 h-8 rounded-xl ${st.badge_bg || 'bg-purple-100'} ${st.icon_color || 'text-purple-600'} flex items-center justify-center text-sm shadow-xs">
          <i class="fa-solid ${st.icon || 'fa-graduation-cap'}"></i>
        </span>
        <div>
          <h4 class="text-xs sm:text-sm font-extrabold text-slate-900">${escapeHtml(streamName)}: ${currentLanguage === 'mr' ? 'विषयनिहाय सारांश व यादी' : 'Subject Summary & Directory'}</h4>
          <p class="text-[11px] text-slate-500">${st.teacher_count || 0} ${currentLanguage === 'mr' ? 'प्राध्यापक' : 'Faculty'} • ${st.courses_count || 0} ${currentLanguage === 'mr' ? 'विषय' : 'Courses'} • ${st.students_count || 0} ${currentLanguage === 'mr' ? 'विद्यार्थी' : 'Students'}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" onclick="filterAdminFacultyByStream('${escapeHtml(st.stream_key)}')" class="btn-3d-blue px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center gap-1 shadow-xs">
          <i class="fa-solid fa-users"></i>
          <span>${currentLanguage === 'mr' ? 'या विद्याशाखेचे शिक्षक पहा' : 'View Faculty'}</span>
        </button>
        <button type="button" onclick="closeStreamSubjectSummary()" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 text-sm">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
          <tr>
            <th class="p-2.5 text-center w-10">#</th>
            <th class="p-2.5">${currentLanguage === 'mr' ? 'विषयाचे नाव (Subject Name)' : 'Subject Name'}</th>
            <th class="p-2.5 text-center">${currentLanguage === 'mr' ? 'प्राध्यापक संख्या' : 'Faculty Count'}</th>
            <th class="p-2.5 text-center">${currentLanguage === 'mr' ? 'कोर्सेस (CIE Mappings)' : 'Course Masters'}</th>
            <th class="p-2.5 text-center">${currentLanguage === 'mr' ? 'विद्यार्थी' : 'Students'}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-600">
          ${subjectsHtml}
        </tbody>
      </table>
    </div>
  `;

  container.classList.remove('hidden');
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeStreamSubjectSummary() {
  const container = document.getElementById('a-stream-subject-summary-container');
  if (container) {
    container.classList.add('hidden');
  }
}

window._adminApprovalFilter = 'all';

function filterAdminApprovals(filterType) {
  window._adminApprovalFilter = filterType || 'all';
  
  // Update Tab Styling
  const btnAll = document.getElementById('tab-appr-all');
  const btnNew = document.getElementById('tab-appr-new');
  const btnUpd = document.getElementById('tab-appr-update');

  const activeCls = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-700 text-white shadow-xs';
  const inactCls = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300';

  if (btnAll) btnAll.className = (filterType === 'all') ? activeCls : inactCls;
  if (btnNew) btnNew.className = (filterType === 'new') ? activeCls : inactCls;
  if (btnUpd) btnUpd.className = (filterType === 'update') ? activeCls : inactCls;

  loadAdminTeachers();
}

function toggleSelectAllApprovals(checked) {
  const checkboxes = document.querySelectorAll('.approval-row-chk');
  checkboxes.forEach(cb => {
    cb.checked = checked;
  });
}

function getSelectedApprovalIds() {
  const checkboxes = document.querySelectorAll('.approval-row-chk:checked');
  return Array.from(checkboxes).map(cb => parseInt(cb.dataset.id, 10)).filter(Boolean);
}

async function handleBulkApproveApprovals() {
  const ids = getSelectedApprovalIds();
  if (ids.length === 0) {
    showToast(currentLanguage === 'mr' ? 'कृपया मंजूर करण्यासाठी किमान एक शिक्षक निवडा.' : 'Please select at least one teacher to approve.', 'warning');
    return;
  }

  const bulkDays = document.getElementById('bulk-validity-days')?.value;
  const validityDays = bulkDays ? parseInt(bulkDays, 10) : 365;

  if (!confirm(`Are you sure you want to approve ${ids.length} selected teacher requests for ${validityDays} days? (निवडलेले ${ids.length} शिक्षक अर्ज ${validityDays} दिवसांच्या मुदतीसह मंजूर करायचे का?)`)) {
    return;
  }

  const btn = document.getElementById('btn-bulk-approve');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Approving...';
  }

  try {
    const res = await fetch('/api/admin/teachers/bulk-approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacher_ids: ids, validity_days: validityDays })
    });
    let data = {};
    try {
      data = await res.json();
    } catch (parseErr) {
      data = { error: `Server error (${res.status}).` };
    }
    if (res.ok && data.success) {
      showToast(data.message || `Successfully approved ${data.approved_count} teachers.`, 'success');
      const selectAll = document.getElementById('select-all-approvals');
      if (selectAll) selectAll.checked = false;
      invalidateAdminCache();
      await loadAdminTeachers(true);
      await loadAdminDashboardStats(true);
    } else {
      showToast(data.error || 'Failed to bulk approve teachers.', 'error');
    }
  } catch (e) {
    console.error('Bulk approve error:', e);
    showToast(currentLanguage === 'mr' ? 'एकत्रित मंजूर करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' : 'Error during bulk approval. Please try again.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

async function handleBulkDeleteApprovals() {
  const ids = getSelectedApprovalIds();
  if (ids.length === 0) {
    showToast(currentLanguage === 'mr' ? 'कृपया हटवण्यासाठी किमान एक शिक्षक निवडा.' : 'Please select at least one teacher to delete.', 'warning');
    return;
  }

  if (!confirm(`Are you sure you want to permanently delete ${ids.length} selected teacher requests? (निवडलेले ${ids.length} शिक्षक अर्ज कायमचे हटवायचे का?)`)) {
    return;
  }

  const btn = document.getElementById('btn-bulk-delete');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Deleting...';
  }

  try {
    const res = await fetch('/api/admin/teachers/bulk-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacher_ids: ids })
    });
    let data = {};
    try {
      data = await res.json();
    } catch (parseErr) {
      data = { error: `Server error (${res.status}).` };
    }
    if (res.ok && data.success) {
      showToast(data.message || `Successfully deleted ${data.deleted_count} teachers.`, 'success');
      const selectAll = document.getElementById('select-all-approvals');
      if (selectAll) selectAll.checked = false;
      invalidateAdminCache();
      await loadAdminTeachers(true);
      await loadAdminDashboardStats(true);
    } else {
      showToast(data.error || 'Failed to bulk delete teachers.', 'error');
    }
  } catch (e) {
    console.error('Bulk delete error:', e);
    showToast(currentLanguage === 'mr' ? 'एकत्रित हटवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' : 'Error during bulk delete. Please try again.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

function updateSelectAllApprovedState() {
  const all = document.querySelectorAll('.approved-row-chk');
  const checked = document.querySelectorAll('.approved-row-chk:checked');
  const selectAll = document.getElementById('select-all-approved');
  if (selectAll) {
    selectAll.checked = all.length > 0 && all.length === checked.length;
    selectAll.indeterminate = checked.length > 0 && checked.length < all.length;
  }
}

function toggleSelectAllApproved(isChecked) {
  const checkboxes = document.querySelectorAll('.approved-row-chk');
  checkboxes.forEach(cb => {
    cb.checked = isChecked;
  });
  const selectAll = document.getElementById('select-all-approved');
  if (selectAll) {
    selectAll.indeterminate = false;
  }
}

async function handleBulkDeleteApproved() {
  const checked = document.querySelectorAll('.approved-row-chk:checked');
  const ids = Array.from(checked).map(cb => parseInt(cb.dataset.id || cb.getAttribute('data-id') || '', 10)).filter(id => !isNaN(id) && id > 0);

  if (ids.length === 0) {
    showToast(currentLanguage === 'mr' ? 'हटवण्यासाठी किमान एक मंजूर शिक्षक निवडा.' : 'Please select at least one approved faculty record to delete.', 'warning');
    return;
  }

  const confirmMsg = (currentLanguage === 'mr')
    ? `तुम्हाला निवडलेले ${ids.length} मंजूर शिक्षक खाते आणि त्या संबंधित सर्व CIE डेटा कायमचे हटवायचे आहेत का? (Are you sure you want to permanently delete ${ids.length} selected approved faculty accounts?)`
    : `Are you sure you want to permanently delete ${ids.length} selected approved faculty accounts and all their related CIE data?`;

  if (!confirm(confirmMsg)) {
    return;
  }

  const btn = document.getElementById('btn-bulk-delete-approved');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Deleting...';
  }

  try {
    const res = await fetch('/api/admin/teachers/bulk-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacher_ids: ids })
    });
    let data = {};
    try {
      data = await res.json();
    } catch (parseErr) {
      data = { error: `Server error (${res.status}).` };
    }
    if (res.ok && data.success) {
      showToast(data.message || `Successfully deleted ${data.deleted_count} teachers.`, 'success');
      const selectAll = document.getElementById('select-all-approved');
      if (selectAll) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
      }
      invalidateAdminCache();
      await loadAdminTeachers(true);
      await loadAdminDashboardStats(true);
      if (typeof loadAdminFacultySearch === 'function') {
        loadAdminFacultySearch(true);
      }
    } else {
      showToast(data.error || 'Failed to bulk delete teachers.', 'error');
    }
  } catch (e) {
    console.error('Bulk delete approved error:', e);
    showToast(currentLanguage === 'mr' ? 'एकत्रित हटवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.' : 'Error during bulk delete. Please try again.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}
window.handleBulkDeleteApproved = handleBulkDeleteApproved;
window.toggleSelectAllApproved = toggleSelectAllApproved;
window.updateSelectAllApprovedState = updateSelectAllApprovedState;

async function loadAdminTeachers(forceRefresh = false) {
  const filterType = window._adminApprovalFilter || 'all';
  if (!forceRefresh && _adminTeachersCache[filterType]) {
    renderAdminTeachers(_adminTeachersCache[filterType]);
    return;
  }
  try {
    const res = await fetch(`/api/admin/teachers?filter_type=${encodeURIComponent(filterType)}&_t=${Date.now()}`);
    const data = await res.json();
    _adminTeachersCache[filterType] = data;
    renderAdminTeachers(data);
  } catch (e) {
    console.error('Admin teachers error:', e);
  }
}

function renderAdminTeachers(data) {
  const all = data.teachers || [];
  const pending = data.pending_teachers || all.filter(t => t.status === 'pending');
  const approved = data.approved_teachers || all.filter(t => t.status !== 'pending');

  if (document.getElementById('admin-pending-badge')) {
    document.getElementById('admin-pending-badge').innerText = `${pending.length} Pending`;
  }
  if (document.getElementById('admin-approved-badge')) {
    document.getElementById('admin-approved-badge').innerText = `${approved.length} Teachers`;
  }
  if (document.getElementById('admin-pending-nav-badge')) {
    document.getElementById('admin-pending-nav-badge').innerText = `${pending.length}`;
  }
  if (document.getElementById('admin-approved-nav-badge')) {
    document.getElementById('admin-approved-nav-badge').innerText = `${approved.length}`;
  }

  const selectAllApproved = document.getElementById('select-all-approved');
  if (selectAllApproved) {
    selectAllApproved.checked = false;
    selectAllApproved.indeterminate = false;
  }
  const selectAllApprovals = document.getElementById('select-all-approvals');
  if (selectAllApprovals) {
    selectAllApprovals.checked = false;
    selectAllApprovals.indeterminate = false;
  }

  const pTbody = document.getElementById('admin-pending-tbody');
  if (pTbody) {
    pTbody.innerHTML = '';
    if (pending.length === 0) {
      pTbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400">No pending teacher approval requests found for this filter.</td></tr>`;
    } else {
      const lang = currentLanguage || 'en';
      const valLabel = lang === 'mr' ? 'मुदत (दिवसांमध्ये):' : 'Validity in Days:';
      const opt365 = lang === 'mr' ? '३६५ दिवस (१ वर्ष)' : '365 Days (1 Year)';
      const opt180 = lang === 'mr' ? '१८० दिवस (६ महिने)' : '180 Days (6 Months)';
      const opt90 = lang === 'mr' ? '९० दिवस (३ महिने)' : '90 Days (3 Months)';
      const opt60 = lang === 'mr' ? '६० दिवस (२ महिने)' : '60 Days (2 Months)';
      const opt30 = lang === 'mr' ? '३० दिवस (१ महिना)' : '30 Days (1 Month)';
      const opt730 = lang === 'mr' ? '७३० दिवस (२ वर्षे)' : '730 Days (2 Years)';

      pTbody.innerHTML = pending.map(t => {
        const isUpdate = (t.approval_type === 'UPDATE' || t.extension_requested);
        const typeBadge = isUpdate
          ? `<span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">🔄 ${lang === 'mr' ? 'मुदतवाढ' : 'RENEWAL'}</span>`
          : `<span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">✨ ${lang === 'mr' ? 'नवीन' : 'NEW'}</span>`;

        const validityText = (t.validity_start && t.validity_end)
          ? `${t.validity_start} – ${t.validity_end}`
          : (t.academic_year || (lang === 'mr' ? '१ शैक्षणिक वर्ष' : '1 Academic Year'));

        return `
          <tr class="hover:bg-amber-50/40 transition">
            <td class="p-3 text-center">
              <input type="checkbox" class="approval-row-chk rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer" data-id="${t.id}" onchange="updateSelectAllApprovalsState()">
            </td>
            <td class="p-3">
              <div class="mb-1">${typeBadge}</div>
              <div class="font-mono font-bold text-amber-900">${escapeHtml(t.teacher_code)}</div>
              <div class="text-[10px] text-slate-400 font-normal">${escapeHtml(t.created_at || '')}</div>
            </td>
            <td class="p-3 font-bold text-slate-900">${escapeHtml(t.name)}<br><span class="text-[10px] text-slate-500 font-normal">${escapeHtml(t.designation || '')}</span></td>
            <td class="p-3">${escapeHtml(t.college_name || '')}<br><span class="text-[10px] text-slate-400">${escapeHtml(t.university_name || '')}</span></td>
            <td class="p-3 font-medium text-blue-900">${escapeHtml(formatBilingualText(t.faculty_stream || '', lang))}<br><span class="text-[11px] text-slate-600">${escapeHtml(formatBilingualText(t.subject_name || '', lang))}</span></td>
            <td class="p-3">
              <div class="font-semibold text-slate-800 text-xs mb-1">${escapeHtml(validityText)}</div>
              ${isUpdate && t.extension_requested_year ? `<div class="text-[10px] text-emerald-700 font-bold mb-1">Req: ${escapeHtml(t.extension_requested_year)}</div>` : ''}
              <div class="mt-1 flex flex-col space-y-1">
                <label class="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <i class="fa-regular fa-clock text-purple-600"></i>
                  <span>${valLabel}</span>
                </label>
                <select id="admin-val-days-${t.id}" class="text-[11px] font-bold text-purple-950 bg-white border border-purple-300 rounded-lg px-2 py-1 shadow-2xs focus:ring-1 focus:ring-purple-500 focus:outline-none">
                  <option value="365" selected>${opt365}</option>
                  <option value="180">${opt180}</option>
                  <option value="90">${opt90}</option>
                  <option value="60">${opt60}</option>
                  <option value="30">${opt30}</option>
                  <option value="730">${opt730}</option>
                </select>
              </div>
            </td>
            <td class="p-3 text-[11px] font-mono text-slate-500">${escapeHtml(t.mobile || '')}<br>${escapeHtml(t.email || '')}</td>
            <td class="p-3 text-right whitespace-nowrap space-x-1">
              <button onclick="handleAdminApproveTeacher(${t.id})" class="btn-3d-emerald px-3 py-1.5 text-white rounded-lg text-xs font-bold shadow-xs">
                <i class="fa-solid fa-check mr-1"></i> Approve
              </button>
              <button onclick="handleAdminRejectTeacher(${t.id})" class="btn-3d-glass px-2.5 py-1.5 text-red-700 rounded-lg text-xs font-bold">
                <i class="fa-solid fa-xmark mr-1"></i> Reject
              </button>
              <button onclick="deleteAdminTeacher(${t.id})" class="btn-3d-glass px-2 py-1.5 text-slate-500 hover:text-red-700 rounded-lg text-xs" title="Delete">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  const aTbody = document.getElementById('admin-teachers-tbody');
  if (aTbody) {
    if (approved.length === 0) {
      aTbody.innerHTML = `<tr><td colspan="9" class="p-4 text-center text-slate-400">No approved faculty members yet.</td></tr>`;
    } else {
      aTbody.innerHTML = approved.map(t => {
        const plainPwd = t.temp_plain_password || 'faculty123';
        const pwdId = `pwd-val-${t.id}`;
        return `
          <tr class="hover:bg-slate-50 transition border-b border-slate-100">
            <td class="p-3 text-center">
              <input type="checkbox" class="approved-row-chk rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer" data-id="${t.id}" onchange="updateSelectAllApprovedState()">
            </td>
            <td class="p-3">
              <div class="font-mono font-bold text-blue-900 flex items-center space-x-1">
                <i class="fa-solid fa-id-badge text-blue-600 text-xs"></i>
                <span>${escapeHtml(t.teacher_code)}</span>
              </div>
              <div class="text-[11px] text-slate-500 font-mono flex items-center space-x-1 mt-0.5" title="Login Email">
                <i class="fa-regular fa-envelope text-slate-400"></i>
                <span>${escapeHtml(t.email)}</span>
              </div>
            </td>
            <td class="p-3 font-bold text-slate-900">${escapeHtml(t.name)}<br><span class="text-[10px] text-slate-500 font-normal">${escapeHtml(t.designation || '')}</span></td>
            <td class="p-3">${escapeHtml(t.college_name || '')}<br><span class="text-[10px] text-slate-400">${escapeHtml(t.university_name || '')}</span></td>
            <td class="p-3 font-medium text-blue-900">${escapeHtml(t.faculty_stream || '')}<br><span class="text-[11px] text-slate-600">${escapeHtml(t.subject_name || '')}</span></td>
            <td class="p-3">
              <div class="flex items-center space-x-1.5 bg-purple-50/70 border border-purple-200 px-2 py-1 rounded-lg w-fit">
                <i class="fa-solid fa-key text-purple-600 text-[10px]"></i>
                <input type="password" id="${pwdId}" value="${escapeHtml(plainPwd)}" readonly class="bg-transparent text-xs font-mono font-bold text-purple-950 w-20 outline-none select-all cursor-text" />
                <button type="button" onclick="togglePasswordVisibility('${pwdId}', this)" class="text-slate-400 hover:text-purple-700 p-0.5" title="Show / Hide Password">
                  <i class="fa-regular fa-eye"></i>
                </button>
                <button type="button" onclick="copyInputVal('${pwdId}')" class="text-slate-400 hover:text-blue-700 p-0.5" title="Copy Password">
                  <i class="fa-regular fa-copy"></i>
                </button>
              </div>
            </td>
            <td class="p-3 text-[11px] font-mono text-slate-600">${escapeHtml(t.mobile || '')}</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved</span></td>
            <td class="p-3 text-right whitespace-nowrap space-x-1">
              <button onclick="openAdminEditTeacherModal(${t.id})" class="btn-3d-glass px-2.5 py-1 text-blue-700 rounded text-[11px] font-bold" title="Edit Profile & Password">
                <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
              </button>
              <button onclick="deleteAdminTeacher(${t.id})" class="btn-3d-glass px-2.5 py-1 text-red-700 rounded text-[11px] font-bold" title="Delete Account">
                <i class="fa-solid fa-trash mr-1"></i> Delete
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

function togglePasswordVisibility(id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  const targetBtn = btn || input.parentElement?.querySelector('button');
  if (targetBtn) {
    const icon = targetBtn.querySelector('i') || targetBtn;
    if (icon) {
      icon.className = isPass ? 'fa-solid fa-eye-slash text-blue-600' : 'fa-solid fa-eye text-slate-400';
    }
  }
}

function copyValue(val) {
  if (!val) return;
  navigator.clipboard.writeText(val).then(() => {
    showToast('Copied to clipboard: ' + val, 'success');
  }).catch(() => {
    prompt('Copy value:', val);
  });
}

function copyInputVal(inputId) {
  const el = document.getElementById(inputId);
  if (el && el.value) {
    copyValue(el.value);
  }
}

function generateRandomAdminPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$';
  let pwd = '';
  for (let i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const el = document.getElementById('a-edit-t-password');
  if (el) {
    el.value = pwd;
    showToast('Generated New Password: ' + pwd, 'info');
  }
}

async function handleAdminApproveTeacher(id) {
  const valSelect = document.getElementById(`admin-val-days-${id}`);
  const valDays = valSelect ? parseInt(valSelect.value, 10) : 365;
  const isMr = currentLanguage === 'mr';
  const confirmMsg = isMr
    ? `या शिक्षकाचा नोंदणी / मुदतवाढ अर्ज ${valDays} दिवसांच्या मुदतीसह मंजूर करायचा का?`
    : `Approve this faculty request with ${valDays} days validity?`;

  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch(`/api/admin/teachers/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ validity_days: valDays })
    });
    const data = await res.json();
    if (res.ok) {
      if (data.is_extension) {
        alert(`🎉 Teacher Validity Extended Successfully! (मुदतवाढ यशस्वीरीत्या मंजूर)

Teacher Code: ${data.teacher_code}
Valid Until: ${data.validity_end}`);
      } else {
        alert(`🎉 Teacher Approved Successfully! (नवीन शिक्षक नोंदणी मंजूर)

Teacher Code: ${data.teacher_code}
Temporary Password: ${data.temporary_password}
Valid Until: ${data.validity_end}`);
      }
      invalidateAdminCache();
      loadAdminTeachers(true);
      loadAdminDashboardStats(true);
    } else {
      showToast(data.error || 'Approval failed.', 'error');
    }
  } catch (e) {
    showToast('Error during approval.', 'error');
  }
}

async function handleAdminRejectTeacher(id) {
  const reason = prompt('Enter rejection reason (नाकारण्याचे कारण):', 'Incomplete college details');
  if (reason === null) return;

  try {
    const res = await fetch(`/api/admin/teachers/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    if (res.ok) {
      showToast('Teacher application rejected.', 'info');
      invalidateAdminCache();
      loadAdminTeachers(true);
      loadAdminDashboardStats(true);
    }
  } catch (e) {}
}

async function openAdminEditTeacherModal(id) {
  try {
    const res = await fetch(`/api/admin/teachers/${id}`);
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Teacher not found.', 'error');
      return;
    }
    const t = data.teacher;
    document.getElementById('a-edit-t-id').value = t.id;
    document.getElementById('a-edit-t-code').value = t.teacher_code || '';
    document.getElementById('a-edit-t-curr-password').value = t.temp_plain_password || 'faculty123';
    document.getElementById('a-edit-t-password').value = '';
    document.getElementById('a-edit-t-name').value = t.name || '';
    document.getElementById('a-edit-t-desig').value = t.designation || '';
    document.getElementById('a-edit-t-college').value = t.college_name || '';
    document.getElementById('a-edit-t-univ').value = t.university_name || '';
    document.getElementById('a-edit-t-stream').value = t.faculty_stream || '';
    document.getElementById('a-edit-t-subject').value = t.subject_name || '';
    document.getElementById('a-edit-t-email').value = t.email || '';
    document.getElementById('a-edit-t-mobile').value = t.mobile || '';
    document.getElementById('a-edit-t-status').value = t.status || 'approved';
    
    // Set validity end date
    const valEndInput = document.getElementById('a-edit-t-val-end');
    if (valEndInput) {
      valEndInput.value = t.validity_end ? t.validity_end.substring(0, 10) : '';
    }
    const valBadge = document.getElementById('a-edit-t-val-badge');
    if (valBadge) {
      valBadge.innerText = t.validity_end ? `Valid: ${t.validity_end.substring(0, 10)}` : 'Active';
    }

    const m = document.getElementById('modal-admin-edit-teacher');
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('open', 'flex');
    }
  } catch (e) {
    showToast('Error loading teacher.', 'error');
  }
}

function adminQuickExtendDays(days) {
  const input = document.getElementById('a-edit-t-val-end');
  if (!input) return;
  let curr = new Date();
  if (input.value) {
    const parsed = new Date(input.value);
    if (!isNaN(parsed.getTime()) && parsed > curr) {
      curr = parsed;
    }
  }
  curr.setDate(curr.getDate() + days);
  input.value = curr.toISOString().substring(0, 10);
  showToast(`Extended by +${days} days (${input.value})`, 'info');
}

function closeAdminEditTeacherModal() {
  const m = document.getElementById('modal-admin-edit-teacher');
  if (m) {
    m.classList.remove('open', 'flex');
    m.classList.add('hidden');
  }
}

async function handleAdminEditTeacherSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('a-edit-t-id').value;
  const payload = {
    teacher_code: document.getElementById('a-edit-t-code').value.trim(),
    new_password: document.getElementById('a-edit-t-password').value.trim(),
    name: document.getElementById('a-edit-t-name').value.trim(),
    designation: document.getElementById('a-edit-t-desig').value.trim(),
    college_name: document.getElementById('a-edit-t-college').value.trim(),
    university_name: document.getElementById('a-edit-t-univ').value.trim(),
    faculty_stream: document.getElementById('a-edit-t-stream').value.trim(),
    subject_name: document.getElementById('a-edit-t-subject').value.trim(),
    email: document.getElementById('a-edit-t-email').value.trim(),
    mobile: document.getElementById('a-edit-t-mobile').value.trim(),
    status: document.getElementById('a-edit-t-status').value,
    validity_end: document.getElementById('a-edit-t-val-end')?.value || ''
  };

  try {
    const res = await fetch(`/api/admin/teachers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Update failed.', 'error');
      return;
    }

    showToast('Teacher profile and credentials updated successfully!', 'success');
    closeAdminEditTeacherModal();
    invalidateAdminCache();
    loadAdminTeachers(true);
    loadAdminDashboardStats(true);
  } catch (e) {
    showToast('Error updating teacher.', 'error');
  }
}

async function deleteAdminTeacher(id) {
  if (!confirm('Are you sure you want to permanently delete this teacher and all associated records? (हा शिक्षक व सर्व डेटा कायमचा हटवायचा आहे का?)')) return;
  try {
    const res = await fetch(`/api/admin/teachers/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || 'Teacher account deleted successfully.', 'success');
      invalidateAdminCache();
      loadAdminTeachers(true);
      loadAdminDashboardStats(true);
    } else {
      showToast(data.error || 'Failed to delete teacher account.', 'error');
    }
  } catch (e) {
    showToast('Network error while deleting teacher.', 'error');
  }
}

// =========================================================================
// STUDY MATERIALS & RESOURCE BUILDER HELPERS
// =========================================================================

function toggleTeacherStudyMaterialsBuilder() {
  const isChecked = document.getElementById('casm-is-study-materials')?.checked || false;
  const builder = document.getElementById('teacher-study-materials-builder');
  const badge = document.getElementById('study-materials-stats-badge');
  if (builder) builder.classList.toggle('hidden', !isChecked);
  if (badge) badge.classList.toggle('hidden', !isChecked);
  if (isChecked) {
    const rows = document.getElementById('teacher-study-materials-rows');
    if (rows && rows.children.length === 0) {
      addTeacherStudyMaterialRow();
    }
  }
  updateTeacherStudyMaterialsStats();
}

function updateTeacherStudyMaterialsStats() {
  const rows = document.querySelectorAll('.casm-study-material-row');
  const countEl = document.getElementById('study-materials-count');
  if (countEl) countEl.innerText = rows.length;
}

function addTeacherStudyMaterialRow(type = 'notes', title = '', url = '') {
  const container = document.getElementById('teacher-study-materials-rows');
  if (!container) return;
  const rowId = 'mat-row-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const div = document.createElement('div');
  div.id = rowId;
  div.className = 'casm-study-material-row p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center gap-2.5';
  div.innerHTML = `
    <div class="w-full sm:w-44">
      <select class="casm-mat-type w-full p-2 border border-amber-300 rounded-lg text-xs font-bold bg-white text-slate-800">
        <option value="notes" ${type === 'notes' ? 'selected' : ''}>📝 Lecture Notes / टिपणे</option>
        <option value="youtube" ${type === 'youtube' ? 'selected' : ''}>▶️ YouTube Video / व्हिडिओ</option>
        <option value="pdf" ${type === 'pdf' ? 'selected' : ''}>📄 PDF Document / दस्तऐवज</option>
        <option value="reference" ${type === 'reference' ? 'selected' : ''}>🌐 Reference Site / वेबसाइट</option>
      </select>
    </div>
    <div class="flex-1 w-full">
      <input type="text" class="casm-mat-title w-full p-2 border border-amber-300 rounded-lg text-xs bg-white font-medium" placeholder="Material Title (उदा. प्रकरण १ युनिट नोट्स / व्हिडिओ शीर्षक)" value="${escapeHtml(title)}">
    </div>
    <div class="flex-1 w-full">
      <input type="url" class="casm-mat-url w-full p-2 border border-amber-300 rounded-lg text-xs bg-white text-blue-900" placeholder="https://youtube.com/... or https://drive.google.com/..." value="${escapeHtml(url)}">
    </div>
    <button type="button" onclick="removeTeacherStudyMaterialRow('${rowId}')" class="btn-3d-glass px-2.5 py-1.5 rounded-lg text-rose-700 hover:bg-rose-100 text-xs font-bold flex-shrink-0" title="Remove Link">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;
  container.appendChild(div);
  updateTeacherStudyMaterialsStats();
}

function removeTeacherStudyMaterialRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) row.remove();
  updateTeacherStudyMaterialsStats();
}

function toggleEditTeacherStudyMaterialsBuilder() {
  const isChecked = document.getElementById('edit-casm-is-study-materials')?.checked || false;
  const builder = document.getElementById('edit-teacher-study-materials-builder');
  if (builder) builder.classList.toggle('hidden', !isChecked);
}

function renderEditTeacherStudyMaterialRows(materialsList = []) {
  const container = document.getElementById('edit-teacher-study-materials-rows');
  if (!container) return;
  container.innerHTML = '';
  if (materialsList.length === 0) {
    addEditTeacherStudyMaterialRow();
  } else {
    materialsList.forEach(m => addEditTeacherStudyMaterialRow(m.type || 'notes', m.title || '', m.url || ''));
  }
}

function addEditTeacherStudyMaterialRow(type = 'notes', title = '', url = '') {
  const container = document.getElementById('edit-teacher-study-materials-rows');
  if (!container) return;
  const rowId = 'edit-mat-row-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const div = document.createElement('div');
  div.id = rowId;
  div.className = 'edit-casm-study-material-row p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center gap-2';
  div.innerHTML = `
    <div class="w-full sm:w-36">
      <select class="edit-casm-mat-type w-full p-1.5 border border-amber-300 rounded text-xs font-bold bg-white text-slate-800">
        <option value="notes" ${type === 'notes' ? 'selected' : ''}>📝 Notes</option>
        <option value="youtube" ${type === 'youtube' ? 'selected' : ''}>▶️ YouTube</option>
        <option value="pdf" ${type === 'pdf' ? 'selected' : ''}>📄 PDF</option>
        <option value="reference" ${type === 'reference' ? 'selected' : ''}>🌐 Reference</option>
      </select>
    </div>
    <div class="flex-1 w-full">
      <input type="text" class="edit-casm-mat-title w-full p-1.5 border border-amber-300 rounded text-xs bg-white" placeholder="Material Title..." value="${escapeHtml(title)}">
    </div>
    <div class="flex-1 w-full">
      <input type="url" class="edit-casm-mat-url w-full p-1.5 border border-amber-300 rounded text-xs bg-white text-blue-900" placeholder="https://..." value="${escapeHtml(url)}">
    </div>
    <button type="button" onclick="removeEditTeacherStudyMaterialRow('${rowId}')" class="btn-3d-glass px-2 py-1 rounded text-rose-700 hover:bg-rose-100 text-xs" title="Remove Link">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;
  container.appendChild(div);
}

function removeEditTeacherStudyMaterialRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) row.remove();
}

// =========================================================================
// TEACHER STUDENT SEARCH HANDLER (6-FILTER SYSTEM)
// =========================================================================

async function loadTeacherStudentFilterOptions() {
  try {
    const res = await fetch('/api/teacher/students/filter-options');
    const data = await res.json();
    if (!res.ok || !data.success) return;

    const opts = data.filter_options || {};

    const populateDropdown = (elemId, items, defaultText) => {
      const el = document.getElementById(elemId);
      if (!el) return;
      const curVal = el.value;
      el.innerHTML = `<option value="">${defaultText}</option>`;
      (items || []).forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        el.appendChild(opt);
      });
      if (curVal) el.value = curVal;
    };

    populateDropdown('t-student-search-class', opts.classes, currentLanguage === 'mr' ? 'सर्व वर्ग (All Classes)' : 'All Classes');
    populateDropdown('t-student-search-stream', opts.streams, currentLanguage === 'mr' ? 'सर्व विद्याशाखा (All Streams)' : 'All Faculty Streams');
    populateDropdown('t-student-search-subject', opts.subjects, currentLanguage === 'mr' ? 'सर्व विषय (All Subjects)' : 'All Subjects');
    populateDropdown('t-student-search-college', opts.colleges, currentLanguage === 'mr' ? 'सर्व महाविद्यालये (All Colleges)' : 'All Colleges');
    populateDropdown('t-student-search-univ', opts.universities, currentLanguage === 'mr' ? 'सर्व विद्यापीठे (All Universities)' : 'All Universities');

  } catch (e) {
    console.error('Error loading filter options:', e);
  }
}

async function loadTeacherStudentSearch() {
  const query = document.getElementById('t-student-search-input')?.value.trim() || '';
  const className = document.getElementById('t-student-search-class')?.value.trim() || '';
  const stream = document.getElementById('t-student-search-stream')?.value.trim() || '';
  const subject = document.getElementById('t-student-search-subject')?.value.trim() || '';
  const college = document.getElementById('t-student-search-college')?.value.trim() || '';
  const university = document.getElementById('t-student-search-univ')?.value.trim() || '';

  const tbody = document.getElementById('t-student-search-tbody');
  const badge = document.getElementById('t-student-search-badge');

  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Searching students...</td></tr>';
  }

  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (className) params.set('class_name', className);
    if (stream) params.set('stream', stream);
    if (subject) params.set('subject', subject);
    if (college) params.set('college', college);
    if (university) params.set('university', university);

    const res = await fetch(`/api/teacher/students/search?${params.toString()}`);
    const data = await res.json();
    const students = data.students || [];

    if (badge) badge.innerText = `${students.length} Student${students.length !== 1 ? 's' : ''}`;

    if (!tbody) return;
    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-slate-400">${currentLanguage === 'mr' ? 'कोणतेही विद्यार्थी आढळले नाहीत.' : 'No students match your search criteria.'}</td></tr>`;
      return;
    }

    tbody.innerHTML = students.map(s => `
      <tr class="hover:bg-indigo-50/40 transition">
        <td class="p-3">
          <span class="font-bold text-slate-900">${escapeHtml(s.class_name || '')}</span>
          ${s.division ? `<span class="text-[11px] text-slate-500"> (Div ${escapeHtml(s.division)})</span>` : ''}
          <div class="text-[10px] text-slate-400 font-mono">${escapeHtml(s.academic_year || '')}</div>
          ${s.faculty_stream ? `<div class="text-[10px] text-indigo-700 font-semibold mt-0.5">${escapeHtml(s.faculty_stream)}</div>` : ''}
        </td>
        <td class="p-3 font-mono font-bold text-amber-900">${s.roll_number}</td>
        <td class="p-3 font-mono font-bold text-blue-900">${escapeHtml(s.prn)}</td>
        <td class="p-3 font-bold text-slate-900">
          ${escapeHtml(s.student_name)}
          ${s.college_name ? `<div class="text-[10px] text-slate-500 font-normal truncate max-w-[140px]">${escapeHtml(s.college_name)}</div>` : ''}
        </td>
        <td class="p-3 text-[11px]">
          <div class="font-medium text-slate-700">${escapeHtml(s.email || '-')}</div>
          <div class="font-mono text-slate-400">${escapeHtml(s.mobile || '-')}</div>
        </td>
        <td class="p-3 text-center">
          <span class="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">${s.submissions_count || 0}</span>
        </td>
        <td class="p-3 text-center">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">${s.assessed_count || 0}</span>
        </td>
        <td class="p-3 text-right">
          <button type="button" onclick="showTeacherSection('roster')" class="btn-3d-glass px-2.5 py-1 rounded text-xs font-bold text-indigo-700">
            <i class="fa-solid fa-users mr-1"></i> View in Roster
          </button>
        </td>
      </tr>
    `).join('');

  } catch (e) {
    console.error('Error loading student search:', e);
    if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-red-500">Error searching students. Please try again.</td></tr>';
  }
}

function resetTeacherStudentSearchFilters() {
  const queryEl = document.getElementById('t-student-search-input');
  const classEl = document.getElementById('t-student-search-class');
  const streamEl = document.getElementById('t-student-search-stream');
  const subEl = document.getElementById('t-student-search-subject');
  const colEl = document.getElementById('t-student-search-college');
  const univEl = document.getElementById('t-student-search-univ');

  if (queryEl) queryEl.value = '';
  if (classEl) classEl.value = '';
  if (streamEl) streamEl.value = '';
  if (subEl) subEl.value = '';
  if (colEl) colEl.value = '';
  if (univEl) univEl.value = '';

  loadTeacherStudentSearch();
}

// =========================================================================
// TEACHER ANNOUNCEMENTS HANDLERS
// =========================================================================

async function populateTeacherAnnouncementClasses() {
  const select = document.getElementById('t-ann-class');
  if (!select) return;
  try {
    const res = await fetch('/api/teacher/courses');
    const data = await res.json();
    const courses = data.courses || [];
    const distinctClasses = Array.from(new Set(courses.map(c => c.class_name).filter(Boolean))).sort();
    
    // Preserve current selection
    const curVal = select.value || 'ALL';
    select.innerHTML = '<option value="ALL">ALL Enrolled Classes (सर्व वर्ग)</option>';
    distinctClasses.forEach(c => {
      select.innerHTML += `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`;
    });
    select.value = curVal;
  } catch (e) {
    console.error('Error populating announcement classes:', e);
  }
}

async function loadTeacherAnnouncements() {
  const tbody = document.getElementById('t-announcements-tbody');
  const badge = document.getElementById('t-announcements-badge');

  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading announcements...</td></tr>';
  }

  try {
    const res = await fetch('/api/teacher/announcements');
    const data = await res.json();
    const announcements = data.announcements || [];

    if (badge) badge.innerText = `${announcements.length} Notice${announcements.length !== 1 ? 's' : ''}`;
    if (!tbody) return;

    if (announcements.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400">No announcements published yet. (कोणतीही सूचना प्रसिद्ध केलेली नाही.)</td></tr>';
      return;
    }

    tbody.innerHTML = announcements.map(a => `
      <tr class="hover:bg-rose-50/30 transition">
        <td class="p-3 text-[11px] font-medium text-slate-500 whitespace-nowrap">${a.created_at ? a.created_at.slice(0, 16) : ''}</td>
        <td class="p-3">
          <span class="px-2.5 py-0.5 rounded-full ${a.target_class === 'ALL' ? 'bg-purple-100 text-purple-800' : 'bg-rose-100 text-rose-800'} font-bold text-xs">
            ${escapeHtml(a.target_class)}
          </span>
        </td>
        <td class="p-3">
          <h5 class="font-bold text-slate-900 text-xs">${escapeHtml(a.title)}</h5>
          <p class="text-slate-600 text-[11px] mt-0.5 whitespace-pre-line leading-relaxed">${escapeHtml(a.message)}</p>
        </td>
        <td class="p-3 text-[11px]">
          ${a.reference_url ? `
            <a href="${escapeHtml(a.reference_url)}" target="_blank" rel="noopener" class="text-blue-700 font-bold hover:underline inline-flex items-center gap-1">
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              <span class="truncate max-w-[120px]">${escapeHtml(a.reference_url)}</span>
            </a>
          ` : '<span class="text-slate-400">-</span>'}
        </td>
        <td class="p-3 text-center">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs inline-flex items-center gap-1">
            <i class="fa-solid fa-envelope text-[10px]"></i> ${a.email_sent_count || 0}
          </span>
        </td>
        <td class="p-3 text-right whitespace-nowrap">
          <div class="flex items-center justify-end space-x-1">
            
            <!-- WhatsApp Share Button -->
            <button type="button" onclick="shareNoticeWhatsApp(${a.id}, '${escapeJsString(a.title)}', '${escapeJsString(a.target_class)}')" class="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold transition shadow-2xs" title="Share on WhatsApp (व्हॉट्सॲपवर पाठवा)">
              <i class="fa-brands fa-whatsapp text-sm"></i>
            </button>

            <!-- Copy Link Button -->
            <button type="button" onclick="copyNoticeLink(${a.id})" class="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold transition shadow-2xs" title="Copy Notice Link (लिंक कॉपी करा)">
              <i class="fa-solid fa-link text-xs"></i>
            </button>

            <!-- QR Code Button -->
            <button type="button" onclick="openNoticeQRCodeModal(${a.id}, '${escapeJsString(a.title)}', '${escapeJsString(a.target_class)}')" class="p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white border border-purple-200 text-xs font-bold transition shadow-2xs" title="View & Download QR Code (QR कोड पहा)">
              <i class="fa-solid fa-qrcode text-xs"></i>
            </button>

            <!-- Edit Notice Button -->
            <button type="button" onclick="openEditAnnouncementModal(${a.id})" class="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 text-xs font-bold transition shadow-2xs" title="Edit Announcement (सूचना संपादन करा)">
              <i class="fa-solid fa-pen-to-square text-xs"></i>
            </button>

            <!-- Delete Notice Button -->
            <button type="button" onclick="deleteAnnouncement(${a.id})" class="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 text-xs font-bold transition shadow-2xs" title="Delete Notice (सूचना काढून टाका)">
              <i class="fa-solid fa-trash-can text-xs"></i>
            </button>

          </div>
        </td>
      </tr>
    `).join('');

  } catch (e) {
    console.error('Error loading announcements:', e);
    if (tbody) tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-red-500">Error loading announcements.</td></tr>';
  }
}

function escapeJsString(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function shareNoticeWhatsApp(id, title, targetClass) {
  const noticeUrl = window.location.origin + '/notice/' + id;
  const teacherName = currentTeacher ? currentTeacher.name : 'Faculty';
  const text = `📢 *CIE ACADEMIC NOTICE - ${teacherName}*\n\n📌 *${title}*\nClass: ${targetClass}\n\n🔗 *View Notice & Instructions Online:*\n${noticeUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
}

function copyNoticeLink(id) {
  const noticeUrl = window.location.origin + '/notice/' + id;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(noticeUrl).then(() => {
      showToast('Notice link copied to clipboard! (लिंक कॉपी झाली)', 'success');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = noticeUrl;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Notice link copied to clipboard! (लिंक कॉपी झाली)', 'success');
  }
}

let currentModalNoticeUrl = '';

function openNoticeQRCodeModal(id, title, targetClass) {
  const noticeUrl = window.location.origin + '/notice/' + id;
  currentModalNoticeUrl = noticeUrl;

  const m = document.getElementById('modal-notice-qr');
  const titleEl = document.getElementById('qr-modal-title');
  const classEl = document.getElementById('qr-modal-class');
  const subEl = document.getElementById('qr-modal-sub');
  const imgEl = document.getElementById('qr-modal-img');
  const waBtn = document.getElementById('qr-modal-whatsapp-btn');
  const dlBtn = document.getElementById('qr-modal-download-btn');

  if (titleEl) titleEl.innerText = title;
  if (classEl) classEl.innerText = `Class: ${targetClass}`;
  if (subEl && currentTeacher) subEl.innerText = `${currentTeacher.name} • ${currentTeacher.subject_name || ''}`;
  
  const qrApiUrl = `/api/qr?data=${encodeURIComponent(noticeUrl)}`;
  if (imgEl) imgEl.src = qrApiUrl;

  const teacherName = currentTeacher ? currentTeacher.name : 'Faculty';
  const text = `📢 *CIE ACADEMIC NOTICE - ${teacherName}*\n\n📌 *${title}*\nClass: ${targetClass}\n\n🔗 *View Notice & Instructions Online:*\n${noticeUrl}`;
  if (waBtn) waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  if (dlBtn) {
    dlBtn.href = qrApiUrl;
    dlBtn.download = `CIE_Notice_QR_${id}.png`;
  }

  if (m) {
    m.classList.remove('hidden');
    m.classList.add('open', 'flex');
  }
}

function closeNoticeQRCodeModal() {
  const m = document.getElementById('modal-notice-qr');
  if (m) {
    m.classList.remove('open', 'flex');
    m.classList.add('hidden');
  }
}

function copyModalNoticeLink() {
  if (!currentModalNoticeUrl) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(currentModalNoticeUrl).then(() => {
      showToast('Notice link copied! (लिंक कॉपी झाली)', 'success');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = currentModalNoticeUrl;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Notice link copied! (लिंक कॉपी झाली)', 'success');
  }
}

async function openEditAnnouncementModal(id) {
  try {
    const res = await fetch(`/api/teacher/announcements/${id}`);
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to load announcement.', 'error');
      return;
    }

    const ann = data.announcement;
    const editId = document.getElementById('edit-ann-id');
    const editClass = document.getElementById('edit-ann-class');
    const editTitle = document.getElementById('edit-ann-title');
    const editMsg = document.getElementById('edit-ann-message');
    const editUrl = document.getElementById('edit-ann-url');

    if (editId) editId.value = ann.id;
    if (editTitle) editTitle.value = ann.title;
    if (editMsg) editMsg.value = ann.message;
    if (editUrl) editUrl.value = ann.reference_url || '';

    // Populate target class dropdown from courses
    if (editClass) {
      editClass.innerHTML = '<option value="ALL">ALL Enrolled Classes (सर्व वर्ग)</option>';
      const courseSelect = document.getElementById('t-ann-class');
      if (courseSelect) {
        Array.from(courseSelect.options).forEach(opt => {
          if (opt.value && opt.value !== 'ALL') {
            const newOpt = document.createElement('option');
            newOpt.value = opt.value;
            newOpt.textContent = opt.textContent;
            editClass.appendChild(newOpt);
          }
        });
      }
      editClass.value = ann.target_class || 'ALL';
    }

    const m = document.getElementById('modal-edit-announcement');
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('open', 'flex');
    }
  } catch (e) {
    showToast('Error loading announcement details.', 'error');
  }
}

function closeEditAnnouncementModal() {
  const m = document.getElementById('modal-edit-announcement');
  if (m) {
    m.classList.remove('open', 'flex');
    m.classList.add('hidden');
  }
}

async function handleEditAnnouncementSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('edit-ann-id')?.value;
  const targetClass = document.getElementById('edit-ann-class')?.value || 'ALL';
  const title = document.getElementById('edit-ann-title')?.value.trim();
  const message = document.getElementById('edit-ann-message')?.value.trim();
  const referenceUrl = document.getElementById('edit-ann-url')?.value.trim();

  if (!id || !title || !message) {
    showToast('Please provide Title and Message.', 'error');
    return;
  }

  try {
    const res = await fetch(`/api/teacher/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_class: targetClass,
        title: title,
        message: message,
        reference_url: referenceUrl
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to update announcement.', 'error');
      return;
    }

    showToast('Announcement updated successfully! (सूचना यशस्वीरीत्या संपादित झाली)', 'success');
    closeEditAnnouncementModal();
    loadTeacherAnnouncements();

  } catch (err) {
    console.error('Error updating announcement:', err);
    showToast('Failed to connect to server.', 'error');
  }
}

async function handleCreateAnnouncement(e) {
  e.preventDefault();
  const targetClass = document.getElementById('t-ann-class')?.value || 'ALL';
  const title = document.getElementById('t-ann-title')?.value.trim();
  const message = document.getElementById('t-ann-message')?.value.trim();
  const referenceUrl = document.getElementById('t-ann-url')?.value.trim();
  const btn = document.getElementById('btn-submit-announcement');

  if (!title || !message) {
    showToast('Please provide Announcement Title and Message.', 'error');
    return;
  }

  const origBtn = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> <span>Broadcasting & Sending Emails...</span>';
  }

  try {
    const res = await fetch('/api/teacher/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_class: targetClass,
        title: title,
        message: message,
        reference_url: referenceUrl
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to publish announcement.', 'error');
      return;
    }

    showToast(`Notice announced! ${data.email_sent_count || 0} student emails dispatched.`, 'success');
    document.getElementById('teacher-announcement-form')?.reset();
    loadTeacherAnnouncements();

  } catch (err) {
    console.error('Error creating announcement:', err);
    showToast('Failed to connect to server.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origBtn;
    }
  }
}

async function deleteAnnouncement(id) {
  if (!confirm('Are you sure you want to remove this announcement? (ही सूचना काढून टाकायची आहे का?)')) return;
  try {
    const res = await fetch(`/api/teacher/announcements/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      showToast('Announcement removed.', 'success');
      loadTeacherAnnouncements();
    } else {
      showToast(data.error || 'Failed to remove announcement.', 'error');
    }
  } catch (e) {
    showToast('Error removing announcement.', 'error');
  }
}

function onAdminFacultyStreamFilterChange() {
  const subSel = document.getElementById('admin-faculty-subject-filter');
  if (subSel) {
    subSel.value = '';
  }
  loadAdminFacultySearch(true);
}

async function loadAdminFacultySearch(forceRefresh = false) {
  const query = document.getElementById('admin-faculty-search-input')?.value.trim() || '';
  const stream = document.getElementById('admin-faculty-stream-filter')?.value.trim() || '';
  const college = document.getElementById('admin-faculty-college-filter')?.value.trim() || '';
  const university = document.getElementById('admin-faculty-university-filter')?.value.trim() || '';
  const subject = document.getElementById('admin-faculty-subject-filter')?.value.trim() || '';
  const cacheKey = [query, stream, college, university, subject].join('|');

  if (!forceRefresh && _adminFacultySearchCache[cacheKey]) {
    renderAdminFacultySearch(_adminFacultySearchCache[cacheKey], stream);
    return;
  }

  const tbody = document.getElementById('admin-faculty-search-tbody');
  if (tbody && !_adminFacultySearchCache[cacheKey]) {
    tbody.innerHTML = '<tr><td colspan="10" class="p-6 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Searching faculty directory...</td></tr>';
  }

  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (stream) params.set('stream', stream);
    if (college) params.set('college', college);
    if (university) params.set('university', university);
    if (subject) params.set('subject', subject);

    const res = await fetch(`/api/admin/faculty/search?${params.toString()}`);
    const data = await res.json();
    _adminFacultySearchCache[cacheKey] = data;
    renderAdminFacultySearch(data, stream);
  } catch (e) {
    console.error('Error in admin faculty search:', e);
    if (tbody) tbody.innerHTML = '<tr><td colspan="10" class="p-6 text-center text-red-500">Error searching faculty directory.</td></tr>';
  }
}

function renderAdminFacultySearch(data, stream) {
  const teachers = data.teachers || [];
  const tbody = document.getElementById('admin-faculty-search-tbody');
  const badge = document.getElementById('admin-faculty-search-badge');
  const navBadge = document.getElementById('admin-faculty-search-nav-badge');

  // Dynamically populate dropdown filters strictly from currently available faculty data
  const streamSel = document.getElementById('admin-faculty-stream-filter');
  if (streamSel) {
    const curStream = streamSel.value;
    const streams = data.streams || [];
    streamSel.innerHTML = '<option value="">All Streams (सर्व शाखा)</option>' + streams.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    if (curStream && streams.includes(curStream)) {
      streamSel.value = curStream;
    }
  }

  const collegeSel = document.getElementById('admin-faculty-college-filter');
  if (collegeSel) {
    const curCol = collegeSel.value;
    const colleges = data.colleges || [];
    collegeSel.innerHTML = '<option value="">All Colleges (सर्व महाविद्यालये)</option>' + colleges.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    if (curCol && colleges.includes(curCol)) {
      collegeSel.value = curCol;
    }
  }

  const univSel = document.getElementById('admin-faculty-university-filter');
  if (univSel) {
    const curUniv = univSel.value;
    const universities = data.universities || [];
    univSel.innerHTML = '<option value="">All Universities (सर्व विद्यापीठे)</option>' + universities.map(u => `<option value="${escapeHtml(u)}">${escapeHtml(u)}</option>`).join('');
    if (curUniv && universities.includes(curUniv)) {
      univSel.value = curUniv;
    }
  }

  const subSel = document.getElementById('admin-faculty-subject-filter');
  if (subSel) {
    const curSub = subSel.value;
    const subjects = data.subjects || [];
    subSel.innerHTML = '<option value="">All Subjects (सर्व विषय)</option>' + subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    if (curSub && subjects.includes(curSub)) {
      subSel.value = curSub;
    }
  }

  const countBtn = document.getElementById('admin-faculty-search-count-btn');
  if (countBtn) countBtn.innerText = `${teachers.length}`;
  if (badge) badge.innerText = `${teachers.length} ${currentLanguage === 'mr' ? 'प्राध्यापक आढळले' : (teachers.length === 1 ? 'Faculty Found' : 'Faculties Found')}`;
  if (navBadge) navBadge.innerText = `${teachers.length}`;
  if (!tbody) return;

  if (teachers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="10" class="p-6 text-center text-slate-400">No faculty members found matching your filters. (कोणतेही प्राध्यापक आढळले नाहीत.)</td></tr>';
    return;
  }

  tbody.innerHTML = teachers.map(t => {
    let statusBadge = '<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">Unknown</span>';
    if (t.status === 'approved') {
      statusBadge = '<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Approved</span>';
    } else if (t.status === 'pending') {
      statusBadge = '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">Pending</span>';
    } else if (t.status === 'rejected') {
      statusBadge = '<span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">Rejected</span>';
    }

    return `
      <tr class="hover:bg-indigo-50/40 transition">
        <td class="p-3 font-mono font-bold text-indigo-950">${escapeHtml(t.teacher_code)}</td>
        <td class="p-3">
          <div class="font-bold text-slate-900">${escapeHtml(t.name)}</div>
          <div class="text-[10px] text-slate-500 font-normal">${escapeHtml(t.designation || '')}</div>
        </td>
        <td class="p-3">
          <div class="font-semibold text-blue-900">${escapeHtml(t.faculty_stream || '')}</div>
          <div class="text-[11px] text-slate-600">${escapeHtml(t.subject_name || '')}</div>
        </td>
        <td class="p-3">
          <div class="text-slate-800">${escapeHtml(t.college_name || '')}</div>
          <div class="text-[10px] text-slate-400">${escapeHtml(t.university_name || '')}</div>
        </td>
        <td class="p-3 text-[11px]">
          <div class="text-slate-700 font-medium">${escapeHtml(t.email || '')}</div>
          <div class="font-mono text-slate-400">${escapeHtml(t.mobile || '')}</div>
        </td>
        <td class="p-3 text-center font-bold text-slate-800">${t.courses_count || 0}</td>
        <td class="p-3 text-center font-bold text-blue-800">${t.students_count || 0}</td>
        <td class="p-3 text-center font-bold text-purple-800">${t.assessments_count || 0}</td>
        <td class="p-3 text-center">${statusBadge}</td>
        <td class="p-3 text-right whitespace-nowrap space-x-1">
          <button onclick="openAdminEditTeacherModal(${t.id})" class="btn-3d-glass px-2.5 py-1 text-slate-700 rounded text-xs font-bold" title="Edit Teacher">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          ${t.status === 'pending' ? `
            <button onclick="handleAdminApproveTeacher(${t.id})" class="btn-3d-emerald px-2.5 py-1 text-white rounded text-xs font-bold" title="Approve">
              <i class="fa-solid fa-check"></i>
            </button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function resetAdminFacultySearch() {
  const qInput = document.getElementById('admin-faculty-search-input');
  const streamSel = document.getElementById('admin-faculty-stream-filter');
  const colSel = document.getElementById('admin-faculty-college-filter');
  const univSel = document.getElementById('admin-faculty-university-filter');
  const subSel = document.getElementById('admin-faculty-subject-filter');

  if (qInput) qInput.value = '';
  if (streamSel) streamSel.value = '';
  if (colSel) colSel.value = '';
  if (univSel) univSel.value = '';
  if (subSel) subSel.value = '';

  loadAdminFacultySearch(true);
}

function filterAdminFacultyByStream(streamKey) {
  showAdminSection('admin-faculty-search');
  const streamSel = document.getElementById('admin-faculty-stream-filter');
  if (streamSel) {
    streamSel.value = streamKey || '';
  }
  const qInput = document.getElementById('admin-faculty-search-input');
  if (qInput) qInput.value = '';
  const colSel = document.getElementById('admin-faculty-college-filter');
  if (colSel) colSel.value = '';
  const univSel = document.getElementById('admin-faculty-university-filter');
  if (univSel) univSel.value = '';
  const subSel = document.getElementById('admin-faculty-subject-filter');
  if (subSel) subSel.value = '';

  onAdminFacultyStreamFilterChange();
}

// =========================================================================
// TEACHER STUDY MATERIALS HANDLERS
// =========================================================================

async function populateTeacherStudyMaterialClasses() {
  const select = document.getElementById('t-mat-class');
  if (!select) return;
  try {
    const res = await fetch('/api/teacher/courses');
    const data = await res.json();
    const courses = data.courses || [];
    const distinctClasses = Array.from(new Set(courses.map(c => c.class_name).filter(Boolean))).sort();
    
    // Preserve current selection
    const curVal = select.value || 'ALL';
    select.innerHTML = '<option value="ALL">ALL Enrolled Classes (सर्व वर्ग)</option>';
    distinctClasses.forEach(c => {
      select.innerHTML += `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`;
    });
    select.value = curVal;
  } catch (e) {
    console.error('Error populating study material classes:', e);
  }
}

async function loadTeacherStudyMaterials() {
  const tbody = document.getElementById('t-study-materials-tbody');
  const badge = document.getElementById('t-study-materials-badge');

  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading study materials...</td></tr>';
  }

  try {
    const res = await fetch('/api/teacher/study-materials');
    const data = await res.json();
    const materials = data.study_materials || [];

    if (badge) badge.innerText = `${materials.length} Resource${materials.length !== 1 ? 's' : ''}`;
    if (!tbody) return;

    if (materials.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">No study materials published yet. (कोणतेही अभ्यास साहित्य जोडलेले नाही.)</td></tr>';
      return;
    }

    tbody.innerHTML = materials.map(m => {
      let typeBadge = '';
      if (m.resource_type === 'YouTube Video') {
        typeBadge = '<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[11px] font-bold inline-flex items-center gap-1"><i class="fa-brands fa-youtube text-red-600"></i> YouTube</span>';
      } else if (m.resource_type === 'Google Drive Notes') {
        typeBadge = '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold inline-flex items-center gap-1"><i class="fa-brands fa-google-drive text-amber-600"></i> Drive Notes</span>';
      } else if (m.resource_type === 'Online PDF Document') {
        typeBadge = '<span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold inline-flex items-center gap-1"><i class="fa-solid fa-file-pdf text-rose-600"></i> PDF Document</span>';
      } else {
        typeBadge = '<span class="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-bold inline-flex items-center gap-1"><i class="fa-solid fa-globe text-cyan-600"></i> Reference</span>';
      }

      return `
        <tr class="hover:bg-cyan-50/30 transition">
          <td class="p-3 text-[11px] font-medium text-slate-500 whitespace-nowrap">${m.created_at ? m.created_at.slice(0, 10) : ''}</td>
          <td class="p-3">
            <span class="px-2.5 py-0.5 rounded-full ${m.class_name === 'ALL' ? 'bg-purple-100 text-purple-800' : 'bg-cyan-100 text-cyan-800'} font-bold text-xs">
              ${escapeHtml(m.class_name)}
            </span>
          </td>
          <td class="p-3 font-bold text-slate-800 text-xs">${escapeHtml(m.subject_name || '')}</td>
          <td class="p-3">
            <h5 class="font-bold text-slate-900 text-xs">${escapeHtml(m.topic_title)}</h5>
            ${m.description ? `<p class="text-slate-500 text-[11px] mt-0.5 leading-relaxed">${escapeHtml(m.description)}</p>` : ''}
          </td>
          <td class="p-3">${typeBadge}</td>
          <td class="p-3 text-[11px]">
            <a href="${escapeHtml(m.resource_url)}" target="_blank" rel="noopener" class="text-blue-700 font-bold hover:underline inline-flex items-center gap-1">
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              <span class="truncate max-w-[140px]">${escapeHtml(m.resource_url)}</span>
            </a>
          </td>
          <td class="p-3 text-right whitespace-nowrap">
            <div class="flex items-center justify-end space-x-1">
              
              <!-- WhatsApp Share Button -->
              <button type="button" onclick="shareStudyMaterialWhatsApp(${m.id}, '${escapeJsString(m.topic_title)}', '${escapeJsString(m.class_name)}', '${escapeJsString(m.subject_name)}', '${escapeJsString(m.resource_url)}')" class="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold transition shadow-2xs" title="Share on WhatsApp (व्हॉट्सॲपवर पाठवा)">
                <i class="fa-brands fa-whatsapp text-sm"></i>
              </button>

              <!-- Copy Link Button -->
              <button type="button" onclick="copyStudyMaterialLink('${escapeJsString(m.resource_url)}')" class="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-bold transition shadow-2xs" title="Copy Resource Link (लिंक कॉपी करा)">
                <i class="fa-solid fa-link text-xs"></i>
              </button>

              <!-- Edit Button -->
              <button type="button" onclick="openEditStudyMaterialModal(${m.id})" class="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 text-xs font-bold transition shadow-2xs" title="Edit Resource (साहित्य संपादन करा)">
                <i class="fa-solid fa-pen-to-square text-xs"></i>
              </button>

              <!-- Delete Button -->
              <button type="button" onclick="deleteStudyMaterial(${m.id})" class="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 text-xs font-bold transition shadow-2xs" title="Delete Resource (साहित्य काढून टाका)">
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>

            </div>
          </td>
        </tr>
      `;
    }).join('');

  } catch (e) {
    console.error('Error loading study materials:', e);
    if (tbody) tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-red-500">Error loading study materials.</td></tr>';
  }
}

async function handleCreateStudyMaterial(e) {
  e.preventDefault();
  const className = document.getElementById('t-mat-class')?.value || 'ALL';
  const subjectName = document.getElementById('t-mat-subject')?.value.trim();
  const resourceType = document.getElementById('t-mat-type')?.value;
  const topicTitle = document.getElementById('t-mat-title')?.value.trim();
  const resourceUrl = document.getElementById('t-mat-url')?.value.trim();
  const description = document.getElementById('t-mat-description')?.value.trim();
  const btn = document.getElementById('btn-submit-study-material');

  if (!subjectName || !topicTitle || !resourceUrl) {
    showToast('Please fill in Subject, Topic Title, and Resource URL.', 'error');
    return;
  }

  const origBtn = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> <span>Publishing Resource...</span>';
  }

  try {
    const res = await fetch('/api/teacher/study-materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class_name: className,
        subject_name: subjectName,
        resource_type: resourceType,
        topic_title: topicTitle,
        resource_url: resourceUrl,
        description: description
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to publish study material.', 'error');
      return;
    }

    showToast('Study material published successfully! (अभ्यास साहित्य जोडले गेले)', 'success');
    document.getElementById('teacher-study-material-form')?.reset();
    loadTeacherStudyMaterials();

  } catch (err) {
    console.error('Error creating study material:', err);
    showToast('Failed to connect to server.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origBtn;
    }
  }
}

async function openEditStudyMaterialModal(id) {
  try {
    const res = await fetch(`/api/teacher/study-materials/${id}`);
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to load study material.', 'error');
      return;
    }

    const mat = data.study_material;
    const editId = document.getElementById('edit-mat-id');
    const editClass = document.getElementById('edit-mat-class');
    const editSubject = document.getElementById('edit-mat-subject');
    const editType = document.getElementById('edit-mat-type');
    const editTitle = document.getElementById('edit-mat-title');
    const editUrl = document.getElementById('edit-mat-url');
    const editDesc = document.getElementById('edit-mat-description');

    if (editId) editId.value = mat.id;
    if (editSubject) editSubject.value = mat.subject_name || '';
    if (editType) editType.value = mat.resource_type || 'YouTube Video';
    if (editTitle) editTitle.value = mat.topic_title || '';
    if (editUrl) editUrl.value = mat.resource_url || '';
    if (editDesc) editDesc.value = mat.description || '';

    // Populate target class dropdown from courses
    if (editClass) {
      editClass.innerHTML = '<option value="ALL">ALL Enrolled Classes (सर्व वर्ग)</option>';
      const courseSelect = document.getElementById('t-mat-class');
      if (courseSelect) {
        Array.from(courseSelect.options).forEach(opt => {
          if (opt.value && opt.value !== 'ALL') {
            const newOpt = document.createElement('option');
            newOpt.value = opt.value;
            newOpt.textContent = opt.textContent;
            editClass.appendChild(newOpt);
          }
        });
      }
      editClass.value = mat.class_name || 'ALL';
    }

    const m = document.getElementById('modal-edit-study-material');
    if (m) {
      m.classList.remove('hidden');
      m.classList.add('open', 'flex');
    }
  } catch (e) {
    showToast('Error loading study material details.', 'error');
  }
}

function closeEditStudyMaterialModal() {
  const m = document.getElementById('modal-edit-study-material');
  if (m) {
    m.classList.remove('open', 'flex');
    m.classList.add('hidden');
  }
}

async function handleEditStudyMaterialSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('edit-mat-id')?.value;
  const className = document.getElementById('edit-mat-class')?.value || 'ALL';
  const subjectName = document.getElementById('edit-mat-subject')?.value.trim();
  const resourceType = document.getElementById('edit-mat-type')?.value;
  const topicTitle = document.getElementById('edit-mat-title')?.value.trim();
  const resourceUrl = document.getElementById('edit-mat-url')?.value.trim();
  const description = document.getElementById('edit-mat-description')?.value.trim();

  if (!id || !subjectName || !topicTitle || !resourceUrl) {
    showToast('Please provide Subject, Topic Title, and Resource URL.', 'error');
    return;
  }

  try {
    const res = await fetch(`/api/teacher/study-materials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class_name: className,
        subject_name: subjectName,
        resource_type: resourceType,
        topic_title: topicTitle,
        resource_url: resourceUrl,
        description: description
      })
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error || 'Failed to update study material.', 'error');
      return;
    }

    showToast('Study material updated successfully! (अभ्यास साहित्य यशस्वीरीत्या संपादित झाले)', 'success');
    closeEditStudyMaterialModal();
    loadTeacherStudyMaterials();

  } catch (err) {
    console.error('Error updating study material:', err);
    showToast('Failed to connect to server.', 'error');
  }
}

async function deleteStudyMaterial(id) {
  if (!confirm('Are you sure you want to remove this study material? (हे अभ्यास साहित्य काढून टाकायचे आहे का?)')) return;
  try {
    const res = await fetch(`/api/teacher/study-materials/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok) {
      showToast('Study material removed.', 'success');
      loadTeacherStudyMaterials();
    } else {
      showToast(data.error || 'Failed to remove study material.', 'error');
    }
  } catch (e) {
    showToast('Error removing study material.', 'error');
  }
}

function shareStudyMaterialWhatsApp(id, title, className, subjectName, url) {
  const teacherName = currentTeacher ? currentTeacher.name : 'Faculty';
  const text = `📚 *CIE STUDY MATERIAL & NOTES - ${teacherName}*\n\n📌 *${title}*\nClass: ${className} | Subject: ${subjectName}\n\n🔗 *Access Learning Resource Link:*\n${url}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
}

function copyStudyMaterialLink(url) {
  if (!url) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Study material link copied! (लिंक कॉपी झाली)', 'success');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Study material link copied! (लिंक कॉपी झाली)', 'success');
  }
}

// =========================================================================
// ADMIN COURSE & CIE MASTER MAPPING JAVASCRIPT HANDLERS
// =========================================================================
let _adminMasterMappingData = null;

function showMasterMappingTab(tabName) {
  const tabs = ['streams', 'subjects', 'classes', 'types'];
  tabs.forEach(t => {
    const btn = document.getElementById(`mm-tab-btn-${t}`);
    const panel = document.getElementById(`mm-panel-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'mm-sub-tab active px-4 py-2 rounded-xl text-xs font-bold transition border border-teal-600 bg-teal-600 text-white flex items-center gap-2';
      } else {
        btn.className = 'mm-sub-tab px-4 py-2 rounded-xl text-xs font-bold transition border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center gap-2';
      }
    }
    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
}

async function loadAdminMasterMappingData() {
  try {
    const res = await fetch('/api/admin/master-mapping');
    if (!res.ok) throw new Error('Failed to fetch master mapping data');
    const resData = await res.json();
    if (!resData.success) throw new Error(resData.error || 'Server error');
    
    _adminMasterMappingData = resData.data;
    
    const streams = _adminMasterMappingData.streams || [];
    const subjects = _adminMasterMappingData.subjects || [];
    const classes = _adminMasterMappingData.classes || [];
    const types = _adminMasterMappingData.assessment_types || [];
    
    if (document.getElementById('mm-count-streams')) document.getElementById('mm-count-streams').textContent = streams.length;
    if (document.getElementById('mm-count-subjects')) document.getElementById('mm-count-subjects').textContent = subjects.length;
    if (document.getElementById('mm-count-classes')) document.getElementById('mm-count-classes').textContent = classes.length;
    if (document.getElementById('mm-count-types')) document.getElementById('mm-count-types').textContent = types.length;
    
    // Populate Stream Dropdowns
    populateMasterStreamSelects(streams);
    
    // Render tables
    renderMasterStreamsTable(streams);
    renderMasterSubjectsTable(subjects);
    renderMasterClassesTable(classes);
    renderMasterAssessmentTypesTable(types);
    
  } catch (err) {
    console.error('Error loading admin master mapping data:', err);
    showToast('मास्टर डेटा लोड करताना त्रुटी आली: ' + err.message, 'error');
  }
}

function populateMasterStreamSelects(streams) {
  const lang = currentLanguage || 'en';
  const activeStreams = (streams || []).filter(s => s.is_active);
  const streamOptions = activeStreams.map(s => `<option value="${escapeHtml(s.stream_name)}">${escapeHtml(formatBilingualText(s.stream_name, lang))}</option>`).join('');
  
  const newSubSel = document.getElementById('mm-new-sub-stream');
  if (newSubSel) {
    newSubSel.innerHTML = `<option value="">-- ${lang === 'mr' ? 'विद्याशाखा निवडा' : 'Select Stream'} --</option>` + streamOptions;
  }
  
  const newClsSel = document.getElementById('mm-new-cls-stream');
  if (newClsSel) {
    newClsSel.innerHTML = `<option value="">-- ${lang === 'mr' ? 'विद्याशाखा निवडा' : 'Select Stream'} --</option>` + streamOptions;
  }
  
  const filterSubSel = document.getElementById('mm-filter-sub-stream');
  if (filterSubSel) {
    const curVal = filterSubSel.value;
    filterSubSel.innerHTML = `<option value="ALL">${lang === 'mr' ? 'सर्व विद्याशाखा' : 'All Streams'}</option>` + streamOptions;
    if (curVal) filterSubSel.value = curVal;
  }
  
  const filterClsSel = document.getElementById('mm-filter-cls-stream');
  if (filterClsSel) {
    const curVal = filterClsSel.value;
    filterClsSel.innerHTML = `<option value="ALL">${lang === 'mr' ? 'सर्व विद्याशाखा' : 'All Streams'}</option>` + streamOptions;
    if (curVal) filterClsSel.value = curVal;
  }
  
  const editSubSel = document.getElementById('edit-mm-sub-stream');
  if (editSubSel) {
    editSubSel.innerHTML = streamOptions;
  }
  
  const editClsSel = document.getElementById('edit-mm-cls-stream');
  if (editClsSel) {
    editClsSel.innerHTML = streamOptions;
  }
}

function renderMasterStreamsTable(streams) {
  const tbody = document.getElementById('mm-streams-tbody');
  if (!tbody) return;
  const lang = currentLanguage || 'en';
  
  if (!streams || streams.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center text-slate-400">${lang === 'mr' ? 'कोणतीही विद्याशाखा उपलब्ध नाही.' : 'No faculty streams available.'}</td></tr>`;
    return;
  }
  
  tbody.innerHTML = streams.map(s => {
    const statusBadge = s.is_active 
      ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">${lang === 'mr' ? 'सक्रिय' : 'Active'}</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">${lang === 'mr' ? 'निष्क्रिय' : 'Disabled'}</span>`;
      
    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-3 font-mono text-slate-500 font-semibold">${s.id}</td>
        <td class="p-3 font-bold text-slate-900">${escapeHtml(formatBilingualText(s.stream_name, lang))}</td>
        <td class="p-3 text-center font-mono text-slate-600">${s.display_order}</td>
        <td class="p-3 text-center">${statusBadge}</td>
        <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
          <button type="button" onclick="openEditMasterStreamModal(${s.id})" class="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-pen-to-square mr-1"></i> ${lang === 'mr' ? 'संपादन' : 'Edit'}
          </button>
          <button type="button" onclick="handleDeleteMasterStream(${s.id})" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-trash-can mr-1"></i> ${lang === 'mr' ? 'हटवा' : 'Delete'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderMasterSubjectsTable(subjects) {
  const tbody = document.getElementById('mm-subjects-tbody');
  if (!tbody) return;
  const lang = currentLanguage || 'en';
  
  const filterStream = document.getElementById('mm-filter-sub-stream')?.value || 'ALL';
  const filtered = (filterStream === 'ALL') 
    ? subjects 
    : subjects.filter(s => s.stream_name === filterStream);
    
  if (document.getElementById('mm-subjects-filtered-count')) {
    document.getElementById('mm-subjects-filtered-count').textContent = filtered.length;
  }
  
  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-slate-400">${lang === 'mr' ? 'या विद्याशाखेत कोणताही विषय आढळला नाही.' : 'No subjects found in this stream.'}</td></tr>`;
    return;
  }
  
  tbody.innerHTML = filtered.map(s => {
    const statusBadge = s.is_active 
      ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">${lang === 'mr' ? 'सक्रिय' : 'Active'}</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">${lang === 'mr' ? 'निष्क्रिय' : 'Disabled'}</span>`;
      
    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-3 font-mono text-slate-500 font-semibold">${s.id}</td>
        <td class="p-3 font-semibold text-teal-900 bg-teal-50/40 rounded-lg">${escapeHtml(formatBilingualText(s.stream_name, lang))}</td>
        <td class="p-3 font-bold text-slate-900">${escapeHtml(formatBilingualText(s.subject_name, lang))}</td>
        <td class="p-3 text-center font-mono text-slate-600">${s.display_order}</td>
        <td class="p-3 text-center">${statusBadge}</td>
        <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
          <button type="button" onclick="openEditMasterSubjectModal(${s.id})" class="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-pen-to-square mr-1"></i> ${lang === 'mr' ? 'संपादन' : 'Edit'}
          </button>
          <button type="button" onclick="handleDeleteMasterSubject(${s.id})" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-trash-can mr-1"></i> ${lang === 'mr' ? 'हटवा' : 'Delete'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterMasterSubjectsTable() {
  if (_adminMasterMappingData && _adminMasterMappingData.subjects) {
    renderMasterSubjectsTable(_adminMasterMappingData.subjects);
  }
}

function renderMasterClassesTable(classes) {
  const tbody = document.getElementById('mm-classes-tbody');
  if (!tbody) return;
  const lang = currentLanguage || 'en';
  
  const filterStream = document.getElementById('mm-filter-cls-stream')?.value || 'ALL';
  const filtered = (filterStream === 'ALL') 
    ? classes 
    : classes.filter(c => c.stream_name === filterStream);
    
  if (document.getElementById('mm-classes-filtered-count')) {
    document.getElementById('mm-classes-filtered-count').textContent = filtered.length;
  }
  
  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-slate-400">${lang === 'mr' ? 'या विद्याशाखेत कोणताही वर्ग आढळला नाही.' : 'No classes found in this stream.'}</td></tr>`;
    return;
  }
  
  tbody.innerHTML = filtered.map(c => {
    const statusBadge = c.is_active 
      ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">${lang === 'mr' ? 'सक्रिय' : 'Active'}</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">${lang === 'mr' ? 'निष्क्रिय' : 'Disabled'}</span>`;
      
    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-3 font-mono text-slate-500 font-semibold">${c.id}</td>
        <td class="p-3 font-semibold text-teal-900 bg-teal-50/40 rounded-lg">${escapeHtml(formatBilingualText(c.stream_name, lang))}</td>
        <td class="p-3 font-bold text-slate-900">${escapeHtml(formatBilingualText(c.class_name, lang))}</td>
        <td class="p-3 text-center font-mono text-slate-600">${c.display_order}</td>
        <td class="p-3 text-center">${statusBadge}</td>
        <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
          <button type="button" onclick="openEditMasterClassModal(${c.id})" class="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-pen-to-square mr-1"></i> ${lang === 'mr' ? 'संपादन' : 'Edit'}
          </button>
          <button type="button" onclick="handleDeleteMasterClass(${c.id})" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-trash-can mr-1"></i> ${lang === 'mr' ? 'हटवा' : 'Delete'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterMasterClassesTable() {
  if (_adminMasterMappingData && _adminMasterMappingData.classes) {
    renderMasterClassesTable(_adminMasterMappingData.classes);
  }
}

function renderMasterAssessmentTypesTable(types) {
  const tbody = document.getElementById('mm-types-tbody');
  if (!tbody) return;
  const lang = currentLanguage || 'en';
  
  if (!types || types.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-slate-400">${lang === 'mr' ? 'कोणताही मूल्यमापन घटक उपलब्ध नाही.' : 'No CIE assessment types available.'}</td></tr>`;
    return;
  }
  
  tbody.innerHTML = types.map(t => {
    const statusBadge = t.is_active 
      ? `<span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">${lang === 'mr' ? 'सक्रिय' : 'Active'}</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">${lang === 'mr' ? 'निष्क्रिय' : 'Disabled'}</span>`;
      
    const natureBadge = t.is_group 
      ? `<span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]"><i class="fa-solid fa-users mr-1"></i>${lang === 'mr' ? 'गट कार्य' : 'Group'}</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]"><i class="fa-solid fa-user mr-1"></i>${lang === 'mr' ? 'वैयक्तिक' : 'Individual'}</span>`;
      
    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-3 font-mono text-slate-500 font-semibold">${t.id}</td>
        <td class="p-3 font-bold text-slate-900">${escapeHtml(formatBilingualText(t.name, lang))}</td>
        <td class="p-3 text-slate-600 max-w-xs truncate">${escapeHtml(formatBilingualText(t.description || '—', lang))}</td>
        <td class="p-3 text-center">${natureBadge}</td>
        <td class="p-3 text-center">${statusBadge}</td>
        <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
          <button type="button" onclick="openEditMasterAssessmentTypeModal(${t.id})" class="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-pen-to-square mr-1"></i> ${lang === 'mr' ? 'संपादन' : 'Edit'}
          </button>
          <button type="button" onclick="handleDeleteMasterAssessmentType(${t.id})" class="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-bold text-[11px] transition">
            <i class="fa-solid fa-trash-can mr-1"></i> ${lang === 'mr' ? 'हटवा' : 'Delete'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// --- ADD HANDLERS ---
async function handleAddMasterStream(e) {
  e.preventDefault();
  const streamName = document.getElementById('mm-new-stream-name').value.trim();
  const order = parseInt(document.getElementById('mm-new-stream-order').value) || 0;
  
  if (!streamName) return;
  
  try {
    const res = await fetch('/api/admin/master-stream/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stream_name: streamName, display_order: order })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      document.getElementById('mm-new-stream-name').value = '';
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

async function handleAddMasterSubject(e) {
  e.preventDefault();
  const streamName = document.getElementById('mm-new-sub-stream').value.trim();
  const subjectName = document.getElementById('mm-new-sub-name').value.trim();
  const order = parseInt(document.getElementById('mm-new-sub-order').value) || 0;
  
  if (!streamName || !subjectName) return;
  
  try {
    const res = await fetch('/api/admin/master-subject/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stream_name: streamName, subject_name: subjectName, display_order: order })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      document.getElementById('mm-new-sub-name').value = '';
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

async function handleAddMasterClass(e) {
  e.preventDefault();
  const streamName = document.getElementById('mm-new-cls-stream').value.trim();
  const className = document.getElementById('mm-new-cls-name').value.trim();
  const order = parseInt(document.getElementById('mm-new-cls-order').value) || 0;
  
  if (!streamName || !className) return;
  
  try {
    const res = await fetch('/api/admin/master-class/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stream_name: streamName, class_name: className, display_order: order })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      document.getElementById('mm-new-cls-name').value = '';
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

async function handleAddMasterAssessmentType(e) {
  e.preventDefault();
  const name = document.getElementById('mm-new-type-name').value.trim();
  const desc = document.getElementById('mm-new-type-desc').value.trim();
  const isGroup = parseInt(document.getElementById('mm-new-type-group').value) || 0;
  
  if (!name) return;
  
  try {
    const res = await fetch('/api/admin/master-assessment-type/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, description: desc, is_group: isGroup })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      document.getElementById('mm-new-type-name').value = '';
      document.getElementById('mm-new-type-desc').value = '';
      await loadAdminMasterMappingData();
      await loadAssessmentTypes();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

// --- EDIT MODAL HANDLERS ---
function openEditMasterStreamModal(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.streams) return;
  const s = _adminMasterMappingData.streams.find(x => x.id === parseInt(id));
  if (!s) return;

  document.getElementById('edit-mm-stream-id').value = s.id;
  document.getElementById('edit-mm-stream-name').value = s.stream_name || '';
  document.getElementById('edit-mm-stream-order').value = s.display_order ?? 0;
  document.getElementById('edit-mm-stream-active').checked = !!s.is_active;
  const _msm = document.getElementById('modal-edit-master-stream');
  if (_msm) { _msm.classList.remove('hidden'); _msm.classList.add('open', 'flex'); }
}

function closeEditMasterStreamModal() {
  const _msmc = document.getElementById('modal-edit-master-stream');
  if (_msmc) { _msmc.classList.remove('open', 'flex'); _msmc.classList.add('hidden'); }
}

async function handleSaveEditMasterStream(e) {
  e.preventDefault();
  const streamId = document.getElementById('edit-mm-stream-id').value;
  const streamName = document.getElementById('edit-mm-stream-name').value.trim();
  const order = parseInt(document.getElementById('edit-mm-stream-order').value) || 0;
  const isActive = document.getElementById('edit-mm-stream-active').checked;
  
  try {
    const res = await fetch('/api/admin/master-stream/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: streamId, stream_id: streamId, stream_name: streamName, display_order: order, is_active: isActive })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeEditMasterStreamModal();
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

function openEditMasterSubjectModal(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.subjects) return;
  const s = _adminMasterMappingData.subjects.find(x => x.id === parseInt(id));
  if (!s) return;

  populateMasterStreamSelects(_adminMasterMappingData.streams || []);

  document.getElementById('edit-mm-sub-id').value = s.id;
  document.getElementById('edit-mm-sub-stream').value = s.stream_name || '';
  document.getElementById('edit-mm-sub-name').value = s.subject_name || '';
  document.getElementById('edit-mm-sub-order').value = s.display_order ?? 0;
  document.getElementById('edit-mm-sub-active').checked = !!s.is_active;
  const _msub = document.getElementById('modal-edit-master-subject');
  if (_msub) { _msub.classList.remove('hidden'); _msub.classList.add('open', 'flex'); }
}

function closeEditMasterSubjectModal() {
  const _msubc = document.getElementById('modal-edit-master-subject');
  if (_msubc) { _msubc.classList.remove('open', 'flex'); _msubc.classList.add('hidden'); }
}

async function handleSaveEditMasterSubject(e) {
  e.preventDefault();
  const subId = document.getElementById('edit-mm-sub-id').value;
  const streamName = document.getElementById('edit-mm-sub-stream').value;
  const subName = document.getElementById('edit-mm-sub-name').value.trim();
  const order = parseInt(document.getElementById('edit-mm-sub-order').value) || 0;
  const isActive = document.getElementById('edit-mm-sub-active').checked;
  
  try {
    const res = await fetch('/api/admin/master-subject/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: subId, subject_id: subId, stream_name: streamName, subject_name: subName, display_order: order, is_active: isActive })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeEditMasterSubjectModal();
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

function openEditMasterClassModal(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.classes) return;
  const c = _adminMasterMappingData.classes.find(x => x.id === parseInt(id));
  if (!c) return;

  populateMasterStreamSelects(_adminMasterMappingData.streams || []);

  document.getElementById('edit-mm-cls-id').value = c.id;
  document.getElementById('edit-mm-cls-stream').value = c.stream_name || '';
  document.getElementById('edit-mm-cls-name').value = c.class_name || '';
  document.getElementById('edit-mm-cls-order').value = c.display_order ?? 0;
  document.getElementById('edit-mm-cls-active').checked = !!c.is_active;
  const _mcls = document.getElementById('modal-edit-master-class');
  if (_mcls) { _mcls.classList.remove('hidden'); _mcls.classList.add('open', 'flex'); }
}

function closeEditMasterClassModal() {
  const _mclsc = document.getElementById('modal-edit-master-class');
  if (_mclsc) { _mclsc.classList.remove('open', 'flex'); _mclsc.classList.add('hidden'); }
}

async function handleSaveEditMasterClass(e) {
  e.preventDefault();
  const clsId = document.getElementById('edit-mm-cls-id').value;
  const streamName = document.getElementById('edit-mm-cls-stream').value;
  const clsName = document.getElementById('edit-mm-cls-name').value.trim();
  const order = parseInt(document.getElementById('edit-mm-cls-order').value) || 0;
  const isActive = document.getElementById('edit-mm-cls-active').checked;
  
  try {
    const res = await fetch('/api/admin/master-class/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: clsId, class_id: clsId, stream_name: streamName, class_name: clsName, display_order: order, is_active: isActive })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeEditMasterClassModal();
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

function openEditMasterAssessmentTypeModal(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.assessment_types) return;
  const t = _adminMasterMappingData.assessment_types.find(x => x.id === parseInt(id));
  if (!t) return;

  document.getElementById('edit-mm-type-id').value = t.id;
  document.getElementById('edit-mm-type-name').value = t.name || '';
  document.getElementById('edit-mm-type-desc').value = t.description || '';
  document.getElementById('edit-mm-type-group').value = t.is_group ? '1' : '0';
  document.getElementById('edit-mm-type-active').checked = !!t.is_active;
  const _mtype = document.getElementById('modal-edit-master-assessment-type');
  if (_mtype) { _mtype.classList.remove('hidden'); _mtype.classList.add('open', 'flex'); }
}

function closeEditMasterAssessmentTypeModal() {
  const _mtypec = document.getElementById('modal-edit-master-assessment-type');
  if (_mtypec) { _mtypec.classList.remove('open', 'flex'); _mtypec.classList.add('hidden'); }
}

async function handleSaveEditMasterAssessmentType(e) {
  e.preventDefault();
  const typeId = document.getElementById('edit-mm-type-id').value;
  const name = document.getElementById('edit-mm-type-name').value.trim();
  const desc = document.getElementById('edit-mm-type-desc').value.trim();
  const isGroup = parseInt(document.getElementById('edit-mm-type-group').value) || 0;
  const isActive = document.getElementById('edit-mm-type-active').checked;
  
  try {
    const res = await fetch('/api/admin/master-assessment-type/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: typeId, type_id: typeId, name: name, description: desc, is_group: isGroup, is_active: isActive })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      closeEditMasterAssessmentTypeModal();
      await loadAdminMasterMappingData();
      await loadAssessmentTypes();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

// --- DELETE HANDLERS ---
async function handleDeleteMasterStream(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.streams) return;
  const s = _adminMasterMappingData.streams.find(x => x.id === parseInt(id));
  const name = s ? s.stream_name : '';
  if (!confirm(`तुम्हाला "${name}" ही विद्याशाखा आणि त्याखालील सर्व विषय व वर्ग हटवायचे आहेत का? (Are you sure you want to delete this stream and all associated subjects and classes?)`)) return;
  
  try {
    const res = await fetch('/api/admin/master-stream/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, stream_id: id })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

async function handleDeleteMasterSubject(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.subjects) return;
  const s = _adminMasterMappingData.subjects.find(x => x.id === parseInt(id));
  const name = s ? s.subject_name : '';
  if (!confirm(`तुम्हाला "${name}" हा विषय हटवायचा आहे का?`)) return;
  
  try {
    const res = await fetch('/api/admin/master-subject/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, subject_id: id })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

async function handleDeleteMasterClass(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.classes) return;
  const c = _adminMasterMappingData.classes.find(x => x.id === parseInt(id));
  const name = c ? c.class_name : '';
  if (!confirm(`तुम्हाला "${name}" हा वर्ग हटवायचा आहे का?`)) return;
  
  try {
    const res = await fetch('/api/admin/master-class/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, class_id: id })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      await loadAdminMasterMappingData();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

async function handleDeleteMasterAssessmentType(id) {
  if (!_adminMasterMappingData || !_adminMasterMappingData.assessment_types) return;
  const t = _adminMasterMappingData.assessment_types.find(x => x.id === parseInt(id));
  const name = t ? t.name : '';
  if (!confirm(`तुम्हाला "${name}" हा मूल्यमापन घटक हटवायचा आहे का?`)) return;
  
  try {
    const res = await fetch('/api/admin/master-assessment-type/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, type_id: id })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      await loadAdminMasterMappingData();
      await loadAssessmentTypes();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

async function handleResetMasterMapping() {
  if (!confirm('सर्व विद्याशाखा, विषय व वर्ग मूळ प्रणाली मानकांवर (Default Standard Values) पूर्ववत (Reset) करायचे आहेत का? याने तुम्ही नव्याने जोडलेले बदल पूर्ववत होतील.')) return;
  
  try {
    const res = await fetch('/api/admin/master-mapping/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      await loadAdminMasterMappingData();
      await loadAssessmentTypes();
      await loadMasterDisciplines();
    } else {
      showToast(data.error || 'त्रुटी आढळली', 'error');
    }
  } catch (err) {
    showToast('सर्व्हर त्रुटी: ' + err.message, 'error');
  }
}

// =========================================================================
// ADMIN & TEACHER ANNOUNCEMENTS / NOTICES MODULE (प्रशासकीय सूचना व परिपत्रके)
// =========================================================================

async function loadAdminAnnouncements(forceRefresh = false) {
  if (!forceRefresh && _adminAnnouncementsCache) {
    renderAdminAnnouncements(_adminAnnouncementsCache);
    return;
  }
  const tbody = document.getElementById('admin-announcements-tbody');
  if (tbody && !tbody.innerHTML.includes('Loading')) {
    tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading announcements...</td></tr>';
  }
  try {
    const res = await fetch(`/api/admin/announcements?_t=${Date.now()}`);
    const data = await res.json();
    if (data.success) {
      _adminAnnouncementsCache = data.announcements || [];
      renderAdminAnnouncements(_adminAnnouncementsCache);
    } else {
      showToast(data.error || 'Failed to load announcements.', 'error');
    }
  } catch (e) {
    console.error('Error loading admin announcements:', e);
    showToast('Failed to load announcements from server.', 'error');
  }
}

function renderAdminAnnouncements(list) {
  const tbody = document.getElementById('admin-announcements-tbody');
  const badge = document.getElementById('admin-announcements-badge');
  const navBadge = document.getElementById('admin-announcements-nav-badge');
  
  if (badge) badge.innerText = `${list.length} Notices`;
  if (navBadge) navBadge.innerText = `${list.length}`;

  if (!tbody) return;

  if (!list || list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">No announcements published yet. Click "+ New" to publish a notice for teachers. (अद्याप कोणतीही सूचना जोडलेली नाही)</td></tr>';
    return;
  }

  tbody.innerHTML = list.map((item, idx) => {
    const priority = item.priority || 'NORMAL';
    let priorityBadge = '';
    if (priority === 'URGENT') {
      priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-900 border border-rose-300">🔥 तातडीचे (URGENT)</span>';
    } else if (priority === 'IMPORTANT') {
      priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">⭐ महत्त्वाचे (IMPORTANT)</span>';
    } else {
      priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 border border-slate-200">सामान्य (NORMAL)</span>';
    }

    const category = item.badge_type || 'OFFICIAL';
    const catBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-200">${escapeHtml(category)}</span>`;

    const statusBadge = item.is_active
      ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">सक्रिय (Active)</span>'
      : '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">निष्क्रिय (Inactive)</span>';

    const refLink = item.reference_url
      ? `<a href="${escapeHtml(item.reference_url)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 font-medium underline flex items-center gap-1 max-w-[180px] truncate" title="${escapeHtml(item.reference_url)}"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> <span class="truncate">${escapeHtml(item.reference_url)}</span></a>`
      : '<span class="text-slate-400">-</span>';

    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="p-3 text-center font-bold text-slate-500">${idx + 1}</td>
        <td class="p-3">
          <div class="flex flex-col gap-1 items-start">
            ${catBadge}
            ${priorityBadge}
          </div>
        </td>
        <td class="p-3">
          <div class="font-bold text-slate-900 text-xs mb-1">${escapeHtml(item.title)}</div>
          <div class="text-[11px] text-slate-600 line-clamp-2 max-w-md whitespace-pre-line">${escapeHtml(item.content)}</div>
        </td>
        <td class="p-3">${refLink}</td>
        <td class="p-3">${statusBadge}</td>
        <td class="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">${escapeHtml(item.created_at || '')}</td>
        <td class="p-3 text-right whitespace-nowrap space-x-1">
          <button onclick="openEditAdminAnnouncementModal(${item.id})" class="btn-3d-glass px-2.5 py-1 text-blue-700 rounded text-[11px] font-bold" title="Edit Announcement">
            <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
          </button>
          <button onclick="handleDeleteAdminAnnouncement(${item.id})" class="btn-3d-glass px-2.5 py-1 text-red-700 rounded text-[11px] font-bold" title="Delete Announcement">
            <i class="fa-solid fa-trash mr-1"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddAdminAnnouncementModal() {
  const modal = document.getElementById('modal-admin-add-announcement');
  if (!modal) return;
  const titleEl = document.getElementById('admin-ann-title');
  const contentEl = document.getElementById('admin-ann-content');
  const priorityEl = document.getElementById('admin-ann-priority');
  const badgeEl = document.getElementById('admin-ann-badge');
  const refUrlEl = document.getElementById('admin-ann-ref-url');
  if (titleEl) titleEl.value = '';
  if (contentEl) contentEl.value = '';
  if (priorityEl) priorityEl.value = 'NORMAL';
  if (badgeEl) badgeEl.value = 'OFFICIAL';
  if (refUrlEl) refUrlEl.value = '';
  modal.classList.remove('hidden');
  modal.classList.add('open', 'flex');
}

function closeAddAdminAnnouncementModal() {
  const modal = document.getElementById('modal-admin-add-announcement');
  if (modal) {
    modal.classList.remove('open', 'flex');
    modal.classList.add('hidden');
  }
}

function openEditAdminAnnouncementModal(id) {
  if (!_adminAnnouncementsCache) return;
  const item = _adminAnnouncementsCache.find(a => parseInt(a.id, 10) === parseInt(id, 10));
  if (!item) return;

  const modal = document.getElementById('modal-admin-edit-announcement');
  if (!modal) return;

  const idEl = document.getElementById('edit-admin-ann-id');
  const titleEl = document.getElementById('edit-admin-ann-title');
  const contentEl = document.getElementById('edit-admin-ann-content');
  const priorityEl = document.getElementById('edit-admin-ann-priority');
  const badgeEl = document.getElementById('edit-admin-ann-badge');
  const refUrlEl = document.getElementById('edit-admin-ann-ref-url');
  const statusEl = document.getElementById('edit-admin-ann-status');

  if (idEl) idEl.value = item.id;
  if (titleEl) titleEl.value = item.title || '';
  if (contentEl) contentEl.value = item.content || '';
  if (priorityEl) priorityEl.value = item.priority || 'NORMAL';
  if (badgeEl) badgeEl.value = item.badge_type || 'OFFICIAL';
  if (refUrlEl) refUrlEl.value = item.reference_url || '';
  if (statusEl) statusEl.value = (item.is_active !== 0 && item.is_active !== false) ? '1' : '0';

  modal.classList.remove('hidden');
  modal.classList.add('open', 'flex');
}

function closeEditAdminAnnouncementModal() {
  const modal = document.getElementById('modal-admin-edit-announcement');
  if (modal) {
    modal.classList.remove('open', 'flex');
    modal.classList.add('hidden');
  }
}

async function handleSaveAdminAnnouncement(event) {
  if (event && event.preventDefault) event.preventDefault();
  const title = (document.getElementById('admin-ann-title')?.value || '').trim();
  const content = (document.getElementById('admin-ann-content')?.value || '').trim();
  const priority = document.getElementById('admin-ann-priority')?.value || 'NORMAL';
  const badge_type = document.getElementById('admin-ann-badge')?.value || 'OFFICIAL';
  const reference_url = (document.getElementById('admin-ann-ref-url')?.value || '').trim();

  if (!title || !content) {
    showToast(currentLanguage === 'mr' ? 'कृपया सूचनेचे शीर्षक व मजकूर दोन्ही प्रविष्ट करा.' : 'Please provide both title and content.', 'warning');
    return;
  }

  const btn = document.getElementById('btn-save-admin-ann');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Saving...';
  }

  try {
    const res = await fetch('/api/admin/announcements/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, priority, badge_type, reference_url })
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Announcement published successfully!', 'success');
      closeAddAdminAnnouncementModal();
      invalidateAdminCache();
      await loadAdminAnnouncements(true);
    } else {
      showToast(data.error || 'Failed to create announcement.', 'error');
    }
  } catch (e) {
    console.error('Error adding admin announcement:', e);
    showToast('Server error while publishing announcement.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

async function handleSaveEditAdminAnnouncement(event) {
  if (event && event.preventDefault) event.preventDefault();
  const id = parseInt(document.getElementById('edit-admin-ann-id')?.value, 10);
  const title = (document.getElementById('edit-admin-ann-title')?.value || '').trim();
  const content = (document.getElementById('edit-admin-ann-content')?.value || '').trim();
  const priority = document.getElementById('edit-admin-ann-priority')?.value || 'NORMAL';
  const badge_type = document.getElementById('edit-admin-ann-badge')?.value || 'OFFICIAL';
  const reference_url = (document.getElementById('edit-admin-ann-ref-url')?.value || '').trim();
  const is_active = parseInt(document.getElementById('edit-admin-ann-status')?.value || '1', 10);

  if (!id || !title || !content) {
    showToast(currentLanguage === 'mr' ? 'कृपया सर्व आवश्यक रकाने भरा.' : 'Please provide all required fields.', 'warning');
    return;
  }

  const btn = document.getElementById('btn-update-admin-ann');
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Saving...';
  }

  try {
    const res = await fetch('/api/admin/announcements/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, content, priority, badge_type, reference_url, is_active })
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Announcement updated successfully!', 'success');
      closeEditAdminAnnouncementModal();
      invalidateAdminCache();
      await loadAdminAnnouncements(true);
    } else {
      showToast(data.error || 'Failed to update announcement.', 'error');
    }
  } catch (e) {
    console.error('Error updating admin announcement:', e);
    showToast('Server error while saving announcement changes.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
    }
  }
}

async function handleDeleteAdminAnnouncement(id) {
  if (!id) return;
  const confirmMsg = (currentLanguage === 'mr')
    ? 'तुम्हाला ही प्रशासकीय सूचना कायमची हटवायची आहे का? (Are you sure you want to permanently delete this announcement?)'
    : 'Are you sure you want to permanently delete this announcement?';

  if (!confirm(confirmMsg)) return;

  try {
    const res = await fetch('/api/admin/announcements/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Announcement deleted.', 'success');
      invalidateAdminCache();
      await loadAdminAnnouncements(true);
    } else {
      showToast(data.error || 'Failed to delete announcement.', 'error');
    }
  } catch (e) {
    console.error('Error deleting admin announcement:', e);
    showToast('Server error while deleting announcement.', 'error');
  }
}

async function loadTeacherAdminAnnouncements() {
  const card = document.getElementById('teacher-admin-announcements-card');
  const listEl = document.getElementById('teacher-admin-announcements-list');
  const badgeEl = document.getElementById('t-admin-ann-count-badge');
  if (!card || !listEl) return;

  try {
    const res = await fetch(`/api/teacher/admin-announcements?_t=${Date.now()}`);
    if (!res.ok) {
      card.classList.add('hidden');
      return;
    }
    const data = await res.json();
    if (!data.success || !data.announcements || data.announcements.length === 0) {
      card.classList.add('hidden');
      return;
    }

    const list = data.announcements;
    if (badgeEl) badgeEl.innerText = `${list.length}`;
    card.classList.remove('hidden');

    listEl.innerHTML = list.map(item => {
      const priority = item.priority || 'NORMAL';
      let priorityBadge = '';
      if (priority === 'URGENT') {
        priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-black bg-rose-500 text-white shadow-xs animate-pulse">🔥 URGENT</span>';
      } else if (priority === 'IMPORTANT') {
        priorityBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 shadow-xs">⭐ IMPORTANT</span>';
      }

      const category = item.badge_type || 'OFFICIAL';
      const catBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40">${escapeHtml(category)}</span>`;

      const refLink = item.reference_url
        ? `<a href="${escapeHtml(item.reference_url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-white underline font-semibold mt-1"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> <span>अधिकृत परिपत्रक / संदर्भ लिंक उघडा (Open Circular Link)</span></a>`
        : '';

      return `
        <div class="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3.5 transition">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div class="flex items-center gap-2">
              ${catBadge}
              ${priorityBadge}
              <h5 class="text-xs font-bold text-white">${escapeHtml(item.title)}</h5>
            </div>
            <span class="text-[10px] font-mono text-sky-200/70"><i class="fa-regular fa-clock mr-1"></i>${escapeHtml(item.created_at || '')}</span>
          </div>
          <div class="text-xs text-sky-100/90 whitespace-pre-line leading-relaxed">${escapeHtml(item.content)}</div>
          ${refLink}
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Error loading teacher admin announcements:', e);
  }
}

window.loadAdminAnnouncements = loadAdminAnnouncements;
window.renderAdminAnnouncements = renderAdminAnnouncements;
window.openAddAdminAnnouncementModal = openAddAdminAnnouncementModal;
window.closeAddAdminAnnouncementModal = closeAddAdminAnnouncementModal;
window.openEditAdminAnnouncementModal = openEditAdminAnnouncementModal;
window.closeEditAdminAnnouncementModal = closeEditAdminAnnouncementModal;
window.handleSaveAdminAnnouncement = handleSaveAdminAnnouncement;
window.handleSaveEditAdminAnnouncement = handleSaveEditAdminAnnouncement;
window.handleDeleteAdminAnnouncement = handleDeleteAdminAnnouncement;
window.loadTeacherAdminAnnouncements = loadTeacherAdminAnnouncements;

// =========================================================================
// COMPLETE PORTAL USER MANUAL MODAL LOGIC (वापरकर्ता पुस्तिका पुस्तक)
// =========================================================================

let manualCurrentLang = 'mr';
let manualRawMarkdown = '';

function openUserManualModal(lang) {
  const modal = document.getElementById('modal-user-manual');
  if (!modal) {
    console.warn('modal-user-manual element not found in DOM');
    return;
  }

  if (lang) {
    manualCurrentLang = (lang === 'en' ? 'en' : 'mr');
  } else {
    manualCurrentLang = (currentLanguage === 'en' ? 'en' : 'mr');
  }

  modal.classList.remove('hidden');
  modal.classList.add('open');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  loadUserManualContent(manualCurrentLang);
}

function closeUserManualModal() {
  const modal = document.getElementById('modal-user-manual');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('open');
    modal.style.display = 'none';
  }
  document.body.style.overflow = '';
}

async function switchManualLanguage(lang) {
  manualCurrentLang = (lang === 'en' ? 'en' : 'mr');
  await loadUserManualContent(manualCurrentLang);
}

async function loadUserManualContent(lang) {
  const container = document.getElementById('manual-content-container');
  const btnMr = document.getElementById('manual-lang-mr-btn');
  const btnEn = document.getElementById('manual-lang-en-btn');
  const modalTitle = document.getElementById('manual-modal-title');
  const modalSub = document.getElementById('manual-modal-subtitle');
  const footerStatus = document.getElementById('manual-footer-status');
  const searchInput = document.getElementById('manual-search-input');
  const chapterSelect = document.getElementById('manual-chapter-jump');

  if (btnMr && btnEn) {
    if (lang === 'mr') {
      btnMr.className = 'px-3 py-1 rounded-lg transition-all bg-amber-500 text-slate-950 font-black shadow-sm flex items-center gap-1';
      btnEn.className = 'px-3 py-1 rounded-lg transition-all text-slate-300 hover:text-white font-semibold flex items-center gap-1';
      if (modalTitle) modalTitle.innerHTML = '📖 संपूर्ण पोर्टल वापरकर्ता पुस्तिका (User Manual Book)';
      if (modalSub) modalSub.textContent = 'सातत्यपूर्ण अंतर्गत मूल्यमापन प्रणाली (CIE) सविस्तर कार्यमार्गदर्शक';
      if (footerStatus) footerStatus.textContent = 'अधिकृत शैक्षणिक कार्यपुस्तिका (मराठी आवृत्ती)';
      if (searchInput) searchInput.placeholder = 'पुस्तकात शोधा (Search manual topics, assessment types...)...';
    } else {
      btnEn.className = 'px-3 py-1 rounded-lg transition-all bg-amber-500 text-slate-950 font-black shadow-sm flex items-center gap-1';
      btnMr.className = 'px-3 py-1 rounded-lg transition-all text-slate-300 hover:text-white font-semibold flex items-center gap-1';
      if (modalTitle) modalTitle.innerHTML = '📖 Complete Portal User Manual Book (English)';
      if (modalSub) modalSub.textContent = 'Continuous Internal Evaluation (CIE) System Comprehensive Handbook';
      if (footerStatus) footerStatus.textContent = 'Official Academic Handbook (English Edition)';
      if (searchInput) searchInput.placeholder = 'Search manual topics, assessment types, workflows...';
    }
  }

  if (container) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
        <i class="fa-solid fa-circle-notch fa-spin text-3xl text-amber-500"></i>
        <span class="text-sm font-bold text-slate-600">${lang === 'mr' ? 'पुस्तिका लोड होत आहे...' : 'Loading User Manual Book...'}</span>
      </div>
    `;
  }

  try {
    const res = await fetch(`/api/user-manual?lang=${lang}`);
    const data = await res.json();
    if (!data.success || !data.content) {
      if (container) {
        container.innerHTML = `<div class="p-6 bg-rose-50 text-rose-700 rounded-xl font-bold">Error loading user manual content: ${escapeHtml(data.error || 'Unknown error')}</div>`;
      }
      return;
    }

    manualRawMarkdown = data.content;

    let htmlContent = '';
    if (window.marked && typeof window.marked.parse === 'function') {
      htmlContent = window.marked.parse(data.content);
    } else {
      htmlContent = `<pre class="whitespace-pre-wrap font-sans text-sm">${escapeHtml(data.content)}</pre>`;
    }

    if (container) {
      container.innerHTML = htmlContent;

      // Extract Headings for Chapter Jump Select
      if (chapterSelect) {
        const headings = container.querySelectorAll('h1, h2, h3');
        chapterSelect.innerHTML = `<option value="">-- ${lang === 'mr' ? 'अध्याय निवडा (Select Chapter)' : 'Select Chapter / Section'} --</option>`;
        headings.forEach((h, idx) => {
          const text = h.textContent.trim();
          const cleanId = 'manual-sec-' + idx;
          h.id = cleanId;
          const level = h.tagName.toLowerCase();
          const prefix = level === 'h1' ? '📕 ' : (level === 'h2' ? '  📌 ' : '    ▪ ');
          if (text.length > 2 && text.length < 80) {
            const opt = document.createElement('option');
            opt.value = cleanId;
            opt.textContent = prefix + text;
            chapterSelect.appendChild(opt);
          }
        });
      }
    }
  } catch (err) {
    console.error('Error fetching user manual:', err);
    if (container) {
      container.innerHTML = `<div class="p-6 bg-rose-50 text-rose-700 rounded-xl font-bold">Failed to load manual: ${escapeHtml(err.message)}</div>`;
    }
  }
}

function jumpToManualChapter(headingId) {
  if (!headingId) return;
  const target = document.getElementById(headingId);
  const container = document.getElementById('manual-content-container');
  if (target && container) {
    const topPos = target.offsetTop - container.offsetTop - 10;
    container.scrollTo({ top: topPos, behavior: 'smooth' });
    target.classList.add('bg-amber-100', 'transition-all');
    setTimeout(() => {
      target.classList.remove('bg-amber-100');
    }, 1500);
  }
}

function filterUserManualText() {
  const input = document.getElementById('manual-search-input');
  if (!input) return;
  const filter = input.value.trim().toLowerCase();
  const container = document.getElementById('manual-content-container');
  if (!container) return;

  if (!filter) {
    const allElements = container.querySelectorAll('p, li, tr, h1, h2, h3, h4, blockquote');
    allElements.forEach(el => el.style.display = '');
    return;
  }

  const sections = container.querySelectorAll('h2, h3, p, li, tr, blockquote');
  let firstMatch = null;
  sections.forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(filter)) {
      el.style.display = '';
      if (!firstMatch) firstMatch = el;
    } else {
      if (el.tagName === 'P' || el.tagName === 'LI') {
        el.style.display = 'none';
      }
    }
  });

  if (firstMatch) {
    const topPos = firstMatch.offsetTop - container.offsetTop - 10;
    container.scrollTo({ top: topPos, behavior: 'smooth' });
  }
}

function printUserManual() {
  const container = document.getElementById('manual-content-container');
  if (!container) return;

  const printWin = window.open('', '_blank');
  if (!printWin) {
    window.print();
    return;
  }

  const langTitle = manualCurrentLang === 'mr' ? 'सातत्यपूर्ण अंतर्गत मूल्यमापन प्रणाली - वापरकर्ता पुस्तिका पुस्तक' : 'Continuous Internal Evaluation System - Complete User Manual Book';

  printWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${langTitle}</title>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Noto Sans Devanagari', 'Inter', system-ui, sans-serif; padding: 24px; color: #1e293b; line-height: 1.6; }
        h1 { font-size: 22px; border-bottom: 2px solid #334155; padding-bottom: 8px; color: #0f172a; }
        h2 { font-size: 18px; border-left: 4px solid #2563eb; padding-left: 8px; color: #1e3a8a; margin-top: 24px; background: #f8fafc; }
        h3 { font-size: 15px; color: #0f766e; margin-top: 16px; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
        th { background: #f1f5f9; font-weight: bold; }
        blockquote { border-left: 3px solid #f59e0b; background: #fffbeb; padding: 8px 12px; margin: 12px 0; font-size: 13px; }
        code { background: #f1f5f9; color: #be123c; padding: 2px 4px; border-radius: 3px; font-size: 12px; }
        pre { background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; font-size: 11px; overflow-x: auto; }
      </style>
    </head>
    <body>
      ${container.innerHTML}
    </body>
    </html>
  `);
  printWin.document.close();
  printWin.focus();
  setTimeout(() => {
    printWin.print();
  }, 400);
}

// Attach to window
window.openUserManualModal = openUserManualModal;
window.closeUserManualModal = closeUserManualModal;
window.switchManualLanguage = switchManualLanguage;
window.loadUserManualContent = loadUserManualContent;
window.jumpToManualChapter = jumpToManualChapter;
window.filterUserManualText = filterUserManualText;
window.printUserManual = printUserManual;




