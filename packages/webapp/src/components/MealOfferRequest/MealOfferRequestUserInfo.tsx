import React from "react";
import { Col, Row } from "../ui/Grid";
import styled from "styled-components";
import { Icon } from "../ui";
import { useQuery } from "react-query";
import { getProfilePictureURL } from "../../api/userApi";
import { IUser } from "@treat/lib-common";

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
`;

interface MealOfferRequestUserInfoProps {
  user: IUser;
}

export const MealOfferRequestUserInfo = ({
  user,
}: MealOfferRequestUserInfoProps) => {
  const { data, status } = useQuery(
    "getProfilePicture",
    () => getProfilePictureURL(user._id),
    {
      onSuccess: (response) => {
        console.log(response);
      },
    }
  );

  return (
    <Col>
      <Row>
        <Col className={"col-3"}>
          <Row>
            <Col className={"col-sm-auto"}>
              <ProfilePicture
                src={`${process.env.PROFILE_PICTURES_URL}/${user.profilePicture}`}
              />
            </Col>
            <Col className={"col-sm-auto my-auto p-0"}>
              {`${user.firstName}`}
            </Col>
          </Row>
        </Col>
        <Col className={"d-flex align-items-center"}>
          <Row>
            <Col className={"col-sm-auto p-0"}>
              <Icon type={"star-fill"}></Icon>
            </Col>
            <Col className={"col-sm-auto"}>{user.meanRating} Sterne</Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
