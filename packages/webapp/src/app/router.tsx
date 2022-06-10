import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Button from "../components/Button/Button";

export const AppRouter = () => {
  const mainRoutes = {};

  const redirectRoutes = [];

  const routing = useRoutes([mainRoutes]);

  return (
    <>
      Hallo :-I
      <br />
      <Button>asdf</Button>
    </>
  );
};
