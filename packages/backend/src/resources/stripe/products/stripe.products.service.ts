import { Service } from "typedi";
import { Stripe } from "stripe";
import HttpException from "../../../utils/exceptions/http.exception";
import { StripeError } from "../../../utils/exceptions/stripe.errors";

// @Service
class StripeDiscountsService {
  private stripe: Stripe;

  constructor(private readonly stripeInstance: Stripe) {
    this.stripe = stripeInstance;
  }

  public async createCreditPackage() {
    try {
      return await this.stripe.products.create({ name: "Discount" });
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }
}

export default StripeDiscountsService;
