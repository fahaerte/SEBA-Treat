import { TBootstrapPaletteTypography } from "../Typography/ITypography";

/**
 * Declaring array here to allow the select-control in stories
 */
export const AIconType = [
  "x",
  "x-lg",
  "download",
  "bell",
  "upload",
  "house",
  "plus",
  "search",
  "star",
  "star-fill",
  "ellipsis",
  "write",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "threeDots",
  "pen",
  "chevronDoubleLeft",
  "chevronDoubleRight",
  "arrowsFullscreen",
  "arrowReturnLeft",
  "chatLeftDots",
  "arrowRight",
  "arrowLeft",
  "files",
  "filesAlt",
  "fileEarmarkText",
  "check2",
  "save",
  "sdCard",
  "pencilSquare",
  "pencil",
  "trash1",
  "trash2",
  "trash3",
  "info",
  "infoCircle",
  "cash",
  "boxArrowRight",
  "doorClosed",
  "doorOpen",
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
