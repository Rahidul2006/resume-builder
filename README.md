# Resume Builder

**Resume Builder** — a fast, easy, and customizable web app to create professional resumes/CVs using templates and AI-assisted content suggestions.

> Build a resume in minutes, export to PDF, and customize templates to match your style.

## Features

* Responsive resume templates (Corporate / Modern / Minimal)
* Live preview of resume content
* Export to PDF (client-side or server-side)

## Folder structure

```
/ (project root)
├─ backend/                # Backend code (Express + Puppeteer)
├─ public/                 # static assets (images, fonts)
├─ src/                    # frontend source
├─ corporate-template.html
├─ modern-template.html
├─ minimal-resume.html
├─ index.html
└─ README.md
```

## Requirements

* Node.js (v16+)
* npm

## Quick setup

```bash
git clone https://github.com/Rahidul2006/resume-builder.git
cd resume-builder
npm install
```



## Export to PDF

Two options:

### A — Client-side (quick)

Add html2pdf and call it on the preview container. Good for quick downloads.

### B — Server-side (high fidelity)

Use Puppeteer in `backend/` to render HTML and generate an A4 PDF with `printBackground: true`.

## Templates

Edit the HTML template files in the repo to change layout and placeholders.

## 🛠️ Tech Stack

- Frontend: React  
- Styling: Tailwind CSS ,CSS3


---

## 🔧 Local Setup

> Update these commands to match your project (npm / pnpm / yarn)

```bash

# install deps
npm install

# run dev server
npm run dev

# build for production
npm run build
```

 ## Recommended (serve locally so links and module-like behavior work reliably):
  1. Open PowerShell in this project folder.
  2. Run the dev server:

  ``` 
  npm run dev 
  
  ```

  3. Open http://localhost:3000 in your browser.
## 🧩 Usage

Open the app in your browser (http://localhost:3000 or shown by your dev server).

Choose a template.

Edit sections: Contact, Summary, Experience, Education, Skills, Projects.

Use “Export → PDF” to download your resume.





