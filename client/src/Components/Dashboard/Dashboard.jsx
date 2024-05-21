import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sellerDetailsMap, setSellerDetailsMap] = useState({});
  const [visibleSellerDetails, setVisibleSellerDetails] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/property', {
          withCredentials: true
        });
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch properties');
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleInterestedClick = async (propertyId) => {
    try {
      if (!sellerDetailsMap[propertyId]) {
        const response = await axios.get(`http://localhost:5000/api/v1/property/seller/${propertyId}`, {
          withCredentials: true
        });
        setSellerDetailsMap((prevDetails) => ({
          ...prevDetails,
          [propertyId]: response.data
        }));
      }
      setVisibleSellerDetails((prevVisible) => ({
        ...prevVisible,
        [propertyId]: !prevVisible[propertyId]
      }));
    } catch (error) {
      console.error('Failed to fetch seller details', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="property-list">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <h3>Title: {property.title}</h3>
            <p>Place: {property.place}</p>
            <p>Description: {property.description}</p>
            <button
              className="interested-button"
              onClick={() => handleInterestedClick(property._id)}
            >
              {visibleSellerDetails[property._id] ? 'Hide Details' : 'I am interested'}
            </button>
            {visibleSellerDetails[property._id] && sellerDetailsMap[property._id] && (
              <div className="seller-details">
                <h3>Seller Details</h3>
                <p>Name: {sellerDetailsMap[property._id].firstName} {sellerDetailsMap[property._id].lastName}</p>
                <p>Email: {sellerDetailsMap[property._id].email}</p>
                <p>Phone: {sellerDetailsMap[property._id].phone}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
