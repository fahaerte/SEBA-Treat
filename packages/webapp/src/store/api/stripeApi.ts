import { emptyApi as api } from "../emptyApi";
// import {Stripe} from "@stripe/stripe-js";
import { IStripeProduct } from "@treat/lib-common";

const injectedStripeRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    paymentControllerGetPaymentIntentSecret: build.query<
      PaymentControllerGetPaymentIntentSecretApiResponse,
      PaymentControllerGetPaymentIntentSecretApiArg
    >({
      query: (queryArg) => ({
        url: `/payment/create-payment-intent/${queryArg.productId}`,
      }),
    }),
    paymentGetProductsWithPrices: build.query<
      PaymentControllerGetProductsWithPricesApiResponse,
      Record<string, never>
    >({
      query: () => ({
        url: `/payment/products/`,
      }),
    }),
  }),
});

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
  usePaymentControllerGetPaymentIntentSecretQuery,
  usePaymentGetProductsWithPricesQuery,
} = injectedStripeRtkApi;

export { injectedStripeRtkApi as stripeApi };
