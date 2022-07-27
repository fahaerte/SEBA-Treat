import { Model, model, Schema, Types } from "mongoose";
import {
  MealOfferDocument,
  MealOfferDocumentWithUser,
} from "./mealOffer.interface";
import { MealReservationSchema } from "../mealReservation/mealReservation.model";
import { RatingSchema } from "../rating/rating.model";
import { EMealAllergen, EMealCategory } from "@treat/lib-common";
import { MealOfferQuery } from "./mealOfferQuery.interface";
import UserDocument from "../user/user.interface";

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
    image: {
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
    allergensVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export interface MealOfferModel extends Model<MealOfferDocument> {
  findByIdWithUser(mealOfferId: string): Promise<MealOfferDocumentWithUser>;

  findBy(
    mealOfferId: string,
    populateUser: boolean,
    user?: UserDocument
  ): Promise<MealOfferDocument | MealOfferDocumentWithUser>;

  findByReservationId(
    mealReservationId: string,
    sellerId?: string,
    buyerId?: string
  ): Promise<MealOfferDocument>;

  findSentMealOfferRequests(userId: string): Promise<MealOfferDocument[]>;

  findReceivedMealOfferRequests(userId: string): Promise<MealOfferDocument[]>;

  aggregateMealOfferPreviews(
    match: Record<string, any>
  ): Promise<MealOfferDocumentWithUser[]>;
}

MealOfferSchema.statics.findBy = async function (
  this: Model<MealOfferDocument>,
  mealOfferId: string,
  populateUser: boolean,
  user?: UserDocument
) {
  const projection: Record<string, any> = {
    _id: 1,
    title: 1,
    description: 1,
    categories: 1,
    allergens: 1,
    price: 1,
    transactionFee: 1,
    image: 1,
    user: 1,
    startDate: 1,
    endDate: 1,
    portions: 1,
    createdAt: 1,
    updatedAt: 1,
    allergensVerified: 1,
    pickUpDetails: {
      $cond: {
        if: { $ne: ["$user", user?._id] },
        then: "$$REMOVE",
        else: "$pickUpDetails",
      },
    },
    reservations: {
      $cond: {
        if: { $ne: ["$user", user?._id] },
        then: {
          $filter: {
            input: "$reservations",
            as: "reservations",
            cond: { $eq: ["$$reservations.buyer", user?._id] },
          },
        },
        else: "$reservations",
      },
    },
  };
  return populateUser
    ? this.findById(mealOfferId, projection).populate(
        "user",
        "firstName lastName meanRating countRatings address"
      )
    : this.findById(mealOfferId, projection);
};

MealOfferSchema.statics.findByIdWithUser = async function (
  this: Model<MealOfferDocument>,
  mealOfferId: string
) {
  return this.findById(mealOfferId).populate(
    "user",
    "firstName lastName meanRating countRatings address"
  );
};

MealOfferSchema.statics.findByReservationId = async function (
  this: Model<MealOfferDocument>,
  mealReservationId: string,
  sellerId?: string,
  buyerId?: string
) {
  const reservationFilter: Record<string, any> = {
    _id: mealReservationId,
  };
  if (buyerId) reservationFilter["buyer"] = buyerId;
  const filter: Record<string, any> = {
    reservations: {
      $elemMatch: reservationFilter,
    },
  };
  if (sellerId) filter["user"] = sellerId;
  return this.findOne(filter, {
    _id: 1,
    user: 1,
    reservations: 1,
    rating: 1,
    price: 1,
    transactionFee: 1,
  });
};

MealOfferSchema.statics.findReceivedMealOfferRequests = async function (
  this: Model<MealOfferDocument>,
  userId: string
) {
  return this.find({ user: userId })
    .populate(
      "user reservations.buyer",
      "firstName lastName meanRating profilePicture"
    )
    .exec();
};

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
      image: 1,
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
    .populate(
      "user reservations.buyer",
      "firstName lastName meanRating profilePicture"
    )
    .exec();
};

MealOfferSchema.statics.aggregateMealOfferPreviews = async function (
  this: Model<MealOfferDocument>,
  mealOfferQuery: MealOfferQuery
) {
  const match: Record<string, any> = {
    endDate: { $gte: new Date() },
  };
  if (mealOfferQuery.search !== undefined) {
    match["$or"] = [
      {
        title: {
          $regex: new RegExp(mealOfferQuery.search),
          $options: "i",
        },
      },
      {
        description: {
          $regex: new RegExp(mealOfferQuery.search),
          $options: "i",
        },
      },
    ];
  }
  if (mealOfferQuery.category !== undefined)
    match["categories"] = { $eq: mealOfferQuery.category };
  if (mealOfferQuery.allergen !== undefined)
    match["allergens"] = { $eq: mealOfferQuery.allergen };
  if (mealOfferQuery.portions !== undefined)
    match["portions"] = { $eq: Number(mealOfferQuery.portions) };
  if (mealOfferQuery.startDate !== undefined)
    match["startDate"] = { $gte: mealOfferQuery.startDate };
  if (mealOfferQuery.endDate !== undefined)
    match["startDate"] = { $lte: mealOfferQuery.endDate };
  if (mealOfferQuery.price !== undefined)
    match["price"] = { $lte: mealOfferQuery.price };
  if (mealOfferQuery.sellerRating !== undefined)
    match["user.meanRating"] = { $gte: mealOfferQuery.sellerRating };
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
        allergensVerified: 1,
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
