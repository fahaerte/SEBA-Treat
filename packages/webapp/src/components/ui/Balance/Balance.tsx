import React from "react";
import { SCBalance } from "./styles";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";

const Balance = ({ children, className = "" }: IComponentBase) => (
  <SCBalance className={className}>{children}</SCBalance>
);
export default Balance;
