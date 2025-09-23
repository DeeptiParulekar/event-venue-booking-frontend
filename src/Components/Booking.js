// // src/Components/Booking.js
// import React, { useState, useEffect } from "react";
// import { createBooking } from "../Services/BookingService";

// import axios from "axios";
// import "./Booking.css";

// const Booking = () => {
//   const [venues, setVenues] = useState([]);
//   const [selectedVenue, setSelectedVenue] = useState("");
//   const [bookingDate, setBookingDate] = useState("");
//   const [totalAmount, setTotalAmount] = useState("");
//   const [message, setMessage] = useState("");

//   // Fetch venues from backend
//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/venues/getAll");
//         setVenues(response.data);
//       } catch (error) {
//         console.error("Error fetching venues:", error);
//       }
//     };
//     fetchVenues();
//   }, []);

//   // Auto-fill total amount when venue is selected
//   useEffect(() => {
//     if (selectedVenue) {
//       const venue = venues.find(v => v.venueName === selectedVenue);
//       setTotalAmount(venue ? venue.totalAmount : "");
//     } else {
//       setTotalAmount("");
//     }
//   }, [selectedVenue, venues]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedVenue) {
//       setMessage("❌ Please select a venue");
//       return;
//     }

//     const bookingData = { venueName: selectedVenue, bookingDate, totalAmount };

//     try {
//       const response = await createBooking(bookingData);
//       setMessage("✅ Booking successful! 🎉 ID: " + response.bookingId);
//       setSelectedVenue("");
//       setBookingDate("");
//       setTotalAmount("");
//     } catch (error) {
//       setMessage("❌ Booking failed: " + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <div className="booking-page">
//       <div className="booking-card">
//         <h2 className="booking-title">Book Your Venue</h2>
//         <form onSubmit={handleSubmit} className="booking-form">

//           <div className="form-group">
//             <label>Venue</label>
//             <select
//               value={selectedVenue}
//               onChange={(e) => setSelectedVenue(e.target.value)}
//               required
//             >
//               <option value="">-- Select Venue --</option>
//               {venues.map(v => (
//                 <option key={v.venueId} value={v.venueName}>
//                   {v.venueName} - ₹{v.totalAmount}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Booking Date</label>
//             <input
//               type="date"
//               value={bookingDate}
//               onChange={(e) => setBookingDate(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Total Amount (₹)</label>
//             <input
//               type="number"
//               value={totalAmount}
//               readOnly
//               className="readonly-input"
//             />
//           </div>

//           <button type="submit" className="booking-btn">Book Now</button>
//         </form>

//         {message && <p className="booking-message">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Booking;




import React, { useState, useEffect } from "react";
import { createBooking } from "../Services/BookingService";
import axios from "axios";

import "./Booking.css";


const Booking = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/venues/getAll");
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    fetchVenues();
  }, []);

  // Automatically set totalAmount when venue changes
  useEffect(() => {
    const venue = venues.find((v) => v.venueName === selectedVenue);
    if (venue) {
      setTotalAmount(venue.pricePerDay);
    } else {
      setTotalAmount("");
    }
  }, [selectedVenue, venues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      venueName: selectedVenue,
      bookingDate,
      totalAmount,
    };

    try {
      const response = await createBooking(bookingData);
      setMessage("Booking successful! 🎉 ID: " + response.bookingId);
      setSelectedVenue("");
      setBookingDate("");
      setTotalAmount("");
    } catch (error) {
      setMessage("Booking failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="booking-form">
      <h2>Book Your Venue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Venue</label>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            required
          >
            <option value="">Select Venue</option>
            {venues.map((venue) => (
              <option key={venue.venueId} value={venue.venueName}>
                {venue.venueName}
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
          <label>Total Amount (₹)</label>
          <input type="number" value={totalAmount} readOnly />
        </div>

        <button type="submit">Book Now</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Booking;
