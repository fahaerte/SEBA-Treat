import React from "react";
import { Link, Outlet } from "react-router-dom";

const HomeScreen: React.FC = (): JSX.Element => {
  return (
    <>
      NAVIGATION
      <br />
      <br />
      <nav>
        <ul>
          <li>
            <Link to="/login">Login Screen</Link>
          </li>
          <li>
            <Link to="/register">Register Screen</Link>
          </li>
          <li>
            <Link to="/mealOfferRequests">Meal Offer Requests</Link>
          </li>
          <li>
            <Link to="/landingPage">Landing Page</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default HomeScreen;
