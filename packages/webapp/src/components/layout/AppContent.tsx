import React from "react";
import { Row } from "../ui";
import { IComponentBase } from "../../assets/theme/types/IComponentBase";

export const AppContent = ({ children, className = "" }: IComponentBase) => (
  <Row className={className}>{children}</Row>
);

export default AppContent;
