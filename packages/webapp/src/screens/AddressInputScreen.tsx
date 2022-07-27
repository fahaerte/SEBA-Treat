import React from "react";
import { Form } from "@treat/webapp/src/components/";
import { IStringObject } from "@treat/lib-common";
import { useLocation, useNavigate } from "react-router-dom";
import { addressElement } from "../components/AddressInput/AddressInput";
import { setCookie } from "../utils/auth/CookieProvider";
import { CardImage, Col, Container, Icon, Typography } from "../components";
import { AddressInputLayout } from "../components/AddressInput/AdressInputLayout";
import { Header } from "../components/ui/Header/Header";

export const AddressInputScreen = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
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

  // TODO:  Address-Input schmaler machen
  //TODO: Space between TabBar and tabs
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
            <Container className={"w-50 justify-content-center"}>
              <Form<IStringObject>
                elements={addressElement}
                onSubmit={handleAddress}
                submitButton={{
                  color: "secondary",
                  children: (
                    <>
                      <Icon type={"geo-alt"} /> Set your location
                    </>
                  ),
                }}
              />
            </Container>
          </Container>
        </div>
        <div>
          <hr />
          <Container>
            <Typography variant={"h1"} color={"secondary"}>
              How Treat works
            </Typography>
            <Typography variant={"h3"} color={"secondary"}>
              Treat is a platform to exchange blablabla
            </Typography>
            {children}
            <hr
              style={{
                borderColor: "black",
                height: "3px",
              }}
            />
            <Typography variant={"h4"} color={"secondary"}>
              Legal Disclaimer{" "}
            </Typography>
          </Container>
        </div>
      </AddressInputLayout>
    </>
  );
};
