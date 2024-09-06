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

  // Prepare the data to send
  const data = {
    firstName,
    lastName,
    email,
    password,
    phone,
    birthDate
  };

  try {
    // Send the data to the backend
    const response = await fetch('http://localhost:3025/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // Handle the response
    if (response.ok) {
      alert('User registered successfully!');
      // Optionally, redirect the user or clear the form
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
