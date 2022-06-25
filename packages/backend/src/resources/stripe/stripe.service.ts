import Stripe from "stripe";
import HttpException from "../../utils/exceptions/http.exception";
import { StripeError } from "../../utils/exceptions/stripe.errors";
import StripeDiscountsService from "./services/stripe.discounts.service";
// import StripeProductsService from "./services/stripe.products.service";
import { Service } from "typedi";
import StripeUsersService from "./services/stripe.users.service";

@Service()
class StripeService {
  private stripe: Stripe;
  // private stripePrices: StripePricesService;
  // public stripeDiscounts: StripeDiscountsService;
  // public stripeProducts: StripeProductsService;
  public stripeUsers: StripeUsersService;

  constructor() {
    const { STRIPE_API_SECRET_KEY } = process.env;
    this.stripe = new Stripe(`${STRIPE_API_SECRET_KEY}`, {
      apiVersion: "2020-08-27", // TODO for now api version of example article is used, check newer version https://stripe.com/docs/upgrades#api-changelog
    });
    // this.stripePrices = new StripePricesService(this.stripe);
    // this.stripeDiscounts = new StripeDiscountsService(this.stripe);
    // this.stripeProducts = new StripeProductsService(this.stripe);
    this.stripeUsers = new StripeUsersService(this.stripe);
  }

  // PAYMENT SESSIONS
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

  // GETTER OF PRODUCTS, CUSTOMER, DISCOUNTS
  public async getCreditPackages(withPrice = false) {
    try {
      if (withPrice) {
        return this.stripe.products.list({
          expand: ["data.default_price"],
        });
      }
      return this.stripe.products.list();
    } catch (error: any) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }

  public async getCreditDiscounts() {
    try {
      return await this.stripe.coupons.list({
        expand: ["data.applies_to"],
      });
    } catch (error: any) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new HttpException(401, "Credit card not set up");
      }
      throw new HttpException(500, error?.message as string);
    }
  }
}

export default StripeService;
