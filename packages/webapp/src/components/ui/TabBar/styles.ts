import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ITabBar } from "./ITabBar";

export const SCTabBar = styled.div<ITabBar>`
  width: 100%;
  height: auto;
`;

export const SCTab = styled(NavLink)`
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.size.lg};
  color: ${({ theme }) => theme.typography.color.primary};
  overflow: hidden;
  position: relative;

  :hover {
    color: ${({ theme }) => theme.typography.color.secondary};
    border-bottom: ${({ theme }) => theme.general.border.width} solid
      ${({ theme }) => theme.palette.primary.hover};
  }

  &.active {
    border-bottom: ${({ theme }) => theme.general.border.width} solid
      ${({ theme }) => theme.palette.primary.main};
    font-weight: ${({ theme }) => theme.typography.body.weights.bold};
  }
`;

export const SCTabContent = styled.div`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacings.sm};
`;
