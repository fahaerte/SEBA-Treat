import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LoginScreen from "../screens/Auth/LoginScreen";
import { RegisterScreen } from "../screens/Auth/RegisterScreen";
import { AddressInputScreen } from "../screens/AddressInputScreen";
import { MealOfferScreen } from "../screens/Meal/MealOfferScreen";
import { Typography } from "../components/ui";
import { MealOfferRequests } from "../screens/Meal/MealOfferRequests";
import { SentMealOfferRequests } from "../screens/Meal/SentMealOfferRequests";
import { ReceivedMealOfferRequests } from "../screens/Meal/ReceivedMealOfferRequests";
import PaymentSuccess from "../screens/Payment/PaymentSuccess";
import { CreditScreen } from "../screens/Account/CreditScreen";
import { RequireAuthRoute } from "../utils/auth/RequireAuthRoute";
import { QueryClientProvider, QueryClient } from "react-query";
import { MealOfferDetailScreen } from "../screens/Meal/MealOfferDetailScreen";
import AppLayout from "../components/AppLayout";
import CreateMeal from "../screens/Meal/CreateMeal";
import EditMeal from "../screens/Meal/EditMeal";
import { RequireAddressRoute } from "../utils/auth/RequireAddressRoute";
import { ProfileScreen } from "../screens/Account/ProfileScreen";
import { ProfileOverview } from "../components/Profile/ProfileOverview";
import { TransactionHistory } from "../components/TransactionHistory/TransactionHistory";
import { ProfileUpdateScreen } from "../screens/Account/ProfileUpdateScreen";

export const AppRouter = () => {
  const reactQueryClient = new QueryClient();

  const mainRoutes = {
    path: "/",
    element: (
      <AppLayout>
        <RequireAddressRoute>
          <MealOfferScreen />
        </RequireAddressRoute>
      </AppLayout>
    ),
    children: [{ path: "*", element: <Navigate to="/404" /> }],
  };

  const authRoutes = [
    {
      path: "login",
      element: (
        <AppLayout>
          <LoginScreen />
        </AppLayout>
      ),
    },
    {
      path: "register",
      element: (
        <AppLayout>
          <RegisterScreen />
        </AppLayout>
      ),
    },
    {
      path: "alreadyLoggedIn",
      element: <Typography>User already logged in</Typography>,
    },
  ];

  const addressRoute = {
    path: "address",
    element: <AddressInputScreen />,
  };

  const profileRoutes = {
    path: "account",
    element: (
      <RequireAuthRoute>
        <AppLayout />
      </RequireAuthRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <ProfileScreen>
            <ProfileOverview />
          </ProfileScreen>
        ),
        // children: [
        //   {
        //     path: "edit",
        //     element: <ProfileScreen>hallo</ProfileScreen>,
        //   },
        // ],
      },
      {
        path: "edit",
        element: (
          <ProfileScreen>
            <ProfileUpdateScreen />
          </ProfileScreen>
        ),
      },
      {
        path: "transaction-history/:userid",
        element: (
          <ProfileScreen>
            <TransactionHistory />
          </ProfileScreen>
        ),
      },
    ],
  };

  const purchaseCreditRoutes = [
    {
      path: "/purchase-credits/:userId/:token",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <CreditScreen />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
    {
      path: "/purchase-credits",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <CreditScreen />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
    {
      path: "/success/:priceId/:customerId/:token/:userId",
      element: <PaymentSuccess />,
    },
  ];

  const mealOfferRequestsRoute = {
    path: "mealOfferRequests",
    element: (
      <RequireAuthRoute>
        <AppLayout />
      </RequireAuthRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to={"./sent"} replace={true} />,
      },
      {
        path: "sent",
        element: (
          <MealOfferRequests>
            <SentMealOfferRequests />
          </MealOfferRequests>
        ),
      },
      {
        path: "received",
        element: (
          <MealOfferRequests>
            <ReceivedMealOfferRequests />
          </MealOfferRequests>
        ),
      },
    ],
  };

  const mealRoutes = [
    {
      path: "createMeal",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <CreateMeal />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
    {
      path: "mealoffers",
      element: (
        <AppLayout>
          <RequireAddressRoute>
            <MealOfferScreen />
          </RequireAddressRoute>
        </AppLayout>
      ),
    },
    {
      path: "mealoffers/:mealOfferId",
      element: (
        <AppLayout>
          <RequireAddressRoute>
            <MealOfferDetailScreen />
          </RequireAddressRoute>
        </AppLayout>
      ),
    },
    {
      path: "mealoffers/:mealOfferId/edit",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <EditMeal />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
  ];

  const routing = useRoutes([
    mainRoutes,
    ...authRoutes,
    addressRoute,
    profileRoutes,
    mealOfferRequestsRoute,
    // ...redirectRoutes,
    ...purchaseCreditRoutes,
    ...mealRoutes,
  ]);

  return (
    <QueryClientProvider client={reactQueryClient}>
      {routing}
    </QueryClientProvider>
  );
};
