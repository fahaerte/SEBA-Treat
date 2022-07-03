import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeFormPayment from "./StripeFormPayment";
import { ConfigService } from "../../utils/ConfigService";
import { usePaymentControllerGetPaymentIntentSecretQuery } from "../../store/api/stripeApi";

const stripePromise = loadStripe(
  new ConfigService().get("STRIPE_API_PUBLIC_KEY")
);

const StripeForm = ({
  // userId,
  redirectUrl,
}: {
  // userId: string;
  redirectUrl: string;
}) => {
  const {
    data: clientSecret,
    error,
    isLoading,
  } = usePaymentControllerGetPaymentIntentSecretQuery({
    productId: "prod_LwYBdjRMqItgQv",
  });

  if (!clientSecret) return <>no client secret</>;

  // if (!isLoading && !error) {
  console.log(new ConfigService().get("STRIPE_API_PUBLIC_KEY"));
  // }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeFormPayment redirectUrl={redirectUrl} />
    </Elements>
  );
};
export default StripeForm;
