import React from "react";
import { Col, SectionHeading, Typography } from "./ui";

const CreditOverview = () => {
  // TODO: UseContext to get use credit balance
  return (
    <Col>
      <Typography variant={"h1"}>Your account</Typography>
      <SectionHeading>Your account balance</SectionHeading>
      <Typography variant={"h1"} className={"fw-normal"}>
        315 Credits
      </Typography>
    </Col>
  );
};

export default CreditOverview;
