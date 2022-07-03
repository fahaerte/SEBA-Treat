import React from "react";
import { useRoutes } from "react-router-dom";
import { Button, Icon } from "../components";
import FormExample from "../screens/FormExample";
import StripeForm from "../screens/Payment/StripeForm";
import { ConfigService } from "../utils/ConfigService";
import CreditPackages from "../screens/Payment/CreditPackages";

export const AppRouter = () => {
  const configService = new ConfigService();

  const mainRoutes = {
    path: "/payment-success",
    element: <div>Everything worked out find!</div>,
  };

  const redirectRoutes = [
    {
      path: "/success",
      element: <div>Everything worked out find!</div>,
    },
    {
      path: "/cancel",
      element: <div>You canceled the purchase</div>,
    },
  ];

  const routing = useRoutes([mainRoutes, ...redirectRoutes]);

  return (
    <>
      Hallo :-D
      <br />
      <Button>
        <Icon type={"download"} /> asdf
      </Button>
      <br />
      <StripeForm
        redirectUrl={`${configService.get("BASE_URL")}/payment-success`}
      />
      {routing}
      <CreditPackages />
    </>
  );
};
