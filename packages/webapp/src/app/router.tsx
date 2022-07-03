import React from "react";
import {Navigate, useRoutes} from "react-router-dom";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ErrorPage from "../screens/Status/ErrorPage";
import {Typography} from "../components";
import {MealOfferRequests} from "../screens/Meal/MealOfferRequests";
import {SentMealOfferRequests} from "../screens/Meal/SentMealOfferRequests";
import {ReceivedMealOfferRequests} from "../screens/Meal/ReceivedMealOfferRequests";

export const AppRouter = () => {
  const mainRoutes = {
    path: "/",
    element: <HomeScreen />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/404", element: <ErrorPage /> },

      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/mealOfferRequests",
        element: <MealOfferRequests/>,
        children: [
          {
            path: "sent",
            element: <SentMealOfferRequests/>
          },
          {
            path: "received",
            element: <ReceivedMealOfferRequests/>
          }
        ]
      },
    ],
  };

  const redirectRoutes = [];

  const profileRoutes = {
    path: "profile/:profileId/",
    element: <Typography variant={"h1"}>Your Profile</Typography>,
    children: [
      // Settings screen
      // Overview Screen
      {
        path: "requests/",
        element: <Typography>Oreders by user</Typography>,
        children: {
          path: "/received",
          element: <Typography>Orders for user</Typography>,
        },
      },
    ],
  };

  const mealRoutes = {
    // ALL THE MEALS
    path: "meal/",
    elements: <Typography>Show all meals here?</Typography>,
    children: [
      {
        // MEAL DETAIL
        path: ":mealId",
        element: (
          <Typography>Meal Detail page with possible edit mode</Typography>
        ),
        children: [
          {
            path: "edit",
            element: <Typography>Editing the meal</Typography>,
          },
        ],
      },
      {
        path: "create/",
        element: <Typography>Create a new meal</Typography>,
      },
    ],
  };

  const routing = useRoutes([mainRoutes, profileRoutes, mealRoutes]);

  return <>{routing}</>;
};
