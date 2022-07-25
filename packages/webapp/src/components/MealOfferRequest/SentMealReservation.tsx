import React, { useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button, dangerToast, successToast } from "../ui";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";
import { RateUser } from "./RateUser";
import { EMealReservationState } from "@treat/lib-common";
import User from "../../types/interfaces/user.interface";
import { useMutation } from "react-query";
import { updateMealReservationState } from "../../api/mealApi";

interface SentMealOfferRequestBottomProps {
  mealOfferId: string;
  seller: User;
  reservation: MealReservation;
  sellerRating: number | undefined;
}

export const SentMealReservation = ({
  mealOfferId,
  seller,
  reservation,
  sellerRating,
}: SentMealOfferRequestBottomProps) => {
  const [reservationState, setReservationState] = useState(
    reservation.reservationState
  );

  const updateReservationStateMutation = useMutation(
    (newState: EMealReservationState) =>
      updateMealReservationState(reservation._id, newState),
    {
      onSuccess: () => {
        successToast({ message: "You changed the state of your reservation" });
      },
      onError: (error: any) => {
        dangerToast({ message: error.response.data.message });
      },
    }
  );

  const updateReservationState = (newState: EMealReservationState) => {
    updateReservationStateMutation.mutate(newState);
    setReservationState(newState);
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
          existingRating={sellerRating ? sellerRating : undefined}
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
      <MealOfferRequestUserInfo user={seller} />

      <Col className={"col-sm-auto"}>{getActionBar()}</Col>
    </Row>
  );
};
