import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  SectionHeading,
  Typography,
} from "../../components";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";
import CreditOverview from "../../components/CreditOverview";
import CreditDiscount from "../../components/CreditProducts/CreditDiscount";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useIsMutating, useMutation, useQuery } from "react-query";
import {
  createCheckoutSession,
  paymentGetDiscount,
  paymentGetProductsWithPrices,
} from "../../api/stripeApi";
import { CreateCheckoutSessionApiArg } from "@treat/lib-common/lib/interfaces/ICreateCheckoutSessionApiArg";
import { getUser } from "../../api/userApi";

//TODO: Fix bugs
export const CreditPackages = () => {
  const { userId, token } = useAuthContext();

  const { data: user } = useQuery("getUser", () =>
    getUser(userId as string, token as string)
  );

  const { data: products, isLoading: productsIsLoading } = useQuery(
    "products",
    () => paymentGetProductsWithPrices(token as string)
  );

  const { data: discount, isLoading: discountIsLoading } = useQuery(
    "discounts",
    () => paymentGetDiscount(token as string)
  );

  const createCheckout = useMutation(
    ({
      priceId,
      stripeCustomerId,
      couponId,
      token,
    }: CreateCheckoutSessionApiArg) =>
      createCheckoutSession({ priceId, stripeCustomerId, couponId, token })
  );

  const isMutation = useIsMutating({
    mutationKey: "isLoading",
    exact: true,
  });

  const [discountedProduct, setDiscountedProduct] = useState<
    IStripeProduct | undefined
  >();

  useEffect(() => {
    if (discount && products) {
      const findProduct = products?.data.find(
        (product: { id: any }) =>
          product.id === discount?.data.applies_to?.products[0]
      );
      setDiscountedProduct(findProduct);
    }

    if (createCheckout) {
      window.location.replace(createCheckout.data.url);
    }
  }, [discount, products, createCheckout]);

  const redirectToCheckout = (priceId: string, couponId?: string) => {
    try {
      createCheckout.mutate({
        priceId: priceId,
        stripeCustomerId: user.stripeCustomerId,
        couponId: couponId || undefined,
        token: token as string,
      });
    } catch {
      return <div>Stripe Instance not available, 401</div>;
    }
  };

  return (
    <>
      <Row>
        <CreditOverview />
        {discount && (
          <CreditDiscount
            discountTitle={discount.data.name || ""}
            discountDeadline={discount.data.redeem_by || 0}
            discountValue={discount.data.amount_off || 0}
            productLabel={discountedProduct?.name || ""}
            productPrice={discountedProduct?.default_price.unit_amount || 0}
            onClick={() =>
              redirectToCheckout(
                discountedProduct?.default_price.id || "",
                discount.data.id
              )
            }
          />
        )}
      </Row>
      <SectionHeading>Buy packages</SectionHeading>
      <Container>
        <Row>
          {productsIsLoading || isMutation || discountIsLoading ? (
            <LoadingPackages />
          ) : (
            <>
              {products &&
                products.data
                  .slice()
                  .sort(
                    (
                      p1: { default_price: { unit_amount: number | null } },
                      p2: { default_price: { unit_amount: number | null } }
                    ) => {
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
                    }
                  )
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
