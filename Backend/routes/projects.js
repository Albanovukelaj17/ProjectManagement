const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt'); // Ensure this line is present

// Example route to register a user
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phone, birthDate } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, phone, birth_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [firstName, lastName, email, hashedPassword, phone, birthDate]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
