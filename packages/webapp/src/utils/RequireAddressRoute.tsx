import React, { useContext } from "react";
import { UserContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const RequireAddressRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {address} = useContext(UserContext);

  return (
    <>{address ? children : <Navigate to={"/landing"} />}</>
  );
};
