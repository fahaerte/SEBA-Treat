import { Service } from "typedi";
import { Stripe } from "stripe";
import HttpException from "../../../utils/exceptions/http.exception";
import { StripeError } from "../../../utils/exceptions/stripe.errors";

@Service()
class StripeProductsService {
  constructor(private readonly stripe: Stripe) {}

  public async getCreditPackages(withPrice = false) {
    try {
      if (withPrice) {
        return await this.stripe.products.list({
          expand: ["data.default_price"],
        });
      }
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
