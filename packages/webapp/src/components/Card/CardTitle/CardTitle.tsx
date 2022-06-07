import React from "react";
import Typography from "../../Typography/Typography";
import { ICardTitle } from "./ICardTitle";

const CardTitle = ({ className = "", children }: ICardTitle) => {
  return (
    <Typography
      variant="h5"
      component="div"
      className={`card-title ${className}`}
    >
      {children}
    </Typography>
  );
};

export default CardTitle;
