import React from "react";
import { Container, PageHeading, Row, Typography } from "../../components/ui";
import TabBar from "../../components/ui/TabBar/TabBar";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../utils/auth/AuthProvider";

export const MealOfferRequests = () => {
  const { token } = useAuthContext();

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
          <Outlet />
        </Row>
      </Container>
    </div>
  );
};
