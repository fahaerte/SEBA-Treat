import React from "react";
import { Col, Row, Typography } from "../ui";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { Rating } from "./Rating";
import { getCookie } from "../../utils/auth/CookieProvider";

export const UserOverview = () => {
  const userId = getCookie("userIs");

  const { isLoading, data } = useQuery(["getUser", userId], () => getUser());

  return (
    <>
      <Row>
        <Col>
          <Typography variant={"h4"} display={"inline"} isLoading={isLoading}>
            First Name:{"  "}
          </Typography>
          <Typography
            variant={"h4"}
            className={"fw-normal"}
            component={"div"}
            display={"inline"}
            isLoading={isLoading}
          >
            {data?.data.firstName}
          </Typography>
        </Col>

        <Col>
          <Typography variant={"h4"} display={"inline"} isLoading={isLoading}>
            Last Name:{" "}
          </Typography>
          <Typography
            isLoading={isLoading}
            variant={"h4"}
            className={"fw-normal"}
            component={"div"}
            display={"inline"}
          >
            {data?.data.lastName}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography variant={"h4"} display={"inline"} isLoading={isLoading}>
            E-Mail:{" "}
          </Typography>
          <Typography
            isLoading={isLoading}
            variant={"h4"}
            className={"fw-normal"}
            component={"div"}
            display={"inline"}
          >
            {data?.data.email}
          </Typography>
        </Col>
        <Col>
          <Typography variant={"h4"} display={"inline"} isLoading={isLoading}>
            Rating:{" "}
          </Typography>
          <Typography
            isLoading={isLoading}
            variant={"h4"}
            className={"fw-normal"}
            component={"div"}
            display={"inline"}
          >
            <Rating rating={data?.data.meanRating} />
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography variant={"h4"} display={"inline"} isLoading={isLoading}>
            Address:{" "}
          </Typography>
          <Typography
            isLoading={isLoading}
            variant={"h4"}
            className={"fw-normal"}
            component={"div"}
            display={"inline"}
          >
            {data?.data.address.street} {data?.data.address.houseNumber},{" "}
            {data?.data.address.postalCode} {data?.data.address.city}
          </Typography>
        </Col>
      </Row>
    </>
  );
};
