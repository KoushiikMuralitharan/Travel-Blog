import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Blogpage.css";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [cookies] = useCookies(["token"]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title',title);
    formData.append('content',content);
    formData.append('image',image);


    if (title === "" || content === "") {
      setError("Please fill in all fields");
    } else {
      setError("");
      try {
        const response = await axios.post(
          `/add-blog/${cookies.userID}`,formData,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
              "Content-Type": "multipart/form-data",
            }
          }
        );
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate('/viewblog');

        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.log("API Error", error);
        setError("An error occurred while adding the blog");
        alert("An error occurred while adding the blog");
      }
    }
  };
  return (
    <div className="body4">
      <Container>
        <Row className="mt-5 pt-5  ">
          <Col>
            <h1>Add a New Blog</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formContent" className="mt-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter blog content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formImage" className="mt-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  rows={3}
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Add Blog
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Post;
