import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";
import UserDocument from "../user/user.interface";
import { Service } from "typedi";
import MealTransactionService from "../mealTransaction/mealTransaction.service";
import MealTransaction from "../mealTransaction/mealTransaction.interface";
import { ObjectId } from "mongoose";
import { MealOfferDocument } from "./mealOffer.interface";
import MealReservationState from "../mealReservation/mealReservationState.enum";
import InvalidMealReservationStateException from "../../utils/exceptions/invalidMealReservationState.exception";
import InvalidMealReservationException from "../../utils/exceptions/invalidMealReservation.exception";
import MealReservationNotFoundException from "../../utils/exceptions/mealReservationNotFound.exception";
import { EMealReservationState } from "@treat/lib-common/src/enums/EMealReservationState";
import { IMealOffer } from "@treat/lib-common/src/interfaces/IMealOffer";
import { MealReservationDocument } from "../mealReservation/mealReservation.interface";
import { TRANSACTION_FEE } from "@treat/lib-common/src/constants";

@Service()
class MealOfferService {
  private mealOffer = MealOfferSchema;

  constructor(
    private readonly mealTransactionService: MealTransactionService
  ) {}

  public async create(
    newMealOffer: IMealOffer,
    user: UserDocument
  ): Promise<MealOfferDocument | Error> {
    newMealOffer.user = user._id;
    newMealOffer.transactionFee = Math.round(
      TRANSACTION_FEE * newMealOffer.price
    );
    return (await this.mealOffer.create(newMealOffer)) as MealOfferDocument;
  }

  public async getMealOfferDetails(
    mealOfferId: string
  ): Promise<MealOfferDocument | Error> {
    const mealOfferDoc = (await this.mealOffer.findById(
      mealOfferId
    )) as MealOfferDocument;
    if (!mealOfferDoc) {
      throw new MealOfferNotFoundException(mealOfferId as unknown as string);
    }
    return mealOfferDoc;
  }

  public async getMealOffer(
    user: UserDocument,
    mealOfferId: string
  ): Promise<MealOfferDocument | Error> {
    const mealOfferDoc = (await this.mealOffer.findById(
      mealOfferId
    )) as MealOfferDocument;
    if (!mealOfferDoc) {
      throw new MealOfferNotFoundException(mealOfferId as unknown as string);
    }
    if (!user._id.equals(mealOfferDoc.user)) {
      return this.getMealOfferPreview(user, mealOfferDoc);
    }
    return mealOfferDoc;
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
    return await this.mealOffer.findSentMealOfferRequests(user._id);
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
      mealOfferId
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
      mealOfferDoc.reservations.push({
        buyer: user._id,
      } as MealReservationDocument);
      return await mealOfferDoc.save();
    }
    throw new InvalidMealReservationException(
      "You can not make a reservation for your own meal offer"
    );
  }

  public async updateMealOfferReservationState(
    mealOfferId: string,
    user: UserDocument,
    mealReservationId: string,
    newState: MealReservationState
  ): Promise<void | Error> {
    if (newState === MealReservationState.SELLER_ACCEPTED) {
      await this.updateMealOfferReservationToSellerAccepted(
        mealOfferId,
        user,
        mealReservationId
      );
    } else if (newState === MealReservationState.SELLER_REJECTED) {
      await this.updateMealOfferReservationToSellerRejected(
        mealOfferId,
        user,
        mealReservationId
      );
    } else if (newState === MealReservationState.BUYER_CONFIRMED) {
      await this.updateMealOfferReservationToBuyerConfirmed(
        mealOfferId,
        user,
        mealReservationId
      );
    } else if (newState === MealReservationState.BUYER_REJECTED) {
      await this.updateMealOfferReservationToBuyerRejected(
        mealOfferId,
        user,
        mealReservationId
      );
    } else if (newState === MealReservationState.PENDING) {
      throw new InvalidMealReservationStateException(
        `State can not be set to ${MealReservationState.PENDING}`
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
        `State should be ${MealReservationState.PENDING}`
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
        `State should be ${MealReservationState.SELLER_ACCEPTED}`
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
        `State should be ${MealReservationState.PENDING} or ${MealReservationState.SELLER_ACCEPTED}`
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
        `State should be ${MealReservationState.PENDING} or ${MealReservationState.SELLER_ACCEPTED}`
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
