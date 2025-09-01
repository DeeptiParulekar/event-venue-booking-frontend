import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: 200,
      height: "100vh",
      backgroundColor: "#2c3e50",
      color: "white",
      display: "flex",
      flexDirection: "column",
      paddingTop: 20
    }}>
      <Link 
        to="/" 
        style={{ color: "white", textDecoration: "none", padding: "10px 20px", fontSize: 18 }}
      >
        Dashboard
      </Link>
      <Link 
        to="/venues" 
        style={{ color: "white", textDecoration: "none", padding: "10px 20px", fontSize: 18 }}
      >
        Venues
      </Link>
    </div>
  );
}
