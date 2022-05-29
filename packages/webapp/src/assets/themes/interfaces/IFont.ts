import { EFontWeights } from "./EFontWeights";

export interface IFont {
  family: string;
  lineHeight: number;
  weights: {
    thin: EFontWeights;
    regular: EFontWeights;
    bold: EFontWeights;
  };
  spacing: string;
  letterSpacing: string;
}
