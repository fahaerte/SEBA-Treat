import React from "react";
import { Link, Outlet } from "react-router-dom";

export const HomeScreen = () => {
  return (
    <>
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
            <Link to="/mealoffers/62b892ececd6c349da775ed1">Spagh Bollo 2</Link>
          </li>
          <li>
            <Link to="/mealOfferRequests">Meal Offer Requests Screen</Link>
          </li>
          <li>
            <Link to="/address">Address Input Screen (Landing Page)</Link>
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
