// import React from "react";
// import { Link } from "react-router-dom";
// import { FaTachometerAlt, FaBuilding } from "react-icons/fa"; // icons
// import "./Sidebar.css";

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <Link to="/" className="sidebar-link">
//         <FaTachometerAlt className="sidebar-icon" />
//         <span>Dashboard</span>
//       </Link>

//       <Link to="/venues" className="sidebar-link">
//         <FaBuilding className="sidebar-icon" />
//         <span>Venues</span>
//       </Link>

//         <Link to="/booking" className="sidebar-link">
//         <FaBuilding className="sidebar-icon" />
//         <span>Booking</span>
//       </Link>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // make sure logo path is correct
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { to: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/venues", label: "Venues", icon: <FaBuilding /> },
    { to: "/booking", label: "Bookings", icon: <FaCalendarAlt /> },
  ];

  return (
    <>
      {/* ===== Topbar ===== */}
      <div className="topbar">
        <div className="topbar-left">
          <button className="hambtn" onClick={toggleSidebar}>
            {open ? <FaTimes /> : <FaBars />}
          </button>

          <div className="brand">
            <img src={logo} alt="Event & Venue Logo" className="logo-img" />
            <h1 className="app-title">Event & Venue Management</h1>
          </div>
        </div>

        <div className="topbar-center"></div>

        <div className="topbar-right">
          <button className="logout-btn-top" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* ===== Sidebar ===== */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`sidebar-link ${
                location.pathname === item.to ? "active" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* ===== Overlay (Mobile) ===== */}
      {open && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
