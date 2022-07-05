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
  ) {
    try {
      const stripeCustomer = await this.stripe.customers.create({
        name,
        email,
        metadata: {
          treatUserId: userId,
        },
        address,
      });
      return stripeCustomer.id;
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "couldn't create stripe customer");
    }
  }

  public async getUserByEmail(email: string) {
    try {
      return await this.stripe.customers.search({
        // eslint-disable-next-line no-useless-escape
        query: `email:\"${email}\"`,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "couldn't create stripe customer");
    }
  }

  public async getUserByTreatId(treatId: string) {
    try {
      return await this.stripe.customers.search({
        // eslint-disable-next-line no-useless-escape
        query: `metadata[\'treatUserId\']:\'${treatId}\'`,
      });
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
