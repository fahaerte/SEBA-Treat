import React from "react";
import {
  dangerToast,
  Form,
  FormHelper,
  IFormRow,
  Row,
  successToast,
} from "../../components";
import { IAddress, IUserCredentials } from "@treat/lib-common";
import { getStringFromIAddress } from "../../utils/getStringFromIAddress";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { setCookie } from "../../utils/auth/CookieProvider";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  type LocationState = {
    from: {
      pathname: string;
    };
  };

  const locationState = location.state as LocationState;
  const from = locationState?.from || "/";

  const loginMutation = useMutation(login, {
    onSuccess: (response) => {
      const { userId, address } = response.data;
      setCookie("userId", userId);
      setCookie("address", getStringFromIAddress(address as IAddress));
      successToast({ message: "Welcome!" });
      if (from.pathname === "/address") {
        from.pathname = "/";
      }
      navigate(from, { replace: true });
    },
    onError: () => {
      dangerToast({ message: "Wrong credentials. Please try again!" });
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
        defaultValue: "fabian.haertel@tum.de",
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
        defaultValue: "123456",
      }),
    ],
  ];

  const handleSignIn = (user: IUserCredentials) => {
    loginMutation.mutate(user);
  };

  const handleCreateAccount = () => {
    navigate("/register", { state: { from: from } });
  };

  return (
    <>
      <div>
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
      <Row>
        <p>
          <br />
          Or{" "}
          <a onClick={handleCreateAccount}>
            <u>create an account</u>
          </a>
          .
        </p>
      </Row>
    </>
  );
};
export default LoginScreen;
