import React, { useEffect, useState } from "react";
import { Button, Form, FormHelper } from "@treat/webapp/src/components/";
import { IFormRow } from "@treat/webapp/src/components/";
import { IUser } from "@treat/lib-common";
import { TDatePickerType } from "../components/Forms/Datepicker/IDatePicker";

const RegisterScreen = () => {
  const elements: IFormRow<IUser>[] = [
    [
      FormHelper.createInput({
        formKey: "email",
        label: "Email",
        props: {
          type: "text",
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
          type: "text",
        },
        defaultValue: "",
      }),
    ],
    [
      FormHelper.createInput({
        formKey: "firstname",
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
        formKey: "lastname",
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
        type: "yyyy-mm-dd",
      }),
      FormHelper.createInput({
        formKey: "street",
        label: "Street",
        props: {
          type: "text",
        },
        defaultValue: "Musterstrasse",
      }),
      FormHelper.createInput({
        formKey: "streetNumber",
        label: "Streetnumber",
        props: {
          type: "number",
        },
        defaultValue: 123,
      }),
      FormHelper.createInput({
        formKey: "postalCode",
        label: "Postal Code",
        props: {
          type: "number",
        },
        defaultValue: 80335,
      }),
    ],
  ];

  const handleRegister = (data: IUser) => {
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <Form<IUser> elements={elements} onSubmit={handleRegister} />
    </>
  );
};
export default RegisterScreen;
