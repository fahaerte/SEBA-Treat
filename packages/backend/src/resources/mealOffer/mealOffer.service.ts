import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";
import { Service } from "typedi";
import MealTransactionService from "../mealTransaction/mealTransaction.service";
import MealTransaction from "../mealTransaction/mealTransaction.interface";
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

  public async getMealOfferWithUser(
    mealOfferId: string,
    includeRating = false,
    preview = true,
    user?: UserDocument,
    compareAddress?: string
  ): Promise<MealOfferDocumentWithUser | Error> {
    const mealOfferDoc = await this.mealOffer.findByIdWithUser(mealOfferId);
    if (!mealOfferDoc) {
      Logger.error({
        functionName: "getMealOfferWithUser",
        message: `Could not find mealOffer ${mealOfferId}`,
      } as ILogMessage);
      throw new MealOfferNotFoundException(mealOfferId);
    }
    // if (!includeRating) mealOfferDoc.rating = undefined;
    if (compareAddress)
      mealOfferDoc.distance = await getDistanceBetweenAddressesInKm(
        getUserAddressString(mealOfferDoc.user.address!),
        compareAddress
      );

    if (preview && (!user || !user._id.equals(mealOfferDoc.user._id))) {
      return this.getMealOfferPreview(
        mealOfferDoc,
        user
      ) as MealOfferDocumentWithUser;
    }
    return mealOfferDoc;
  }

  public async getMealOffer(
    mealOfferId: string,
    includeRating = false,
    preview = true,
    user?: UserDocument
  ): Promise<MealOfferDocument | Error> {
    // const mealOfferDoc = await this.mealOffer.findById(mealOfferId).lean();
    const mealOfferDoc = await this.mealOffer.findById(mealOfferId);

    if (!mealOfferDoc) {
      Logger.error({
        functionName: "getMealOffer",
        message: `Could not find mealOffer ${mealOfferId}`,
      } as ILogMessage);
      throw new MealOfferNotFoundException(mealOfferId);
    }
    // if (!includeRating) mealOfferDoc.rating = undefined;
    if (preview && (!user || !user._id.equals(mealOfferDoc.user))) {
      return this.getMealOfferPreview(mealOfferDoc, user) as MealOfferDocument;
    }
    return mealOfferDoc;
  }

  private getMealOfferPreview(
    mealOfferDoc: MealOfferDocumentWithUser | MealOfferDocument,
    user?: UserDocument
  ): MealOfferDocumentWithUser | MealOfferDocument {
    if (user) {
      mealOfferDoc.reservations = mealOfferDoc.reservations.filter(
        (reservation) => user._id.equals(reservation.buyer)
      );
    } else {
      mealOfferDoc.reservations = [];
      mealOfferDoc.pickUpDetails = undefined;
    }
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
    const mealOfferDoc = (await this.getMealOfferWithUser(
      mealOfferId,
      false,
      false,
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
  ): Promise<MealOfferDocumentWithUser | Error> {
    const mealOfferDoc = (await this.getMealOfferWithUser(
      mealOfferId,
      false,
      false,
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
      reservations.push({
        buyer: user._id,
      } as MealReservationDocument);
      try {
        await mealOfferDoc.save();
        Logger.info({
          functionName: "createMealOfferReservation",
          message: `Created MealOffer Reservation`,
        } as ILogMessage);
        return this.getMealOfferPreview(
          mealOfferDoc,
          user
        ) as MealOfferDocumentWithUser;
      } catch (error: any) {
        Logger.error({
          functionName: "createMealOfferReservation",
          message: "Could not save mealOffer",
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
    mealOfferId: string,
    user: UserDocument,
    mealReservationId: string,
    newState: EMealReservationState
  ): Promise<void | Error> {
    if (newState === EMealReservationState.SELLER_ACCEPTED) {
      await this.updateMealOfferReservationToSellerAccepted(
        mealOfferId,
        user,
        mealReservationId
      );
    } else if (newState === EMealReservationState.SELLER_REJECTED) {
      await this.updateMealOfferReservationToSellerRejected(
        mealOfferId,
        user,
        mealReservationId
      );
    } else if (newState === EMealReservationState.BUYER_CONFIRMED) {
      await this.updateMealOfferReservationToBuyerConfirmed(
        mealOfferId,
        user,
        mealReservationId
      );
    } else if (newState === EMealReservationState.BUYER_REJECTED) {
      await this.updateMealOfferReservationToBuyerRejected(
        mealOfferId,
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

  private async updateMealOfferReservationToSellerAccepted(
    mealOfferId: string,
    seller: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForSeller(
        mealOfferId,
        mealReservationId,
        seller
      )) as [MealOfferDocument, MealReservationDocument];
    if (mealReservation.reservationState === EMealReservationState.PENDING) {
      mealReservation.reservationState = EMealReservationState.SELLER_ACCEPTED;
      try {
        await mealOfferDoc.save();
        Logger.info({
          functionName: "updateMealOfferReservationToSellerAccepted",
          message: `Updated reservation state for reservation ${mealReservationId}`,
          details: `Updated state from ${EMealReservationState.PENDING} to ${EMealReservationState.SELLER_ACCEPTED}`,
        } as ILogMessage);
      } catch (error: any) {
        Logger.error({
          functionName: "updateMealOfferReservationToSellerAccepted",
          message: `Could not save mealOffer with id ${mealOfferId}`,
          details: error.message,
        } as ILogMessage);
        throw new Error(`Could not save mealOffer with id ${mealOfferId}`);
      }
    } else {
      Logger.error({
        functionName: "updateMealOfferReservationToSellerAccepted",
        message: "Could not update mealReservationState",
        details: `State should be ${EMealReservationState.PENDING}`,
      } as ILogMessage);
      throw new InvalidMealReservationStateException(
        `State should be ${EMealReservationState.PENDING}`
      );
    }
  }

  private async updateMealOfferReservationToBuyerConfirmed(
    mealOfferId: string,
    buyer: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForBuyer(
        mealOfferId,
        mealReservationId,
        buyer
      )) as [MealOfferDocument, MealReservationDocument];
    if (
      mealReservation.reservationState === EMealReservationState.SELLER_ACCEPTED
    ) {
      const mealTransaction =
        (await this.mealTransactionService.createTransaction(
          mealOfferId as unknown as ObjectId,
          mealReservationId as unknown as ObjectId,
          mealReservation.buyer,
          mealOfferDoc.user,
          mealOfferDoc.price,
          mealOfferDoc.transactionFee
        )) as MealTransaction;

      await this.mealTransactionService.performTransaction(mealTransaction._id);
      mealOfferDoc.reservations.forEach((reservation) => {
        reservation.reservationState =
          mealReservation._id === reservation._id
            ? EMealReservationState.BUYER_CONFIRMED
            : EMealReservationState.SELLER_REJECTED;
      });
      try {
        await mealOfferDoc.save();
        Logger.info({
          functionName: "updateMealOfferReservationToBuyerConfirmed",
          message: `Updated reservation state for reservation ${mealReservationId}`,
          details: `Updated state from ${EMealReservationState.SELLER_ACCEPTED} to ${EMealReservationState.BUYER_CONFIRMED}`,
        } as ILogMessage);
      } catch (error: any) {
        Logger.error({
          functionName: "updateMealOfferReservationToBuyerConfirmed",
          message: `Could not save mealOffer with id ${mealOfferId}`,
          details: error.message,
        } as ILogMessage);
        throw new Error(`Could not save mealOffer with id ${mealOfferId}`);
      }
    } else {
      Logger.error({
        functionName: "updateMealOfferReservationToBuyerConfirmed",
        message: "Could not update mealReservationState",
        details: `State should be ${EMealReservationState.SELLER_ACCEPTED}`,
      } as ILogMessage);
      throw new InvalidMealReservationStateException(
        `State should be ${EMealReservationState.SELLER_ACCEPTED}`
      );
    }
  }

  private async updateMealOfferReservationToSellerRejected(
    mealOfferId: string,
    seller: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForSeller(
        mealOfferId,
        mealReservationId,
        seller
      )) as [MealOfferDocument, MealReservationDocument];
    if (
      mealReservation.reservationState === EMealReservationState.PENDING ||
      mealReservation.reservationState === EMealReservationState.SELLER_ACCEPTED
    ) {
      const oldState = mealReservation.reservationState;
      mealReservation.reservationState = EMealReservationState.SELLER_REJECTED;
      try {
        await mealOfferDoc.save();
        Logger.info({
          functionName: "updateMealOfferReservationToSellerRejected",
          message: `Updated reservation state for reservation ${mealReservationId}`,
          details: `Updated state from ${oldState} to ${EMealReservationState.SELLER_REJECTED}`,
        } as ILogMessage);
      } catch (error: any) {
        Logger.error({
          functionName: "updateMealOfferReservationToSellerRejected",
          message: `Could not save mealOffer with id ${mealOfferId}`,
          details: error.message,
        } as ILogMessage);
        throw new Error(`Could not save mealOffer with id ${mealOfferId}`);
      }
    } else {
      Logger.error({
        functionName: "updateMealOfferReservationToSellerRejected",
        message: "Could not update mealReservationState",
        details: `State should be ${EMealReservationState.PENDING} or ${EMealReservationState.SELLER_ACCEPTED}`,
      } as ILogMessage);
      throw new InvalidMealReservationStateException(
        `State should be ${EMealReservationState.PENDING} or ${EMealReservationState.SELLER_ACCEPTED}`
      );
    }
  }

  private async updateMealOfferReservationToBuyerRejected(
    mealOfferId: string,
    buyer: UserDocument,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForBuyer(
        mealOfferId,
        mealReservationId,
        buyer
      )) as [MealOfferDocument, MealReservationDocument];
    if (
      mealReservation.reservationState ===
        EMealReservationState.SELLER_ACCEPTED ||
      mealReservation.reservationState === EMealReservationState.PENDING
    ) {
      const oldState = mealReservation.reservationState;
      mealReservation.reservationState = EMealReservationState.BUYER_REJECTED;
      console.log(mealOfferDoc);
      try {
        await mealOfferDoc.save();
        Logger.info({
          functionName: "updateMealOfferReservationToBuyerRejected",
          message: `Updated reservation state for reservation ${mealReservationId}`,
          details: `Updated state from ${oldState} to ${EMealReservationState.SELLER_REJECTED}`,
        } as ILogMessage);
      } catch (error: any) {
        Logger.error({
          functionName: "updateMealOfferReservationToBuyerRejected",
          message: `Could not save mealOffer with id ${mealOfferId}`,
          details: error.message,
        } as ILogMessage);
        throw new Error(`Could not save mealOffer with id ${mealOfferId}`);
      }
    } else {
      Logger.error({
        functionName: "updateMealOfferReservationToBuyerRejected",
        message: "Could not update mealReservationState",
        details: `State should be ${EMealReservationState.PENDING} or ${EMealReservationState.SELLER_ACCEPTED}`,
      } as ILogMessage);
      throw new InvalidMealReservationStateException(
        `State should be ${EMealReservationState.PENDING} or ${EMealReservationState.SELLER_ACCEPTED}`
      );
    }
  }

  public async getMealOfferAndReservation(
    user: UserDocument,
    mealOfferId: string,
    mealReservationId: string
  ): Promise<[MealOfferDocument, MealReservationDocument] | Error> {
    const mealOfferDoc = (await this.getMealOffer(
      mealOfferId,
      true,
      true,
      user
    )) as MealOfferDocument;
    const mealReservation = mealOfferDoc.reservations.find(
      (reservation) => String(reservation._id) === mealReservationId
    ) as MealReservationDocument;
    if (mealReservation === undefined) {
      Logger.error({
        functionName: "getMealOfferAndReservation",
        message: `Could not find mealReservation ${mealReservationId}`,
        details: `For user ${user._id}`,
      } as ILogMessage);
      throw new MealReservationNotFoundException(
        mealOfferId,
        user._id as string
      );
    }
    return [mealOfferDoc, mealReservation];
  }

  private async getMealOfferAndReservationForSeller(
    mealOfferId: string,
    mealReservationId: string,
    seller: UserDocument
  ): Promise<[MealOfferDocument, MealReservationDocument] | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        seller,
        mealOfferId,
        mealReservationId
      )) as [MealOfferDocument, MealReservationDocument];
    if (seller._id.equals(mealOfferDoc.user)) {
      return [mealOfferDoc, mealReservation];
    }
    throw new Error("User is not seller of offer");
  }

  private async getMealOfferAndReservationForBuyer(
    mealOfferId: string,
    mealReservationId: string,
    buyer: UserDocument
  ): Promise<[MealOfferDocument, MealReservationDocument] | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        buyer,
        mealOfferId,
        mealReservationId
      )) as [MealOfferDocument, MealReservationDocument];
    if (buyer._id.equals(mealReservation.buyer)) {
      return [mealOfferDoc, mealReservation];
    }
    throw new Error("User is not buyer of offer");
  }

  public async getMealOffers(user: UserDocument): Promise<MealOfferDocument[]> {
    return await this.mealOffer.find({ user: user._id }).exec();
  }
}

export default MealOfferService;
