// import React from "react";
// import { Link } from "react-router-dom";
// import "./Sidebar.css";   // import CSS file

// export default function Sidebar() {
//   return (
//     <div className="sidebar">
//       <Link to="/">Dashboard</Link>
//       <Link to="/venues">Venues</Link>
//     </div>
//   );
// }


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
    </div>
  );
}
