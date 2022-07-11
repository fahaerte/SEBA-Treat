import React from "react";
import { Link, Outlet } from "react-router-dom";
import AuthStatus from "../utils/auth/AuthStatus";

export const HomeScreen: React.FC = (): JSX.Element => {
  return (
    <>
      <AuthStatus />
      <nav>
        <ul>
          <li>
            <Link to="/">Home Screen</Link>
          </li>
          <li>
            <Link to="/login">Login Screen</Link>
          </li>
          <li>
            <Link to="/register">Register Screen</Link>
          </li>
          <li>
            <Link to="/mealoffers">Meal Offer Screen</Link>
          </li>
          <li>
            <Link to="/mealOfferRequests">Meal Offer Requests Screen</Link>
          </li>
          <li>
            <Link to="/address">Address Input Screen (Landing Page)</Link>
          </li>
          <li>
            <Link to="/purchase-credits">Purchase Credits</Link>
          </li>
          <li>
            <Link to="/account/">Account Screen</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
