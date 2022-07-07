import {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProps,
} from "styled-components";

const cssSpacings = (props: ThemeProps<DefaultTheme>) => {
  let tmp = "";
  const spacings = Object.keys(props.theme.spacings);

  spacings.forEach((space) => {
    tmp += `
      .mb-${space} {
        margin-bottom: ${props.theme.spacings[space]};
      }
      .mt-${space} {
        margin-top: ${props.theme.spacings[space]};
      }
      .me-${space} {
        margin-right: ${props.theme.spacings[space]};
      }
      .ms-${space} {
        margin-left: ${props.theme.spacings[space]};
      }
      .mx-${space} {
        margin-left: ${props.theme.spacings[space]};
        margin-right: ${props.theme.spacings[space]};
      }
      .my-${space} {
        margin-top: ${props.theme.spacings[space]};
        margin-bottom: ${props.theme.spacings[space]};
      }
      
      .pb-${space} {
        padding-bottom: ${props.theme.spacings[space]};
      }
      .pt-${space} {
        padding-top: ${props.theme.spacings[space]};
      }
      .pe-${space} {
        padding-right: ${props.theme.spacings[space]};
      }
      .ps-${space} {
        padding-left: ${props.theme.spacings[space]};
      }
      .px-${space} {
        padding-left: ${props.theme.spacings[space]};
        padding-right: ${props.theme.spacings[space]};
      }
      .py-${space} {
        padding-top: ${props.theme.spacings[space]};
        padding-bottom: ${props.theme.spacings[space]};
      }
    `;
  });
  return css`
    ${tmp}
  `;
};

export const SCHelper = createGlobalStyle`
  ${(props) => cssSpacings(props)}
  
  body {
    background: ${({ theme }) => theme.general.backgroundBody};
    color: ${({ theme }) => theme.typography.color.primary};
    letter-spacing: ${({ theme }) => theme.typography.body.letterSpacing};
    font-family: ${({ theme }) => theme.typography.body.family};
    font-weight: ${({ theme }) => theme.typography.body.weights.regular};
    //position: fixed;
    //overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    height: 100%;
  }
  
  .text {
    &--noWrap {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
