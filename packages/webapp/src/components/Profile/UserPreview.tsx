import React from "react";
import { Card, Typography, Button, Col, Container, Row } from "../ui";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Rating } from "./Rating";

const SCUserPreview = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 2em;

  & > div {
    margin-left: 1em;

    & > div > span.userName {
      font-weight: bold;
    }

    & > div.userRating > div.star-ratings {
      position: relative;
      top: -0.2em;
      margin-right: 0.2em;
    }
  }
`;

const SCUserPreviewImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: grey;
  display: inline-block;
`;

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
      {/*<Row*/}
      {/*  alignContent={"end"}*/}
      {/*  alignItems={"center"} // vertical align*/}
      {/*  wrap={"nowrap"}*/}
      {/*  direction={"row"}*/}
      {/*  justify={"start"}*/}
      {/*>*/}
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
