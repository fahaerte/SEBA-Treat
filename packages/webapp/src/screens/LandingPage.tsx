import React, { useContext } from "react";
import { Form, FormHelper } from "@treat/webapp/src/components/";
import { IFormRow } from "@treat/webapp/src/components/";
import { IAddressLandingPage } from "@treat/lib-common";
import { AuthContext } from "../utils/AuthProvider";

const LandingPage = () => {
  const userContext = useContext(AuthContext);

  const elements: IFormRow<IAddressLandingPage>[] = [
    FormHelper.createInput({
      formKey: "address",
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

  const handleAddress = (data: IAddressLandingPage) => {
    console.log(JSON.stringify(data));
    userContext.setAddress(data.address);
  };

  return (
    <>
      <h2>Time to exchange leftovers!</h2>
      <h4>
        Find Offers in your neighbourhood or provide your leftovers to others!
      </h4>
      <br />
      <Form<IAddressLandingPage> elements={elements} onSubmit={handleAddress} />
    </>
  );
};

export default LandingPage;
