import React, { useState } from "react";
import {
  Button,
  dangerToast,
  Form,
  FormHelper,
  Icon,
  IFormRow,
  PageHeading,
  successToast,
  Typography,
  useModalInfo,
  warningToast,
} from "../../components";
import { Navigate, useNavigate } from "react-router-dom";
import { createMealOffer } from "../../api/mealApi";
import { useMutation } from "react-query";
import { getCookie } from "../../utils/auth/CookieProvider";
import {
  createCategoriesOptions,
  createAllergensOptions,
} from "../../utils/createMealValueArrays";
import { TFormFieldError } from "../../components/ui/Forms/_interfaces/TFormFieldError";
import IMealOfferForm from "../../types/interfaces/mealOfferForm.interface";
import { AxiosError } from "axios";

/**
 * TODO:
 * - Image upload
 * - Switch for allergenVerified
 */
const CreateMeal = () => {
  const navigate = useNavigate();
  const modalAllergensInfo = useModalInfo({ close: () => undefined });
  const userId = getCookie("userId");
  const [formError, setFormError] = useState<
    TFormFieldError<IMealOfferForm>[] | undefined
  >();

  const elements: IFormRow<IMealOfferForm>[] = [
    [
      FormHelper.createInput({
        formKey: "title",
        label: "Title of your offer",
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
        rules: {
          required: {
            value: true,
            message: "Please provide an image, so others can get hungry!",
          },
        },
      }),
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
        label: "Price in virtual credits",
        defaultValue: 15,
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
        props: {
          autocompleteOptions: createAllergensOptions(),
        },
      }),
      FormHelper.createRadioCheckSwitch({
        formKey: "allergensVerified",
        label: "Have you checked your meal for allergens?",
        wrapperClasses: "align-items-end d-flex",

        defaultValue: false,
        props: {
          type: "switch",
        },
      }),
    ],
    [
      FormHelper.createTagSelect({
        formKey: "categories",
        label: "Category Labels",
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
      FormHelper.createTextArea({
        formKey: "pickUpDetails",
        label: "Add pick up details if necessary, e.g. which floor or c/o",
        props: {
          sendWithNewLines: true,
        },
      }),
    ],
    [
      FormHelper.createDatePicker({
        formKey: "startDate",
        label: "Starting date of your offer",
        rules: {
          required: {
            value: true,
            message: "Please indicate from when your offer can be picked up.",
          },
          min: {
            value: new Date().toISOString().split(".")[0].slice(0, -3),
            message: "The starting day cannot be in the past.",
          },
        },
        props: {
          type: "datetime-local",
        },
      }),
      FormHelper.createDatePicker({
        formKey: "endDate",
        label: "End date of your offer",
        rules: {
          required: {
            value: true,
            message: "Please indicate until when your offer can be picked up.",
          },
          min: {
            value: new Date().toISOString().split(".")[0].slice(0, -3),
            message: "The end date has to be later than the the current day.",
          },
        },
        props: {
          type: "datetime-local",
        },
      }),
    ],
  ];

  const createOfferMutation = useMutation(
    (formData: FormData) => createMealOffer(formData),
    {
      onSuccess: (response) => {
        successToast({ message: "Your meal offer has been created!" });
        const mealId = response.data.data._id;
        console.log(response);
        navigate(`/mealOffers/${mealId}`);
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          dangerToast({
            message: error.response.data.message,
          });
        } else {
          dangerToast({
            message: "Unexpected server error. The meal could not be created.",
          });
        }
        navigate(`/mealOffers`);
      },
    }
  );

  const handleSubmit = (data: IMealOfferForm) => {
    if (new Date(data.startDate).getTime() > new Date(data.endDate).getTime()) {
      setFormError([
        {
          fieldName: "endDate",
          error: {
            type: "invalid",
            message: "End Date has to be later than starting date!",
          },
        },
      ]);
    }
    if (userId && !formError) {
      const { categories, allergens } = data;
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);
      formData.append("endDate", new Date(data.endDate).toISOString());
      formData.append("startDate", new Date(data.startDate).toISOString());
      formData.append("price", data.price.toString());
      formData.append("portions", data.portions.toString());
      formData.append("allergensVerified", data.allergensVerified.toString());
      categories.forEach((category, index) =>
        formData.append(`categories[${index}]`, category.value)
      );
      allergens.forEach((allergen, index) =>
        formData.append(`allergens[${index}]`, allergen.value)
      );

      createOfferMutation.mutate(formData);
    } else {
      dangerToast({ message: "User not authenticated!" });
      navigate("/login");
    }
  };

  return (
    <>
      <PageHeading className={"mb-4"}>
        Having leftovers? Create an <u>offer!</u>
      </PageHeading>
      <Typography>
        Did you know, that approximately <u>12 million tons of food</u> is
        thrown away every year in Germany?
      </Typography>
      <Typography color={"secondary"} variant={"h3"} className={"mb-4"}>
        Be part of tomorrow`&apos;`s change and offer your meals on <u>TREAT</u>
      </Typography>
      {userId ? (
        <>
          {modalAllergensInfo.markup}
          <Form<IMealOfferForm>
            elements={elements}
            onSubmit={handleSubmit}
            submitButton={{ children: "Publish your offer!" }}
            isLoading={createOfferMutation.isLoading}
            formFieldErrors={formError}
            abortButton={{
              children: "Cancel",
              color: "secondary",
              className: "ms-3",
              outline: true,
              onClick: () => navigate("/"),
            }}
          >
            <Typography variant={"h3"} className={"fw-normal"}>
              <Icon type={"infoCircle"} /> On top of the price you have set for
              your meal, we will charge the buyer an additional 7% service fee
              based on the price you have set.
            </Typography>
            <Button
              className={"mb-3"}
              color={"warning"}
              onClick={() => modalAllergensInfo.open(true)}
            >
              <Icon type={"exclamationTriangle"} /> Allergens
            </Button>
            <br />
          </Form>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default CreateMeal;
