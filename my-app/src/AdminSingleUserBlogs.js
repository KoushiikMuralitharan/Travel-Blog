import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './Viewblog.css';
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
const AdminSingleUserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [cookies] = useCookies(['token']);
    const { id,name } = useParams();
    console.log(` this is the id  that i have passed ${id} ${name}`);


    const getMyBlogs = () =>{
        fetch(`${process.env.REACT_APP_API_KEY}/get-myblogs/${id}`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${cookies.token}`,
            "content-type": "application/json"
          }
        })
        .then((res) => res.json())
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
        getMyBlogs();
      },[]);

    const handleDelete = async (blogID) => {
        try{
         const response = await fetch(`${process.env.REACT_APP_API_KEY}/delete-blog/${blogID}`,{
           method: "DELETE",
           headers:{
             "Authorization":`Bearer ${cookies.token}`,
             "content-Type": "application/json",
           }
         });
         if(response.ok){
           alert("Contact deleted successfully");
           getMyBlogs();
         }else{
           alert("failed to delete the contact");
         }
        }catch(error){
          console.error("Error deleting the contact:",error);
        }
       };

  return (
    <>
    <Container>
      <Row className="mt-5 pt-5">
        <Col>
          <h2>{name}'s Blogs</h2>
          <div className="blog-container">
            {blogs.length === 0 ? (
              <p>No blogs available. Add a new blog to get started.</p>
            ) : (
              blogs.map(blog => (
                <Card key={blog._id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.content}</Card.Text>
                    {blog.imageUrl && <img src={blog.imageUrl} alt="Post" style={{ maxWidth: '300px' }} />}
                    <Link to={`/editblog/${blog._id}`} className="btn btn-warning me-2">
                      Edit
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </Col>
      </Row>
    </Container>
    </>
   
  )
}

export default AdminSingleUserBlogs