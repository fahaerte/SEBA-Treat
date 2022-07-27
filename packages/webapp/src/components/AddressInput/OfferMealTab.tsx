import { Col, Typography } from "../ui";
import OfferMeal_Meal from "../../assets/OfferMeal_Meal.png";
import OfferMeal_Credits from "../../assets/OfferMeal_Credits.png";
import OfferMeal_Reduce from "../../assets/OfferMeal_Reduce.png";
import React from "react";

export const OfferMealTab = () => {
  return (
    <>
      <Typography variant={"h2"} color={"secondary"}>
        Offer your leftovers to the neighborhood!
      </Typography>
      <br />
      <div className={"d-flex justify-content-around"}>
        <Col>
          <img
            src={OfferMeal_Meal}
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
            }}
          />
          <Typography variant={"h3"} color={"secondary"}>
            Insert leftovers
          </Typography>
        </Col>
        <Col>
          <img
            src={OfferMeal_Credits}
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
            }}
          />
          <Typography variant={"h3"} color={"secondary"}>
            Get credits in return
          </Typography>
        </Col>
        <Col>
          <img
            src={OfferMeal_Reduce}
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
            }}
          />
          <Typography variant={"h3"} color={"secondary"}>
            Reduce food waste and safe resources
          </Typography>
        </Col>
      </div>
    </>
  );
};
