import Controller from "../../utils/interfaces/controller.interface";
import { Service } from "typedi";
import RatingService from "./ratingService";
import { NextFunction, Request, Response, Router } from "express";
import { authenticatedMiddleware } from "../../middleware/authenticated.middleware";
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
    this.router.post(
      `${this.path}/mealOffer/:mealOfferId/reservation/:mealReservationId`,
      authenticatedMiddleware,
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
      const rating = await this.ratingService.createUserRatingForMealOffer(
        req.user,
        req.params.mealOfferId,
        req.params.mealReservationId,
        req.body.rating as number
      );
      res.status(201).send(rating);
    } catch (error: any) {
      next(error);
    }
  };
}

export default RatingController;
