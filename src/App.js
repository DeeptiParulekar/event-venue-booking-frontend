// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Sidebar from "./Components/Sidebar";
// import Dashboard from "./Components/Dashboard";
// import VenueList from "./Components/VenueList";
// import Login from "./Components/Login"; // make sure this exists

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div style={{ display: "flex" }}>
//         <Sidebar />
//         <div style={{ flex: 1, padding: 20 }}>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/venues" element={<VenueList />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import VenueList from "./Components/VenueList";
import Login from "./Components/Login";
import "./App.css"; // <-- include styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/venues" element={<VenueList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
        <footer className="footer">
      <p>© {new Date().getFullYear()} Event & Venue Booking. All rights reserved.</p>
    </footer>
      </div>
    </Router>
  );
}

export default App;
