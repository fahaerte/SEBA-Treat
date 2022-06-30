import React, { useState } from "react";
import { Col, Row } from "../Grid";
import { Button, Icon } from "../index";
import MealOfferService from "../../services/mealOffer.service";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import MealReservationState from "../../types/enums/mealReservationState.enum";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";

interface ReceivedMealReservationProps {
  mealOfferId: string;
  reservation: MealReservation;
}

export const ReceivedMealReservation = ({
  mealOfferId,
  reservation,
}: ReceivedMealReservationProps) => {
  const [reservationState, setReservationState] = useState(
    reservation.reservationState
  );

  async function updateReservationState(newState: MealReservationState) {
    try {
      await MealOfferService.updateMealReservationState(
        String(mealOfferId),
        reservation._id,
        newState
      );
      setReservationState(newState);
    } catch (error: any) {
      console.log(error);
    }
  }

  function getActionButton() {
    let label = "Default";
    let newState: MealReservationState;
    let disabled = false;
    if (reservationState == MealReservationState.PENDING) {
      label = "Accept offer";
      newState = MealReservationState.SELLER_ACCEPTED;
    } else if (reservationState == MealReservationState.SELLER_ACCEPTED) {
      label = "You accepted wait for buyer";
      disabled = true;
    } else if (reservationState == MealReservationState.SELLER_REJECTED) {
      label = "You rejected";
      disabled = true;
    } else if (reservationState == MealReservationState.BUYER_REJECTED) {
      label = "Buyer rejected";
      disabled = true;
    } else if (reservationState == MealReservationState.BUYER_CONFIRMED) {
      label = "Rate TODO";
    }
    return (
      <Button
        onClick={() => updateReservationState(newState)}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  }

  function getActionBar() {
    if (
      reservationState == MealReservationState.BUYER_REJECTED ||
      reservationState == MealReservationState.SELLER_REJECTED
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
              onClick={() =>
                updateReservationState(MealReservationState.SELLER_REJECTED)
              }
            >
              Decline offer
            </Button>
          </Col>
          <Col className={"col-sm-auto"}>{getActionButton()}</Col>
        </Row>
      );
    }
  }

  return (
    <Row className={""}>
      <MealOfferRequestUserInfo userId={reservation.buyer} />
      <Col className={""}>
        <Row className={"h-100"}>
          <Col className={"col-sm-auto d-flex align-items-center"}>
            <Icon type={"info"}></Icon>
          </Col>
          <Col className={"col-sm-auto my-auto"}>Sterne</Col>
        </Row>
      </Col>
      <Col className={"col-sm-auto d-flex align-items-center"}>
        {getActionBar()}
      </Col>
    </Row>
  );
};
