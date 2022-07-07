import React, { useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button, Icon } from "../ui";
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

  const updateReservationState = async (newState: MealReservationState) => {
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
  };

  const getActionButton = () => {
    if (reservationState == MealReservationState.PENDING) {
      return (
        <Button
          onClick={() =>
            updateReservationState(MealReservationState.SELLER_ACCEPTED)
          }
        >
          Accept offer
        </Button>
      );
    } else if (reservationState == MealReservationState.SELLER_ACCEPTED) {
      return <span>You accepted the request, wait for buyer</span>;
    } else if (reservationState == MealReservationState.SELLER_REJECTED) {
      return <span>You rejected the request</span>;
    } else if (reservationState == MealReservationState.BUYER_REJECTED) {
      return <span>The buyer cancelled the request</span>;
    } else if (reservationState == MealReservationState.BUYER_CONFIRMED) {
      return (
        <Button onClick={() => console.log("Rate")}>Rate the seller</Button>
      );
    }
  };

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
              color={"light"}
              onClick={() =>
                updateReservationState(MealReservationState.SELLER_REJECTED)
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
      />
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
