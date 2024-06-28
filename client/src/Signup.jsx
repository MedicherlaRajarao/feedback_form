import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://127.0.0.1:3002/register', { name, email, password });
      
      console.log(result);
      if (result.status === 201) {
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Network Error: ' + err.message);
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          required
        />
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', borderRadius: '5px', marginBottom: '10px' }}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login" style={{ cursor: 'pointer', color: '#00b894', textDecoration: 'underline' }}>Login</Link>
      </p>
    </div>
  );
};

export default SignupForm;
