import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css"
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const allusers = () => {
    fetch(`${process.env.REACT_APP_API_KEY}/all-users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("data recieved from API:", data);
          setUsers(data);
        } else {
          console.error("Data received from API is not an array:", data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleViewBlog = (keys, name) => {
    console.log(keys);
    navigate(`/admin/viewuserblogs/${keys}/${name}`);
  };

  const handleMakeAdmin = async (id) => {
    console.log("Make Admin clicked");
    const response = await fetch(
      `${process.env.REACT_APP_API_KEY}/update-userrole/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      alert("User role updated successfully");
      allusers();
    } else {
      alert("failed to update the user role");
    }
  };

  const handleDeleteUser = async (id) => {
    console.log("Delete User clicked");
    // Implement delete user functionality here

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/delete-user/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("User deleted successfully");
        allusers();
      } else {
        alert("failed to delete the blog");
      }
    } catch (error) {
      console.error("Error deleting the user:", error);
    }
  };

  useEffect(() => {
    allusers();
  }, []);

  return (
    <main className={styles.main_content}>
          <h2>All users</h2>
          {users.length === 0 ? (
            <p>No users available</p>
          ) : (
            users.map((users, index) => (
              <div className={styles.card}>
                <p className={styles.para}>
                  <strong>Name:</strong> {users.username}
                </p>
                <p className={styles.para}>
                  <strong>Email:</strong> {users.email}
                </p>
                <p className={styles.para}>
                  <strong>Password:</strong> {users.password}
                </p>

                <div className={styles.buttons}>
                  <button  onClick={()=>{handleViewBlog(users._id,users.username)}}>View</button>
                  <button  onClick={()=>handleMakeAdmin(users._id)}>Make Admin</button>
                  <button  onClick={()=> handleDeleteUser(users._id) }>Delete</button>
                </div>
              </div>
            ))
          )}
    </main>
  );
};

export default AdminDashboard;
