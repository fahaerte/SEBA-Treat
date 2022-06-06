import styled, { css, DefaultTheme, ThemeProps } from "styled-components";
import { ABootstrapPalette } from "../../assets/themes/interfaces/TBootstrapPalette";

const cssCustom = (props: ThemeProps<DefaultTheme>) => {
  let tmp = "";
  ABootstrapPalette.forEach(() => {
    tmp += `
      &.breadcrumb {
          & > li a {  
            color: ${props.theme.palette.primary.main};
          }
          & .active a {
            color: ${props.theme.palette.primary.main};
            pointer-events: none;
          }
          & button:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          & button {
            background: none;
            border: none;
            padding: 0;
          }
      }
        `;
  });
  return css`
    ${tmp}
  `;
};

export const SCBreadcrumb = styled.ol`
  ${(props: { separator: string; theme: DefaultTheme }) => cssCustom(props)}
  &.breadcrumb {
    font-size: ${({ theme }) => theme.typography.size.xs};
    --bs-breadcrumb-divider: "${({ separator }) => separator}";
  }
`;
