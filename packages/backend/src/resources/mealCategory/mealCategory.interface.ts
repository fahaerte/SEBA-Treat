import {Document} from "mongoose";

export default interface MealCategory extends Document {
    title: string;
}