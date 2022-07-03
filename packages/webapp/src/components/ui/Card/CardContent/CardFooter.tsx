import React from "react";
import { IComponentBase } from "../../../../assets/theme/types/IComponentBase";

const CardFooter = ({ className = "", children }: IComponentBase) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

export default CardFooter;
