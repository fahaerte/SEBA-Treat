import React, { useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button, dangerToast, successToast } from "../ui";
// import MealReservation from "../../types/interfaces/mealReservation.interface";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";
import { RateUser } from "./RateUser";
import { EMealReservationState } from "@treat/lib-common";
import { useMutation } from "react-query";
import {
  updateMealReservationState,
  PopulatedReservations,
} from "../../api/mealApi";
import { AxiosError } from "axios";

interface ReceivedMealReservationProps {
  mealOfferId: string;
  reservation: PopulatedReservations;
  buyerRating: number | undefined;
}

export const ReceivedMealReservation = ({
  // mealOfferId,
  reservation,
  buyerRating,
}: ReceivedMealReservationProps) => {
  const [reservationState, setReservationState] = useState(
    reservation.reservationState
  );

  const updateReservationStateMutation = useMutation(
    (newState: EMealReservationState) =>
      updateMealReservationState(reservation._id, newState),
    {
      onSuccess: () => {
        successToast({ message: "You changed the state of your reservation." });
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response) {
          dangerToast({
            message: error.response.data.message,
          });
        } else {
          dangerToast({
            message:
              "Unexpected server error. The state of your reservation could not be updated.",
          });
        }
      },
    }
  );

  const updateReservationState = (newState: EMealReservationState) => {
    updateReservationStateMutation.mutate(newState);
    setReservationState(newState);
  };

  const getActionButton = () => {
    if (reservationState == EMealReservationState.PENDING) {
      return (
        <Button
          onClick={() =>
            updateReservationState(EMealReservationState.SELLER_ACCEPTED)
          }
        >
          Accept offer
        </Button>
      );
    } else if (reservationState == EMealReservationState.SELLER_ACCEPTED) {
      return <span>You accepted the reservation, wait for buyer</span>;
    } else if (reservationState == EMealReservationState.SELLER_REJECTED) {
      return <span>You rejected the reservation</span>;
    } else if (reservationState == EMealReservationState.BUYER_REJECTED) {
      return <span>The buyer cancelled the reservation</span>;
    } else if (reservationState == EMealReservationState.BUYER_CONFIRMED) {
      return (
        <RateUser
          // mealOfferId={mealOfferId}
          mealReservationId={reservation._id}
          existingRating={buyerRating ? buyerRating : undefined}
        />
      );
    }
  };

  function getActionBar() {
    if (
      reservationState == EMealReservationState.BUYER_REJECTED ||
      reservationState == EMealReservationState.SELLER_REJECTED ||
      reservationState == EMealReservationState.BUYER_CONFIRMED ||
      reservationState == EMealReservationState.SELLER_ACCEPTED
    ) {
      return (
        <Row>
          <Col className={"col-sm-auto"}>{getActionButton()}</Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col className={"col-sm-auto"}>
            <Button
              color={"light"}
              onClick={() =>
                updateReservationState(EMealReservationState.SELLER_REJECTED)
              }
            >
              Decline offer
            </Button>
          </Col>
          <Col className={"col-sm-auto align-items-center d-flex"}>
            {getActionButton()}
          </Col>
        </Row>
      );
    }
  }

  return (
    <Row className={""}>
      <MealOfferRequestUserInfo user={reservation.buyer} />
      <Col className={"col-sm-auto d-flex align-items-center"}>
        {getActionBar()}
      </Col>
    </Row>
  );
};
