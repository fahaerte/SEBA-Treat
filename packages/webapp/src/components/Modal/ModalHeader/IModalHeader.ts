export interface IModalHeader {
  /**
   * Children of this component.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Specify whether the Component should contain a close button
   */
  closeButton?: boolean;
}
