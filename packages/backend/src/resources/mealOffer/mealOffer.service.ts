import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOffer from "../../resources/mealOffer/mealOffer.interface";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";

import User from "../user/user.interface";
import { Service } from "typedi";
import MealReservation from "../mealReservation/mealReservation.interface";
import MealReservationStateEnum from "../mealReservation/mealReservationState.enum";
import MealReservationState from "../mealReservation/mealReservationState.enum";
import HttpException from "../../utils/exceptions/http.exception";
import MealTransactionService from "../mealTransaction/mealTransaction.service";
import MealTransaction from "../mealTransaction/mealTransaction.interface";
import { ObjectId } from "mongoose";

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

  public async getMealOffer(mealOfferId: ObjectId): Promise<MealOffer | Error> {
    const mealOffer = (await this.mealOffer
      .findById(mealOfferId)
      .select("-pickUpDetails")
      .exec()) as MealOffer;
    if (!mealOffer) {
      throw new MealOfferNotFoundException(mealOfferId as unknown as string);
    }
    return mealOffer;
  }

  public async getSentMealOfferRequests(
    user: User
  ): Promise<MealOffer[] | Error> {
    return (await this.mealOffer
      .find({ reservations: { $elemMatch: { buyer: user._id } } })
      .exec()) as MealOffer[];
  }

  public async getReceivedMealOfferRequests(
    user: User
  ): Promise<MealOffer[] | Error> {
    return (await this.mealOffer
      .find({ user: user._id })
      .exec()) as MealOffer[];
  }

  public async deleteMealOffer(
    mealOfferId: ObjectId,
    user: User
  ): Promise<void | Error> {
    const mealOffer = (await this.getMealOffer(mealOfferId)) as MealOffer;
    if (String(mealOffer.user) === String(user._id)) {
      await this.mealOffer.findByIdAndDelete(mealOfferId);
    } else {
      console.log();
    }
  }

  public async createMealOfferReservation(
    mealOfferId: ObjectId,
    user: User
  ): Promise<MealOffer | Error> {
    const mealOffer = (await this.getMealOffer(mealOfferId)) as MealOffer;
    const newReservation = { buyer: user._id } as MealReservation;
    mealOffer.reservations.push(newReservation);
    return await mealOffer.save();
  }

  public async updateMealOfferReservationState(
    mealOfferId: ObjectId,
    user: User,
    mealReservationId: ObjectId,
    newState: MealReservationStateEnum
  ): Promise<MealOffer | Error> {
    const mealOffer = (await this.getMealOffer(mealOfferId)) as MealOffer;
    const mealReservations = mealOffer.reservations;
    const mealReservation = mealReservations.find(
      (reservation) =>
        reservation._id.toString() === mealReservationId.toString()
    ) as MealReservation;
    if (
      (mealOffer.user.toString() === user._id.toString() &&
        this.isValidSellerReservationStateUpdate(
          mealReservation.reservationState,
          newState
        )) ||
      (mealReservation.buyer.toString() === user._id.toString() &&
        this.isValidBuyerReservationStateUpdate(
          mealReservation.reservationState,
          newState
        ))
    ) {
      for (const reservation of mealOffer.reservations) {
        if (reservation._id.toString() === mealReservation._id.toString()) {
          if (newState === MealReservationState.BUYER_CONFIRMED) {
            const mealTransaction =
              (await this.mealTransactionService.createTransaction(
                mealOfferId,
                mealReservationId,
                mealReservation.buyer,
                mealOffer.user,
                mealOffer.price,
                mealOffer.transactionFee
              )) as MealTransaction;
            await this.mealTransactionService.performTransaction(
              mealTransaction._id
            );
          }
          reservation.reservationState = newState;
        }
      }
      return await mealOffer.save();
    }
    throw new HttpException(400, "Wrong state");
  }

  private isValidBuyerReservationStateUpdate(
    mealReservationState: MealReservationStateEnum,
    newState: MealReservationStateEnum
  ): boolean {
    if (
      [
        MealReservationState.BUYER_CONFIRMED,
        MealReservationState.BUYER_REJECTED,
      ].includes(newState)
    ) {
      return this.isValidReservationStateUpdate(
        mealReservationState,
        MealReservationState.SELLER_ACCEPTED
      );
    }
    return false;
  }

  private isValidSellerReservationStateUpdate(
    mealReservationState: MealReservationStateEnum,
    newState: MealReservationStateEnum
  ): boolean {
    if (
      newState === MealReservationState.SELLER_ACCEPTED ||
      newState === MealReservationState.SELLER_REJECTED
    ) {
      return this.isValidReservationStateUpdate(
        mealReservationState,
        MealReservationState.PENDING
      );
    }
    return false;
  }

  private isValidReservationStateUpdate(
    mealReservationState: MealReservationStateEnum,
    expectedState: MealReservationStateEnum
  ): boolean {
    return mealReservationState === expectedState;
  }
}

export default MealOfferService;
