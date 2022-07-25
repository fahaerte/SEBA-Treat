import React from "react";
// import { ICard } from "../ui/Card/ICard";
// import { SCMealRequestCard } from "./styles";
import { Button, Card, CardBody, Col, Icon, Row, Typography } from "../";
import { getCookie } from "../../utils/auth/CookieProvider";

// TODO: replace inline styles with component styles

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
        <div
          style={{
            padding: ".5rem .7rem",
            marginBottom: "1rem",
            backgroundColor: "#EFEFEF",
            border: "1px solid #CFCFCF",
            borderRadius: "3px",
            color: "#454545",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontWeight: "bold", width: "auto" }}>
              How to buy a meal
            </span>
            <Icon type={"infoCircle"} size={"md"} />
          </div>
          <ol style={{ paddingLeft: "1rem" }}>
            <li style={{ paddingLeft: ".5rem" }}>
              Check allergens if you have any
            </li>
            <li style={{ paddingLeft: ".5rem" }}>
              Make a request for the meal
            </li>
            <li style={{ paddingLeft: ".5rem" }}>
              Wait until the seller accepts the request
            </li>
            <li style={{ paddingLeft: ".5rem" }}>
              Confirm the transaction (<u>only then, you are charged</u>)
            </li>
          </ol>
        </div>
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
        <Row style={{ margin: "1rem 0 0 0" }}>
          {!disableButton ? (
            <Button className="px-3" onClick={buttonAction}>
              Reserve meal
            </Button>
          ) : (
            <Typography align={"center"} color={"warning"}>
              {disabledText}
            </Typography>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default MealRequestCard;
