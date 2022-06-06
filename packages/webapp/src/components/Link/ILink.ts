import { NavLinkProps } from "react-router-dom";
import { IButton } from "../Button/IButton";
import { MouseEvent } from "react";

type TExcludeButtonProps = "type" | "disabled" | "htmlType" | "onClick";

/**
 * Since anchor tags should not be used to trigger and handle events,
 * the onClick event from IButton will be excluded.
 */
export interface ILink extends Omit<IButton, TExcludeButtonProps> {
  /**
   * In which style the link should be represented as
   * Additional value "link" to display the children as plain text
   */
  type?: IButton["type"] | "link";
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
   * Inline styling
   */
  style?: React.AnchorHTMLAttributes<HTMLAnchorElement | NavLinkProps>["style"];
  /**
   * onClick Handler
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Whether default text decoration on hover and active for link is displayed
   */
  underline?: boolean;
}
