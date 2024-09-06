const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Import routes
const projectsRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors()); // Enable Cross-Origin requests

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This will handle form submissions

// Serve static files (CSS, JS, etc.)
app.use('/login', express.static(path.join(__dirname, '../Frontend/src/pages/login'))); // Serve static files like CSS and images
app.use('/javascript', express.static(path.join(__dirname, '../Frontend/src/javascript'))); // Serve JavaScript files

// Use routes for API requests
app.use('/projects', projectsRoutes);
app.use('/api', authRoutes);

// Serve the sign-up HTML file
app.get('/login/sign_up.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/src/pages/login/sign_up.html'));
});

// Start the server
const PORT = process.env.PORT || 3021;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
