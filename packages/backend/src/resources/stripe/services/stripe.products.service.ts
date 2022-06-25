import { Service } from "typedi";
import { Stripe } from "stripe";
import HttpException from "../../../utils/exceptions/http.exception";
import { StripeError } from "../../../utils/exceptions/stripe.errors";
import StripePricesService from "./stripe.prices.service";

@Service()
class StripeProductsService {
  private stripePrices: StripePricesService;

  constructor(private readonly stripe: Stripe) {
    this.stripePrices = new StripePricesService(stripe);
  }

  public async createCreditPackage(
    start: Date,
    description: string,
    end: Date,
    name: string,
    price: number
  ) {
    try {
      const product = await this.stripe.products.create({ name, description });
      const priceForProduct = await this.stripePrices.createPrice(
        product.id,
        price
      );
      return { product, price: priceForProduct };
    } catch (error: any) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }

  public async getCreditPackages() {
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

export default StripeProductsService;
