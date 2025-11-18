export default function ModernTemplate({ personal, about, skills, education, projects, strengths, hobbies, userImage }) {
  return (
    <div className="template modern-template" style={{ marginTop: '20px', backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px' }}>
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
  )
}
