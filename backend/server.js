import express from 'express'
import cors from 'cors'
import { exportToPDF } from './routes/export.js'

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Routes
app.post('/export', exportToPDF)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend server is running' })
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})

