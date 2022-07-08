import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAddressRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {address ? (
        children
      ) : (
        <Navigate to={"/address"} replace state={{ from: location }} />
      )}
    </>
  );
};
