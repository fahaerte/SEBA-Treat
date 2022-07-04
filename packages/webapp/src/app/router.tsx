import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import LandingPage from "../screens/LandingPage";
import ErrorPage from "../screens/Status/ErrorPage";
import { MealOfferRequests} from "../screens/Meal/MealOfferRequests";
import { AuthProvider } from "../utils/AuthProvider";
import { RequireAuthRoute } from "../utils/RequireAuthRoute";
import MealOfferScreen from "../screens/MealOfferScreen";
import { RequireAddressRoute } from "../utils/RequireAddressRoute";

export const AppRouter = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />}>
            <Route path="/login" element={<LoginScreen />} />
            <Route
              path="/mealoffers"
              element={
                <RequireAddressRoute>
                  <MealOfferScreen />
                </RequireAddressRoute>
              }
            />
            <Route
              path="/mealOfferRequests"
              element={
                <RequireAuthRoute>
                  <MealOfferRequests />
                </RequireAuthRoute>
              }
            />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};
