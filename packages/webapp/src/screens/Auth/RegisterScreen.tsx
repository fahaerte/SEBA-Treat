import React from "react";
import { Form, FormHelper, IFormRow } from "../../components";
import { IUser } from "@treat/lib-common";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { getStringFromIAddress } from "../../utils/getStringFromIAddress";
import { useMutation } from "react-query";
import { register } from "../../api/authApi";

export const RegisterScreen = () => {
  const userContext = useAuthContext();

  const registerMutation = useMutation(register, {
    onSuccess: (response) => {
      console.log(response.data);
      const { userId, token, address } = response.data;
      userContext.setToken(token);
      userContext.setUserId(userId);
      userContext.setAddress(getStringFromIAddress(address));
    },
  });

  const elements: IFormRow<IUser>[] = [
    [
      FormHelper.createInput({
        formKey: "email",
        label: "Email",
        props: {
          type: "email",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide an email!",
          },
          min: {
            value: 5,
            message: "Your email needs at least 5 characters!",
          },
        },
        defaultValue: "max@mustermann.de",
      }),
      FormHelper.createInput({
        formKey: "password",
        label: "Password",
        props: {
          type: "password",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a password!",
          },
          min: {
            value: 6,
            message: "Your username needs at least 6 characters!",
          },
        },
        defaultValue: "",
      }),
    ],
    [
      FormHelper.createInput({
        formKey: "firstName",
        label: "First Name",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a name!",
          },
        },
        defaultValue: "Max",
      }),
      FormHelper.createInput({
        formKey: "lastName",
        label: "Last Name",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a name!",
          },
        },
        defaultValue: "Mustermann",
      }),
      FormHelper.createDatePicker({
        formKey: "birthdate",
        label: "Birthdate",
        props: {
          type: "date",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a name!",
          },
        },
      }),
    ],
    [
      FormHelper.createInput({
        formKey: "address.street",
        label: "Street",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a street!",
          },
        },
        defaultValue: "Musterstrasse",
      }),
      FormHelper.createInput({
        formKey: "address.houseNumber",
        label: "Housenumber",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide your house number!",
          },
        },
        defaultValue: "123",
      }),
      FormHelper.createInput({
        formKey: "address.postalCode",
        label: "Postal Code",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a postal code!",
          },
        },
        defaultValue: "80335",
      }),
      FormHelper.createInput({
        formKey: "address.city",
        label: "City",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide your city!",
          },
        },
        defaultValue: "Munich",
      }),
      FormHelper.createInput({
        formKey: "address.country",
        label: "Country",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide your country!",
          },
        },
        defaultValue: "Germany",
      }),
    ],
  ];

  const handleRegister = (data: IUser) => {
    console.log("register user...");
    console.log(JSON.stringify(data));
    void register(data);
  };

  return (
    <>
      <div>
        <div>
          {registerMutation.isError ? (
            <div>An error occurred: {registerMutation.error.message}</div>
          ) : null}
        </div>
        <Form<IUser>
          elements={elements}
          onSubmit={handleRegister}
          formTitle={"Please register!"}
          abortButton={{
            children: "Cancel",
            color: "secondary",
            className: "ms-3",
            outline: true,
          }}
        />
      </div>
    </>
  );
};
