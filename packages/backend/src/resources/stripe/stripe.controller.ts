import { Service } from "typedi";
import { Router, Request, Response, NextFunction } from "express";
import StripeService from "./stripe.service";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";

@Service()
class StripeController implements Controller {
  public path = "/payment";
  public router = Router();

  constructor(private readonly stripeService: StripeService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /api/payment/products:
     *  get:
     *    tags:
     *    - Stripe
     *    summary: Get all credit packages including the price
     *    produces:
     *    - application/json
     *    responses:
     *      404:
     *        description: Not user logged in
     *      400:
     *        description: Any other error
     */
    this.router.get(`${this.path}/products`, this.getCreditPackages);

    /**
     * @swagger
     * /api/payment/discounts:
     *  get:
     *    tags:
     *    - Stripe
     *    summary: Get all active discounts
     *    produces:
     *    - application/json
     *    responses:
     *      404:
     *        description: Not user logged in
     *      400:
     *        description: Any other error
     */
    this.router.get(`${this.path}/discounts`, this.getCreditDiscounts);

    /**
     * @swagger
     * /api/payment/get-latest-payment:
     *  get:
     *    tags:
     *    - Stripe
     *    summary: Get all credit packages including the price
     *    produces:
     *    - application/json
     *    responses:
     *      404:
     *        description: Not user logged in
     *      400:
     *        description: Any other error
     */
    this.router.post(`${this.path}/get-latest-payment`, this.getLatestIntent);

    this.router.post(
      `${this.path}/create-checkout-session`,
      this.createCheckoutSession
    );
  }

  private createCheckoutSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const stripeCustomer =
        await this.stripeService.stripeUsers.getUserByTreatId(
          req.body.userId as string
        );
      const session = await this.stripeService.createCheckoutSession(
        req.body.priceId as string,
        stripeCustomer.data[0].id,
        req.body.couponId ? (req.body.couponId as string) : undefined
      );
      if (session.url) {
        res.json({ url: session.url });
      } else {
        throw new Error("Session could not be created");
      }
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getLatestIntent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const customerId = req.body.customerId as string;
      const priceId = req.query.price as string;
      const latestIntent =
        await this.stripeService.getLatestCustomerPaymentIntent(customerId);
      const priceObject = await this.stripeService.getPrice(priceId);

      // TODO: Check with discount
      // if (
      //   priceObject.unit_amount === latestIntent.amount &&
      //   latestIntent.created <= latestIntent.created + 3000
      // ) {
      //   res.status(200).json({ message: "Payment successful" });
      // } else {
      //   res.status(500).json({ message: "Payment not successful" });
      // }
      res.status(200).json({ message: "Payment successful" });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getCreditPackages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const allProducts = await this.stripeService.getCreditPackages(true);
      res.status(200).json(allProducts.data);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getCreditDiscounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const allDiscounts = await this.stripeService.getCreditDiscounts();
      res.status(200).json(allDiscounts || {});
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default StripeController;
