import styled from "styled-components";
import { IPageHeading } from "./IPageHeading";

export const SCPageHeading = styled.h1<IPageHeading>`
   {
    font-weight: bold;
  }

  > u {
    text-decoration-color: ${({ theme }) => theme.palette["primary"].main};
  }
`;
