import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Button, Icon } from "../components";

export const AppRouter = () => {
  const mainRoutes = {};

  const redirectRoutes = [];

  const routing = useRoutes([mainRoutes]);

  return (
    <>
      Hallo :-D
      <br />
      <Button>
        <Icon type={"download"} /> asdf
      </Button>
      <br />
    </>
  );
};
