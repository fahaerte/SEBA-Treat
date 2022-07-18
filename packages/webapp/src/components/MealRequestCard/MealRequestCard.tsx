import React from "react";
// import { ICard } from "../ui/Card/ICard";
// import { SCMealRequestCard } from "./styles";
import { Button, Card, CardBody, Col, Row, Typography } from "../";

// TODO: replace inline styles with component styles

const MealRequestCard = ({
  className = "",
  productName,
  mealPrice,
  transactionFee,
  buttonAction,
}: {
  className?: string;
  productName: string;
  mealPrice: number;
  transactionFee: number;
  buttonAction: () => void;
}) => (
  <Card className={`${className}`}>
    <CardBody className={"my-3"}>
      <Typography variant={"h1"} className={"mb-3"}>
        Order {productName}
      </Typography>
      <div
        style={{
          padding: "1em",
          marginBottom: "1em",
          backgroundColor: "#EFEFEF",
          border: "1px solid #CFCFCF",
          borderRadius: "10px",
        }}
      >
        <p>
          <b>How to buy meal</b>
        </p>
        <ul>
          <li>Check allergens if you have any</li>
          <li>Request meal</li>
          <li>Wait until Sender accepts request</li>
          <li>Confirm transaction (only then, you are charged)</li>
        </ul>
      </div>
      <Row>
        <Col>
          <Typography>Meal Price</Typography>
        </Col>
        <Col>
          <Typography style={{ textAlign: "right" }}>{mealPrice} Cr</Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography>
            Service Fee ({Math.round((transactionFee / mealPrice) * 100)}%)
          </Typography>
        </Col>
        <Col>
          <Typography style={{ textAlign: "right" }}>
            {transactionFee} Cr
          </Typography>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <Typography variant={"h3"}>Total</Typography>
        </Col>
        <Col>
          <Typography variant={"h3"} style={{ textAlign: "right" }}>
            {mealPrice + transactionFee} Cr
          </Typography>
        </Col>
      </Row>
      <Button className="px-3" onClick={buttonAction}>
        Request meal
      </Button>
    </CardBody>
  </Card>
  // <SCMealRequestCard
  //   color={color}
  //   className={["card", hoverable ? "card-hover" : "", className].join(" ")}
  // >
  //   <div>
  //     <p>
  //       <b>How to buy meal</b>
  //     </p>
  //     <ul>
  //       <li>Check allergens if you have any</li>
  //       <li>Request meal</li>
  //       <li>Wait until Sender accepts request</li>
  //       <li>Confirm transaction (only then, you are charged)</li>
  //     </ul>
  //   </div>
  //   {children}
  // </SCMealRequestCard>
);

export default MealRequestCard;
