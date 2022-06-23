import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import validationMiddleware from "../../middleware/validation.middleware";
import HttpException from "../../utils/exceptions/http.exception";
import authenticated from "../../middleware/authenticated.middleware";
import validate from "./mealTransaction.validation";
import MealTransactionService from "./mealTransaction.service";
import { ObjectId } from "mongoose";

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
      validationMiddleware(validate.createTransaction)
      // this.createTransaction
    );
    this.router.post(
      `${this.path}/perform/:mealTransactionId`,
      authenticated
      // validationMiddleware(validate.createTransaction),
      // this.performTransaction
    );
  }
}

export default MealTransactionController;
