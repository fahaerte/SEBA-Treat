import { emptyApi as api } from "../emptyApi";
import { IStripeProduct, IStripeDiscount } from "@treat/lib-common";

const injectedStripeRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    paymentGetProductsWithPrices: build.query<
      PaymentControllerGetProductsWithPricesApiResponse,
      Record<string, never>
    >({
      query: () => ({
        url: `/payment/products/`,
      }),
    }),
    paymentGetDiscount: build.query<
      IStripeDiscount | undefined,
      Record<string, never>
    >({
      query: () => ({
        url: `/payment/discounts/`,
      }),
    }),

    verifyPayment: build.query<VerifyPaymentApiResponse, VerifyPaymentApiArg>({
      query: (queryArg) => ({
        url: `/payment/get-latest-payment?product=${queryArg.priceId}`,
        body: {
          customerId: queryArg.customerId,
          userId: queryArg.userId,
        },
        method: "POST",
      }),
    }),
    createCheckoutSession: build.mutation<
      CreateCheckoutSessionApiResponse,
      CreateCheckoutSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/payment/create-checkout-session`,
        method: "POST",
        body: {
          priceId: queryArg.priceId,
          stripeCustomerId: queryArg.stripeCustomerId,
          couponId: queryArg.couponId,
        },
      }),
    }),
  }),
});

export type CreateCheckoutSessionApiResponse = { url: string };
export type CreateCheckoutSessionApiArg = {
  priceId: string;
  stripeCustomerId: string;
  couponId?: string;
};

export type VerifyPaymentApiResponse = { message: string };
export type VerifyPaymentApiArg = {
  customerId: string;
  priceId: string;
  userId: string;
};

export type PaymentControllerGetProductsWithPricesApiResponse =
  IStripeProduct[];

export const {
  usePaymentGetProductsWithPricesQuery,
  useVerifyPaymentQuery,
  useCreateCheckoutSessionMutation,
  usePaymentGetDiscountQuery,
} = injectedStripeRtkApi;

export { injectedStripeRtkApi as stripeApi };
