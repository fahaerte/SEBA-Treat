import React, { useEffect, useState } from "react";
import { Button, Form, FormHelper } from "../components/";
import { IFormRow } from "../components/";
import { IUser } from "../../../lib-common";
import { useUserLogInMutation, } from "../store/api";

const LoginScreen = () => {

  const [userLogIn, { isLoading, isSuccess, isError}] =
      useUserLogInMutation();

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
        formKey: "password",
        label: "Password",
        props: {
          type: "text",
        },
        defaultValue: "",
      }),
    ],
  ];

  const handleSignIn = (data: IUser) => {
    console.log("Trying to log in...");
    console.log(JSON.stringify(data));
    void userLogIn(data);
  };

  return (
    <>
      <Form<IUser> elements={elements} onSubmit={handleSignIn}/>
      {isLoading && <h6>Signing in...</h6>}
      {isSuccess && <h6>Signed In!</h6>}
      {isError && <h6>error</h6>}
    </>
  );
};
export default LoginScreen;
