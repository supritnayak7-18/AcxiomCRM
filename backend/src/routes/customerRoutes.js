const express = require('express')
const pool = require('../config/db')

const router = express.Router()

// GET /api/customers
router.get('/', async (req, res) => {
  try {
    const search = String(req.query.search || '').trim()

    const [customers] = await pool.execute(
      `SELECT customer_id, customer_code, customer_name,
              email, phone, company_name, city, state, status,
              created_at
       FROM customers
       WHERE customer_name LIKE ?
          OR email LIKE ?
          OR phone LIKE ?
          OR company_name LIKE ?
       ORDER BY customer_id DESC
       LIMIT 100`,
      [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
    )

    res.json({ success: true, data: customers })
  } catch (error) {
    console.error('Get customers error:', error.message)
    res.status(500).json({ success: false, message: 'Could not fetch customers' })
  }
})

// POST /api/customers
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      companyName,
      address,
      city,
      state,
    } = req.body

    const name = String(customerName || '').trim()
    const cleanEmail = String(email || '').trim().toLowerCase()
    const cleanPhone = String(phone || '').trim()

    if (!name || name.length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Customer name is required and must be at most 150 characters',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid email address',
      })
    }

    if (!/^[0-9+() -]{7,20}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid phone number',
      })
    }

    const code = `CUS-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const [result] = await pool.execute(
      `INSERT INTO customers
       (customer_code, customer_name, email, phone,
        company_name, address, city, state)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        code,
        name,
        cleanEmail,
        cleanPhone,
        companyName || null,
        address || null,
        city || null,
        state || null,
      ]
    )

    const [rows] = await pool.execute(
      `SELECT customer_id, customer_code, customer_name,
              email, phone, company_name, address, city, state, status
       FROM customers WHERE customer_id = ?`,
      [result.insertId]
    )

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: rows[0],
    })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'A customer with this email or phone already exists',
      })
    }

    console.error('Create customer error:', error.message)
    res.status(500).json({ success: false, message: 'Could not create customer' })
  }
})

// GET /api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ success: false, message: 'Invalid customer ID' })
    }

    const [rows] = await pool.execute(
      `SELECT customer_id, customer_code, customer_name, email, phone,
              company_name, address, city, state, status, created_at
       FROM customers WHERE customer_id = ?`,
      [id]
    )

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Customer not found' })
    }

    res.json({ success: true, data: rows[0] })
  } catch (error) {
    console.error('Get customer error:', error.message)
    res.status(500).json({ success: false, message: 'Could not fetch customer' })
  }
})

module.exports = router