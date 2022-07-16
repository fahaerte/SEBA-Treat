import styled from "styled-components";
import { ICard } from "../ui/Card/ICard";

export const SCMealRequestCard = styled.div<ICard>`
  background-color: ${({ theme, color }) =>
    color ? theme.palette[color].main : theme.card.background.main};
  color: ${({ theme, color }) =>
    color
      ? theme.palette[color].contrastText
      : theme.card.background.contrastText};
  margin-bottom: ${({ theme }) => theme.spacings.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid ${({ theme }) => theme.palette["primary"].main};
  // TODO: Theme value?
  border-radius: 10px;

  &.card-hover {
    cursor: pointer;
    transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
      0.3s box-shadow,
      0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);

    &:hover {
      background-color: ${({ theme, color }) =>
        color ? theme.palette[color].hover : theme.card.background.hover};
      transform: scale(1.01);
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    }
  }

  > b {
    font-weight: bold;
    // TODO: helper
    margin: 15px 0 20px 0;
  }
`;
