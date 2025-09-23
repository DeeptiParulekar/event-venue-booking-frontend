import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBuilding } from "react-icons/fa"; // icons
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-link">
        <FaTachometerAlt className="sidebar-icon" />
        <span>Dashboard</span>
      </Link>

      <Link to="/venues" className="sidebar-link">
        <FaBuilding className="sidebar-icon" />
        <span>Venues</span>
      </Link>

        <Link to="/booking" className="sidebar-link">
        <FaBuilding className="sidebar-icon" />
        <span>Booking</span>
      </Link>
    </div>
  );
}
