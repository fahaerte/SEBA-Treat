import React from "react";
import { Form } from "@treat/webapp/src/components/";
import { IStringObject } from "@treat/lib-common";
import { useLocation, useNavigate } from "react-router-dom";
import { addressElement } from "../components/AddressInput/AddressInput";
import { setCookie } from "../utils/auth/CookieProvider";
import { Container, Icon, Typography } from "../components";
import { AddressInputLayout } from "../components/AddressInput/AdressInputLayout";
import { Header } from "../components/ui/Header/Header";

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
    setCookie("address", data.returnedString);
    navigate(from, { replace: true });
  };

  return (
    <>
      <Header />
      <AddressInputLayout>
        <div className={"d-flex flex-column justify-content-center"}>
          <Container>
            <Typography variant={"h1"} className={"fw-normal"}>
              TIME TO EXCHANGE LEFTOVERS!
            </Typography>
            <Typography variant={"h3"} color={"secondary"}>
              Find Offers in your neighbourhood or provide your leftovers to
              others!
            </Typography>
            <br />
            <Form<IStringObject>
              elements={addressElement}
              onSubmit={handleAddress}
              submitButton={{
                color: "secondary",
                children: (
                  <>
                    <Icon type={"arrowRight"} /> Set your location
                  </>
                ),
              }}
            />
          </Container>
        </div>
      </AddressInputLayout>
    </>
  );
};
