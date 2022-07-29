import { Col, Row } from "../Grid";
import { Button, Icon, Link, Typography, Form } from "../index";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUser } from "../../../api/userApi";
import { SCHeader } from "./styles";
import Logo from "../../../assets/img/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCookie,
  removeCookies,
  setCookie,
} from "../../../utils/auth/CookieProvider";
import { signout } from "../../../api/authApi";
import { dangerToast } from "../Toast";
import { CustomDropdown } from "./UserDropdown";
import { IStringObject } from "@treat/lib-common";
import { addressElement } from "../../AddressInput/AddressInput";
import { AxiosError } from "axios";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [onAddressEdit, setOnAddressEdit] = useState(false);

  const address = getCookie("address");
  const userId = getCookie("userId");

  const queryClient = useQueryClient();

  const handleAddress = (data: IStringObject) => {
    setCookie("address", data.returnedString);
    setOnAddressEdit(false);
    queryClient.fetchQuery("getOffers");
  };

  useQuery(["getUser", userId], () => getUser(), {
    onSuccess: (response) => {
      setBalance(response.data.virtualAccount.balance as number);
      setFirstName(response.data.firstName as string);
    },
    onError: () => {
      signoutMutation.mutate();
    },
    enabled: !!userId,
  });

  const signoutMutation = useMutation("signout", signout, {
    onSuccess: () => {
      removeCookies();
      navigate("/");
    },
    onError: (error) => {
      removeCookies();
      if (error instanceof AxiosError && error.response) {
        dangerToast({
          message: error.response.data.message,
        });
      } else {
        dangerToast({
          message: "Unexpected server error. Please try again.",
        });
      }
    },
  });

  const handleReservationsButton = () => {
    if (getCookie("userId")) {
      navigate("/meal-reservations");
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
                <Form<IStringObject>
                  elements={addressElement}
                  onSubmit={(data) => handleAddress(data)}
                  className={"d-flex align-items-center"}
                  rowClasses={"mb-0"}
                  abortButton={{
                    color: "secondary",
                    children: <Icon type={"x-lg"} />,
                    onClick: () => setOnAddressEdit(false),
                  }}
                  submitButton={{
                    color: "primary",
                    className: "mx-2",
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
            {location.pathname !== "/meals/create" && (
              <Link
                to={"/meals/create"}
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
