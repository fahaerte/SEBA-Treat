import { Model, model, Schema } from "mongoose";

export interface IMealCategory {
  label: string;
}

export const SMealCategory = new Schema({
  label: { type: String, required: true },
});

export const MMealCategory: Model<IMealCategory> = model(
  "MealCategory",
  SMealCategory
);
