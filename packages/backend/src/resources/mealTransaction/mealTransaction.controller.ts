import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import MealTransactionService from "./mealTransaction.service";
import { ObjectId } from "mongoose";
import { authenticatedMiddleware } from "../../middleware/authenticated.middleware";
import MealTransactionParticipant from "./mealTransactionParticipant.enum";
import validate from "./mealTransaction.validation";
import { Service } from "typedi";
import validationMiddleware from "../../middleware/validation.middleware";

@Service()
class MealTransactionController implements Controller {
  public path = "/mealTransactions";
  public router = Router();

  constructor(private readonly mealTransactionService: MealTransactionService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      `${this.path}`,
      authenticatedMiddleware,
      this.getMealTransactions
    );
    this.router.patch(
      `${this.path}/ratings/mealOffer/:mealOfferId`,
      authenticatedMiddleware,
      validationMiddleware(validate.rateTransaction),
      this.rateTransaction
    );
    this.router.post(
      `${this.path}/:mealTransactionId/rate`,
      authenticatedMiddleware,
      this.rateTransactionParticipant
    );
  }

  private getMealTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "No logged in user"));
      } else {
        const mealTransactions =
          await this.mealTransactionService.getMealTransactions(
            req.user._id as unknown as ObjectId
          );
        res.status(200).send({ data: mealTransactions });
      }
    } catch (error: any) {
      next(error);
    }
  };

  private rateTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await this.mealTransactionService.rateTransaction(
        req.user,
        req.params.mealOfferId,
        req.body.rating as number
      );
      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };

  private rateTransactionParticipant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "No logged in user"));
      } else {
        const user = req.user;
        // const userId = req.user._id;
        const mealTransactionId = req.params.mealTransactionId;
        const stars = req.body.stars;
        const participantType = req.body.participantType;
        const mealTransaction =
          await this.mealTransactionService.rateTransactionParticipant(
            user,
            mealTransactionId as unknown as ObjectId,
            stars as number,
            participantType as MealTransactionParticipant
          );
        res.status(200).json({ mealTransaction });
      }
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default MealTransactionController;
