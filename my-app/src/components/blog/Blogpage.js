import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import styles from "./Viewblog.module.css";

function Blogpage() {
  const [blogs, setBlogs] = useState([]);
  const [cookies] = useCookies(['token']);
  
  const allblogs = () =>{
    fetch(`${process.env.REACT_APP_API_KEY}/all-blogs`,{
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
