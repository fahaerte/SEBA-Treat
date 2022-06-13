import { model, Schema, Document } from "mongoose";
import { IMealCategory } from "@treat/lib-common";

interface IMealCategoryModel extends IMealCategory, Document {}

const SMealCategory = new Schema<IMealCategoryModel>({
  label: { type: String, required: true },
});

export default model("MealCategory", SMealCategory);
