import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/App.module.css";
import { apiCall } from "../utils/api";
// REACT_APP_API_KEY="https://travel-blog-igqk.onrender.com"
function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setIsLoading(true);
      try {
        const SignUpData = await apiCall(
          `${process.env.REACT_APP_API_KEY}/user/addUser`,
          "POST",
          { username, email, password }
        );
        console.log("Sign Up Ok:", SignUpData.ok);
        // Handle successful response
        if (SignUpData.status === "Success" && SignUpData.userDetail) {
          alert("User Created Successfully");
          setCookie("token", SignUpData.accessToken, { maxAge: 60 * 60 * 60 });
          setCookie("userId", SignUpData.userDetail.userId, {
            maxAge: 60 * 60 * 60,
          });
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        console.log("API error", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className={styles.main_container}>
      <div className={styles.sub_container}>
        <div className={styles.img_container}>
          <img src="https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg"></img>
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
          <button className={styles.my_button} type="submit">
            {isLoading ? <span className={styles.loader}></span> : "Sign up"}
          </button>
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
