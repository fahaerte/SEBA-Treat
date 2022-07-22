import React from "react";
import { Col, Row, SectionHeading, Typography } from "../ui";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { Rating } from "./Rating";
import { getCookie } from "../../utils/auth/CookieProvider";

export const UserOverview = () => {
  const userId = getCookie("userIs");

  const { isLoading, data } = useQuery(["getUser", userId], () => getUser());

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <SectionHeading>Your Profile Information</SectionHeading>
          <Row>
            <Col>
              <Typography variant={"h4"} display={"inline"}>
                First Name:{"  "}
              </Typography>
              <Typography
                variant={"h4"}
                className={"fw-normal"}
                component={"div"}
                display={"inline"}
              >
                {data?.data.firstName}
              </Typography>
            </Col>

            <Col>
              <Typography variant={"h4"} display={"inline"}>
                Last Name:{" "}
              </Typography>
              <Typography
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
              <Typography variant={"h4"} display={"inline"}>
                E-Mail:{" "}
              </Typography>
              <Typography
                variant={"h4"}
                className={"fw-normal"}
                component={"div"}
                display={"inline"}
              >
                {data?.data.email}
              </Typography>
            </Col>
            <Col>
              <Typography variant={"h4"} display={"inline"}>
                Rating:{" "}
              </Typography>
              <Typography
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
              <Typography variant={"h4"} display={"inline"}>
                Address:{" "}
              </Typography>
              <Typography
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
      )}
    </>
  );
};
