import styled, { css, DefaultTheme, ThemeProps } from "styled-components";
import { ToastContainer } from "react-toastify";
import { IToastContainer } from "./IToastContainer";
import { ABootstrapPalette } from "../../../../assets/theme/interfaces/TBootstrapPalette";

const toastClasses = (props: ThemeProps<DefaultTheme>) => {
  let tmp = "";
  ABootstrapPalette.forEach((element) => {
    tmp += `
      .Toastify__toast-${element} {
        background-color: ${props.theme.palette[element].main};
        color: ${props.theme.palette[element].contrastText};
      }
      
      .Toastify__toast-${element}-rounded {
        min-height: 2.5rem;
        background-color: ${props.theme.palette[element].hover};
        color: ${props.theme.palette[element].main};
        border: ${props.theme.general.border.width} solid ${props.theme.palette[element].main};
        border-radius: 1.25rem;
        text-align: center;
        .Toastify__close-button {
          color: ${props.theme.palette[element].main}; 
          align-self: center;
        }
      }
      
      .Toastify__progress-bar-${element} {
        background: ${props.theme.palette[element].contrastText};
      }
    `;
  });
  return css`
    ${tmp}
  `;
};
export const SCToastContainer = styled(ToastContainer)<IToastContainer>`
  .Toastify__toast {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  ${(props) => toastClasses(props)};
`;
