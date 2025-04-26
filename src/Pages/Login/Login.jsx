import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { AppContext } from '../../context/Context'; // Importing AppContext to access backend_url
import Cookies from "js-cookie" // Importing js-cookie to handle cookies

function Login() {
  // State to manage form data (emailOrPhone and password)
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { backend_url } = useContext(AppContext); // Accessing backend_url from context

  // Handle input change and update the form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make a POST request to the backend login endpoint
      const res = await fetch(`${backend_url}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), // Send the form data (email/phone, password) in the request body
      });

      // Parse the response JSON data
      const data = await res.json();

      // If login is successful, store the token in cookies and navigate to the homepage
      if (res.ok) {
        Cookies.set('token', data.token); // Save the token in cookies
        alert('Login successful!'); // Show success message
        navigate('/'); // Navigate to the homepage
      } else {
        // If login fails, show the error message from the backend
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      // If an error occurs during the request, log it and show a generic error message
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2> {/* Title of the login page */}
      <form onSubmit={handleSubmit}>
        {/* Email or Phone input field */}
        <input
          name="emailOrPhone"
          type="text"
          placeholder="Email or Phone"
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
        {/* Submit button for login */}
        <button type="submit">Login</button>
      </form>
      {/* Redirect to sign-up page if user doesn't have an account */}
      <p onClick={() => navigate("/signup")} className="sign-up">Sign Up</p>
    </div>
  );
}

export default Login;
