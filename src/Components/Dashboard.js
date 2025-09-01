




// import React, { useEffect, useState } from "react";

// const Dashboard = () => {
//   const [metrics, setMetrics] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/dashboard/metrics")
//       .then((res) => res.json())
//       .then((data) => {
//         setMetrics(data);
//       })
//       .catch((err) => console.error("Error fetching dashboard metrics:", err));
//   }, []);

//   if (!metrics) {
//     return <p className="text-center text-gray-500 mt-10">Loading dashboard...</p>;
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Total Products */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
//           <p className="text-3xl font-bold text-blue-600 mt-2">
//             {metrics.totalProducts}
//           </p>
//         </div>

//         {/* Total Orders */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
//           <p className="text-3xl font-bold text-green-600 mt-2">
//             {metrics.totalOrders}
//           </p>
//         </div>

//         {/* Total Customers */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h2 className="text-lg font-semibold text-gray-600">Total Customers</h2>
//           <p className="text-3xl font-bold text-purple-600 mt-2">
//             {metrics.totalCustomers}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// src/Components/Dashboard.js
import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Create this for custom styles
import { getMetrics } from "../api/dashboardApi"; // We'll create this API file

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMetrics()
      .then((res) => {
        setMetrics(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Event & Venue Dashboard</h1>

      {/* Metrics Cards */}
      <div className="metrics-cards">
        <div className="card">
          <h3>Total Venues</h3>
          <p>{metrics.totalVenues}</p>
        </div>
        <div className="card">
          <h3>Total Bookings</h3>
          <p>{metrics.totalBookings}</p>
        </div>
        <div className="card">
          <h3>Pending Approvals</h3>
          <p>{metrics.pendingApprovals}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹ {metrics.totalRevenue}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Booking Trends</h3>
          <canvas id="bookingTrendsChart"></canvas>
        </div>
        <div className="chart-card">
          <h3>Category-wise Bookings</h3>
          <canvas id="categoryChart"></canvas>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="recent-bookings">
        <h3>Recent Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Venue</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {metrics.recentBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.venue}</td>
                <td>{booking.customer}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
