import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";

import User from "../user/user.interface";
import {Service} from "typedi";
import MealTransactionService from "../mealTransaction/mealTransaction.service";
import MealTransaction from "../mealTransaction/mealTransaction.interface";
import {ObjectId} from "mongoose";
import MealOffer from "./mealOffer.interface";
import MealReservationState from "../mealReservation/mealReservationState.enum";
import MealReservation from "../mealReservation/mealReservation.interface";
import InvalidMealReservationStateException from "../../utils/exceptions/invalidMealReservationState.exception";
import InvalidMealReservationException from "../../utils/exceptions/invalidMealReservation.exception";

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
      .find(
        { reservations: { $elemMatch: { buyer: user._id } } },
        {
          description: 1,
          user: 1,
          portions: 1,
          startDate: 1,
          endDate: 1,
          price: 1,
          title: 1,
          reservations: {
            $filter: {
              input: "$reservations",
              as: "reservation",
              cond: { $eq: ["$$reservation.buyer", user._id] },
            },
          },
        }
      )
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
    if (!user._id.equals(mealOffer.user)) {
      const reservations = mealOffer.reservations;
      const result = reservations.find((reservation) =>
        user._id.equals(reservation.buyer)
      );
      if (result === undefined) {
        mealOffer.reservations.push({ buyer: user._id } as MealReservation);
        return await mealOffer.save();
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
    mealOfferId: ObjectId,
    user: User,
    mealReservationId: ObjectId,
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
    mealOfferId: ObjectId,
    seller: User,
    mealReservationId: ObjectId
  ): Promise<void | Error> {
    const [mealOffer, mealReservation] =
      (await this.getMealOfferAndReservationForSeller(
        mealOfferId,
        mealReservationId,
        seller
      )) as [MealOffer, MealReservation];
    if (mealReservation.reservationState === MealReservationState.PENDING) {
      mealReservation.reservationState = MealReservationState.SELLER_ACCEPTED;
      await mealOffer.save();
    } else {
      throw new InvalidMealReservationStateException(
        `State should be ${MealReservationState.PENDING}`
      );
    }
  }

  private async updateMealOfferReservationToBuyerConfirmed(
    mealOfferId: ObjectId,
    buyer: User,
    mealReservationId: ObjectId
  ): Promise<void | Error> {
    const [mealOffer, mealReservation] =
      (await this.getMealOfferAndReservationForBuyer(
        mealOfferId,
        mealReservationId,
        buyer
      )) as [MealOffer, MealReservation];
    console.log(mealReservation);
    if (
      mealReservation.reservationState === MealReservationState.SELLER_ACCEPTED
    ) {
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
        mealTransaction._id as ObjectId
      );
      mealReservation.reservationState = MealReservationState.BUYER_CONFIRMED;
      await mealOffer.save();
    } else {
      throw new InvalidMealReservationStateException(
        `State should be ${MealReservationState.SELLER_ACCEPTED}`
      );
    }
  }

  private async updateMealOfferReservationToSellerRejected(
    mealOfferId: ObjectId,
    seller: User,
    mealReservationId: ObjectId
  ): Promise<void | Error> {
    const [mealOffer, mealReservation] =
      (await this.getMealOfferAndReservationForSeller(
        mealOfferId,
        mealReservationId,
        seller
      )) as [MealOffer, MealReservation];
    if (
      mealReservation.reservationState === MealReservationState.PENDING ||
      mealReservation.reservationState === MealReservationState.SELLER_ACCEPTED
    ) {
      mealReservation.reservationState = MealReservationState.SELLER_REJECTED;
      await mealOffer.save();
    } else {
      throw new InvalidMealReservationStateException(
        `State should be ${MealReservationState.PENDING} or ${MealReservationState.SELLER_ACCEPTED}`
      );
    }
  }

  private async updateMealOfferReservationToBuyerRejected(
    mealOfferId: ObjectId,
    buyer: User,
    mealReservationId: ObjectId
  ): Promise<void | Error> {
    const [mealOffer, mealReservation] =
      (await this.getMealOfferAndReservationForBuyer(
        mealOfferId,
        mealReservationId,
        buyer
      )) as [MealOffer, MealReservation];
    if (
      mealReservation.reservationState ===
        MealReservationState.SELLER_ACCEPTED ||
      mealReservation.reservationState === MealReservationState.PENDING
    ) {
      mealReservation.reservationState = MealReservationState.BUYER_REJECTED;
      await mealOffer.save();
    } else {
      throw new InvalidMealReservationStateException(
        `State should be ${MealReservationState.PENDING} or ${MealReservationState.SELLER_ACCEPTED}`
      );
    }
  }

  private async getMealOfferAndReservation(
    mealOfferId: ObjectId,
    mealReservationId: ObjectId
  ): Promise<[MealOffer, MealReservation] | Error> {
    const mealOffer = (await this.getMealOffer(mealOfferId)) as MealOffer;
    const mealReservation = mealOffer.reservations.find(
      (reservation) =>
        reservation._id.toString() === mealReservationId.toString()
    ) as MealReservation;
    return [mealOffer, mealReservation];
  }

  private async getMealOfferAndReservationForSeller(
    mealOfferId: ObjectId,
    mealReservationId: ObjectId,
    seller: User
  ): Promise<[MealOffer, MealReservation] | Error> {
    const [mealOffer, mealReservation] = (await this.getMealOfferAndReservation(
      mealOfferId,
      mealReservationId
    )) as [MealOffer, MealReservation];
    if (seller._id.equals(mealOffer.user)) {
      return [mealOffer, mealReservation];
    }
    throw new Error("User is not seller of offer");
  }

  private async getMealOfferAndReservationForBuyer(
    mealOfferId: ObjectId,
    mealReservationId: ObjectId,
    buyer: User
  ): Promise<[MealOffer, MealReservation] | Error> {
    const [mealOffer, mealReservation] = (await this.getMealOfferAndReservation(
      mealOfferId,
      mealReservationId
    )) as [MealOffer, MealReservation];
    if (String(mealReservation.buyer) === String(buyer._id)) {
      return [mealOffer, mealReservation];
    }
    throw new Error("User is not buyer of offer");
  }
}

export default MealOfferService;
