export interface CreateCheckoutSessionApiArg {
  priceId: string;
  stripeCustomerId: string;
  couponId?: string;
  token: string;
}
