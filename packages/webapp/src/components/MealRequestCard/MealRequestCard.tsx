import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  dangerToast,
  Icon,
  Row,
  successToast,
  Typography,
  warningToast,
} from "../";
import { SCMealCardInfo } from "./styles";
import { useMutation } from "react-query";
import { requestMealOffer } from "../../api/mealApi";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const MealRequestCard = ({
  mealOfferId,
  userId,
  className = "",
  productName,
  mealPrice,
  transactionFee,
  disabledText = "",
}: {
  mealOfferId: string;
  userId: string;
  className?: string;
  productName: string;
  mealPrice: number;
  transactionFee: number;
  disabledText?: string;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [reservationLoading, setReservationLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(disabledText.length > 0);
  const [tooltipText, setTooltipText] = useState(disabledText);

  const requestMealMutation = useMutation(requestMealOffer, {
    onMutate: () => {
      setReservationLoading(true);
    },
    onSuccess: () => {
      setReservationLoading(false);
      setDisableButton(true);
      setTooltipText("You have just reserved this meal.");
      successToast({
        message:
          "The meal has been reserved for you. Now, the chef can accept it.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        dangerToast({
          message: error.response.data.message,
        });
      } else {
        dangerToast({
          message: "Unexpected server error. The meal could not be reserved.",
        });
      }
    },
  });

  function handleRequestClick() {
    if (!userId) {
      warningToast({ message: "Please log in to reserve this meal." });
      navigate("/login", { state: { from: location } });
    } else {
      void requestMealMutation.mutate({
        mealOfferId: mealOfferId,
      });
    }
  }

  return (
    <Card className={`${className} mb-3`}>
      <CardBody className={"my-3"}>
        <Typography variant={"h1"} className={"mb-3"}>
          Order {productName}
        </Typography>
        <SCMealCardInfo className={"px-2 py-3 mb-3"}>
          <div
            className={"d-flex justify-content-between align-items-center mb-3"}
          >
            <span style={{ fontWeight: "bold", width: "auto" }}>
              How to buy a meal
            </span>
            <Icon type={"infoCircle"} size={"md"} />
          </div>
          <ol className={"ms-2"}>
            <li>Check allergens if you have any</li>
            <li>Reserve the meal</li>
            <li>Wait until the seller accepts the reservation</li>
            <li>
              Confirm the transaction (<u>only then, you are charged</u>)
            </li>
          </ol>
        </SCMealCardInfo>
        <Row>
          <Col>
            <Typography>Meal Price</Typography>
          </Col>
          <Col>
            <Typography align={"end"}>{mealPrice} Cr</Typography>
          </Col>
        </Row>
        <Row justify={"between"}>
          <Col>
            <Typography>
              Service Fee ({Math.round((transactionFee / mealPrice) * 100)}%)
            </Typography>
          </Col>
          <Col>
            <Typography align={"end"}>{transactionFee} Cr</Typography>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Typography variant={"h3"}>Total</Typography>
          </Col>
          <Col>
            <Typography variant={"h3"} align={"end"}>
              {mealPrice + transactionFee} Cr
            </Typography>
          </Col>
        </Row>
        <Row className={"mt-3"}>
          <span data-tip={tooltipText} style={{ margin: "0 0 0 auto" }}>
            <Button
              className="px-3 reserve-meal"
              onClick={handleRequestClick}
              disabled={disableButton}
              isLoading={reservationLoading}
            >
              Reserve meal
            </Button>
          </span>
          <ReactTooltip
            className={"tooltip"}
            effect={"solid"}
            backgroundColor={"#ffc107"}
            textColor={"black"}
          />
        </Row>
      </CardBody>
    </Card>
  );
};

export default MealRequestCard;
