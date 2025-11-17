const { useState, useRef } = React;

function ResumeBuilder() {
  const [template, setTemplate] = useState('corporate'); // 'corporate', 'modern', 'classic', 'minimal'
  const [userImage, setUserImage] = useState(null);

  const [personal, setPersonal] = useState({
    name: "RAHIDUL KHAN",
    email: "krahidul869@gmail.com",
    phone: "+91 9832577462",
    github: "https://github.com/Rahidul2006",
    linkedin: "https://www.linkedin.com/in/rahidul-khan-6a3922269",
    handle: "@Rahidul2006",
    birthDate: "01/15/1990",
    maritalStatus: "Single",
    location: "New York, USA",
  });

  const [skills, setSkills] = useState(["HTML", "CSS", "JavaScript","ReactJS","TailwindCSS","Python", "C (programming language)"]);

  const [education, setEducation] = useState([
    {
      id: 1,
      title: "Ideal Institute of Engineering | CSE",
      meta: "CGPA: **.** (2024-25) — 1st year",
      details: ""
    },
    { id: 2, title: "X (WBBSE) | JKHS", meta: "**.**% | 2022", details: "" },
    { id: 3, title: "XII (WBCHSE) | VGDV", meta: "**.**% | 2024", details: "" }
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
      title: "Resume Builder App",
      desc: "A web application that allows users to create and customize their resumes easily with a live preview feature.",
      code: "https://github.com/Rahidul2006/resume-builder.git"
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

  function exportCorporateTemplate() {
    // Store user data in localStorage so corporate-template.html can access it
    localStorage.setItem('resumeData', JSON.stringify({
      personal,
      skills,
      education,
      projects,
      strengths,
      hobbies,
      userImage
    }));
    // Open corporate template in new tab
    window.open('corporate-template.html', '_blank');
  }

  function exportModernTemplate() {
    // Store user data in localStorage so modern-template.html can access it
    localStorage.setItem('resumeData', JSON.stringify({
      personal,
      skills,
      education,
      projects,
      strengths,
      hobbies,
      userImage
    }));
    // Open modern template in new tab
    window.open('modern-template.html', '_blank');
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function clearImage() {
    setUserImage(null);
  }

  return (
    <div className="app-root">
      <div className="layout">
        <aside className="controls">
          <h2>Edit Resume (PDF format)</h2>

          <section>
            <h3>Photo/Avatar</h3>
            <div className="field-list">
              <div style={{marginBottom:'8px'}}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{fontSize:'12px'}} />
              </div>
              {userImage && (
                <>
                  <img src={userImage} alt="preview" style={{width:'100%', height:'auto', borderRadius:'6px', marginBottom:'8px'}} />
                  <button onClick={clearImage} style={{width:'100%', padding:'6px', background:'#ef4444', color:'#fff', border:'none', borderRadius:'6px', cursor:'pointer'}}>Remove Photo</button>
                </>
              )}
            </div>
          </section>

          <section>
            <h3>Personal</h3>
            <div className="field-list">
              <input placeholder="Name" value={personal.name} onChange={e => updatePersonal('name', e.target.value)} />
              <input placeholder="Handle" value={personal.handle} onChange={e => updatePersonal('handle', e.target.value)} />
              <input placeholder="Email" value={personal.email} onChange={e => updatePersonal('email', e.target.value)} />
              <input placeholder="Phone" value={personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
              <input placeholder="Birth Date (MM/DD/YYYY)" value={personal.birthDate} onChange={e => updatePersonal('birthDate', e.target.value)} />
              <input placeholder="Marital Status" value={personal.maritalStatus} onChange={e => updatePersonal('maritalStatus', e.target.value)} />
              <input placeholder="Location" value={personal.location} onChange={e => updatePersonal('location', e.target.value)} />
              <input placeholder="GitHub URL" value={personal.github} onChange={e => updatePersonal('github', e.target.value)} />
              <input placeholder="LinkedIn URL" value={personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
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
            <button onClick={exportCorporateTemplate}>Corporate Template</button>
            <button onClick={exportModernTemplate}>Modern Template</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
          </div>
        </aside>

        <main className="preview" ref={previewRef}>
          <div className="template-selector">
            <button 
              className={`template-btn ${template === 'corporate' ? 'active' : ''}`}
              onClick={() => setTemplate('corporate')}
            >
              <span className="template-label">Corporate</span>
            </button>
            <button 
              className={`template-btn ${template === 'modern' ? 'active' : ''}`}
              onClick={() => setTemplate('modern')}
            >
              <span className="template-label">Modern</span>
            </button>
         
            <button 
              className={`template-btn ${template === 'minimal' ? 'active' : ''}`}
              onClick={() => setTemplate('minimal')}
            >
              <span className="template-label">Minimal</span>
            </button>
          </div>
          
          {/* HIDE OLD TEMPLATES WHEN MODERN IS SELECTED */}
          {template !== 'modern' && (
            <div className={`resume template-${template}`}>
              <header className="resume-header">
                {userImage && <img src={userImage} alt="user" />}
                <div>
                  <h1>{personal.name}</h1>
                  <div className="header-meta">
                    <div>{personal.email} • {personal.phone}</div>
                    <div className="links">
                      <div>{personal.handle}</div>
                      <div><a href={personal.github} target="_blank" rel="noreferrer">{personal.github}</a></div>
                      <div><a href={personal.linkedin} target="_blank" rel="noreferrer">{personal.linkedin}</a></div>
                    </div>
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
          )}

          {/* MODERN TEMPLATE INLINE PREVIEW - SHOWS WHEN MODERN IS SELECTED */}
          {template === 'modern' && (
            <div style={{ marginTop: '20px', backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px' }}>
              <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '0' }}>
                {/* HERO HEADER */}
                <div style={{ background: '#0b3860', color: 'white', padding: '40px 20px', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
                  <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {userImage && <img src={userImage} alt="profile" style={{ width: '120px', height: '120px', borderRadius: '12px', border: '4px solid white', objectFit: 'cover' }} />}
                    <div>
                      <h1 style={{ fontSize: '48px', margin: '0', fontWeight: 'bold', textTransform: 'uppercase', color: 'white' }}>{personal.name}</h1>
                      <p style={{ fontSize: '18px', color: '#b0c4e8', marginTop: '8px', letterSpacing: '2px' }}>{personal.handle}</p>
                    </div>
                  </div>
                </div>

                {/* MAIN CONTENT */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
                  {/* LEFT SIDEBAR */}
                  <div>
                    {/* ABOUT */}
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #0b3860', paddingBottom: '8px', marginBottom: '15px', color: '#1f2937' }}>👤 ABOUT</h3>
                      <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.8' }}>
                        <div><strong>Phone:</strong> {personal.phone}</div>
                        <div><strong>Birth Date:</strong> {personal.birthDate}</div>
                        <div><strong>Status:</strong> {personal.maritalStatus}</div>
                        <div><strong>Email:</strong> {personal.email}</div>
                        <div><strong>Location:</strong> {personal.location}</div>
                      </div>
                    </div>

                    {/* SKILLS */}
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #0b3860', paddingBottom: '8px', marginBottom: '15px', color: '#1f2937' }}>⭐ SKILLS</h3>
                      <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.8' }}>
                        {skills.map((s, i) => <div key={i}>▸ {s}</div>)}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT MAIN CONTENT */}
                  <div>
                    {/* PROFILE */}
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #0b3860', paddingBottom: '8px', marginBottom: '15px', color: '#1f2937' }}>💼 PROFILE</h3>
                      <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', marginBottom: '0' }}>
                        Professional with strong expertise in various domains. Dedicated to delivering quality work and achieving organizational goals. Excellent problem-solving abilities and communication skills.
                      </p>
                    </div>

                    {/* EDUCATION */}
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #0b3860', paddingBottom: '8px', marginBottom: '15px', color: '#1f2937' }}>🎓 EDUCATION</h3>
                      {education.map(ed => (
                        <div key={ed.id} style={{ marginBottom: '12px', fontSize: '13px', color: '#4b5563' }}>
                          <strong>{ed.title}</strong>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{ed.meta}</div>
                        </div>
                      ))}
                    </div>

                    {/* PROJECTS */}
                    <div style={{ marginBottom: '30px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #0b3860', paddingBottom: '8px', marginBottom: '15px', color: '#1f2937' }}>🚀 PROJECTS</h3>
                      {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '16px', fontSize: '13px', color: '#4b5563' }}>
                          <strong>{proj.title}</strong>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', lineHeight: '1.5' }}>{proj.desc}</div>
                          {proj.code && (
                            <div style={{ fontSize: '12px', marginTop: '6px' }}>
                              <a href={proj.code} target="_blank" rel="noreferrer" style={{ color: '#0b3860', textDecoration: 'none', fontWeight: '500' }}>
                                CODE: {proj.code}
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ResumeBuilder />);
