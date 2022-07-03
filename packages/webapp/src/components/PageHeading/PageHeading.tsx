import React from "react";
import { SCPageHeading } from "./styles";
import { IComponentBase } from "../../assets/theme/types/IComponentBase";

const PageHeading = ({ children, className = "" }: IComponentBase) => (
  <SCPageHeading className={`${className} fw-bold`}>{children}</SCPageHeading>
);
export default PageHeading;
