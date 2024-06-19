import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import './Blogpage.css';

function Blogpage() {
  const [blogs, setBlogs] = useState([]);
  const [cookies] = useCookies(['token']);
  
  const allblogs = () =>{
    fetch(`http://localhost:8080/all-blogs`,{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${cookies.token}`,
        "content-Type": "application/json"
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(Array.isArray(data)){
        console.log("data recieved from API:", data);
        setBlogs(data);
      }else{
        console.error("Data received from API is not an array:", data);
      }
     
    })
    .catch((err)=> console.log(err));
  }

  useEffect(()=>{
    allblogs();
  },[]);

  

  return (
   <div className='body4'>
    <Container>
      <Row className="my-5">
        <Col>
          <h2>All Blogs</h2>
          {blogs.length === 0 ? (
            <p>No blogs available. Add a new blog to get started.</p>
          ) : (
            blogs.map((blog, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.content}</Card.Text>
                  {blog.imageUrl && <img src={blog.imageUrl} alt="Post" style={{ maxWidth: '300px' }} />}
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
   </div>
 // hi dda machi;
  );
}

export default Blogpage;
