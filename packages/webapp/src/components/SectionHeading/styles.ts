import styled from "styled-components";
import { ISectionHeading } from "./ISectionHeading";

export const SCSectionHeading = styled.h2<ISectionHeading>`
  > hr {
    border: 1px solid ${({ theme }) => theme.palette["primary"].main};
    opacity: 1 !important;
  }
`;
