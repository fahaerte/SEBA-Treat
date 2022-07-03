import React from "react";
import { Row, Typography, Container } from "../../components";
import { Tabs, Tab } from "react-bootstrap";
import { Header } from "../../components/Header/header";
import { SentMealOfferRequests } from "./SentMealOfferRequests";
import { ReceivedMealOfferRequests } from "./ReceivedMealOfferRequests";
import TabBar from "../../components/TabBar/TabBar";
import TabContent from "../../components/TabBar/TabContent";

export const MealOfferRequests = () => {
  return (
    <div>
      <Header />
      <Container>
        <Row className={"pt-5"}>
          <Typography variant={"h1"}>Your orders</Typography>
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
