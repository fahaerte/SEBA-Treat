import React from "react";
import { ILink } from "../../Link/ILink";

export interface IListItem {
  /**
   * Children of this component.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes that can be applied
   */
  className?: string;
  /**
   * how the content of the list item is to be aligned
   */
  alignItems?: "start" | "center";
  /**
   * Whether the list item has the active attribute
   */
  active?: boolean;
  /**
   * Whether the list item is disabled
   */
  disabled?: boolean;
  /**
   * onClick handler for ListItem
   */
  onClick?: () => void;
  /**
   * linkProps if ListItem is rendered as a Link
   */
  linkProps?: Omit<ILink, "onClick" | "children">;
}
