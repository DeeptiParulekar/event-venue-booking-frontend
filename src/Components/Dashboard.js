import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [startDate] = useState("");
  const [endDate] = useState("");
  const token = localStorage.getItem("token");

  // Fetch bookings & venues
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingRes, venueRes] = await Promise.all([
          axios.get("http://localhost:8080/api/booking/getAllBookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/venues/getAll", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setBookings(bookingRes.data);
        setVenues(venueRes.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch dashboard data");
      }
    };
    fetchData();
  }, [token]);

  // Filtered bookings by date
  const filteredBookings = bookings.filter((b) => {
    const date = new Date(b.bookingDate);
    return (
      (!startDate || date >= new Date(startDate)) &&
      (!endDate || date <= new Date(endDate))
    );
  });

  // Metrics
  const totalBookings = filteredBookings.length;
  const totalVenues = venues.length;
  const totalCustomers = [...new Set(filteredBookings.map((b) => b.userEmail))].length;
  const revenue = filteredBookings
    .filter((b) => b.paymentStatus === "SUCCESS")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  // Chart Data
  const bookingsPerVenue = venues.map((v) => ({
    name: v.venueName,
    booked: filteredBookings.filter((b) => b.venueName === v.venueName && b.status === "BOOKED").length,
    cancelled: filteredBookings.filter((b) => b.venueName === v.venueName && b.status === "CANCELLED").length,
    revenue: filteredBookings
      .filter((b) => b.venueName === v.venueName && b.paymentStatus === "SUCCESS")
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
  }));

  const statusCounts = ["BOOKED", "CANCELLED", "PENDING"].map((status) => ({
    name: status,
    value: filteredBookings.filter((b) => b.status === status).length,
  }));

  const COLORS = ["#4caf50", "#f44336", "#ff9800"];

  return (
    <div className="dashboard-container">
      <h2>📊 Admin Dashboard</h2>

      {/* Metric Cards */}
      <div className="cards-container">
        <div
          className={`card bookings ${selectedCard === "bookings" ? "active" : ""}`}
          onClick={() => setSelectedCard("bookings")}
        >
          <h3>📅 Total Bookings</h3>
          <p><CountUp end={totalBookings} duration={1.5} /></p>
        </div>
        <div
          className={`card venues ${selectedCard === "venues" ? "active" : ""}`}
          onClick={() => setSelectedCard("venues")}
        >
          <h3>📍 Total Venues</h3>
          <p><CountUp end={totalVenues} duration={1.5} /></p>
        </div>
        <div
          className={`card customers ${selectedCard === "customers" ? "active" : ""}`}
          onClick={() => setSelectedCard("customers")}
        >
          <h3>👥 Total Customers</h3>
          <p><CountUp end={totalCustomers} duration={1.5} /></p>
        </div>
        <div
          className={`card revenue ${selectedCard === "revenue" ? "active" : ""}`}
          onClick={() => setSelectedCard("revenue")}
        >
          <h3>💰 Revenue</h3>
          <p>₹<CountUp end={revenue} duration={1.5} /></p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart-box">
          <h4>Bookings & Revenue Per Venue</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsPerVenue} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="booked" stackId="a" fill="#4caf50" name="Booked" />
              <Bar dataKey="cancelled" stackId="a" fill="#f44336" name="Cancelled" />
              <Bar dataKey="revenue" fill="#2196f3" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Booking Status Distribution</h4>
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

      {/* Dynamic Table */}
      {selectedCard && (
        <div className="table-container">
          <h3>
            {selectedCard === "bookings" && "All Bookings"}
            {selectedCard === "venues" && "All Venues"}
            {selectedCard === "customers" && "All Customers"}
            {selectedCard === "revenue" && "Successful Bookings"}
          </h3>
          <table>
            <thead>
              <tr>
                {selectedCard === "bookings" &&
                  ["ID", "Venue", "Customer", "Date", "Status"].map((h) => <th key={h}>{h}</th>)}
                {selectedCard === "venues" && ["ID", "Venue Name"].map((h) => <th key={h}>{h}</th>)}
                {selectedCard === "customers" && ["Customer Email"].map((h) => <th key={h}>{h}</th>)}
                {selectedCard === "revenue" &&
                  ["ID", "Venue", "Customer", "Amount"].map((h) => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {selectedCard === "bookings" &&
                filteredBookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.venueName}</td>
                    <td>{b.userEmail}</td>
                    <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${b.status?.toLowerCase()}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              {selectedCard === "venues" &&
                venues.map((v) => (
                  <tr key={v.venueId}>
                    <td>{v.venueId}</td>
                    <td>{v.venueName}</td>
                  </tr>
                ))}
              {selectedCard === "customers" &&
                [...new Set(filteredBookings.map((b) => b.userEmail))].map((email) => (
                  <tr key={email}><td>{email}</td></tr>
                ))}
              {selectedCard === "revenue" &&
                filteredBookings
                  .filter((b) => b.paymentStatus === "SUCCESS")
                  .map((b) => (
                    <tr key={b.bookingId}>
                      <td>{b.bookingId}</td>
                      <td>{b.venueName}</td>
                      <td>{b.userEmail}</td>
                      <td>₹{b.totalAmount}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
