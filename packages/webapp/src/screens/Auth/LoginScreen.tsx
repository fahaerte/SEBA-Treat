import React, { useContext } from "react";
import { Form, FormHelper } from "../../components";
import { IFormRow } from "../../components";
import { IUser, IUserCredentials } from "@treat/lib-common";
import { AuthContext } from "../../utils/AuthProvider";
import { getStringFromIAddress } from "../../utils/getStringFromIAddress";
import { useUserLogInMutation } from "../../store/api";

const LoginScreen = () => {
  const userContext = useContext(AuthContext);

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
    const { user, token } = data;

    userContext.setToken(token);
    userContext.setUser(user);
    userContext.setAddress(getStringFromIAddress(user.address));
    console.log("context is set!");
    console.log(userContext.user);
    console.log(userContext.token);
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
