import React, { useContext } from "react";
import { Form, FormHelper } from "@treat/webapp/src/components/";
import { IFormRow } from "@treat/webapp/src/components/";
import { IStringObject } from "@treat/lib-common";
import { AuthContext } from "../utils/auth/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

export const AddressInputScreen = () => {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  type LocationState = {
    from: {
      pathname: string;
    };
  };

  const locationState = location.state as LocationState;
  const from = locationState?.from || "/mealoffers";

  const elements: IFormRow<IStringObject>[] = [
    FormHelper.createInput({
      formKey: "returnedString",
      label: "Address",
      props: {
        type: "text",
      },
      rules: {
        required: { value: true },
      },
      defaultValue: "Arcisstrasse 10, 80333 Munich",
    }),
  ];

  const handleAddress = (data: IStringObject) => {
    console.log(JSON.stringify(data));
    userContext.setAddress(data.returnedString);
    navigate(from, { replace: true });
  };

  return (
    <>
      <h2>Time to exchange leftovers!</h2>
      <h4>
        Find Offers in your neighbourhood or provide your leftovers to others!
      </h4>
      <br />
      <Form<IStringObject> elements={elements} onSubmit={handleAddress} />
    </>
  );
};
