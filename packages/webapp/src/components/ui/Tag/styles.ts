import styled from "styled-components";

export const SCTag = styled.div`
  display: inline-block;
  width: auto;
  height: min-content;
  padding: 0.1em 0.6em;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 2em;
  text-transform: capitalize;
  margin: 0 0.5em;
`;
