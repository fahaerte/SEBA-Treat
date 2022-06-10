import { model, Model, Schema, Document } from "mongoose";
import { IMealOffer } from "@treat/lib-common";

interface IMealOfferModel extends IMealOffer, Document {}

const SMealOffer = new Schema<IMealOfferModel>({
  categories: { type: [Schema.Types.ObjectId], ref: "MealCategory" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("MealOffer", SMealOffer);
