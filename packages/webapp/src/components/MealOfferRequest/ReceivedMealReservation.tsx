import React, { useCallback, useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { Col, Row } from "../Grid";
import { Button, Icon } from "../index";
import MealOfferService from "../../services/mealOffer.service";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import User from "../../types/interfaces/user.interface";
import MealReservationState from "../../types/enums/mealReservationState.enum";

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
  const [buyer, setBuyer] = useState({} as User);

  const fetchBuyerData = useCallback(async () => {
    const buyer = await UserService.getUser(String(reservation.buyer));
    console.log(buyer);
    setBuyer(buyer);
  }, [reservation]);

  useEffect(() => {
    fetchBuyerData().catch(console.error);
  }, [fetchBuyerData]);

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
      <Col className={"col-2"}>
        <Row>
          <Col className={"col-sm-auto"}>Bild</Col>
          <Col className={"col-sm-auto"}>
            {`${buyer.firstName} ${buyer.lastName}`}
          </Col>
        </Row>
      </Col>
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
