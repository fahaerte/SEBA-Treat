import Controller from "../../utils/interfaces/controller.interface";
import { Service } from "typedi";
import RatingService from "./ratingService";
import { NextFunction, Request, Response, Router } from "express";
import authenticate from "../../middleware/authenticated.middleware";
import validate from "./rating.validation";
import validationMiddleware from "../../middleware/validation.middleware";

@Service()
class RatingController implements Controller {
  public path = "/ratings";
  public router = Router();

  constructor(private readonly ratingService: RatingService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.patch(
      `${this.path}/mealOffer/:mealOfferId/reservation/:mealReservationId`,
      authenticate,
      validationMiddleware(validate.rate),
      this.rateUserForMealOffer
    );
  }

  private rateUserForMealOffer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await this.ratingService.rateUser(
        req.user,
        req.params.mealOfferId,
        req.params.mealReservationId,
        req.body.rating as number
      );
      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };
}

export default RatingController;
