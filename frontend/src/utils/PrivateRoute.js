import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";

const PrivateRoute = ({ children, ...rest }) => {
  let { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
