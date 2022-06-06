import React from "react";

export interface IContainer {
  /**
   * Children of this component
   */
  children: React.ReactNode;
  /**
   * Additional css classes, that can be added
   */
  className?: string; // classes maybe as a whole string instead of array
  /**
   *  Allow the Container to fill all of its available horizontal space.
   */
  fluid?: boolean | "sm" | "md" | "lg" | "xl";
}
