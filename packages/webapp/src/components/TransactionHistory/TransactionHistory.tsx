import React, { useState } from "react";
import { SectionHeading } from "../ui";
import { useQuery } from "react-query";
import { getTransactions } from "../../api/userApi";
import { IMealTransaction } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";
import { Transaction } from "../";

export const TransactionHistory = () => {
  const [transactionHist, setTransactionHist] = useState([]);

  const userId = getCookie("userId");

  const { data: transactions, isLoading: transactionsAreLoading } = useQuery(
    ["getTransactions", userId],
    () => getTransactions(),
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
                      key={transaction._id}
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
