// src/Components/Login.js
// import React from "react";

// export default function Login() {
//   return (
//     <div>
//       <h2>Login Page</h2>
//       <p>Put your login form here.</p>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      // save token in localStorage or state
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Event & Venue Booking</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
