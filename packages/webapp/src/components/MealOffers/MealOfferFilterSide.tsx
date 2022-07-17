import { Button, Form, FormHelper, IFormRow, InputControlled, SelectControlled } from "../ui";
import { IMealFilter } from "@treat/lib-common";
import React from "react";
import EMealCategory from "@treat/lib-common/lib/enums/EMealCategory";
import EMealAllergen from "@treat/lib-common/lib/enums/EMealAllergen";


const MealOfferFilterSide = (
  {
    handleChangedFilter,
    distance,
    maxPrice,
    portions,
    sellerRating,
    category,
    allergen
  }: {
    handleChangedFilter: (event: any) => void;
    distance: number | undefined;
    maxPrice: number | undefined;
    portions: number | undefined;
    sellerRating: number | undefined;
    category: string | undefined;
    allergen: string | undefined;
  }) => {
  return (
    <div>
      <InputControlled type={"number"} value={String(distance)} label={"Max. Distance"} onChange={handleChangedFilter}/>
      <InputControlled type={"number"} value={String(maxPrice)} label={"Max. Price"} onChange={handleChangedFilter}/>
      <InputControlled type={"number"} value={String(portions)} label={"Portions"} onChange={handleChangedFilter}/>
      <SelectControlled
        label={"Min. Seller Rating"}
        value={String(sellerRating)}
        onChange={handleChangedFilter}
      >
        <option value={undefined}>Choose</option>
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </SelectControlled>
      <SelectControlled
        label={"Category"}
        value={category as string}
        onChange={handleChangedFilter}
      >
        <option value={undefined}>None</option>
        <option value={EMealCategory.VEGAN}>{EMealCategory.VEGAN}</option>
        <option value={EMealCategory.VEGETARIAN}>{EMealCategory.VEGETARIAN}</option>
      </SelectControlled>
      <SelectControlled
        label={"Allergens"}
        value={allergen as string}
        onChange={handleChangedFilter}
      >
        <option value={undefined}>None</option>
        <option value={EMealAllergen.GLUTEN}>{EMealAllergen.GLUTEN}</option>
      </SelectControlled>
    </div>
  );
};

export default MealOfferFilterSide;
