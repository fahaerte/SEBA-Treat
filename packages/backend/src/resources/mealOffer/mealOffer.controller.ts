import Controller from "../../../lib/utils/interfaces/controller.interface";
import {Request, Response, NextFunction, Router} from "express";
import MealOffer from "../mealOffer/mealOffer.interface";
import validationMiddleware from "../../../lib/middleware/validation.middleware";
import validate from "../mealOffer/mealOffer.validation";
import authenticate from "../../middleware/authenticated.middleware";
import {Service} from "typedi";
import MealOfferService from "./mealOffer.service";

@Service()
class MealOfferController implements Controller {
    public path = "/mealOffers";
    public router = Router();

    constructor(private readonly MealOfferService: MealOfferService) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authenticate,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(
            `${this.path}/:mealOfferId`,
            authenticate,
            this.getMealOffer
        )
        this.router.delete(
            `${this.path}/:mealOfferId`,
            authenticate,
            this.deleteMealOffer
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealOfferRequest = req.body as MealOffer;
            const newMealOffer = await this.MealOfferService.create(mealOfferRequest, req.user);
            res.status(201).send({data: newMealOffer});
        } catch (error: any) {
            next(error);
        }
    };

    private getMealOffer = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealOffer = await this.MealOfferService.getMealOffer(req.params.mealOfferId);
            res.status(200).send({data: mealOffer});
        } catch (error: any) {
            next(error);
        }
    }

    private deleteMealOffer = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            await this.MealOfferService.deleteMealOffer(req.params.mealOfferId, req.user);
            res.send(200).send();
        } catch (error: any) {
            next(error);
        }
    }
}

export default MealOfferController;