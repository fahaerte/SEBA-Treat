import React from "react";
import { CardBody, Card, Typography, Button, Icon } from "../ui";

const CreditPackage = ({
  className = "",
  productName,
  price = 0,
  buttonAction,
}: {
  className?: string;
  productName: string;
  price?: number;
  buttonAction: () => void;
}) => (
  <Card className={`align-items-center ${className}`}>
    <CardBody className={"text-center my-3"}>
      <Typography variant={"h1"} className={"mb-3"}>
        {productName}
      </Typography>
      <Typography variant={"h3"} className={"fw-normal mb-3"}>
        {price / 100} €
      </Typography>
      <Button className="px-3" onClick={buttonAction}>
        <Icon type={"coin"} className={"me-2"} />
        Select
      </Button>
    </CardBody>
  </Card>
);

export default CreditPackage;
