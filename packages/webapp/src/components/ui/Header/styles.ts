import styled from "styled-components";
import { UncontrolledDropdown } from "reactstrap";
import { Form } from "../Forms";

export const SCHeader = styled.header`
  height: 5rem;
  border-bottom: ${({ theme }) => theme.general.border.width} solid
    ${({ theme }) => theme.general.border.color.primary};
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
    border-top-left-radius: ${({ theme }) => theme.general.border.radius};
    border-bottom-left-radius: ${({ theme }) => theme.general.border.radius};

    a {
      color: white;
    }
  }
  .dropdown-toggle {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    //box-shadow: none;
    border-color: ${({ theme }) => theme.palette.primary.main};
    border-top-right-radius: ${({ theme }) => theme.general.border.radius};
    border-bottom-right-radius: ${({ theme }) => theme.general.border.radius};
    // border-radius: ${({ theme }) => theme.general.border.radius};
    &:hover,
    &:active {
      background-color: ${(props) => props.theme.palette.primary.hover};
      color: ${({ theme }) => theme.palette.primary.contrastText};
      box-shadow: none;
    }
  }

  &.show .dropdown-toggle {
    background-color: ${({ theme }) => theme.palette.primary.hover};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    &:after {
      border-top: 0;
      border-bottom: ${({ theme }) => theme.general.border.width} solid
        ${({ theme }) => theme.palette.primary.main}; // TODO color?!
    }
  }

  .dropdown-menu .dropdown-item {
    color: ${({ theme }) => theme.typography.color.primary};
    font-size: ${({ theme }) => theme.typography.size.md};
    text-decoration: none;
    &:hover {
      background-color: ${({ theme }) => theme.palette.primary.hover};
    }

    &:active,
    &.active {
      background-color: ${({ theme }) => theme.palette.primary.active};
      text-decoration: none;
    }
  }
`;

export const SCCustomForm = styled(Form)`
  > .mb-lg {
    margin-bottom: 0;
  }
`;
