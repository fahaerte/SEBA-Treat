import React from "react";
import { Row, Typography, PageHeading, Container } from "../../components/ui";
import { Header } from "../../components/ui/Header/header";
import TabBar from "../../components/ui/TabBar/TabBar";
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
          >
            Here you could add some children
          </TabBar>
          <Outlet />
        </Row>
      </Container>
    </div>
  );
};
