import React from "react";
import { ThemeProvider } from "styled-components";
import { SCHelper } from "../globalStyles";
import { IconSet } from "../../components/Icon/IconSet";
import { defaultTheme } from "./defaultTheme";
import "../bootstrap.scss";

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <SCHelper />
      <IconSet />
      {children}
    </>
  </ThemeProvider>
);

export default CustomThemeProvider;
