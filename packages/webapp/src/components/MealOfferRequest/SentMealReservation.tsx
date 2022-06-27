import React, {useCallback, useEffect, useState} from "react";
import {Col, Row} from "../Grid";
import {Button, Icon} from "../index";
import UserService from "../../services/user.service";
import MealOfferService from "../../services/mealOffer.service";
import MealReservationState from "../../types/enums/mealReservationState.enum";
import MealReservation from "../../types/interfaces/mealReservation.interface";
import User from "../../types/interfaces/user.interface";

interface SentMealOfferRequestBottomProps {
    mealOfferId: string;
    sellerId: string;
    reservation: MealReservation;
}

export const SentMealReservation = ({
                                        mealOfferId,
                                        sellerId,
                                        reservation,
                                    }: SentMealOfferRequestBottomProps) => {
    const [reservationState, setReservationState] = useState(reservation.reservationState);
    const [seller, setSeller] = useState({} as User);

    const fetchSellerData = useCallback(async () => {
        try {
            const seller = await UserService.getUser(String(sellerId));
            setSeller(seller);
        } catch (error: any) {
            console.log(error);
        }
    }, [sellerId]);

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

    useEffect(() => {
        fetchSellerData().catch((error) => console.error(error));
    }, [fetchSellerData]);

    function getActionButton() {
        let label = "default";
        let newState = MealReservationState.PENDING;
        let disabled = false;
        if (reservationState == MealReservationState.PENDING) {
            label = "Pending";
            disabled = true;
        } else if (reservationState == MealReservationState.SELLER_ACCEPTED) {
            label = "Confirm";
            newState = MealReservationState.BUYER_CONFIRMED;
        } else if (reservationState == MealReservationState.SELLER_REJECTED) {
            label = "Seller rejected";
            disabled = true;
        } else if (reservationState == MealReservationState.BUYER_REJECTED) {
            label = "You rejected";
            disabled = true;
        } else if (reservationState == MealReservationState.BUYER_CONFIRMED) {
            label = "Rating TODO";
            disabled = true;
        }
        return (
            <Button
                onClick={() => updateReservationState(newState)}
                disabled={disabled}>
                {label}
            </Button>
        );
    }

    function getActionBar() {
        if (
            reservationState == MealReservationState.BUYER_CONFIRMED ||
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
                                updateReservationState(MealReservationState.BUYER_REJECTED)
                            }
                        >
                            Cancel Request
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
                        {`${seller.firstName} ${seller.lastName}`}
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
