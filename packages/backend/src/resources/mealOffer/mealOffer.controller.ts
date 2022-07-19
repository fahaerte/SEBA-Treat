import Controller from "../../utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import validate from "../mealOffer/mealOffer.validation";
import {
  authenticatedMiddleware,
  optionalAuthenticatedMiddleware,
} from "../../middleware/authenticated.middleware";
import { Service } from "typedi";
import MealOfferService from "./mealOffer.service";
import ValidatePart from "../../utils/validation";
import validationMiddleware from "../../middleware/validation.middleware";
import { MealOfferDocument } from "./mealOffer.interface";
import { EMealReservationState } from "@treat/lib-common/lib/enums/EMealReservationState";
import { MealOfferQuery } from "./mealOfferQuery.interface";

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
      authenticatedMiddleware,
      validationMiddleware(validate.createBody),
      this.create
    );
    this.router.get(
      `${this.path}/previews`,
      validationMiddleware(
        validate.getMealOfferPreviewsQuery,
        ValidatePart.QUERY
      ),
      this.getMealOfferPreviews
    );
    this.router.get(
      `${this.path}/:mealOfferId`,
      optionalAuthenticatedMiddleware,
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
      authenticatedMiddleware,
      this.getSentMealOfferRequests
    );
    this.router.get(
      `${this.path}/reservations/received`,
      authenticatedMiddleware,
      this.getReceivedMealOfferRequests
    );
    this.router.patch(
      `${this.path}/:mealOfferId/reservations/:mealReservationId`,
      authenticatedMiddleware,
      validationMiddleware(validate.updateReservationStateBody),
      validationMiddleware(
        validate.updateReservationStateParams,
        ValidatePart.PARAMS
      ),
      this.updateMealOfferReservation
    );
    this.router.post(
      `${this.path}/:mealOfferId/reservations`,
      authenticatedMiddleware,
      validationMiddleware(
        validate.createMealOfferReservationParams,
        ValidatePart.PARAMS
      ),
      this.createMealOfferReservation
    );
    this.router.delete(
      `${this.path}/:mealOfferId`,
      authenticatedMiddleware,
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
        mealOfferRequest,
        req.user
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
      const mealOfferQuery = {
        distance: Number(req.query.distance),
        address: req.query.address,
        category: req.query.category,
        allergen: req.query.allergen,
        portions: req.query.portions ? Number(req.query.portions) : undefined,
        sellerRating: req.query.sellerRating
          ? Number(req.query.sellerRating)
          : undefined,
        startDate: req.query.startDate
          ? new Date(req.query.startDate as string)
          : undefined,
        endDate: req.query.endDate
          ? new Date(req.query.endDate as string)
          : undefined,
        price: req.query.price ? Number(req.query.price) : undefined,
        search: req.query.search as string,
      } as MealOfferQuery;
      const mealOfferPreviews =
        await this.mealOfferService.getMealOfferPreviews(mealOfferQuery);
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
      const mealOffer = await this.mealOfferService.getMealOfferWithUser(
        req.params.mealOfferId,
        false,
        true,
        req.user
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
        reservationState as EMealReservationState
      );
      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };
}

export default MealOfferController;
