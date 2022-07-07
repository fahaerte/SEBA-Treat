import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import {Navigate, useLocation} from "react-router-dom";

export const RequireAuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return <>{user ? children : <Navigate to={"/login"} replace state={{from: location}}/>}</>;
};
