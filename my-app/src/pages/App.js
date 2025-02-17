import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./App.module.css";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can add your authentication logic
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      setError("");
      setIsLoading(true); // Start loader
      // Perform sign-in action (e.g., call to backend API)
      try {
        const loginresponse = await fetch(
          `${process.env.REACT_APP_API_KEY}/validateUser`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );
        const loginData = await loginresponse.json();
        setLoading(false);
        if (loginData.status === "failure") {
          alert(loginData.message);
          setIsLoading(false);
        } else {
          setCookie("token", loginData.accessToken, { maxAge: 60 * 60 * 60 });
          setCookie("userID", loginData.userDetail.userID, {
            maxAge: 60 * 60 * 60,
          });
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        console.log("API error");
      }
    }
  };
  return (
    // Inside the SignIn component
    <>
      <main className={styles.main_container}>
        <div className={styles.sub_container}>
          <div className={styles.img_container}>
            <img src="https://cdn.pixabay.com/photo/2023/08/11/16/29/tourist-8183867_640.png"></img>
          </div>
          <form className={styles.login_container} onSubmit={handleSubmit}>
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
            <button className={styles.my_button} type="submit">Login</button>
            <div className={styles.sign_up}>
              <p>Don't have an account!</p>
              <a href="/signup">Sign up</a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
// added
export default SignIn;
