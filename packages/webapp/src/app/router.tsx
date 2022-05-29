import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

export const AppRouter = () => {
  const mainRoutes = {};

  const redirectRoutes = [];

  const routing = useRoutes([mainRoutes]);

  return (
    <>
      Hallo :-I
      <br />
      <button type={"button"} className={"btn btn-primary"}>
        asdf
      </button>
    </>
  );
};
