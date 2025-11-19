import { useState, useRef } from 'react'
import CorporateTemplate from '../components/CorporateTemplate'
import ModernTemplate from '../components/ModernTemplate'
import MinimalTemplate from '../components/MinimalTemplate'
import Sidebar from '../components/Sidebar'
import '../styles/ResumeBuilder.css'

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('corporate')
  const [userImage, setUserImage] = useState(null)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState('')
  const previewRef = useRef()

  const [personal, setPersonal] = useState({
    name: "RAHIDUL KHAN",
    email: "krahidul869@gmail.com",
    phone: "+91 98******62",
    github: "https://github.com/Rahidul2006",
    linkedin: "https://www.linkedin.com/in/rahidul-khan-6a3922269",
    handle: "@Rahidul2006",
    birthDate: "01/09/2006",
    maritalStatus: "Single",
    location: "Kolkata, India",
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

  // Export to PDF via backend with Puppeteer
  const exportToPDF = async () => {
    try {
      setIsExporting(true)
      setExportProgress('⏳ Preparing your resume...')
      
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

      setExportProgress('📤 Sending to server...')

      const response = await fetch('/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resumeData)
      })

      if (!response.ok) {
        let errorMessage = 'Failed to generate PDF'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch (e) {
          // Response is not JSON, use default message
        }
        throw new Error(errorMessage)
      }

      setExportProgress('🔄 Generating PDF...')

      // Create download link
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`)
      document.body.appendChild(link)
      
      setExportProgress('💾 Downloading...')
      
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      setExportProgress('✅ Download Complete!')
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress('')
      }, 2000)
    } catch (error) {
      console.error('Error generating PDF:', error)
      setExportProgress(`❌ Error: ${error.message}`)
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress('')
      }, 3000)
    }
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
        isExporting={isExporting}
        exportProgress={exportProgress}
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
