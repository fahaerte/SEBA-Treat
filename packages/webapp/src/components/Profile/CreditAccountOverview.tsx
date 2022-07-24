import React, { useState } from "react";
import { Col, SectionHeading, Typography } from "../ui";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { IUser } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";

const CreditAccountOverview = () => {
  const [balance, setBalance] = useState(0);

  const userId = getCookie("userId");

  const { isLoading } = useQuery(["getUser", userId], () => getUser(), {
    onSuccess: (response: { data: IUser }) => {
      setBalance(response.data.virtualAccount.balance);
    },
  });

  return (
    <Col>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <SectionHeading>Your account balance</SectionHeading>
          <Typography variant={"h1"} className={"fw-normal"}>
            {balance} Credits
          </Typography>
        </>
      )}
    </Col>
  );
};

export default CreditAccountOverview;
