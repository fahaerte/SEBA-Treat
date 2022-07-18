import Controller from "../../utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { Service } from "typedi";
import authenticate from "../../middleware/authenticated.middleware";
import { EMealAllergen } from "@treat/lib-common/lib/enums/EMealAllergen";

// TODO: Throw out? Not really necessary?
@Service()
class MealAllergenController implements Controller {
  public path = "/mealAllergens";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, authenticate, this.getMealOfferAllergens);
  }

  private getMealOfferAllergens = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      res.status(200).send({ data: Object.values(EMealAllergen) });
    } catch (error: any) {
      next(error);
    }
  };
}

export default MealAllergenController;
