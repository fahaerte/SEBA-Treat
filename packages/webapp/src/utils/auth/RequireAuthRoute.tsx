import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "./CookieProvider";

export const RequireAuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userId = getCookie("userId");
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
