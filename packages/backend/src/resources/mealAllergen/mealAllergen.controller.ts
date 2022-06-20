import Controller from "../../utils/interfaces/controller.interface";
import { Response, Request, NextFunction, Router } from "express";
import { Service } from "typedi";
import authenticate from "../../middleware/authenticated.middleware";
import MealAllergenEnum from "./mealAllergen.enum";

@Service()
class MealAllergenController implements Controller {
  public path = "/mealAllergens";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
        `${this.path}`,
        authenticate,
        this.getMealOfferAllergens
    )
  }

  private getMealOfferAllergens = (
      req: Request,
      res: Response,
      next: NextFunction
  ): void => {
    try {
      res.status(200).send({ data: Object.values(MealAllergenEnum) });
    } catch (error: any) {
      next(error);
    }
  }
}

export default MealAllergenController;
