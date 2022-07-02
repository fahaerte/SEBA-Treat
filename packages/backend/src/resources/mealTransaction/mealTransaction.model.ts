import {model, Schema, Types} from "mongoose";
import MealTransaction from "./mealTransaction.interface";
import MealTransactionState from "./mealTransactionState.enum";
import MealTransactionStateEnum from "./mealTransactionState.enum";

const MealTransactionSchema = new Schema<MealTransaction>(
    {
        mealReservation: {
            type: Types.ObjectId,
            required: true,
        },
        senderAccount: {
            type: Types.ObjectId,
            required: true,
        },
        receiverAccount: {
            type: Types.ObjectId,
            required: true,
        },
        transactionState: {
            type: String,
            enum: Object.keys(MealTransactionStateEnum),
            required: true,
            default: MealTransactionState.PENDING,
        },
        buyerRating: {
            type: Number,
            min: 0,
            max: 5,
        },
        sellerRating: {
            type: Number,
            min: 0,
            max: 5,
        },
    },
    {timestamps: true}
);

export default model<MealTransaction>("MealTransaction", MealTransactionSchema);
