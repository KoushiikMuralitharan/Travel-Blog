import React, { useState } from "react";
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./App.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can add your authentication logic
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      setError("");
      // Perform sign-in action (e.g., call to backend API)
      try {
        const loginresponse = await fetch(
          `${process.env.REACT_APP_API_KEY}/validateUser`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );
        const loginData = await loginresponse.json();
        setLoading(false);
        if (loginData.status === "failure") {
          alert(loginData.message);
        } else {
          setCookie("token", loginData.accessToken, { maxAge: 60 * 60 * 60 });
          setCookie("userID", loginData.userDetail.userID, {
            maxAge: 60 * 60 * 60,
          });
          navigate("/");
        }
      } catch (error) {
        console.log("API error");
      }
    }
  };
  return (
    // Inside the SignIn component
    <Row className="vh-100 align-items-center body1">
      <Col md={12}>
        <div className="d-flex justify-content-center">
          <Card className="shadow">
            <Card.Body>
              <h2 className="mb-4 text-center">
                Login and Dive into Travel Tales
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                  <div className="loader"></div>
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Sign In
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <a href="#forgot-password" className="text-muted">
                  Forgot password?
                </a>
              </div>
              <div className="mt-2 text-center">
                <span className="text-muted">Don't have an account? </span>
                <a href="/signup" className="signup-link">
                  Sign up
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  );
}
// added
export  default SignIn;
