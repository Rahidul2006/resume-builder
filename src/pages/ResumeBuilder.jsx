import { useState, useRef } from 'react'
import axios from 'axios'
import CorporateTemplate from '../components/CorporateTemplate'
import ModernTemplate from '../components/ModernTemplate'
import MinimalTemplate from '../components/MinimalTemplate'
import Sidebar from '../components/Sidebar'
import '../styles/ResumeBuilder.css'

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('corporate')
  const [userImage, setUserImage] = useState(null)
  const [exportMessage, setExportMessage] = useState('')
  const previewRef = useRef()

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
  })

  const [about, setAbout] = useState("Professional with strong expertise in various domains. Dedicated to delivering quality work and achieving organizational goals. Excellent problem-solving abilities and communication skills.")

  const [skills, setSkills] = useState(["HTML", "CSS", "JavaScript", "ReactJS", "TailwindCSS", "Python", "C (programming language)"])

  const [education, setEducation] = useState([
    {
      id: 1,
      title: "Ideal Institute of Engineering | CSE",
      meta: "CGPA: **.** (2024-25) — 1st year",
    },
    { id: 2, title: "X (WBBSE) | JKHS", meta: "**.**% | 2022" },
    { id: 3, title: "XII (WBCHSE) | VGDV", meta: "**.**% | 2024" }
  ])

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "RK-Clothing",
      desc: "Front-end prototype of a clothing e-commerce platform.",
      code: "https://github.com/Rahidul2006/RK-Clothing"
    },
    {
      id: 2,
      title: "Resume Builder App",
      desc: "A web application for creating and customizing resumes.",
      code: "https://github.com/Rahidul2006/resume-builder.git"
    }
  ])

  const [strengths, setStrengths] = useState(["Problem-solving and analytical thinking", "Team collaboration & communication skills", "Quick learner and adaptable"])
  const [hobbies, setHobbies] = useState(["Reading tech blogs", "Coding challenges", "Photography"])

  const updatePersonal = (field, value) => {
    setPersonal(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setUserImage(null)
  }

  // Export to PDF via backend
  const exportToPDF = async () => {
    try {
      setExportMessage('Generating PDF...')
      
      const resumeData = {
        personal,
        about,
        skills,
        education,
        projects,
        strengths,
        hobbies,
        userImage,
        template
      }

      const response = await axios.post('/api/generate-pdf', resumeData, {
        responseType: 'blob'
      })

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      setExportMessage('PDF exported successfully!')
      setTimeout(() => setExportMessage(''), 3000)
    } catch (error) {
      console.error('Error generating PDF:', error)
      setExportMessage('Error generating PDF. Please try again.')
      setTimeout(() => setExportMessage(''), 3000)
    }
  }

  const exportAsHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${personal.name} - Resume</title>
  <link href="https://cdn.tailwindcss.com" rel="stylesheet">
</head>
<body class="p-8 max-w-4xl mx-auto bg-white">
  <header style="border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px;">
    <h1 style="margin: 0; font-size: 32px; font-weight: bold;">${personal.name}</h1>
    <p style="margin: 5px 0; color: #666;">${personal.email} • ${personal.phone}</p>
  </header>
  <section style="margin-bottom: 20px;">
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px;">ABOUT</h2>
    <p>${about}</p>
  </section>
  <section style="margin-bottom: 20px;">
    <h2 style="font-size: 18px; font-weight: bold; border-bottom: 2px solid #333; padding-bottom: 8px;">SKILLS</h2>
    <p>${skills.join(', ')}</p>
  </section>
</body>
</html>
    `
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    setExportMessage('HTML exported successfully!')
    setTimeout(() => setExportMessage(''), 3000)
  }

  const exportAsJSON = () => {
    const data = { personal, about, skills, education, projects, strengths, hobbies, userImage }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${personal.name.replace(/\s+/g, '_')}_Resume.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    setExportMessage('JSON exported successfully!')
    setTimeout(() => setExportMessage(''), 3000)
  }

  const renderTemplate = () => {
    switch(template) {
      case 'modern':
        return <ModernTemplate personal={personal} about={about} skills={skills} education={education} projects={projects} strengths={strengths} hobbies={hobbies} userImage={userImage} />
      case 'minimal':
        return <MinimalTemplate personal={personal} about={about} skills={skills} education={education} projects={projects} strengths={strengths} hobbies={hobbies} userImage={userImage} />
      default:
        return <CorporateTemplate personal={personal} about={about} skills={skills} education={education} projects={projects} strengths={strengths} hobbies={hobbies} userImage={userImage} />
    }
  }

  return (
    <div className="resume-builder-container">
      <Sidebar
        personal={personal}
        about={about}
        skills={skills}
        education={education}
        projects={projects}
        strengths={strengths}
        hobbies={hobbies}
        userImage={userImage}
        updatePersonal={updatePersonal}
        setAbout={setAbout}
        setSkills={setSkills}
        setEducation={setEducation}
        setProjects={setProjects}
        setStrengths={setStrengths}
        setHobbies={setHobbies}
        handleImageUpload={handleImageUpload}
        clearImage={clearImage}
        exportToPDF={exportToPDF}
        exportAsHTML={exportAsHTML}
        exportAsJSON={exportAsJSON}
        exportMessage={exportMessage}
      />
      <main className="preview" ref={previewRef} id="resume-preview">
        <div className="template-selector">
          <button className={`template-btn ${template === 'corporate' ? 'active' : ''}`} onClick={() => setTemplate('corporate')}>
            <span>Corporate</span>
          </button>
          <button className={`template-btn ${template === 'modern' ? 'active' : ''}`} onClick={() => setTemplate('modern')}>
            <span>Modern</span>
          </button>
          <button className={`template-btn ${template === 'minimal' ? 'active' : ''}`} onClick={() => setTemplate('minimal')}>
            <span>Minimal</span>
          </button>
        </div>
        {renderTemplate()}
      </main>
    </div>
  )
}
