import React, { useState } from "react";
import {
  IFormRow,
  FormHelper,
  Form,
  Icon,
  successToast,
  dangerToast,
} from "../ui";
import { updatePassword, UpdatePasswordArgs } from "../../api/userApi";
import { getCookie } from "../../utils/auth/CookieProvider";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { TFormFieldError } from "../ui/Forms/_interfaces/TFormFieldError";
import { AxiosError } from "axios";

type PasswordForm = {
  passwordOld: string;
  passwordNew: string;
  newPasswordRepeat: string;
};
export const PasswordUpdate = () => {
  const userId = getCookie("userId");
  const navigate = useNavigate();
  const [formError, setFormError] = useState<
    TFormFieldError<PasswordForm>[] | undefined
  >();

  const { mutate: updateUserPassword, isLoading } = useMutation(
    ({ passwordOld, passwordNew, userId }: UpdatePasswordArgs) =>
      updatePassword({ passwordOld, passwordNew, userId }),
    {
      onSuccess: () => {
        successToast({ message: "Your password has been updated." });
        navigate("/account");
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          dangerToast({
            message: error.response.data.message,
          });
        } else {
          dangerToast({
            message:
              "Unexpected server error. Your password could not be updated.",
          });
        }
      },
    }
  );
  const formElemements: IFormRow<PasswordForm>[] = [
    [
      FormHelper.createInput({
        formKey: "passwordOld",
        label: "Old Password",
        props: {
          type: "password",
        },
        rules: {
          required: {
            value: true,
          },
          minLength: {
            value: 6,
          },
        },
      }),
    ],
    [
      FormHelper.createInput({
        formKey: "passwordNew",
        label: "New Password",
        props: {
          type: "password",
        },
        rules: {
          required: {
            value: true,
          },
          minLength: {
            value: 6,
          },
        },
      }),
      FormHelper.createInput({
        formKey: "newPasswordRepeat",
        label: "Repeat New Password",
        props: {
          type: "password",
        },
        rules: {
          required: {
            value: true,
          },
          minLength: {
            value: 6,
          },
        },
      }),
    ],
  ];

  const handleSubmit = (data: PasswordForm) => {
    if (data.passwordNew !== data.newPasswordRepeat) {
      setFormError([
        {
          fieldName: "newPasswordRepeat",
          error: {
            type: "invalid",
            message:
              "Your repeated password has to be equal to the first input!",
          },
        },
      ]);
    } else if (userId) {
      updateUserPassword({
        passwordOld: data.passwordOld,
        passwordNew: data.passwordNew,
        userId,
      });
    } else {
      navigate("/");
    }
  };

  return (
    <Form<PasswordForm>
      elements={formElemements}
      onSubmit={(data) => handleSubmit(data)}
      isLoading={isLoading}
      formFieldErrors={formError}
      submitButton={{
        children: (
          <>
            <Icon type={"shield-lock"} /> Update
          </>
        ),
      }}
      abortButton={{
        color: "secondary",
        children: "Cancel",
        className: "ms-3",
      }}
    />
  );
};
