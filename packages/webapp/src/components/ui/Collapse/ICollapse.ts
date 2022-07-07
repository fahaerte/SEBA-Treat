import React from "react";

export interface ICollapse {
  /**
   * children of the component
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether the content is shown
   */
  show?: boolean;
  /**
   * Collapse direction
   */
  direction?: "vertical" | "horizontal";
  /**
   * height that looks like a placeholder
   * if the content is hidden
   */
  collapseHeight?: string;
  /**
   * width of the content. Very important
   * when making a horizontal collapse
   */
  contentWidth?: string;
}
