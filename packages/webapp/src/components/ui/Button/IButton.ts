import { MouseEvent } from "react";
import { IComponentColorBase } from "../../../assets/theme/types/IComponentColorBase";

export interface IButton extends IComponentColorBase {
  /**
   * Show button as outline
   */
  outline?: boolean;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Size of the button
   */
  size?: "lg" | "md" | "sm";
  /**
   * onClick event
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Defines the HTML attribute type for the button
   */
  htmlType?: "button" | "submit" | "reset";
  /**
   * If user wants to pass loading state variable, this button will show loading spinner while true
   */
  isLoading?: boolean;
  /**
   * DOM-element button will be rendered as
   */
  as?: "button" | "div";
}
