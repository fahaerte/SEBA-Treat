import styled from "styled-components";
import { UncontrolledDropdown } from "reactstrap";

export const SCHeader = styled.header`
  height: 5rem;
  border-bottom: 1px solid #cfcfcf;
  background: white;

  img {
    height: 2rem;
  }
`;

export const StyledDropdown = styled(UncontrolledDropdown)`
  .btn-secondary {
    --bs-btn-color: ${({ theme }) => theme.palette.primary.contrastText};
    --bs-btn-bg: ${({ theme }) => theme.palette.primary.main};
    --bs-btn-border-color: ${({ theme }) => theme.palette.primary.main};
    --bs-btn-hover-color: ${({ theme }) => theme.palette.primary.contrastText};
    --bs-btn-hover-bg: ${({ theme }) => theme.palette.primary.hover};
    --bs-btn-hover-border-color: ${({ theme }) =>
      theme.palette.primary.contrastText};
    --bs-btn-active-color: ${({ theme }) => theme.palette.primary.contrastText};
    --bs-btn-active-bg: ${({ theme }) => theme.palette.primary.active};
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: ${({ theme }) => theme.palette.primary.hover};

    a {
      color: white;
    }
  }
  .dropdown-toggle {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    //box-shadow: none;
    border-color: ${({ theme }) => theme.palette.primary.main};
    // border-radius: ${(props) => props.theme.general.border.radius};
    &:hover,
    &:active {
      background-color: ${(props) => props.theme.palette.primary.hover};
      color: ${({ theme }) => theme.palette.primary.contrastText};
      box-shadow: none;
    }
  }

  &.show .dropdown-toggle {
    background-color: ${(props) => props.theme.palette.primary.hover};
    color: ${(props) => props.theme.typography.color.secondary};
    &:after {
      border-top: 0;
      border-bottom: ${(props) => props.theme.general.border.width} solid; // TODO color?!
    }
  }

  .dropdown-menu .dropdown-item {
    color: ${(props) => props.theme.typography.color.primary};
    font-size: ${(props) => props.theme.typography.size.md};
    text-decoration: none;

    &:hover {
      background-color: ${(props) => props.theme.palette.primary.hover};
    }

    &:active,
    &.active {
      background-color: ${(props) => props.theme.palette.primary.active};
      text-decoration: none;
    }
  }
`;
