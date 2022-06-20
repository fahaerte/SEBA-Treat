import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import HttpException from "../../utils/exceptions/http.exception";
import authenticated from "../../middleware/authenticated.middleware";
import validate from "./mealTransaction.validation";
import MealTransactionService from "./mealTransaction.service";
import { ObjectId, Types } from "mongoose";

class MealTransactionController implements Controller {
  public path = "/mealTransactions";
  public router = Router();
  private mealTransactionService = new MealTransactionService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      authenticated,
      validationMiddleware(validate.createTransaction),
      this.createTransaction
    );
    this.router.post(
      // TODO: /perform/:mealTransactionId OR /:mealTransactionId/perform ?
      `${this.path}/perform/:mealTransactionId`,
      authenticated,
      // validationMiddleware(validate.createTransaction),
      this.performTransaction
    );
  }

  private createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { mealReservation, senderAccount, receiverAccount } = req.body;
      const mealTransaction =
        await this.mealTransactionService.createTransaction(
          mealReservation as Types.ObjectId,
          senderAccount as ObjectId,
          receiverAccount as Types.ObjectId
        );

      res.status(201).json({ mealTransaction });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private performTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const mealTransactionId = req.params.mealTransactionId;
      const mealTransaction =
        await this.mealTransactionService.performTransaction(
          mealTransactionId as unknown as Types.ObjectId
        );

      res.status(200).json({ mealTransaction });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default MealTransactionController;
