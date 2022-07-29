import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";
import { Service } from "typedi";
import MealTransactionService from "../mealTransaction/mealTransaction.service";
import {
  MealOfferDocument,
  MealOfferDocumentWithUser,
} from "./mealOffer.interface";
import InvalidMealReservationStateException from "../../utils/exceptions/invalidMealReservationState.exception";
import InvalidMealReservationException from "../../utils/exceptions/invalidMealReservation.exception";
import MealReservationNotFoundException from "../../utils/exceptions/mealReservationNotFound.exception";
import { MealReservationDocument } from "../mealReservation/mealReservation.interface";
import { EMealReservationState, ESortingRules } from "@treat/lib-common";
import { MealOfferQuery } from "./mealOfferQuery.interface";
import {
  getDistanceBetweenAddressesInKm,
  getDistancesBetweenAddressesInKm,
  getUserAddressString,
} from "../../utils/address";
import Logger, { ILogMessage } from "../../utils/logger";
import UserDocument from "../user/user.interface";
import { TRANSACTION_FEE } from "@treat/lib-common/lib/constants";
import { ObjectId } from "mongoose";
import { MealTransactionDocument } from "../mealTransaction/mealTransaction.interface";
import HttpException from "../../utils/exceptions/http.exception";
import InvalidMealOfferUpdateException from "../../utils/exceptions/invalidMealOfferUpdate.exception";
import { deleteImage } from "../../utils/imageUpload";
import MailService from "../../utils/EmailService";
import UserService from "../user/user.service";

@Service()
class MealOfferService {
  private mealOffer = MealOfferSchema;

  constructor(
    private readonly mealTransactionService: MealTransactionService,
    private readonly mailService: MailService,
    private readonly userService: UserService
  ) {}

  public async create(
    newMealOffer: MealOfferDocument,
    user: UserDocument
  ): Promise<MealOfferDocument | Error> {
    newMealOffer.user = user._id;
    newMealOffer.transactionFee = Math.round(
      TRANSACTION_FEE * newMealOffer.price
    );
    try {
      const newMealOfferDoc = await this.mealOffer.create(newMealOffer);
      Logger.info({
        functionName: "create",
        message: "Created mealOffer",
        details: `MealOfferId: ${newMealOfferDoc._id} User: ${user._id}`,
      } as ILogMessage);
      return newMealOfferDoc;
    } catch (error: any) {
      Logger.error({
        functionName: "create",
        message: "Could not create mealOffer",
        details: error.message,
      } as ILogMessage);
      throw new Error("Could not create mealOffer");
    }
  }

  public async update(
    mealOfferId: string,
    updatedMealOffer: MealOfferDocument,
    user: UserDocument
  ): Promise<void | MealOfferDocument | Error> {
    const mealOffer = (await this.mealOffer.findById(
      mealOfferId
    )) as MealOfferDocument;
    if (!mealOffer) {
      return await this.create(updatedMealOffer, user);
    }
    if (!user._id.equals(mealOffer.user)) {
      Logger.error({
        functionName: "update",
        message: "Could not update mealOffer",
        details: `User ${user._id} is not owner of mealOffer ${mealOfferId}`,
      } as ILogMessage);
      throw new HttpException(403, "A user can only change own meal offers");
    }
    if (mealOffer.reservations.length) {
      Logger.error({
        functionName: "update",
        message: "Could not update mealOffer",
        details: `MealOffer ${mealOfferId} has already reservations.`,
      });
      throw new InvalidMealOfferUpdateException(
        "MealOffer already has reservations and can not be updated"
      );
    }
    if (updatedMealOffer.image && mealOffer.image != updatedMealOffer.image) {
      deleteImage("meal-images", mealOffer.image);
      mealOffer.image = updatedMealOffer.image;
    }
    mealOffer.title = updatedMealOffer.title;
    mealOffer.pickUpDetails = updatedMealOffer.pickUpDetails;
    mealOffer.categories = updatedMealOffer.categories;
    mealOffer.allergens = updatedMealOffer.allergens;
    mealOffer.startDate = updatedMealOffer.startDate;
    mealOffer.endDate = updatedMealOffer.endDate;
    mealOffer.portions = updatedMealOffer.portions;
    mealOffer.price = updatedMealOffer.price;
    mealOffer.allergensVerified = updatedMealOffer.allergensVerified;
    mealOffer.transactionFee = Math.round(
      TRANSACTION_FEE * updatedMealOffer.price
    );
    try {
      await mealOffer.save();
      Logger.info({
        functionName: "update",
        message: "Updated mealOffer",
        details: `Updated mealOffer ${mealOfferId}`,
      } as ILogMessage);
    } catch (error: any) {
      Logger.error({
        functionName: "update",
        message: "Could not save mealOffer",
        details: error.message,
      } as ILogMessage);
      throw new Error("Could not update mealOffer");
    }
  }

  public async addDistanceToMealOffer(
    mealOffer: MealOfferDocumentWithUser,
    compareAddress: string
  ): Promise<MealOfferDocumentWithUser> {
    mealOffer = mealOffer.toObject();
    mealOffer.distance = await getDistanceBetweenAddressesInKm(
      getUserAddressString(mealOffer.user.address!),
      compareAddress
    );
    mealOffer.user.address = undefined;
    return mealOffer;
  }

  public async getMealOffer(
    mealOfferId: string,
    user?: UserDocument,
    compareAddress?: string
  ): Promise<MealOfferDocumentWithUser | Error> {
    const mealOfferDoc = (await this.mealOffer.findBy(
      mealOfferId,
      true,
      user
    )) as MealOfferDocumentWithUser;
    if (!mealOfferDoc) {
      Logger.error({
        functionName: "getMealOfferWithUser",
        message: `Could not find mealOffer ${mealOfferId}`,
      } as ILogMessage);
      throw new MealOfferNotFoundException(mealOfferId);
    }
    if (compareAddress) {
      return await this.addDistanceToMealOffer(mealOfferDoc, compareAddress);
    }
    return mealOfferDoc;
  }

  public async getMealOfferPreviews(
    mealOfferQuery: MealOfferQuery,
    user?: UserDocument
  ): Promise<MealOfferPreviewReturnObject> {
    if (typeof mealOfferQuery.excludedAllergens === "string")
      mealOfferQuery.excludedAllergens = [mealOfferQuery.excludedAllergens];
    let mealOfferPreviews = await this.mealOffer.aggregateMealOfferPreviews(
      mealOfferQuery,
      user
    );
    if (mealOfferPreviews.length) {
      mealOfferPreviews = await this.filterMealOfferPreviewsForDistance(
        mealOfferPreviews,
        mealOfferQuery.address,
        mealOfferQuery.distance
      );
    }
    mealOfferPreviews.forEach((preview) => {
      preview.user.address = undefined;
      preview.rating = undefined;
    });
    mealOfferPreviews.sort((meal1, meal2) =>
      this.getSortingRule(meal1, meal2, mealOfferQuery.sortingRule)
    );

    const filteredPreviewsSliced = mealOfferPreviews.slice(
      (mealOfferQuery.page - 1) * mealOfferQuery.pageLimit,
      mealOfferQuery.page * mealOfferQuery.pageLimit
    );

    return {
      total_count: mealOfferPreviews.length,
      data: filteredPreviewsSliced,
    };
  }

  private getSortingRule(
    meal1: MealOfferDocumentWithUser,
    meal2: MealOfferDocumentWithUser,
    sortingRule: string | undefined
  ) {
    switch (sortingRule) {
      case ESortingRules.RATING_DESC.valueOf():
        return (
          (meal2.user.meanRating ? meal2.user.meanRating : 0) -
          (meal1.user.meanRating ? meal1.user.meanRating : 0)
        );
      case ESortingRules.PRICE_ASC.valueOf():
        return (
          (meal1.price ? meal1.price : 1000) -
          (meal2.price ? meal2.price : 1000)
        );
      default:
        return (
          (meal1.distance ? meal1.distance : 100) -
          (meal2.distance ? meal2.distance : 100)
        );
    }
  }

  private async filterMealOfferPreviewsForDistance(
    mealOfferPreviews: MealOfferDocumentWithUser[],
    compareAddress: string,
    compareDistance: number
  ): Promise<MealOfferDocumentWithUser[]> {
    const filteredMealOffers = [] as MealOfferDocumentWithUser[];
    const addresses = Array.from(mealOfferPreviews, (preview) =>
      getUserAddressString(preview.user.address!)
    );

    const distances = await getDistancesBetweenAddressesInKm(
      compareAddress,
      addresses
    );
    mealOfferPreviews.forEach((preview, index) => {
      if (distances[index] <= compareDistance) {
        preview.distance = distances[index];
        filteredMealOffers.push(preview);
      }
    });

    return filteredMealOffers;
  }

  public async getSentMealOfferRequests(
    user: UserDocument
  ): Promise<MealOfferDocument[] | Error> {
    return await this.mealOffer.findSentMealOfferRequests(user._id as string);
  }

  public async getReceivedMealOfferRequests(
    user: UserDocument
  ): Promise<MealOfferDocument[] | Error> {
    return await this.mealOffer.findReceivedMealOfferRequests(
      user._id as string
    );
  }

  public async deleteMealOffer(
    mealOfferId: string,
    user: UserDocument
  ): Promise<void | Error> {
    const mealOfferDoc = (await this.getMealOffer(
      mealOfferId,
      user
    )) as MealOfferDocumentWithUser;
    if (user._id.equals(mealOfferDoc.user)) {
      if (mealOfferDoc.reservations.length) {
        Logger.error({
          functionName: "deleteMealOffer",
          message: "Can not delete mealOffer",
          details: `MealOffer ${mealOfferId} can not be deleted, because it already has reservations`,
        } as ILogMessage);
        throw new HttpException(
          403,
          "MealOffer can not be deleted due to open reservations"
        );
      }
      await this.mealOffer.findByIdAndDelete(mealOfferId);
    }
    Logger.error({
      functionName: "deleteMealOffer",
      message: "Can not delete mealOffer",
      details: `MealOffer ${mealOfferId} can only be deleted from its owner`,
    } as ILogMessage);
    throw new HttpException(
      403,
      "You are not allowed to delete that mealOffer"
    );
  }

  public async createMealOfferReservation(
    mealOfferId: string,
    user: UserDocument
  ): Promise<MealReservationDocument | Error> {
    const mealOfferDoc = (await this.getMealOffer(
      mealOfferId,
      user
    )) as MealOfferDocumentWithUser;
    if (new Date() > mealOfferDoc.endDate) {
      Logger.error({
        functionName: "createMealOfferReservation",
        message: "Could not create mealOffer reservation",
        details: `The mealOffer ${mealOfferId} endDate expired`,
      } as ILogMessage);
      throw new InvalidMealReservationException("The mealOffer dates expired");
    }
    if (!user._id.equals(mealOfferDoc.user._id)) {
      const reservations = mealOfferDoc.reservations;
      reservations.forEach((reservation) => {
        if (
          reservation.reservationState === EMealReservationState.BUYER_CONFIRMED
        ) {
          Logger.error({
            functionName: "createMealOfferReservation",
            message: "Could not create mealOffer reservation",
            details: `The mealOffer with the id ${mealOfferId} is not available for reservations anymore`,
          } as ILogMessage);
          throw new InvalidMealReservationException(
            "The mealOffer is not available for reservations anymore"
          );
        } else if (user._id.equals(reservation.buyer)) {
          Logger.error({
            functionName: "createMealOfferReservation",
            message: "Could not create mealOffer reservation",
            details: "A user can only make one reservation per mealOffer",
          } as ILogMessage);
          throw new InvalidMealReservationException(
            "A user can only make one reservation per mealOffer"
          );
        }
      });
      const newReservation = { buyer: user._id } as MealReservationDocument;
      try {
        await this.mealOffer.updateOne(
          { _id: mealOfferId },
          { $push: { reservations: newReservation } }
        );
        Logger.info({
          functionName: "createMealOfferReservation",
          message: `Created MealOffer Reservation`,
        } as ILogMessage);
        const seller = (await this.userService.getUser(
          mealOfferDoc.user._id.toString()
        )) as UserDocument;
        this.mailService.sendCreateReservationMails(mealOfferDoc, user, seller);
        return newReservation;
      } catch (error: any) {
        Logger.error({
          functionName: "createMealOfferReservation",
          message: "Could not create MealReservation",
          details: error.message,
        } as ILogMessage);
        throw new Error(`Could not save mealOffer with id ${mealOfferId}`);
      }
    }
    Logger.error({
      functionName: "createMealOfferReservation",
      message: "Could not create mealOffer reservation",
      details: "A user can not reserve own mealOffer",
    } as ILogMessage);
    throw new InvalidMealReservationException(
      "A user can not reserve own mealOffer"
    );
  }

  public async updateMealOfferReservationState(
    user: UserDocument,
    mealReservationId: string,
    newState: EMealReservationState
  ): Promise<void | Error> {
    if (newState === EMealReservationState.SELLER_ACCEPTED) {
      await this.updateMealOfferReservationToSellerAccepted(
        user,
        mealReservationId
      );
    } else if (newState === EMealReservationState.SELLER_REJECTED) {
      await this.updateMealOfferReservationToSellerRejected(
        user,
        mealReservationId
      );
    } else if (newState === EMealReservationState.BUYER_CONFIRMED) {
      await this.updateMealOfferReservationToBuyerConfirmed(
        user,
        mealReservationId
      );
    } else if (newState === EMealReservationState.BUYER_REJECTED) {
      await this.updateMealOfferReservationToBuyerRejected(
        user,
        mealReservationId
      );
    } else if (newState === EMealReservationState.PENDING) {
      Logger.error({
        functionName: "updateMealOfferReservationState",
        message: "Could not update mealReservationState",
        details: `State can not be set to ${EMealReservationState.PENDING}`,
      } as ILogMessage);
      throw new InvalidMealReservationStateException(
        `State can not be set to ${EMealReservationState.PENDING}`
      );
    } else {
      Logger.error({
        functionName: "updateMealOfferReservationState",
        message: "Could not update mealReservationState",
        details: "Unknown state",
      } as ILogMessage);
      throw new InvalidMealReservationStateException("Unknown state");
    }
  }

  private checkMealReservationState(
    mealReservation: MealReservationDocument,
    acceptedStates: EMealReservationState[]
  ): void {
    if (!acceptedStates.includes(mealReservation.reservationState)) {
      Logger.error({
        functionName: "checkMealOfferState",
        message: "Could not update mealReservationState",
        details: `State should be in ${acceptedStates}`,
      } as ILogMessage);
      throw new InvalidMealReservationStateException(
        `State should be in ${acceptedStates}`
      );
    }
  }

  private async updateAndSaveMealReservationState(
    mealOffer: MealOfferDocument,
    mealReservation: MealReservationDocument,
    newState: EMealReservationState
  ): Promise<void> {
    const oldState = mealReservation.reservationState;
    mealReservation.reservationState = newState;
    try {
      await mealOffer.save();
      Logger.info({
        functionName: "updateMealReservationState",
        message: `Updated reservation state for reservation ${mealOffer._id}`,
        details: `Updated state from ${oldState} to ${newState}`,
      } as ILogMessage);
    } catch (error: any) {
      Logger.error({
        functionName: "updateMealReservationState",
        message: `Could not save mealOffer with id ${mealOffer._id}`,
        details: error.message,
      } as ILogMessage);
      throw new Error(`Could not save mealOffer with id ${mealOffer._id}`);
    }
  }

  private async updateMealOfferReservationToSellerAccepted(
    seller: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        mealReservationId,
        String(seller._id)
      )) as [MealOfferDocument, MealReservationDocument];
    this.checkMealReservationState(mealReservation, [
      EMealReservationState.PENDING,
    ]);
    await this.updateAndSaveMealReservationState(
      mealOfferDoc,
      mealReservation,
      EMealReservationState.SELLER_ACCEPTED
    );
    const buyer = (await this.userService.getUser(
      mealReservation.buyer.toString()
    )) as UserDocument;
    this.mailService.sendUpdateReservationToSellerAcceptedMail(
      mealOfferDoc,
      buyer,
      seller
    );
  }

  private async updateMealOfferReservationToBuyerConfirmed(
    buyer: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    // eslint-disable-next-line prefer-const
    let [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        mealReservationId,
        undefined,
        String(buyer._id)
      )) as [MealOfferDocument, MealReservationDocument];
    this.checkMealReservationState(mealReservation, [
      EMealReservationState.SELLER_ACCEPTED,
    ]);
    const mealTransaction =
      (await this.mealTransactionService.createTransaction(
        mealOfferDoc._id as unknown as ObjectId,
        mealReservationId as unknown as ObjectId,
        mealReservation.buyer,
        mealOfferDoc.user,
        mealOfferDoc.price,
        mealOfferDoc.transactionFee
      )) as MealTransactionDocument;
    await this.mealTransactionService.performTransaction(mealTransaction._id);
    mealOfferDoc = (await this.mealOffer.findById(
      mealOfferDoc._id
    )) as MealOfferDocument;
    const seller = (await this.userService.getUser(
      mealOfferDoc.user.toString()
    )) as UserDocument;
    for (const reservation of mealOfferDoc.reservations) {
      if (reservation._id.toString() === mealReservation._id.toString()) {
        this.mailService.sendUpdateReservationToBuyerConfirmedMails(
          mealOfferDoc,
          buyer,
          seller
        );
        reservation.reservationState = EMealReservationState.BUYER_CONFIRMED;
      } else {
        this.mailService.sendUpdateReservationToSellerRejectedMail(
          mealOfferDoc,
          buyer
        );
        reservation.reservationState = EMealReservationState.SELLER_REJECTED;
      }
    }
    await this.updateAndSaveMealReservationState(
      mealOfferDoc,
      mealReservation,
      EMealReservationState.BUYER_CONFIRMED
    );
  }

  private async updateMealOfferReservationToSellerRejected(
    seller: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        mealReservationId,
        String(seller._id)
      )) as [MealOfferDocument, MealReservationDocument];
    this.checkMealReservationState(mealReservation, [
      EMealReservationState.PENDING,
      EMealReservationState.SELLER_ACCEPTED,
    ]);
    await this.updateAndSaveMealReservationState(
      mealOfferDoc,
      mealReservation,
      EMealReservationState.SELLER_REJECTED
    );
    const buyer = (await this.userService.getUser(
      mealReservation.buyer.toString()
    )) as UserDocument;
    this.mailService.sendUpdateReservationToSellerRejectedMail(
      mealOfferDoc,
      buyer
    );
  }

  private async updateMealOfferReservationToBuyerRejected(
    buyer: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        mealReservationId,
        undefined,
        String(buyer._id)
      )) as [MealOfferDocument, MealReservationDocument];
    this.checkMealReservationState(mealReservation, [
      EMealReservationState.SELLER_ACCEPTED,
      EMealReservationState.PENDING,
    ]);
    await this.updateAndSaveMealReservationState(
      mealOfferDoc,
      mealReservation,
      EMealReservationState.BUYER_REJECTED
    );
    const seller = (await this.userService.getUser(
      mealOfferDoc.user.toString()
    )) as UserDocument;
    this.mailService.sendUpdateReservationToBuyerRejectedMail(
      mealOfferDoc,
      buyer,
      seller
    );
  }

  public async getMealOfferAndReservation(
    mealReservationId: string,
    sellerId?: string | undefined,
    buyerId?: string | undefined
  ): Promise<[MealOfferDocument, MealReservationDocument] | Error> {
    const mealOfferDoc = await this.mealOffer.findByReservationId(
      mealReservationId,
      sellerId,
      buyerId
    );
    if (!mealOfferDoc) {
      Logger.error({
        functionName: "getMealOfferAndReservation",
        message: `Could not find mealReservation ${mealReservationId}`,
        details: `Seller input ${sellerId}, buyer input ${buyerId}`,
      } as ILogMessage);
      throw new MealReservationNotFoundException(mealReservationId);
    }
    const reservation = mealOfferDoc.reservations.find(
      (reservationItem) => String(reservationItem._id) === mealReservationId
    ) as MealReservationDocument;
    return [mealOfferDoc, reservation];
  }

  public async getMealOffers(user: UserDocument): Promise<MealOfferDocument[]> {
    return await this.mealOffer.find({ user: user._id }).exec();
  }
}

interface MealOfferPreviewReturnObject {
  total_count: number;
  data: MealOfferDocumentWithUser[];
}

export default MealOfferService;
