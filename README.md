Resume Buildee — Demo

What this is
- A small, self-contained demo of a Resume Builder React component (JSX) exported as a browser demo using CDN React + Babel.
- Files in this folder:
  - `index.html` — demo page that loads `app.jsx` via Babel in the browser.
  - `app.jsx` — main React component (ResumeBuilder) built to run in the browser.
  - `styles.css` — minimal stylesheet for layout and print styles.
  - `server.js` — tiny Node static server to serve files locally.
  - `package.json` — contains `npm run vdev` to start the server.
  - `tempCodeRunnerFile_backup.jsx` — backup of the original JSX source.

Removed / cleaned files
- `tempCodeRunnerFile.javascript` was a leftover file containing JSX which caused errors when accidentally executed with `node`. It has been removed to avoid accidental runtime errors. The original content is preserved in `tempCodeRunnerFile_backup.jsx`.

How to run
- Quick (open file):
  - Double-click `index.html` or open it with your browser.
- Recommended (serve locally so links and module-like behavior work reliably):
  1. Open PowerShell in this project folder.
  2. Run the dev server:

  ``` 
  npm run dev 
  
  ```

  3. Open http://localhost:3000 in your browser.

Notes
- This demo uses Babel in the browser (development convenience). For production or development, convert to a proper React build (Vite / CRA) and install dependencies.
- If you want me to convert this into a full create-react-app / Vite project (with Tailwind), I can scaffold that and add build scripts.

Contact
- If anything doesn't start, tell me the exact terminal output and I'll fix it.
