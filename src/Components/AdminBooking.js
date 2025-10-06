// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminBooking.css";

// const AdminBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = () => {
//     setLoading(true);
//     axios
//       .get("/api/booking/getAllBookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setBookings(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Unable to fetch bookings.");
//         setLoading(false);
//       });
//   };

//   const handleStatusUpdate = (bookingId, newStatus) => {
//     axios
//       .put(
//         "/api/booking/updateBooking",
//         { bookingId, status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => fetchBookings())
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to update booking status.");
//       });
//   };

//   if (loading) return <div>Loading bookings...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="admin-bookings">
//       <h1>🗂️ Manage Bookings</h1>

//       <div className="table-container">
//         <table className="modern-table">
//           <thead>
//             <tr>
//               <th>ID</th>
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
//               bookings.map((b) => (
//                 <tr key={b.bookingId}>
//                   <td>{b.bookingId}</td>
//                   <td>{b.userEmail}</td>
//                   <td>{b.venueName}</td>
//                   <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
//                   <td>
//                     <span className={`status-badge ${b.status.toLowerCase()}`}>
//                       {b.status}
//                     </span>
//                   </td>
//                   <td>₹{b.totalAmount}</td>
//                   <td>
//                     {b.status === "PENDING" && (
//                       <>
//                         <button
//                           className="btn-approve"
//                           onClick={() =>
//                             handleStatusUpdate(b.bookingId, "PAID")
//                           }
//                         >
//                           ✅ Mark Paid
//                         </button>
//                         <button
//                           className="btn-cancel"
//                           onClick={() =>
//                             handleStatusUpdate(b.bookingId, "CANCELLED")
//                           }
//                         >
//                           ❌ Cancel
//                         </button>
//                       </>
//                     )}
//                     {b.status !== "PENDING" && <span>—</span>}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No bookings found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminBookings;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBooking.css";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = () => {
      setLoading(true);
      axios
        .get("/api/booking/getAllBookings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Unable to fetch bookings.");
          setLoading(false);
        });
    };

    fetchBookings();
  }, [token]); // ✅ token as dependency, no ESLint warning

  const handleStatusUpdate = (bookingId, newStatus) => {
    axios
      .put(
        "/api/booking/updateBooking",
        { bookingId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        // Refresh bookings after status change
        const fetchBookings = () => {
          setLoading(true);
          axios
            .get("/api/booking/getAllBookings", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              setBookings(res.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setError("Unable to fetch bookings.");
              setLoading(false);
            });
        };
        fetchBookings();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update booking status.");
      });
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-bookings">
      <h1>🗂️ Manage Bookings</h1>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.userEmail}</td>
                  <td>{b.venueName}</td>
                  <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>₹{b.totalAmount}</td>
                  <td>
                    {b.status === "PENDING" ? (
                      <>
                        <button
                          className="btn-approve"
                          onClick={() =>
                            handleStatusUpdate(b.bookingId, "PAID")
                          }
                        >
                          ✅ Mark Paid
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() =>
                            handleStatusUpdate(b.bookingId, "CANCELLED")
                          }
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBooking;
