import { TBootstrapPaletteTypography } from "../Typography/ITypography";

/**
 * Declaring array here to allow the select-control in stories
 */
export const AIconType = [
  "chevronUp",
  "chevronDown",
  "check-circle-fill",
  "cart",
  "calendar",
  "shield-lock",
  "upload",
  "check",
  "plus",
  "search",
  "star",
  "star-fill",
  "threeDots",
  "pen",
  "person",
  "arrowRight",
  "arrowLeft",
  "save",
  "trash",
  "infoCircle",
  "boxArrowRight",
  "exclamationCircle",
  "exclamationTriangle",
  "arrowClockwise",
  "coin",
  "box-arrow-right",
  "geo-alt",
  "gear",
  "people-fill",
] as const;

export interface IIcon {
  /**
   * This describes what icon u like to use.
   */
  type: typeof AIconType[number];
  /**
   * Size of icon
   */
  size?: "sm" | "md" | "lg";
  /**
   * color of the icon
   */
  color?: TBootstrapPaletteTypography;
  className?: string;
}
