import React, { useEffect, useState } from "react";
import { Button, Form, FormHelper } from "../components/";
import { IFormRow } from "../components/";
import { IUserCredentials } from "../../../lib-common";
import { useUserLogInMutation } from "../store/api";

const LoginScreen = () => {
  const [userLogIn, { isLoading, isSuccess, isError }] = useUserLogInMutation();

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
    void userLogIn(data);
  };

  return (
    <>
      <Form<IUserCredentials> elements={elements} onSubmit={handleSignIn} />
      {isLoading && <h6>Signing in...</h6>}
      {isSuccess && <h6>Signed In!</h6>}
      {isError && <h6>error</h6>}
    </>
  );
};
export default LoginScreen;
