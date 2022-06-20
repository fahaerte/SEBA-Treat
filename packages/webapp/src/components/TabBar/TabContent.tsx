import React from "react";
import { SCTabContent } from "./styles";
import { IComponentBase } from "../../assets/theme/types/IComponentBase";

const TabContent = ({ children, className = "" }: IComponentBase) => (
  <SCTabContent className={`w-100 ${className}`}>{children}</SCTabContent>
);

export default TabContent;
