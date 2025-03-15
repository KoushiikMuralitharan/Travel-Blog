import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../Styles/Blogpage.module.css";
import Cookies from "js-cookie";
import { apiCall } from "../../utils/api";

function EditBlog() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const getSingleBlog = async () => {
    try {
      const data = await apiCall(
        `${process.env.REACT_APP_API_KEY}/blog/getting-blog/${id}`,
        "GET",
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (data.status === "Success") {
        setTitle(data.data.title);
        setContent(data.data.content);
        setCurrentImageUrl(data.data.imageUrl);
      } else {
        console.log("Error on getting a single blog.");
      }
    } catch (error) {
      console.error("Error getting a single blog:", error);
    }
  };
  useEffect(() => {
    getSingleBlog();
  }, [id]);

  const Update = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }
      const response = await apiCall(
        `${process.env.REACT_APP_API_KEY}/blog/update-blog/${id}`,
        "PATCH",
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (response.status === "Success") {
        alert("Blog Updated Successfully.");
        setIsLoading(false);
        navigate("/viewblog");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log("Error on updating the blog.", error);
    }
  };

  return (
    <main className={styles.main_container}>
      <form className={styles.login_container} onSubmit={Update}>
        <div className={styles.form_input}>
          <label id="formTitle">Title:</label>
          <input
            id="formTitle"
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className={styles.form_input}>
          <label id="formContent">Content:</label>
          <textarea
            id="formContent"
            type="text"
            placeholder="Enter blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.form_container}>
          <label id="formImage">Image:</label>
          <div className={styles.svg_container}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 -960 960 960"
              fill="#5f6368"
            >
              <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
            </svg>
          </div>
          <div className={styles.form_input}>
            <input
              id="formImage"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className={styles.image}
            ></input>
          </div>
        </div>
        <div className={styles.form_current_image}>
          <p>Current image:</p>
          <div className={styles.current_img_main_container}>
            <img src={currentImageUrl} alt="current image"></img>
          </div>
        </div>
        <button className={styles.my_button} type="submit">
          {isLoading ? <span className={styles.loader}></span> : "Update"}
        </button>
      </form>
    </main>
  );
}

export default EditBlog;
