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
import { EMealReservationState, TRANSACTION_FEE } from "@treat/lib-common";
import UserService from "../user/user.service";
import { MealOfferQuery } from "./mealOfferQuery.interface";
import {
  getDistanceBetweenAddressesInKm,
  getUserAddressString,
} from "../../utils/address";
import Logger, { ILogMessage } from "../../utils/logger";
import UserDocument from "../user/user.interface";

@Service()
class MealOfferService {
  private mealOffer = MealOfferSchema;

  constructor(
    private readonly mealTransactionService: MealTransactionService,
    private readonly userService: UserService
  ) {}

  public async create(
    newMealOffer: MealOfferDocument
    // user: UserDocument
  ): Promise<MealOfferDocument | Error> {
    // newMealOffer.user = user._id;
    newMealOffer.transactionFee = Math.round(
      TRANSACTION_FEE * newMealOffer.price
    );
    return (await this.mealOffer.create(newMealOffer)) as MealOfferDocument;
  }

  public async getMealOffer(
    user: UserDocument,
    mealOfferId: string,
    preview = true
  ): Promise<MealOfferDocument | Error> {
    console.log("getMealOffer - service");
    const mealOfferDoc = (await this.mealOffer.findById(
      mealOfferId
    )) as MealOfferDocument;
    if (!mealOfferDoc) {
      throw new MealOfferNotFoundException(mealOfferId as unknown as string);
    }
    if (!user._id.equals(mealOfferDoc.user) && preview) {
      return this.getMealOfferPreview(user, mealOfferDoc);
    }
    return mealOfferDoc;
  }

  public async getMealOfferDetails(
    mealOfferId: string
  ): Promise<MealOfferDocument | Error> {
    console.log("getMealOfferDetails - service");
    const mealOfferDoc = (await this.mealOffer.findById(
      mealOfferId
    )) as MealOfferDocument;
    if (!mealOfferDoc) {
      throw new MealOfferNotFoundException(mealOfferId as unknown as string);
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
    filteredPreviews.forEach((preview) => (preview.user.address = undefined));
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
        Logger.info({
          functionName: "filterMealOfferPreviewsForDistance",
          message: "Distance comparison",
          details: `calculated distance: ${distance} is smaller/equals than ${compareDistance} km`,
        } as ILogMessage);
        filteredMealOffers.push(mealOfferPreview);
      } else {
        Logger.info({
          functionName: "filterMealOfferPreviewsForDistance",
          message: "Distance comparison",
          details: `calculated distance: ${distance} is bigger than ${compareDistance} km`,
        } as ILogMessage);
      }
    }
    return filteredMealOffers;
  }

  private getMealOfferPreview(
    user: UserDocument,
    mealOfferDoc: MealOfferDocument
  ): MealOfferDocument {
    mealOfferDoc.reservations = mealOfferDoc.reservations.filter(
      (reservation) => user._id.equals(reservation.buyer)
    );
    return mealOfferDoc;
  }

  public async getSentMealOfferRequests(
    user: UserDocument
  ): Promise<MealOfferDocument[] | Error> {
    return await this.mealOffer.findSentMealOfferRequests(user._id as string);
  }

  public async getReceivedMealOfferRequests(
    user: UserDocument
  ): Promise<MealOfferDocument[] | Error> {
    return (await this.mealOffer
      .find({ user: user._id })
      .populate("reservations.buyer", "firstName lastName meanRating")
      .exec()) as MealOfferDocument[];
  }

  public async deleteMealOffer(
    mealOfferId: string,
    user: UserDocument
  ): Promise<void | Error> {
    const mealOfferDoc = (await this.getMealOffer(
      user,
      mealOfferId
    )) as MealOfferDocument;
    if (user._id.equals(mealOfferDoc.user)) {
      await this.mealOffer.findByIdAndDelete(mealOfferId);
    } else {
      console.log();
    }
  }

  public async createMealOfferReservation(
    mealOfferId: string,
    user: UserDocument
  ): Promise<MealOfferDocument | Error> {
    const mealOfferDoc = (await this.getMealOffer(
      user,
      mealOfferId,
      false
    )) as MealOfferDocument;
    if (!user._id.equals(mealOfferDoc.user)) {
      const reservations = mealOfferDoc.reservations;
      console.log(reservations);
      reservations.forEach((reservation) => {
        if (
          reservation.reservationState === EMealReservationState.BUYER_CONFIRMED
        ) {
          throw new InvalidMealReservationException(
            "This mealOffer is not available for reservations anymore"
          );
        } else if (user._id.equals(reservation.buyer)) {
          throw new InvalidMealReservationException(
            "You can only make one reservation per meal offer"
          );
        }
      });
      reservations.push({
        buyer: user._id,
      } as MealReservationDocument);
      await mealOfferDoc.save();
      return this.getMealOfferPreview(user, mealOfferDoc);
    }
    throw new InvalidMealReservationException(
      "You can not make a reservation for your own meal offer"
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
      throw new InvalidMealReservationStateException(
        `State can not be set to ${EMealReservationState.PENDING}`
      );
    } else {
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
      await mealOfferDoc.save();
    } else {
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

      await this.mealTransactionService.performTransaction(
        mealTransaction._id as ObjectId
      );
      mealOfferDoc.reservations.forEach((reservation) => {
        reservation.reservationState =
          mealReservation._id === reservation._id
            ? EMealReservationState.BUYER_CONFIRMED
            : EMealReservationState.SELLER_REJECTED;
      });
      await mealOfferDoc.save();
    } else {
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
      mealReservation.reservationState = EMealReservationState.SELLER_REJECTED;
      await mealOfferDoc.save();
    } else {
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
      mealReservation.reservationState = EMealReservationState.BUYER_REJECTED;
      console.log(mealOfferDoc);
      try {
        await mealOfferDoc.save();
      } catch (e: any) {
        console.log(e);
      }
    } else {
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
      user,
      mealOfferId
    )) as MealOfferDocument;
    const mealReservation = mealOfferDoc.reservations.find(
      (reservation) => String(reservation._id) === mealReservationId
    ) as MealReservationDocument;
    if (mealReservation === undefined) {
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
}

export default MealOfferService;
