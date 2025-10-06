// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
// import axios from "axios";

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//   const token = localStorage.getItem("token");
// console.log(localStorage.getItem("token"));
//   // axios
//   //   .get("http://localhost:8080/api/dashboard/metrics",
//   axios.get("/api/dashboard/metrics", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       setMetrics(response.data);
//     })
//     .catch((err) => {
//       console.error("Error fetching metrics:", err);
//       setError("Unable to load dashboard data. Please try again.");
//     });
// }, []);

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   if (!metrics) {
//     return (
//       <div className="loading">
//         <div className="spinner"></div>
//         <p>Loading Dashboard....</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">📊 Dashboard</h1>

//       {/* Metrics Cards */}
//       <div className="cards">
//         <div className="card">
//           <h3>📅 Total Bookings</h3>
//           <p>{metrics.totalBookings}</p>
//         </div>
//         <div className="card">
//           <h3>📍 Total Venues</h3>
//           <p>{metrics.totalVenues}</p>
//         </div>
//         <div className="card">
//           <h3>👥 Total Customers</h3>
//           <p>{metrics.totalCustomers}</p>
//         </div>
//         <div className="card">
//           <h3>💰 Revenue</h3>
//           <p>₹{metrics.revenue}</p>
//         </div>
//       </div>

//       {/* Recent Bookings Table */}
//       <h2 className="section-title">📅 Recent Bookings</h2>
//       <div className="table-container">
//         <table className="modern-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Venue</th>
//               <th>Customer</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {metrics.recentBookings && metrics.recentBookings.length > 0 ? (
//               metrics.recentBookings.map((booking) => (
//                 <tr key={booking.id}>
//                   <td>{booking.id}</td>
//                   <td>{booking.venue}</td>
//                   <td>{booking.customer}</td>
//                   <td>{booking.date}</td>
//                   <td>
//                     <span className={`status-badge ${booking.status.toLowerCase()}`}>
//                       {booking.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No recent bookings</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("/api/dashboard/metrics", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMetrics(response.data);
      })
      .catch((err) => {
        console.error("Error fetching metrics:", err);
        setError("Unable to load dashboard data. Please try again.");
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!metrics) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading Dashboard....</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📊 Admin Dashboard</h1>

      {/* Metrics Cards */}
      <div className="cards">
        <div className="card">
          <h3>📅 Total Bookings</h3>
          <p>{metrics.totalBookings}</p>
        </div>
        <div className="card">
          <h3>📍 Total Venues</h3>
          <p>{metrics.totalVenues}</p>
        </div>
        <div className="card">
          <h3>👥 Total Customers</h3>
          <p>{metrics.totalCustomers || "-"}</p>
        </div>
        <div className="card">
          <h3>💰 Revenue</h3>
          <p>₹{metrics.revenue}</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <h2 className="section-title">📅 Recent Bookings</h2>
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Venue</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {metrics.recentBookings && metrics.recentBookings.length > 0 ? (
              metrics.recentBookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.venueName}</td>
                  <td>{booking.userEmail}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No recent bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
