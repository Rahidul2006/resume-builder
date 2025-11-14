const { useState, useRef } = React;

function ResumeBuilder() {
  const [personal, setPersonal] = useState({
    name: "RAHIDUL KHAN",
    email: "krahidul869@gmail.com",
    phone: "+91 9832577462",
    github: "https://github.com/Rahidul2006",
    linkedin: "https://www.linkedin.com/in/rahidul-khan-6a3922269",
    handle: "@Rahidul2006",
  });

  const [skills, setSkills] = useState(["HTML", "CSS", "JavaScript", "C (programming language)"]);

  const [education, setEducation] = useState([
    {
      id: 1,
      title: "Ideal Institute of Engineering | CSE",
      meta: "CGPA: 7.175 (2024-25) — 1st year",
      details: ""
    },
    { id: 2, title: "X (WBBSE) | JKHS", meta: "60.14% | 2022", details: "" },
    { id: 3, title: "XII (WBCHSE) | VGDV", meta: "64.4% | 2024", details: "" }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "RK-Clothing",
      desc: "Front-end prototype of a clothing e-commerce platform. Focus: responsive design, intuitive navigation, interactive UI elements.",
      code: "https://github.com/Rahidul2006/RK-Clothing"
    },
    {
      id: 2,
      title: "Starbucks Homepage Clone",
      desc: "Replicated Starbucks homepage using semantic HTML and clean CSS, focusing on layout fidelity.",
      code: "https://github.com/Rahidul2006/Starbucks_homepage_Clone"
    }
  ]);

  const [strengths, setStrengths] = useState(["Problem-solving and analytical thinking", "Team collaboration & communication skills", "Quick learner and adaptable"]);
  const [hobbies, setHobbies] = useState(["Reading tech blogs", "Coding challenges", "Photography"]);

  const previewRef = useRef();

  function updatePersonal(field, value) {
    setPersonal(prev => ({ ...prev, [field]: value }));
  }

  function exportToPDF() {
    window.print();
  }

  return (
    <div className="app-root">
      <div className="layout">
        <aside className="controls">
          <h2>Edit Resume (PDF format)</h2>

          <section>
            <h3>Personal</h3>
            <div className="field-list">
              <input value={personal.name} onChange={e => updatePersonal('name', e.target.value)} />
              <input value={personal.handle} onChange={e => updatePersonal('handle', e.target.value)} />
              <input value={personal.email} onChange={e => updatePersonal('email', e.target.value)} />
              <input value={personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
              <input value={personal.github} onChange={e => updatePersonal('github', e.target.value)} />
              <input value={personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
            </div>
          </section>

          <section>
            <h3>Skills</h3>
            <div className="field-list">
              {skills.map((s, i) => (
                <div key={i} className="skill-row">
                  <input value={s} onChange={e => setSkills(prev => prev.map((x, idx) => idx === i ? e.target.value : x))} />
                  <button onClick={() => setSkills(prev => prev.filter((_, idx) => idx !== i))}>x</button>
                </div>
              ))}
              <div className="controls-row">
                <button onClick={() => setSkills(prev => [...prev, 'New Skill'])}>Add Skill</button>
                <button onClick={() => setSkills([])}>Clear</button>
              </div>
            </div>
          </section>

          <section>
            <h3>Education</h3>
            <div className="field-list">
              {education.map((ed, i) => (
                <div key={ed.id} className="edu-row">
                  <input value={ed.title} onChange={e => setEducation(prev => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
                  <input value={ed.meta} onChange={e => setEducation(prev => prev.map((x, idx) => idx === i ? { ...x, meta: e.target.value } : x))} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3>Academic Projects</h3>
            <div className="field-list">
              {projects.map((p, i) => (
                <div key={p.id} className="proj-row">
                  <input value={p.title} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
                  <textarea value={p.desc} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} />
                  <input value={p.code} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, code: e.target.value } : x))} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3>Strengths & Hobbies</h3>
            <label>Strengths (comma separated)</label>
            <input value={strengths.join(', ')} onChange={e => setStrengths(e.target.value.split(',').map(s => s.trim()))} />
            <label>Hobbies (comma separated)</label>
            <input value={hobbies.join(', ')} onChange={e => setHobbies(e.target.value.split(',').map(s => s.trim()))} />
          </section>

          <div className="bottom-buttons">
            <button onClick={exportToPDF}>Export / Print</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
          </div>
        </aside>

        <main className="preview" ref={previewRef}>
          <div className="resume">
            <header className="resume-header">
              <h1>{personal.name}</h1>
              <div className="header-meta">
                <div>{personal.email} • {personal.phone}</div>
                <div className="links">
                  <div>{personal.handle}</div>
                  <div><a href={personal.github} target="_blank" rel="noreferrer">{personal.github}</a></div>
                  <div><a href={personal.linkedin} target="_blank" rel="noreferrer">{personal.linkedin}</a></div>
                </div>
              </div>
            </header>

            <hr />

            <section>
              <h4>SKILLS</h4>
              <ul>
                {skills.map((s, i) => (<li key={i}>❖ {s}</li>))}
              </ul>
            </section>

            <section>
              <h4>EDUCATION</h4>
              <ul>
                {education.map(ed => (
                  <li key={ed.id}>
                    <div>❖ <strong>{ed.title}</strong></div>
                    <div className="muted">{ed.meta}</div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4>ACADEMIC PROJECTS</h4>
              {projects.map(p => (
                <div key={p.id} className="project">
                  <div>❖ <strong>Project: {p.title}</strong></div>
                  <div className="muted">{p.desc}</div>
                  {p.code && <div className="code-link"><a href={p.code} target="_blank" rel="noreferrer">CODE: {p.code}</a></div>}
                </div>
              ))}
            </section>

            <section>
              <h4>STRENGTHS</h4>
              <ul>
                {strengths.map((s, i) => <li key={i}>❖ {s}</li>)}
              </ul>
            </section>

            <section>
              <h4>HOBBIES & INTERESTS</h4>
              <ul>
                {hobbies.map((h, i) => <li key={i}>❖ {h}</li>)}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ResumeBuilder />);
