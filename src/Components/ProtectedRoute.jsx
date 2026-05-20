import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLogin =
    localStorage.getItem("isAdminLoggedIn") === "true";

  return isLogin ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;