import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiCall } from "../utils/api";
import styles from "../Styles/App.module.css";
function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      setError("");
      setIsLoading(true);
      try {
        const loginData = await apiCall(
          `${process.env.REACT_APP_API_KEY}/user/validateUser`,
          "POST",
          { email, password }
        );
        if (loginData.status === "Success") {
          navigate("/");
          window.location.reload();
          console.log("API Response:", loginData);
          setCookie("token", loginData.accessToken, { maxAge: 60 * 60 * 60 });
          setCookie("userId", loginData.userDetail.userId, {
            maxAge: 60 * 60 * 60,
          });
        } else {
          alert(loginData.message);
        }
      } catch (error) {
        console.log(`API ERROR ${error}`);
      }
    }
  };
  return (
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
            <button className={styles.my_button} type="submit">
              {isLoading ? <span className={styles.loader}></span> : "Login"}
            </button>
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
export default SignIn;
