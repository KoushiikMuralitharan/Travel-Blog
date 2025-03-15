import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../utils/api";
import styles from "../../Styles/Blogpage.module.css";
const Post = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const [error, setError] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!content) newErrors.content = "Content is required.";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      setError({});
      setIsLoading(true);
      try {
        const response = await apiCall(
          `${process.env.REACT_APP_API_KEY}/blog/add-blog/${userId}`,
          "POST",
          formData,
          { Authorization: `Bearer ${token}` }
        );
        if (response.status === "Success") {
          alert(response.message);
          setIsLoading(false);
          navigate("/viewblog");
        } else {
          setError(response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("API Error", error);
        setIsLoading(false);
      }
    }
  };
  return (
    <main className={styles.main_container}>
      <form className={styles.login_container} onSubmit={handleSubmit}>
        <div className={styles.form_input}>
          <label id="formTitle">Title:</label>
          <input
            id="formTitle"
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!title) {
                setError((prev) => ({ ...prev, title: "Title is required." }));
              } else {
                setError((prev) => ({ ...prev, title: "" }));
              }
            }}
            onBlur={() => {
              if (!title) {
                setError((prev) => ({ ...prev, title: "Title is required." }));
              }
            }}
          ></input>
          {error.title && (<p className={styles.error_message}>{error.title}</p>)}
        </div>
        <div className={styles.form_input}>
          <label id="formContent">Content:</label>
          <textarea
            id="formContent"
            type="text"
            placeholder="Enter blog content..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (!e.target.value) {
                setError((prev) => ({
                  ...prev,
                  content: "Content is required.",
                }));
              } else {
                setError((prev) => ({ ...prev, content: "" }));
              }
            }}
            onBlur={() => {
              if (!content) {
                setError((prev) => ({
                  ...prev,
                  content: "Content is required.",
                }));
              }
            }}
          ></textarea>
           {error.content && (<p className={styles.error_message}>{error.content}</p>)}
        </div>

        <div className={styles.form_container}>
          <label id="formImage">Image:</label>
          <div className={styles.svg_container}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
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
        <button className={styles.my_button} type="submit" disabled={isLoading}>
          {isLoading ? <span className={styles.loader}></span> : "Add Blog"}
        </button>
      </form>
    </main>
  );
};

export default Post;
