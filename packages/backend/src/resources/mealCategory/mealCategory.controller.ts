import Controller from "../../utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import authenticate from "../../middleware/authenticated.middleware";
import { Service } from "typedi";
import { EMealCategory } from "@treat/lib-common/lib/enums/EMealCategory";

// TODO: Throw out? Not necessary, since hard coded definition
@Service()
class MealCategoryController implements Controller {
  public path = "/mealCategories";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, authenticate, this.getMealCategories);
  }

  private getMealCategories = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    try {
      res.status(200).send({ data: Object.values(EMealCategory) });
    } catch (error: any) {
      next(error);
    }
  };
}

export default MealCategoryController;
