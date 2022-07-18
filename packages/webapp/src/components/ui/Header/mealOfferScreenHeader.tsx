import { Container } from "react-bootstrap";
import { Col, Row } from "../Grid";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../../utils/auth/AuthProvider";
import { Button } from "../index";
import { Link } from "react-router-dom";

export const MealOfferScreenHeader = () => {
  const { address, userId } = useAuthContext();

  const Header = styled.header`
    height: 110px;
    border-bottom: 1px solid #cfcfcf;
    background: white;
  `;

  return (
    <Header>
      <Container className={"h-100 w-100"}>
        <Row className={"h-100"}>
          <Col className={""}>
            <h2 className={""}>TREAT</h2>
            {/*TODO: Link to get Back to Address-Input (like lieferando)*/}
          </Col>
          <Col className={"justify-content-center"}>
            <Row>
              <h4 className={""}>{address}</h4>
            </Row>
            <Row>
              <Link to="/address">Change Address</Link>
            </Row>
          </Col>
          <Col className={""}>
            {userId ? (
              <h2 className={""}>See Profile</h2>
            ) : (
              <Button>Sign In</Button>
            )}
          </Col>
        </Row>
      </Container>
    </Header>
  );
};
