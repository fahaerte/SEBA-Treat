import React from "react";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";
import { SCTag } from "./styles";

const Tag = ({ children }: IComponentBase) => {
  return <SCTag>{children}</SCTag>;
};

export default Tag;
