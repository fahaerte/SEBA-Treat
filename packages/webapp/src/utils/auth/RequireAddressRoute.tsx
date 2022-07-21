import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "./CookieProvider";

export const RequireAddressRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const address = getCookie("address");
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
