import React from "react";
import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import ErrorPage from "../screens/ErrorPage";
import {Typography} from "../components";
import {MealOfferRequests} from "../screens/mealOfferRequests";

export const AppRouter = () => {
    const mainRoutes = {
        path: "/",
        element: <Home/>,
        children: [
            {
              path: "*",
              element: <Navigate to="/404"/>
            },
            {
              path: "/404",
              element: <ErrorPage/>},
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/mealOfferRequests",
                element: <MealOfferRequests/>,
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
                element: <Typography>Orders by user</Typography>,
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
