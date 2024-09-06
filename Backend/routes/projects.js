// routes/projects.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection

// Define the route to get projects
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects'); // Fetch all projects
    res.json(result.rows); // Send the result as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send a server error if something goes wrong
  }
});

module.exports = router;
