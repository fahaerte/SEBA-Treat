import React from "react";
import Typography from "../../../Typography/Typography";
import { IComponentBase } from "../../../../assets/theme/types/IComponentBase";

const CardTitle = ({ className = "", children }: IComponentBase) => {
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
