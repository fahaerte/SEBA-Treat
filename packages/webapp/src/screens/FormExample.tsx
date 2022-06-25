import React from "react";
import { UserControllerLogInArgs } from "../store/api/types";
import { Form, FormHelper, IFormRow } from "../components";
import { useUserLogInMutation } from "../store/api/userApi";

const FormExample = () => {
  const [userLogIn, { isLoading, isSuccess, error }] = useUserLogInMutation();

  const formElements: IFormRow<UserControllerLogInArgs>[] = [
    FormHelper.createInput({
      formKey: "email",
      label: "E-Mail",
      props: {
        type: "email",
      },
    }),
    FormHelper.createInput({
      formKey: "password",
      label: "E-Mail",
      props: {
        type: "password",
      },
    }),
  ];

  const handleSubmit = (data: UserControllerLogInArgs) => {
    void userLogIn(data);
  };

  return (
    <div>
      <Form<UserControllerLogInArgs>
        elements={formElements}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
