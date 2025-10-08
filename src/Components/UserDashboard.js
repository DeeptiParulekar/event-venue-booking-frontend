import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";
import { FaBuilding, FaCalendarCheck, FaClock, FaRupeeSign } from "react-icons/fa";
import CountUp from "react-countup";
import { Sparklines, SparklinesLine } from "react-sparklines";

const UserDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalVenues: 0,
    totalBookings: 0,
    upcomingBookings: 0,
    revenue: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [error, setError] = useState("");

  // Sample trend data for mini charts
  const trends = {
    totalVenues: [2, 3, 5, 4, 6, 7, metrics.totalVenues],
    totalBookings: [1, 2, 4, 3, 5, 4, metrics.totalBookings],
    upcomingBookings: [0, 1, 1, 2, 2, 3, metrics.upcomingBookings],
    revenue: [1000, 2000, 1500, 3000, 2500, 4000, metrics.revenue],
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/dashboard/metrics",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMetrics({
          totalVenues: response.data.totalVenues,
          totalBookings: response.data.totalBookings,
          upcomingBookings: response.data.upcomingBookings,
          revenue: response.data.revenue,
        });
        setRecentBookings(response.data.recentBookings);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data.");
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      {error && <p className="error">{error}</p>}

      {/* Metrics Cards */}
      <div className="metrics">
        <div className="metric-card">
          <FaBuilding size={30} className="metric-icon" />
          <h3>Total Venues</h3>
          <p><CountUp end={metrics.totalVenues} duration={1.5} /></p>
          <Sparklines data={trends.totalVenues} width={100} height={30}>
            <SparklinesLine color="#2980b9" />
          </Sparklines>
        </div>

        <div className="metric-card">
          <FaCalendarCheck size={30} className="metric-icon" />
          <h3>Total Bookings</h3>
          <p><CountUp end={metrics.totalBookings} duration={1.5} /></p>
          <Sparklines data={trends.totalBookings} width={100} height={30}>
            <SparklinesLine color="#27ae60" />
          </Sparklines>
        </div>

        <div className="metric-card">
          <FaClock size={30} className="metric-icon" />
          <h3>Upcoming Bookings</h3>
          <p><CountUp end={metrics.upcomingBookings} duration={1.5} /></p>
          <Sparklines data={trends.upcomingBookings} width={100} height={30}>
            <SparklinesLine color="#f39c12" />
          </Sparklines>
        </div>

        <div className="metric-card">
          <FaRupeeSign size={30} className="metric-icon" />
          <h3>Total Revenue</h3>
          <p>₹ <CountUp end={metrics.revenue} duration={1.5} separator="," /></p>
          <Sparklines data={trends.revenue} width={100} height={30}>
            <SparklinesLine color="#8e44ad" />
          </Sparklines>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="recent-bookings">
        <h2>Recent Bookings</h2>
        {recentBookings.length === 0 ? (
          <p>No recent bookings available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{index + 1}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.venueName}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
