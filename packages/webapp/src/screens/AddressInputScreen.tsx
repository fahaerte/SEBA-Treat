import React from "react";
import { Form } from "@treat/webapp/src/components/";
import { IStringObject } from "@treat/lib-common";
import { useLocation, useNavigate } from "react-router-dom";
import { addressElement } from "../components/AddressInput/AddressInput";
import { setCookie } from "../utils/auth/CookieProvider";

export const AddressInputScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  type LocationState = {
    from: {
      pathname: string;
    };
  };

  const locationState = location.state as LocationState;
  const from = locationState?.from || "/mealoffers";

  const handleAddress = (data: IStringObject) => {
    setCookie('address', data.returnedString);
    navigate(from, { replace: true });
  };

  return (
    <>
      <h2>Time to exchange leftovers!</h2>
      <h4>
        Find Offers in your neighbourhood or provide your leftovers to others!
      </h4>
      <br />
      <Form<IStringObject> elements={addressElement} onSubmit={handleAddress} />
    </>
  );
};
