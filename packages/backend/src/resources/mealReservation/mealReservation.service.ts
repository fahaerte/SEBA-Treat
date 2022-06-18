import { Service } from "typedi";
import MealReservationSchema from "./mealReservation.model";
import MealReservation from "./mealReservation.interface";
import User from "../user/user.interface";
import MealReservationState from "./mealReservationState.enum";
import MealReservationStateEnum from "./mealReservationState.enum";
import MealOfferService from "../mealOffer/mealOffer.service";
import MealOffer from "../mealOffer/mealOffer.interface";
import HttpException from "../../utils/exceptions/http.exception";

@Service()
class MealReservationService {
  private mealReservation = MealReservationSchema;

  constructor(private readonly MealOfferService: MealOfferService) {}

  public async create(
    mealOfferId: string,
    buyer: User
  ): Promise<MealReservation | Error> {
    const mealOffer = (await this.MealOfferService.getMealOffer(
      mealOfferId
    )) as MealOffer;
    const newMealReservation = {
      mealOffer: mealOffer._id,
      buyer: buyer._id,
      seller: mealOffer.user,
      reservationState: MealReservationState.PENDING,
    } as MealReservation;
    return await this.mealReservation.create(newMealReservation);
  }

  public async getMealReservation(
    mealReservationId: string,
    user: User
  ): Promise<MealReservation | Error> {
    const mealReservation = (await this.mealReservation.findById(
      mealReservationId
    )) as MealReservation;
    if (this.checkIfUserIsAllowedToGetReservation(mealReservation, user)) {
      return mealReservation;
    }
    throw new HttpException(403, "not allowed");
  }

  public async setMealReservationStateToSellerAccepted(
    mealReservationId: string,
    user: User
  ): Promise<MealReservation | Error> {
    return await this.setMealReservationStatus(
      mealReservationId,
      user,
      MealReservationState.PENDING,
      MealReservationState.SELLER_ACCEPTED
    );
  }

  public async setMealReservationStateToSellerRejected(
    mealReservationId: string,
    user: User
  ): Promise<MealReservation | Error> {
    return await this.setMealReservationStatus(
      mealReservationId,
      user,
      MealReservationState.PENDING,
      MealReservationState.SELLER_REJECTED
    );
  }

  public async setMealReservationStateToBuyerConfirmed(
    mealReservationId: string,
    user: User
  ): Promise<MealReservation | Error> {
    return await this.setMealReservationStatus(
      mealReservationId,
      user,
      MealReservationState.SELLER_ACCEPTED,
      MealReservationState.BUYER_CONFIRMED
    );
  }

  public async setMealReservationStateToBuyerRejected(
    mealReservationId: string,
    user: User
  ): Promise<MealReservation | Error> {
    return await this.setMealReservationStatus(
      mealReservationId,
      user,
      MealReservationState.SELLER_ACCEPTED,
      MealReservationState.BUYER_REJECTED
    );
  }

  private async setMealReservationStatus(
    mealReservationId: string,
    user: User,
    expectedState: MealReservationStateEnum,
    newState: MealReservationStateEnum
  ): Promise<MealReservation | Error> {
    const mealReservation = (await this.getMealReservation(
      mealReservationId,
      user
    )) as MealReservation;
    if (mealReservation.reservationState === expectedState) {
      mealReservation.reservationState = newState;
      return mealReservation;
    }
    throw new HttpException(400, "Wrong state");
  }

  private checkIfUserIsAllowedToGetReservation(
    mealReservation: MealReservation,
    user: User
  ): boolean {
    return (
      String(user._id) === String(mealReservation.buyer) ||
      String(user._id) === String(mealReservation.seller)
    );
  }
}

export default MealReservationService;
