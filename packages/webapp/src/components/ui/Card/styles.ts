import styled from "styled-components";
import { ICard } from "./ICard";

export const SCCard = styled.div<ICard>`
  background-color: ${({ theme, color }) =>
    color ? theme.palette[color].main : theme.card.background.main};
  color: ${({ theme, color }) =>
    color
      ? theme.palette[color].contrastText
      : theme.card.background.contrastText};
  margin-bottom: ${({ theme }) => theme.spacings.lg};
  //box-shadow: ${({ theme }) => theme.shadows.md};
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  border: 2px solid ${({ theme }) => theme.palette["primary"].main};
  border-radius: 20px;

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
`;

export const SCCardHeader = styled.div`
  background-color: transparent;
  border: none;
`;
//
// export const SCCardImage = styled.img`
//   border-top-left-radius: 20px;
//   border-top-right-radius: 20px;
// `;

export const SCCardImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;

  > div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }
`;
