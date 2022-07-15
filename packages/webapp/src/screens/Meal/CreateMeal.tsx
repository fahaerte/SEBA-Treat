import React from "react";
import { FormHelper, IFormRow, Form, Typography } from "../../components";
import { IMealOffer } from "@treat/lib-common";
import { useAuthContext } from "../../utils/AuthProvider";
import { Navigate } from "react-router-dom";

/**
 * TODO:
 * - fetch allergies
 * - fetch categories
 * - Create Form
 * -
 */
const CreateMeal = () => {
  const { userId } = useAuthContext();
  return (
    <>
      {userId ? (
        <Typography variant={"h1"}>Create Meal</Typography>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default CreateMeal;
