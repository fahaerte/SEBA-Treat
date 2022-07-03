import styled from "styled-components";
import { Modal } from "react-bootstrap";

export const SCModalBody = styled(Modal.Body)`
  font-weight: ${({ theme }) => theme.typography.body.weights.regular};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

export const SCModal = styled(Modal)`
  & .modal-content {
    background: ${({ theme }) => theme.modal.background};
  }
`;
