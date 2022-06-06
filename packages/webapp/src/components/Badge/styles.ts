import styled from "styled-components";
import { IBadge } from "./IBadge";

export const SCBadge = styled.span<IBadge>`
  margin-left: ${({ theme }) => theme.typography.body.spacing};
  background: ${({ theme, color = "primary" }) => theme.palette[color].main};
  color: ${({ theme, color = "primary" }) => theme.palette[color].contrastText};

  &.outlined {
    border-color: ${({ theme, color = "primary" }) =>
      theme.palette[color].main};
    border-width: ${({ theme }) => theme.general.border.width};
    border-style: solid;
    color: ${({ theme, color = "primary" }) => theme.palette[color].main};
    background: none;
  }
`;
