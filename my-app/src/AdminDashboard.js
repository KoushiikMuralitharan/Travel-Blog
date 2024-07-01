import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card ,Button} from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const allusers = () =>{
    fetch(`${process.env.REACT_APP_API_KEY}/all-users`,{
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
        setUsers(data);
      }else{
        console.error("Data received from API is not an array:", data);
      }
     
    })
    .catch((err)=> console.log(err));
  }

  const handleViewBlog = (keys,name) => {
    console.log(keys);
    navigate(`/admin/viewuserblogs/${keys}/${name}`)
  };

  const handleMakeAdmin = async (id) => {
    console.log('Make Admin clicked');
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/update-userrole/${id}`,{
        method:"PATCH",
        headers:{
            "Authorization":`Bearer ${cookies.token}`,
            "content-Type": "application/json",
          }
    });
    if(response.ok){
        alert("User role updated successfully");
        allusers();
      }else{
        alert("failed to update the user role");
      }
  };

  const handleDeleteUser = async (id) => {
    console.log('Delete User clicked');
    // Implement delete user functionality here

    try{
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/delete-user/${id}`,{
          method: "DELETE",
          headers:{
            "Authorization":`Bearer ${cookies.token}`,
            "content-Type": "application/json",
          }
        });
        if(response.ok){
          alert("User deleted successfully");
          allusers();
        }else{
          alert("failed to delete the blog");
        }
       }catch(error){
         console.error("Error deleting the user:",error);
       }
  };

  useEffect(()=>{
    allusers();
  },[]);

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md="6">
        <h2>All users</h2>
        {
            users.length === 0 ? (
                <p>No users available</p>
            ):(
                users.map((users,index) => (
                    <Card key={index} className="shadow-sm">
                    <Card.Body>
                      <Card.Title>User Information</Card.Title>
                      <Card.Text>
                        <strong>Username:</strong> {users.username}
                      </Card.Text>
                      <Card.Text>
                        <strong>Email:</strong> {users.email}
                      </Card.Text>
                      <Card.Text>
                        <strong>Password:</strong> {users.password}
                      </Card.Text>
                      <Button variant="primary" className="me-2" onClick={()=>{handleViewBlog(users._id,users.username)}}>View Blog</Button>
                      <Button variant="success" className="me-2" onClick={()=>handleMakeAdmin(users._id)}>Make Admin</Button>
                      <Button variant="danger" onClick={()=> handleDeleteUser(users._id) }>Delete User</Button>
                    </Card.Body>
                  </Card>
                ))
            )}  
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard