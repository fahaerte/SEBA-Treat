import React from "react";
import { PageHeading } from "../../components";
import { MealOfferUpdate } from "../../components/MealOffers/MealOfferUpdate";

const EditMeal = () => {
  return (
    <>
      <PageHeading>
        <u>Edit</u> your meal
      </PageHeading>
      <MealOfferUpdate />
    </>
  );
};

export default EditMeal;
