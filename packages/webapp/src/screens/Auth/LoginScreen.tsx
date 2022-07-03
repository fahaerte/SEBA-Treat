import React, { useEffect, useState } from "react";
import { Button, Form, FormHelper } from "../../components";
import { IFormRow } from "../../components";
import { IUserCredentials } from "@treat/lib-common";
import UserService from "../../services/user.service";

const LoginScreen = () => {
  const elements: IFormRow<IUserCredentials>[] = [
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
        formKey: "password",
        label: "Password",
        props: {
          type: "password",
        },
        defaultValue: "",
      }),
    ],
  ];

  const handleSignIn = (data: IUserCredentials) => {
    console.log("Trying to log in...");
    console.log(JSON.stringify(data));
    UserService.loginUser(data)
      .then((response) => console.log(JSON.stringify(response)))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Form<IUserCredentials> elements={elements} onSubmit={handleSignIn} />
    </>
  );
};
export default LoginScreen;
