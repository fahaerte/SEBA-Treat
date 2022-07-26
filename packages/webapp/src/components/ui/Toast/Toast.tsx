import React from "react";
import { toast as toastify } from "react-toastify";
import { IToast } from "./IToast";
import Icon from "../Icon/Icon";

const toast = (toastConfig: IToast) => {
  const toastOptions = {
    autoClose: toastConfig.autoClose,
    position: toastConfig.position,
    className: toastConfig.roundedLight
      ? `Toastify__toast-${toastConfig.type}-rounded`
      : `Toastify__toast-${toastConfig.type}`,
    icon: () => (toastConfig.icon ? <Icon type={toastConfig.icon} /> : ""),
    progressClassName: toastConfig.roundedLight
      ? ""
      : `Toastify__progress-bar-${toastConfig.type}`,
    hideProgressBar: toastConfig.roundedLight,
  };

  switch (toastConfig.type) {
    case "primary":
    case "secondary":
    case "light":
      toastify(toastConfig.message, toastOptions);
      break;
    case "info":
      toastify.info(toastConfig.message, {
        ...toastOptions,
        icon: toastConfig.roundedLight
          ? ""
          : () => <Icon type={"infoCircle"} />,
      });
      break;
    case "warning":
      toastify.warning(toastConfig.message, {
        ...toastOptions,
        icon: toastConfig.roundedLight
          ? ""
          : () => <Icon type={"exclamationTriangle"} />,
      });
      break;
    case "danger":
      toastify.error(toastConfig.message, {
        ...toastOptions,
        icon: toastConfig.roundedLight
          ? ""
          : () => <Icon type={"exclamationCircle"} />,
      });
      break;
    case "success":
      toastify.success(toastConfig.message, {
        ...toastOptions,
        icon: toastConfig.roundedLight
          ? ""
          : () => <Icon type={"check2-circle"} />,
      });
      break;
    default:
      toastify(toastConfig.message, {
        ...toastOptions,
        className: `Toastify__toast-light`,
      });
  }
};

export default toast;
