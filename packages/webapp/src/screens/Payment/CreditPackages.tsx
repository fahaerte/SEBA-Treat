import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { ConfigService } from "../../utils/ConfigService";
import { Button } from "../../components";

const configService = new ConfigService();

let stripePromise: Stripe | null;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      configService.get("STRIPE_API_PUBLIC_KEY")
    );
  }

  return stripePromise;
};

const CreditPackages = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  const purchaseItem = {
    price: "price_1LEfANK8fSDZDxbr0iqkZ1yd",
    quantity: 1,
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [purchaseItem],
        mode: "payment",
        successUrl: `${configService.get("BASE_URL")}/success`,
        cancelUrl: `${configService.get("BASE_URL")}/cancel`,
      });
    } else {
      alert(setError("Stripe Instance not available"));
      return <div>Stripe Instance not available, 401</div>;
    }
    setLoading(false);
  };

  return (
    <Button onClick={redirectToCheckout}>
      {isLoading ? "Checking you out...." : "Click for checkout"}
    </Button>
  );
};

export default CreditPackages;
