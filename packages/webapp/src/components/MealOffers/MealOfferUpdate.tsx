import React, { useEffect, useState } from "react";
import {
  FormHelper,
  IFormRow,
  Form,
  dangerToast,
  Icon,
  SkeletonSquare,
  TOptionValuePair,
  successToast,
  Typography,
} from "../ui";
import { EMealAllergen, EMealCategory, IMealOffer } from "@treat/lib-common";
import { getCookie } from "../../utils/auth/CookieProvider";
import { useMutation, useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  createMealOffer,
  CreateMealOfferArgs,
  getMealOffer,
  updateMealOffer,
} from "../../api/mealApi";

// TODO: danger toast and redirect if meal already has reservations
// TODO: what todo with start date (forbid edit if meal has already started?)
// TODO: fix image upload

export const MealOfferUpdate = () => {
  const userId = getCookie("userId");
  const token = getCookie("token");

  const { mealOfferId } = useParams();
  const navigate = useNavigate();

  const {
    data: mealOffer,
    isSuccess: mealOfferLoaded,
    isLoading: mealOfferIsLoading,
    isError: mealOfferError,
  } = useQuery("getMealOffer", () => getMealOffer(mealOfferId as string), {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => {
      dangerToast({ message: "Could not get meal information" });
    },
  });

  interface IMealOfferForm
    extends Omit<IMealOffer, "allergens" | "categories" | "_id" | "user"> {
    allergens: TOptionValuePair[];
    categories: TOptionValuePair[];
  }

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
            rules: {
              required: {
                value: true,
                message: "You need to provide a title for your meal.",
              },
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
            required: {
              value: true,
              message: "Please add a short description!",
            },
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
            rules: {
              required: {
                value: true,
                message:
                  "You have to indicate at least one category for your offer.",
              },
            },
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
            rules: {
              required: {
                value: true,
                message:
                  "Please indicate from when your offer can be picked up.",
              },
            },
            props: {
              type: "datetime-local",
            },
          }),
          FormHelper.createDatePicker({
            formKey: "endDate",
            label: "End date of your offer",
            defaultValue: mealOffer.endDate.slice(0, -8),
            rules: {
              required: {
                value: true,
                message:
                  "Please indicate until when your offer can be picked up.",
              },
            },
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
          defaultValue: false,
          props: {
            type: "switch",
          },
        }),
      ];

      setFormElements(elements);
    } else if (mealOfferError) {
      dangerToast({ message: "Could not get meal data" });
      navigate(`/mealOffers/${mealOfferId}`);
    }
  }, [mealOffer, setFormElements]);

  const { mutate: updateMealMutation, isLoading: updateMealMutationIsLoading } =
    useMutation(
      (updatedMealOffer: FormData) =>
        updateMealOffer(mealOfferId as unknown as string, updatedMealOffer),
      {
        onSuccess: (response) => {
          successToast({ message: "Your meal offer has been created!" });
          navigate(`/mealOffers/${mealOfferId}`);
        },
        onError: () => dangerToast({ message: "Sorry, something went wrong." }),
      }
    );

  const handleSubmit = (updatedMealOffer: IMealOfferForm) => {
    console.log(updatedMealOffer);
    if (userId) {
      const { categories, allergens } = updatedMealOffer;

      const formData = new FormData();
      formData.append("title", updatedMealOffer.title);
      formData.append("description", updatedMealOffer.description);
      formData.append("image", updatedMealOffer.image);
      formData.append(
        "endDate",
        new Date(updatedMealOffer.endDate).toISOString()
      );
      formData.append(
        "startDate",
        new Date(updatedMealOffer.startDate).toISOString()
      );
      formData.append("price", updatedMealOffer.price.toString());
      formData.append("portions", updatedMealOffer.portions.toString());
      formData.append(
        "allergensVerified",
        updatedMealOffer.allergensVerified.toString()
      );
      categories.forEach((category, index) =>
        formData.append(`categories[${index}]`, category.value)
      );
      allergens.forEach((allergen, index) =>
        formData.append(`allergens[${index}]`, allergen.value)
      );

      updateMealMutation(formData);
    } else {
      dangerToast({
        message: "Only the creator of this meal can edit it. Please log in.",
      });
      navigate("/login");
    }
  };

  return (
    <>
      {mealOfferIsLoading ? (
        <Typography>Meal is loading...</Typography>
      ) : (
        <>
          {mealOfferLoaded && formElements.length > 0 ? (
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
