import React from 'react'
import './Navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function Navbar1() {
  return (
    <Navbar className='p-3 nav1'>
            <Container>
                <Navbar.Brand className='band text'>RENTIFY</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/register" >Register</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
  )
}

export default Navbar1