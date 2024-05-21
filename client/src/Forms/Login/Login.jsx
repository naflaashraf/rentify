import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/login', formData, {
        withCredentials: true
      });
      console.log(response.data);
      // Handle success 
      Navigate('/dashboard')
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Display error message
      setError(error.response ? error.response.data.message : 'Internal server error');
    }
  };

  return (
    <div className='signup'>
      <div className="card">
        <h3>Sign in to your account</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className='my-2'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className='my-1'
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className='my-4 rounded'>
            Login
          </button>
          <p>Not a registered user yet? <Link to="/register">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
