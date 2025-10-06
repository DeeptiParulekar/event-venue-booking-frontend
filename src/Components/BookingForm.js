// BookingForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingForm.css"; // ✅ make sure this file exists
import Navbar from "./components/Navbar"; // if you have a navbar
import Dashboard from "./components/Dashboard"; // optional
import Sidebar from "./Sidebar";
const BookingForm = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch venues from backend
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/venues/all");
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);

  const handleVenueChange = (e) => {
    const venueName = e.target.value;
    setSelectedVenue(venueName);

    // Auto-fill totalAmount
    const venue = venues.find((v) => v.venueName === venueName);
    if (venue) {
      setTotalAmount(venue.totalAmount);
    } else {
      setTotalAmount("");
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // JWT

      const response = await axios.post(
        "http://localhost:8080/api/booking",
        {
          venueName: selectedVenue,
          bookingDate,
          totalAmount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setMessage(`Booking successful! Booking ID: ${response.data.bookingId}`);
      setSelectedVenue("");
      setBookingDate("");
      setTotalAmount("");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error creating booking");
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Venue</h2>
      <form onSubmit={handleBooking}>
        <div>
          <label>Venue</label>
          <select
            value={selectedVenue}
            onChange={handleVenueChange}
            required
          >
            <option value="">Select Venue</option>
            {venues.map((venue) => (
              <option key={venue.venueId} value={venue.venueName}>
                {venue.venueName} - ₹{venue.totalAmount}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Booking Date</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Total Amount</label>
          <input
            type="number"
            value={totalAmount}
            readOnly
          />
        </div>

        <button type="submit">Book Now</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;




