import { Form, FormHelper, IFormRow } from "../ui";
import { IMealFilter } from "@treat/lib-common";
import React from "react";

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
      label: "Maximum Distance",
      props: {
        type: "number",
      },
    }),
  ],
  [
    FormHelper.createInput({
      formKey: "allergen",
      label: "Allergene",
      props: {
        type: "text",
      },
    }),
  ],
  [
    FormHelper.createInput({
      formKey: "category",
      label: "Category",
      props: {
        type: "text",
      },
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
