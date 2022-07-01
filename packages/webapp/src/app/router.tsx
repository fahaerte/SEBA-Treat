import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ErrorPage from "../screens/ErrorPage";
import { MealOfferRequests } from "../screens/mealOfferRequests";
import LoginSuccessfulScreen from "../screens/LoginSuccessfulScreen";

export const AppRouter = () => {
  const mainRoutes = {
    path: "/",
    element: <HomeScreen />,
    children: [
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
      {
        path: "/404",
        element: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/loggedin",
        element: <LoginSuccessfulScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/mealOfferRequests",
        element: <MealOfferRequests />,
      },
    ],
  };

  const routing = useRoutes([mainRoutes]);

  return <>{routing}</>;
};
