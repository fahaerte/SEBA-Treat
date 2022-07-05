import { IComponentColorBase } from "../../../assets/theme/types/IComponentColorBase";

export interface IBadge extends IComponentColorBase {
  /**
   * If true, the badge is rounded
   */
  rounded?: boolean;
  /**
   * Whether the badge is outlined
   */
  outlined?: boolean;
}
