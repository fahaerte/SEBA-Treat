import React, { useContext } from "react";
import { UserContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const RequireAuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(UserContext);

  return <>{user ? children : <Navigate to={"/login"} />}</>;
};
