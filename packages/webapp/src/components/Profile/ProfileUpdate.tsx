import React from "react";
import { FormHelper, IFormRow, Form } from "../ui";
import { IUser } from "@treat/lib-common";
import { useAuthContext } from "../../utils/auth/AuthProvider";

export const ProfileUpdate = () => {
  const { userId, token } = useAuthContext();

  const elements: IFormRow<IUser>[] = [
    [
      FormHelper.createInput({
        formKey: "firstName",
        label: "First Name",
        disabled: true,
        props: {
          type: "text",
        },
      }),
      FormHelper.createInput({
        formKey: "lastName",
        label: "Last Name",
        disabled: true,
        props: {
          type: "text",
        },
      }),
    ],
    FormHelper.createInput({
      formKey: "email",
      label: "E-Mail",
      disabled: true,
      props: {
        type: "email",
      },
    }),
  ];

  const handleSubmit = (data: IUser) => {
    console.log(data);
  };

  return (
    <Form<IUser>
      elements={elements}
      onSubmit={(data) => handleSubmit(data)}
      formTitle={"Update your information"}
    />
  );
};
