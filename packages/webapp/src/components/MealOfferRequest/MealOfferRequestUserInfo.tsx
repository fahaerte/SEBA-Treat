import React, { useCallback, useEffect, useState } from "react";
import User from "../../types/interfaces/user.interface";
import UserService from "../../services/user.service";
import { Col, Row } from "../ui/Grid";
import styled from "styled-components";

interface MealOfferRequestUserInfoProps {
  userId: string;
}

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
`;

export const MealOfferRequestUserInfo = ({
  userId,
}: MealOfferRequestUserInfoProps) => {
  const [user, setUser] = useState({} as User);
  const [profilePicture, setProfilePicture] = useState("");

  const fetchUserData = useCallback(async () => {
    try {
      setUser(await UserService.getUser(userId));
      setProfilePicture(await UserService.getProfilePictureURL(userId));
    } catch (error: any) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData().catch((error) => console.error(error));
  }, [fetchUserData]);

  return (
    <Col className={"col-3"}>
      <Row>
        <Col className={"col-sm-auto"}>
          <ProfilePicture src={profilePicture} />
        </Col>
        <Col className={"col-sm-auto my-auto p-0"}>
          {`${user.firstName} ${user.lastName}`}
        </Col>
      </Row>
    </Col>
  );
};
