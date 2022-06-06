import React from "react";
import { ILink } from "../../Link/ILink";

export interface IBreadcrumbItem extends ILink {
  /**
   * This stresses the BreadcrumbItem visually and deactivates the link
   */
  active?: boolean;
  /**
   * Children of the component
   */
  children: React.ReactNode;
}
