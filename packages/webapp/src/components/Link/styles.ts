import React from "react";
import styled from "styled-components";
import { NavLinkProps } from "react-router-dom";
import { SCButton } from "../Button/styles";
import { ILink } from "./ILink";

interface ICustomLink extends NavLinkProps, Pick<ILink, "underline"> {
  href: React.AnchorHTMLAttributes<HTMLAnchorElement>["href"];
}

export const SCLink = styled(SCButton)<ICustomLink>`
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
  &:active {
    text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
  }

  &:hover {
    text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
  }
`;
