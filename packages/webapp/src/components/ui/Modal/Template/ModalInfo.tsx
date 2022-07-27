import React, { useState } from "react";
import { IModalObject, IModalTemplate } from "./IModalTemplates";
import { Modal } from "../index";
import { ModalHeader } from "../index";
import { ModalTitle } from "../index";
import { ModalBody } from "../index";
import { ModalFooter } from "../index";
import { Icon } from "../../index";

const useModalInfo = ({
  close,
}: Omit<IModalTemplate, "confirm">): IModalObject => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    close();
    setIsOpen(false);
  };

  const markup: JSX.Element = (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Allergens Labeling</ModalTitle>
      </ModalHeader>
      <ModalBody>
        Make sure you have checked your meal for allergens. False information
        might affect the health of other users.
      </ModalBody>
      <ModalFooter
        modalActions={[
          {
            children: (
              <>
                <Icon type={"check"} /> Undestood
              </>
            ),
            color: "primary",
            onClick: handleClose,
          },
        ]}
      />
    </Modal>
  );

  return { open: setIsOpen, markup };
};

export default useModalInfo;
