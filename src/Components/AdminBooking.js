// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminBooking.css";

// const AdminBooking = () => {
//   const [bookings, setBookings] = useState([]);
//   const token = localStorage.getItem("token");

//   // ✅ Fetch all bookings
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/api/booking/getAllBookings",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setBookings(response.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         if (error.response && error.response.status === 401) {
//           alert("Unauthorized! Please login again.");
//           window.location.href = "/login";
//         }
//       }
//     };

//     fetchBookings();
//   }, [token]); // runs only once on mount (or if token changes)

//   // ✅ Update booking status
//   const handleStatusChange = async (bookingId, newStatus) => {
//     try {
//       await axios.put(
//         "http://localhost:8080/api/booking/updateBooking",
//         {
//           bookingId: bookingId,
//           status: newStatus,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert(`Booking marked as ${newStatus}`);
      
//       // Refresh bookings after update
//       const response = await axios.get(
//         "http://localhost:8080/api/booking/getAllBookings",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       if (error.response && error.response.status === 401) {
//         alert("Unauthorized! Please login again.");
//         window.location.href = "/login";
//       } else {
//         alert("Failed to update booking");
//       }
//     }
//   };

//   return (
//     <div className="admin-booking-container">
//       <h2>📋 Manage Bookings</h2>
//       <div className="table-container">
//         <table className="booking-table">
//           <thead>
//             <tr>
//               <th>Sl No.</th>
//               <th>Customer</th>
//               <th>Venue</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Total Amount</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking, index) => (
//                 <tr key={booking.bookingId}>
//                   <td>{index + 1}</td>
//                   <td>{booking.userName || "N/A"}</td>
//                   <td>{booking.venueName || "N/A"}</td>
//                   <td>
//                     {booking.bookingDate
//                       ? new Date(booking.bookingDate).toLocaleDateString()
//                       : "—"}
//                   </td>
//                   <td>
//                     <span
//                       className={`status-badge ${booking.status?.toLowerCase()}`}
//                     >
//                       {booking.status}
//                     </span>
//                   </td>
//                   <td>₹{booking.totalAmount || 0}</td>
//                   <td>
//                     <button
//                       className="btn btn-success"
//                       onClick={() =>
//                         handleStatusChange(booking.bookingId, "BOOKED")
//                       }
//                     >
//                       ✅ Mark Booked
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() =>
//                         handleStatusChange(booking.bookingId, "CANCELLED")
//                       }
//                     >
//                       ❌ Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
//                   No bookings found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminBooking;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import "./AdminBooking.css";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const token = localStorage.getItem("token");

  // ✅ Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/booking/getAllBookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        if (error.response?.status === 401) {
          alert("Unauthorized! Please login again.");
          window.location.href = "/login";
        }
      }
    };
    fetchBookings();
  }, [token]);

  // ✅ Handle status update
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(
        "http://localhost:8080/api/booking/updateBooking",
        { bookingId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Booking marked as ${newStatus}`);

      const response = await axios.get(
        "http://localhost:8080/api/booking/getAllBookings",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking");
    }
  };

  // ✅ Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (b) =>
          b.userName?.toLowerCase().includes(term) ||
          b.venueName?.toLowerCase().includes(term) ||
          b.status?.toLowerCase().includes(term)
      );
      setFilteredBookings(filtered);
    }
  };

  // ✅ Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredBookings].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // handle null/undefined safely
      aValue = aValue ?? "";
      bValue = bValue ?? "";

      // date sorting
      if (key === "bookingDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredBookings(sorted);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  return (
    <div className="admin-booking-container">
      <h2>📋 Manage Bookings</h2>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search by Customer, Venue or Status..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => handleSort("userName")}>
                Customer {renderSortIcon("userName")}
              </th>
              <th onClick={() => handleSort("venueName")}>
                Venue {renderSortIcon("venueName")}
              </th>
              <th onClick={() => handleSort("bookingDate")}>
                Date {renderSortIcon("bookingDate")}
              </th>
              <th onClick={() => handleSort("status")}>
                Status {renderSortIcon("status")}
              </th>
              <th onClick={() => handleSort("totalAmount")}>
                Total Amount {renderSortIcon("totalAmount")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{index + 1}</td>
                  <td>{booking.userName || "N/A"}</td>
                  <td>{booking.venueName || "N/A"}</td>
                  <td>
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${booking.status?.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>₹{booking.totalAmount || 0}</td>
                  <td>
                    <button
                      className="btn success"
                      onClick={() =>
                        handleStatusChange(booking.bookingId, "BOOKED")
                      }
                    >
                      ✅ Book
                    </button>
                    <button
                      className="btn danger"
                      onClick={() =>
                        handleStatusChange(booking.bookingId, "CANCELLED")
                      }
                    >
                      ❌ Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooking;
