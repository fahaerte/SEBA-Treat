import React from "react";
import { Typography, Row } from "../index";
import { Rating } from "../../Profile/Rating";
import { SCUserPreview, SCUserPreviewImage } from "./styles";

const UserPreview = ({
  img,
  firstName,
  lastName,
  meanRating,
  countRatings,
}: {
  img: string;
  firstName: string;
  lastName: string;
  meanRating: number;
  countRatings: number;
}) => {
  return (
    <SCUserPreview>
      <SCUserPreviewImage />
      <div>
        <Row>
          <span className={"userName"}>
            {firstName} {lastName}
          </span>
        </Row>
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
            <>
              <Typography display={"inline"}>No ratings</Typography>
            </>
          )}
        </div>
      </div>
    </SCUserPreview>
  );
};

export default UserPreview;
