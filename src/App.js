import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import UserDashboard from "./Components/UserDashboard";
import VenueList from "./Components/VenueList";
import CreateVenue from "./Components/CreateVenue";
import Booking from "./Components/Booking";
import LoginPage from "./Components/LoginPage";
import ResetPassword from "./Components/ResetPassword";
import Footer from "./Components/Footer";
import AdminBooking from "./Components/AdminBooking"; // <-- match file and component name

import ProtectedRoute from "./Components/ProtectedRoute"; // ✅

import "./App.css";

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/reset-password";

  const token = localStorage.getItem("token");
  let role = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {isAuthPage ? (
        <div className="login-page-container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      ) : (
        <div className="main-layout">
          <Navbar token={token} onLogout={handleLogout} />
          {token && <Sidebar />}
          <div className="content">
            <Routes>
              {/* Admin Dashboard */}
              <Route
                path="/"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* User Dashboard */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute allowedRoles={["USER"]}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Venues */}
              <Route path="/venues" element={<ProtectedRoute><VenueList /></ProtectedRoute>} />
              <Route path="/create-venue" element={<ProtectedRoute><CreateVenue /></ProtectedRoute>} />

              {/* Booking route with admin/user switch */}
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    {role === "ADMIN" ? <AdminBooking /> : <Booking />}
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to={role === "USER" ? "/user-dashboard" : "/"} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;


