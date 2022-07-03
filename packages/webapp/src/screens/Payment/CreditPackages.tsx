import React from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { ConfigService } from "../../utils/ConfigService";
import {
  Card,
  Col,
  Container,
  Row,
  SectionHeading,
  SkeletonSquare,
} from "../../components";
import {
  usePaymentGetProductsWithPricesQuery,
  useCreateCheckoutSessionMutation,
} from "../../store/api/stripeApi";
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

export const CreditPackages = () => {
  const {
    data: products,
    isLoading: productsIsLoading,
    isError: productsIsError,
  } = usePaymentGetProductsWithPricesQuery({});

  const [createCheckout, { isLoading, isError, data }] =
    useCreateCheckoutSessionMutation();

  const redirectToCheckout = (priceId: string) => {
    createCheckout({
      priceId,
      userId: "62b776eafc0a00b0fa2d125e",
    });
    if (isError) {
      return <div>Stripe Instance not available, 401</div>;
    }
  };

  if (data) {
    window.location.replace(data.url);
  }
  return (
    <>
      <SectionHeading>Buy packages</SectionHeading>
      <Container>
        <Row>
          {productsIsLoading || isLoading ? (
            <>
              <Col>
                <Card>
                  <SkeletonSquare height={"150px"} rounded={false} />
                </Card>
              </Col>
              <Col>
                <Card>
                  <SkeletonSquare height={"150px"} rounded={false} />
                </Card>
              </Col>
              <Col>
                <Card>
                  <SkeletonSquare height={"150px"} rounded={false} />
                </Card>
              </Col>
            </>
          ) : (
            <>
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
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

// export default CreditPackages;
