import React from "react";
import { SCHomeScreenHeading } from "./styles";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";

const HomeScreenHeading = ({ children }: IComponentBase) => (
  <SCHomeScreenHeading>{children}</SCHomeScreenHeading>
);
export default HomeScreenHeading;
