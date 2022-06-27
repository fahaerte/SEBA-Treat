import React from "react";
import { Row } from "../components";
import { Container, Tabs, Tab } from "react-bootstrap";
import { Header } from "../components/Header/header";
import { SentMealOfferRequests } from "./sentMealOfferRequests";
import { ReceivedMealOfferRequests } from "./receivedMealOfferRequests";
import TabBar from "../components/TabBar/TabBar";
import TabContent from "../components/TabBar/TabContent";

export const MealOfferRequests = () => {
  return (
    <div>
      <Header />
      <Container className={""}>
        <Row className={"pt-5"}>
          <h1>Your orders</h1>
        </Row>
        <Row className={"pt-3"}>
          <Tabs defaultActiveKey={"sentRequests"} className={""}>
            <Tab
              className={"pt-3"}
              title={"Your requests"}
              eventKey={"sentRequests"}
            >
              <SentMealOfferRequests />
            </Tab>
            <Tab
              className={"pt-3"}
              title={"Received requests"}
              eventKey={"receivedRequests"}
            >
              <ReceivedMealOfferRequests />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </div>
  );
};
