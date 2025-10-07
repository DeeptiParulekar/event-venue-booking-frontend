// import React, { useEffect, useState } from "react";
// import { getAllVenues, deleteVenue } from "../api/venues";
// import { useNavigate } from "react-router-dom";
// import { Search, ArrowUpDown } from "lucide-react"; // ✅ Import icons
// import "./Venue.css";

// const VenueList = () => {
//   const navigate = useNavigate();
//   const [venues, setVenues] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

//   const fetchVenues = () => {
//     getAllVenues()
//       .then((res) => setVenues(res.data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchVenues();
//   }, []);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const handleDeleteVenue = async (venueId) => {
//     try {
//       await deleteVenue(venueId);
//       setMessage("✅ Venue deleted successfully!");
//       fetchVenues();
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Error deleting venue.");
//     }
//   };

//   // ✅ Sorting Logic
//   const handleSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedVenues = [...venues].sort((a, b) => {
//     if (sortConfig.key) {
//       const valA = a[sortConfig.key]?.toString().toLowerCase() || "";
//       const valB = b[sortConfig.key]?.toString().toLowerCase() || "";
//       if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
//       if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;
//       return 0;
//     }
//     return 0;
//   });

//   return (
//     <div className="pmms-container">
//       <h2>📍 Venue Management</h2>

//       {message && (
//         <div
//           className={`pmms-message ${
//             message.includes("Error") ? "error" : "success"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* ✅ Search + Create Button Row */}
//       <div className="pmms-topbar">
//         <div className="pmms-search-wrapper">
//           <Search className="pmms-search-icon" size={18} />
//           <input
//             type="text"
//             placeholder="Search by Name or Type"
//             className="pmms-search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <button
//           className="pmms-create-btn"
//           onClick={() => navigate("/create-venue")}
//         >
//           + Create Venue
//         </button>
//       </div>

//       <table className="pmms-table">
//         <thead>
//           <tr>
//             <th onClick={() => handleSort("venueName")}>
//               Venue Name <ArrowUpDown size={14} className="sort-icon" />
//             </th>
//             <th onClick={() => handleSort("type")}>
//               Type <ArrowUpDown size={14} className="sort-icon" />
//             </th>
//             <th>Capacity</th>
//             <th onClick={() => handleSort("pricePerDay")}>
//               Price Per Day <ArrowUpDown size={14} className="sort-icon" />
//             </th>
//             <th>Address</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Pincode</th>
//             <th>Contact Person</th>
//             <th>Contact Number</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedVenues
//             .filter(
//               (v) =>
//                 (v.venueName &&
//                   v.venueName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//                 (v.type && v.type.toLowerCase().includes(searchTerm.toLowerCase()))
//             )
//             .map((v) => (
//               <tr key={v.venueId}>
//                 <td>{v.venueName}</td>
//                 <td>{v.type}</td>
//                 <td>{v.capacity}</td>
//                 <td>₹ {v.pricePerDay}</td>
//                 <td>{v.address}</td>
//                 <td>{v.city}</td>
//                 <td>{v.state}</td>
//                 <td>{v.pincode}</td>
//                 <td>{v.contactpersonName}</td>
//                 <td>{v.contactpersonNumber}</td>
//                 <td>
//                   <button
//                     className="pmms-action-btn edit"
//                     onClick={() => navigate(`/edit-venue/${v.venueId}`)}
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     className="pmms-action-btn view"
//                     onClick={() => navigate(`/view-venue/${v.venueId}`)}
//                   >
//                     👁️
//                   </button>
//                   <button
//                     className="pmms-action-btn delete"
//                     onClick={() => handleDeleteVenue(v.venueId)}
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       <div className="pmms-pagination">
//         <span>Items per page: 5</span>
//         <button>⏪</button>
//         <button>◀</button>
//         <span>
//           1 - {venues.length} of {venues.length}
//         </span>
//         <button>▶</button>
//         <button>⏩</button>
//       </div>
//     </div>
//   );
// };

// export default VenueList;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ArrowUpDown } from "lucide-react";
// import axios from "axios";
// import "./Venue.css";

// const VenueList = () => {
//   const navigate = useNavigate();
//   const [venues, setVenues] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [message, setMessage] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const token = localStorage.getItem("token");
//   const axiosConfig = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // ✅ Fetch All Venues
//   const fetchVenues = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/venues", axiosConfig);
//       setVenues(res.data);
//     } catch (err) {
//       console.error("Error fetching venues:", err);
//     }
//   };

//   useEffect(() => {
//     fetchVenues();
//   }, []);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   // ✅ Delete Venue
//   const handleDeleteVenue = async (venueId) => {
//     if (!window.confirm("Are you sure you want to delete this venue?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/venues/${venueId}`, axiosConfig);
//       setMessage("✅ Venue deleted successfully!");
//       fetchVenues();
//     } catch (err) {
//       console.error("Error deleting venue:", err);
//       setMessage("❌ Error deleting venue.");
//     }
//   };

//   // ✅ Sorting Logic
//   const handleSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedVenues = [...venues].sort((a, b) => {
//     if (sortConfig.key) {
//       const valA = a[sortConfig.key]?.toString().toLowerCase() || "";
//       const valB = b[sortConfig.key]?.toString().toLowerCase() || "";
//       if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
//       if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;
//       return 0;
//     }
//     return 0;
//   });

//   // ✅ Pagination Logic
//   const filteredVenues = sortedVenues.filter(
//     (v) =>
//       (v.venueName &&
//         v.venueName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (v.type && v.type.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage);
//   const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);

//   return (
//     <div className="pmms-container">
//       <h2>📍 Venue Management</h2>

//       {message && (
//         <div
//           className={`pmms-message ${
//             message.includes("Error") ? "error" : "success"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* ✅ Search + Create Button Row */}
//       <div className="pmms-topbar">
//         <div className="pmms-search-wrapper">
//           <Search className="pmms-search-icon" size={18} />
//           <input
//             type="text"
//             placeholder="Search by Name or Type"
//             className="pmms-search-input"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <button
//           className="pmms-create-btn"
//           onClick={() => navigate("/create-venue")}
//         >
//           + Create Venue
//         </button>
//       </div>

//       <table className="pmms-table">
//         <thead>
//           <tr>
//             <th onClick={() => handleSort("venueName")}>
//               Venue Name <ArrowUpDown size={14} className="sort-icon" />
//             </th>
//             <th onClick={() => handleSort("type")}>
//               Type <ArrowUpDown size={14} className="sort-icon" />
//             </th>
//             <th>Capacity</th>
//             <th onClick={() => handleSort("pricePerDay")}>
//               Price Per Day <ArrowUpDown size={14} className="sort-icon" />
//             </th>
//             <th>Address</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Pincode</th>
//             <th>Contact Person</th>
//             <th>Contact Number</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentVenues.length > 0 ? (
//             currentVenues.map((v) => (
//               <tr key={v.venueId}>
//                 <td>{v.venueName}</td>
//                 <td>{v.type}</td>
//                 <td>{v.capacity}</td>
//                 <td>₹ {v.pricePerDay}</td>
//                 <td>{v.address}</td>
//                 <td>{v.city}</td>
//                 <td>{v.state}</td>
//                 <td>{v.pincode}</td>
//                 <td>{v.contactpersonName}</td>
//                 <td>{v.contactpersonNumber}</td>
//                 <td>
//                   <button
//                     className="pmms-action-btn edit"
//                     onClick={() => navigate(`/edit-venue/${v.venueId}`)}
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     className="pmms-action-btn view"
//                     onClick={() => navigate(`/view-venue/${v.venueId}`)}
//                   >
//                     👁️
//                   </button>
//                   <button
//                     className="pmms-action-btn delete"
//                     onClick={() => handleDeleteVenue(v.venueId)}
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11" className="no-data">
//                 No venues found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* ✅ Pagination */}
//       <div className="pmms-pagination">
//         <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
//           ⏪
//         </button>
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           ◀
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           ▶
//         </button>
//         <button
//           onClick={() => setCurrentPage(totalPages)}
//           disabled={currentPage === totalPages}
//         >
//           ⏩
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VenueList;





import React, { useState, useEffect, useCallback } from "react";
import { getAllVenues, deleteVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";
import { Search, ArrowUpDown } from "lucide-react";
import "./Venue.css";

const VenueList = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  // ✅ Fetch venues
  const fetchVenues = useCallback(() => {
    getAllVenues()
      .then((res) => setVenues(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  // Auto-hide messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ✅ Delete venue
  const handleDeleteVenue = async (venueId) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await deleteVenue(venueId);
      setMessage("✅ Venue deleted successfully!");
      fetchVenues();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting venue.");
    }
  };

  // ✅ Sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedVenues = [...venues].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase() || "";
    const valB = b[sortConfig.key]?.toString().toLowerCase() || "";
    if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  return (
    <div className="pmms-container">
      <h2>📍 Venue Management</h2>

      {message && (
        <div className={`pmms-message ${message.includes("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      {/* Search + Create row */}
      <div className="pmms-topbar">
        <div className="pmms-search-wrapper">
          <Search className="pmms-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by Name or Type"
            className="pmms-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="pmms-create-btn" onClick={() => navigate("/create-venue")}>
          + Create Venue
        </button>
      </div>

      <table className="pmms-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("venueName")}>
              Venue Name <ArrowUpDown size={14} className="sort-icon" />
            </th>
            <th onClick={() => handleSort("type")}>
              Type <ArrowUpDown size={14} className="sort-icon" />
            </th>
            <th>Capacity</th>
            <th onClick={() => handleSort("pricePerDay")}>
              Price Per Day <ArrowUpDown size={14} className="sort-icon" />
            </th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedVenues
            .filter(
              (v) =>
                (v.venueName && v.venueName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (v.type && v.type.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((v) => (
              <tr key={v.venueId}>
                <td>{v.venueName}</td>
                <td>{v.type}</td>
                <td>{v.capacity}</td>
                <td>₹ {v.pricePerDay}</td>
                <td>{v.address}</td>
                <td>{v.city}</td>
                <td>{v.state}</td>
                <td>{v.pincode}</td>
                <td>{v.contactpersonName}</td>
                <td>{v.contactpersonNumber}</td>
                <td>
                  <button className="pmms-action-btn edit" onClick={() => navigate(`/edit-venue/${v.venueId}`)}>✏️</button>
                  <button className="pmms-action-btn view" onClick={() => navigate(`/view-venue/${v.venueId}`)}>👁️</button>
                  <button className="pmms-action-btn delete" onClick={() => handleDeleteVenue(v.venueId)}>🗑️</button>
                </td>
              </tr>
            ))}
          {sortedVenues.filter(
            (v) =>
              (v.venueName && v.venueName.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (v.type && v.type.toLowerCase().includes(searchTerm.toLowerCase()))
          ).length === 0 && (
            <tr>
              <td colSpan="11" style={{ textAlign: "center", padding: "1rem" }}>No venues found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pmms-pagination">
        <span>Items per page: 5</span>
        <button>⏪</button>
        <button>◀</button>
        <span>1 - {venues.length} of {venues.length}</span>
        <button>▶</button>
        <button>⏩</button>
      </div>
    </div>
  );
};

export default VenueList;
