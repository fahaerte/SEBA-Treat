import React from "react";
import {Link, NavLink} from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>HOMEPAGE</h1>
            <nav>
                <Link to="/home">Home</Link>
                <br />
                <Link to="/login">Login Screen</Link>
                <br />
                <Link to="/register">Register Screen</Link>
                <br />
                <Link to="/mealOfferRequests">Meal Offer Requests</Link>
                <br />
            </nav>

        </>
    );
};
export default Home;
