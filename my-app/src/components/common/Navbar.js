import styles from "./Navbar.module.css";
import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
// import { Navbar, Nav, Container } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navtab = () => {
  // const [navbar, setNavbar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  // const changeBackground = () => {
  //   if (window.scrollY >= 80) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', changeBackground);
  //   return () => {
  //     window.removeEventListener('scroll', changeBackground);
  //   };
  // }, []);

  useEffect(() => {
    const token = Cookies.get("token"); // Get the token from cookies
    console.log("Token from cookies:", token); // Debugging statement
    if (token) {
      try {
        const userDetails = jwtDecode(token);
        console.log("Decoded user details:", userDetails); // Debugging statement
        if (userDetails && userDetails.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error); // Debugging statement
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [Cookies.get("token")]);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token from cookies
    navigate("/signin"); // Redirect to the login page
  };

  return (
    <>
      <nav>
        <div className={styles.container}>
          <a href="/" className={styles.navbarBrand}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2907/2907086.png"
              alt="Travel Blog Logo"
              className={styles.logo}
            />
            Trip Trove
          </a>
          <div>
            <ul className={styles.navbar_nav}>
              <li>
                <a href="/">
                  <i className="fa-duotone fa-solid fa-house fa-lg"></i>
                </a>
              </li>
              <li>
                <a href="/signin">
                  <i className="fa-duotone fa-solid fa-right-to-bracket fa-lg"></i>
                </a>
              </li>
              <li>
                <a href="/blogs">
                  <i className="fa-duotone fa-solid fa-envelopes-bulk fa-lg"></i>
                </a>
              </li>
              <li>
                <a href="/viewblog">Your Blogs</a>
              </li>
              <li>
                <a href="/postpage">feeds</a>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <a href="/admin/dashboard">
                    <i className="fa-duotone fa-solid fa-chart-simple fa-lg"></i>
                  </a>
                </li>
              )}
              <li>
                <a href="#" onClick={handleLogout}>
                  <i className="fa-duotone fa-solid fa-right-from-bracket fa-lg"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header>
        <main>
          <Outlet />
        </main>
      </header>
    </>
  );
};

export default Navtab;
