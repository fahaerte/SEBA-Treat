import React, { MouseEvent } from "react";
import { Card, Typography, Button, Col, Container, Row } from "../ui";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MealOfferImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 25px;
  border: 1px solid red;
`;

const MealOffer = ({
  mealId,
  mealTitle,
  price,
  sellerRating,
  distance,
  portions,
  sellerName,
  startDate,
  endDate,
}: {
  mealId: string;
  mealTitle: string;
  price: number;
  sellerRating: number;
  distance: number;
  portions: number;
  sellerName: string;
  startDate: Date;
  endDate: Date;
}) => {

  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/mealoffers/${mealId}`);
    return mealId;
  };

  const startDateAsString = (new Date(startDate)).toLocaleDateString();
  const endDateAsString = (new Date(endDate)).toLocaleDateString();

  return (
    <Card>
      <Container>
        <Row>
          <Col className={"col col-lg-2"}>
            <MealOfferImage src={""} />
          </Col>
          <Col className={"col col-lg-4"}>
            <Typography variant={"h1"} className={"mb-3"}>
              {mealTitle}
            </Typography>
          </Col>
          <Col className={"col col-lg-4"}>
            <Row>
              <Typography variant={"h3"} className={"fw-normal mb-3"}>
                Offered by: {sellerName}
              </Typography>
            </Row>
            <Row>
              <Col>
                <Typography variant={"h3"} className={"fw-normal mb-3"}>
                  {price} Credits
                </Typography>
              </Col>
              <Col>
                <Typography variant={"h3"} className={"fw-normal mb-3"}>
                  {sellerRating} Stars
                </Typography>
              </Col>
              <Col>
                <Typography variant={"h3"} className={"fw-normal mb-3"}>
                  {distance} km
                </Typography>
              </Col>
              <Col>
                <Typography variant={"h3"} className={"fw-normal mb-3"}>
                  {portions} Portions
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography variant={"h3"} className={"fw-normal mb-3"}>
                  Start: {startDateAsString}
                </Typography>
              </Col>
              <Col>
                <Typography variant={"h3"} className={"fw-normal mb-3"}>
                  End: {endDateAsString}
                </Typography>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button onClick={handleSelect}>Select</Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default MealOffer;
