import { Model, model, Schema, Types } from "mongoose";
import {
  MealOfferDocument,
  MealOfferDocumentWithUser,
} from "./mealOffer.interface";
import { MealReservationSchema } from "../mealReservation/mealReservation.model";
import { RatingSchema } from "../rating/rating.model";
import { EMealCategory } from "@treat/lib-common/lib/enums/EMealCategory";
import { EMealAllergen } from "@treat/lib-common/lib/enums/EMealAllergen";

const MealOfferSchema = new Schema<MealOfferDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        enum: Object.values(EMealCategory),
        required: true,
      },
    ],
    allergens: [
      {
        type: String,
        enum: Object.values(EMealAllergen),
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    portions: {
      type: Number,
      required: true,
      min: 1,
    },
    pickUpDetails: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    transactionFee: {
      type: Number,
      required: true,
      min: 0,
    },
    reservations: [MealReservationSchema],
    rating: {
      type: RatingSchema,
    },
  },
  { timestamps: true }
);

export interface MealOfferModel extends Model<MealOfferDocument> {
  findSentMealOfferRequests(userId: string): Promise<MealOfferDocument[]>;

  aggregateMealOfferPreviews(
    match: Record<string, any>
  ): Promise<MealOfferDocumentWithUser[]>;
}

MealOfferSchema.statics.findSentMealOfferRequests = async function (
  this: Model<MealOfferDocument>,
  userId: string
) {
  return this.find(
    { reservations: { $elemMatch: { buyer: userId } } },
    {
      description: 1,
      user: 1,
      portions: 1,
      startDate: 1,
      endDate: 1,
      price: 1,
      title: 1,
      rating: 1,
      reservations: {
        $filter: {
          input: "$reservations",
          as: "reservation",
          cond: { $eq: ["$$reservation.buyer", userId] },
        },
      },
    }
  )
    .populate("user", "firstName lastName meanRating")
    .exec();
};

MealOfferSchema.statics.aggregateMealOfferPreviews = async function (
  this: Model<MealOfferDocument>,
  match: Record<string, any>
) {
  return await this.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        title: 1,
        startDate: 1,
        endDate: 1,
        price: 1,
        portions: 1,
        categories: 1,
        allergens: 1,
        user: {
          $arrayElemAt: ["$user", 0],
        },
      },
    },
    {
      $match: match,
    },
    {
      $project: {
        "user.password": 0,
        "user.email": 0,
        "user.birthdate": 0,
        "user.countRatings": 0,
        "user.virtualAccount": 0,
      },
    },
  ]).exec();
};

export default model<MealOfferDocument, MealOfferModel>(
  "MealOffer",
  MealOfferSchema
);
