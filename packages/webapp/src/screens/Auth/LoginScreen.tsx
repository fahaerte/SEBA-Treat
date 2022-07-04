import React, { useContext, useEffect, useState } from "react";
import { Form, FormHelper } from "../../components";
import { IFormRow } from "../../components";
import {
  IAddress,
  IAddressLandingPage,
  IUser,
  IUserCredentials,
} from "@treat/lib-common";
import { UserContext } from "../../utils/AuthProvider";
import UserService from "../../services/user.service";
import { getStringFromIAddress } from "../../utils/getStringFromIAddress";
import { useUserLogInMutation } from "../../store/api";

const LoginScreen = () => {
  const userContext = useContext(UserContext);

  const [login, { isLoading, isError, isSuccess, data }] =
    useUserLogInMutation();

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

  const handleSignIn = (user: IUserCredentials) => {
    console.log("Trying to log in...");
    console.log(JSON.stringify(user));
    void login(user);
  };

  if (data) {
    console.log(data);
  }
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
