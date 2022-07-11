import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, SkeletonSquare } from "../../components";
import { Container } from "react-bootstrap";
import { Header } from "../../components/ui/Header/header";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import SectionHeading from "../../components/ui/SectionHeading/SectionHeading";
import CreditPackageCard from "../../components/CreditPackageCard/CreditPackageCard";
import Balance from "../../components/ui/Balance/Balance";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";
import { useIsMutating, useMutation, useQuery } from "react-query";
import { CreateCheckoutSessionApiArg } from "@treat/lib-common/lib/interfaces/ICreateCheckoutSessionApiArg";
import {
  createCheckoutSession,
  paymentGetProductsWithPrices,
} from "../../api/stripeApi";
import { getUser } from "../../api/userApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";

export const AccountScreen = () => {
  const { userId } = useAuthContext();

  const { data: user } = useQuery(["getUser", userId], () =>
    getUser(userId as string)
  );

  const { data: products, isLoading: productsIsLoading } = useQuery(
    "products",
    paymentGetProductsWithPrices
  );

  const createCheckout = useMutation(
    ({ priceId, stripeCustomerId, couponId }: CreateCheckoutSessionApiArg) =>
      createCheckoutSession({ priceId, stripeCustomerId, couponId })
  );

  const isMutation = useIsMutating({
    mutationKey: "isLoading",
    exact: true,
  });

  const redirectToCheckout = (priceId: string) => {
    try {
      createCheckout.mutate({
        priceId: priceId,
        stripeCustomerId: "62b776eafc0a00b0fa2d125e",
      });
    } catch {
      return <div>Stripe Instance not available, 401</div>;
    }
  };

  if (createCheckout.data) {
    window.location.replace(createCheckout.data.url);
  }

  return (
    <div>
      <Header />
      <Container className={""}>
        <Row className={"pt-5"}>
          <PageHeading>
            Your <u>account</u>
          </PageHeading>
        </Row>
        <Row className={"pt-3"}>
          <SectionHeading>Balance</SectionHeading>
          <Balance className="account-balance">{user.balance} Credits</Balance>
        </Row>
        <SectionHeading>Credit Packages</SectionHeading>
        <Row>
          {productsIsLoading || isMutation ? (
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
              {/*TODO: sort by price in ascending order*/}
              {products?.data.map((creditPackage: IStripeProduct) => (
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
        <Row>
          <Col>
            <CreditPackageCard>
              <h3>250 Credits</h3>
              <b>4,99 €</b>
              <Button>Buy</Button>
            </CreditPackageCard>
          </Col>
          <Col>
            <CreditPackageCard>
              <h3>500 Credits</h3>
              <b>8,99 €</b>
              <Button>Buy</Button>
            </CreditPackageCard>
          </Col>
          <Col>
            <CreditPackageCard>
              <h3>1000 Credits</h3>
              <b>14,99 €</b>
              <Button>Buy</Button>
            </CreditPackageCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
