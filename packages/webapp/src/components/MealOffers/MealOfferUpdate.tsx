import React, { useEffect, useState } from "react";
import {
  FormHelper,
  IFormRow,
  Form,
  dangerToast,
  SkeletonSquare,
  TOptionValuePair,
  successToast,
  Typography,
  Button,
} from "../ui";
import { EMealAllergen, EMealCategory } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";
import { useMutation, useQuery } from "react-query";
// import { getUser } from "../../api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  // createMealOffer,
  // CreateMealOfferArgs,
  getMealOffer,
  updateMealOffer,
  deleteMealOffer,
  IMealOfferForm,
} from "../../api/mealApi";
// import { time } from "faker";
import { AxiosError } from "axios";

export const MealOfferUpdate = () => {
  const userId = getCookie("userId");

  const { mealOfferId } = useParams();
  const navigate = useNavigate();

  const {
    data: mealOffer,
    isSuccess: mealOfferLoaded,
    isLoading: mealOfferIsLoading,
    isError: mealOfferError,
  } = useQuery("getMealOffer", () => getMealOffer(mealOfferId as string), {
    onSuccess: (response) => {
      if (response.reservations.length) {
        dangerToast({
          message:
            "You can't edit this meal anymore because someone already reserved it.",
        });
        navigate(`/meals/${mealOfferId}`);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        dangerToast({
          message: error.response.data.message,
        });
      } else {
        dangerToast({
          message: "Unexpected server error. The meal could not be loaded.",
        });
      }
    },
  });

  const [formElements, setFormElements] = useState<IFormRow<IMealOfferForm>[]>(
    []
  );

  const createAllergensOptions = () => {
    const allergenValues = Object.values(EMealAllergen);
    const allergens: TOptionValuePair[] = [];
    allergenValues.forEach((allergen) =>
      allergens.push({ value: allergen, label: allergen })
    );
    return allergens;
  };

  const createDefaultAllergensOptions = (defaultAllergens: string[]) => {
    const allergenValues = Object.values(EMealAllergen);
    const defaultAllergensOptions: TOptionValuePair[] = [];
    allergenValues.forEach((allergen) => {
      if (defaultAllergens.includes(allergen)) {
        defaultAllergensOptions.push({ value: allergen, label: allergen });
      }
    });
    return defaultAllergensOptions;
  };

  const createCategoriesOptions = () => {
    const categoryValues = Object.values(EMealCategory);
    const categories: TOptionValuePair[] = [];
    categoryValues.forEach((category) =>
      categories.push({ value: category, label: category })
    );
    return categories;
  };

  const createDefaultCategoriesOptions = (defaultCategories: string[]) => {
    const categoryValues = Object.values(EMealCategory);
    const defaultCategoriesOptions: TOptionValuePair[] = [];
    categoryValues.forEach((category) => {
      if (defaultCategories.includes(category)) {
        defaultCategoriesOptions.push({ value: category, label: category });
      }
    });
    return defaultCategoriesOptions;
  };

  useEffect(() => {
    if (mealOfferLoaded) {
      const elements: IFormRow<IMealOfferForm>[] = [
        [
          FormHelper.createInput({
            formKey: "title",
            label: "Title of your offer",
            defaultValue: mealOffer.title,
            props: {
              type: "text",
            },
          }),
          FormHelper.createFileInput({
            formKey: "image",
            label: "Upload an image for your meal",
            props: {
              fileType: "img/*",
              multiple: false,
            },
          }),
        ],

        FormHelper.createTextArea({
          formKey: "description",
          label: "Describe your offer.",
          defaultValue: mealOffer.description,
          props: {
            rows: 3,
            sendWithNewLines: true,
          },
          rules: {
            maxLength: {
              value: 1000,
            },
            minLength: {
              value: 5,
            },
          },
        }),

        [
          FormHelper.createInput({
            formKey: "portions",
            label: "Number of portions",
            defaultValue: mealOffer.portions,
            props: {
              type: "number",
            },
            rules: {
              max: {
                value: 150,
                message: "We doubt that you have so many meals, sorry!",
              },
            },
          }),
          FormHelper.createInput({
            formKey: "price",
            label: "Price in virtual credits",
            defaultValue: mealOffer.price,
            props: {
              type: "number",
            },
            rules: {
              max: {
                value: 200,
                message:
                  "Even if you added caviar and truffles, please make it affordable.",
              },
            },
          }),
        ],

        [
          FormHelper.createTagSelect({
            formKey: "allergens",
            label: "Allergens",
            defaultValue: createDefaultAllergensOptions(mealOffer.allergens),
            props: {
              autocompleteOptions: createAllergensOptions(),
            },
          }),
          FormHelper.createTagSelect({
            formKey: "categories",
            label: "Category Labels",
            defaultValue: createDefaultCategoriesOptions(mealOffer.categories),
            props: {
              autocompleteOptions: createCategoriesOptions(),
            },
          }),
        ],

        [
          FormHelper.createDatePicker({
            formKey: "startDate",
            label: "Starting date of your offer",
            defaultValue: mealOffer.startDate.slice(0, -8),
            props: {
              type: "datetime-local",
            },
          }),
          FormHelper.createDatePicker({
            formKey: "endDate",
            label: "End date of your offer",
            defaultValue: mealOffer.endDate.slice(0, -8),
            props: {
              type: "datetime-local",
            },
          }),
        ],

        FormHelper.createTextArea({
          formKey: "pickUpDetails",
          label: "Add pick up details if necessary, e.g. which floor or c/o",
          defaultValue: mealOffer.pickUpDetails,
          props: {
            sendWithNewLines: true,
            rows: 2,
          },
        }),

        FormHelper.createRadioCheckSwitch({
          formKey: "allergensVerified",
          label: "Have you checked your meal for allergens?",
          defaultValue: mealOffer.allergensVerified as boolean,
          props: {
            type: "switch",
          },
        }),
      ];

      setFormElements(elements);
    } else if (mealOfferError) {
      dangerToast({ message: "Could not get meal data" });
      navigate(`/meals/${mealOfferId}`);
    }
  }, [mealOffer, setFormElements]);

  const { mutate: updateMealMutation, isLoading: updateMealMutationIsLoading } =
    useMutation(
      (updatedMealOffer: FormData) =>
        updateMealOffer(mealOfferId as unknown as string, updatedMealOffer),
      {
        onSuccess: (response) => {
          successToast({ message: "Your meal offer has been updated." });
          navigate(`/meals/${mealOfferId}`);
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response) {
            dangerToast({
              message: error.response.data.message,
            });
          } else {
            dangerToast({
              message:
                "Unexpected server error. The meal could not be updated.",
            });
          }
          navigate(`/meals/${mealOfferId}`);
        },
      }
    );

  const handleSubmit = (data: IMealOfferForm) => {
    if (userId) {
      const { categories, allergens } = data;

      const formData = new FormData();
      if (data.title) {
        formData.append("title", data.title);
      } else {
        formData.append("title", mealOffer.title);
      }
      if (data.description) {
        formData.append("description", data.description);
      } else {
        formData.append("description", mealOffer.description);
      }
      if (data.image) {
        formData.append("image", data.image[0]);
      }
      if (data.startDate) {
        formData.append("startDate", new Date(data.startDate).toISOString());
      } else {
        formData.append("startDate", mealOffer.startDate);
      }
      if (data.endDate) {
        formData.append("endDate", new Date(data.endDate).toISOString());
      } else {
        formData.append("endDate", mealOffer.endDate.slice(0, -8));
      }
      if (data.pickUpDetails) {
        formData.append("pickUpDetails", data.pickUpDetails);
      } else {
        if (mealOffer.pickUpDetails) {
          formData.append("pickUpDetails", mealOffer.pickUpDetails);
        }
      }
      if (data.price) {
        formData.append("price", data.price.toString());
      } else {
        formData.append("price", mealOffer.price);
      }
      if (data.portions) {
        formData.append("portions", data.portions.toString());
      } else {
        formData.append("portions", mealOffer.portions);
      }
      formData.append("allergensVerified", data.allergensVerified.toString());
      if (categories) {
        categories.forEach((category, index) =>
          formData.append(`categories[${index}]`, category.value)
        );
      } else {
        formData.append("categories", mealOffer.categories);
      }
      if (allergens) {
        allergens.forEach((allergen, index) =>
          formData.append(`allergens[${index}]`, allergen.value)
        );
      } else {
        formData.append("categories", mealOffer.categories);
      }

      updateMealMutation(formData);
    } else {
      dangerToast({
        message: "Only the creator of this meal can edit it. Please log in.",
      });
      navigate("/login");
    }
  };

  const { mutate: deleteMealMutation, isLoading: deleteMealMutationIsLoading } =
    useMutation(() => deleteMealOffer(mealOfferId as unknown as string), {
      onSuccess: (response) => {
        successToast({ message: "Your meal offer has been deleted." });
        navigate(`/meals/my-offers`);
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          dangerToast({
            message: error.response.data.message,
          });
        } else {
          dangerToast({
            message: "Unexpected server error. The meal could not be deleted.",
          });
        }
        navigate(`/meals/${mealOfferId}`);
      },
    });

  const handleDeleteClick = () => {
    deleteMealMutation();
  };

  return (
    <>
      {mealOfferIsLoading ? (
        <Typography>Meal is loading...</Typography>
      ) : (
        <>
          {mealOfferLoaded && formElements.length > 0 ? (
            <>
              <Form<IMealOfferForm>
                className={"mt-5"}
                elements={formElements}
                onSubmit={(data) => handleSubmit(data)}
                submitButton={{ children: "Update meal" }}
                isLoading={updateMealMutationIsLoading}
                abortButton={{
                  children: "Cancel",
                  color: "secondary",
                  className: "ms-3",
                  outline: true,
                  onClick: () => navigate("/"),
                }}
              />
              <Button
                className={"px-3 mt-3"}
                onClick={handleDeleteClick}
                color={"danger"}
              >
                Delete meal
              </Button>
            </>
          ) : (
            <>
              <SkeletonSquare />
              <SkeletonSquare />
              <SkeletonSquare />
            </>
          )}
        </>
      )}
    </>
  );
};
