import React from "react";
import {
  Row,
  Form,
  FormHelper,
  IFormRow,
  Link,
  Typography,
  dangerToast,
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
  const from = locationState?.from || "/mealoffers";

  const loginMutation = useMutation(login, {
    onSuccess: (response) => {
      const { userId, address } = response.data;
      setCookie("userId", userId as string);
      setCookie("address", getStringFromIAddress(address as IAddress));
      if (from.pathname.includes("address")) {
        from.pathname = "/mealoffers";
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
      <Row className={"mt-3"}>
        <Typography variant={"div"} display={"inline"}>
          Or{" "}
          <Link to={"/register"} display={"text"}>
            <Typography variant={"h3"} display={"inline"}>
              <u>create an account</u>
            </Typography>
          </Link>
          .
        </Typography>
      </Row>
    </>
  );
};
export default LoginScreen;
