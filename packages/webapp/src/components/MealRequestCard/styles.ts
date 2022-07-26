import styled from "styled-components";

export const SCMealCardInfo = styled.div`
  background-color: ${({ theme }) => theme.general.backgroundSecondary};
  border: ${({ theme }) => theme.general.border.width} solid
    ${({ theme }) => theme.general.border.color.primary};
  color: ${({ theme }) => theme.typography.color.secondary};
  border-radius: 3px;
`;
