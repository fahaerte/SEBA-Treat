import Controller from "../../utils/interfaces/controller.interface";
import { Response, Request, NextFunction, Router } from "express";
import authenticate from "../../middleware/authenticated.middleware";
import { Service } from "typedi";
import MealCategory from "./mealCategory.enum";

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
      res.status(200).send({ data: Object.values(MealCategory) });
    } catch (error: any) {
      next(error);
    }
  };
}

export default MealCategoryController;
