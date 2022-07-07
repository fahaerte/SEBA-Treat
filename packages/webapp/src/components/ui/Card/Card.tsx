import React from "react";
import { ICard } from "./ICard";
import { SCCard } from "./styles";

const Card = ({
  color,
  hoverable = false,
  className = "",
  children,
  onClick = () => undefined,
}: ICard) => (
  <SCCard
    onClick={onClick}
    color={color}
    className={["card", hoverable ? "card-hover" : "", className].join(" ")}
  >
    {children}
  </SCCard>
);

export default Card;
