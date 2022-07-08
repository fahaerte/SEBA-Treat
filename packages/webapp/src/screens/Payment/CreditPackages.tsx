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
import { useAuthContext } from "../../utils/AuthProvider";

export const CreditPackages = () => {
  const { user } = useAuthContext();
  const { data: products, isLoading: productsIsLoading } =
    usePaymentGetProductsWithPricesQuery({});
  const { data: discount, isLoading: discountIsLoading } =
    usePaymentGetDiscountQuery({});

  const [createCheckout, { isLoading, isError, data }] =
    useCreateCheckoutSessionMutation();

  const [discountedProduct, setDiscountedProduct] = useState<
    IStripeProduct | undefined
  >();

  useEffect(() => {
    if (discount && products) {
      const findProduct = products?.find(
        (product) => product.id === discount?.applies_to?.products[0]
      );
      setDiscountedProduct(findProduct);
    }

    if (data) {
      window.location.replace(data.url);
    }
  }, [discount, products, data]);

  const redirectToCheckout = (priceId: string, couponId?: string) => {
    void createCheckout({
      priceId,
      stripeCustomerId: user?.stripeCustomerId || "cus_M0y6NV1PXOlKwa",
      couponId,
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
            discountDeadline={discount.redeem_by || 0}
            discountValue={discount.amount_off || 0}
            productLabel={discountedProduct?.name || ""}
            productPrice={discountedProduct?.default_price.unit_amount || 0}
            onClick={() =>
              redirectToCheckout(
                discountedProduct?.default_price.id || "",
                discount.id
              )
            }
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
              {products &&
                products
                  .slice()
                  .sort((p1, p2) => {
                    if (
                      p1.default_price.unit_amount !== null &&
                      p2.default_price.unit_amount !== null
                    ) {
                      return (
                        p1.default_price.unit_amount -
                        p2.default_price.unit_amount
                      );
                    }
                    return -1;
                  })
                  .map((creditPackage: IStripeProduct) => (
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
