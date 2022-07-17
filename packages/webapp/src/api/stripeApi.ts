import { baseApi } from "./baseApi";
import { CreateCheckoutSessionApiArg } from "@treat/lib-common/src/interfaces/ICreateCheckoutSessionApiArg";
import { VerifyPaymentApiArg } from "@treat/lib-common/lib/interfaces/IVerifyPaymentApiArg";

export const paymentGetProductsWithPrices = async (token: string) => {
  return await baseApi(token).get("/payment/products/");
};

export const paymentGetDiscount = async (token: string) => {
  return await baseApi(token).get("/payment/discounts/");
};

export const verifyPayment = async ({
  customerId: customerId,
  priceId: priceId,
  userId: userId,
  token: token,
}: VerifyPaymentApiArg) => {
  const response = await baseApi(token).post(
    `/payment/get-latest-payment?product=${priceId}`,
    {
      customerId,
      userId,
    }
  );
  return response.data;
};

export const createCheckoutSession = async ({
  priceId: priceId,
  stripeCustomerId: stripeCustomerId,
  couponId: couponId,
  token: token,
}: CreateCheckoutSessionApiArg) => {
  const response = await baseApi(token).post(
    "/payment/create-checkout-session",
    {
      priceId,
      stripeCustomerId,
      couponId,
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
