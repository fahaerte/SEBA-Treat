import React from "react";
import { ICard } from "./ICard";
import { SCCard } from "./styles";

const Card = ({
  color,
  cardHover = false,
  className = "",
  children,
}: ICard) => (
  <SCCard
    color={color}
    className={["card", cardHover ? "card-hover" : "", className].join(" ")}
  >
    {children}
  </SCCard>
);

export default Card;
