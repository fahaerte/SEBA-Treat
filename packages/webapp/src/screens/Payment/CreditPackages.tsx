import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { ConfigService } from "../../utils/ConfigService";
import { Button } from "../../components/ui";
import {
  Col,
  Container,
  Row,
  SectionHeading,
  SkeletonSquare,
} from "../../components";
import { usePaymentGetProductsWithPricesQuery } from "../../store/api/stripeApi";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";

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
  const {
    data: products,
    isLoading,
    error,
  } = usePaymentGetProductsWithPricesQuery({});
  const [loading, setLoading] = React.useState(true);
  const [_error, setError] = React.useState<null | string>(null);

  const redirectToCheckout = async (priceId: string) => {
    setLoading(true);
    const stripe = await getStripe();

    if (stripe) {
      const response = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        successUrl: `${configService.get("BASE_URL")}/success`,
        cancelUrl: `${configService.get("BASE_URL")}/purchase-credits`,
        locale: "en",
        // clientReferenceId: userId
        customerEmail: "rosan.zheng@yahoo.de",
        // expires_at: Math.floor(Date.now() / 1000) + 3600 * 2, // Configured to expire after 2 hours
      });
      // TODO:
      console.log(response);
    } else {
      setError("Stripe Instance not available");
      alert(error);
      return <div>Stripe Instance not available, 401</div>;
    }
    setLoading(false);
  };

  return (
    <>
      <SectionHeading>Buy packages</SectionHeading>
      {isLoading ? (
        <SkeletonSquare />
      ) : (
        <Container>
          <Row>
            {products?.map((creditPackage: IStripeProduct) => (
              <Col key={`${creditPackage.id}-container`}>
                <CreditPackage
                  key={creditPackage.id}
                  productName={creditPackage.name}
                  price={creditPackage.default_price.unit_amount || 0}
                  buttonAction={() =>
                    redirectToCheckout(creditPackage.default_price.id)
                  }
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default CreditPackages;
