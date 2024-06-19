import React, { useState , useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [,setCookie] = useCookies([])
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit =async (event) => {
    event.preventDefault();
    // Here you can add your signup logic
    if (username === '' || email === '' || password === '') {
      setError('Please fill in all fields');
    } else {
      setError('');
      // Perform signup action (e.g., call to backend API)
      try{
        const response = await fetch(`http://localhost:8080/addUser`,{
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password:password
           }),
        })
        const loginData = await response.json();
        if(!response.ok){
          alert("Failed to sign up");
        }else if(loginData.status === "success" && loginData.userDetail){
          alert("user account created successfully.");
          setCookie('token', loginData.accessToken, { maxAge: 60 * 60 * 60 })
          setCookie('userID', loginData.userDetail.userID, { maxAge: 60 * 60 * 60 })
          navigate('/');
        }
      }catch(error){
        console.log("API error");
      }
    }

  };

  return (
    <Row className="vh-100 align-items-center body2">
      <Col md={12}>
        <div className="d-flex justify-content-center">
          <Card className="shadow">
            <Card.Body>
              <h2 className="mb-4 text-center">Sign Up for Your Travel Blog Account</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Sign Up
                </Button>
              </Form>
              <div className="mt-2 text-center">
                <span className="text-muted">Already have an account? </span>
                <a href="/signin" className="signin-link">Sign in</a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;
