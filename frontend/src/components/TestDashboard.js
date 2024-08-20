import React, { useState } from 'react';

const TestDashboard = ({ onStartTest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally here you'd validate the login, but we'll simulate a successful login
    onStartTest();
  };

  return (
    <div>
      <h1>Start Test</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Start Test</button>
      </form>
    </div>
  );
};

export default TestDashboard;