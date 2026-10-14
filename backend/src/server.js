require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pool = require('./config/db')
const customerRoutes = require('./routes/customerRoutes')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json({ limit: '100kb' }))

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')

    res.json({
      success: true,
      message: 'AcxiomCRM backend and MySQL are connected',
    })
  } catch (error) {
    console.error('Health check error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    })
  }
})

app.use('/api/customers', customerRoutes)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`AcxiomCRM backend running on http://localhost:${PORT}`)
})