import MealCategorySchema from "./mealCategory.model";
import MealCategory from "./mealCategory.interface";
import { Service } from "typedi";

@Service()
class MealCategoryService {
  private mealCategory = MealCategorySchema;

  public async create(
    newMealCategory: MealCategory
  ): Promise<MealCategory | Error> {
    return await this.mealCategory.create(newMealCategory);
  }

  public async getMealCategories(): Promise<MealCategory[] | Error> {
    return await this.mealCategory.find();
  }
}

export default MealCategoryService;
