import Controller from "../../utils/interfaces/controller.interface";
import {Response, Request, NextFunction, Router} from "express";
import MealCategoryService from "./mealCategory.service";
import MealCategory from "./mealCategory.interface";
import authenticate from "../../middleware/authenticated.middleware";
import {Service} from "typedi";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./mealCategory.validation";

@Service()
class MealCategoryController implements Controller {
    public path = "/mealCategories";
    public router = Router();

    constructor(private readonly MealCategoryService: MealCategoryService) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authenticate,
            validationMiddleware(validate.create),
            this.create
        )
        this.router.get(
            `${this.path}`,
            authenticate,
            this.getMealCategories
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealCategoryRequest = req.body as MealCategory;
            const newMealCategory = await this.MealCategoryService.create(mealCategoryRequest);
            res.status(201).send({data: newMealCategory});
        } catch (error: any) {
            next(error);
        }
    }

    private getMealCategories = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealCategories = await this.MealCategoryService.getMealCategories();
            res.status(200).send({data: mealCategories});
        } catch (error: any) {
            next(error);
        }
    }
}

export default MealCategoryController;