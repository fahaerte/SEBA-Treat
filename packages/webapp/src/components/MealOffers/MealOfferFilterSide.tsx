import { Form, FormHelper, IFormRow } from "../ui";
import { IMealFilter } from "@treat/lib-common";
import React from "react";
import EMealCategory from "@treat/lib-common/lib/enums/EMealCategory";
import EMealAllergen from "@treat/lib-common/lib/enums/EMealAllergen";

const otherFilterElements: IFormRow<IMealFilter>[] = [
  [
    FormHelper.createInput({
      formKey: "portions",
      label: "Portions",
      props: {
        type: "number",
      },
    }),
  ],
  [
    FormHelper.createInput({
      formKey: "minSellerRating",
      label: "Minimum Seller Rating",
      props: {
        type: "number",
      },
    }),
  ],
  [
    FormHelper.createInput({
      formKey: "maxPrice",
      label: "Maximum Price",
      props: {
        type: "number",
      },
    }),
  ],
  [
    FormHelper.createInput({
      formKey: "maxDistance",
      label: "Max. Distance (km)",
      props: {
        type: "number",
      },
      defaultValue: 3,
    }),
  ],
  [
    FormHelper.createSelect({
      formKey: "allergen",
      label: "Allergen",
      options: [
        new Option("", ""),
        new Option(EMealAllergen.GLUTEN, EMealAllergen.GLUTEN),
      ],
    }),
  ],
  [
    FormHelper.createSelect({
      formKey: "category",
      label: "Category",
      options: [
        new Option("", ""),
        new Option(EMealCategory.VEGAN, EMealCategory.VEGAN),
        new Option(EMealCategory.VEGETARIAN, EMealCategory.VEGETARIAN),
      ],
    }),
  ],
];

const MealOfferFilterSide = ({
  currentFilter,
  handleFiltering,
}: {
  currentFilter: IMealFilter;
  handleFiltering: (filter: IMealFilter) => void;
}) => {
  return (
    <Form<IMealFilter>
      elements={otherFilterElements}
      onSubmit={handleFiltering}
    />
  );
};

export default MealOfferFilterSide;
