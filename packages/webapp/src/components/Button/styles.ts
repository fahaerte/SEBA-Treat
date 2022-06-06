import styled, { css, DefaultTheme, ThemeProps } from "styled-components";
import { ABootstrapPalette } from "../../assets/themes/interfaces/TBootstrapPalette";

const cssCustom = (props: ThemeProps<DefaultTheme>) => {
  let tmp = "";
  ABootstrapPalette.forEach((element: string) => {
    tmp += `
        &.link-${element} {
          color: ${props.theme.palette[element].main};
          &.active {
            text-decoration: underline;
          }
        }
        &.btn {
          border-radius: ${props.theme.general.border.radius};
          &-${element} {
            color: ${props.theme.palette[element].contrastText};
            background: ${props.theme.palette[element].main};
            border-color: ${props.theme.palette[element].main};

            &:hover {
              background: ${props.theme.palette[element].hover};
              border-color: ${props.theme.palette[element].hover};
            }

            &:active,
            &:focus {
              background: ${props.theme.palette[element].active};
              border-color: ${props.theme.palette[element].active};
              box-shadow: 0 0 0 0.15rem ${props.theme.palette[element].main}80;
            }
          }
        }
         &.btn-outline {
          &-${element} {
            color: ${props.theme.palette[element].main};
            border-color: ${props.theme.palette[element].main};
            &:hover {
              color: ${props.theme.palette[element].contrastText};
              border-color:${props.theme.palette[element].main};
              background: ${props.theme.palette[element].main};
            }
            &:active,
            &:focus {
              border-color: ${props.theme.palette[element].active};
              background-color: ${props.theme.palette[element].active};
              box-shadow: 0 0 0 0.15rem ${props.theme.palette[element].main}80;

            }
          }
        }
      `;
  });
  return css`
    ${tmp}
  `;
};

export const SCButton = styled.button`
  .spinner-border {
    margin-right: ${({ theme }) => theme.spacings.xs};
  }

  ${(props) => cssCustom(props)}
`;
