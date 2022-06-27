import React from "react";
import { Button, Col, Row } from "../components";
import { Container } from "react-bootstrap";
import { Header } from "../components/Header/header";
import PageHeading from "../components/PageHeading/PageHeading";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import CreditPackageCard from "../components/CreditPackageCard/CreditPackageCard";

export const Account = () => {
  return (
    <div>
      <Header />
      <Container className={""}>
        <Row className={"pt-5"}>
          <PageHeading>
            Your <u>account</u>
          </PageHeading>
        </Row>
        <Row className={"pt-3"}>
          <SectionHeading>Balance</SectionHeading>
          <span>Du bist broke, junge</span>
        </Row>
        <Row>
          <SectionHeading>Credit Packages</SectionHeading>
          <Col>
            <CreditPackageCard>
              <h3>250 Credits</h3>
              <b>4,99 €</b>
              <Button>Buy</Button>
            </CreditPackageCard>
          </Col>
          <Col>
            <CreditPackageCard>
              <h3>500 Credits</h3>
              <b>8,99 €</b>
              <Button>Buy</Button>
            </CreditPackageCard>
          </Col>
          <Col>
            <CreditPackageCard>
              <h3>1000 Credits</h3>
              <b>14,99 €</b>
              <Button>Buy</Button>
            </CreditPackageCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
