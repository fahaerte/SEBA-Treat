import React, { useEffect, useState } from "react";
import { Col, Container, Row, SectionHeading } from "../../components";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";
import CreditOverview from "../../components/CreditOverview";
import CreditDiscount from "../../components/CreditProducts/CreditDiscount";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { useIsMutating, useMutation, useQuery } from "react-query";
import {
  createCheckoutSession,
  CreateCheckoutSessionApiArg,
  paymentGetDiscount,
  paymentGetProductsWithPrices,
} from "../../api/stripeApi";
// import { CreateCheckoutSessionApiArg } from "@treat/lib-common/lib/interfaces/ICreateCheckoutSessionApiArg";
import { getUser } from "../../api/userApi";
import { useParams } from "react-router-dom";

export const CreditPackages = () => {
  const { userId: userIdParam, token: userTokenParam } = useParams();
  const { userId, setUserId, token, setToken } = useAuthContext();
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
      userId,
    }: CreateCheckoutSessionApiArg) => {
      return createCheckoutSession({
        priceId,
        stripeCustomerId,
        couponId,
        token,
        userId,
      });
    },
    {
      onSuccess: (response) => {
        console.log(response);
        window.location.replace(response.url);
      },
    }
  );

  const isMutation = useIsMutating({
    mutationKey: "isLoading",
    exact: true,
  });

  const [discountedProduct, setDiscountedProduct] = useState<
    IStripeProduct | undefined
  >();

  useEffect(() => {
    if (!userId && !token) {
      setUserId(userIdParam);
      setToken(userTokenParam);
    }
    if (discount && products) {
      const findProduct = products?.data.find(
        (product: { id: string }) =>
          product.id === discount?.data.applies_to?.products[0]
      );
      setDiscountedProduct(findProduct);
    }
  }, [discount, products, createCheckout]);

  const redirectToCheckout = (priceId: string, couponId?: string) => {
    try {
      createCheckout.mutate({
        priceId: priceId,
        stripeCustomerId: user.data.stripeCustomerId,
        couponId: couponId || undefined,
        token: token as string,
        userId: userId as string,
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
