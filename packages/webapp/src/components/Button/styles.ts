import styled from "styled-components";
import { IButton } from "./IButton";

export const SCButton = styled.button<IButton>`
  &.btn-${({ color }) => color} {
    color: ${({ theme, color }) => theme.palette[color as string].contrastText};
    background: ${({ theme, color }) => theme.palette[color as string].main};
    border-color: ${({ theme, color }) => theme.palette[color as string].main};
    border-radius: ${(props) => props.theme.general.border.radius};

    &:hover {
      color: ${({ theme, color }) =>
        theme.palette[color as string].contrastText};
      background: ${({ theme, color }) => theme.palette[color as string].hover};
      border-color: ${({ theme, color }) =>
        theme.palette[color as string].hover};
    }

    &:active,
    &:focus {
      background: ${({ theme, color }) =>
        theme.palette[color as string].active};
      border-color: ${({ theme, color }) =>
        theme.palette[color as string].active};
      box-shadow: 0 0 0 0.15rem
        ${({ theme, color }) => theme.palette[color as string].main}CC;
    }
  }

  &.btn-outline-${({ color }) => color} {
    color: ${({ theme, color }) => theme.palette[color as string].main};
    border-color: ${({ theme, color }) => theme.palette[color as string].main};

    &:hover {
      color: ${({ theme, color }) =>
        theme.palette[color as string].contrastText};
      border-color: ${({ theme, color }) =>
        theme.palette[color as string].main};
      background: ${({ theme, color }) => theme.palette[color as string].main};
    }

    &:active,
    &:focus {
      border-color: ${({ theme, color }) =>
        theme.palette[color as string].active};
      background-color: ${({ theme, color }) =>
        theme.palette[color as string].active};
      box-shadow: 0 0 0 0.15rem
        ${({ theme, color }) => theme.palette[color as string].main}CC;
    }
  }

  .spinner-border {
    margin-right: ${({ theme }) => theme.spacings.xs};
  }
`;
