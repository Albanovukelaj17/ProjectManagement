// app.js
const express = require('express');
const app = express();
const projectsRoutes = require('./routes/projects'); // Import the routes

// Middleware (optional, for parsing JSON bodies)
app.use(express.json());

// Use the projects routes for API requests starting with /projects
app.use('/projects', projectsRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
