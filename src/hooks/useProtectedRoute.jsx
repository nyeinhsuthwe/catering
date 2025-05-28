import Cookies from "js-cookie";
import { userStore } from "../store/userStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  const user = userStore((state) => state.user);

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
