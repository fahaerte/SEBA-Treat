import React from "react";
import { ThemeProvider } from "styled-components";
import { SCHelper } from "../globalStyles";
import { IconSet } from "../../components/Icon/IconSet";
import { IToastContainer, ToastContainer } from "../../components/Toast";
import { defaultTheme } from "./defaultTheme";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import "../bootstrap.scss";

const toastContainerProps: IToastContainer = {
  newestOnTop: false,
  closeOnClick: true,
  draggable: false,
  rtl: false,
  hideProgressBar: false,
  position: "top-right",
  transition: Slide,
};

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={defaultTheme}>
    <>
      <SCHelper />
      <IconSet />
      <ToastContainer {...toastContainerProps} />
      {children}
    </>
  </ThemeProvider>
);

export default CustomThemeProvider;
