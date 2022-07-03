import styled from "styled-components";

export const SCSectionHeading = styled.h2`
  margin-top: ${({ theme }) => theme.spacings.xl};

  > hr {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    opacity: 1 !important;
  }
`;
