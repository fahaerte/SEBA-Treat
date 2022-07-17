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
import { useIsMutating, useMutation, useQuery } from "react-query";
import { verifyPayment, VerifyPaymentApiArg } from "../../api/stripeApi";
// import { VerifyPaymentApiArg } from "@treat/lib-common/lib/interfaces/IVerifyPaymentApiArg";
import { useAuthContext } from "../../utils/auth/AuthProvider";

const PaymentSuccess = () => {
  const { priceId, customerId, token, userId } = useParams();
  const { setUserId, setToken } = useAuthContext();

  const { isLoading, isSuccess, isError } = useQuery("verifyPayment", () => {
    setUserId(userId);
    setToken(token);
    console.log({
      customerId,
      priceId,
      userId,
      token,
    });

    if (customerId && userId && priceId && token) {
      console.log("ist hier drin");
      return verifyPayment({
        customerId,
        priceId,
        userId,
        token,
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
