import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "../ui/Grid";
import styled from "styled-components";
import { MealOfferRequestUserInfoProps } from "@treat/lib-common/lib/interfaces/IMealOfferRequestUserInfoProps";
import { useQuery } from "react-query";
import { getProfilePictureURL, getUser } from "../../api/userApi";

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
}: MealOfferRequestUserInfoProps) => {
  const { data: profilePicture } = useQuery(["getProfilePicture", userId], () =>
    getProfilePictureURL(userId)
  );

  return (
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
  );
};
