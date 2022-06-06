import React from "react";
import { ICardBody } from "./ICardBody";

const CardBody = ({ className = "", children }: ICardBody) => (
  <div className={`card-body ${className}`}>{children}</div>
);

export default CardBody;
