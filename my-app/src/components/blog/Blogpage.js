import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "../../Styles/Viewblog.module.css";
import { apiCall } from "../../utils/api";

function Blogpage() {
  const [blogs, setBlogs] = useState([]);
  const token = Cookies.get("token");
  const allblogs = async () => {
    try {
      const data = await apiCall(
        `${process.env.REACT_APP_API_KEY}/blog/all-blogs`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (data.status === "Success") {
        setBlogs(data.blogs);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occured on getting the blog ", error);
    }
  };

  useEffect(() => {
    allblogs();
  }, []);

  return (
    <main className={styles.main_content_area}>
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
            </div>
          </div>
        ))
      )}
    </main>
  );
}

export default Blogpage;
