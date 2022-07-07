import React from "react";
import { SCSectionHeading } from "./styles";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";

const SectionHeading = ({ children, className = "" }: IComponentBase) => (
  <SCSectionHeading className={className}>
    {children}
    <hr />
  </SCSectionHeading>
);
export default SectionHeading;
