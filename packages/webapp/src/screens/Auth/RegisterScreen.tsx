import React from "react";
import { Form, FormHelper, IFormRow } from "../../components";
import { IUser } from "@treat/lib-common";
import UserService from "../../services/user.service";

const RegisterScreen = () => {
  const elements: IFormRow<IUser>[] = [
    [
      FormHelper.createInput({
        formKey: "email",
        label: "Email",
        props: {
          type: "email",
        },
        rules: {
          required: { value: true },
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
          required: { value: true },
        },
        defaultValue: "maxi1234",
      }),
      FormHelper.createInput({
        formKey: "password",
        label: "Password",
        props: {
          type: "password",
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
          required: { value: true },
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
          required: { value: true },
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
          required: { value: true },
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
          required: { value: true },
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
          required: { value: true },
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
          required: { value: true },
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
          required: { value: true },
        },
        defaultValue: "Germany",
      }),
    ],
  ];

  const handleRegister = (data: IUser) => {
    console.log(JSON.stringify(data));
    UserService.registerUser(data)
      .then((response) => console.log(JSON.stringify(response)))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Form<IUser> elements={elements} onSubmit={handleRegister} />
    </>
  );
};
export default RegisterScreen;
