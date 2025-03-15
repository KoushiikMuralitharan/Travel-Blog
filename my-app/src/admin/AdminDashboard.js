import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/AdminDashboard.module.css";
import { apiCall } from "../utils/api";
const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const allusers = async () => {
    try {
      const response = await apiCall(
        `${process.env.REACT_APP_API_KEY}/admin/all-users`,
        "GET",
        null,
        { Authorization: `Bearer ${cookies.token}` }
      );

      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        alert("Data is not on the array format.");
      }
    } catch (error) {
      console.log("Cannot get all the users ", error);
    }
  };

  const handleViewBlog = (keys, name) => {
    console.log(keys);
    navigate(`/admin/viewuserblogs/${keys}/${name}`);
  };

  const handleMakeAdmin = async (id) => {
    setIsLoading(true);
    const response = await apiCall(
      `${process.env.REACT_APP_API_KEY}/admin/update-userrole/${id}`,
      "PATCH",
      null,
      { Authorization: `Bearer ${cookies.token}` }
    );
    if (response.status === "Success") {
      alert(response.message);
      setIsLoading(false);
      allusers();
    } else {
      alert(response.message);
    }
  };

  const handleDeleteUser = async (id) => {
    setIsLoading(true);
    try {
      // const response = await fetch(
      //   `${process.env.REACT_APP_API_KEY}/admin/delete-user/${id}`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       Authorization: `Bearer ${cookies.token}`,
      //       "content-Type": "application/json",
      //     },
      //   }
      // );
      const response = await apiCall(
        `${process.env.REACT_APP_API_KEY}/admin/delete-user/${id}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${cookies.token}` }
      );
      if (response.status === "Success") {
        alert(response.message);
        setIsLoading(false);
        allusers();
      } else {
        alert(response.message);
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
          <div key={index} className={styles.card}>
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
              <button
                onClick={() => {
                  handleViewBlog(users._id, users.username);
                }}
              >
                View
              </button>
              <button onClick={() => handleMakeAdmin(users._id)}>
                {isLoading ? (
                  <span className={styles.loader}></span>
                ) : (
                  "Make Admin"
                )}
              </button>
              <button onClick={() => handleDeleteUser(users._id)}>
                {isLoading ? <span className={styles.loader}></span> : "Delete"}
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default AdminDashboard;
