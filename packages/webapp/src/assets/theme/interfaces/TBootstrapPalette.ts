// TODO: May be removed during refactoring
export const ABootstrapPalette = [
  "primary",
  "warning",
  "secondary",
  "success",
  "danger",
  "info",
  "light",
] as const;

export type TBootstrapPalette = typeof ABootstrapPalette[number];
