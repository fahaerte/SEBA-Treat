import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {userId ? (
        children
      ) : (
        <Navigate to={"/login"} replace state={{ from: location }} />
      )}
    </>
  );
};
