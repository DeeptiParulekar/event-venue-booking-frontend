import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css"; // Import the css file

export default function Navbar() {
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

      <Link to="/login" className="navbar-login">
        Login
      </Link>
    </nav>
  );
}
