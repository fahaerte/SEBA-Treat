import React from "react";
import { Col, Row } from "../ui/Grid";
import { Icon } from "../ui";
import { IUser } from "@treat/lib-common";

interface MealOfferRequestUserInfoProps {
  user: IUser;
}

export const MealOfferRequestUserInfo = ({
  user,
}: MealOfferRequestUserInfoProps) => {
  return (
    <Col>
      <Row>
        <Col className={"col-3"}>
          <Row>
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
