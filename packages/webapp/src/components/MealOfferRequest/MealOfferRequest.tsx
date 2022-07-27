import React from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "../ui/Grid";
import MealOffer from "../../types/interfaces/mealOffer.interface";
import styled from "styled-components";
import { getFormattedDateFromString } from "../../utils/getFormattedDate";
import { Link, Typography } from "../ui";
import { ConfigService } from "../../utils/ConfigService";

interface MealOfferProps {
  mealOffer: MealOffer;
  children: React.ReactNode;
}

const MealOfferImage = styled.div`
  position: relative;
  width: 160px;
  height: 160px;

  > div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.3;
  }

  > img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
`;

const MainDivider = styled.hr`
  border: none;
  border-top: 1px dashed #cfcfcf;
  color: #fff;
  background-color: #fff;
  height: 1px;
`;

export const MealOfferRequest = ({ mealOffer, children }: MealOfferProps) => (
  <Container className={"p-0"}>
    <Row>
      <Col className={"col-sm-auto"}>
        <MealOfferImage>
          <div
            style={{
              backgroundImage: `url(${new ConfigService().get(
                "MEAL_IMAGES_URL"
              )}/${mealOffer.image})`,
            }}
          ></div>
          <img
            src={`${new ConfigService().get("MEAL_IMAGES_URL")}/${
              mealOffer.image
            }`}
            alt={`Image for meal ${mealOffer.title}`}
          />
        </MealOfferImage>
      </Col>
      <Col className={""}>
        <Row>
          <Col>
            <Row>
              <h5 className={""}>{mealOffer.title}</h5>
            </Row>
            <Row>
              <Col className={"col-sm-auto"}>
                <h6>
                  {getFormattedDateFromString(mealOffer.startDate)} -{" "}
                  {getFormattedDateFromString(mealOffer.endDate)}
                </h6>
              </Col>
              <Col>
                <Row className={""}>
                  <Col>
                    <h6>{mealOffer.portions} portions</h6>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className={"d-flex justify-content-end col-sm-auto"}>
            <Row className={""}>
              <Col className={"col-sm-auto my-auto"}>
                <Typography variant={"h3"} component={"p"} className={"mb-0"}>
                  {mealOffer.price} Cr
                </Typography>
              </Col>
              <Col className={"col-sm-auto my-auto"}>
                <Link to={`/mealOffers/${mealOffer._id}`} display={"text"}>
                  <Typography variant={"p"} className={"mb-0"}>
                    Go to offer
                  </Typography>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={"p-2"}>
          <MainDivider />
        </Row>
        {children}
      </Col>
    </Row>
  </Container>
);
