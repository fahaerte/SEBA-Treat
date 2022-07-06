import React from "react";
import { Col, SectionHeading, Typography } from "./ui";
import { useAuthContext } from "../utils/AuthProvider";

const CreditOverview = () => {
  const { user } = useAuthContext();
  return (
    <Col>
      <Typography variant={"h1"}>Your account</Typography>
      <SectionHeading>Your account balance</SectionHeading>
      <Typography variant={"h1"} className={"fw-normal"}>
        {user ? user.virtualAccount.balance : "No"} Credits
      </Typography>
    </Col>
  );
};

export default CreditOverview;
