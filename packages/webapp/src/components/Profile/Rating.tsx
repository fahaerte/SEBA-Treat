import React from "react";
import StarRatings from "react-star-ratings";

export const Rating = ({ rating }: { rating: number }) => (
  <StarRatings
    rating={rating}
    starRatedColor={"orange"}
    numberOfStars={5}
    name={"rating"}
    starDimension={"1rem"}
    starSpacing={"0.1rem"}
  />
);
