import React, { useContext } from "react";
import { Form, FormHelper } from "../../components";
import { IFormRow } from "../../components";
import { IUserCredentials } from "@treat/lib-common";
import { AuthContext } from "../../utils/AuthProvider";
import { getStringFromIAddress } from "../../utils/getStringFromIAddress";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";

const LoginScreen = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/alreadyLoggedIn";

  const loginMutation = useMutation(login, {
    onSuccess: (response) => {
      console.log(response.data);
      const { userId, token, address } = response.data;
      userContext.setToken(token);
      userContext.setUserId(userId);
      userContext.setAddress(getStringFromIAddress(address));
      navigate(from, { replace: true });
    },
    onError: (error) => {
      console.log("error");
    }
  });

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
    loginMutation.mutate(user);
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
