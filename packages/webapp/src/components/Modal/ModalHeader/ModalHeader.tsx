import React from "react";
import { Modal } from "react-bootstrap";
import { IModalHeader } from "./IModalHeader";

const ModalHeader = ({
  children,
  className = "",
  closeButton = true,
  ...props
}: IModalHeader) => (
  <Modal.Header closeButton={closeButton} className={className} {...props}>
    {children}
  </Modal.Header>
);

export default ModalHeader;
