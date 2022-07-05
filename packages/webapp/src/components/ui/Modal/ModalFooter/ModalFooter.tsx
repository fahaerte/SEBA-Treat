import React from "react";
import { Modal } from "react-bootstrap";
import { IModalFooter } from "./IModalFooter";
import { IButton } from "../../Button/IButton";
import Button from "../../Button/Button";

const ModalFooter = ({
  className = "",
  modalActions,
  ...props
}: IModalFooter) => (
  <Modal.Footer className={[className, "modal-footer"].join(" ")} {...props}>
    {modalActions.map((item: IButton, index) => (
      <Button
        key={`${
          item.children?.toString().replace(" ", "-") ??
          `button-${index.toString()}`
        }`}
        {...item}
      />
    ))}
  </Modal.Footer>
);

export default ModalFooter;
