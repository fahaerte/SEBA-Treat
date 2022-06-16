import MealOfferSchema from "../mealOffer/mealOffer.model";
import MealOffer from "../../resources/mealOffer/mealOffer.interface";
import MealOfferNotFoundException from "../../utils/exceptions/mealOfferNotFound.exception";
import mongoose from "mongoose";

import User from "../user/user.interface";
import {Service} from "typedi";
import MealCategoryService from "../mealCategory/mealCategory.service";

@Service()
class MealOfferService {
    private mealOffer = MealOfferSchema;

    constructor(private readonly MealCategoryService: MealCategoryService) {
    }

    public async create(
        newMealOffer: MealOffer,
        user: User
    ): Promise<MealOffer | Error> {
        newMealOffer.user = user._id;
        return await this.mealOffer.create(newMealOffer);
    }

    public async getMealOffer(mealOfferId: string): Promise<MealOffer | Error> {
        const mealOffer = await this.mealOffer.findById(new mongoose.Types.ObjectId(mealOfferId));
        if (!mealOffer) {
            throw new MealOfferNotFoundException(mealOfferId);
        }
        return mealOffer;
    }

    // public async getMealsByUser(user: User): Promise<MealOffer[] | Error> {
    //
    // }

    public async deleteMealOffer(mealOfferId: string, user: User): Promise<void | Error> {
        const mealOffer = await this.getMealOffer(mealOfferId) as MealOffer;
        if (String(mealOffer.user) === String(user._id)) {
            await this.mealOffer.findByIdAndDelete(mealOfferId);
        } else {
            console.log()
        }
    }
}

export default MealOfferService;