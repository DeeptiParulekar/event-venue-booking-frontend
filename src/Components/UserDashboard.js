import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";
import {
  FaBuilding,
  FaCalendarCheck,
  FaClock,
  FaRupeeSign,
  FaTimesCircle,
} from "react-icons/fa";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const UserDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalVenues: 0,
    totalBookings: 0,
    upcomingBookings: 0,
    totalAmountSpent: 0,
    totalCancellations: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedView, setSelectedView] = useState("dashboard");
  const [error, setError] = useState("");

  // Sample chart data (replace with backend values later)
  const bookingsPerVenue = [
    { name: "Grand Resort", booked: 3, cancelled: 1, revenue: 50000 },
    { name: "Paradise Hall", booked: 2, cancelled: 0, revenue: 30000 },
    { name: "Ocean View", booked: 4, cancelled: 2, revenue: 70000 },
  ];

  const statusCounts = [
    { name: "Booked", value: 10 },
    { name: "Pending", value: 3 },
    { name: "Cancelled", value: 2 },
  ];

  const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/dashboard/user-metrics",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMetrics({
        totalVenues: response.data.totalVenues,
        totalBookings: response.data.totalBookings,
        upcomingBookings: response.data.upcomingBookings,
        totalAmountSpent: response.data.totalAmountSpent,
        totalCancellations: response.data.totalCancellations,
      });

      // Merge AI + regular bookings
      const aiBookings = response.data.aiBookings || [];
      const combinedBookings = [
        ...(response.data.recentBookings || []),
        ...aiBookings,
      ];

      setRecentBookings(combinedBookings);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch dashboard data.");
    }
  };

  const fetchVenues = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8080/api/venues/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVenues(res.data);
      setSelectedView("venues");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch venues.");
    }
  };

  const handleMetricClick = (metric) => {
    if (metric === "venues") fetchVenues();
    else if (metric === "bookings") setSelectedView("bookings");
    else if (metric === "upcoming") setSelectedView("upcoming");
    else if (metric === "amount") setSelectedView("amount");
    else if (metric === "cancellations") setSelectedView("cancellations");
    else setSelectedView("dashboard");
  };

  const filteredBookings =
    selectedView === "upcoming"
      ? recentBookings.filter((b) =>
          b.status?.toLowerCase().includes("upcoming")
        )
      : selectedView === "cancellations"
      ? recentBookings.filter((b) =>
          b.status?.toLowerCase().includes("cancel")
        )
      : recentBookings;

  return (
    <div className="dashboard-container">
      <h1>📊 User Dashboard</h1>
      {error && <p className="error">{error}</p>}

      {/* ===== Metrics Cards ===== */}
      <div className="metrics">
        <div
          className={`metric-card ${selectedView === "venues" ? "active" : ""}`}
          onClick={() => handleMetricClick("venues")}
        >
          <FaBuilding size={30} className="metric-icon" />
          <h3>Total Venues</h3>
          <p>
            <CountUp end={metrics.totalVenues} duration={1.5} />
          </p>
        </div>

        <div
          className={`metric-card ${
            selectedView === "bookings" ? "active" : ""
          }`}
          onClick={() => handleMetricClick("bookings")}
        >
          <FaCalendarCheck size={30} className="metric-icon" />
          <h3>Total Bookings</h3>
          <p>
            <CountUp end={metrics.totalBookings} duration={1.5} />
          </p>
        </div>

        <div
          className={`metric-card ${
            selectedView === "upcoming" ? "active" : ""
          }`}
          onClick={() => handleMetricClick("upcoming")}
        >
          <FaClock size={30} className="metric-icon" />
          <h3>Upcoming Bookings</h3>
          <p>
            <CountUp end={metrics.upcomingBookings} duration={1.5} />
          </p>
        </div>

        <div
          className={`metric-card ${
            selectedView === "amount" ? "active" : ""
          }`}
          onClick={() => handleMetricClick("amount")}
        >
          <FaRupeeSign size={30} className="metric-icon" />
          <h3>Total Amount Spent</h3>
          <p>
            ₹
            <CountUp
              end={metrics.totalAmountSpent}
              duration={1.5}
              separator=","
            />
          </p>
        </div>

        <div
          className={`metric-card ${
            selectedView === "cancellations" ? "active" : ""
          }`}
          onClick={() => handleMetricClick("cancellations")}
        >
          <FaTimesCircle size={30} className="metric-icon" />
          <h3>Total Cancellations</h3>
          <p>
            <CountUp end={metrics.totalCancellations} duration={1.5} />
          </p>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="charts-container">
        <div className="chart-box">
          <h4>📊 Bookings & Revenue Per Venue</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsPerVenue} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="booked" stackId="a" fill="#4CAF50" name="Booked" />
              <Bar dataKey="cancelled" stackId="a" fill="#F44336" name="Cancelled" />
              <Bar dataKey="revenue" fill="#2196F3" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>📈 Booking Status Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== VENUES VIEW ===== */}
      {selectedView === "venues" && (
        <div className="venues-list">
          <h2>🏢 Available Venues</h2>
          {venues.length === 0 ? (
            <p>No venues found.</p>
          ) : (
            <table className="venues-table">
              <thead>
                <tr>
                  <th>Venue Name</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Price Per Day</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Contact Person</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
              {venues.map((venue, index) => (
  <tr key={venue.venueId || index}>
    <td>{venue.venueName}</td>
    <td>{venue.type}</td>
    <td>{venue.capacity}</td>
    <td>₹{venue.pricePerDay}</td>
    <td>{venue.address}</td>
    <td>{venue.city}</td>
    <td>{venue.state}</td>
    <td>{venue.pincode}</td>
    <td>{venue.contactpersonName || "-"}</td>
    <td>{venue.contactpersonNumber || "-"}</td>
  </tr>
))}

              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ===== BOOKINGS VIEW ===== */}
      {(selectedView === "bookings" ||
        selectedView === "upcoming" ||
        selectedView === "cancellations") && (
        <div className="recent-bookings">
          <h2>
            {selectedView === "upcoming"
              ? "📅 Upcoming Bookings"
              : selectedView === "cancellations"
              ? "❌ Cancelled Bookings"
              : "🧾 Recent Bookings"}
          </h2>

          {filteredBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Email</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.bookingId || index}>
                    <td>{index + 1}</td>
                    <td>{booking.userEmail}</td>
                    <td>{booking.venueName}</td>
                    <td>
                      {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${booking.status?.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ===== AMOUNT SPENT VIEW ===== */}
      {selectedView === "amount" && (
        <div className="amount-summary">
          <h2>💰 Total Spending Summary</h2>
          <p>
            You’ve spent a total of{" "}
            <b>₹{metrics.totalAmountSpent.toLocaleString()}</b> on your bookings so far.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;


