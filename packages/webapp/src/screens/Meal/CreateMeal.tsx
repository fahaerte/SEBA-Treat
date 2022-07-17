import React from "react";
import { Typography } from "../../components";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../utils/auth/AuthProvider";

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
