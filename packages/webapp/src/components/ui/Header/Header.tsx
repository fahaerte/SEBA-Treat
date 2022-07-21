import { Col, Row } from "../Grid";
import { Button, Icon, Link, Typography } from "../index";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUser } from "../../../api/userApi";
import { SCHeader } from "./styles";
import Logo from "../../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie, removeCookies } from "../../../utils/auth/CookieProvider";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(0);

  useQuery("getUser", () => getUser(), {
    onSuccess: (response) => {
      setBalance(response.data.virtualAccount.balance);
    },
  });

  const handleNavButton = () => {
    if (getCookie("userId")) {
      navigate("/account");
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const signout = () => {
    removeCookies();
    navigate("/");
  };

  const address = getCookie("address");
  const userId = getCookie("userId");

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
            <Col className={"my-auto"}>
              <Typography variant={"h4"} className={"fw-normal"}>
                <Icon type={"geo-alt"} /> {address}
              </Typography>
            </Col>
          )}
          <Col className={"justify-content-end d-flex align-items-center"}>
            {/*{userId && (*/}
            {/*  <Link to={"/createMeal"} display={"button"} className={"me-3"}>*/}
            {/*    Create Offer*/}
            {/*  </Link>*/}
            {/*)}*/}
            {location.pathname !== "/createMeal" && (
              <Link to={"/createMeal"} display={"button"} className={"me-3"}>
                Offer meal
              </Link>
            )}
            {/*<Link*/}
            {/*  to={userId ? "/purchase-credits" : "/login"}*/}
            {/*  color={"secondary"}*/}
            {/*  display={"button"}*/}
            {/*  buttonProps={{ outline: true }}*/}
            {/*  route*/}
            {/*>*/}
            {/*  {userId ? `${balance} Credits Bild` : "Sign In"}*/}
            {/*</Link>*/}
            {userId ? (
              <Button
                color={"secondary"}
                outline={true}
                onClick={handleNavButton}
              >
                {`${balance} Credits Bild`}
              </Button>
            ) : (
              <Button
                color={"secondary"}
                outline={true}
                onClick={handleNavButton}
              >
                Sign in
              </Button>
            )}
            {userId && (
              <Button color={"secondary"} className={"ms-3"} onClick={signout}>
                <Icon type={"box-arrow-right"} />
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </SCHeader>
  );
};
