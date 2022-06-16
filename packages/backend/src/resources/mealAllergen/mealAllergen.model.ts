import {model, Schema} from "mongoose";
import MealCategory from "../mealCategory/mealCategory.interface";
import MealAllergen from "./mealAllergen.interface";

const MealAllergenSchema = new Schema<MealCategory>(
    {
        title: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

export default model<MealAllergen>("MealAllergen", MealAllergenSchema);