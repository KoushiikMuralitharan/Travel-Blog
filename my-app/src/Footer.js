// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 body6">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Travel Blog</h5>
            <p>Exploring the world, one adventure at a time.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/signin">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: contact@travelblog.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Travel St, Wanderlust City, World</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
