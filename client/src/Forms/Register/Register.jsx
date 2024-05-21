import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
    const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    userType: ''
  });

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
      const response = await axios.post('http://localhost:5000/api/v1/user/register', formData, {
        withCredentials: true
      });
      console.log(response.data);
      Navigate('/login')
      // Handle success (e.g., display a success message or redirect to login page)
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className='register'>
      <div className="card">
        <h2>Register for an account</h2>
        <form className='form1' onSubmit={handleSubmit}>
          <input
            type='text'
            id="firstName"
            name='firstName'
            placeholder='First Name'
            className='my-2'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            id="lastName"
            name='lastName'
            placeholder='Last Name'
            className='my-2'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
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
            className='my-2'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type='number'
            id="phone"
            name='phone'
            placeholder='Phone Number'
            className='my-2'
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button className='my-3 rounded' type="submit">Register</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
