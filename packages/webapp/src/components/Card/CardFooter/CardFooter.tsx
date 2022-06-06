import React from "react";
import { ICardFooter } from "./ICardFooter";

const CardFooter = ({ className = "", children }: ICardFooter) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

export default CardFooter;
