import React, { useState } from "react";
import { createVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";
import "./Venue.css";

const CreateVenue = () => {
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState({
    name: "",
    // code: "",
    addressLine1: "",
    // addressLine2: "",
    priceperDay: "",
    city: "",
    state: "",
    pincode: "",
    capacity: "",
    contactPersonName: "",
    contactPersonNumber: "",
  });

  const handleChange = (e) => {
    setVenueData({ ...venueData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVenue(venueData);
      alert("✅ Venue created successfully!");
      navigate("/venues");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating venue.");
    }
  };

  return (
    <div className="pmms-form-container">
      <h2><span className="back-arrow" onClick={() => navigate(-1)}>←</span> Create Venue</h2>

      <form className="pmms-form" onSubmit={handleSubmit}>
        <div className="pmms-form-row">
          <label>Venue Name: <span className="required">*</span></label>
          <input type="text" name="name" placeholder="Venue Name" maxLength="100" required onChange={handleChange} />
        </div>

        {/* <div className="pmms-form-row">
          <label>Code: <span className="required">*</span></label>
          <input type="text" name="code" placeholder="Venue Code" maxLength="50" required onChange={handleChange} />
        </div> */}
        <div className="pmms-form-row">
          <label>Type: <span className="required">*</span></label>
          <input type="text" name="type" placeholder="Type" maxLength="50" required onChange={handleChange} />
        </div> 

        <div className="pmms-form-row">
          <label>Address <span className="required">*</span></label>
          <input type="text" name="addressLine1" placeholder="Address" maxLength="150" required onChange={handleChange} />
        </div>

         <div className="pmms-form-row">
          <label>Price Per Day:</label>
          <input type="text" name="priceperDay" placeholder="Price Per Day" maxLength="150" onChange={handleChange} />
        </div> 

        <div className="pmms-form-row">
          <label>City: <span className="required">*</span></label>
          <input type="text" name="city" placeholder="City" maxLength="50" required onChange={handleChange} />
        </div>

          <div className="pmms-form-row">
          <label>State: <span className="required">*</span></label>
          <input type="text" name="state" placeholder="State" maxLength="50" required onChange={handleChange} />
        </div> 

        <div className="pmms-form-row">
          <label>Pincode: <span className="required">*</span></label>
          <input type="text" name="pincode" placeholder="Pincode" maxLength="6" required onChange={handleChange} />
        </div>

        <div className="pmms-form-row">
          <label>Capacity: <span className="required">*</span></label>
          <input type="number" name="capacity" placeholder="Capacity" required onChange={handleChange} />
        </div>

        <div className="pmms-form-row">
          <label>Contact Person Name: <span className="required">*</span></label>
          <input type="text" name="contactPersonName" placeholder="Contact Person Name" maxLength="75" required onChange={handleChange} />
        </div>

        <div className="pmms-form-row">
          <label>Contact Person Number: <span className="required">*</span></label>
          <input type="text" name="contactPersonNumber" placeholder="Contact Person Phone" maxLength="25" required onChange={handleChange} />
        </div>

        <div className="pmms-form-buttons">
          <button type="submit" className="btn-save">💾 Save</button>
          <button type="reset" className="btn-clear">🔄 Clear</button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenue;
