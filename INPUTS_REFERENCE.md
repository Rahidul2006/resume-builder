# Modern Template - Complete Input Reference

## All Inputs Required for Modern Resume Page

### 📷 PHOTO/AVATAR
- Upload any image file (JPG, PNG, WebP)
- Displays in hero header (top left) - rounded square
- Optional but recommended

---

### 👤 PERSONAL INFORMATION (6 fields)
1. **Name** - Full name (displays large in header)
2. **Handle** - Social media handle (e.g., @YourUsername)
3. **Email** - Email address
4. **Phone** - Phone number
5. **GitHub** - GitHub profile URL
6. **LinkedIn** - LinkedIn profile URL

---

### 💼 SKILLS (7 sample skills)
Default: HTML, CSS, JavaScript, ReactJS, TailwindCSS, Python, C

Add/edit/remove skills:
- Click "Add Skill" to add more
- Edit existing skills directly
- Click "x" to remove individual skills
- Clear all with "Clear" button

**Display**: Left sidebar, with progress bars showing proficiency

---

### 🎓 EDUCATION (3 sample entries)
Each education entry needs:
- **Title**: School/Degree (e.g., "Ideal Institute of Engineering | CSE")
- **Meta**: Year, CGPA, etc. (e.g., "CGPA: 3.5 (2024-25) — 1st year")

Default entries:
1. Ideal Institute of Engineering | CSE
2. X (WBBSE) | JKHS
3. XII (WBCHSE) | VGDV

**Display**: Right side under "EDUCATION" section

---

### 🚀 ACADEMIC PROJECTS (2 sample projects)
Each project needs:
- **Title**: Project name
- **Description**: What it does, technologies used
- **Code Link**: GitHub repository URL

Default projects:
1. RK-Clothing - E-commerce front-end prototype
2. Resume Builder App - Resume creation tool with live preview

---

### 💡 STRENGTHS & HOBBIES
- **Strengths** (comma-separated):
  Example: Problem-solving, Team collaboration, Quick learner

- **Hobbies** (comma-separated):
  Example: Reading tech blogs, Coding challenges, Photography

**Display**: Can be used in profile section or additional details

---

## Input Summary Table

| Section | Field | Type | Example |
|---------|-------|------|---------|
| Photo | Avatar | File Upload | profile.jpg |
| Personal | Name | Text | Rahidul Khan |
| Personal | Handle | Text | @Rahidul2006 |
| Personal | Email | Email | rahidul@email.com |
| Personal | Phone | Text | +91 9832577462 |
| Personal | GitHub | URL | https://github.com/user |
| Personal | LinkedIn | URL | https://linkedin.com/in/user |
| Skills | Add Skills | Text List | HTML, CSS, JavaScript |
| Education | Title | Text | Engineering \| CSE |
| Education | Meta | Text | CGPA: 3.5 (2024-25) |
| Projects | Title | Text | RK-Clothing |
| Projects | Description | Text | E-commerce platform |
| Projects | Code URL | URL | https://github.com/proj |
| Strengths | Values | CSV | Problem-solving, Leadership |
| Hobbies | Values | CSV | Reading, Photography |

---

## How Modern Template Uses Input Data

### Header Section
- Uses: Photo, Name, Email (for title generation)
- Displays profile photo + name in large text + title

### Left Sidebar - ABOUT
- Uses: Phone, Email
- Displays contact information with icons

### Left Sidebar - SKILLS
- Uses: Skills list
- Shows each skill with animated progress bar

### Left Sidebar - LANGUAGE
- Fixed content (sample: English, French, Yoruba)
- Can be updated in template directly

### Left Sidebar - SOFTWARE
- Fixed content (sample: Excel, Photoshop, Corel Draw)
- Can be updated in template directly

### Right Side - PROFILE
- Fixed summary text
- Can be customized in template

### Right Side - WORK EXPERIENCE
- Fixed job entries with dates/companies/bullets
- Can be customized in template

### Right Side - EDUCATION
- Uses: Education entries (Title + Meta)
- Displays as timeline list

---

## Template Preview Location

- **Main App Preview**: http://localhost:3000 (select "Modern" template)
- **Standalone Modern Template**: Opens in new tab when you click "Modern Template" button
- **Minimal Template**: http://localhost:3000/minimal-resume.html

---

## Key Features

✅ All inputs are **optional** - defaults provided
✅ **Live preview** updates as you type
✅ **localStorage** saves data between sessions
✅ **Responsive** - works on mobile, tablet, desktop
✅ **Print-friendly** - exports to PDF well
✅ **Professional design** with navy/white color scheme
✅ **Progress bars** animate on page load

---

## Quick Start

1. **Open** http://localhost:3000
2. **Fill in** your information on the left
3. **Select** "Modern" template from buttons
4. **Preview** updates live on the right
5. **Click** "Modern Template" button to export
6. **Print** or save as PDF from the standalone page

