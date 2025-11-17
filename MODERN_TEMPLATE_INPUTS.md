# Modern Template - All Required Inputs

The Modern Template requires the following inputs to display a complete resume preview:

## 1. Photo/Avatar
- **Input**: File upload
- **Purpose**: Profile photo displayed in the hero header
- **Format**: Any image file (JPG, PNG, etc.)
- **Size**: Recommended 150x150px or larger
- **Preview**: Shows rounded square photo with border in navy header

---

## 2. Personal Information
All fields in the "Personal" section:
- **Name**: Your full name (displays in large text in hero header)
- **Handle**: Social media handle or nickname (e.g., @YourHandle)
- **Email**: Email address (displays in header meta and About section)
- **Phone**: Phone number (displays in About section on left sidebar)
- **GitHub**: GitHub profile URL
- **LinkedIn**: LinkedIn profile URL

---

## 3. Skills
- **Input**: List of skills (comma-separated or add individually)
- **Display**: Shown in left sidebar under "SKILLS" section
- **Format**: Simple text, one per line
- **Example**: HTML, CSS, JavaScript, ReactJS, Python, etc.

---

## 4. Education
- **Input**: Education entries with:
  - **Title**: School/Degree name (e.g., "Ideal Institute of Engineering | CSE")
  - **Meta**: Additional info like CGPA, graduation year, etc.
- **Display**: Listed on right side under "EDUCATION" section

---

## 5. Academic Projects
- **Input**: Project entries with:
  - **Title**: Project name
  - **Description**: Project details and technologies used
  - **Code Link**: GitHub or project repository URL
- **Display**: Can be shown in work experience or projects section

---

## 6. Strengths & Hobbies
- **Strengths**: Comma-separated list (e.g., "Problem-solving, Communication, Leadership")
- **Hobbies**: Comma-separated list (e.g., "Reading, Coding, Photography")
- **Display**: Can be used in profile summary or additional sections

---

## Modern Template Layout Preview

```
┌─────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════╗  │
│  ║  NAVY HEADER (with diagonal slant)    ║  │
│  ║  [Photo] MARK BROWN                   ║  │
│  ║          ACCOUNTANT                   ║  │
│  ╚═════════════════════════════════════╝   │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ LEFT SIDEBAR (1/3)  │ RIGHT MAIN     │   │
│  │ ─────────────────── │ (2/3)          │   │
│  │                     │                │   │
│  │ ABOUT               │ PROFILE        │   │
│  │ • Phone             │ [Summary...]   │   │
│  │ • Birthday          │                │   │
│  │ • Gender            │ WORK EXPERIENCE│   │
│  │ • Status            │ • Job 1        │   │
│  │ • Email             │ • Job 2        │   │
│  │ • Address           │                │   │
│  │                     │ EDUCATION      │   │
│  │ SKILLS              │ • Degree 1     │   │
│  │ • Skill 1 ▓▓▓░░    │ • Degree 2     │   │
│  │ • Skill 2 ▓▓▓▓░    │                │   │
│  │                     │                │   │
│  │ LANGUAGE            │                │   │
│  │ • English ▓▓▓▓▓    │                │   │
│  │ • French ▓▓░░░░   │                │   │
│  │                     │                │   │
│  │ SOFTWARE            │                │   │
│  │ • Excel ▓▓▓▓▓▓     │                │   │
│  │ • Word ▓▓▓▓░░░    │                │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## How to Use

1. **Fill all inputs** in the left sidebar of the Resume Builder
2. **Click "Modern" button** in the template selector at the top of preview
3. **Live preview** updates instantly as you type
4. **Click "Modern Template"** button to open standalone modern resume in new tab
5. **Print or export** from the standalone page

---

## Features of Modern Template

✅ Navy hero header with diagonal slant effect
✅ Profile photo display (rounded, bordered)
✅ Two-column responsive layout
✅ Left sidebar with About, Skills, Languages, Software sections
✅ Right main content with Profile, Work Experience, Education
✅ Progress bars for skill/language/software proficiency
✅ Animated entrance effects
✅ Print-friendly styling
✅ Mobile responsive (stacks to single column on small screens)
✅ Data persistence using localStorage

---

## Data Flow

```
User fills inputs in app.jsx
         ↓
Click "Modern Template" button
         ↓
Resume data saved to localStorage
         ↓
modern-template.html opens in new tab
         ↓
JavaScript reads localStorage
         ↓
Template dynamically populates with user data
         ↓
Ready to print or save as PDF
```

---

## Default Placeholder Data

If no inputs provided, the modern template shows:
- Name: MARK BROWN
- Title: ACCOUNTANT
- Phone: +1 234 567 8900
- Email: mark.brown@email.com
- And sample skills, languages, software, jobs, and education

