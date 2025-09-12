// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Sidebar from "./Components/Sidebar";
// import Dashboard from "./Components/Dashboard";
// import VenueList from "./Components/VenueList";
// import LoginPage from "./Components/LoginPage";
// import ResetPassword from "./Components/ResetPassword"; // New import
// import Footer from "./Components/Footer";
// import CreateVenue from "./Components/CreateVenue";
// import "./App.css";

// function AppLayout() {
//   const location = useLocation();
//   const isAuthPage = location.pathname === "/login" || location.pathname === "/reset-password";
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // Redirect to login
//   };

//   return (
//     <>
//       {isAuthPage ? (
//         <div className="login-page-container">
//           <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/reset-password" element={<ResetPassword />} /> {/* Reset password route */}
//             <Route path="/create-venue" element={<CreateVenue />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//       ) : (
//         <div className="main-layout">
//           <Navbar token={token} onLogout={handleLogout} />
//           {token && <Sidebar />}
//           <div className="content">
//             <Routes>
//               <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
//               <Route path="/venues" element={token ? <VenueList /> : <Navigate to="/login" />} />
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </div>
//           <Footer />
//         </div>
//       )}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppLayout />
//     </Router>
//   );
// }

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import VenueList from "./Components/VenueList";
import LoginPage from "./Components/LoginPage";
import ResetPassword from "./Components/ResetPassword";
import Footer from "./Components/Footer";
import CreateVenue from "./Components/CreateVenue";
import "./App.css";

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/reset-password";
  const token = localStorage.getItem("token");

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
              <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/venues" element={token ? <VenueList /> : <Navigate to="/login" />} />
              {/* ✅ Add CreateVenue route here */}
              <Route path="/create-venue" element={token ? <CreateVenue /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
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
