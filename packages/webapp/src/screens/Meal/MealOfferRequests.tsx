import React from "react";
import { Container, PageHeading, Row } from "../../components/ui";
import TabBar from "../../components/ui/TabBar/TabBar";
import { useLocation } from "react-router-dom";

export const MealOfferRequests = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <Container>
    <Row className={"pt-5"}>
      <PageHeading>
        Your{" "}
        <u>
          {useLocation().pathname.includes("sent") ? "pending" : "received"}{" "}
          reservations
        </u>
      </PageHeading>
    </Row>
    <Row className={"pt-3"}>
      <TabBar
        tabs={[
          {
            to: "/mealOfferRequests/sent",
            children: "Your reservations",
          },
          {
            to: "/mealOfferRequests/received",
            children: "Received reservations",
          },
        ]}
      />
      {children}
    </Row>
  </Container>
);
