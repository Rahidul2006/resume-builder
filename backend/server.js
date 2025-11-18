import express from 'express'
import cors from 'cors'
import PDFDocument from 'pdfkit'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))

// PDF Generation Route
app.post('/generate-pdf', (req, res) => {
  try {
    const { personal, about, skills, education, projects, strengths, hobbies, userImage, template } = req.body

    // Create PDF document
    const doc = new PDFDocument({ margin: 40, size: 'A4' })
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${personal.name.replace(/\s+/g, '_')}_Resume.pdf"`)

    // Pipe to response
    doc.pipe(res)

    // Add header
    doc.fontSize(24).font('Helvetica-Bold').text(personal.name, { align: 'center' })
    doc.fontSize(12).font('Helvetica').text(personal.handle, { align: 'center' })
    
    // Add contact info
    doc.fontSize(10)
    doc.text(`${personal.email} • ${personal.phone}`, { align: 'center' })
    doc.text(`${personal.location}`, { align: 'center' })
    if (personal.github) doc.text(`GitHub: ${personal.github}`, { align: 'center' })
    if (personal.linkedin) doc.text(`LinkedIn: ${personal.linkedin}`, { align: 'center' })
    
    doc.moveTo(50, doc.y + 10).lineTo(550, doc.y + 10).stroke()
    doc.moveDown(10)

    // About section
    if (about) {
      doc.fontSize(14).font('Helvetica-Bold').text('ABOUT', { underline: true })
      doc.fontSize(11).font('Helvetica').text(about, { align: 'justify' })
      doc.moveDown(8)
    }

    // Skills section
    if (skills && skills.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('SKILLS', { underline: true })
      doc.fontSize(11).font('Helvetica')
      const skillsText = skills.join(' • ')
      doc.text(skillsText, { align: 'justify' })
      doc.moveDown(8)
    }

    // Education section
    if (education && education.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('EDUCATION', { underline: true })
      education.forEach((ed, idx) => {
        doc.fontSize(11).font('Helvetica-Bold').text(ed.title)
        doc.fontSize(10).font('Helvetica').text(ed.meta, { color: '#666666' })
        if (idx < education.length - 1) doc.moveDown(4)
      })
      doc.moveDown(8)
    }

    // Projects section
    if (projects && projects.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('PROJECTS', { underline: true })
      projects.forEach((proj, idx) => {
        doc.fontSize(11).font('Helvetica-Bold').text(proj.title)
        doc.fontSize(10).font('Helvetica').text(proj.desc, { align: 'justify' })
        if (proj.code) doc.text(`Code: ${proj.code}`, { color: '#0066cc' })
        if (idx < projects.length - 1) doc.moveDown(4)
      })
      doc.moveDown(8)
    }

    // Strengths section
    if (strengths && strengths.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('STRENGTHS', { underline: true })
      doc.fontSize(11).font('Helvetica')
      const strengthsText = strengths.join(' • ')
      doc.text(strengthsText, { align: 'justify' })
      doc.moveDown(8)
    }

    // Hobbies section
    if (hobbies && hobbies.length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('HOBBIES', { underline: true })
      doc.fontSize(11).font('Helvetica')
      const hobbiesText = hobbies.join(' • ')
      doc.text(hobbiesText, { align: 'justify' })
    }

    doc.end()
  } catch (error) {
    console.error('PDF generation error:', error)
    res.status(500).json({ error: 'Failed to generate PDF' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend server is running' })
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
