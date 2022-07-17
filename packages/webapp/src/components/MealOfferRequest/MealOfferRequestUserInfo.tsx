import React from "react";
import { Col, Row } from "../ui/Grid";
import styled from "styled-components";
import { Icon } from "../ui";
import { MealOfferRequestUserInfoProps } from "@treat/lib-common/lib/interfaces/IMealOfferRequestUserInfoProps";
import { useQuery } from "react-query";
import { getProfilePictureURL, getUser } from "../../api/userApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
`;

export const MealOfferRequestUserInfo = ({
  userId,
  firstName,
  lastName,
  meanRating,
}: MealOfferRequestUserInfoProps) => {
  const { data: profilePicture } = useQuery("getProfilePicture", () =>
    getProfilePictureURL(userId, token as string)
  );

  const { token } = useAuthContext();

  return (
    <Col>
      <Row>
        <Col className={"col-3"}>
          <Row>
            <Col className={"col-sm-auto"}>
              <ProfilePicture src={profilePicture} />
            </Col>
            <Col className={"col-sm-auto my-auto p-0"}>
              {`${firstName} ${lastName}`}
            </Col>
          </Row>
        </Col>
        <Col className={"d-flex align-items-center"}>
          <Row>
            <Col className={"col-sm-auto p-0"}>
              <Icon type={"star-fill"}></Icon>
            </Col>
            <Col className={"col-sm-auto"}>{meanRating} Sterne</Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
