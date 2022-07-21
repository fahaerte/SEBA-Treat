import React, { useState } from "react";
import { Col, SectionHeading, Typography } from "../ui";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { IUser } from "@treat/lib-common";

const ProfileOverview = () => {
  const { userId, token } = useAuthContext();

  const [balance, setBalance] = useState(0);

  const { isLoading } = useQuery(
    ["getUser", userId],
    () => getUser(userId as string, token as string),
    {
      onSuccess: (response: { data: IUser }) => {
        setBalance(response.data.virtualAccount.balance);
      },
    }
  );

  return (
    <Col>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <SectionHeading>Your Account Balance</SectionHeading>
          <Typography variant={"h1"} className={"fw-normal"}>
            {balance} Credits
          </Typography>
        </>
      )}
    </Col>
  );
};

export default ProfileOverview;
