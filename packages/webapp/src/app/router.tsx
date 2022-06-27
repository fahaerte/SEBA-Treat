import React from "react";
import { useRoutes } from "react-router-dom";
import { MealOfferRequests } from "../screens/mealOfferRequests";

export const AppRouter = () => {
  const mainRoutes = [
    {
      path: "/mealOfferRequests",
      element: <MealOfferRequests />,
    },
  ];

  const redirectRoutes = [];

  const routing = useRoutes(mainRoutes);

  return routing;
};
