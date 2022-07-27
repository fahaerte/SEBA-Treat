import Controller from "../../utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import validate from "../mealOffer/mealOffer.validation";
import { authenticatedMiddleware } from "../../middleware/authenticated.middleware";
import { Service } from "typedi";
import MealOfferService from "./mealOffer.service";
import ValidatePart from "../../utils/validation";
import validationMiddleware from "../../middleware/validation.middleware";
import { MealOfferDocument } from "./mealOffer.interface";
import { EMealReservationState } from "@treat/lib-common/lib/enums/EMealReservationState";
import { MealOfferQuery } from "./mealOfferQuery.interface";
import { mealOfferFileUpload } from "../../middleware/upload.middleware";

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
      mealOfferFileUpload.single("image"),
      validationMiddleware(validate.createBody),
      this.create
    );
    this.router.put(
      `${this.path}/:mealOfferId`,
      authenticatedMiddleware,
      mealOfferFileUpload.single("image"),
      validationMiddleware(validate.updateMealOfferParams, ValidatePart.PARAMS),
      validationMiddleware(validate.updateMealOfferBody, ValidatePart.BODY),
      this.update
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
      `${this.path}`,
      authenticatedMiddleware,
      this.getMealOffers
    );
    this.router.get(
      `${this.path}/:mealOfferId`,
      validationMiddleware(validate.getMealOfferParams, ValidatePart.PARAMS),
      validationMiddleware(validate.getMealOfferQuery, ValidatePart.QUERY),
      this.getMealOffer
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
      `${this.path}/reservations/:mealReservationId`,
      authenticatedMiddleware,
      validationMiddleware(validate.updateReservationStateBody),
      validationMiddleware(
        validate.updateReservationStateParams,
        ValidatePart.PARAMS
      ),
      this.updateMealOfferReservation
    );
    this.router.get(
      `${this.path}/:mealOfferId/reservations`,
      authenticatedMiddleware,
      validationMiddleware(validate.getMealOfferParams, ValidatePart.PARAMS),
      this.alreadyReserved
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
      const mealOffer = req.body as MealOfferDocument;
      const newMealOffer = await this.mealOfferService.create(
        mealOffer,
        req.user
      );
      res.status(201).send({ data: newMealOffer });
    } catch (error: any) {
      next(error);
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const mealOfferId = req.params.mealOfferId;
      const mealOffer = req.body as MealOfferDocument;
      const user = req.user;
      const updatedMealOffer = await this.mealOfferService.update(
        mealOfferId,
        mealOffer,
        user
      );
      if (updatedMealOffer) res.status(201).send({ data: updatedMealOffer });
      res.sendStatus(204);
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
      console.log("Schafft es hier rein");
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
        page: Number(req.query.page),
        pageLimit: Number(req.query.pageLimit),
        sortingRule: req.query.sortingRule ? req.query.sortingRule : undefined,
      } as MealOfferQuery;
      const data = await this.mealOfferService.getMealOfferPreviews(
        mealOfferQuery
      );
      res.status(200).send(data);
    } catch (error: any) {
      next(error);
    }
  };

  private getMealOffers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = req.user;
      const mealOffers = await this.mealOfferService.getMealOffers(user);
      res.status(200).send({ data: mealOffers });
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
        req.params.mealOfferId,
        req.user,
        req.query.compareAddress as string
      );
      res.status(200).send({ data: mealOffer });
    } catch (error: any) {
      next(error);
    }
  };

  private alreadyReserved = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const alreadyReserved = await this.mealOfferService.alreadyReserved(
        req.params.mealOfferId,
        req.user
      );
      res.status(200).send(alreadyReserved);
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
