import { Container } from "react-bootstrap";
import { Col, Row } from "../Grid";
import { Button, Link, Typography } from "../index";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUser } from "../../../api/userApi";
import { useAuthContext } from "../../../utils/auth/AuthProvider";
import { SCHeader } from "./styles";
import Logo from "../../../assets/logo.png";

export const Header = () => {
  const { userId, token } = useAuthContext();

  const [balance, setBalance] = useState(0);

  useQuery("getUser", () => getUser(userId as string, token as string), {
    onSuccess: (response) => {
      setBalance(response.data.virtualAccount.balance);
    },
  });

  return (
    <SCHeader>
      <Container className={"h-100 w-100"}>
        <Row className={"h-100"}>
          <Col className={"col-sm-auto my-auto"}>
            <Link display={"text"} to={"/"} underline={false}>
              <img src={Logo} alt={"TREAT Logo"} />
            </Link>
          </Col>
          <Col className={"my-auto d-flex justify-content-end"}>
            <Button>Create offer</Button>
          </Col>
          <Col className={"col-sm-auto my-auto"}>
            <Link
              to={userId ? "/purchase-credits" : "/login"}
              color={"secondary"}
              display={"button"}
              buttonProps={{ outline: true }}
            >
              {userId ? `${balance} Credits Bild` : "Sign In"}

              {/*<Container className={"w-100"}>*/}
              {/*  <Row className={"p-0"}>*/}
              {/*    <Col className={"col-sm-auto p-0"}></Col>*/}
              {/*    <Col className={"col-sm-auto p-0 ms-2"}></Col>*/}
              {/*  </Row>*/}
              {/*</Container>*/}
            </Link>
          </Col>
        </Row>
      </Container>
    </SCHeader>
  );
};
