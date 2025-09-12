import React, { useEffect, useState } from "react";
import { getAllVenues, deleteVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";
import "./Venue.css";

const Venues = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
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
    <div className="venue-container">
      <div className="venue-header">
        <h1>Venue Management</h1>
        <button
          className="create-btn"
          onClick={() => navigate("/create-venue")}
        >
          + Create Venue
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <div className="venue-content">
        {/* Venue List Table */}
        <div className="venue-list">
          <h2>Existing Venues</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Price/Day</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((v) => (
                <tr key={v.venueId}>
                  <td>{v.venueId}</td>
                  <td>{v.name}</td>
                  <td>{v.type}</td>
                  <td>{v.capacity}</td>
                  <td>₹ {v.pricePerDay}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteVenue(v.venueId)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Venues;
