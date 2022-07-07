import Stripe from "stripe";
import HttpException from "../../utils/exceptions/http.exception";
import { StripeError } from "../../utils/exceptions/stripe.errors";
import { Service } from "typedi";
import StripeUsersService from "./stripe.users.service";
import { ConfigService } from "../../utils/ConfigService";

@Service()
class StripeService {
  private stripe: Stripe;
  public stripeUsers: StripeUsersService;
  private configService = new ConfigService();

  constructor() {
    this.stripe = new Stripe(
      `${this.configService.get("STRIPE_API_SECRET_KEY")}`,
      {
        apiVersion: "2020-08-27",
      }
    );
    this.stripeUsers = new StripeUsersService(this.stripe);
  }

  public async createCheckoutSession(
    priceId: string,
    customerId: string,
    couponId?: string
  ) {
    try {
      return await this.stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: 1,
          },
        ],
        customer: customerId,
        customer_update: { address: "auto" },
        mode: "payment",
        discounts: couponId ? [{ coupon: couponId }] : undefined,
        success_url: `${this.configService.get(
          "CLIENT_URL"
        )}/success/${priceId}`,
        cancel_url: `${this.configService.get("CLIENT_URL")}/purchase-credits`,
        automatic_tax: { enabled: true },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "Could not create session");
    }
  }

  public async getLatestCustomerPaymentIntent(customerId: string) {
    try {
      const customerIndent = await this.stripe.paymentIntents
        .search({
          // eslint-disable-next-line no-useless-escape
          query: `customer:\"${customerId}\"`,
        })
        .then((response) => {
          return response.data;
        });
      if (customerIndent.length > 0) {
        return customerIndent.reduce((prev, current) => {
          return prev.created > current.created ? prev : current;
        });
      } else {
        throw new Error("Could not find intent");
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "Could not create intent");
    }
  }

  // GETTER OF PRODUCTS, CUSTOMER, DISCOUNTS
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

  public async getPrice(priceId: string) {
    try {
      return await this.stripe.prices.retrieve(priceId);
    } catch (error: any) {
      throw new HttpException(500, "Could not get prices");
    }
  }

  public async getCreditDiscounts() {
    try {
      const allCoupons = await this.stripe.coupons.list({
        expand: ["data.applies_to"],
      });
      return allCoupons.data.find((coupon) => {
        if (coupon.redeem_by !== null && coupon.duration === "once") {
          return coupon.redeem_by >= new Date().getTime() / 1000;
        }
      });
    } catch (error: any) {
      throw new HttpException(500, error?.message as string);
    }
  }

  // PAYMENT SESSIONS
  // public async createPaymentIntent(productId: string) {
  //   try {
  //     // Calculate order amount
  //     const priceObject = await this.getProductPrice(productId);
  //     // const checkout = await this.stripe.checkout();
  //     if (priceObject && priceObject.data[0].unit_amount) {
  //       const paymentIntent = await this.stripe.paymentIntents.create({
  //         amount: priceObject.data[0].unit_amount,
  //         currency: "eur",
  //         automatic_payment_methods: {
  //           enabled: true,
  //         },
  //       });
  //       return paymentIntent.client_secret;
  //     }
  //     return "";
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(500, "Could not create intent");
  //   }
  // }
  //
  // public async getProductPrice(id: string) {
  //   try {
  //     // eslint-disable-next-line no-useless-escape
  //     return await this.stripe.prices.search({ query: `product:\"${id}\"` });
  //   } catch (error: any) {
  //     throw new HttpException(500, "Could not get price");
  //   }
  // }
}

export default StripeService;
