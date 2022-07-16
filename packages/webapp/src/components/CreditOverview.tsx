import React, { useState } from "react";
import { Col, SectionHeading, Typography } from "./ui";
import { useAuthContext } from "../utils/auth/AuthProvider";
import { useQuery } from "react-query";
import { getUser } from "../api/userApi";

const CreditOverview = () => {
  const { userId, token } = useAuthContext();

  const [balance, setBalance] = useState(0);

  useQuery(
    ["getUser", userId],
    () => getUser(userId as string, token as string),
    {
      onSuccess: (response) => {
        setBalance(response.data.virtualAccount.balance);
      },
    }
  );

  return (
    <Col>
      <Typography variant={"h1"}>Your account</Typography>
      <SectionHeading>Your account balance</SectionHeading>
      <Typography variant={"h1"} className={"fw-normal"}>
        {balance} Credits
      </Typography>
    </Col>
  );
};

export default CreditOverview;
