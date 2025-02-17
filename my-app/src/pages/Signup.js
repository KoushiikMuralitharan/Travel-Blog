import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./App.module.css";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [, setCookie] = useCookies([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can add your signup logic
    if (username === "" || email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      setError("");
      setIsLoading(true); // Start loader
      // Perform signup action (e.g., call to backend API)
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_KEY}/addUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          }
        );
        const loginData = await response.json();
        if (!response.ok) {
          alert("Failed to sign up");
          setIsLoading(false);
        } else if (loginData.status === "success" && loginData.userDetail) {
          alert("user account created successfully.");
          setCookie("token", loginData.accessToken, { maxAge: 60 * 60 * 60 });
          setCookie("userID", loginData.userDetail.userID, {
            maxAge: 60 * 60 * 60,
          });
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        console.log("API error");
      } finally {
        setIsLoading(false); // Stop loader
      }
    }
  };

  return (
    <main className={styles.main_container}>
      <div className={styles.sub_container}>
        <div className={styles.img_container}>
          <img src="https://cdn.pixabay.com/photo/2023/08/11/16/29/tourist-8183867_640.png"></img>
        </div>
        <form className={styles.login_container} onSubmit={handleSubmit}>
          <div className={styles.form_input}>
            <label id="formUsername">Username:</label>
            <input
              id="formUsername"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className={styles.form_input}>
            <label id="formEmail">Email:</label>
            <input
              id="formEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className={styles.form_input}>
            <label id="formPassword">Password:</label>
            <input
              id="formPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className={styles.my_button} type="submit">Sign up</button>
          <div className={styles.sign_up}>
            <p>Have an account! </p>
            <a href="/signin">Sign in</a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
