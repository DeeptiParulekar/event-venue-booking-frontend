
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav style={{
      padding: "10px 20px",
      background: "#4c5e79",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Event & Venue Booking Logo"
          style={{ height: 50, width: "auto", marginRight: 16, objectFit: "contain" }}
        />
        <span style={{ fontSize: 22, fontWeight: "bold" }}>Event & Venue Booking</span>
      </div>

      {/* Login button */}
      <Link 
        to="/login"
        style={{
          padding: "6px 14px",
          backgroundColor: "#ffb400",
          color: "#000",
          textDecoration: "none",
          fontWeight: "bold",
          borderRadius: 4,
          fontSize: 16
        }}
      >
        Login
      </Link>
    </nav>
  );
}
