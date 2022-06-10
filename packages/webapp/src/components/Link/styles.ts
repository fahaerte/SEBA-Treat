import React from "react";
import styled from "styled-components";
import { NavLinkProps } from "react-router-dom";

interface ICustomLink extends NavLinkProps {
  href: React.AnchorHTMLAttributes<HTMLAnchorElement>["href"];
  $underline: boolean;
}

export const SCLink = styled.a<ICustomLink>`
  color: ${({ theme, color }) => theme.palette[color as string].main};

  &.link {
    &-sm {
      font-size: ${({ theme }) => theme.typography.size.xxs};
    }

    &-md {
      font-size: ${({ theme }) => theme.typography.size.xs};
    }

    &-lg {
      font-size: ${({ theme }) => theme.typography.size.sm};
    }
  }

  &:active,
  &:hover {
    text-decoration: ${({ $underline }) => ($underline ? "underline" : "none")};
  }
`;
