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
import { useVerifyPaymentQuery } from "../../store/api/stripeApi";

const PaymentSuccess = () => {
  const { priceId } = useParams();
  const { data, isLoading, error, isSuccess } = useVerifyPaymentQuery({
    customerId: "cus_M0y6NV1PXOlKwa",
    priceId: priceId || "",
    userId: "62c6f4b28622a1b6a1be844d",
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
      {isLoading !== 2 ? (
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
