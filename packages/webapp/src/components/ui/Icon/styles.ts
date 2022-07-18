import styled from "styled-components";
import { TBootstrapPaletteTypography } from "../Typography/ITypography";

export const SCIcon = styled.svg<{ color?: TBootstrapPaletteTypography }>`
  fill: ${({ theme, color }) =>
    color === "muted"
      ? theme.typography.color.secondary
      : color === "white"
      ? "white"
      : color
      ? theme.palette[color].main
      : "inherit"};

  &.svg {
    &-sm {
      height: 0.8rem;
      width: 0.8rem;
    }

    &-md {
      height: 1rem;
      width: 1rem;
    }

    &-lg {
      height: 1.2rem;
      width: 1.2rem;
    }
  }
`;

export const SCIconSet = styled.svg`
  display: none;
`;
