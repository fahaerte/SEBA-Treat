import { ICreditPackage } from "./ICreditPackage";
import Stripe from "stripe";

// Discount = temporary
export interface ICreditDiscount extends ICreditPackage {
  startDate: Date;
  endDate: Date;
}

export interface IStripeDiscount extends Stripe.Discount {}
