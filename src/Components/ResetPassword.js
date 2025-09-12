import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // reuse the same CSS

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get token from URL query params
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        null,
        { params: { token, newPassword } }
      );

      setResetMessage(data || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 3000); // redirect to login after 3s
    } catch (err) {
      setResetMessage("Failed to reset password.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-banner">
        <h1>Reset Your Password</h1>
        <p>Enter your new password below to reset your account password.</p>
      </div>

      <div className="login-form-container">
          <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>

        {resetMessage && <p className="message">{resetMessage}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
