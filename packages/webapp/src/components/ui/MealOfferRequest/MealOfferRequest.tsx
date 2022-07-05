import React from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "../Grid";
import MealOffer from "../../../types/interfaces/mealOffer.interface";
import styled from "styled-components";
import { getFormattedDateFromString } from "../../../utils/getFormattedDate";

interface MealOfferProps {
  mealOffer: MealOffer;
  children: React.ReactNode;
}

export const MealOfferRequest = ({ mealOffer, children }: MealOfferProps) => {
  const MealOfferImage = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 25px;
    border: 1px solid red;
  `;

  const MainDivider = styled.hr`
    border: none;
    border-top: 1px dashed #cfcfcf;
    color: #fff;
    background-color: #fff;
    height: 1px;
  `;

  return (
    <Container className={"p-0"}>
      <Row>
        <Col className={"col-sm-auto"}>
          <MealOfferImage src={""} />
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
                  <h3 className={"mb-0"}>{mealOffer.price} Cr</h3>
                </Col>
                <Col className={"col-sm-auto my-auto"}>
                  <p className={"mb-0"}>Go to offer</p>
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
};
