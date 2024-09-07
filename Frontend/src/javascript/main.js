// On page load, fetch project data
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3034/api/projects'); // Adjust the URL for your backend
        const data = await response.json();

        // Update project counts
        const openProjects = data.filter(project => project.status === 'open').length;
        const closedProjects = data.filter(project => project.status === 'closed').length;
        const totalProjects = data.length;

        document.getElementById('open-projects-count').textContent = openProjects;
        document.getElementById('closed-projects-count').textContent = closedProjects;
        document.getElementById('total-projects-count').textContent = totalProjects;
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
});

// View open projects (redirect to open projects page)
function viewOpenProjects() {
    window.location.href = '/projects/open'; // Adjust this URL based on your route
}

// View closed projects (redirect to closed projects page)
function viewClosedProjects() {
    window.location.href = '/projects/closed'; // Adjust this URL based on your route
}

// Handle the new project creation form submission
document.getElementById('newProjectForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectStatus = document.getElementById('projectStatus').value;

    const projectData = {
        name: projectName,
        description: projectDescription,
        status: projectStatus
    };

    try {
        const response = await fetch('http://localhost:3034/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData)
        });

        if (response.ok) {
            document.getElementById('message').textContent = 'Project created successfully!';
            document.getElementById('newProjectForm').reset();
        } else {
            const errorData = await response.json();
            document.getElementById('message').textContent = `Error: ${errorData.message}`;
        }
    } catch (error) {
        console.error('Error creating project:', error);
        document.getElementById('message').textContent = 'An error occurred while creating the project.';
    }
});
