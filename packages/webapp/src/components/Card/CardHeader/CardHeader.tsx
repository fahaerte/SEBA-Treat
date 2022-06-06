import React from "react";
import { ICardHeader } from "./ICardHeader";

const CardHeader = ({ className = "", children }: ICardHeader) => (
  <div
    className={`card-header d-flex align-items-center justify-content-between ${className}`}
  >
    {children}
  </div>
);

export default CardHeader;
