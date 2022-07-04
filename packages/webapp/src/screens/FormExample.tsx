import React from "react";
import { UserControllerLogInArgs } from "../store/api/types";
import { Form, FormHelper, IFormRow } from "../components";
import { useUserLogInMutation } from "../store/api/userApi";

const FormExample = () => {
  // const [userLogIn, { isLoading, isSuccess, error }] = useUserLogInMutation();

  const formElements: IFormRow<UserControllerLogInArgs & { file: File }>[] = [
    [
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
      FormHelper.createFileInput({
        formKey: "file",
        label: "File",
      }),
    ],
  ];

  const handleSubmit = (data: UserControllerLogInArgs & { file: File }) => {
    // void userLogIn(data);
    console.log(data);
  };

  return (
    <div>
      <Form<UserControllerLogInArgs & { file: File }>
        elements={formElements}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormExample;
