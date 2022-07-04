import React, { useContext } from "react";
import { AddressContext } from "./AddressProvider";
import { Navigate } from "react-router-dom";

export const RequireAddressRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const addressContext = useContext(AddressContext);

  return (
    <>{addressContext.address ? { children } : <Navigate to={"/landing"} />}</>
  );
};
