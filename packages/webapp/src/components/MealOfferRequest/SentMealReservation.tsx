import React, { useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button } from "../ui";
import MealOfferService from "../../services/mealOffer.service";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";
import { RateUser } from "./RateUser";
import { EMealReservationState } from "@treat/lib-common";

interface SentMealOfferRequestBottomProps {
  mealOfferId: string;
  sellerId: string;
  sellerFirstName: string;
  sellerLastName: string;
  reservation: MealReservation;
  sellerRating: number | undefined;
  sellerMeanRating: number;
}

export const SentMealReservation = ({
  mealOfferId,
  sellerId,
  sellerFirstName,
  sellerLastName,
  reservation,
  sellerRating,
  sellerMeanRating,
}: SentMealOfferRequestBottomProps) => {
  const [reservationState, setReservationState] = useState(
    reservation.reservationState
  );

  const updateReservationState = async (newState: EMealReservationState) => {
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
  };

  function getActionElement() {
    if (reservationState == EMealReservationState.PENDING) {
      return <span>Wait for the seller to respond to your request</span>;
    } else if (reservationState === EMealReservationState.SELLER_ACCEPTED) {
      return (
        <Button
          onClick={() =>
            updateReservationState(EMealReservationState.BUYER_CONFIRMED)
          }
        >
          Confirm Request
        </Button>
      );
    } else if (reservationState === EMealReservationState.SELLER_REJECTED) {
      return <span>The seller rejected your request</span>;
    } else if (reservationState === EMealReservationState.BUYER_REJECTED) {
      return <span>You cancelled your request</span>;
    } else if (reservationState === EMealReservationState.BUYER_CONFIRMED) {
      return (
        <RateUser
          mealOfferId={mealOfferId}
          mealReservationId={reservation._id}
          existingRating={sellerRating}
        />
      );
    }
  }

  const getActionBar = () => {
    if (
      reservationState == EMealReservationState.BUYER_CONFIRMED ||
      reservationState == EMealReservationState.BUYER_REJECTED ||
      reservationState == EMealReservationState.SELLER_REJECTED
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
                updateReservationState(EMealReservationState.BUYER_REJECTED)
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
  };

  return (
    <Row className={""}>
      <MealOfferRequestUserInfo
        userId={sellerId}
        firstName={sellerFirstName}
        lastName={sellerLastName}
        meanRating={sellerMeanRating}
      />

      <Col className={"col-sm-auto"}>{getActionBar()}</Col>
    </Row>
  );
};
