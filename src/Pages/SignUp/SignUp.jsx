import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/Context'; // Importing context to get backend URL

function Signup() {
  // State to store user input for the signup form
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });

  const navigate = useNavigate(); // Hook to navigate programmatically
  const { backend_url } = useContext(AppContext); // Accessing backend_url from context

  // Handle input change and update the form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (signup)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the backend register endpoint with form data
      const res = await fetch(`${backend_url}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), // Send form data as JSON in the request body
      });

      // Parse the response data
      const data = await res.json();

      // If the signup is successful, navigate to the login page
      if (res.ok) {
        alert('Signup successful!'); // Show success message
        navigate('/login'); // Redirect to the login page
      } else {
        // If signup fails, show the error message from the backend
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      // If there is any error during the request, log it and show an error message
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2> {/* Title of the signup page */}
      <form onSubmit={handleSubmit}>
        {/* Full name input field */}
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          required
          onChange={handleChange} // Update the form state on input change
        />
        {/* Email input field */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange} // Update the form state on input change
        />
        {/* Phone number input field */}
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          required
          onChange={handleChange} // Update the form state on input change
        />
        {/* Password input field */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange} // Update the form state on input change
        />
        {/* Submit button for signup */}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
