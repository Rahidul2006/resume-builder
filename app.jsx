const { useState, useRef, useEffect } = React;

function ResumeBuilder() {
  const [template, setTemplate] = useState('corporate');
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

  const [about, setAbout] = useState("Professional with strong expertise in various domains. Dedicated to delivering quality work and achieving organizational goals. Excellent problem-solving abilities and communication skills.");

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
  const [exportMessage, setExportMessage] = useState('');

  const previewRef = useRef();

  function updatePersonal(field, value) {
    setPersonal(prev => ({ ...prev, [field]: value }));
  }

  // Functional PDF Export using HTML to Canvas to PDF
  function exportToPDF() {
    const element = document.getElementById('resume-preview');
    if (!element) {
      alert('Resume preview not found');
      return;
    }

    // Show loading message
    setExportMessage('Generating PDF...');

    // Create a canvas from the resume content
    const opt = {
      margin: 10,
      filename: `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    // Use html2pdf library if available, otherwise use print
    if (typeof html2pdf !== 'undefined') {
      html2pdf().set(opt).from(element).save();
      setExportMessage('PDF exported successfully!');
      setTimeout(() => setExportMessage(''), 3000);
    } else {
      // Fallback to print method
      const templateSelector = document.querySelector('.template-selector');
      if (templateSelector) templateSelector.style.display = 'none';
      
      const controls = document.querySelector('.controls');
      if (controls) controls.style.display = 'none';
      
      window.print();
      
      setTimeout(() => {
        if (templateSelector) templateSelector.style.display = 'block';
        if (controls) controls.style.display = 'block';
        setExportMessage('Please save as PDF in the print dialog');
        setTimeout(() => setExportMessage(''), 3000);
      }, 500);
    }
  }

  // Enhanced export functions using JavaScript
  function exportAsJSON() {
    const resumeData = {
      personal,
      about,
      skills,
      education,
      projects,
      strengths,
      hobbies,
      userImage,
      template,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportMessage('Resume exported as JSON!');
    setTimeout(() => setExportMessage(''), 3000);
  }

  function exportAsHTML() {
    const htmlContent = generateHTMLResume();
    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(htmlBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportMessage('Resume exported as HTML!');
    setTimeout(() => setExportMessage(''), 3000);
  }

  function generateHTMLResume() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${personal.name} - Resume</title>
  <link href="https://cdn.tailwindcss.com" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    @media print { body { margin: 0; padding: 10px; } }
  </style>
</head>
<body class="p-8 max-w-4xl mx-auto bg-white">
  <header style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px;">
    <div>
      <h1 style="margin: 0; font-size: 32px; font-weight: bold;">${personal.name}</h1>
      <p style="margin: 5px 0; color: #666;">${personal.handle}</p>
    </div>
    <div style="text-align: right; font-size: 14px;">
      <div>${personal.email}</div>
      <div>${personal.phone}</div>
      <div>${personal.location}</div>
      ${personal.github ? `<a href="${personal.github}" style="color: #0066cc; text-decoration: none;">GitHub</a>` : ''}
      ${personal.linkedin ? `<div><a href="${personal.linkedin}" style="color: #0066cc; text-decoration: none;">LinkedIn</a></div>` : ''}
    </div>
  </header>

  ${about ? `
  <section style="margin-bottom: 20px;">
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 10px;">ABOUT</h2>
    <p style="color: #555; line-height: 1.6;">${about}</p>
  </section>
  ` : ''}

  ${skills && skills.length > 0 ? `
  <section style="margin-bottom: 20px;">
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 10px;">SKILLS</h2>
    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
      ${skills.map(s => `<span style="background: #e5e7eb; padding: 5px 12px; border-radius: 4px; font-size: 14px;">${s}</span>`).join('')}
    </div>
  </section>
  ` : ''}

  ${education && education.length > 0 ? `
  <section style="margin-bottom: 20px;">
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 10px;">EDUCATION</h2>
    ${education.map(ed => `
      <div style="margin-bottom: 10px;">
        <div style="font-weight: bold;">${ed.title}</div>
        <div style="color: #666; font-size: 14px;">${ed.meta}</div>
      </div>
    `).join('')}
  </section>
  ` : ''}

  ${projects && projects.length > 0 ? `
  <section style="margin-bottom: 20px;">
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 10px;">PROJECTS</h2>
    ${projects.map(p => `
      <div style="margin-bottom: 10px;">
        <div style="font-weight: bold;">${p.title}</div>
        <div style="color: #666; font-size: 14px;">${p.desc}</div>
        ${p.code ? `<div style="font-size: 12px;"><a href="${p.code}" style="color: #0066cc; text-decoration: none;">Code: ${p.code}</a></div>` : ''}
      </div>
    `).join('')}
  </section>
  ` : ''}

  ${strengths && strengths.length > 0 ? `
  <section style="margin-bottom: 20px;">
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 10px;">STRENGTHS</h2>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
      ${strengths.map(s => `<li>${s}</li>`).join('')}
    </ul>
  </section>
  ` : ''}

  ${hobbies && hobbies.length > 0 ? `
  <section>
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 10px;">HOBBIES</h2>
    <p style="color: #666;">${hobbies.join(', ')}</p>
  </section>
  ` : ''}
</body>
</html>
    `;
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
            <h3>About</h3>
            <div className="field-list">
              <textarea placeholder="Write a brief professional summary about yourself" value={about} onChange={e => setAbout(e.target.value)} style={{minHeight: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', fontFamily: 'inherit'}} />
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
            <button onClick={exportToPDF} style={{backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '8px', width: '100%'}}>📄 Export as PDF</button>
            <button onClick={exportAsHTML} style={{backgroundColor: '#8b5cf6', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '8px', width: '100%'}}>🌐 Export as HTML</button>
            <button onClick={exportAsJSON} style={{backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '8px', width: '100%'}}>💾 Export as JSON</button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{backgroundColor: '#6b7280', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', width: '100%'}}>⬆️ Top</button>
            {exportMessage && <div style={{marginTop: '12px', padding: '10px', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px', fontSize: '12px', textAlign: 'center'}}>{exportMessage}</div>}
          </div>
        </aside>

        <main className="preview" ref={previewRef} id="resume-preview">
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
              <header className="resume-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                  {userImage && <img src={userImage} alt="user" />}
                  <div>
                    <h1>{personal.name}</h1>
                    <div className="header-meta">
                      <div>{personal.email} • {personal.phone}</div>
                      <div className="links">
                        <div>{personal.handle}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '5px' }}>
                  {personal.github && (
                    <a href={personal.github} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc', fontSize: '20px', title: 'GitHub' }}>
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {personal.linkedin && (
                    <a href={personal.linkedin} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc', fontSize: '20px', title: 'LinkedIn' }}>
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                </div>
              </header>

              <hr />

              <section>
                <h4>ABOUT</h4>
                <p style={{color: '#555', lineHeight: '1.6', margin: '0'}}>{about}</p>
              </section>

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
                        {about}
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
