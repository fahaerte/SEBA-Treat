import { TBootstrapPalette } from "../../assets/theme/interfaces/TBootstrapPalette";
import { TPosition } from "../../assets/theme/interfaces/TPosition";
import { EDelay } from "../../assets/theme/interfaces/EDelay";
import { AIconType } from "../Icon/IIcon";

export interface IToast {
  /**
   * Message displayed in the Toast body.
   */
  message: string;
  /**
   * Notification type of the Toast.
   */
  type: TBootstrapPalette;
  /**
   * Priority of the notification,
   * concurrent to autoclose delay
   */
  autoClose?: EDelay.MEDIUM | EDelay.HIGH | EDelay.LOW | false;
  /**
   * If position should be different than set as default in
   * ToastContainer
   */
  position?: TPosition;
  /**
   * possibility to add an Icon
   */
  icon?: typeof AIconType[number];
  /**
   * Additional classNames
   */
  className?: string;
  /**
   * Theme of the notification:
   * - System is rounded, has a different styling and contains less information
   */
  // theme?: "notification" | "system";
  roundedLight?: boolean;
}
