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

// Serve static files for the dashboard (CSS, JS, etc.)
app.use('/main_style.css', express.static(path.join(__dirname, '../Frontend/src/pages/dashboard/main_style.css')));

// Serve the dashboard main.html
app.get('/main.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/src/pages/dashboard/main.html'));
});


app.get('/newProject/new_project.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/src/pages/newProject/new_project.html'));
});

// Serve static files like CSS, JS, etc.
app.use('/new_project_style.css', express.static(path.join(__dirname, '../Frontend/src/pages/newProject/new_project_style.css')));


// Start the server
const PORT = process.env.PORT || 3082;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});