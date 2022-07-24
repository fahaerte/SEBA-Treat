import React from "react";
import { Container, PageHeading, Row } from "../../components/ui";
import TabBar from "../../components/ui/TabBar/TabBar";

export const MealOfferRequests = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <Container>
        <Row className={"pt-5"}>
          <PageHeading>
            Your <u>pending reservations</u>
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
          />
          {children}
        </Row>
      </Container>
    </div>
  );
};
