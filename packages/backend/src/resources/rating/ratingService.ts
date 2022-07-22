import { Service } from "typedi";
import MealOfferService from "../mealOffer/mealOffer.service";
import UserDocument from "../user/user.interface";
import { MealOfferDocument } from "../mealOffer/mealOffer.interface";
import InvalidMealReservationStateException from "../../utils/exceptions/invalidMealReservationState.exception";
import InvalidRatingException from "../../utils/exceptions/invalidRating.exception";
import UserService from "../user/user.service";
import { MealReservationDocument } from "../mealReservation/mealReservation.interface";
import { RatingDocument } from "./rating.interface";
import { EMealReservationState } from "@treat/lib-common";
import Logger, { ILogMessage } from "../../utils/logger";

@Service()
class RatingService {
  constructor(
    private readonly mealOfferService: MealOfferService,
    private readonly userService: UserService
  ) {}

  public async createUserRatingForMealOffer(
    user: UserDocument,
    mealOfferId: string,
    mealReservationId: string,
    rating: number
  ): Promise<RatingDocument | Error> {
    const [mealOffer, mealReservation] =
      (await this.mealOfferService.getMealOfferAndReservation(
        mealReservationId
      )) as [MealOfferDocument, MealReservationDocument];
    if (
      mealReservation.reservationState !== EMealReservationState.BUYER_CONFIRMED
    ) {
      Logger.error({
        functionName: "rateUser",
        message: "Could not create rating",
        details: `State should be ${EMealReservationState.BUYER_CONFIRMED} in order to rate user`,
      } as ILogMessage);
      throw new InvalidMealReservationStateException(
        `State should be ${EMealReservationState.BUYER_CONFIRMED} in order to rate user`
      );
    }
    if (user._id.equals(mealOffer.user)) {
      return await this.setBuyerRating(
        mealOffer,
        String(mealReservation.buyer),
        rating
      );
    } else {
      return await this.setSellerRating(mealOffer, rating);
    }
  }

  private async setBuyerRating(
    mealOffer: MealOfferDocument,
    buyerId: string,
    rating: number
  ): Promise<RatingDocument | Error> {
    if (mealOffer.rating === undefined) {
      mealOffer.rating = { buyerRating: rating } as RatingDocument;
    } else {
      if (mealOffer.rating.buyerRating !== undefined) {
        Logger.error({
          functionName: "setBuyerRating",
          message: "Could not create buyer rating",
          details: `For mealOffer ${mealOffer._id} exists already a buyer rating`,
        } as ILogMessage);
        throw new InvalidRatingException("There exists already a buyer rating");
      }
      mealOffer.rating.buyerRating = rating;
    }
    const buyer = (await this.userService.getUser(buyerId)) as UserDocument;
    buyer.countRatings += 1;
    buyer.meanRating = (buyer.meanRating + rating) / buyer.countRatings;
    try {
      await buyer.save();
      Logger.info({
        functionName: "setBuyerRating",
        message: `Updated rating in buyer for mealOffer ${mealOffer._id}`,
      } as ILogMessage);
    } catch (error: any) {
      Logger.error({
        functionName: "setBuyerRating",
        message: `Could not save buyer ${buyer._id}`,
        details: error.message,
      } as ILogMessage);
      throw new Error("Could not save buyer");
    }
    try {
      await mealOffer.save();
      Logger.info({
        functionName: "setBuyerRating",
        message: `Buyer rating was set for mealOffer ${mealOffer._id}`,
      } as ILogMessage);
    } catch (error: any) {
      Logger.error({
        functionName: "setBuyerRating",
        message: `Could not save mealOffer ${mealOffer._id}`,
        details: error.message,
      } as ILogMessage);
      throw new Error("Could not save mealOffer");
    }
    mealOffer.rating.sellerRating = undefined;
    return mealOffer.rating;
  }

  private async setSellerRating(mealOffer: MealOfferDocument, rating: number) {
    if (mealOffer.rating === undefined) {
      mealOffer.rating = { sellerRating: rating } as RatingDocument;
    } else {
      if (mealOffer.rating.sellerRating !== undefined) {
        Logger.error({
          functionName: "setSellerRating",
          message: "Could not create seller rating",
          details: `For ${mealOffer._id} already exists a seller rating`,
        } as ILogMessage);
        throw new InvalidRatingException(
          "There exists already a seller rating"
        );
      }
      mealOffer.rating.sellerRating = rating;
    }
    const seller = (await this.userService.getUser(
      String(mealOffer.user)
    )) as UserDocument;
    seller.countRatings += 1;
    seller.meanRating = (seller.meanRating + rating) / seller.countRatings;
    try {
      await seller.save();
      Logger.info({
        functionName: "setSellerRating",
        message: `Updated rating in seller for mealOffer ${mealOffer._id}`,
      } as ILogMessage);
    } catch (error: any) {
      Logger.error({
        functionName: "setSellerRating",
        message: `Could not save seller ${seller._id}`,
        details: error.message,
      } as ILogMessage);
      throw new Error("Could not save seller");
    }
    try {
      await mealOffer.save();
      Logger.info({
        functionName: "setSellerRating",
        message: `Seller rating was set for mealOffer ${mealOffer._id}`,
      } as ILogMessage);
    } catch (error: any) {
      Logger.error({
        functionName: "setSellerRating",
        message: `Could not save mealOffer ${mealOffer._id}`,
        details: error.message,
      } as ILogMessage);
      throw new Error("Could not save mealOffer");
    }
    mealOffer.rating.buyerRating = undefined;
    return mealOffer.rating;
  }
}

export default RatingService;
