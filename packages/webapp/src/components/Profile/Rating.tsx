import React from "react";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

const SCRating = styled(StarRatings)`
  svg {
    vertical-align: initial;
  }
`;

export const Rating = ({
  rating,
  starDimension = "1rem",
  starSpacing = "0.1rem",
}: {
  rating: number;
  starDimension?: string;
  starSpacing?: string;
}) => (
  <SCRating
    rating={rating}
    starRatedColor={"orange"}
    numberOfStars={5}
    name={"rating"}
    starDimension={starDimension}
    starSpacing={starSpacing}
  />
);
