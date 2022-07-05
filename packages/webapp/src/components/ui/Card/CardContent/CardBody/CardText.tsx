import React from "react";
import Typography from "../../../Typography/Typography";
import { IComponentBase } from "../../../../../assets/theme/types/IComponentBase";

const CardText = ({ className = "", children }: IComponentBase) => {
  return (
    <Typography className={`card-text ${className}`}>{children}</Typography>
  );
};

export default CardText;
