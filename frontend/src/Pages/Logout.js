import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function LogOut() {
  const { LogOutUser } = useAuth();
  useEffect(() => {
    LogOutUser();
  }, [LogOutUser]);

  return <Navigate to={"/login"} />;
}

export default LogOut;
