import React from "react";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";

const CardHeader = ({ className = "", children }: IComponentBase) => (
  <div
    className={`card-header d-flex align-items-center justify-content-between ${className}`}
  >
    {children}
  </div>
);

export default CardHeader;
