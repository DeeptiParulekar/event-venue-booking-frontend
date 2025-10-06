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
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  try {
    const payload = jwtDecode(token);
    const role = payload.role; // ADMIN or USER

    if (allowedRoles && !allowedRoles.includes(role)) {
      // Redirect based on role
      return <Navigate to={role === "USER" ? "/user-dashboard" : "/"} replace />;
    }
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
