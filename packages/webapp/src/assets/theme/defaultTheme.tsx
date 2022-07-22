import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  name: "defaultTheme",
  palette: {
    primary: {
      main: "#BFD0CD",
      hover: "#a9bab7",
      active: "#8e9e9b",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#8A8A8A",
      hover: "#CFCFCF",
      active: "#D5D5D5",
      contrastText: "#FFF",
    },
    danger: {
      main: "#f44336",
      hover: "#e89a95",
      active: "#f3392d",
      contrastText: "#FFF",
    },
    warning: {
      main: "#ff9800",
      hover: "#e0be8b",
      active: "#d47f02",
      contrastText: "#FFF",
    },
    info: {
      main: "#2196f3",
      hover: "#accde8",
      active: "#036fc6",
      contrastText: "#FFF",
    },
    success: {
      main: "#4caf50", // green
      hover: "#8db58f",
      active: "#2cb431",
      contrastText: "#FFF",
    },
    light: {
      main: "#EBEBEB",
      contrastText: "#000",
      hover: "#c7c7c7",
      active: "#FAFAFB", // E2E2E3
    },
  },
  typography: {
    color: {
      primary: "#333",
      secondary: "gray",
    },
    headline: {
      family: "Lato, sans-serif",
      lineHeight: 1.2,
      weights: {
        thin: 700,
        regular: 700,
        bold: 700,
      },
      spacing: "0.35em",
      letterSpacing: "0",
    },
    body: {
      family: "Lato, sans-serif",
      lineHeight: 1.5,
      weights: {
        thin: 100,
        regular: 300,
        bold: 700,
      },
      spacing: "0.35em",
      letterSpacing: "0",
    },
    size: {
      xxl: "28px",
      xl: "24px",
      lg: "18px",
      md: "16px",
      sm: "14px",
      xs: "14px",
      xxs: "12px",
    },
  },
  general: {
    backgroundPrimary: "white",
    backgroundSecondary: "white",
    backgroundBody: "white",
    border: {
      radius: "50px",
      width: "1px",
      color: {
        primary: "#DEDEDF",
        secondary: "#E6E6E7",
      },
    },
  },
  spacings: {
    xxs: "0.125rem",
    xs: "2px",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "3rem",
    xxl: "3.5rem",
  },
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1920px",
  },
  shadows: {
    sm: "",
    md: "",
    lg: "",
    inset: "",
  },
  card: {
    background: {
      main: "inherit",
      hover: "gray",
      active: "dark-gray",
      contrastText: "black",
    },
  },
  modal: {
    background: "",
  },
  form: {
    control: {
      height: "4em",
      lineHeight: 1.25,
      padding: "1em 1em 0.5em",
      color: "#333",
      fontSize: "1rem",
      border: {
        radius: "4px",
      },
    },
    label: {
      color: "#000",
      padding: "0 1em",
    },
  },
  table: {
    cell: {
      spacingY: {
        sm: "0.3rem",
        md: "0.75rem",
      },
      spacingX: {
        sm: "0.3rem",
        md: "0.75rem",
      },
    },
  },
};
