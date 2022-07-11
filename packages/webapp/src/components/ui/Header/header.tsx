import { Container } from "react-bootstrap";
import { Col, Row } from "../Grid";
import { Button } from "../index";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getUser } from "../../../api/userApi";
import { useAuthContext } from "../../../utils/auth/AuthProvider";

export const Header = () => {
  const { userId } = useAuthContext();

  const { data: user } = useQuery(["getUser", userId], () =>
    getUser(userId as string)
  );

  const Header = styled.header`
    height: 110px;
    border-bottom: 1px solid #cfcfcf;
    background: white;
  `;

  const ProfileButton = styled.button`
    border-radius: 50px;
    border-color: #cfcfcf;
  `;

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
                  <Col className={"col-sm-auto p-0"}>
                    {user.balance} Credits
                  </Col>
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
