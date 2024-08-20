import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/tests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTests(res.data);
    };

    fetchTests();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {tests.map(test => (
          <li key={test._id}>Test Score: {test.score || 'Not yet evaluated'}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
