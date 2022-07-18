import Controller from "../../utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import validate from "../mealOffer/mealOffer.validation";
import authenticate from "../../middleware/authenticated.middleware";
import { Service } from "typedi";
import MealOfferService from "./mealOffer.service";
import MealReservationStateEnum from "../mealReservation/mealReservationState.enum";
import { EMealCategory } from "@treat/lib-common/lib/enums/EMealCategory";
import { EMealAllergen } from "@treat/lib-common/lib/enums/EMealAllergen";
import ValidatePart from "../../utils/validation";
import validationMiddleware from "../../middleware/validation.middleware";
import { MealOfferDocument } from "./mealOffer.interface";

@Service()
class MealOfferController implements Controller {
  public path = "/mealOffers";
  public router = Router();

  constructor(private readonly mealOfferService: MealOfferService) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      authenticate,
      validationMiddleware(validate.createBody),
      this.create
    );
    this.router.get(
      `${this.path}/previews`,
      authenticate,
      validationMiddleware(
        validate.getMealOfferPreviewsQuery,
        ValidatePart.QUERY
      ),
      this.getMealOfferPreviews
    );
    this.router.get(
      `${this.path}/:mealOfferId`,
      authenticate,
      validationMiddleware(validate.getMealOfferParams, ValidatePart.PARAMS),
      this.getMealOffer
    );
    this.router.get(
      `${this.path}/:mealOfferId/details`,
      // authenticate,
      // validationMiddleware(validate.getMealOfferParams, ValidatePart.PARAMS),
      this.getMealOfferDetails
    );
    this.router.get(
      `${this.path}/reservations/sent`,
      authenticate,
      this.getSentMealOfferRequests
    );
    this.router.get(
      `${this.path}/reservations/received`,
      authenticate,
      this.getReceivedMealOfferRequests
    );
    this.router.patch(
      `${this.path}/:mealOfferId/reservations/:mealReservationId`,
      authenticate,
      validationMiddleware(validate.updateReservationStateBody),
      validationMiddleware(
        validate.updateReservationStateParams,
        ValidatePart.PARAMS
      ),
      this.updateMealOfferReservation
    );
    this.router.post(
      `${this.path}/:mealOfferId/reservations`,
      authenticate,
      validationMiddleware(
        validate.createMealOfferReservationParams,
        ValidatePart.PARAMS
      ),
      this.createMealOfferReservation
    );
    this.router.delete(
      `${this.path}/:mealOfferId`,
      authenticate,
      this.deleteMealOffer
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const mealOfferRequest = req.body as MealOfferDocument;
      console.log(mealOfferRequest);
      const newMealOffer = await this.mealOfferService.create(
        mealOfferRequest
        //   ,
        // req.user
      );
      res.status(201).send({ data: newMealOffer });
    } catch (error: any) {
      next(error);
    }
  };

  private getMealOfferPreviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const mealOfferPreviews =
        await this.mealOfferService.getMealOfferPreviews(
          req.user,
          req.query.category as EMealCategory[],
          req.query.allergen as EMealAllergen[],
          req.query.portions as string,
          req.query.sellerRating as string,
          req.query.startDate as string,
          req.query.endDate as string,
          req.query.price as string,
          req.query.search as string,
          req.query.distance as string
        );
      res.status(200).send({ data: mealOfferPreviews });
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
      const mealOffer = await this.mealOfferService.getMealOffer(
        req.user,
        req.params.mealOfferId
      );
      res.status(200).send({ data: mealOffer });
    } catch (error: any) {
      next(error);
    }
  };

  private getMealOfferDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    console.log("getMealOfferDetails - controller");
    try {
      const mealOffer = await this.mealOfferService.getMealOfferDetails(
        req.params.mealOfferId
      );
      res.status(200).send({ data: mealOffer });
    } catch (error: any) {
      next(error);
    }
  };

  private getSentMealOfferRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const mealOffers = await this.mealOfferService.getSentMealOfferRequests(
        req.user
      );
      res.status(200).send({ data: mealOffers });
    } catch (error: any) {
      next(error);
    }
  };

  private getReceivedMealOfferRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const mealOffers =
        await this.mealOfferService.getReceivedMealOfferRequests(req.user);
      res.status(200).send({ data: mealOffers });
    } catch (error: any) {
      next(error);
    }
  };

  private deleteMealOffer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await this.mealOfferService.deleteMealOffer(
        req.params.mealOfferId,
        req.user
      );
      res.send(200).send();
    } catch (error: any) {
      next(error);
    }
  };

  private createMealOfferReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const mealOffer = await this.mealOfferService.createMealOfferReservation(
        req.params.mealOfferId,
        req.user
      );
      res.status(201).send({ data: mealOffer });
    } catch (error: any) {
      next(error);
    }
  };

  private updateMealOfferReservation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { reservationState } = req.body;
      await this.mealOfferService.updateMealOfferReservationState(
        req.params.mealOfferId,
        req.user,
        req.params.mealReservationId,
        reservationState as MealReservationStateEnum
      );
      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };
}

export default MealOfferController;
