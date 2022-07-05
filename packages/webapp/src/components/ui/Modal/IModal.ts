import React from "react";

export interface IModal {
  /**
   * Children of this component.
   */
  children: React.ReactNode;
  /**
   * Additional CSS className.
   */
  open: boolean;
  /**
   * Function for event handling when modal is to be closed
   */
  onClose: () => void;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Whether the modal should be vertically centered
   */
  centered?: boolean;
  /**
   * Size of the modal
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Whether the Dialog should close when you click outside of the component
   */
  backdrop?: boolean;
  /**
   * Allows scrolling the Modal.Body instead of the entire Modal when overflowing
   */
  scrollable?: boolean;
}
