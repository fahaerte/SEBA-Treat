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

  const [formElements, setFormElements] = useState<IFormRow<IMealOfferForm>[]>(
    []
  );

  const { data: mealOffer, isLoading: mealOfferIsLoading } = useQuery(
    "getMealOffer",
    () => getMealOffer(mealOfferId as string),
    {
      onSuccess: (response) => {
        console.log(response);

        const elements: IFormRow<IMealOfferForm>[] = [
          [
            FormHelper.createInput({
              formKey: "title",
              label: "Title of your offer",
              defaultValue: response.title,
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
            // FormHelper.createFileInput({
            //   formKey: "profile-pictures",
            //   label: "Upload profile-pictures for your meal",
            //   props: {
            //     fileType: "profile-pictures/*",
            //     multiple: true,
            //   },
            //   rules: {
            //     required: {
            //       value: true,
            //       message: "Please provide profile-pictures, so others can can get hungry!",
            //     },
            //   },
            // }),
          ],

          FormHelper.createTextArea({
            formKey: "description",
            label: "Describe your offer.",
            defaultValue: response.description,
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
              defaultValue: response.portions,
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
              defaultValue: response.price,
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
              defaultValue: response.allergens,
              props: {
                autocompleteOptions: createAllergensOptions(),
              },
            }),
            FormHelper.createTagSelect({
              formKey: "categories",
              label: "Category Labels",
              defaultValue: response.categories,
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
              defaultValue: response.startDate,
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
              defaultValue: response.endDate,
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
            defaultValue: response.pickUpDetails,
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
      },
    }
  );

  const createOfferMutation = useMutation(
    ({ mealOffer }: CreateMealOfferArgs) => createMealOffer({ mealOffer }),
    {
      onSuccess: (response) => {
        successToast({ message: "Your meal offer has been created!" });
        const mealId = response.data._id;
        navigate("/");
      },
      onError: () => dangerToast({ message: "Sorry, something went wrong." }),
    }
  );

  const createAllergensOptions = () => {
    const allergenValues = Object.values(EMealAllergen);
    const allergens: TOptionValuePair[] = [];
    allergenValues.forEach((allergen) =>
      allergens.push({ value: allergen, label: allergen })
    );
    // console.log(Object.values(EMealAllergen));
    return allergens;
  };

  const createCategoriesOptions = () => {
    const categoryValues = Object.values(EMealCategory);
    const categories: TOptionValuePair[] = [];
    categoryValues.forEach((category) =>
      categories.push({ value: category, label: category })
    );
    return categories;
  };

  const handleSubmit = (data: IMealOfferForm) => {
    if (userId && token) {
      const { startDate, endDate, categories, allergens } = data;
      const categoryValues: string[] = [];
      categories.forEach((category) => categoryValues.push(category.value));

      const allergenValues: string[] = [];
      allergens.forEach((allergen) => allergenValues.push(allergen.value));

      const newOffer: Omit<
        IMealOffer,
        "_id" | "rating" | "transactionFee" | "reservations"
      > = {
        user: userId,
        ...data,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        categories: categoryValues,
        allergens: allergenValues,
      };
      createOfferMutation.mutate({ mealOffer: newOffer });
    } else {
      dangerToast({ message: "User not authenticated!" });
      navigate("/login");
    }
  };

  return (
    <>
      {userId ? (
        <>
          {mealOfferIsLoading ? (
            <>
              <PageHeading className={"pt-5"}>
                Meal <u>is loading...</u>
              </PageHeading>
            </>
          ) : (
            <>
              {formElements && (
                <>
                  <PageHeading className={"pt-5"}>
                    <u>Edit</u> your meal
                  </PageHeading>
                  <Form<IMealOfferForm>
                    className={"mt-5"}
                    elements={formElements}
                    onSubmit={handleSubmit}
                    submitButton={{ children: "Update your meal" }}
                    isLoading={createOfferMutation.isLoading}
                    abortButton={{
                      children: "Cancel",
                      color: "secondary",
                      className: "ms-3",
                      outline: true,
                      onClick: () => navigate("/"),
                    }}
                  />
                </>
              )}
            </>
          )}
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default EditMeal;
