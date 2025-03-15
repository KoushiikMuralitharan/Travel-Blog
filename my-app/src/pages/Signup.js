import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/App.module.css";
import { apiCall } from "../utils/api";
// REACT_APP_API_KEY="https://travel-blog-igqk.onrender.com"
function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!username) newErrors.username = "Username is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      setError({});
      setIsLoading(true);
      try {
        const SignUpData = await apiCall(
          `${process.env.REACT_APP_API_KEY}/user/addUser`,
          "POST",
          { username, email, password }
        );
        if (SignUpData.status === "Success" && SignUpData.userDetail) {
          alert("User Created Successfully");
          Cookies.set("token", SignUpData.accessToken, { expires: 2 / 24 });
          Cookies.set("userId", SignUpData.userDetail.userId, {
            expires: 2 / 24,
          });
          navigate("/");
          window.location.reload();
          setIsLoading(false);
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
              onChange={(e) => {
                setUsername(e.target.value);
                if (!e.target.value) {
                  setError((prev) => ({
                    ...prev,
                    username: "Userrname is required.",
                  }));
                } else {
                  setError((prev) => ({ ...prev, username: "" }));
                }
              }}
              onBlur={() => {
                if (!username) {
                  setError((prev) => ({
                    ...prev,
                    username: "Userrname is required.",
                  }));
                }
              }}
            ></input>
            {error.username && (
              <p className={styles.error_message}>{error.username}</p>
            )}
          </div>
          <div className={styles.form_input}>
            <label id="formEmail">Email:</label>
            <input
              id="formEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!e.target.value) {
                  setError((prev) => ({
                    ...prev,
                    email: "Email is required.",
                  }));
                } else {
                  setError((prev) => ({ ...prev, email: "" }));
                }
              }}
              onBlur={() => {
                if (!email) {
                  setError((prev) => ({
                    ...prev,
                    email: "Email is required.",
                  }));
                }
              }}
            ></input>
            {error.email && (
              <p className={styles.error_message}>{error.email}</p>
            )}
          </div>
          <div className={styles.form_input}>
            <label id="formPassword">Password:</label>
            <input
              id="formPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!e.target.value) {
                  setError((prev) => ({
                    ...prev,
                    password: "Password is required.",
                  }));
                } else {
                  setError((prev) => ({ ...prev, password: "" }));
                }
              }}
              onBlur={() => {
                if (!password) {
                  setError((prev) => ({
                    ...prev,
                    password: "password is required.",
                  }));
                }
              }}
            ></input>
            {error.password && (
              <p className={styles.error_message}>{error.password}</p>
            )}
          </div>
          <button
            className={styles.my_button}
            type="submit"
            disabled={isLoading}
          >
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
