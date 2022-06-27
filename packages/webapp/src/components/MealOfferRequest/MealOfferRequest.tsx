import React from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "../Grid";
import MealOffer from "../../types/interfaces/mealOffer.interface";
import styled from "styled-components";
import { getFormattedDateFromString } from "../../utils/getFormattedDate";

interface MealOfferProps {
  mealOffer: MealOffer;
  children: React.ReactNode;
}

export const MealOfferRequest = ({ mealOffer, children }: MealOfferProps) => {
  return (
    <Container className={"p-0"}>
      <Row>
        <Col className={"col-sm-auto"}>Bild</Col>
        <Col className={""}>
          <Row>
            <Col>
              <Row>
                <h4>{mealOffer.title}</h4>
              </Row>
              <Row>
                <Col className={"col-sm-auto"}>
                  <h5>
                    {getFormattedDateFromString(mealOffer.startDate)} -{" "}
                    {getFormattedDateFromString(mealOffer.endDate)}
                  </h5>
                </Col>
                <Col className={"col-sm-auto"}>
                  <h5>Portions: {mealOffer.portions}</h5>
                </Col>
              </Row>
            </Col>
            <Col className={"d-flex justify-content-end"}>
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
          <Row>
            <hr />
          </Row>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
