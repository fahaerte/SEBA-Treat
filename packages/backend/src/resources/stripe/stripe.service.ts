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
    } catch (error: any) {
      if (error?.code === StripeError.CardExpired) {
        throw new HttpException(406, "Credit card expired");
      }
      if (error?.code === StripeError.CardDeclined) {
        throw new HttpException(402, "Credit card declined");
      }
      if (error?.code === StripeError.CouponExpired) {
        throw new HttpException(400, "Coupon has already been redeemed.");
      }
      throw new HttpException(500, "Can't go to checkout");
    }
  }

  public async verifyLatestUserPayment(customerId: string) {
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
        const latestIntent = customerIndent.reduce((prev, current) => {
          return prev.created > current.created ? prev : current;
        });
        if (latestIntent.created <= latestIntent.created + 10000) {
          return true;
        }
      }
      return false;
    } catch (error: any) {
      throw new HttpException(500, "Could not Verify Payment");
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
      throw new HttpException(500, error?.message as string);
    }
  }

  public async getProductByPrice(priceId: string) {
    try {
      const price = await this.stripe.prices.retrieve(priceId);
      return await this.stripe.products.retrieve(price.product as string);
    } catch (error: any) {
      if (error?.code === StripeError.ProductInactive) {
        throw new HttpException(503, "Product is not available anymore.");
      }
      throw new HttpException(500, "Could not get product");
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
}

export default StripeService;