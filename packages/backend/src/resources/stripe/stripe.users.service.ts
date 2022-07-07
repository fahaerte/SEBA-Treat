import Stripe from "stripe";
import { Service } from "typedi";
import HttpException from "../../utils/exceptions/http.exception";

@Service()
class StripeUsersService {
  constructor(private readonly stripe: Stripe) {}

  // TODO: inject in user
  public async createCustomer(
    userId: string,
    name: string,
    email: string,
    address?: {
      city?: string;
      country?: string;
      line1: string; // Equivalent to street + housenumber
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

  // TODO: Has to be added in user
  public async updateCustomer(
    userId: string,
    name?: string,
    email?: string,
    address?: {
      city?: string;
      country?: string;
      line1: string; // Equivalent to street + housenumber
      postal_code?: string;
      state?: string;
    }
  ) {
    try {
      return await this.stripe.customers.update(userId, {
        email,
        name,
        address,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "couldn't update stripe customer");
    }
  }
}

export default StripeUsersService;
