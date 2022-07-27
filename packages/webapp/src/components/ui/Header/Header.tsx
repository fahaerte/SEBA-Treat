import { Col, Row } from "../Grid";
import { Button, Icon, Link, Typography } from "../index";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getUser } from "../../../api/userApi";
import { SCCustomForm, SCHeader } from "./styles";
import Logo from "../../../assets/img/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCookie,
  removeCookies,
  setCookie,
} from "../../../utils/auth/CookieProvider";
import { signout } from "../../../api/authApi";
import { dangerToast, successToast } from "../Toast";
import { CustomDropdown } from "./UserDropdown";
import { IStringObject } from "@treat/lib-common";
import { addressElement } from "../../AddressInput/AddressInput";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [onAddressEdit, setOnAddressEdit] = useState(false);

  const address = getCookie("address");
  const userId = getCookie("userId");

  const handleAddress = (data: IStringObject) => {
    setCookie("address", data.returnedString);
    setOnAddressEdit(false);
  };

  useQuery(["getUser", userId], () => getUser(), {
    onSuccess: (response) => {
      setBalance(response.data.virtualAccount.balance);
      setFirstName(response.data.firstName);
    },
    onError: () => {
      dangerToast({
        message: "Authorization error. You'll be logged out automatically.",
      });
      signoutMutation.mutate();
    },
    enabled: !!userId,
  });

  const signoutMutation = useMutation("signout", signout, {
    onSuccess: () => {
      removeCookies();
      successToast({ message: "Successfully signed out." });
      navigate("/");
    },
    onError: () => {
      removeCookies();
      dangerToast({ message: "Signout unsuccessful. Please try again!" });
    },
  });

  const handleReservationsButton = () => {
    if (getCookie("userId")) {
      navigate("/mealOfferRequests");
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const handleNavButton = () => {
    if (getCookie("userId")) {
      navigate("/account");
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const executeSignout = () => {
    signoutMutation.mutate();
  };

  return (
    <SCHeader>
      <div className={"px-3 h-100 w-100"}>
        <Row className={"h-100"}>
          <Col className={"col-sm-auto my-auto"}>
            <Link display={"text"} to={"/"} underline={false}>
              <img src={Logo} alt={"TREAT Logo"} />
            </Link>
          </Col>
          {address && (
            <Col className={"col-sm-auto my-auto"}>
              {onAddressEdit ? (
                <SCCustomForm<IStringObject>
                  elements={addressElement}
                  onSubmit={handleAddress}
                  className={"d-flex align-items-center"}
                  submitButton={{
                    color: "secondary",
                    className: "ms-2",
                    children: (
                      <>
                        <Icon type={"geo-alt"} /> Update location
                      </>
                    ),
                  }}
                />
              ) : (
                <div className={"d-flex flex-row align-items-center"}>
                  <Typography variant={"h4"} className={"fw-normal"}>
                    <Icon type={"geo-alt"} /> {address}
                  </Typography>
                  <Button
                    color={"primary"}
                    className={"ms-2 my-0"}
                    onClick={() => setOnAddressEdit(true)}
                  >
                    <Icon type={"pen"} />
                  </Button>
                </div>
              )}
            </Col>
          )}
          <Col className={"justify-content-end d-flex align-items-center"}>
            {location.pathname !== "/createMeal" && (
              <Link
                to={"/createMeal"}
                display={"button"}
                className={"me-3"}
                color={"secondary"}
              >
                <Icon type={"plus"} /> Offer meal
              </Link>
            )}
            {userId ? (
              <CustomDropdown
                credits={balance}
                firstName={firstName}
                handleReservationNavigation={handleReservationsButton}
                handleLogout={executeSignout}
              />
            ) : (
              <Button
                color={"primary"}
                outline={true}
                onClick={handleNavButton}
              >
                Sign in
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </SCHeader>
  );
};
