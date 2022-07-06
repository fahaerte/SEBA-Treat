import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row, SkeletonSquare } from "../../components";
import { Container } from "react-bootstrap";
import { Header } from "../../components/ui/Header/header";
import PageHeading from "../../components/ui/PageHeading/PageHeading";
import SectionHeading from "../../components/ui/SectionHeading/SectionHeading";
import CreditPackageCard from "../../components/CreditPackageCard/CreditPackageCard";
import UserService from "../../services/user.service";
import Balance from "../../components/ui/Balance/Balance";
import {
  usePaymentGetProductsWithPricesQuery,
  useCreateCheckoutSessionMutation,
} from "../../store/api";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";

export const AccountScreen = () => {
  const [balance, setBalance] = useState("Loading...");

  const fetchData = useCallback(async () => {
    const balance = await UserService.getAccountBalance();
    console.log(balance);
    setBalance(balance);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

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
          <Balance className="account-balance">{balance} Credits</Balance>
        </Row>
        <SectionHeading>Credit Packages</SectionHeading>
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
              {/*TODO: sort by price in ascending order*/}
              {products.map((creditPackage: IStripeProduct) => (
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
