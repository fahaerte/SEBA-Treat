import React from "react";
// import { SCTransaction } from "./styles";
import { Container } from "react-bootstrap";
import { Typography, Row, Icon, Col, UserPreview } from "../";
import { getCookie, removeCookies } from "../../../utils/auth/CookieProvider";
import styled from "styled-components";

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
  const userId = getCookie("userId");

  const timestampAsString = new Date(timestamp).toLocaleDateString();

  const senderAmount = amount + fee;
  const receiverAmount = amount;

  return (
    <>
      {userId && (
        <Container className={"p-0"}>
          <Row justify={"between"} alignItems={"center"}>
            <Col>
              <UserPreview
                firstName={"Test"}
                lastName={"User"}
                countRatings={99}
                meanRating={2}
                img={"test"}
              />
            </Col>
            <Col>
              <div style={{ textAlign: "center" }}>
                <p>{timestampAsString}</p>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  // fontSize: "1.2rem",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {userId === senderId ? (
                  <p>- {senderAmount} €</p>
                ) : (
                  <p>+ {receiverAmount} €</p>
                )}
              </div>
            </Col>
          </Row>
          <hr style={{ marginTop: "0" }} />
        </Container>
      )}
    </>
  );
};

export default Transaction;
