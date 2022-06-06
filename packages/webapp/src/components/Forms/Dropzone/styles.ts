import styled from "styled-components";

export const SCDropzone = styled.div`
  border: 0.2rem dashed gray;
  border-radius: ${({ theme }) => theme.spacings.xs};
  padding: ${({ theme }) => theme.spacings.xs}
    ${({ theme }) => theme.spacings.xs};
`;
