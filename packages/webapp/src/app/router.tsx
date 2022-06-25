import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

export const AppRouter = () => {
  const mainRoutes = {
    path: "/",
    element: <HomeScreen />,
    children: [
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
    ],
  };

  const redirectRoutes = [];

  const routing = useRoutes([mainRoutes]);

  return <>{routing}</>;
};
