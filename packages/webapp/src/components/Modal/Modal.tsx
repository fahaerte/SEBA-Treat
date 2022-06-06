import React from "react";
import { IModal } from "./IModal";
import { SCModal } from "./styles";

const Modal = ({
  children,
  className = "",
  open,
  onClose,
  centered = true,
  size = "md",
  backdrop = true,
  scrollable = true,
  ...props
}: IModal) => (
  <SCModal
    show={open}
    onHide={onClose}
    backdrop={!backdrop ? "static" : backdrop}
    className={className}
    centered={centered}
    size={size === "md" ? undefined : size} // undefined becaus of react-bootstrap Modal interface
    scrollable={scrollable}
    {...props}
  >
    {children}
  </SCModal>
);

export default Modal;
