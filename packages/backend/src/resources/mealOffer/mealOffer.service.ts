import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";
import User from "../user/user.interface";
import { Service } from "typedi";
import MealTransactionService from "../mealTransaction/mealTransaction.service";
import MealTransaction from "../mealTransaction/mealTransaction.interface";
import { ObjectId } from "mongoose";
import { MealOffer, MealOfferDocument } from "./mealOffer.interface";
import MealReservationState from "../mealReservation/mealReservationState.enum";
import MealReservation from "../mealReservation/mealReservation.interface";
import InvalidMealReservationStateException from "../../utils/exceptions/invalidMealReservationState.exception";
import InvalidMealReservationException from "../../utils/exceptions/invalidMealReservation.exception";
import MealReservationNotFoundException from "../../utils/exceptions/mealReservationNotFound.exception";

@Service()
class MealOfferService {
  private mealOffer = MealOfferSchema;
  private mealTransactionService = new MealTransactionService();

  public async create(
    newMealOffer: MealOffer,
    user: User
  ): Promise<MealOffer | Error> {
    newMealOffer.user = user._id;
    return await this.mealOffer.create(newMealOffer);
  }

  public async getMealOffer(
    user: User,
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
    user: User,
    mealOfferDoc: MealOfferDocument
  ): MealOfferDocument {
    mealOfferDoc.reservations = mealOfferDoc.reservations.filter(
      (reservation) => user._id.equals(reservation.buyer)
    );
    mealOfferDoc.reservations.forEach((reservation) => {
      if (
        reservation.reservationState !== MealReservationState.BUYER_CONFIRMED
      ) {
        mealOfferDoc.pickUpDetails = undefined;
      }
    });
    return mealOfferDoc;
  }

  public async getSentMealOfferRequests(
    user: User
  ): Promise<MealOfferDocument[] | Error> {
    return await this.mealOffer.findSentMealOfferRequests(user._id);
  }

  public async getReceivedMealOfferRequests(
    user: User
  ): Promise<MealOffer[] | Error> {
    return (await this.mealOffer
      .find({ user: user._id })
        .populate("reservations.buyer", "firstName lastName")
      .exec()) as MealOffer[];
  }

  public async deleteMealOffer(
    mealOfferId: string,
    user: User
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
    user: User
  ): Promise<MealOfferDocument | Error> {
    const mealOfferDoc = (await this.getMealOffer(
      user,
      mealOfferId
    )) as MealOfferDocument;
    if (!user._id.equals(mealOfferDoc.user)) {
      const reservations = mealOfferDoc.reservations;
      const result = reservations.find((reservation) =>
        user._id.equals(reservation.buyer)
      );
      if (result === undefined) {
        mealOfferDoc.reservations.push({ buyer: user._id } as MealReservation);
        return await mealOfferDoc.save();
      }
      throw new InvalidMealReservationException(
        "You can only make one reservation per meal offer"
      );
    }
    throw new InvalidMealReservationException(
      "You can not make a reservation for your own meal offer"
    );
  }

  public async updateMealOfferReservationState(
    mealOfferId: string,
    user: User,
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
    seller: User,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForSeller(
        mealOfferId,
        mealReservationId,
        seller
      )) as [MealOfferDocument, MealReservation];
    if (mealReservation.reservationState === MealReservationState.PENDING) {
      mealReservation.reservationState = MealReservationState.SELLER_ACCEPTED;
      await mealOfferDoc.save();
    } else {
      throw new InvalidMealReservationStateException(
        `State should be ${MealReservationState.PENDING}`
      );
    }
  }

  private async updateMealOfferReservationToBuyerConfirmed(
    mealOfferId: string,
    buyer: User,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForBuyer(
        mealOfferId,
        mealReservationId,
        buyer
      )) as [MealOfferDocument, MealReservation];
    if (
      mealReservation.reservationState === MealReservationState.SELLER_ACCEPTED
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
        reservation.reservationState = mealReservation.equals(reservation)
          ? MealReservationState.BUYER_CONFIRMED
          : MealReservationState.SELLER_REJECTED;
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
    seller: User,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForSeller(
        mealOfferId,
        mealReservationId,
        seller
      )) as [MealOfferDocument, MealReservation];
    if (
      mealReservation.reservationState === MealReservationState.PENDING ||
      mealReservation.reservationState === MealReservationState.SELLER_ACCEPTED
    ) {
      mealReservation.reservationState = MealReservationState.SELLER_REJECTED;
      await mealOfferDoc.save();
    } else {
      throw new InvalidMealReservationStateException(
        `State should be ${MealReservationState.PENDING} or ${MealReservationState.SELLER_ACCEPTED}`
      );
    }
  }

  private async updateMealOfferReservationToBuyerRejected(
    mealOfferId: string,
    buyer: User,
    mealReservationId: string
  ): Promise<void | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservationForBuyer(
        mealOfferId,
        mealReservationId,
        buyer
      )) as [MealOfferDocument, MealReservation];
    if (
      mealReservation.reservationState ===
        MealReservationState.SELLER_ACCEPTED ||
      mealReservation.reservationState === MealReservationState.PENDING
    ) {
      mealReservation.reservationState = MealReservationState.BUYER_REJECTED;
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

  private async getMealOfferAndReservation(
    user: User,
    mealOfferId: string,
    mealReservationId: string
  ): Promise<[MealOffer, MealReservation] | Error> {
    const mealOfferDoc = (await this.getMealOffer(
      user,
      mealOfferId
    )) as MealOfferDocument;
    const mealReservation = mealOfferDoc.reservations.find(
      (reservation) => reservation._id == mealReservationId
    ) as MealReservation;
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
    seller: User
  ): Promise<[MealOffer, MealReservation] | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        seller,
        mealOfferId,
        mealReservationId
      )) as [MealOffer, MealReservation];
    if (seller._id.equals(mealOfferDoc.user)) {
      return [mealOfferDoc, mealReservation];
    }
    throw new Error("User is not seller of offer");
  }

  private async getMealOfferAndReservationForBuyer(
    mealOfferId: string,
    mealReservationId: string,
    buyer: User
  ): Promise<[MealOfferDocument, MealReservation] | Error> {
    const [mealOfferDoc, mealReservation] =
      (await this.getMealOfferAndReservation(
        buyer,
        mealOfferId,
        mealReservationId
      )) as [MealOfferDocument, MealReservation];
    if (buyer._id.equals(mealReservation.buyer)) {
      return [mealOfferDoc, mealReservation];
    }
    throw new Error("User is not buyer of offer");
  }
}

export default MealOfferService;
