import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const RequireAddressRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address } = useContext(AuthContext);

  // TODO: Maybe landingpage should be our home screen and depending on the context state, we return either the field inpput or the meal list
  return <>{address ? children : <Navigate to={"/landing"} />}</>;
};
