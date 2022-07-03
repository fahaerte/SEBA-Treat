import styled from "styled-components";
import { IBadge } from "./IBadge";

export const SCBadge = styled.span<IBadge>`
  margin-left: ${({ theme }) => theme.typography.body.spacing};
  background: ${({ theme, color }) => theme.palette[color as string].main};
  color: ${({ theme, color }) => theme.palette[color as string].contrastText};

  &.outlined {
    border-color: ${({ theme, color }) => theme.palette[color as string].main};
    border-width: ${({ theme }) => theme.general.border.width};
    border-style: solid;
    color: ${({ theme, color }) => theme.palette[color as string].main};
    background: none;
  }
`;
