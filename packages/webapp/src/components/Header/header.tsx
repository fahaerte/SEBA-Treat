import {Container} from "react-bootstrap";
import {Col, Row} from "../Grid";
import {Button} from "../index";
import React from "react";
import styled from "styled-components";

export const Header = () => {

    const Header = styled.header`
      height: 110px;
      border-bottom: 1px solid #CFCFCF;
      background: white;
    `;

    const ProfileButton = styled.button`
      border-radius: 50px;
      border-color: #CFCFCF;
    `;

    return <Header>
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
                                    100 Cr
                                </Col>
                                <Col className={"col-sm-auto p-0 ms-2"}>
                                    Bild
                                </Col>
                            </Row>
                        </Container>
                    </ProfileButton>
                </Col>
            </Row>
        </Container>
    </Header>
}