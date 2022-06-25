import { Service } from "typedi";
import { Stripe } from "stripe";
import HttpException from "../../../utils/exceptions/http.exception";

import { StripeError } from "../../../utils/exceptions/stripe.errors";

@Service()
class StripeDiscountsService {
  private stripe: Stripe;

  constructor(private readonly stripeInstance: Stripe) {
    this.stripe = stripeInstance;
  }

  // TODO: Adjust
  public async createCreditDiscount(
    start: Date,
    description: string,
    end: Date,
    name: string,
    price: string
  ) {
    try {
      return await this.stripe.products.create({ name, description });
    } catch (error: any) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }

  public async getCreditDiscounts() {
    try {
      return await this.stripe.products.list();
    } catch (error: any) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }
}

export default StripeDiscountsService;
