import React, { useEffect, useState } from "react";
import { Col, Row, SectionHeading, Typography } from "../ui";
import { useQuery } from "react-query";
import { getTransactions, getUser } from "../../api/userApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import IMealTransaction from "@treat/lib-common";

export const TransactionHistory = () => {
  const { userId, token } = useAuthContext();

  const [transactionHist, setTransactionHist] = useState([]);

  const { data: transactions, isLoading: transactionsAreLoading } = useQuery(
    ["getTransactions", userId],
    () => getTransactions(token as string),
    {
      onSuccess: (response) => {
        console.log(response.data);
        setTransactionHist(response.data);
      },
    }
  );

  return (
    <>
      {transactionsAreLoading ? (
        "Loading..."
      ) : (
        <>
          <SectionHeading>Your Transaction History</SectionHeading>
          {transactionHist &&
            transactionHist
              .slice()
              .map((transaction: IMealTransaction, index: number) => (
                <div key={transaction._id}>{transaction._id}</div>
              ))}

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
