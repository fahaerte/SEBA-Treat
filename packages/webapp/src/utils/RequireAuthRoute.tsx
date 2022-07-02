import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const RequireAuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authContext = useContext(AuthContext);

  return <>{authContext.token ? { children } : <Navigate to={"/login"} />}</>;
};
