import React from "react";

type TRowAlignContent = "start" | "end" | "center" | "around" | "stretch";

type TRowAlignItems = "start" | "center" | "end" | "stretch" | "baseline";

type TRowDirection = "row" | "column";

type TRowJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

type TRowWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface IRow {
  /**
   * Additional CSS className that can be added
   */
  className?: string;
  /**
   * Children of this component
   */
  children: React.ReactNode;
  /**
   * How the content is laid out along the main axis
   */
  justify?: TRowJustify;
  /**
   * Defines the direction of the grid
   */
  direction?: TRowDirection;
  /**
   * Defines the flex-wrap style property. It's applied for all screen sizes.
   */
  wrap?: TRowWrap;
  /**
   * Defines the align-content CSS Property
   */
  alignContent?: TRowAlignContent;
  /**
   * Defines the align-items CSS Property
   */
  alignItems?: TRowAlignItems;
}
