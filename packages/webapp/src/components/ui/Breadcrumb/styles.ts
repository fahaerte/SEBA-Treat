import styled from "styled-components";

export const SCBreadcrumb = styled.ol<{ separator: string }>`
  --bs-breadcrumb-divider: "${({ separator }) => separator}";

  & .ellipsis button {
    background: none;
    border: none;
    padding: 0;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
