import styled from "styled-components";
import { TBootstrapPalette } from "../../assets/themes/interfaces/TBootstrapPalette";
// import ReactDragListView from "react-drag-listview";

export const SCList = styled.ul`
  &.subheader li:first-child,
  a:first-child,
  button:first-child {
    font-weight: ${({ theme }) => theme.typography.body.weights.bold};
  }
`;

// Only defined to use the as-prop provided by styled-components
// export const SCReorderableList = styled(ReactDragListView)``;

export const SCListItem = styled.li<{ color: TBootstrapPalette }>`
  background-color: ${({ theme, color = "light" }) =>
    theme.palette[color].main};
  color: ${({ theme, color = "light" }) => theme.palette[color].contrastText};

  &.active {
    background-color: ${({ theme, color = "light" }) =>
      theme.palette[color].active};
    border-color: ${({ theme, color }) => theme.palette[color || "light"].main};
    border-width: ${({ theme }) => theme.general.border.width};
    border-top-width: ${({ theme }) => theme.general.border.width};
    color: ${({ theme, color = "light" }) => theme.palette[color].contrastText};
  }

  &.list-group-item-action {
    &.link-${({ color = "light" }) => color} {
      color: ${({ theme, color = "light" }) =>
        theme.palette[color].contrastText};
      text-decoration: none;
    }
    :hover {
      background-color: ${({ theme, color = "light" }) =>
        theme.palette[color].hover};
      color: ${({ theme, color = "light" }) =>
        theme.palette[color].contrastText};
      border-top-width: ${({ theme }) => theme.general.border.width};
      border-color: ${({ theme, color = "light" }) =>
        theme.palette[color].hover};
    }
  }

  font-size: ${({ theme }) => theme.typography.size.xs};
`;
