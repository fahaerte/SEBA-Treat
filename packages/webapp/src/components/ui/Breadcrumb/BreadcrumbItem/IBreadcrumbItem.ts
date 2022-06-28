import React from "react";
import { ILink } from "../../Link/ILink";

export interface IBreadcrumbItem extends Omit<ILink, "route"> {
  /**
   * Is current item active?
   */
  active?: boolean;
  /**
   * Children of the component
   */
  children: React.ReactNode;
}
