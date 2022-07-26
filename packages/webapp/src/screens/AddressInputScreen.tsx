import React from "react";
import { Form } from "@treat/webapp/src/components/";
import { IStringObject } from "@treat/lib-common";
import { useLocation, useNavigate } from "react-router-dom";
import { addressElement } from "../components/AddressInput/AddressInput";
import { setCookie } from "../utils/auth/CookieProvider";
import { CardImage, Col, Container, Icon, Typography } from "../components";
import { AddressInputLayout } from "../components/AddressInput/AdressInputLayout";
import { Header } from "../components/ui/Header/Header";
import AddressPictogramm from "../assets/AddressPictogramm.png";
import MealPictogramm from "../assets/MealPictogramm.png";
import MoneyPictogramm from "../assets/MoneyPictogramm.png";

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

  // TODO:  Address-Input schmaler machen
  // TODO: Insert Pictogramms for 2nd row
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
                    <Icon type={"geo-alt"} /> Set your location
                  </>
                ),
              }}
            />
          </Container>
        </div>
        <div>
          <hr />
          <Container>
            <Typography variant={"h1"} color={"secondary"}>
              How Treat works
            </Typography>
            <br />
            <Typography variant={"h2"} color={"secondary"}>
              Get food offered in your neighborhood!
            </Typography>
            <div className={"d-flex justify-content-around"}>
              <Col>
                <img
                  src={AddressPictogramm}
                  style={{
                    maxWidth: "70%",
                    maxHeight: "70%",
                  }}
                />
                <Typography variant={"h3"} color={"secondary"}>
                  Set your location
                </Typography>
              </Col>
              <Col>
                <img
                  src={MealPictogramm}
                  style={{
                    maxWidth: "70%",
                    maxHeight: "70%",
                  }}
                />
                <Typography variant={"h3"} color={"secondary"}>
                  Choose a meal
                </Typography>
              </Col>
              <Col>
                <img
                  src={MoneyPictogramm}
                  style={{
                    maxWidth: "70%",
                    maxHeight: "70%",
                  }}
                />
                <Typography variant={"h3"} color={"secondary"}>
                  Pay with virtual credits
                </Typography>
              </Col>
            </div>
          </Container>
          <br />
          <Container>
            <Typography variant={"h2"} color={"secondary"}>
              Offer your leftovers to your neighborhood!
            </Typography>
            <div className={"d-flex justify-content-around"}>
              <Col>
                <img
                  src={AddressPictogramm}
                  style={{
                    maxWidth: "70%",
                    maxHeight: "70%",
                  }}
                />
                <Typography variant={"h3"} color={"secondary"}>
                  Insert leftovers
                </Typography>
              </Col>
              <Col>
                <img
                  src={MealPictogramm}
                  style={{
                    maxWidth: "70%",
                    maxHeight: "70%",
                  }}
                />
                <Typography variant={"h3"} color={"secondary"}>
                  Get credits in return
                </Typography>
              </Col>
              <Col>
                <img
                  src={MoneyPictogramm}
                  style={{
                    maxWidth: "70%",
                    maxHeight: "70%",
                  }}
                />
                <Typography variant={"h3"} color={"secondary"}>
                  Reduce food waste and safe resources
                </Typography>
              </Col>
            </div>
          </Container>
        </div>
      </AddressInputLayout>
    </>
  );
};
