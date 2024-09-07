document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare the data to send
    const data = {
        email,
        password
    };

    try {
        // Send the data to the backend
        const response = await fetch('http://localhost:3042/api/login', { // Adjust port if necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Handle the response
        if (response.ok) {
            const result = await response.json();
            alert(`Welcome, ${result.firstName}!`);
            // Optionally redirect the user after successful login
            window.location.href = '/main.html'; // Redirect to a dashboard or home page
            //to implement
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});
