import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  PageHeading,
  SectionHeading,
} from "../../components";
import { IStripeProduct } from "@treat/lib-common";
import CreditPackage from "../../components/CreditProducts/CreditPackage";
import LoadingPackages from "../../components/CreditProducts/LoadingPackages";
import ProfileOverview from "../../components/Profile/ProfileOverview";
import CreditDiscount from "../../components/CreditProducts/CreditDiscount";
import { useIsMutating, useMutation, useQuery } from "react-query";
import {
  createCheckoutSession,
  CreateCheckoutSessionApiArg,
  paymentGetDiscount,
  paymentGetProductsWithPrices,
} from "../../api/stripeApi";
import { getUser } from "../../api/userApi";
import { useParams } from "react-router-dom";
import { TransactionHistory } from "../../components/TransactionHistory/TransactionHistory";
import { getCookie, setCookie } from "../../utils/auth/CookieProvider";

export const CreditScreen = () => {
  const { userId: userIdParam, token: userTokenParam } = useParams();
  const { data: user } = useQuery("getUser", () => getUser());

  const { data: products, isLoading: productsIsLoading } = useQuery(
    "products",
    () => paymentGetProductsWithPrices()
  );

  const { data: discount, isLoading: discountIsLoading } = useQuery(
    "discounts",
    () => paymentGetDiscount()
  );

  const createCheckout = useMutation(
    ({ priceId, stripeCustomerId, couponId }: CreateCheckoutSessionApiArg) => {
      return createCheckoutSession({
        priceId,
        stripeCustomerId,
        couponId,
      });
    },
    {
      onSuccess: (response: { url: string }) => {
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

  const userId = getCookie("userId");

  useEffect(() => {
    if (!userId) {
      setCookie("userId", userIdParam as string);
    }
    if (discount && products) {
      const findProduct: IStripeProduct | undefined = products.find(
        (product: { id: string }) =>
          product.id === discount?.applies_to?.products[0]
      );
      setDiscountedProduct(findProduct);
    }
  }, [discount, products, createCheckout, userId, userTokenParam, userIdParam]);

  const redirectToCheckout = (priceId: string, couponId?: string) => {
    try {
      createCheckout.mutate({
        priceId: priceId,
        stripeCustomerId: user.data.stripeCustomerId,
        couponId: couponId || undefined,
      });
    } catch {
      return <div>Stripe Instance not available, 401</div>;
    }
  };

  return (
    <>
      <Container className={""}>
        <PageHeading className={"pt-5"}>
          Your <u>account</u>
        </PageHeading>
        <ProfileOverview />
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
        <SectionHeading>Buy packages</SectionHeading>
        <Container>
          <Row>
            {productsIsLoading || isMutation || discountIsLoading ? (
              <LoadingPackages />
            ) : (
              <>
                {products &&
                  products
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
          {/*<UserOverview />*/}
        </Container>
        <TransactionHistory />
      </Container>
    </>
  );
};
