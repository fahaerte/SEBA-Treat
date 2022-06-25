import Stripe from "stripe";
import HttpException from "../../utils/exceptions/http.exception";
import { StripeError } from "../../utils/exceptions/stripe.errors";
import StripePricesService from "./services/stripe.prices.service";
import StripeDiscountsService from "./services/stripe.discounts.service";
import StripeProductsService from "./services/stripe.products.service";
import { Service } from "typedi";

@Service()
class StripeService {
  private stripe: Stripe;
  private stripePrices: StripePricesService;
  private stripeDiscounts: StripeDiscountsService;
  private stripeProducts: StripeProductsService;

  constructor() {
    const { STRIPE_API_SECRET_KEY } = process.env;
    this.stripe = new Stripe(`${STRIPE_API_SECRET_KEY}`, {
      apiVersion: "2020-08-27", // TODO for now api version of example article is used, check newer version https://stripe.com/docs/upgrades#api-changelog
    });
    this.stripePrices = new StripePricesService(this.stripe);
    this.stripeDiscounts = new StripeDiscountsService(this.stripe);
    this.stripeProducts = new StripeProductsService(this.stripe);
  }

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

  public async createBillingPortalSession(userId: string) {
    return this.stripe.billingPortal.sessions.create({
      customer: userId,
      // TODO: Add correct url
      return_url: `localhost:3000/${userId}/profile`,
    });
  }
}

export default StripeService;
