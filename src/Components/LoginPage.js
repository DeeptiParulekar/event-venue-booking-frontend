// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./LoginPage.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });

//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         navigate("/");
//       } else {
//         setError("Invalid Credentials");
//       }
//     } catch (err) {
//       setError("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-banner">
//         <h1>Welcome to Event & Venue Booking</h1>
//         <p>Your one-stop solution for seamless Event and Venue Management.</p>
//       </div>

//       <div className="login-form-container">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        null,
        { params: { email } }
      );
      setForgotMessage(response.data);
    } catch (err) {
      setForgotMessage("Something went wrong. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        null,
        { params: { token, newPassword } }
      );
      setResetMessage(response.data);
    } catch (err) {
      setResetMessage("Failed to reset password.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-banner">
        <h1>Welcome to Event & Venue Booking</h1>
        <p>Your one-stop solution for seamless Event and Venue Management.</p>
      </div>

      <div className="login-form-container">
        {!isForgotMode && !isResetMode && !isRegisterMode ? (
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
        ) : isForgotMode ? (
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

            <p
              className="link"
              onClick={() => {
                setIsForgotMode(false);
                setIsResetMode(true);
              }}
            >
              Already have reset token? Reset Password
            </p>

            <p className="link" onClick={() => setIsForgotMode(false)}>
              Back to Login
            </p>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Enter reset token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="submit">Reset Password</button>
            </form>

            {resetMessage && <p>{resetMessage}</p>}

            <p className="link" onClick={() => setIsResetMode(false)}>
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
 