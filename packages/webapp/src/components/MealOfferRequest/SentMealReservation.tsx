import React, { useState } from "react";
import { Col, Row } from "../ui/Grid";
import { Button, dangerToast, successToast } from "../ui";
import { MealOfferRequestUserInfo } from "./MealOfferRequestUserInfo";
import { RateUser } from "./RateUser";
import {
  EMealReservationState,
  IMealReservation,
  IUser,
} from "@treat/lib-common";
import { useMutation } from "react-query";
import { updateMealReservationState } from "../../api/mealApi";
import { AxiosError } from "axios";

interface SentMealOfferRequestBottomProps {
  mealOfferId: string;
  seller: Partial<IUser>;
  reservation: IMealReservation;
  sellerRating: number | undefined;
}

export const SentMealReservation = ({
  // mealOfferId,
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

  function getActionElement() {
    if (reservationState == EMealReservationState.PENDING) {
      return <span>Wait for the seller to respond to your reservation</span>;
    } else if (reservationState === EMealReservationState.SELLER_ACCEPTED) {
      return (
        <Button
          onClick={() =>
            updateReservationState(EMealReservationState.BUYER_CONFIRMED)
          }
        >
          Confirm reservation
        </Button>
      );
    } else if (reservationState === EMealReservationState.SELLER_REJECTED) {
      return <span>The seller rejected your reservation</span>;
    } else if (reservationState === EMealReservationState.BUYER_REJECTED) {
      return <span>You cancelled your reservation</span>;
    } else if (reservationState === EMealReservationState.BUYER_CONFIRMED) {
      return (
        <RateUser
          // mealOfferId={mealOfferId}
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
              Cancel reservation
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
