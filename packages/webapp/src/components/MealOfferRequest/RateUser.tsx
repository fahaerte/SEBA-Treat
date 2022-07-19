import React, { useEffect, useState } from "react";
import { Button, Col, dangerToast, Icon, Row, successToast } from "../ui";
import { sum } from "lodash";
import { useMutation } from "react-query";
import { useAuthContext } from "../../utils/auth/AuthProvider";
import { rateUser as rateUserCall } from "../../api/ratingApi";

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
  const { token } = useAuthContext();

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

  const rateUserMutation = useMutation(
      () => rateUserCall(token as string,mealOfferId,mealReservationId,sum(rating)),
      {
        onSuccess: () => {
          successToast({ message: "You rated the user" });
          setFinalRating(sum(rating));
        },
        onError: (error: any) => {
          dangerToast({ message: error.response.data.message });
        },
      }
  )

  const rateUser = () => {
    rateUserMutation.mutate();
  };

  const getRateButton = () => {
    if (finalRating === undefined) {
      return (
        <Button onClick={() => rateUser()} disabled={sum(rating) === 0}>
          Rate user
        </Button>
      );
    }
  };

  useEffect(() => {
    if (existingRating !== undefined) {
      updateRating(existingRating - 1);
    }
  },[existingRating]);

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
