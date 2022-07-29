import { baseApiAuth } from "./baseApi";
import { getCookie } from "../utils/auth/CookieProvider";

export const paymentGetProductsWithPrices = async () => {
  const response = await baseApiAuth().get("/payment/products/");
  return response.data;
};

export const paymentGetDiscount = async () => {
  const response = await baseApiAuth().get("/payment/discounts/");
  return response.data === "" ? undefined : response.data;
};

export interface CreateCheckoutSessionApiArg {
  couponId?: string;
  priceId: string;
  stripeCustomerId: string;
  amountCredits?: number;
}

export interface VerifyPaymentApiArg {
  priceId: string;
  customerId: string;
}

export const verifyPayment = async ({
  customerId,
  priceId,
}: VerifyPaymentApiArg) => {
  const userId = getCookie("userId");
  const response = await baseApiAuth().post(
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
  amountCredits,
}: CreateCheckoutSessionApiArg) => {
  const userId = getCookie("userId");
  const response = await baseApiAuth().post(
    "/payment/create-checkout-session",
    {
      priceId,
      stripeCustomerId,
      couponId,
      userId,
      amountCredits,
    }
  );
  return response.data;
};
