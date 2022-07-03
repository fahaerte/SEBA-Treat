import Stripe from "stripe";
import HttpException from "../../utils/exceptions/http.exception";
import { StripeError } from "../../utils/exceptions/stripe.errors";
import { Service } from "typedi";
import StripeUsersService from "./stripe.users.service";

@Service()
class StripeService {
  private stripe: Stripe;
  public stripeUsers: StripeUsersService;

  constructor() {
    const { STRIPE_API_SECRET_KEY } = process.env;
    this.stripe = new Stripe(`${STRIPE_API_SECRET_KEY}`, {
      apiVersion: "2020-08-27", // TODO for now api version of example article is used, check newer version https://stripe.com/docs/upgrades#api-changelog
    });
    this.stripeUsers = new StripeUsersService(this.stripe);
  }

  // PAYMENT SESSIONS
  public async createPaymentIntent(productId: string) {
    try {
      // Calculate order amount
      const priceObject = await this.getProductPrice(productId);
      if (priceObject && priceObject.data[0].unit_amount) {
        const paymentIntent = await this.stripe.paymentIntents.create({
          amount: priceObject.data[0].unit_amount,
          currency: "eur",
          automatic_payment_methods: {
            enabled: true,
          },
        });
        return paymentIntent.client_secret;
      }
      return "";
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "Could not create intent");
    }
  }

  // GETTER OF PRODUCTS, CUSTOMER, DISCOUNTS
  public async getCreditPackages(withPrice = false) {
    try {
      if (withPrice) {
        return this.stripe.products.list({
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

  public async getPrices() {
    try {
      return await this.stripe.prices.list({ expand: ["data.product"] });
    } catch (error: any) {
      throw new HttpException(500, "Could not get prices");
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

  public async getProductPrice(id: string) {
    try {
      // eslint-disable-next-line no-useless-escape
      return await this.stripe.prices.search({ query: `product:\"${id}\"` });
    } catch (error: any) {
      throw new HttpException(500, "Could not get price");
    }
  }
}

export default StripeService;
