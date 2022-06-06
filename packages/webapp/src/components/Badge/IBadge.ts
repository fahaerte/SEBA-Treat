import React from "react";
import { TBootstrapPalette } from "../../assets/themes/interfaces/TBootstrapPalette";

export interface IBadge {
  /**
   * Children of this component
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes that can be applied
   */
  className?: string;
  /**
   * Colors of the badge
   */
  color?: TBootstrapPalette;
  /**
   * If true, the badge is rounded
   */
  rounded?: boolean;
  /**
   * Whether the badge is outlined
   */
  outlined?: boolean;
}
