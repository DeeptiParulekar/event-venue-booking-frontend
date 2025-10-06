// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css"; // can reuse same CSS

// const UserDashboard = () => {
//   const [metrics, setMetrics] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Please login to view your dashboard");
//       return;
//     }

//     axios
//       .get("http://localhost:8080/api/dashboard/user-metrics", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setMetrics(res.data))
//       .catch((err) => {
//         console.error("Error fetching user metrics:", err);
//         setError("Unable to load dashboard data. Please try again.");
//       });
//   }, []);

//   if (error) return <div className="error-message">{error}</div>;
//   if (!metrics)
//     return (
//       <div className="loading">
//         <div className="spinner"></div>
//         <p>Loading Dashboard....</p>
//       </div>
//     );

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">📊 My Dashboard</h1>

//       <div className="cards">
//         <div className="card">
//           <h3>📅 My Bookings</h3>
//           <p>{metrics.totalBookings}</p>
//         </div>
//         <div className="card">
//           <h3>💰 My Revenue</h3>
//           <p>₹{metrics.revenue}</p>
//         </div>
//         <div className="card">
//           <h3>⏳ Upcoming Bookings</h3>
//           <p>{metrics.upcomingBookings}</p>
//         </div>
//       </div>

//       <h2 className="section-title">📅 Recent Bookings</h2>
//       <div className="table-container">
//         <table className="modern-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Venue</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {metrics.recentBookings && metrics.recentBookings.length > 0 ? (
//               metrics.recentBookings.map((b) => (
//                 <tr key={b.bookingId}>
//                   <td>{b.bookingId}</td>
//                   <td>{b.venueName}</td>
//                   <td>{b.bookingDate}</td>
//                   <td>
//                     <span className={`status-badge ${b.status.toLowerCase()}`}>
//                       {b.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No recent bookings</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // can reuse same CSS

const UserDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ If no token, redirect to login immediately
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:8080/api/dashboard/user-metrics", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMetrics(res.data))
      .catch((err) => {
        console.error("Error fetching user metrics:", err);

        // ✅ If token is invalid/expired, remove token and redirect
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError("Unable to load dashboard data. Please try again.");
        }
      });
  }, []);

  if (error)
    return <div className="error-message">{error}</div>;

  if (!metrics)
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading Dashboard....</p>
      </div>
    );

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📊 My Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>📅 My Bookings</h3>
          <p>{metrics.totalBookings}</p>
        </div>
        <div className="card">
          <h3>💰 My Revenue</h3>
          <p>₹{metrics.revenue}</p>
        </div>
        <div className="card">
          <h3>⏳ Upcoming Bookings</h3>
          <p>{metrics.upcomingBookings}</p>
        </div>
      </div>

      <h2 className="section-title">📅 Recent Bookings</h2>
      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {metrics.recentBookings && metrics.recentBookings.length > 0 ? (
              metrics.recentBookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.venueName}</td>
                  <td>{b.bookingDate}</td>
                  <td>
                    <span className={`status-badge ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No recent bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
