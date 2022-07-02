import React from "react";
import { Link, Outlet } from "react-router-dom";

const HomeScreen: React.FC = (): JSX.Element => {
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
            <Link to="/mealOfferRequests">Meal Offer Requests Screen</Link>
          </li>
          <li>
            <Link to="/landing">Landing Page</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default HomeScreen;
