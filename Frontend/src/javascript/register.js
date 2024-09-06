document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;
    const birthDate = document.getElementById('birthDate').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const data = {
        firstName,
        lastName,
        email,
        password,
        phone,
        birthDate
    };

    try {
        const response = await fetch('http://localhost:3021/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('User registered successfully!');
            window.location.href = 'sign_in.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});
