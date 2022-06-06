import React, { MouseEvent } from "react";
import { TBootstrapPalette } from "../../assets/themes/interfaces/TBootstrapPalette";

export interface IButton {
  /**
   * This describes the color of the button.
   */
  color?: TBootstrapPalette;
  /**
   * Here we describe the type of button.
   */
  type?: "default" | "outline";
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Size of the button
   */
  size?: "lg" | "md" | "sm";
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Additional styling
   */
  className?: string;
  /**
   * onClick event
   */
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Defines the HTML attribute type for the button
   */
  htmlType?: "button" | "submit" | "reset";
  /**
   * If user wants to pass loading state variable, this button will show loading spinner while true
   */
  isLoading?: boolean;
}
