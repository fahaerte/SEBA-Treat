import React from "react";
import { IComponentBase } from "../../../../assets/theme/types/IComponentBase";
import { SCCardHeader } from "../styles";

const CardHeader = ({ className = "", children }: IComponentBase) => (
  <SCCardHeader
    className={`card-header d-flex align-items-center justify-content-between ${className} fw-bold`}
  >
    {children}
  </SCCardHeader>
);

export default CardHeader;
