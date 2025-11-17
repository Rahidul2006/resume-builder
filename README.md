# Resume Builder

**Resume Builder** — a fast, easy, and customizable web app to create professional resumes/CVs using templates and AI-assisted content suggestions.

> Build a resume in minutes, export to PDF, and customize templates to match your style.

## Files in this folder:
  - `index.html` — demo page that loads `app.jsx` via Babel in the browser.
  - `app.jsx` — main React component (ResumeBuilder) built to run in the browser.
  - `styles.css` — minimal stylesheet for layout and print styles.
  - `server.js` — tiny Node static server to serve files locally.
  - `package.json` — contains `npm run vdev` to start the server.
  - `tempCodeRunnerFile_backup.jsx` — backup of the original JSX source.


## 🛠️ Tech Stack

- Frontend: React  
- Styling: Tailwind CSS ,CSS3


---

## 🔧 Local Setup

> Update these commands to match your project (npm / pnpm / yarn)

```bash
# clone repo
git clone https://github.com/<your-username>/resume-builder.git
cd resume-builder

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




