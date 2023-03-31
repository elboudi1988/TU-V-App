import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(token);
    console.log("navbartoken", token);
  }, []);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleProfileMenuClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Logo
      </Link>

      <div className={showMenu ? "navbar-menu active" : "navbar-menu"}>
        <ul className="navbar-links">
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <div className="navbar-right">
            {!isLoggedIn ? (
              <>
                <a href="/login" className="navbar-button">
                  Login
                </a>
                <a
                  href="/register"
                  className="navbar-button navbar-button-secondary"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <div
                  className="navbar-profile"
                  onClick={handleProfileMenuClick}
                >
                  <li>
                    <span>Profile</span>
                  </li>
                  <i className="fas fa-caret-down"></i>
                </div>
                {showProfileMenu && (
                  <ul className="navbar-profile-dropdown">
                    <li>
                      <Link to="/profile">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/booking">My booking</Link>
                    </li>
                    <li>
                      <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                      <button
                        className="navbar-button navbar-button-secondary"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>
        </ul>
      </div>

      <div className="navbar-hamburger" onClick={handleMenuClick}>
        <div className="navbar-hamburger-line" />
        <div className="navbar-hamburger-line" />
        <div className="navbar-hamburger-line" />
      </div>
    </nav>
  );
}

export default Navbar;
