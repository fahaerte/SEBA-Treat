import MealCategory from "./mealCategory.interface";
import { model, Schema } from "mongoose";

const MealCategorySchema = new Schema<MealCategory>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<MealCategory>("MealCategory", MealCategorySchema);
