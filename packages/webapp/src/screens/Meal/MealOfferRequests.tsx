import React from "react";
import { Container, PageHeading, Row } from "../../components/ui";
import TabBar from "../../components/ui/TabBar/TabBar";

export const MealOfferRequests = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <Container>
    <PageHeading>
      Your <u>reservations</u>
    </PageHeading>
    <Row className={"mt-5"}>
      <TabBar
        tabs={[
          {
            to: "/meal-reservations/sent",
            children: "Your reservations",
          },
          {
            to: "/meal-reservations/received",
            children: "Received reservations",
          },
        ]}
      />
      {children}
    </Row>
  </Container>
);
