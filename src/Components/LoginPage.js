import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Named import
import "./LoginPage.css";
import officeVideo from '../assets/AtTheOffice.mp4';
import siteStatsVideo from '../assets/SiteStats.mp4';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // --------- LOGIN ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError({});

    if (!email || !password) {
      setError({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", { email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
        const decoded = jwtDecode(data.token);
        const role = decoded.role;

        // ✅ Navigate based on role
        if (role === "ADMIN") navigate("/");
        else if (role === "USER") navigate("/user-dashboard");
        else navigate("/");
      } else {
        setError({ form: "Invalid Credentials" });
      }
    } catch (err) {
      setError({ form: "Invalid Credentials" });
    }
  };

  // --------- REGISTER ----------
  const handleRegister = async (e) => {
    e.preventDefault();
    setError({});
    if (!name || !email || !password) {
      setError({
        name: !name ? "Full Name is required" : "",
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
        role: "USER",
      });
      setMessage("Registration successful! Please login.");
      setIsRegisterMode(false);
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    }
  };

  // --------- FORGOT PASSWORD ----------
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError({});
    if (!email) {
      setError({ email: "Email is required" });
      return;
    }

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
      {/* Video Background */}
      <div className="video-container">
        <video src={officeVideo} autoPlay loop muted />
        <video src={siteStatsVideo} autoPlay loop muted style={{ opacity: 0.15 }} />
        <div className="video-overlay"></div>
      </div>

      {/* Form Panel */}
      <div className="login-form-container">
        <div className="form-wrapper">
          {!isForgotMode && !isRegisterMode ? (
            <>
              <h2 className="form-heading">Login</h2>
              <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {error.email && <p className="error">{error.email}</p>}

                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                  {error.password && <p className="error">{error.password}</p>}
                </div>

                <button type="submit">Login</button>
                {error.form && <p className="error">{error.form}</p>}
              </form>

              <p className="link" onClick={() => setIsForgotMode(true)}>Forgot Password?</p>
              <p className="link" onClick={() => setIsRegisterMode(true)}>New User? Register Here</p>
            </>
          ) : isRegisterMode ? (
            <>
              <h2 className="form-heading">Register</h2>
              <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                {error.name && <p className="error">{error.name}</p>}

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {error.email && <p className="error">{error.email}</p>}

                <div className="password-wrapper">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                  {error.password && <p className="error">{error.password}</p>}
                </div>

                <button type="submit">Register</button>
              </form>

              {message && <p className="success">{message}</p>}
              <p className="link" onClick={() => setIsRegisterMode(false)}>Back to Login</p>
            </>
          ) : (
            <>
              <h2 className="form-heading">Forgot Password</h2>
              <form onSubmit={handleForgotPassword}>
                <input type="email" placeholder="Enter your registered email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {error.email && <p className="error">{error.email}</p>}
                <button type="submit">Send Reset Link</button>
              </form>
              {forgotMessage && <p className="success">{forgotMessage}</p>}
              <p className="link" onClick={() => setIsForgotMode(false)}>Back to Login</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
