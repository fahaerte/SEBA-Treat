import React from "react";
import { Container, PageHeading, Row, Typography } from "../../components";
import { Header } from "../../components/Header/header";
import TabBar from "../../components/TabBar/TabBar";
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
