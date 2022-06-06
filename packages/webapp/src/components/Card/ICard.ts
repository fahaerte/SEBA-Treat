import { TBootstrapPalette } from "../../assets/themes/interfaces/TBootstrapPalette";
import { ICardElement } from "./ICardElement";

export interface ICard extends ICardElement {
  /**
   * Sets card's background color.
   */
  color?: TBootstrapPalette;
  /**
   * Sets hover effect on Card
   */
  cardHover?: boolean;
}
