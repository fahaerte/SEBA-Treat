import { Service } from "typedi";
import MealOfferService from "../mealOffer/mealOffer.service";
import User from "../user/user.interface";
import { MealOfferDocument } from "../mealOffer/mealOffer.interface";
import MealReservation from "../mealReservation/mealReservation.interface";
import MealReservationState from "../mealReservation/mealReservationState.enum";
import InvalidMealReservationStateException from "../../utils/exceptions/invalidMealReservationState.exception";
import InvalidRatingException from "../../utils/exceptions/invalidRating.exception";
import { Rating } from "./rating.interface";
import UserService from "../user/user.service";

@Service()
class RatingService {
  constructor(
    private readonly mealOfferService: MealOfferService,
    private readonly userService: UserService
  ) {}

  public async rateUser(
    user: User,
    mealOfferId: string,
    mealReservationId: string,
    rating: number
  ): Promise<void | Error> {
    const [mealOffer, mealReservation] =
      (await this.mealOfferService.getMealOfferAndReservation(
        user,
        mealOfferId,
        mealReservationId
      )) as [MealOfferDocument, MealReservation];
    if (
      mealReservation.reservationState !== MealReservationState.BUYER_CONFIRMED
    ) {
      throw new InvalidMealReservationStateException(
        `State should be ${MealReservationState.BUYER_CONFIRMED} in order to rate user`
      );
    }
    if (user._id.equals(mealOffer.user)) {
      await this.setBuyerRating(
        mealOffer,
        String(mealReservation.buyer),
        rating
      );
    } else {
      await this.setSellerRating(mealOffer, rating);
    }
  }

  private async setBuyerRating(
    mealOffer: MealOfferDocument,
    buyerId: string,
    rating: number
  ) {
    if (mealOffer.rating === undefined) {
      mealOffer.rating = { buyerRating: rating } as Rating;
    } else {
      if (mealOffer.rating.buyerRating !== undefined) {
        throw new InvalidRatingException("There exists already a buyer rating");
      }
      mealOffer.rating.buyerRating = rating;
    }
    const buyer = (await this.userService.getUser(buyerId)) as User;
    buyer.countRatings += 1;
    buyer.meanRating = (buyer.meanRating + rating) / buyer.countRatings;
    await buyer.save();
    await mealOffer.save();
  }

  private async setSellerRating(mealOffer: MealOfferDocument, rating: number) {
    if (mealOffer.rating === undefined) {
      mealOffer.rating = { sellerRating: rating } as Rating;
    } else {
      if (mealOffer.rating.sellerRating !== undefined) {
        throw new InvalidRatingException("There exists already a buyer rating");
      }
      mealOffer.rating.sellerRating = rating;
    }
    const seller = (await this.userService.getUser(
      String(mealOffer.user)
    )) as User;
    seller.countRatings += 1;
    seller.meanRating = (seller.meanRating + rating) / seller.countRatings;
    await seller.save();
    await mealOffer.save();
  }
}

export default RatingService;
