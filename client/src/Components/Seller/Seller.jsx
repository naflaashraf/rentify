import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Seller.css';
import editIcon from '../../Assets/edit.png';
import deleteIcon from '../../Assets/delete.png';

function Seller() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState({});

    const fetchProperties = async () => {
        try {
            const sessionResponse = await axios.get('http://localhost:5000/api/v1/session/session', { withCredentials: true });
            const userId = sessionResponse.data.userId;
            const propertyResponse = await axios.get(`http://localhost:5000/api/v1/property/user/${userId}`, { withCredentials: true });
            setProperties(propertyResponse.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleEditClick = (propertyId) => {
        setEditMode(prevState => ({
            ...prevState,
            [propertyId]: true
        }));
    };

    const handleInputChange = (event, propertyId, field) => {
        const { value } = event.target;
        setProperties(prevProperties => {
            const updatedProperties = prevProperties.map(property => {
                if (property._id === propertyId) {
                    return { ...property, [field]: value };
                }
                return property;
            });
            return updatedProperties;
        });
    };

    const handleSaveClick = async (propertyId) => {
        const propertyToUpdate = properties.find(property => property._id === propertyId);
        try {
            await axios.put(`http://localhost:5000/api/v1/property/${propertyId}`, propertyToUpdate, {
                withCredentials: true
            });
            setEditMode(prevState => ({
                ...prevState,
                [propertyId]: false
            }));
            // Update the properties list after successfully saving
            fetchProperties();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteClick = async (propertyId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/property/${propertyId}`, {
                withCredentials: true
            });
            // Remove the deleted property from the properties list
            setProperties(prevProperties => prevProperties.filter(property => property._id !== propertyId));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="seller-properties">
            <h2>User Properties</h2>
            {properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <div>
                    {properties.map((property) => (
                        <div key={property._id} className="property-item">
                            <div className="property-field">
                                <span className="property-label">Title:</span>
                                {editMode[property._id] ? (
                                    <input
                                        type="text"
                                        value={property.title}
                                        onChange={(e) => handleInputChange(e, property._id, 'title')}
                                    />
                                ) : (
                                    <span className="property-value">{property.title}</span>
                                )}
                            </div>
                            <div className="property-field">
                                <span className="property-label">Place:</span>
                                {editMode[property._id] ? (
                                    <input
                                        type="text"
                                        value={property.place}
                                        onChange={(e) => handleInputChange(e, property._id, 'place')}
                                    />
                                ) : (
                                    <span className="property-value">{property.place}</span>
                                )}
                            </div>
                            <div className="property-field">
                                <span className="property-label">Description:</span>
                                {editMode[property._id] ? (
                                    <textarea
                                        value={property.description}
                                        onChange={(e) => handleInputChange(e, property._id, 'description')}
                                    />
                                ) : (
                                    <span className="property-value">{property.description}</span>
                                )}
                            </div>
                           
                            <div className="property-buttons d-flex justify-content-end ">
                                {editMode[property._id] ? (
                                    <button onClick={() => handleSaveClick(property._id)} >Save</button>
                                ) : (
                                    <img src={editIcon} alt="Edit" onClick={() => handleEditClick(property._id)} className='px-2' />
                                )}
                                <img src={deleteIcon} alt="Delete" onClick={() => handleDeleteClick(property._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Seller

