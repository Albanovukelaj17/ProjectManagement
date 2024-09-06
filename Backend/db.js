const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables

// Set up a connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false  // This allows self-signed certificates
  }
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Error connecting to the PostgreSQL database:', err.message);
});

module.exports = pool;
