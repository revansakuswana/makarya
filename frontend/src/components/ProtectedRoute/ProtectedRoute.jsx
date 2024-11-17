import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const location = useLocation();
  const isLoggedIn = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1]; // Cek apakah token JWT ada di cookie

  if (!isLoggedIn) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/users/signin" state={{ from: location }} replace />;
  }

  // Jika token ada, render komponen yang dibungkus
  return children;
};

export default ProtectedRoute;
