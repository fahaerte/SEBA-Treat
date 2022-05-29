import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  name: "defaultTheme",
  palette: {
    primary: {
      main: "#04969B", //
      hover: "#04969B8A", // main 50%
      active: "#04969B1A", // main 10%
      contrastText: "#FFF",
    },
    secondary: {
      main: "#097DA3",
      hover: "#c7c7c7",
      active: "#525252",
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
      main: "#fff",
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
        thin: 200,
        regular: 400,
        bold: 700,
      },
      spacing: "0.35em",
      letterSpacing: "0",
    },
    size: {
      xxl: "28px",
      xl: "18px",
      lg: "14px",
      md: "13px",
      sm: "12px",
      xs: "10px",
      xxs: "9px",
    },
  },
  general: {
    backgroundPrimary: "white",
    backgroundSecondary: "#f8f8f8",
    backgroundBody: "#f8f8f8",
    border: {
      radius: "4px",
      width: "1px",
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
    element: {
      height: "calc(3rem + 2px)",
      lineHeight: 1.25,
      color: "#495057",
      borderColor: "#ced4da",
      labelColor: "",
      fontSize: "",
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
