import React, { useContext } from "react";
import { Form, FormHelper, IFormRow } from "../../components";
import { IUser } from "@treat/lib-common";
import { UserContext } from "../../utils/AuthProvider";
import {useUserRegistrationMutation} from "../../store/api";
import {getStringFromIAddress} from "../../utils/getStringFromIAddress";

const RegisterScreen = () => {
  const userContext = useContext(UserContext);

  const [register, { isLoading, isError, isSuccess, data }] =
      useUserRegistrationMutation();

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
        formKey: "username",
        label: "Username",
        props: {
          type: "text",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a username!",
          },
          min: {
            value: 5,
            message: "Your username needs at least 5 characters!",
          },
        },
        defaultValue: "maxi1234",
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
          type: "number",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide your house number!",
          },
        },
        defaultValue: 123,
      }),
      FormHelper.createInput({
        formKey: "address.postalCode",
        label: "Postal Code",
        props: {
          type: "number",
        },
        rules: {
          required: {
            value: true,
            message: "Please provide a postal code!",
          },
        },
        defaultValue: 80335,
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
    console.log("register user...")
    console.log(JSON.stringify(data));
    void register(data);
  };

  if (data) {
    console.log((data));
    const user = data["authenticatedUser"]["user"] as IUser;
    const token = data["authenticatedUser"]["token"];

    userContext.setToken(token);
    userContext.setUser(user);
    userContext.setAddress(getStringFromIAddress(user.address));
    console.log("context is set!");
    console.log(userContext.user);
    console.log(userContext.token);
  }

  return (
    <>
      <Form<IUser>
        elements={elements}
        onSubmit={handleRegister}
        formTitle={"Please register!"}
        resetOnSubmit
        abortButton={{
          children: "Cancel",
          color: "secondary",
          className: "ms-3",
          outline: true,
        }}
      />
    </>
  );
};
export default RegisterScreen;
