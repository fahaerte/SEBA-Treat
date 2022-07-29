import Stripe from "stripe";

export interface ICreditPackage {
  name: string;
  creditAmount: number;
  price: number;
  title: string;
  description: string;
}

export interface IStripeProduct extends Stripe.Product {
  default_price: Stripe.Price;
}
