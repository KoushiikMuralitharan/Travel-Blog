
import './Navbar.css'
import React, { useState, useEffect , useContext} from 'react';
import{Outlet} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const Navtab = () => {
    const [navbar, setNavbar] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', changeBackground);
      return () => {
        window.removeEventListener('scroll', changeBackground);
      };
    }, []);

    useEffect(() => {
      const token = Cookies.get('token'); // Get the token from cookies
      console.log('Token from cookies:', token); // Debugging statement
      if (token) {
        try {
          const userDetails = jwtDecode(token);
          console.log('Decoded user details:', userDetails); // Debugging statement
          if (userDetails && userDetails.role === 'admin') {
              setIsAdmin(true);
          } else {
              setIsAdmin(false);
            
          }
        } catch (error) {
          console.error('Error decoding token:', error); // Debugging statement
            setIsAdmin(false);
        }
      } else {
          setIsAdmin(false);
      }
    }, [Cookies.get('token')]);

    const handleLogout = () => {
      Cookies.remove('token'); // Remove the token from cookies
      navigate('/signin'); // Redirect to the login page
    };
  
    return (
       <>
          <Navbar
        expand="lg"
        className={navbar ? 'navbar active' : 'navbar'}
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/">
          <img
              src="https://cdn-icons-png.flaticon.com/512/2907/2907086.png"
              alt="Travel Blog Logo"
              className="navbar-logo"
            />
           Trip Trove
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href="/signin">Login</Nav.Link>
              <Nav.Link href="/blogs">Blogs</Nav.Link>
              <Nav.Link href="/viewblog">Your Blogs</Nav.Link>
              <Nav.Link href="/postpage">feeds</Nav.Link>
              {isAdmin && (
                <>
                  <Nav.Link href="/admin/dashboard">Admin Dashboard</Nav.Link>
                </>
              )
              }
              <Nav.Link onClick={handleLogout}>logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header>
        <main>
          <Outlet/>
        </main>
      </header>
       </>
    );
};

export default Navtab