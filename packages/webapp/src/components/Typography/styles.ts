import styled from "styled-components";
import { ITypography } from "./ITypography";

export const SCTypography = styled.div<ITypography>`
  color: ${({ theme, color }) =>
    color === "muted"
      ? theme.typography.color.secondary
      : color === "white"
      ? "white"
      : color
      ? theme.palette[color].main
      : "inherit"};

  &.typography {
    &--mb-0 {
      margin-bottom: 0;
    }
    &--headline {
      font-weight: ${({ theme }) => theme.typography.headline.weights.bold};
      line-height: ${({ theme }) => theme.typography.headline.lineHeight};
      &--mb {
        margin-bottom: ${({ theme }) => theme.typography.headline.spacing};
      }
    }
    &--body {
      font-weight: ${({ theme }) => theme.typography.body.weights.regular};
      line-height: ${({ theme }) => theme.typography.body.lineHeight};
      &--mb {
        margin-bottom: ${({ theme }) => theme.typography.headline.spacing};
      }
    }
    &--h1 {
      font-size: ${({ theme }) => theme.typography.size.xxl};
    }
    &--h2 {
      font-size: ${({ theme }) => theme.typography.size.xl};
    }
    &--h3 {
      font-size: ${({ theme }) => theme.typography.size.lg};
    }
    &--h4 {
      font-size: ${({ theme }) => theme.typography.size.md};
    }
    &--h5 {
      font-size: ${({ theme }) => theme.typography.size.sm};
    }
    &--h6 {
      font-size: ${({ theme }) => theme.typography.size.xs};
    }
    &--p,
    &--div {
      font-size: ${({ theme }) => theme.typography.size.xs};
    }
    &--psmall {
      font-size: ${({ theme }) => theme.typography.size.xxs};
      font-weight: ${({ theme }) => theme.typography.body.weights.thin};
    }
  }
`;
