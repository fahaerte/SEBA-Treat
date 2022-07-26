import { EMealAllergen, EMealCategory } from "@treat/lib-common";
import { TOptionValuePair } from "../components";

export const createAllergensOptions = () => {
  const allergenValues = Object.values(EMealAllergen);
  const allergens: TOptionValuePair[] = [];
  allergenValues.forEach((allergen) =>
    allergens.push({ value: allergen, label: allergen })
  );
  // console.log(Object.values(EMealAllergen));
  return allergens;
};

export const createCategoriesOptions = () => {
  const categoryValues = Object.values(EMealCategory);
  const categories: TOptionValuePair[] = [];
  categoryValues.forEach((category) =>
    categories.push({ value: category, label: category })
  );
  return categories;
};
