import '../styles/Sidebar.css'

export default function Sidebar({
  personal, about, skills, education, projects, strengths, hobbies, userImage,
  updatePersonal, setAbout, setSkills, setEducation, setProjects, setStrengths, setHobbies,
  handleImageUpload, clearImage, exportToPDF, isExporting, exportProgress
}) {
  return (
    <aside className="sidebar">
      <h2>Edit Resume</h2>

      <section>
        <h3>Photo/Avatar</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {userImage && (
          <>
            <img src={userImage} alt="preview" className="image-preview" />
            <button onClick={clearImage} className="btn-remove">Remove Photo</button>
          </>
        )}
      </section>

      <section>
        <h3>Personal</h3>
        <input placeholder="Name" value={personal.name} onChange={e => updatePersonal('name', e.target.value)} />
        <input placeholder="Handle" value={personal.handle} onChange={e => updatePersonal('handle', e.target.value)} />
        <input placeholder="Email" value={personal.email} onChange={e => updatePersonal('email', e.target.value)} />
        <input placeholder="Phone" value={personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
        <input placeholder="Birth Date" value={personal.birthDate} onChange={e => updatePersonal('birthDate', e.target.value)} />
        <input placeholder="Marital Status" value={personal.maritalStatus} onChange={e => updatePersonal('maritalStatus', e.target.value)} />
        <input placeholder="Location" value={personal.location} onChange={e => updatePersonal('location', e.target.value)} />
        <input placeholder="GitHub URL" value={personal.github} onChange={e => updatePersonal('github', e.target.value)} />
        <input placeholder="LinkedIn URL" value={personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} />
      </section>

      <section>
        <h3>About</h3>
        <textarea placeholder="Write a brief professional summary" value={about} onChange={e => setAbout(e.target.value)} style={{minHeight: '100px'}} />
      </section>

      <section>
        <h3>Skills</h3>
        {skills.map((s, i) => (
          <div key={i} className="field-row">
            <input value={s} onChange={e => setSkills(prev => prev.map((x, idx) => idx === i ? e.target.value : x))} />
            <button onClick={() => setSkills(prev => prev.filter((_, idx) => idx !== i))}>x</button>
          </div>
        ))}
        <button onClick={() => setSkills(prev => [...prev, 'New Skill'])}>Add Skill</button>
      </section>

      <section>
        <h3>Education</h3>
        {education.map((ed, i) => (
          <div key={ed.id}>
            <input value={ed.title} onChange={e => setEducation(prev => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
            <input value={ed.meta} onChange={e => setEducation(prev => prev.map((x, idx) => idx === i ? { ...x, meta: e.target.value } : x))} />
          </div>
        ))}
      </section>

      <section>
        <h3>Projects</h3>
        {projects.map((p, i) => (
          <div key={p.id}>
            <input value={p.title} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
            <textarea value={p.desc} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} />
            <input value={p.code} onChange={e => setProjects(prev => prev.map((x, idx) => idx === i ? { ...x, code: e.target.value } : x))} />
          </div>
        ))}
      </section>

      <section>
        <h3>Strengths & Hobbies</h3>
        <label>Strengths (comma separated)</label>
        <textarea value={strengths.join(', ')} onChange={e => setStrengths(e.target.value.split(',').map(s => s.trim()))} />
        <label>Hobbies (comma separated)</label>
        <textarea value={hobbies.join(', ')} onChange={e => setHobbies(e.target.value.split(',').map(s => s.trim()))} />
      </section>

      <div className="export-buttons">
        <button 
          onClick={exportToPDF} 
          className="btn-export btn-pdf"
          disabled={isExporting}
        >
          📄 Export PDF
        </button>
        
        {isExporting && (
          <div className="export-modal">
            <div className="export-modal-content">
              <div className="export-spinner"></div>
              <p className="export-status">{exportProgress}</p>
            </div>
          </div>
        )}
        
        {!isExporting && exportProgress && (
          <div className="export-message">{exportProgress}</div>
        )}
      </div>
    </aside>
  )
}
