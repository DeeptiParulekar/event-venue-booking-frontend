// import React, { useState, useEffect } from "react";
// import "./Footer.css";

// export default function Footer() {
//   const [showScroll, setShowScroll] = useState(false);

//   // Show button when scrolled 300px
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowScroll(true);
//       } else {
//         setShowScroll(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Scroll to top smoothly
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <footer className="footer">
//         <p>
//           Powered by{" "}
//           <a href="https://yourcompany.com" target="_blank" rel="noreferrer">
//             Your Company
//           </a>
//         </p>
//       </footer>

//       {showScroll && (
//         <button className="scroll-to-top" onClick={scrollToTop}>
//           ↑
//         </button>
//       )}
//     </>
//   );
// }


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
