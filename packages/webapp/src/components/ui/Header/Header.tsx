import { Container } from "react-bootstrap";
import { Col, Row } from "../Grid";
import { Button, Icon, Link, Typography } from "../index";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUser } from "../../../api/userApi";
import { useAuthContext } from "../../../utils/auth/AuthProvider";
import { SCHeader } from "./styles";
import Logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { userId, setUserId, setToken, setAddress, token } = useAuthContext();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useQuery("getUser", () => getUser(userId as string, token as string), {
    onSuccess: (response) => {
      setBalance(response.data.virtualAccount.balance);
    },
  });

  const signout = () => {
    setAddress(undefined);
    setUserId(undefined);
    setToken(undefined);
    navigate("/");
  };
  return (
    <SCHeader>
      <Container className={"h-100 w-100"}>
        <Row className={"h-100"}>
          <Col className={"col-sm-auto my-auto"}>
            <Link display={"text"} to={"/"} underline={false}>
              <img src={Logo} alt={"TREAT Logo"} />
            </Link>
          </Col>
          <Col className={"justify-content-end d-flex align-items-center"}>
            {userId && (
              <Link to={"/createMeal"} display={"button"} className={"me-3"}>
                Create Offer
              </Link>
            )}
            <Link
              to={userId ? "/purchase-credits" : "/login"}
              color={"secondary"}
              display={"button"}
              buttonProps={{ outline: true }}
            >
              {userId ? `${balance} Credits Bild` : "Sign In"}
            </Link>
            {userId && (
              <Button color={"secondary"} className={"ms-3"} onClick={signout}>
                <Icon type={"logout"} />
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </SCHeader>
  );
};
