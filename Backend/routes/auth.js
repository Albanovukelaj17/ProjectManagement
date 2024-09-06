const express = require('express');
const router = express.Router(); // Create a new router instance

// Import bcrypt if you haven’t already
const bcrypt = require('bcrypt');

// Assuming you have a pool instance for your database
const pool = require('../db'); // Adjust the path as needed

// Define the route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phone, birthDate } = req.body;

  try {
    console.log('Received data:', req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully:', hashedPassword);

    const newUserQuery = `
      INSERT INTO users (first_name, last_name, email, password, phone, birth_date)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [firstName, lastName, email, hashedPassword, phone, birthDate];

    console.log('Executing query:', newUserQuery, values);

    const result = await pool.query(newUserQuery, values);

    console.log('Query result:', result.rows);

    if (result.rows.length > 0) {
      return res.status(201).json({ message: 'User registered successfully!' });
    } else {
      return res.status(500).json({ message: 'Failed to register user' });
    }
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router; // Export the router instance
