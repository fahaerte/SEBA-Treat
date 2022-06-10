import { TPosition } from "../../../assets/theme/interfaces/TPosition";
import { ToastContainerProps } from "react-toastify";

export interface IToastContainer extends ToastContainerProps {
  /**
   * Where all notifications are to be displayed
   */
  position?: TPosition;
  /**
   * additional classnames
   */
  className?: string;
}
