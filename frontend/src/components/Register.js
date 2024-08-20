import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  
  const navigate = useNavigate(); // To navigate to different routes

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset error message

    try {
      // Sending the registration data to the backend as JSON in the request body
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      
      // On successful registration, show a success message
      alert('Registration successful!');
      
      // Navigate to the login page
      navigate('/login');
    } catch (err) {
      // Handle any errors during registration
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message || 'Registration failed. User already exists.');
      } else {
        setError('Registration failed. Please try again later.');
      }
      console.error('Registration failed:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
