import React from "react";
import { IComponentBase } from "../../../../assets/theme/types/IComponentBase";
import { SCCardHeader } from "../styles";

const CardFooter = ({ className = "", children }: IComponentBase) => (
  <SCCardHeader className={`card-footer ${className}`}>{children}</SCCardHeader>
);

export default CardFooter;
