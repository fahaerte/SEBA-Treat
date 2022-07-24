import { TBootstrapPaletteTypography } from "../Typography/ITypography";

/**
 * Declaring array here to allow the select-control in stories
 */
export const AIconType = [
  "upload",
  "plus",
  "search",
  "star",
  "star-fill",
  "ellipsis",
  "write",
  "threeDots",
  "pen",
  "person",
  "chatLeftDots",
  "arrowRight",
  "arrowLeft",
  "save",
  "pencil",
  "trash",
  "info",
  "infoCircle",
  "boxArrowRight",
  "exclamation",
  "exclamationCircle",
  "exclamationTriangle",
  "arrowClockwise",
  "coin",
  "box-arrow-right",
  "geo-alt",
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
