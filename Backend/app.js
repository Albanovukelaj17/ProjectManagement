const express = require('express');
const path = require('path');
const app = express();
const projectsRoutes = require('./routes/projects'); // Import the routes

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from the "Frontend/src/pages/css" directory
app.use( 'login',express.static(path.join(__dirname, '../Frontend/src/pages/')));

// Serve static JavaScript files
app.use('/javascript', express.static(path.join(__dirname, '../Frontend/src/javascript')));

// Use the projects routes for API requests starting with /projects
app.use('/projects', projectsRoutes);

// Serve the sign-up HTML file at the specific route
app.get('/login/sign_up.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/src/pages/login/sign_up.html'));
});

// Start the server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
