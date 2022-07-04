import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormHelper } from "../../components";
import { IFormRow } from "../../components";
import { IUserCredentials } from "@treat/lib-common";
import { AuthContext } from "../../utils/AuthProvider";
import UserService from "../../services/user.service";

const LoginScreen = () => {
  const authContext = useContext(AuthContext);

  const elements: IFormRow<IUserCredentials>[] = [
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
        },
        defaultValue: "test@user.de",
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
        },
        defaultValue: "pa55word",
      }),
    ],
  ];

  const handleSignIn = (data: IUserCredentials) => {
    console.log("Trying to log in...");
    console.log(JSON.stringify(data));
    UserService.loginUser(data)
      .then((response) => {
        console.log(response);
        authContext.setToken(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Form<IUserCredentials>
        elements={elements}
        onSubmit={handleSignIn}
        formTitle={"Please sign in!"}
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
export default LoginScreen;
