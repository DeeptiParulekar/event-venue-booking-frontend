// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/" />;  // Redirect to login if no token
//   }

//   return children;
// };

// export default ProtectedRoute;


// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />; // Redirect correctly to login
//   }

//   return children;
// };

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect correctly to login
  }

  return children;
};

export default ProtectedRoute;