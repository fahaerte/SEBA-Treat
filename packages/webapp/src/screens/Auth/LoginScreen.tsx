import React from "react";
import { Form, FormHelper } from "../../components";
import { IFormRow } from "../../components";
import { IAddress, IUserCredentials } from "@treat/lib-common";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { getStringFromIAddress } from "../../utils/getStringFromIAddress";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { AxiosError } from "axios";

const LoginScreen = () => {
  const userContext = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  type LocationState = {
    from: {
      pathname: string;
    };
  };

  const locationState = location.state as LocationState;
  const from = locationState.from || "/alreadyLoggedIn";

  console.log("Coming from", from);

  const loginMutation = useMutation(login, {
    onSuccess: (response) => {
      console.log(response.data);
      const { userId, token, address } = response.data;
      userContext.setToken(token as string);
      userContext.setUserId(userId as string);
      userContext.setAddress(getStringFromIAddress(address as IAddress));
      navigate(from, { replace: true });
    },
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
      <div>
        <div>
          {loginMutation.isError ? (
            <div>
              An error occurred:{" "}
              {loginMutation.error instanceof AxiosError &&
              loginMutation.error.message
                ? loginMutation.error.message
                : "unknown"}
            </div>
          ) : null}
        </div>
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
      </div>
    </>
  );
};
export default LoginScreen;
