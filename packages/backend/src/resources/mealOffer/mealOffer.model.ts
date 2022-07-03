import { Model, model, Schema, Types } from "mongoose";
import { MealOfferDocument } from "./mealOffer.interface";
import { MealReservationSchema } from "../mealReservation/mealReservation.model";
import MealCategory from "../mealCategory/mealCategory.enum";
import MealAllergen from "../mealAllergen/mealAllergen.enum";

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
        enum: Object.values(MealCategory),
        required: true,
      },
    ],
    allergens: [
      {
        type: String,
        enum: Object.values(MealAllergen),
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
      required: true,
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
  },
  { timestamps: true }
);

export interface MealOfferModel extends Model<MealOfferDocument> {
  findSentMealOfferRequests(userId: string): Promise<MealOfferDocument[]>;
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
      reservations: {
        $filter: {
          input: "$reservations",
          as: "reservation",
          cond: { $eq: ["$$reservation.buyer", userId] },
        },
      },
    }
  ).exec();
};

export default model<MealOfferDocument, MealOfferModel>(
  "MealOffer",
  MealOfferSchema
);
