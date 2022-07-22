import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";
import { Service } from "typedi";
import MealTransactionService from "../mealTransaction/mealTransaction.service";
import { MealTransactionDocument } from "../mealTransaction/mealTransaction.interface";
import { ObjectId } from "mongoose";
import {
  MealOfferDocument,
  MealOfferDocumentWithUser,
} from "./mealOffer.interface";
import InvalidMealReservationStateException from "../../utils/exceptions/invalidMealReservationState.exception";
import InvalidMealReservationException from "../../utils/exceptions/invalidMealReservation.exception";
import MealReservationNotFoundException from "../../utils/exceptions/mealReservationNotFound.exception";
import { MealReservationDocument } from "../mealReservation/mealReservation.interface";
import { EMealReservationState } from "@treat/lib-common";
import { MealOfferQuery } from "./mealOfferQuery.interface";
import {
  getDistanceBetweenAddressesInKm,
  getUserAddressString,
} from "../../utils/address";
import Logger, { ILogMessage } from "../../utils/logger";
import UserDocument from "../user/user.interface";
import { TRANSACTION_FEE } from "@treat/lib-common/lib/constants";

@Service()
class MealOfferService {
  private mealOffer = MealOfferSchema;

  constructor(
    private readonly mealTransactionService: MealTransactionService
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
    if (compareAddress)
      return await this.addDistanceToMealOffer(mealOfferDoc, compareAddress);
    return mealOfferDoc;
  }

  public async getMealOfferPreviews(
    mealOfferQuery: MealOfferQuery
  ): Promise<MealOfferDocumentWithUser[]> {
    const mealOfferPreviews = await this.mealOffer.aggregateMealOfferPreviews(
      mealOfferQuery
    );
    const filteredPreviews = await this.filterMealOfferPreviewsForDistance(
      mealOfferPreviews,
      mealOfferQuery.address,
      mealOfferQuery.distance
    );
    filteredPreviews.forEach((preview) => {
      preview.user.address = undefined;
      preview.rating = undefined;
    });
    return filteredPreviews;
  }

  private async filterMealOfferPreviewsForDistance(
    mealOfferPreviews: MealOfferDocumentWithUser[],
    compareAddress: string,
    compareDistance: number
  ): Promise<MealOfferDocumentWithUser[]> {
    const filteredMealOffers = [];
    for (const mealOfferPreview of mealOfferPreviews) {
      const addressString = getUserAddressString(
        mealOfferPreview.user.address!
      );
      const distance = await getDistanceBetweenAddressesInKm(
        addressString,
        compareAddress
      );
      if (distance <= compareDistance) {
        mealOfferPreview.distance = distance;
        filteredMealOffers.push(mealOfferPreview);
      }
    }
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
      await this.mealOffer.findByIdAndDelete(mealOfferId);
    } else {
      console.log();
    }
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
  }

  private async updateMealOfferReservationToBuyerConfirmed(
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
    mealOfferDoc.reservations.forEach((reservation) => {
      reservation.reservationState =
        mealReservation._id === reservation._id
          ? EMealReservationState.BUYER_CONFIRMED
          : EMealReservationState.SELLER_REJECTED;
    });
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

export default MealOfferService;
