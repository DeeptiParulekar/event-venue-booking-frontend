import React, { useEffect, useState } from "react";
import { getAllVenues, deleteVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";
import "./Venue.css";

const VenueList = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const fetchVenues = () => {
    getAllVenues()
      .then((res) => setVenues(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDeleteVenue = async (venueId) => {
    try {
      await deleteVenue(venueId);
      setMessage("✅ Venue deleted successfully!");
      fetchVenues();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting venue.");
    }
  };

  return (
    <div className="pmms-container">
      <div className="pmms-header">
        <h2>Venue Management</h2>
        <button className="pmms-create-btn" onClick={() => navigate("/create-venue")}>
          + Create Venue
        </button>
      </div>

      {message && (
        <div className={`pmms-message ${message.includes("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <div className="pmms-content">
        <div className="pmms-search">
          <input
            type="text"
            placeholder="Search by Name or Type"
            className="pmms-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="pmms-table">
          <thead>
            <tr>
              <th>Venue Name</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Price Per Day</th>
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
  {venues
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
          <button
            className="pmms-action-btn edit"
            onClick={() => navigate(`/edit-venue/${v.venueId}`)}
          >
            ✏️
          </button>
          <button
            className="pmms-action-btn view"
            onClick={() => navigate(`/view-venue/${v.venueId}`)}
          >
            👁️
          </button>
          <button
            className="pmms-action-btn delete"
            onClick={() => handleDeleteVenue(v.venueId)}
          >
            🗑️
          </button>
        </td>
      </tr>
    ))}
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
    </div>
  );
};

export default VenueList;
