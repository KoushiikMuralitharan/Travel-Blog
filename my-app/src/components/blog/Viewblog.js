import React, { useEffect, useState } from "react";
import styles from "./Viewblog.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function Viewblog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [cookies] = useCookies(["token"]);
  const getMyBlogs = () => {
    fetch(`${process.env.REACT_APP_API_KEY}/get-myblogs/${cookies.userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("data recieved from API:", data);
          setBlogs(data);
        } else {
          console.error("Data received from API is not an array:", data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editblog/${id}`); 
  };

  const handleDelete = async (blogID) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/delete-blog/${blogID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Blog deleted successfully");
        getMyBlogs();
      } else {
        alert("failed to delete the blog");
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
  };

  return (
    <main className={styles.main_content_area}>
      <h2>My Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available. Add a new blog to get started.</p>
      ) : (
        blogs.map((blog) => (
          <div className={styles.main_card_container} key={blog._id}>
            <div className={styles.image_container}>
              <img
                className={styles.card_image}
                src={blog.imageUrl}
                alt="place image"
              ></img>
            </div>
            <div className={styles.main_card_content}>
              <div>
              <h3>{blog.title}</h3>
              <div className={styles.card_content}>{blog.content}</div>
              </div>
              <div className={styles.button_container}>
                <button className={styles.my_buttons} onClick={() => handleEdit(blog._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 -960 960 960"
                    fill="#5f6368"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </button>
                <button className={styles.my_buttons} onClick={()=> handleDelete(blog._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 -960 960 960"
                    fill="#5f6368"
                  >
                    <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default Viewblog;
