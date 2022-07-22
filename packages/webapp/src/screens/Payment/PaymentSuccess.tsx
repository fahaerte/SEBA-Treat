import React from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Col,
  Container,
  dangerToast,
  Row,
  successToast,
  Typography,
} from "../../components";
import { useQuery } from "react-query";
import { verifyPayment } from "../../api/stripeApi";
import { setCookie } from "../../utils/auth/CookieProvider";

const PaymentSuccess = () => {
  const { priceId, customerId, token, userId } = useParams();

  const { isLoading, isSuccess, isError } = useQuery("verifyPayment", () => {
    setCookie("userId", userId as string);
    setCookie("token", token as string);
    console.log({
      customerId,
      priceId,
      userId,
      token,
    });

    if (customerId && userId && priceId && token) {
      return verifyPayment({
        customerId,
        priceId,
      });
    }
    return;
  });

  if (isSuccess) {
    successToast({
      message: "Your purchased tokens have been added to your account!",
    });
  }

  if (isError) {
    dangerToast({
      message:
        "Your purchase was not successful or this link has already expired.",
    });

    return <Navigate to={"/purchase-credits"} />;
  }

  return (
    <>
      {isLoading ? (
        <Container className={"mt-5"}>
          <Row>
            <Col>
              <Typography align={"center"} variant={"h1"}>
                Thank you for your purchase!
              </Typography>
              <Typography align={"center"} variant={"h2"}>
                You will be redirected shortly...
              </Typography>
            </Col>
          </Row>
        </Container>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default PaymentSuccess;
