import Controller from "../../utils/interfaces/controller.interface";
import {Response, Request, NextFunction, Router} from "express";
import {Service} from "typedi";
import MealAllergenService from "./mealAllergen.service";
import validate from "./mealAllergen.validation";
import authenticate from "../../middleware/authenticated.middleware";
import validationMiddleware from "../../middleware/validation.middleware";
import MealAllergen from "./mealAllergen.interface";

@Service()
class MealAllergenController implements Controller {
    public path = "/mealAllergens";
    public router = Router();

    constructor(private readonly MealAllergenService: MealAllergenService) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authenticate,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealAllergenRequest = req.body as MealAllergen;
            const newMealAllergen = await this.MealAllergenService.create(mealAllergenRequest);
            res.status(201).send({data: newMealAllergen});
        } catch (error: any) {
            next(error);
        }
    }
}

export default MealAllergenController;