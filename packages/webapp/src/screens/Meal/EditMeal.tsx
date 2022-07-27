import React from "react";
import { PageHeading, TOptionValuePair } from "../../components";
import { Navigate } from "react-router-dom";
import { IMealOffer } from "@treat/lib-common";

import { getCookie } from "../../utils/auth/CookieProvider";
import { MealOfferUpdate } from "../../components/MealOffers/MealOfferUpdate";

// interface IMealOfferForm
//   extends Omit<IMealOffer, "allergens" | "categories" | "_id" | "user"> {
//   allergens: TOptionValuePair[];
//   categories: TOptionValuePair[];
// }

/**
 * TODO:
 * - Image upload
 * - Redirect to detail page on success
 */
const EditMeal = () => {
  const userId = getCookie("userId");

  return (
    <>
      {userId ? (
        <>
          <PageHeading className={"pt-5"}>
            <u>Edit</u> your meal
          </PageHeading>
          <MealOfferUpdate />
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default EditMeal;
