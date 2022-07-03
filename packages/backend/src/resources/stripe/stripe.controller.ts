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
     * /api/payment/user/{userid}:
     *  get:
     *    tags:
     *    - Stripe
     *    summary: Get stripe customer by treat Id
     *    parameters:
     *     - in: path
     *       name: userid
     *       required: true
     *       type: string
     *       description: the user's id
     *    produces:
     *    - application/json
     *    responses:
     *      404:
     *        description: Not user logged in
     *      400:
     *        description: Any other error
     */
    this.router.get(`${this.path}/user/:userid`, this.getUserById);

    this.router.get(
      `${this.path}/create-payment-intent/:productId`,
      this.createPaymentIntent
    );
  }

  private createPaymentIntent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const clientSecret = await this.stripeService.createPaymentIntent(
        req.params.productId
      );
      console.log(clientSecret);
      res.status(200).json(clientSecret);
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
      res.status(200).json(allDiscounts.data);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.stripeService.stripeUsers.getUserByTreatId(
        req.params.userid
      );
      res.status(200).json(user);
    } catch (error: any) {
      next(new HttpException(error.status, error.message));
    }
  };
}

export default StripeController;
