import { NavLinkProps } from "react-router-dom";
import { IButton } from "../Button/IButton";
import { MouseEvent } from "react";
import { IComponentColorBase } from "../../../assets/theme/types/IComponentColorBase";

type TExcludeButtonProps =
  | "children"
  | "disabled"
  | "htmlType"
  | "onClick"
  | "size"
  | "color";

/**
 * Since anchor tags should not be used to trigger and handle events,
 * the onClick event from IButton will be excluded.
 */
export interface ILink extends IComponentColorBase {
  /**
   * In which style the link should be represented as
   */
  display?: "text" | "button";
  /**
   * Size of the link
   */
  size?: "lg" | "md" | "sm";
  /**
   * Target to where the user should be redirected.
   * Has the same types as to-prop of RouterLink.
   */
  to: NavLinkProps["to"] | string;
  /**
   * If true, the component will represent a react-router-dom link
   */
  route?: boolean;
  /**
   * onClick Handler
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Whether default text decoration on hover and active for link is displayed
   */
  underline?: boolean;
  /**
   * If `display: button` is selected, additional button props can be set
   */
  buttonProps?: Omit<IButton, TExcludeButtonProps>;
}
