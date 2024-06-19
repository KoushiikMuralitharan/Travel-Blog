
import './Navbar.css'
import React, { useState, useEffect } from 'react';
import{Outlet} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';



const Navtab = () => {
    const [navbar, setNavbar] = useState(false);

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