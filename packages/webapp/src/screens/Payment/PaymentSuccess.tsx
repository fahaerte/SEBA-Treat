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
import { useIsMutating, useMutation } from "react-query";
import { verifyPayment } from "../../api/stripeApi";
import { VerifyPaymentApiArg } from "@treat/lib-common/lib/interfaces/IVerifyPaymentApiArg";
import { useAuthContext } from "../../utils/auth/AuthProvider";

const PaymentSuccess = () => {
  const { priceId } = useParams();
  const { userId, token } = useAuthContext();

  const verifyPaymentMutation = useMutation(
    ({ customerId, priceId, userId, token }: VerifyPaymentApiArg) =>
      verifyPayment({
        customerId: "cus_M0y6NV1PXOlKwa",
        priceId,
        userId: "62c6f4b28622a1b6a1be844d",
        token: token,
      })
  );

  const isMutation = useIsMutating({
    mutationKey: "isLoading",
    exact: true,
  });

  if (verifyPaymentMutation.isSuccess) {
    successToast({
      message: "Your purchased tokens have been added to your account!",
    });
  }

  if (verifyPaymentMutation.isError) {
    dangerToast({
      message:
        "Your purchase was not successful or this link has already expired.",
    });
    return <Navigate to={"/purchase-credits"} />;
  }

  return (
    <>
      {isMutation ? (
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
