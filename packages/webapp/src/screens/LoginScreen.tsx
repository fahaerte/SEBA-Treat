import React, { useEffect, useState } from "react";
import { Button, Form, FormHelper } from "@treat/webapp/src/components/";
import { IFormRow } from "@treat/webapp/src/components/";
import { IUser } from "@treat/lib-common";

const LoginScreen = () => {
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
    console.log(data.email + "  " + data.password);
  };

  return (
    <>
      <Form<IUser> elements={elements} onSubmit={handleSignIn} />
    </>
  );
};
export default LoginScreen;
