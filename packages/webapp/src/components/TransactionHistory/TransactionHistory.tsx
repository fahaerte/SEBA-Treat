import React, { useEffect } from "react";
import { Col, Row, SectionHeading, Typography } from "../ui";
import { useQuery } from "react-query";
import { getTransactions, getUser } from "../../api/userApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";

export const TransactionHistory = () => {
  const { userId, token } = useAuthContext();

  const { data: transactions, isLoading: transactionsAreLoading } = useQuery(
    ["getTransactions", userId],
    () => getTransactions(token as string)
  );

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <>
      {transactionsAreLoading ? (
        "Loading..."
      ) : (
        <>
          <SectionHeading>Your Transaction Tistory</SectionHeading>
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Typography variant={"h4"} display={"inline"}>*/}
          {/*      First Name:{"  "}*/}
          {/*    </Typography>*/}
          {/*    <Typography*/}
          {/*      variant={"h4"}*/}
          {/*      className={"fw-normal"}*/}
          {/*      component={"div"}*/}
          {/*      display={"inline"}*/}
          {/*    >*/}
          {/*      {data?.data.firstName}*/}
          {/*    </Typography>*/}
          {/*  </Col>*/}

          {/*  <Col>*/}
          {/*    <Typography variant={"h4"} display={"inline"}>*/}
          {/*      Last Name:{" "}*/}
          {/*    </Typography>*/}
          {/*    <Typography*/}
          {/*      variant={"h4"}*/}
          {/*      className={"fw-normal"}*/}
          {/*      component={"div"}*/}
          {/*      display={"inline"}*/}
          {/*    >*/}
          {/*      {data?.data.lastName}*/}
          {/*    </Typography>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Typography variant={"h4"} display={"inline"}>*/}
          {/*      E-Mail:{" "}*/}
          {/*    </Typography>*/}
          {/*    <Typography*/}
          {/*      variant={"h4"}*/}
          {/*      className={"fw-normal"}*/}
          {/*      component={"div"}*/}
          {/*      display={"inline"}*/}
          {/*    >*/}
          {/*      {data?.data.email}*/}
          {/*    </Typography>*/}
          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <Typography variant={"h4"} display={"inline"}>*/}
          {/*      Rating:{" "}*/}
          {/*    </Typography>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Typography variant={"h4"} display={"inline"}>*/}
          {/*      Address:{" "}*/}
          {/*    </Typography>*/}
          {/*    <Typography*/}
          {/*      variant={"h4"}*/}
          {/*      className={"fw-normal"}*/}
          {/*      component={"div"}*/}
          {/*      display={"inline"}*/}
          {/*    >*/}
          {/*      {data?.data.address.street} {data?.data.address.houseNumber},{" "}*/}
          {/*      {data?.data.address.postalCode} {data?.data.address.city}*/}
          {/*    </Typography>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
        </>
      )}
    </>
  );
};
