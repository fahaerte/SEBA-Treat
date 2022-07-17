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
  "chevronDown",
  "chevronUp",
  "fullscreen",
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
  "list-ul",
  "list-ol",
  "zoomIn",
  "zoomOut",
  "save",
  "sdCard",
  "pencilSquare",
  "pencil",
  "trash1",
  "trash2",
  "trash3",
  "info",
  "infoCircle",
  "infoSquare",
  "archive",
  "folder",
  "folder2",
  "building",
  "list",
  "cardList",
  "person",
  "personCircle",
  "personSquare",
  "creditCard",
  "wallet",
  "cash",
  "piggyBank",
  "people",
  "boxArrowRight",
  "doorClosed",
  "doorOpen",
  "exclamation",
  "exclamationCircle",
  "exclamationTriangle",
  "gear",
  "sliders",
  "envelope",
  "send",
  "arrowClockwise",
  "coin",
  "logout",
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
