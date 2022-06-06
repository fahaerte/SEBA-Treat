import { IButton } from "../../Button/IButton";

export interface IModalFooter {
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Actions in the footer.
   * Buttons will be added left to right.
   */
  modalActions: IButton[];
}
