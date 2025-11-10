import React, { useState, useEffect } from "react";
import { createVenue, getAllVenues } from "../api/venues";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    if (!venueData.type.trim()) newErrors.type = "❌ Type is required";
    if (!venueData.name.trim()) newErrors.name = "❌ Venue Name is required";
    if (!venueData.addressLine1.trim()) newErrors.addressLine1 = "❌ Address is required";
    if (!venueData.contactPersonName.trim()) newErrors.contactPersonName = "❌ Contact Person Name is required";
    if (!venueData.contactPersonNumber.trim()) newErrors.contactPersonNumber = "❌ Contact Person Number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check for duplicates
    const duplicate = venues.find(
      (v) =>
        v.venueName?.trim().toLowerCase() === venueData.name.trim().toLowerCase() &&
        v.type?.trim().toLowerCase() === venueData.type.trim().toLowerCase() &&
        v.contactpersonName?.trim().toLowerCase() === venueData.contactPersonName.trim().toLowerCase() &&
        v.contactpersonNumber?.trim() === venueData.contactPersonNumber.trim()
    );

    if (duplicate) {
      return toast.error("❌ Duplicate venue exists with same type and contact person", {
        position: "top-right",
      });
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
      return toast.error("❌ Price Per Day must be greater than 2000", {
        position: "top-right",
      });
    }

    try {
      await createVenue(formattedVenueData);
      toast.success("✅ Venue created successfully!", { position: "top-right" });

      // Wait for toast to display before navigating
      setTimeout(() => navigate("/venues"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Error creating venue. Please try again.", { position: "top-right" });
    }
  };

  return (
    <div className="pmms-form-wrapper">
      <div className="pmms-form-header">
        <h2>
          <span className="back-arrow" onClick={() => navigate(-1)}>←</span> Create Venue
        </h2>
        <p className="pmms-form-subtitle">Add details for a new venue to manage bookings effectively</p>
      </div>

      <form className="pmms-form enhanced" onSubmit={handleSubmit}>
        <div className="pmms-form-grid">
          <div className="pmms-form-row">
            <label>Venue Name <span className="required">*</span></label>
            <input type="text" name="name" value={venueData.name} onChange={handleChange} placeholder="Venue Name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="pmms-form-row">
            <label>Type <span className="required">*</span></label>
            <input type="text" name="type" value={venueData.type} onChange={handleChange} placeholder="Hall, Auditorium, etc." />
            {errors.type && <span className="field-error">{errors.type}</span>}
          </div>

          <div className="pmms-form-row">
            <label>Address <span className="required">*</span></label>
            <input type="text" name="addressLine1" value={venueData.addressLine1} onChange={handleChange} placeholder="Address" />
            {errors.addressLine1 && <span className="field-error">{errors.addressLine1}</span>}
          </div>

          <div className="pmms-form-row">
            <label>Price Per Day (₹)</label>
            <input type="number" name="priceperDay" value={venueData.priceperDay} onChange={handleChange} placeholder="Price Per Day" />
          </div>

          <div className="pmms-form-row">
            <label>City <span className="required">*</span></label>
            <input type="text" name="city" value={venueData.city} onChange={handleChange} placeholder="City" />
          </div>

          <div className="pmms-form-row">
            <label>State <span className="required">*</span></label>
            <input type="text" name="state" value={venueData.state} onChange={handleChange} placeholder="State" />
          </div>

          <div className="pmms-form-row">
            <label>Pincode <span className="required">*</span></label>
            <input type="text" name="pincode" value={venueData.pincode} onChange={handleChange} placeholder="Pincode" />
          </div>

          <div className="pmms-form-row">
            <label>Capacity <span className="required">*</span></label>
            <input type="number" name="capacity" value={venueData.capacity} onChange={handleChange} placeholder="Capacity" />
          </div>

          <div className="pmms-form-row">
            <label>Contact Person Name <span className="required">*</span></label>
            <input type="text" name="contactPersonName" value={venueData.contactPersonName} onChange={handleChange} placeholder="Contact Person Name" />
            {errors.contactPersonName && <span className="field-error">{errors.contactPersonName}</span>}
          </div>

          <div className="pmms-form-row">
            <label>Contact Person Number <span className="required">*</span></label>
            <input type="text" name="contactPersonNumber" value={venueData.contactPersonNumber} onChange={handleChange} placeholder="Contact Person Phone" />
            {errors.contactPersonNumber && <span className="field-error">{errors.contactPersonNumber}</span>}
          </div>
        </div>

        <div className="pmms-form-buttons">
          <button type="submit" className="btn-save">💾 Save Venue</button>
          <button type="button" className="btn-clear" onClick={handleClear}>🔄 Clear</button>
        </div>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default CreateVenue;
