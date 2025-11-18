export default function CorporateTemplate({ personal, about, skills, education, projects, strengths, hobbies, userImage }) {
  return (
    <div className="template corporate-template">
      <header className="resume-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
          {userImage && <img src={userImage} alt="user" style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />}
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
            <a href={personal.github} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc', fontSize: '20px' }}>
              <i className="fab fa-github"></i>
            </a>
          )}
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc', fontSize: '20px' }}>
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
        <h4>PROJECTS</h4>
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
  )
}
