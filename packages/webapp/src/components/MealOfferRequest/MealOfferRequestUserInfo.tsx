import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "../ui/Grid";
import styled from "styled-components";
import { Icon } from "../ui";
import { getProfilePictureURL } from "../../api/userApi";

interface MealOfferRequestUserInfoProps {
  userId: string;
  firstName: string;
  lastName: string;
  meanRating: number;
}

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
  const [profilePicture, setProfilePicture] = useState("");

  const fetchUserData = useCallback(async () => {
    try {
      setProfilePicture(
        await getProfilePictureURL(String(userId), "undefined")
      );
    } catch (error: any) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData().catch((error) => console.error(error));
  }, [fetchUserData]);

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
