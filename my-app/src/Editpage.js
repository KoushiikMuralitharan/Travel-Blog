import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Editpage.css";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  console.log(id);
  const getSingleBlog = () => {
    fetch(`${process.env.REACT_APP_API_KEY}/getting-blog/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setCurrentImageUrl(data.imageUrl);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSingleBlog();
  }, []);

  const Update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    fetch(`/update-blog/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
      body: formData
    })
    .then(response => response.json())
      .then(data => {
        alert('Updated successfully.');
        navigate('/viewblog');
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="body5">
      <Container>
        <Row className="mt-5 pt-5">
          <Col>
            <h1>Edit Blog</h1>
            <Form onSubmit={Update}>
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
                 {currentImageUrl && (
                  <div className="mt-3">
                    <label>Current Image:</label>
                    <img src={currentImageUrl} alt="Current" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                  </div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Update Blog
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditBlog;
