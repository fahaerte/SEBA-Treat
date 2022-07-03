import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import {
  Col,
  Container,
  dangerToast,
  Row,
  successToast,
  Typography,
} from "../../components";
import { useVerifyPaymentQuery } from "../../store/api/stripeApi";

const PaymentSuccess = () => {
  const { priceId } = useParams();
  const {
    data: verifyPayment,
    isLoading,
    error,
    isSuccess,
  } = useVerifyPaymentQuery({
    customerId: "cus_LwZBhJQ7iHRTQS",
    priceId: priceId || "",
  });

  if (isSuccess) {
    successToast({
      message: "Your purchased tokens have been added to your account!",
    });
  }

  if (error) {
    dangerToast({
      message:
        "Your purchase was not successful or this link has already expired.",
    });
    return <Navigate to={"/purchase-credits"} />;
  }

  return (
    <>
      {isLoading ? (
        <Container className={"h-100"}>
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
