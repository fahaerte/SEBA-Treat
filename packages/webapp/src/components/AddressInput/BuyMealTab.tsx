import { Col, Typography } from "../ui";
import BuyMeal_Location from "../../assets/BuyMeal_Location.png";
import BuyMeal_Meal from "../../assets/BuyMeal_Meal.png";
import BuyMeal_Money from "../../assets/BuyMeal_Money.png";
import React from "react";

export const BuyMealTab = () => {
  return (
    <>
      <Typography variant={"h2"} color={"secondary"}>
        Get food offered in your neighborhood!
      </Typography>
      <br />
      <div className={"d-flex justify-content-around"}>
        <Col>
          <img
            src={BuyMeal_Location}
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
            }}
          />
          <Typography variant={"h3"} color={"secondary"}>
            Set your location
          </Typography>
        </Col>
        <Col>
          <img
            src={BuyMeal_Meal}
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
            }}
          />
          <Typography variant={"h3"} color={"secondary"}>
            Choose a meal
          </Typography>
        </Col>
        <Col>
          <img
            src={BuyMeal_Money}
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
            }}
          />
          <Typography variant={"h3"} color={"secondary"}>
            Pay with virtual credits
          </Typography>
        </Col>
      </div>
    </>
  );
};
