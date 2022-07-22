import React, { useEffect, useState } from "react";
import { Col, Row, SectionHeading, Typography, Transaction } from "../ui";
import { useQuery } from "react-query";
import { getTransactions, getUser } from "../../api/userApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { IMealTransaction } from "@treat/lib-common";

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
      <SectionHeading>Your transaction history</SectionHeading>
      {transactionsAreLoading ? (
        "Loading..."
      ) : (
        <>
          {transactionHist &&
            transactionHist
              .slice()
              .map((transaction: IMealTransaction, index: number) => {
                if (transaction.transactionState === "COMPLETED") {
                  return (
                    // <div key={transaction._id}>
                    //   {transaction._id}: {transaction.updatedAt}
                    // </div>
                    <Transaction
                      senderId={transaction.senderId}
                      receiverId={transaction.receiverId}
                      firstName={"Test"}
                      lastName={"User"}
                      timestamp={transaction.updatedAt}
                      amount={transaction.amount}
                      fee={transaction.transactionFee}
                    />
                  );
                }
              })}
        </>
      )}
    </>
  );
};
