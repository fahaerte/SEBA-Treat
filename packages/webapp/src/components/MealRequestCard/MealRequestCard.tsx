import React from "react";
import { Button, Card, CardBody, Col, Icon, Row, Typography } from "../";
import { SCMealCardInfo } from "./styles";

const MealRequestCard = ({
  className = "",
  productName,
  mealPrice,
  transactionFee,
  disableButton,
  disabledText = "",
  buttonAction,
}: {
  className?: string;
  productName: string;
  mealPrice: number;
  transactionFee: number;
  disableButton: boolean;
  disabledText?: string;
  buttonAction: () => void;
}) => {
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
            <li>Make a request for the meal</li>
            <li>Wait until the seller accepts the request</li>
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
          {!disableButton ? (
            <Button className="px-3" onClick={buttonAction}>
              Reserve meal
            </Button>
          ) : (
            <Typography
              align={"center"}
              color={"warning"}
              variant={"h3"}
              component={"div"}
            >
              <Icon size={"md"} type={"exclamationTriangle"} /> {disabledText}
            </Typography>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default MealRequestCard;
