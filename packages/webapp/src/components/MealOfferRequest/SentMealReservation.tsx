import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button, Icon } from "../ui";
import UserService from "../../services/user.service";
import MealOfferService from "../../services/mealOffer.service";
import MealReservationState from "../../types/enums/mealReservationState.enum";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";

interface SentMealOfferRequestBottomProps {
  mealOfferId: string;
  sellerId: string;
  sellerFirstName: string;
  sellerLastName: string;
  reservation: MealReservation;
}

export const SentMealReservation = ({
  mealOfferId,
  sellerId,
  sellerFirstName,
  sellerLastName,
  reservation,
}: SentMealOfferRequestBottomProps) => {
  const [reservationState, setReservationState] = useState(
    reservation.reservationState
  );
  const [profilePicture, setProfilePicture] = useState("");

  const fetchSellerData = useCallback(async () => {
    try {
      setProfilePicture(await UserService.getProfilePictureURL(sellerId));
    } catch (error: any) {
      console.log(error);
    }
  }, [sellerId]);

  async function updateReservationState(newState: MealReservationState) {
    try {
      await MealOfferService.updateMealReservationState(
        mealOfferId,
        reservation._id,
        newState
      );
      setReservationState(newState);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSellerData().catch((error) => console.error(error));
  }, [fetchSellerData]);

  function getActionElement() {
    if (reservationState == MealReservationState.PENDING) {
      return <span>Wait for the seller to respond to your request</span>;
    } else if (reservationState == MealReservationState.SELLER_ACCEPTED) {
      return (
        <Button
          onClick={() =>
            updateReservationState(MealReservationState.BUYER_CONFIRMED)
          }
        >
          Confirm Request
        </Button>
      );
    } else if (reservationState == MealReservationState.SELLER_REJECTED) {
      return <span>The seller rejected your request</span>;
    } else if (reservationState == MealReservationState.BUYER_REJECTED) {
      return <span>You cancelled your request</span>;
    } else if (reservationState == MealReservationState.BUYER_CONFIRMED) {
      return (
        <Button onClick={() => console.log("Rate")}>Rate the seller</Button>
      );
    }
  }

  function getActionBar() {
    if (
      reservationState == MealReservationState.BUYER_CONFIRMED ||
      reservationState == MealReservationState.BUYER_REJECTED ||
      reservationState == MealReservationState.SELLER_REJECTED
    ) {
      return (
        <Row>
          <Col className={"col-sm-auto"}>{getActionElement()}</Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col className={"col-sm-auto"}>
            <Button
              color={"light"}
              onClick={() =>
                updateReservationState(MealReservationState.BUYER_REJECTED)
              }
            >
              Cancel Request
            </Button>
          </Col>
          <Col className={"col-sm-auto align-items-center d-flex"}>
            {getActionElement()}
          </Col>
        </Row>
      );
    }
  }

  return (
    <Row className={""}>
      <MealOfferRequestUserInfo
        userId={sellerId}
        firstName={sellerFirstName}
        lastName={sellerLastName}
      />
      <Col className={""}>
        <Row>
          <Col className={"col-sm-auto"}>
            <Icon type={"info"}></Icon>
          </Col>
          <Col className={"col-sm-auto"}>Sterne</Col>
        </Row>
      </Col>
      <Col className={"col-sm-auto"}>{getActionBar()}</Col>
    </Row>
  );
};
