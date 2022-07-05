import React from "react";
import { CardBody, Card, Typography, Col } from "../ui";

const CreditDiscount = ({
  discountTitle,
  discountValue,
  discountDuration,
  productLabel,
  productPrice,
  onClick,
}: {
  discountTitle: string;
  discountDuration: number;
  discountValue: number;
  productLabel: string;
  productPrice: number;
  onClick: () => void;
}) => (
  <Col>
    <Card color={"primary"} hoverable onClick={onClick}>
      <CardBody>
        <Typography variant={"h1"}>{discountTitle} 🎉</Typography>
        <Typography variant={"h2"} className={"fw-normal"}>
          Get <strong>{productLabel}</strong> for only{" "}
          <strong>{(productPrice - discountValue) / 100} €</strong>.
        </Typography>
        <Typography variant={"p"}>
          Only valid for the next{" "}
          {(discountDuration - new Date().getTime() / 1000) / 60} minutes!
        </Typography>
      </CardBody>
    </Card>
  </Col>
);

export default CreditDiscount;
