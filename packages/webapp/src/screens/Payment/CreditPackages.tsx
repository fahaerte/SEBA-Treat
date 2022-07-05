import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  SectionHeading,
  Typography,
} from "../../components";
import {
  usePaymentGetProductsWithPricesQuery,
  useCreateCheckoutSessionMutation,
  usePaymentGetDiscountQuery,
} from "../../store/api";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";
import CreditOverview from "../../components/CreditOverview";
import CreditDiscount from "../../components/CreditProducts/CreditDiscount";

export const CreditPackages = () => {
  const { data: products, isLoading: productsIsLoading } =
    usePaymentGetProductsWithPricesQuery({});
  const { data: discount, isLoading: discountIsLoading } =
    usePaymentGetDiscountQuery({});

  const [createCheckout, { isLoading, isError, data }] =
    useCreateCheckoutSessionMutation();

  const [discountedProduct, setDiscountedProduct] = useState<{
    productName: string;
    productPrice: number;
  }>({
    productName: "",
    productPrice: 0,
  });

  useEffect(() => {
    if (discount && products) {
      const findProduct = products?.find(
        (product) => product.id === discount?.applies_to?.products[0]
      );
      setDiscountedProduct({
        productPrice: findProduct?.default_price.unit_amount || 0,
        productName: findProduct?.name || "",
      });
    }

    if (data) {
      window.location.replace(data.url);
    }
  }, [discount, products, data]);

  const redirectToCheckout = (priceId: string) => {
    void createCheckout({
      priceId,
      userId: "62b776eafc0a00b0fa2d125e",
    });
    if (isError) {
      return <div>Stripe Instance not available, 401</div>;
    }
  };

  return (
    <>
      <Row>
        <CreditOverview />
        {discount && (
          <CreditDiscount
            discountTitle={discount.name || ""}
            discountDuration={discount.redeem_by || 0}
            discountValue={discount.amount_off || 0}
            productLabel={discountedProduct.productName}
            productPrice={discountedProduct.productPrice}
            onClick={() => console.log("discount :-)")}
          />
        )}
      </Row>
      <SectionHeading>Buy packages</SectionHeading>
      <Container>
        <Row>
          {productsIsLoading || isLoading || discountIsLoading ? (
            <LoadingPackages />
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
