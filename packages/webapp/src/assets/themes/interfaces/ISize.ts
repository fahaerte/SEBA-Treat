export interface ISize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  [key: string]: string;
}

export interface ISizeExtended extends ISize {
  xxl: string;
  xxs: string;
}
