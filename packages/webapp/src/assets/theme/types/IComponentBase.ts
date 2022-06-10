import React from "react";

export interface IComponentBase {
  /**
   * Additional classnames
   */
  className?: string;
  /**
   * Child of the component
   */
  children: React.ReactNode;
}
