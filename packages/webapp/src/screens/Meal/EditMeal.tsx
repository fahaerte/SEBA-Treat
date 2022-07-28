import React from "react";
import { PageHeading, TOptionValuePair } from "../../components";
import { Navigate } from "react-router-dom";
import { IMealOffer } from "@treat/lib-common";

import { getCookie } from "../../utils/auth/CookieProvider";
import { MealOfferUpdate } from "../../components/MealOffers/MealOfferUpdate";

const EditMeal = () => {
  return (
    <>
      <PageHeading className={"pt-5"}>
        <u>Edit</u> your meal
      </PageHeading>
      <MealOfferUpdate />
    </>
  );
};

export default EditMeal;
