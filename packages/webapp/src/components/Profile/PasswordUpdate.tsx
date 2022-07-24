import React from "react";
import { IFormRow, FormHelper, Form } from "../ui";

type PasswordForm = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};
export const PasswordUpdate = () => {
  const formElemements: IFormRow<PasswordForm>[] = [
    [
      FormHelper.createInput({
        formKey: "oldPassword",
        label: "Old Password",
        props: {
          type: "password",
        },
        rules: {
          required: {
            value: true,
          },
        },
      }),
    ],
    [
      FormHelper.createInput({
        formKey: "newPassword",
        label: "New Password",
        props: {
          type: "password",
        },
        rules: {
          required: {
            value: true,
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
        },
      }),
    ],
  ];

  const handleSubmit = (data: PasswordForm) => {
    console.log(data);
  };

  return (
    <Form<PasswordForm>
      elements={formElemements}
      onSubmit={(data) => handleSubmit(data)}
      abortButton={{ color: "secondary", children: "Cancel" }}
    />
  );
};
