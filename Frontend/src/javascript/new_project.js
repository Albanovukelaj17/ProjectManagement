document.getElementById('newProjectForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectStatus = document.getElementById('projectStatus').value;

    // Prepare the data to send
    const data = {
        name: projectName,
        description: projectDescription,
        status: projectStatus
    };

    try {
        // Send the data to the backend
        const response = await fetch('http://localhost:3034/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Handle the response
        if (response.ok) {
            alert('Project created successfully!');
            // Optionally, redirect the user back to the dashboard
            window.location.href = '../dashboard/main.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});
