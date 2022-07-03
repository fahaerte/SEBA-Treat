import { emptyApi as api } from "../emptyApi";

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
  }),
});

export type PaymentControllerGetPaymentIntentSecretApiResponse =
  /** status 200  */ string;
export type PaymentControllerGetPaymentIntentSecretApiArg = {
  /** nanoid(12) */
  // userId: string;
  productId: string;
};

export const { usePaymentControllerGetPaymentIntentSecretQuery } =
  injectedStripeRtkApi;

export { injectedStripeRtkApi as stripeApi };
