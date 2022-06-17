import { IPaletteColor } from "./IPaletteColor";
import { IFont } from "./IFont";
import { ISize, ISizeExtended } from "./ISize";

export interface IDefaultTheme {
  name: string;
  palette: {
    primary: IPaletteColor;
    secondary: IPaletteColor;
    danger: IPaletteColor;
    warning: IPaletteColor;
    info: IPaletteColor;
    success: IPaletteColor;
    light: IPaletteColor;
    [key: string]: IPaletteColor;
  };
  typography: {
    color: {
      primary: string;
      secondary: string;
    };
    headline: IFont;
    body: IFont;
    size: ISizeExtended;
  };
  general: {
    border: {
      radius: string;
      width: string;
      color: {
        primary: string;
        secondary: string;
      };
    };
    backgroundPrimary: string;
    backgroundSecondary: string;
    backgroundBody: string;
  };
  spacings: ISizeExtended;
  breakpoints: ISize;
  shadows: {
    sm: string;
    md: string;
    lg: string;
    inset: string;
  };
  card: {
    background: IPaletteColor;
  };
  modal: {
    background: string;
  };
  form: {
    element: {
      height: string;
      lineHeight: number;
      color: string;
      padding: string;
      borderColor: string;
      labelColor: string;
      fontSize: string;
    };
  };
  table: {
    cell: {
      spacingY: {
        sm: string;
        md: string;
      };
      spacingX: {
        sm: string;
        md: string;
      };
    };
  };
}
