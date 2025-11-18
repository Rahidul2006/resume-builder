export default function MinimalTemplate({ personal, about, skills, education, projects, strengths, hobbies, userImage }) {
  return (
    <div className="template minimal-template" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', fontFamily: "'Poppins', sans-serif" }}>
      <header style={{ display: 'flex', gap: '30px', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px' }}>
        {userImage && <img src={userImage} alt="profile" style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />}
        <div>
          <h1 style={{ margin: '0', fontSize: '32px', fontWeight: 'bold' }}>{personal.name}</h1>
          <p style={{ margin: '5px 0', color: '#666' }}>{personal.handle}</p>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {personal.email} • {personal.phone} • {personal.location}
          </div>
        </div>
      </header>

      {about && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '12px' }}>ABOUT</h2>
          <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#555' }}>{about}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '12px' }}>SKILLS</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ backgroundColor: '#e5e7eb', padding: '5px 12px', borderRadius: '4px', fontSize: '12px' }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '12px' }}>EDUCATION</h2>
          {education.map(ed => (
            <div key={ed.id} style={{ marginBottom: '12px', fontSize: '13px' }}>
              <strong>{ed.title}</strong>
              <div style={{ color: '#666', fontSize: '12px' }}>{ed.meta}</div>
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '12px' }}>PROJECTS</h2>
          {projects.map(p => (
            <div key={p.id} style={{ marginBottom: '12px', fontSize: '13px' }}>
              <strong>{p.title}</strong>
              <div style={{ color: '#666', fontSize: '12px', marginTop: '4px' }}>{p.desc}</div>
              {p.code && <a href={p.code} target="_blank" rel="noreferrer" style={{ color: '#0066cc', fontSize: '11px', textDecoration: 'none' }}>Code: {p.code}</a>}
            </div>
          ))}
        </section>
      )}

      {strengths && strengths.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '12px' }}>STRENGTHS</h2>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.8' }}>
            {strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      )}

      {hobbies && hobbies.length > 0 && (
        <section>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '12px' }}>HOBBIES</h2>
          <p style={{ fontSize: '13px', color: '#555' }}>{hobbies.join(', ')}</p>
        </section>
      )}
    </div>
  )
}
