import React from "react";
import { Row, Typography, PageHeading, Container } from "../../components/ui";
import { Tabs, Tab } from "react-bootstrap";
import { Header } from "../../components/ui/Header/header";
import { SentMealOfferRequests } from "./SentMealOfferRequests";
import { ReceivedMealOfferRequests } from "./ReceivedMealOfferRequests";
import TabBar from "../../components/ui/TabBar/TabBar";
import TabContent from "../../components/ui/TabBar/TabContent";
import { Header } from "../../components/ui/Header/header";
import { Outlet } from "react-router-dom";

export const MealOfferRequests = () => {
  return (
    <div>
      <Header />
      <Container>
        <Row className={"pt-5"}>
          <PageHeading>
            <Typography variant={"h1"}>
              Your <u>orders</u>
            </Typography>
          </PageHeading>
        </Row>
        <Row className={"pt-3"}>
          <TabBar
            tabs={[
              {
                to: "/mealOfferRequests/sent",
                children: "Your requests",
              },
              {
                to: "/mealOfferRequests/received",
                children: "Received requests",
              },
            ]}
          ></TabBar>
          <Outlet />
        </Row>
      </Container>
    </div>
  );
};
