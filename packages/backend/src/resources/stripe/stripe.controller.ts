import { Service } from "typedi";
import { Router, Request, Response, NextFunction } from "express";
import StripeService from "./stripe.service";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import UserService from "../user/user.service";
import { authenticatedMiddleware } from "../../middleware/authenticated.middleware";

@Service()
class StripeController implements Controller {
  public path = "/payment";
  public router = Router();

  constructor(
    private readonly stripeService: StripeService,
    private readonly userService: UserService
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}/products`,
      authenticatedMiddleware,
      this.getCreditPackages
    );

    this.router.get(
      `${this.path}/discounts`,
      authenticatedMiddleware,
      this.getCreditDiscounts
    );

    this.router.post(
      `${this.path}/get-latest-payment`,
      authenticatedMiddleware,
      this.verifyLatestPayment
    );

    this.router.post(
      `${this.path}/create-checkout-session`,
      authenticatedMiddleware,
      this.createCheckoutSession
    );
  }

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
      res.status(200).json(allDiscounts);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private createCheckoutSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { priceId, stripeCustomerId, userId, amountCredits } = req.body;
      const session = await this.stripeService.createCheckoutSession(
        priceId as string,
        stripeCustomerId as string,
        userId as string,
        amountCredits,
        req.body.couponId ? req.body.couponId : undefined
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

  private verifyLatestPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const customerId = req.body.customerId as string;
      const userId = req.body.userId as string;
      const productId = req.query.product as string;
      const productObject = await this.stripeService.getProductByPrice(
        productId
      );

      const successfulPayment =
        await this.stripeService.verifyLatestUserPayment(customerId);

      if (successfulPayment) {
        const newCredits = parseInt(productObject.name.split(" ")[0]);
        const user = await this.userService.getUser(userId);
        const newBalance = newCredits + (user?.virtualAccount?.balance || 0);
        if (user) {
          await this.userService.updateUser({
            _id: userId,
            virtualAccount: { balance: newBalance },
          });
        }
        res.status(200).json({ newAccountBalance: newBalance });
      } else {
        res.status(500).json({
          message: "You did not make a purchase! Please contact tech-support.",
        });
      }
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default StripeController;
