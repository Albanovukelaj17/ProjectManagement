document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Gather the form data
  const formData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    phone: document.getElementById('phone').value,
    birthDate: document.getElementById('birthDate').value,
  };

  // Validate password match
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Send the data to the backend
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Registration successful!');
      console.log(data);  // The returned user data from the server
    } else {
      alert('Registration failed');
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
