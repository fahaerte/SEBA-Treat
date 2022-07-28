import React from "react";
import { Typography } from "../index";
import { Rating } from "../../Profile/Rating";
import { SCUserPreview } from "./styles";

const UserPreview = ({
  firstName,
  meanRating,
  countRatings,
}: {
  firstName: string;
  meanRating: number;
  countRatings: number;
}) => {
  return (
    <SCUserPreview>
      <span className={"userName"}>
        Offered by: <div className={"fw-bold d-inline"}>{firstName}</div>
      </span>
      <div className={"userRating"}>
        {countRatings > 0 ? (
          <>
            <Rating rating={meanRating} />
            <Typography display={"inline"}>
              {" "}
              – {countRatings} {countRatings > 1 ? "Ratings" : "Rating"}
            </Typography>
          </>
        ) : (
          <Typography display={"inline"}>No ratings</Typography>
        )}
      </div>
    </SCUserPreview>
  );
};

export default UserPreview;
