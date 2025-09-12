import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  // --------- LOGIN ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  // --------- REGISTER ----------
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage("Registration successful! Please login.");
      setIsRegisterMode(false);
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    }
  };

  // --------- FORGOT PASSWORD ----------
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        null,
        { params: { email } }
      );
      setForgotMessage(data.message || "Check your email for reset instructions.");
    } catch (err) {
      setForgotMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-banner">
        <h1>Welcome to Event & Venue Booking</h1>
        <p>Your one-stop solution for seamless Event and Venue Management.</p>
      </div>

      <div className="login-form-container">
        {/* -------- LOGIN FORM -------- */}
        {!isForgotMode && !isRegisterMode ? (
          <>
            <h2>Login</h2>
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

            <p className="link" onClick={() => setIsForgotMode(true)}>
              Forgot Password?
            </p>
            <p className="link" onClick={() => setIsRegisterMode(true)}>
              New User? Register Here
            </p>

            {error && <p className="error">{error}</p>}
          </>
        ) : isRegisterMode ? (
          <>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}

            <p className="link" onClick={() => setIsRegisterMode(false)}>
              Back to Login
            </p>
          </>
        ) : (
          <>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Send Reset Link</button>
            </form>

            {forgotMessage && <p>{forgotMessage}</p>}

            <p className="link" onClick={() => setIsForgotMode(false)}>
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
