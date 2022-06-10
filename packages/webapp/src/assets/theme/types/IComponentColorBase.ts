import { IComponentBase } from "./IComponentBase";
import { TBootstrapPalette } from "../interfaces/TBootstrapPalette";

export interface IComponentColorBase extends IComponentBase {
  /**
   * Color of the component
   */
  color?: TBootstrapPalette;
}
