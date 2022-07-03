import { emptyApi as api } from "../emptyApi";
// import {Stripe} from "@stripe/stripe-js";
import { IStripeProduct } from "@treat/lib-common";

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
    verifyPayment: build.query<VerifyPaymentApiResponse, VerifyPaymentApiArg>({
      query: (queryArg) => ({
        url: `/payment/get-latest-payment?price=${queryArg.priceId}`,
        body: {
          customerId: queryArg.customerId,
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
          userId: queryArg.userId,
        },
      }),
    }),
  }),
});

export type CreateCheckoutSessionApiResponse = { url: string };
export type CreateCheckoutSessionApiArg = {
  priceId: string;
  userId: string;
};
export type VerifyPaymentApiResponse = { message: string };
export type VerifyPaymentApiArg = { customerId: string; priceId: string };
export type PaymentControllerGetProductsWithPricesApiResponse =
  IStripeProduct[];
export type PaymentControllerGetPaymentIntentSecretApiResponse =
  /** status 200  */ string;
export type PaymentControllerGetPaymentIntentSecretApiArg = {
  /** nanoid(12) */
  // userId: string;
  productId: string;
};

export const {
  usePaymentGetProductsWithPricesQuery,
  useVerifyPaymentQuery,
  useCreateCheckoutSessionMutation,
} = injectedStripeRtkApi;

export { injectedStripeRtkApi as stripeApi };
