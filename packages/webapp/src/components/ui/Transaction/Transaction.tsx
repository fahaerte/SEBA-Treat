import React from "react";
import { Container } from "react-bootstrap";
import { Row, Col, UserPreview, dangerToast, Typography } from "../";
import { getCookie } from "../../../utils/auth/CookieProvider";
import { useQuery } from "react-query";
import { getUserPreview } from "../../../api/userApi";

const Transaction = ({
  senderId,
  receiverId,
  timestamp,
  amount,
  fee,
}: {
  senderId: string;
  receiverId: string;
  timestamp: Date;
  amount: number;
  fee: number;
}) => {
  const userId = getCookie("userId");

  let userPreviewId = "";
  if (userId === senderId) {
    userPreviewId = receiverId;
  } else if (userId === receiverId) {
    userPreviewId = senderId;
  } else {
    dangerToast({
      message:
        "Something went wrong. You have not been involved in this transaction.",
    });
  }

  const {
    data: userPreview,
    isLoading: userPreviewIsLoading,
    isSuccess: userPreviewLoaded,
  } = useQuery("getUserPreview", () => getUserPreview(userPreviewId), {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => {
      dangerToast({ message: "Could not get user" });
    },
  });

  const timestampAsString = new Date(timestamp).toLocaleDateString();

  const senderAmount = amount + fee;
  const receiverAmount = amount;

  return (
    <>
      {userId && (
        <Container className={"p-0"}>
          <Row justify={"between"} alignItems={"center"}>
            <Col>
              {userPreviewIsLoading ? (
                <>
                  <Typography>User is loading...</Typography>
                </>
              ) : (
                <>
                  {userPreviewLoaded ? (
                    <>
                      <UserPreview
                        firstName={userPreview.firstName}
                        // lastName={userPreview.lastName}
                        countRatings={userPreview.countRatings}
                        meanRating={userPreview.meanRating}
                        // img={""}
                      />
                    </>
                  ) : (
                    <Typography>Could not load user</Typography>
                  )}
                </>
              )}
            </Col>
            <Col>
              <div style={{ textAlign: "center" }}>
                <p>{timestampAsString}</p>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {userId === senderId ? (
                  <p>- {senderAmount} Credits</p>
                ) : (
                  <p>+ {receiverAmount} Credits</p>
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
