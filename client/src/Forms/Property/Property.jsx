import React, { useState } from 'react';
import axios from 'axios';
import './Property.css';
import { useNavigate } from 'react-router-dom';

function Property() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    place: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await axios.post('http://localhost:5000/api/v1/property/create', formData, {
        withCredentials: true
      });
      console.log(response.data);
      setSuccess('Property created successfully');
      navigate('/dashboard')
      setError('');
      
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'Internal server error');
      setSuccess('');
    }
  };

  return (
    <div className='sell'>
      <div className="card">
        <h2>Sell a Property</h2>
        <form className='form1' onSubmit={handleSubmit}>
          <input
            type='text'
            id="title"
            name='title'
            placeholder='Title'
            className='my-2'
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="place"
            name="place"
            placeholder="Place"
            className='my-2'
            value={formData.place}
            onChange={handleChange}
            required
          />
          <textarea
            id="description"
            name='description'
            placeholder='Description'
            className='my-2 textarea'
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button className='my-3 rounded' type="submit" >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Property;
