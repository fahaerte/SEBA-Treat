import { ILink } from "../../Link/ILink";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";

export interface IListItem extends IComponentBase {
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
