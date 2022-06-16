import Controller from "../../utils/interfaces/controller.interface";
import {Request, Response, NextFunction, Router} from "express";
import {Service} from "typedi";
import MealReservationService from "./mealReservation.service";
import authenticate from "../../middleware/authenticated.middleware";
import validate from "./mealReservation.validation";
import validationMiddleware from "../../middleware/validation.middleware";

@Service()
class MealReservationController implements Controller {
    public path = "/mealReservations";
    public router = Router();

    constructor(private readonly MealReservationService: MealReservationService) {
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
            `${this.path}/:mealReservationId`,
            authenticate,
            this.getMealReservation
        );
        this.router.put(
            `${this.path}/setSellerAccepted/:mealReservationId`,
            authenticate,
            this.setMealReservationStateToSellerAccepted
        );
        this.router.put(
            `${this.path}/setSellerRejected/:mealReservationId`,
            authenticate,
            this.setMealReservationStateToSellerRejected
        );
        this.router.put(
            `${this.path}/setBuyerConfirmed/:mealReservationId`,
            authenticate,
            this.setMealReservationStateToBuyerConfirmed
        );
        this.router.put(
            `${this.path}/setSellerRejected/:mealReservationId`,
            authenticate,
            this.setMealReservationStateToBuyerRejected
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {mealOfferId} = req.body;
            const newMealReservation = await this.MealReservationService.create(mealOfferId, req.user);
            res.status(201).send({data: newMealReservation});
        } catch (error: any) {
            next(error);
        }
    }

    private getMealReservation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealReservationId = req.params.mealReservationId;
            const mealReservation = await this.MealReservationService.getMealReservation(mealReservationId, req.user);
            res.status(200).send({data: mealReservation});
        } catch (error: any) {
            next(error);
        }
    }

    private setMealReservationStateToSellerAccepted = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealReservationId = req.params.mealReservationId;
            const mealReservation = await this.MealReservationService.setMealReservationStateToSellerAccepted(mealReservationId, req.user);
            res.status(200).send({data: mealReservation});
        } catch (error: any) {
            next(error);
        }
    }

    private setMealReservationStateToSellerRejected = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealReservationId = req.params.mealReservationId;
            const mealReservation = await this.MealReservationService.setMealReservationStateToSellerRejected(mealReservationId, req.user);
            res.status(200).send({data: mealReservation});
        } catch (error: any) {
            next(error);
        }
    }

    private setMealReservationStateToBuyerConfirmed = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealReservationId = req.params.mealReservationId;
            const mealReservation = await this.MealReservationService.setMealReservationStateToBuyerConfirmed(mealReservationId, req.user);
            res.status(200).send({data: mealReservation});
        } catch (error: any) {
            next(error);
        }
    }

    private setMealReservationStateToBuyerRejected = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const mealReservationId = req.params.mealReservationId;
            const mealReservation = await this.MealReservationService.setMealReservationStateToBuyerRejected(mealReservationId, req.user);
            res.status(200).send({data: mealReservation});
        } catch (error: any) {
            next(error);
        }
    }

}

export default MealReservationController;