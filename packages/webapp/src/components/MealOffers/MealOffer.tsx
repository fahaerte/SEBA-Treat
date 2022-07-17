import React, { MouseEvent } from "react";
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
import { useNavigate } from "react-router-dom";
import { IMealFilter } from "@treat/lib-common";

const MealOfferImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 25px;
  border: 1px solid red;
`;

const MealOffer = ({
  mealId = "",
  mealTitle = "",
  price = 0,
  sellerRating = 1,
  distance = 0,
  portions = 1,
  sellerName = "",
  startDate = "",
  endDate = "",
}: {
  mealId: string;
  mealTitle: string;
  price: number;
  sellerRating: number;
  distance: number;
  portions: number;
  sellerName: string;
  startDate: string;
  endDate: string;
}) => {
  // TODO: Format Dates

  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/mealoffers/${mealId}`);
    return mealId;
  };

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
          <Col>
            <Button onClick={handleSelect}>Select</Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default MealOffer;
