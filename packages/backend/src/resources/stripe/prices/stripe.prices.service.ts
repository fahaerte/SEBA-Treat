import { Service } from "typedi";
import { Stripe } from "stripe";
import { StripeError } from "../../../utils/exceptions/stripe.errors";
import HttpException from "../../../utils/exceptions/http.exception";

class StripePricesService {
  private stripe: Stripe;

  constructor(private readonly stripeInstance: Stripe) {
    this.stripe = stripeInstance;
  }

  public async createPrice(productId: string, pricePerUnit: number) {
    try {
      return await this.stripe.prices.create({
        currency: "eur",
        product: productId,
        unit_amount: pricePerUnit,
      });
    } catch (error: any) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }

  public async getPrice(priceId: string) {
    try {
      return await this.stripe.prices.retrieve(priceId);
    } catch (error: any) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }
}

export default StripePricesService;
