import React from "react";
import { Container, Row } from "../../components/ui";
import TabBar from "../../components/ui/TabBar/TabBar";

export const LandingPageTabBar = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <Container>
    <Row className={"pt-3"}>
      <TabBar
        className={"justify-content-center"}
        tabs={[
          {
            to: "/address/buymeal",
            children: "Buy Food",
          },
          {
            to: "/address/offermeal",
            children: "Offer Food",
          },
        ]}
      />
      {children}
    </Row>
  </Container>
);
