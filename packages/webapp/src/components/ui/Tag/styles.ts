import styled from "styled-components";

export const SCTag = styled.div`
  display: inline-block;
  width: auto;
  height: min-content;
  padding: 0.1em 0.6em;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 2em;
  text-transform: lowercase;
  margin-left: 1em;
  margin-right: -0.5em;
`;
