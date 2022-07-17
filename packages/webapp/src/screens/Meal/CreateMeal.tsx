import React from "react";
import {Form, FormHelper, IFormRow, TOptionValuePair} from "../../components";
import {Navigate} from "react-router-dom";
import {useAuthContext} from "../../utils/auth/AuthProvider";
import {IMealOffer, EMealAllergen, EMealCategory} from "@treat/lib-common";

/**
 * TODO:
 * - fetch allergies
 * - fetch categories
 * - Create Form
 * -
 */
const CreateMeal = () => {
  const {userId} = useAuthContext();
  const createAllergensOptions = (): TOptionValuePair[] => {
    const allergenValues = Object.values(EMealAllergen);
    const allergens: TOptionValuePair[] = [];
    allergenValues.forEach((allergen) =>
        allergens.push({value: allergen, label: allergen})
    );
    console.log(Object.values(EMealAllergen));
    return allergens;
  };
  const createCategoriesOptions = () => {
    const categoryValues = Object.values(EMealCategory);
    const categories: TOptionValuePair[] = [];
    categoryValues.forEach((category) =>
        categories.push({value: category, label: category})
    );
    console.log(Object.values(EMealCategory));
    return categories;
  };

  const elements: IFormRow<IMealOffer>[] = [
    [
      FormHelper.createInput({
        formKey: "title",
        label: "Title of your offer",
        defaultValue: "Pizza Margeritha",
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
      //   formKey: "images",
      //   label: "Upload images for your meal",
      //   props: {
      //     fileType: "images/*",
      //     multiple: true,
      //   },
      //   rules: {
      //     required: {
      //       value: true,
      //       message: "Please provide images, so others can can get hungry!",
      //     },
      //   },
      // }),
    ],

    FormHelper.createTextArea({
      formKey: "description",
      label: "Describe your offer.",
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
        defaultValue: 1,
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
        label: "Price",
        defaultValue: 15,
        props: {
          type: "number",
        },
        rules: {
          max: {
            value: 200,
            message:
                "Even if you added caviar and truffles, please make it affordable",
          },
        },
      }),
    ],
    [
      FormHelper.createTagSelect({
        formKey: "allergens",
        label: "Allergens",
        props: {
          autocompleteOptions: createAllergensOptions()
        }
      }),
      FormHelper.createTagSelect({
        formKey: "categories",
        label: "Category Labels",
        rules: {
          required: {
            value: true,
            message: "You have to indicate at least one category for your offer."
          }
        },
        props: {
          autocompleteOptions: createCategoriesOptions()
        }
      })
    ],
    [
      FormHelper.createDatePicker({
        formKey: "startDate",
        label: "Starting date of your offer",
        props: {
          type: "datetime-local",
        },
      }),
      FormHelper.createDatePicker({
        formKey: "endDate",
        label: "End date of your offer",
      }),
    ],
    FormHelper.createTextArea({
      formKey: "pickUpDetails",
      label: "Add pick up details if necessary, e.g. which floor or c/o",
      props: {
        sendWithNewLines: true,
        rows: 2,
      },
    }),

    FormHelper.createRadioCheckSwitch({
      formKey: "alergensVerified",
      label: "Have you checked your meal for allergens?",
      props: {
        type: "switch",
      },
    }),
  ];

  const handleSubmit = (data: IMealOffer) => {
    console.log(data);
  };

  return (
      <>
        {userId ? (
            <Form<IMealOffer>
                elements={elements}
                onSubmit={handleSubmit}
                formTitle={"Having leftovers? Create an offer!"}
                resetOnSubmit
                submitButton={{children: "Publish your offer!"}}
                abortButton={{
                  children: "Cancel",
                  color: "secondary",
                  className: "ms-3",
                  outline: true,
                }}
            />
        ) : (
            <Navigate to={"/"}/>
        )}
      </>
  );
};

export default CreateMeal;
