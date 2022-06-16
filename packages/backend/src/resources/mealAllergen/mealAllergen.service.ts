import {Service} from "typedi";
import MealAllergenSchema from "./mealAllergen.model";
import MealAllergen from "./mealAllergen.interface";

@Service()
class MealAllergenService {
    private mealAllergen = MealAllergenSchema;

    public async create(
        newMealAllergen: MealAllergen,
    ): Promise<MealAllergen | Error> {
        return await this.mealAllergen.create(newMealAllergen);
    }
}

export default MealAllergenService;