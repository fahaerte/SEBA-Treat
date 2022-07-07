import React from "react";
import {Navigate, useRoutes} from "react-router-dom";
import LoginScreen from "../screens/Auth/LoginScreen";
import {RegisterScreen} from "../screens/Auth/RegisterScreen";
import {HomeScreen} from "../screens/HomeScreen";
import {AddressInputScreen} from "../screens/AddressInputScreen";
import {ErrorPage} from "../screens/Status/ErrorPage";
import {AuthProvider} from "../utils/AuthProvider";
import {MealOfferScreen} from "../screens/MealOfferScreen";
import {RequireAddressRoute} from "../utils/RequireAddressRoute";
import {Typography} from "../components/ui";
import {MealOfferRequests} from "../screens/Meal/MealOfferRequests";
import {SentMealOfferRequests} from "../screens/Meal/SentMealOfferRequests";
import {ReceivedMealOfferRequests} from "../screens/Meal/ReceivedMealOfferRequests";
import {AccountScreen} from "../screens/Profile/AccountScreen";
// import { CreditPackages } from "../screens/Payment/CreditPackages";
import PaymentSuccess from "../screens/Payment/PaymentSuccess";
import {CreditPackages} from "../screens/Payment/CreditPackages";

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
        path: "/address",
        element: <AddressInputScreen />,
      },
      // {
      //   path: "/mealOfferRequests",
      //   element: <MealOfferRequests />,
      //   children: [
      //     {
      //       path: "sent",
      //       element: <SentMealOfferRequests />,
      //     },
      //     {
      //       path: "received",
      //       element: <ReceivedMealOfferRequests />,
      //     },
      //   ],
      // },
      {
        path: "/account",
        element: <AccountScreen />,
      },
    ],
  };

  const redirectRoutes = [
    {
      path: "/success/:priceId",
      element: <PaymentSuccess />,
    },
    {
      path: "/cancel",
      element: <div>You canceled the purchase</div>,
    },
    // {
    //   path: "/purchase-credits",
    //   element: <CreditPackages />,
    // },
  ];

  const profileRoutes = {
    path: "profile/:profileId/",
    element: <Typography variant={"h1"}>Your Profile</Typography>,
    children: [
      // Settings screen
      // Overview Screen
      {
        path: "requests/",
        element: <Typography>Orders by user</Typography>,
        children: [
          {
            path: "received/",
            element: <Typography>Orders for user</Typography>,
          },
        ],
      },
    ],
  };

  const purchaseCreditRoutes = [
    {
      path: "/purchase-credits",
      element: <CreditPackages />,
    },
    {
      path: "/success/:priceId",
      element: <PaymentSuccess />,
    },
  ];

  const mealRoutes = [
    {
      // ALL THE MEALS
      path: "/mealoffers",
      element: (
        <RequireAddressRoute>
          <MealOfferScreen />
        </RequireAddressRoute>
      ),
    },
    {
      path: "/mealOfferRequests",
      element: (
        // <RequireAuthRoute>
          <MealOfferRequests />
        // </RequireAuthRoute>
      ),
      children: [
        {
          path: "sent",
          element: <SentMealOfferRequests />,
        },
        {
          path: "received",
          element: <ReceivedMealOfferRequests />,
        },
      ],
    },
  ];

  const routing = useRoutes([
    mainRoutes,
    profileRoutes,
    ...redirectRoutes,
    ...purchaseCreditRoutes,
    ...mealRoutes,
  ]);

  return <AuthProvider>{routing}</AuthProvider>;
};
