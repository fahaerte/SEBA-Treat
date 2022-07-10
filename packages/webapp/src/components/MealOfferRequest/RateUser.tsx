import React, { useEffect, useState } from "react";
import { Button, Col, Icon, Row } from "../ui";
import { sum } from "lodash";
import MealTransactionService from "../../services/mealTransaction.service";

interface RateUserProps {
  mealOfferId: string;
  mealReservationId: string;
  existingRating?: number;
}

export const RateUser = ({
  mealOfferId,
  mealReservationId,
  existingRating,
}: RateUserProps) => {
  const [rating, setRating] = useState([0, 0, 0, 0, 0]);
  const [finalRating, setFinalRating] = useState(existingRating);

  const updateRating = (index: number) => {
    if (+(rating[index] == 0) == 1) {
      rating.fill(1, 0, index + 1);
      rating.fill(0, index + 1);
    } else {
      rating.fill(0, index);
    }
    setRating([...rating]);
  };

  const createRating = async () => {
    try {
      await MealTransactionService.rateTransaction(
        mealOfferId,
        mealReservationId,
        sum(rating)
      );
      setFinalRating(sum(rating));
    } catch (error: any) {
      console.error(error);
    }
  };

  const getRateButton = () => {
    if (finalRating === undefined) {
      return (
        <Button onClick={() => createRating()} disabled={sum(rating) === 0}>
          Rate user
        </Button>
      );
    }
  };

  useEffect(() => {
    if (existingRating !== undefined) {
      updateRating(existingRating - 1);
    }
  }, []);

  return (
    <Row className={""}>
      <Col className={"align-items-center d-flex"}>
        {rating.map((value, index) => {
          const type = value === 0 ? "star" : "star-fill";
          return (
            <div
              key={index}
              onClick={() => {
                if (finalRating !== sum(rating)) {
                  updateRating(index);
                }
              }}
            >
              <Icon className={"mx-1"} type={type} />
            </div>
          );
        })}
      </Col>
      <Col className={"col-sm-auto"}>{getRateButton()}</Col>
    </Row>
  );
};
