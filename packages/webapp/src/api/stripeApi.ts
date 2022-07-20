import { baseApi, baseApiAuth } from "./baseApi";
// import { CreateCheckoutSessionApiArg } from "@treat/lib-common/lib/interfaces/ICreateCheckoutSessionApiArg";
// import { VerifyPaymentApiArg } from "@treat/lib-common/lib/interfaces/IVerifyPaymentApiArg";

export const paymentGetProductsWithPrices = async (token: string) => {
  const response = await baseApiAuth(token).get("/payment/products/");
  return response.data;
};

export const paymentGetDiscount = async (token: string) => {
  const response = await baseApiAuth(token).get("/payment/discounts/");
  return response.data === "" ? undefined : response.data;
};

export interface CreateCheckoutSessionApiArg {
  token: string;
  couponId?: string;
  priceId: string;
  stripeCustomerId: string;
  userId: string;
}

export interface VerifyPaymentApiArg {
  token: string;
  userId: string;
  priceId: string;
  customerId: string;
}

export const verifyPayment = async ({
  customerId,
  priceId,
  userId,
  token,
}: VerifyPaymentApiArg) => {
  const response = await baseApiAuth(token).post(
    `/payment/get-latest-payment?product=${priceId}`,
    {
      customerId,
      userId,
    }
  );
  return response.data;
};

export const createCheckoutSession = async ({
  priceId,
  stripeCustomerId,
  couponId,
  token,
  userId,
}: CreateCheckoutSessionApiArg) => {
  const response = await baseApiAuth(token).post(
    "/payment/create-checkout-session",
    {
      priceId,
      stripeCustomerId,
      couponId,
      userId,
    }
  );
  return response.data;
};

// const injectedStripeRtkApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     paymentGetProductsWithPrices: build.query<PaymentControllerGetProductsWithPricesApiResponse,
//       Record<string, never>>({
//       query: () => ({
//         url: `/payment/products/`
//       })
//     }),
//     paymentGetDiscount: build.query<IStripeDiscount | undefined,
//       Record<string, never>>({
//       query: () => ({
//         url: `/payment/discounts/`
//       })
//     }),
//
//     verifyPayment: build.query<VerifyPaymentApiResponse, VerifyPaymentApiArg>({
//       query: (queryArg) => ({
//         url: `/payment/get-latest-payment?product=${queryArg.priceId}`,
//         body: {
//           customerId: queryArg.customerId,
//           userId: queryArg.userId
//         },
//         method: "POST"
//       })
//     }),
//     createCheckoutSession: build.mutation<CreateCheckoutSessionApiResponse,
//       CreateCheckoutSessionApiArg>({
//       query: (queryArg) => ({
//         url: `/payment/create-checkout-session`,
//         method: "POST",
//         body: {
//           priceId: queryArg.priceId,
//           stripeCustomerId: queryArg.stripeCustomerId,
//           couponId: queryArg.couponId
//         }
//       })
//     })
//   })
// });
//
// export type CreateCheckoutSessionApiResponse = { url: string };

//
// export type VerifyPaymentApiResponse = { message: string };
// export type VerifyPaymentApiArg = {
//   customerId: string;
//   priceId: string;
//   userId: string;
// };
//
// export type PaymentControllerGetProductsWithPricesApiResponse =
//   IStripeProduct[];
//
// export const {
//   usePaymentGetProductsWithPricesQuery,
//   useVerifyPaymentQuery,
//   useCreateCheckoutSessionMutation,
//   usePaymentGetDiscountQuery
// } = injectedStripeRtkApi;
//
// export { injectedStripeRtkApi as stripeApi };
