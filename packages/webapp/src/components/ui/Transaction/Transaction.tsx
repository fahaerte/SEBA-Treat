import React from "react";
// import { SCTransaction } from "./styles";
import { Typography, Row, Icon } from "../../index";
import { useAuthContext } from "../../../utils/auth/AuthProvider";

const Transaction = ({
  senderId,
  receiverId,
  firstName,
  lastName,
  timestamp,
  amount,
  fee,
}: {
  senderId: string;
  receiverId: string;
  firstName: string;
  lastName: string;
  timestamp: Date;
  amount: number;
  fee: number;
}) => {
  const { userId, token } = useAuthContext();

  const timestampAsString = new Date(timestamp).toLocaleDateString();

  const senderAmount = amount + fee;
  const receiverAmount = amount;

  return (
    <>
      {userId && (
        <>
          <Row>
            {firstName} {lastName}
          </Row>
          <Row>{timestampAsString}</Row>
          <Row>
            {userId === senderId ? (
              <p>- {senderAmount} €</p>
            ) : (
              <p>+ {receiverAmount} €</p>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default Transaction;
