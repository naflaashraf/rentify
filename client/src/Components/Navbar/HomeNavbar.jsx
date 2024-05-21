import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomeNavbar.css'
function HomeNavbar() {
  const navigate =useNavigate()
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/user/', null, { withCredentials: true });
      // Redirect to the login page 
      navigate('/login')

    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      <Navbar className='p-3 nav'>
        <Container>
          <Navbar.Brand className='band'>RENTIFY</Navbar.Brand>
          <Nav className="mr-auto">
          <Nav.Link  as={Link} to="/property">Selling</Nav.Link>
          <Nav.Link  as={Link} to="/seller">Sell Details</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomeNavbar;