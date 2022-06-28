import React, { useEffect, useState } from "react";
import { IUser } from "@treat/lib-common";
import { TDatePickerType } from "../components/ui/Forms/Datepicker/IDatePicker";
import { useUserRegistrationMutation } from "../store/api";
import { Form, FormHelper, IFormRow } from "../components";
import CreateMealForm from "../components/Meal/CreateMealForm";

const RegisterScreen = () => {
  const [userRegistration, { isLoading, isSuccess, isError }] =
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
        defaultValue: "Musterstrasse",
      }),
      FormHelper.createInput({
        formKey: "address.houseNumber",
        label: "Housenumber",
        props: {
          type: "number",
        },
        defaultValue: 123,
      }),
      FormHelper.createInput({
        formKey: "address.postalCode",
        label: "Postal Code",
        props: {
          type: "number",
        },
        defaultValue: 80335,
      }),
      FormHelper.createInput({
        formKey: "address.city",
        label: "City",
        props: {
          type: "text",
        },
        defaultValue: "Munich",
      }),
      FormHelper.createInput({
        formKey: "address.country",
        label: "Country",
        props: {
          type: "text",
        },
        defaultValue: "Germany",
      }),
    ],
  ];

  const handleRegister = (data: IUser) => {
    console.log(JSON.stringify(data));
    void userRegistration(data);
  };

  return (
    <>
      {/*<Form<IUser> elements={elements} onSubmit={handleRegister}/>*/}
      {/*{isLoading && <h6>Trying to register...</h6>}*/}
      {/*{isSuccess && <h6>Registered!</h6>}*/}
      {/*{isError && <h6>error</h6>}*/}

      <CreateMealForm />
    </>
  );
};
export default RegisterScreen;
