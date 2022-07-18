import React, { useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button } from "../ui";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";
import { RateUser } from "./RateUser";
import { EMealReservationState } from "@treat/lib-common";
import { useMutation } from "react-query";
import { updateMealReservationState } from "../../api/mealApi";
import { useAuthContext } from "../../utils/auth/AuthProvider";

interface ReceivedMealReservationProps {
  mealOfferId: string;
  reservation: MealReservation;
  buyerRating: number | undefined;
}

export const ReceivedMealReservation = ({
  mealOfferId,
  reservation,
  buyerRating,
}: ReceivedMealReservationProps) => {
  const { token } = useAuthContext();

  const [reservationState, setReservationState] = useState(
    reservation.reservationState
  );

  const updateReservationStateMutation = useMutation(
    (newState: EMealReservationState) =>
      updateMealReservationState(
        token as string,
        mealOfferId,
        reservation._id,
        newState
      )
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
      return <span>You accepted the request, wait for buyer</span>;
    } else if (reservationState == EMealReservationState.SELLER_REJECTED) {
      return <span>You rejected the request</span>;
    } else if (reservationState == EMealReservationState.BUYER_REJECTED) {
      return <span>The buyer cancelled the request</span>;
    } else if (reservationState == EMealReservationState.BUYER_CONFIRMED) {
      return (
        <RateUser
          mealOfferId={mealOfferId}
          mealReservationId={reservation._id}
          existingRating={buyerRating}
        />
      );
    }
  };

  function getActionBar() {
    if (
      reservationState == EMealReservationState.BUYER_REJECTED ||
      reservationState == EMealReservationState.SELLER_REJECTED ||
      reservationState == EMealReservationState.BUYER_CONFIRMED
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
      <MealOfferRequestUserInfo
        userId={reservation.buyer._id}
        firstName={reservation.buyer.firstName}
        lastName={reservation.buyer.lastName}
        meanRating={reservation.buyer.meanRating}
      />
      <Col className={"col-sm-auto d-flex align-items-center"}>
        {getActionBar()}
      </Col>
    </Row>
  );
};
