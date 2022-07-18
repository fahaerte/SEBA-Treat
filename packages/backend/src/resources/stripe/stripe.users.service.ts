import Stripe from "stripe";
import { Service } from "typedi";
import HttpException from "../../utils/exceptions/http.exception";

@Service()
class StripeUsersService {
  constructor(private readonly stripe: Stripe) {}

  public async createCustomer(
    userId: string,
    name: string,
    email: string,
    address?: {
      city?: string;
      country?: string;
      line1: string;
      postal_code?: string;
      state?: string;
    }
  ): Promise<string> {
    try {
      const stripeCustomer = await this.stripe.customers.create({
        name: name,
        email: email,
        address: address,
      });
      return stripeCustomer.id;
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "couldn't create stripe customer");
    }
  }
}

export default StripeUsersService;
