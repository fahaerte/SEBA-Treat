import React from "react";
import { Col, SectionHeading, Typography } from "./ui";
import { useAuthContext } from "../utils/auth/AuthProvider";
import { useQuery } from "react-query";
import { getUser } from "../api/userApi";

const CreditOverview = () => {
  const { userId } = useAuthContext();

  const { data, error, isError } = useQuery(["getUser", userId], () =>
    getUser(userId as string)
  );

  return (
    <Col>
      <Typography variant={"h1"}>Your account</Typography>
      <SectionHeading>Your account balance</SectionHeading>
      <Typography variant={"h1"} className={"fw-normal"}>
        {userId ? data.virtualAccount.balance : "No"} Credits
      </Typography>
    </Col>
  );
};

export default CreditOverview;
