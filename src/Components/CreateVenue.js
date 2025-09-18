import React, { useState, useEffect } from "react";
import { createVenue, getAllVenues } from "../api/venues";
import { useNavigate, useLocation } from "react-router-dom";
import "./Venue.css";

const CreateVenue = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [venues, setVenues] = useState([]);
  const [errors, setErrors] = useState({});

  const [venueData, setVenueData] = useState({
    name: "",
    type: "",
    addressLine1: "",
    priceperDay: "",
    city: "",
    state: "",
    pincode: "",
    capacity: "",
    contactPersonName: "",
    contactPersonNumber: "",
  });

  // Pre-fill if navigated from VenueList
  useEffect(() => {
    if (location.state) {
      setVenueData((prev) => ({
        ...prev,
        name: location.state.venueName || "",
        type: location.state.type || "",
        contactPersonName: location.state.contactpersonName || "",
        contactPersonNumber: location.state.contactpersonNumber || "",
      }));
    }
  }, [location.state]);

  // Fetch existing venues
  useEffect(() => {
    getAllVenues()
      .then((res) => setVenues(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setVenueData({ ...venueData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleClear = () => {
    setVenueData({
      name: "",
      type: "",
      addressLine1: "",
      priceperDay: "",
      city: "",
      state: "",
      pincode: "",
      capacity: "",
      contactPersonName: "",
      contactPersonNumber: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Simple validation
    if (!venueData.type.trim()) newErrors.type = "❌ Type is required";
    if (!venueData.name.trim()) newErrors.name = "❌ Venue Name is required";
    if (!venueData.addressLine1.trim()) newErrors.addressLine1 = "❌ Address is required";
    if (!venueData.contactPersonName.trim()) newErrors.contactPersonName = "❌ Contact Person Name is required";
    if (!venueData.contactPersonNumber.trim()) newErrors.contactPersonNumber = "❌ Contact Person Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Duplicate check
    const duplicate = venues.find(
      (v) =>
        v.venueName?.toLowerCase() === venueData.name.toLowerCase() &&
        v.type?.toLowerCase() === venueData.type.toLowerCase() &&
        v.contactpersonName?.toLowerCase() === venueData.contactPersonName.toLowerCase() &&
        v.contactpersonNumber === venueData.contactPersonNumber
    );

    if (duplicate) {
      newErrors.name = "❌ Duplicate venue exists with same type and contact person";
      setErrors(newErrors);
      return;
    }

    const formattedVenueData = {
      venueName: venueData.name,
      type: venueData.type,
      address: venueData.addressLine1,
      pricePerDay: parseFloat(venueData.priceperDay) || 0,
      city: venueData.city,
      state: venueData.state,
      pincode: venueData.pincode,
      capacity: parseInt(venueData.capacity),
      contactpersonName: venueData.contactPersonName,
      contactpersonNumber: venueData.contactPersonNumber,
    };

    if (formattedVenueData.pricePerDay < 2000) {
      alert("❌ Price Per Day must be greater than 2000");
      return;
    }

    try {
      await createVenue(formattedVenueData);
      alert("✅ Venue created successfully!");
      navigate("/venues");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating venue.");
    }
  };

  return (
    <div className="pmms-form-container">
      <h2>
        <span className="back-arrow" onClick={() => navigate(-1)}>←</span> Create Venue
      </h2>

      <form className="pmms-form" onSubmit={handleSubmit}>
        {/* Venue Name */}
        <div className="pmms-form-row">
          <label>Venue Name: <span className="required">*</span></label>
          <input
            type="text"
            name="name"
            placeholder="Venue Name"
            maxLength="100"
            required
            value={venueData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        {/* Type */}
        <div className="pmms-form-row">
          <label>Type: <span className="required">*</span></label>
          <input
            type="text"
            name="type"
            placeholder="Hall, Auditorium, etc."
            maxLength="50"
            required
            value={venueData.type}
            onChange={handleChange}
          />
          {errors.type && <span className="field-error">{errors.type}</span>}
        </div>

        {/* Address */}
        <div className="pmms-form-row">
          <label>Address: <span className="required">*</span></label>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address"
            maxLength="150"
            required
            value={venueData.addressLine1}
            onChange={handleChange}
          />
          {errors.addressLine1 && <span className="field-error">{errors.addressLine1}</span>}
        </div>

        {/* Price Per Day */}
        <div className="pmms-form-row">
          <label>Price Per Day (₹):</label>
          <input
            type="number"
            name="priceperDay"
            placeholder="Price Per Day"
            min="1"
            value={venueData.priceperDay}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="pmms-form-row">
          <label>City: <span className="required">*</span></label>
          <input
            type="text"
            name="city"
            placeholder="City"
            maxLength="50"
            required
            value={venueData.city}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div className="pmms-form-row">
          <label>State: <span className="required">*</span></label>
          <input
            type="text"
            name="state"
            placeholder="State"
            maxLength="50"
            required
            value={venueData.state}
            onChange={handleChange}
          />
        </div>

        {/* Pincode */}
        <div className="pmms-form-row">
          <label>Pincode: <span className="required">*</span></label>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            maxLength="6"
            required
            value={venueData.pincode}
            onChange={handleChange}
          />
        </div>

        {/* Capacity */}
        <div className="pmms-form-row">
          <label>Capacity: <span className="required">*</span></label>
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            required
            value={venueData.capacity}
            onChange={handleChange}
          />
        </div>

        {/* Contact Person Name */}
        <div className="pmms-form-row">
          <label>Contact Person Name: <span className="required">*</span></label>
          <input
            type="text"
            name="contactPersonName"
            placeholder="Contact Person Name"
            maxLength="75"
            required
            value={venueData.contactPersonName}
            onChange={handleChange}
          />
          {errors.contactPersonName && <span className="field-error">{errors.contactPersonName}</span>}
        </div>

        {/* Contact Person Number */}
        <div className="pmms-form-row">
          <label>Contact Person Number: <span className="required">*</span></label>
          <input
            type="text"
            name="contactPersonNumber"
            placeholder="Contact Person Phone"
            maxLength="25"
            required
            value={venueData.contactPersonNumber}
            onChange={handleChange}
          />
          {errors.contactPersonNumber && <span className="field-error">{errors.contactPersonNumber}</span>}
        </div>

        <div className="pmms-form-buttons">
          <button type="submit" className="btn-save">💾 Save</button>
          <button type="button" className="btn-clear" onClick={handleClear}>🔄 Clear</button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenue;
