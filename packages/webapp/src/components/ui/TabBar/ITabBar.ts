import { IComponentColorBase } from "../../../assets/theme/types/IComponentColorBase";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";

export type TTab = {
  /**
   * URL
   */
  to: string;
} & IComponentBase;

export interface ITabBar extends IComponentColorBase {
  /**
   * Array of Tab Paths / Tab objects
   */
  tabs?: TTab[];
}
