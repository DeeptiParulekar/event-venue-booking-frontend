import React from "react";
import "./Footer.css";

export default function Footer({ isLoginPage }) {
  return (
    <footer className={`footer ${isLoginPage ? "footer-full" : ""}`}>
      <p>
        Powered by{" "}
        <a href="https://yourcompany.com" target="_blank" rel="noreferrer">
          Your Company
        </a>
      </p>
    </footer>
  );
}
