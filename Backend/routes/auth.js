const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');  // Import the database connection

// Register a new user
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phone, birthDate } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const newUserQuery = `
      INSERT INTO users (first_name, last_name, email, password, phone, birth_date)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [firstName, lastName, email, hashedPassword, phone, birthDate];
    const result = await pool.query(newUserQuery, values);

    return res.status(201).json({ message: 'User registered successfully!', user: result.rows[0] });
  } catch (err) {
    console.error('Error during registration:', err.message);
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
        console.log('Eingehende Login-Daten:', email, password); // Überprüfe, ob die Daten korrekt ankommen


    try {
        // Check if the user exists
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        console.log('Eingehende Login-Daten:', email, password); // Überprüfe, ob die Daten korrekt ankommen


        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = userResult.rows[0];

        // Compare the password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Login successful
        res.json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = router;