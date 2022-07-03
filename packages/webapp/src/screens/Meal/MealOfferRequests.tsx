import React from "react";
import { Row, Typography, Container } from "../../components/ui";
import { Tabs, Tab } from "react-bootstrap";
import { Header } from "../../components/ui/Header/header";
import { SentMealOfferRequests } from "./SentMealOfferRequests";
import { ReceivedMealOfferRequests } from "./ReceivedMealOfferRequests";
import TabBar from "../../components/ui/TabBar/TabBar";
import TabContent from "../../components/ui/TabBar/TabContent";

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
