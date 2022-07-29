import React from "react";
import { dangerToast, SectionHeading, Typography } from "../ui";
import { useQuery } from "react-query";
import { getTransactions } from "../../api/userApi";
import { IMealTransaction } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";
import { Transaction } from "../ui";
import { Navigate } from "react-router-dom";

export const TransactionHistory = () => {
  const userId = getCookie("userId");

  const {
    data: transactions,
    isLoading: transactionsAreLoading,
    isSuccess: transactionsLoaded,
  } = useQuery(["getTransactions", userId], () => getTransactions(), {
    onError: () => {
      dangerToast({ message: "Could not get transaction history" });
    },
  });

  return (
    <>
      <SectionHeading>Your transaction history</SectionHeading>
      {transactionsAreLoading ? (
        "Loading..."
      ) : (
        <>
          {transactionsLoaded ? (
            transactions.data.length > 0 ? (
              transactions.data.slice().map((transaction: IMealTransaction) => {
                if (transaction.transactionState === "COMPLETED") {
                  return (
                    <Transaction
                      key={transaction._id}
                      senderId={transaction.senderId}
                      receiverId={transaction.receiverId}
                      timestamp={transaction.updatedAt}
                      amount={transaction.amount}
                      fee={transaction.transactionFee}
                    />
                  );
                }
              })
            ) : (
              <Typography variant={"div"}>
                There are no prior transactions.
              </Typography>
            )
          ) : (
            <Navigate to={"/"} />
          )}
        </>
      )}
    </>
  );
};
