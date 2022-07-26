import React, { useState } from "react";
import {
  Container,
  dangerToast,
  Form,
  FormHelper,
  IFormRow,
  PageHeading,
  Row,
  successToast,
  TOptionValuePair,
} from "../../components";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { EMealAllergen, EMealCategory, IMealOffer } from "@treat/lib-common";
import {
  createMealOffer,
  CreateMealOfferArgs,
  getMealOffer,
} from "../../api/mealApi";
import { useMutation, useQuery } from "react-query";
import { getCookie } from "../../utils/auth/CookieProvider";
import { MealOfferUpdate } from "../../components/MealOffers/MealOfferUpdate";

interface IMealOfferForm
  extends Omit<IMealOffer, "allergens" | "categories" | "_id" | "user"> {
  allergens: TOptionValuePair[];
  categories: TOptionValuePair[];
}

/**
 * TODO:
 * - Image upload
 * - Redirect to detail page on success
 */
const EditMeal = () => {
  const userId = getCookie("userId");
  const token = getCookie("token");

  const { mealOfferId } = useParams();
  const navigate = useNavigate();

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
