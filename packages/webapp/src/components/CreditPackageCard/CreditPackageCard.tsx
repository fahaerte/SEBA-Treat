import React from "react";
import { ICard } from "../ui/Card/ICard";
import { SCCreditPackageCard } from "./styles";

const CreditPackageCard = ({
  color,
  hoverable = false,
  className = "",
  children,
}: ICard) => (
  <SCCreditPackageCard
    color={color}
    className={["card", hoverable ? "card-hover" : "", className].join(" ")}
  >
    {children}
  </SCCreditPackageCard>
);

export default CreditPackageCard;
