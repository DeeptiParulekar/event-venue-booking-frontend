import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar({ hideLoginButton, token, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Event & Venue Booking Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">Event & Venue Booking</span>
      </div>

      <div className="navbar-right">
        {/* Show login link only if not logged in */}
        {!token && !hideLoginButton && (
          <Link to="/login" className="navbar-login">
            Login
          </Link>
        )}

        {/* Show logout button only if logged in */}
        {token && (
          <button className="navbar-logout" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
