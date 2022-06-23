import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import HttpException from "../../utils/exceptions/http.exception";
import validate from "./mealTransaction.validation";
import MealTransactionService from "./mealTransaction.service";
import { ObjectId } from "mongoose";
import authenticate from "../../middleware/authenticated.middleware";

class MealTransactionController implements Controller {
  public path = "/mealTransactions";
  public router = Router();
  private mealTransactionService = new MealTransactionService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, authenticate, this.getMealTransactions);
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
}

export default MealTransactionController;
