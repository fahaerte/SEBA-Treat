import React from "react";

export type TColNumberObject = {
  span?: boolean | "auto" | number;
  offset?: number;
  order?: "first" | "last" | number;
};

/**
 * Value types to define number of columns
 */
export type TColNumber = boolean | "auto" | number | TColNumberObject;

export interface ICol {
  /**
   * Children of this component
   */
  children: React.ReactNode;
  /**
   * Number of columns to span on large device (breakpoint lg)
   */
  lg?: TColNumber;
  /**
   * The number of columns to span on medium device (breakpoint md)
   */
  md?: TColNumber;
  /**
   * The number of columns to span on extra small devices (breakpoint xs)
   */
  xs?: TColNumber;
  /**
   * Change the underlying component CSS base class name and modifier class names prefix.
   * This is an escape hatch for working with heavily customized bootstrap css.
   */
  className?: string;
}
