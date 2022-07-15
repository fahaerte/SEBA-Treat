import React from "react";
import {
  CardBody,
  Card,
  Typography,
  Button,
  Icon,
  Col,
  Container,
  Row,
} from "../ui";
import styled from "styled-components";

const MealOfferImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 25px;
  border: 1px solid red;
`;

const MealOffer = ({
  className = "",
  mealTitle = "",
  price = 0,
  sellerRating = 1,
  //image,
  distance = 0,
  portions = 1,
  sellerName = "",
  startDate = "",
  endDate = "",
  onClickAction,
}: {
  className?: string;
  mealTitle: string;
  price: number;
  //image?:
  sellerRating: number;
  distance: number;
  portions: number;
  sellerName: string;
  buttonAction: () => void;
  startDate: string;
  endDate: string;
  onClickAction: any;
}) => (
  // TODO: Format Dates
  <Card className={`align-items-center ${className}`} onClick={onClickAction}>
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
        <Col className={"col col-lg-5"}>
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
                Start: {startDate}
              </Typography>
            </Col>
            <Col>
              <Typography variant={"h3"} className={"fw-normal mb-3"}>
                End: {endDate}
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </Card>
);

export default MealOffer;
