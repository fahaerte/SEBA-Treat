import React from "react";
import { Col, Icon, Link, Row, Typography } from "../ui";
import { useQuery } from "react-query";
import { getUser } from "../../api/userApi";
import { Rating } from "./Rating";
import { getCookie } from "../../utils/auth/CookieProvider";

export const ProfileOverview = () => {
  const userId = getCookie("userIs");

  const { isLoading, data } = useQuery(["getUser", userId], () => getUser());

  return (
    <>
      <Row className={"mt-3"}>
        <Col>
          <Typography variant={"h4"} display={"inline"}>
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
          <Typography variant={"h4"} display={"inline"}>
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
          <Typography variant={"h4"} display={"inline"}>
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
          <Typography variant={"h4"} display={"inline"}>
            Birthdate:{" "}
          </Typography>
          <Typography
            isLoading={isLoading}
            variant={"h4"}
            className={"fw-normal"}
            component={"div"}
            display={"inline"}
          >
            {new Date(data?.data.birthdate).toLocaleDateString()}
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography variant={"h4"} display={"inline"}>
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
        <Col>
          <Typography variant={"h4"} display={"inline"}>
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
      <Link to={"/account/edit"} className={"mt-3"} display={"button"}>
        <Icon type={"gear"} /> Edit Profile
      </Link>
    </>
  );
};
