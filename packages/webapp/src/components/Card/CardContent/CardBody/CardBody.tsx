import React from "react";
import { IComponentBase } from "../../../../assets/theme/types/IComponentBase";
const CardBody = ({ className = "", children }: IComponentBase) => (
  <div className={`card-body ${className}`}>{children}</div>
);

export default CardBody;
