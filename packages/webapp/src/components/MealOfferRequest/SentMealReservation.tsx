import React, { useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button } from "../ui";
import MealOfferService from "../../services/mealOffer.service";
import MealReservationState from "../../types/enums/mealReservationState.enum";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";
import { RateUser } from "./RateUser";

// import { getProfilePictureURL } from "../../api/userApi";

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

  const updateReservationState = async (newState: MealReservationState) => {
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
    if (reservationState == MealReservationState.PENDING) {
      return <span>Wait for the seller to respond to your request</span>;
    } else if (reservationState === MealReservationState.SELLER_ACCEPTED) {
      return (
        <Button
          onClick={() =>
            updateReservationState(MealReservationState.BUYER_CONFIRMED)
          }
        >
          Confirm Request
        </Button>
      );
    } else if (reservationState === MealReservationState.SELLER_REJECTED) {
      return <span>The seller rejected your request</span>;
    } else if (reservationState === MealReservationState.BUYER_REJECTED) {
      return <span>You cancelled your request</span>;
    } else if (reservationState === MealReservationState.BUYER_CONFIRMED) {
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
