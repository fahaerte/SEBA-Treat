import React from "react";
import {Navigate, useRoutes} from "react-router-dom";
import LoginScreen from "../screens/Auth/LoginScreen";
import {RegisterScreen} from "../screens/Auth/RegisterScreen";
import {HomeScreen} from "../screens/HomeScreen";
import {AddressInputScreen} from "../screens/AddressInputScreen";
import {ErrorPage} from "../screens/Status/ErrorPage";
import {AuthProvider} from "../utils/auth/AuthProvider";
import {MealOfferScreen} from "../screens/Meal/MealOfferScreen";
import {RequireAddressRoute} from "../utils/auth/RequireAddressRoute";
import {Typography} from "../components/ui";
import {MealOfferRequests} from "../screens/Meal/MealOfferRequests";
import {SentMealOfferRequests} from "../screens/Meal/SentMealOfferRequests";
import {ReceivedMealOfferRequests} from "../screens/Meal/ReceivedMealOfferRequests";
import {AccountScreen} from "../screens/Profile/AccountScreen";
import PaymentSuccess from "../screens/Payment/PaymentSuccess";
import {CreditPackages} from "../screens/Payment/CreditPackages";
import {RequireAuthRoute} from "../utils/auth/RequireAuthRoute";
import {QueryClientProvider, QueryClient} from "react-query";
import {MealOfferDetailScreen} from "../screens/Meal/MealOfferDetailScreen";
import AppLayout from "../components/AppLayout";
import CreateMeal from "../screens/Meal/CreateMeal";

export const AppRouter = () => {
  const reactQueryClient = new QueryClient();

  const mainRoutes = {
    path: "/",
    element: (
        <AppLayout>
          <HomeScreen/>
        </AppLayout>
    ),
    children: [
      {path: "*", element: <Navigate to="/404"/>},
      {path: "/404", element: <ErrorPage/>},

      {
        path: "/login",
        element: <LoginScreen/>,
      },
      {
        path: "/register",
        element: <RegisterScreen/>,
      },
      {
        path: "/address",
        element: <AddressInputScreen/>,
      },
      {
        path: "/alreadyLoggedIn",
        element: <Typography>User already logged in</Typography>,
      },
    ],
  };

  const redirectRoutes = [
    // {
    //   path: "/success/:priceId",
    //   element: <PaymentSuccess />,
    // },
    // {
    //   path: "/purchase-credits",
    //   element: (
    //     <RequireAuthRoute>
    //       <CreditPackages />
    //     </RequireAuthRoute>
    //   ),
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
      path: "/account",
      element: (
          <AppLayout>
            <RequireAuthRoute>
              <AccountScreen/>
            </RequireAuthRoute>
          </AppLayout>
      ),
    },
    {
      path: "/purchase-credits/:userId/:token",
      element: (
          <AppLayout>
            <RequireAuthRoute>
              <CreditPackages/>
            </RequireAuthRoute>
          </AppLayout>
      ),
    },
    {
      path: "/purchase-credits",
      element: (
          <AppLayout>
            <RequireAuthRoute>
              <CreditPackages/>
            </RequireAuthRoute>
          </AppLayout>
      ),
    },
    {
      path: "/success/:priceId/:customerId/:token/:userId",
      element: <PaymentSuccess/>,
    },
  ];

  const mealRoutes = [
    {
      path: "createMeal",
      element:
          <RequireAuthRoute>
            <CreateMeal/>
          </RequireAuthRoute>
    },
    {
      path: "mealoffers",
      element: (
          <RequireAddressRoute>
            <MealOfferScreen/>
          </RequireAddressRoute>
      ),
    },
    {
      path: "mealoffers/:mealOfferId",
      element: <MealOfferDetailScreen/>,
    },
    {
      path: "mealOfferRequests",
      element: (
          <RequireAuthRoute>
            <MealOfferRequests/>
          </RequireAuthRoute>
      ),
      children: [
        {
          path: "sent",
          element: <SentMealOfferRequests/>,
        },
        {
          path: "received",
          element: <ReceivedMealOfferRequests/>,
        },
      ],
    },
  ];

  const routing = useRoutes([
    mainRoutes,
    profileRoutes,
    // ...redirectRoutes,
    ...purchaseCreditRoutes,
    ...mealRoutes,
  ]);

  return (
      <QueryClientProvider client={reactQueryClient}>
        <AuthProvider>{routing}</AuthProvider>
      </QueryClientProvider>
  );
};
