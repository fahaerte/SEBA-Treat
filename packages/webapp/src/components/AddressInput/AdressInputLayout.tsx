import styled from "styled-components";

export const AddressInputLayout = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  text-align: center;
  width: 100%;
  height: 100vh;

  > div {
    height: 100vh;
  }
`;
