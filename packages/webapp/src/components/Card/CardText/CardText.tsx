import React from "react";
import { Typography } from "../../..";
import { ICardText } from "./ICardText";

const CardText = ({ className = "", children }: ICardText) => {
  return (
    <Typography className={`card-text ${className}`} variant="p">
      {children}
    </Typography>
  );
};

export default CardText;
