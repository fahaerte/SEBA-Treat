import { Container } from "react-bootstrap";
import { Col, Row } from "../Grid";
import { Button } from "../index";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import UserService from "../../../services/user.service";

export const Header = () => {
  const Header = styled.header`
    height: 110px;
    border-bottom: 1px solid #cfcfcf;
    background: white;
  `;

  const ProfileButton = styled.button`
    border-radius: 50px;
    border-color: #cfcfcf;
  `;

  const [balance, setBalance] = useState("Loading...");

  const fetchData = useCallback(async () => {
    const balance = await UserService.getAccountBalance();
    console.log(balance);
    setBalance(balance);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <Header>
      <Container className={"h-100 w-100"}>
        <Row className={"h-100"}>
          <Col className={"col-sm-auto my-auto"}>
            <h2 className={""}>TREAT</h2>
          </Col>
          <Col className={"my-auto d-flex justify-content-end"}>
            <Button>Create offer</Button>
          </Col>
          <Col className={"col-sm-auto my-auto"}>
            <ProfileButton className={"btn btn-outline-primary"}>
              <Container className={"w-100"}>
                <Row className={"p-0"}>
                  <Col className={"col-sm-auto p-0"}>{balance} Credits</Col>
                  <Col className={"col-sm-auto p-0 ms-2"}>Bild</Col>
                </Row>
              </Container>
            </ProfileButton>
          </Col>
        </Row>
      </Container>
    </Header>
  );
};
