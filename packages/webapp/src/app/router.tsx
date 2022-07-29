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
import { LandingPageTabBar } from "../components/AddressInput/LandingPageTabBar";
import { BuyMealTab } from "../components/AddressInput/BuyMealTab";
import { OfferMealTab } from "../components/AddressInput/OfferMealTab";
import { MyMealOfferScreen } from "../screens/Meal/MyMealOfferScreen";

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
      path: "already-logged-in",
      element: <Typography>User already logged in</Typography>,
    },
  ];

  const addressRoute = {
    path: "address",
    children: [
      {
        path: "",
        element: <Navigate to={"./buy-meal"} replace={true} />,
      },
      {
        path: "buy-meal",
        element: (
          <AddressInputScreen>
            <LandingPageTabBar>
              <BuyMealTab />
            </LandingPageTabBar>
          </AddressInputScreen>
        ),
      },
      {
        path: "offer-meal",
        element: (
          <AddressInputScreen>
            <LandingPageTabBar>
              <OfferMealTab />
            </LandingPageTabBar>
          </AddressInputScreen>
        ),
      },
    ],
  };
  const profileRoutes = {
    path: "profile",
    element: (
      <AppLayout>
        <RequireAuthRoute>
          <ProfileScreen />
        </RequireAuthRoute>
      </AppLayout>
    ),
  };

  const accountRoutes = [
    {
      path: "/account/:userId/",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <CreditScreen />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
    {
      path: "/account",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <CreditScreen />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
    {
      path: "/success/:priceId/:customerId//:userId",
      element: <PaymentSuccess />,
    },
  ];

  const mealReservationsRoutes = {
    path: "meal-reservations",
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
      path: "meals",
      element: (
        <AppLayout>
          <RequireAddressRoute>
            <MealOfferScreen />
          </RequireAddressRoute>
        </AppLayout>
      ),
    },
    {
      path: "meals/create",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <CreateMeal />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
    {
      path: "meals/my-offers",
      element: (
        <AppLayout>
          <RequireAuthRoute>
            <MyMealOfferScreen />
          </RequireAuthRoute>
        </AppLayout>
      ),
    },
    {
      path: "meals/:mealOfferId",
      element: (
        <AppLayout>
          <RequireAddressRoute>
            <MealOfferDetailScreen />
          </RequireAddressRoute>
        </AppLayout>
      ),
    },
    {
      path: "meals/:mealOfferId/edit",
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
    mealReservationsRoutes,
    ...accountRoutes,
    ...mealRoutes,
  ]);

  return (
    <QueryClientProvider client={reactQueryClient}>
      {routing}
    </QueryClientProvider>
  );
};
