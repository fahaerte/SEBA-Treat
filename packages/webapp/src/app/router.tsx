import React from "react";
import { useRoutes } from "react-router-dom";
import { Account } from "../screens/account";
import { MealOfferRequests } from "../screens/mealOfferRequests";

export const AppRouter = () => {
  const mainRoutes = [
    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/mealOfferRequests",
      element: <MealOfferRequests />,
    },
  ];

  const redirectRoutes = [];

  return useRoutes(mainRoutes);
};
