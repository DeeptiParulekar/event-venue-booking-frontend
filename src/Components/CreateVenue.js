import React, { useState } from "react";
import { createVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";
import "./Venue.css";

const CreateVenue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    capacity: "",
    pricePerDay: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateVenue = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createVenue({
        name: formData.name,
        type: formData.type,
        address: formData.address,
        capacity: parseInt(formData.capacity),
        pricePerDay: parseFloat(formData.pricePerDay),
      });
      setMessage("✅ Venue created successfully!");
      setFormData({ name: "", type: "", address: "", capacity: "", pricePerDay: "" });

      // Redirect back to Venue Management page
      setTimeout(() => navigate("/venues"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating venue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="venue-container">
      <h1>Create New Venue</h1>

      {message && (
        <div className={`message ${message.includes("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleCreateVenue} className="venue-form">
        <input type="text" name="name" placeholder="Venue Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="type" placeholder="Type (HALL, RESORT, etc.)" value={formData.type} onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
        <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleInputChange} required />
        <input type="number" name="pricePerDay" placeholder="Price per Day (₹)" value={formData.pricePerDay} onChange={handleInputChange} required />
        <button type="submit" className="create-btn" disabled={loading}>
          {loading ? "Creating..." : "+ Create Venue"}
        </button>
      </form>
    </div>
  );
};

export default CreateVenue;
