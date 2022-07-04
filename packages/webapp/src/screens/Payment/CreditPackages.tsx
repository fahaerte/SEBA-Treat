import React from "react";
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
} from "../../store/api";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";

export const CreditPackages = () => {
  const { data: products, isLoading: productsIsLoading } =
    usePaymentGetProductsWithPricesQuery({});

  const [createCheckout, { isLoading, isError, data }] =
    useCreateCheckoutSessionMutation();

  const redirectToCheckout = (priceId: string) => {
    void createCheckout({
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
