import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import VenueList from "./Components/VenueList";
import LoginPage from "./Components/LoginPage";
import Footer from "./Components/Footer";
import "./App.css";

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <>
      {isLoginPage ? (
        <div className="login-page-container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      ) : (
        <div className="main-layout">
          {/* Navbar inside main layout */}
          <Navbar token={token} onLogout={handleLogout} />

          {/* Sidebar */}
          {token && <Sidebar />}

          {/* Page Content */}
          <div className="content">
            <Routes>
              <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/venues" element={token ? <VenueList /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>

          {/* Footer */}
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
