import Stripe from "stripe";
import HttpException from "../../utils/exceptions/http.exception";
import { StripeError } from "../../utils/exceptions/stripe.errors";
import StripePricesService from "./services/stripe.prices.service";
import StripeDiscountsService from "./services/stripe.discounts.service";
import StripeProductsService from "./services/stripe.products.service";
import { Service } from "typedi";
import StripeUsersService from "./services/stripe.users.service";

@Service()
class StripeService {
  private stripe: Stripe;
  // private stripePrices: StripePricesService;
  public stripeDiscounts: StripeDiscountsService;
  public stripeProducts: StripeProductsService;
  public stripeUsers: StripeUsersService;

  constructor() {
    const { STRIPE_API_SECRET_KEY } = process.env;
    this.stripe = new Stripe(`${STRIPE_API_SECRET_KEY}`, {
      apiVersion: "2020-08-27", // TODO for now api version of example article is used, check newer version https://stripe.com/docs/upgrades#api-changelog
    });
    // this.stripePrices = new StripePricesService(this.stripe);
    this.stripeDiscounts = new StripeDiscountsService(this.stripe);
    this.stripeProducts = new StripeProductsService(this.stripe);
    this.stripeUsers = new StripeUsersService(this.stripe);
  }

  public async createPaymentIntent(amountToCharge: number) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountToCharge, // price which will be deducted from customer's balance
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return paymentIntent.client_secret;
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
