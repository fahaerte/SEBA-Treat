import React from "react";
import { SCToastContainer } from "./styles";
import { IToastContainer } from "./IToastContainer";
import { EDelay } from "../../../../assets/theme/interfaces/EDelay";
import { Slide } from "react-toastify";

const ToastContainer = ({
  className = "",
  position = "top-right",
  transition = Slide,
  newestOnTop = false,
  closeOnClick = true,
  draggable = false,
  hideProgressBar = false,
  pauseOnHover = false,
  bodyClassName = "",
  progressClassName = "",
  autoClose = EDelay.MEDIUM,
  closeButton = true,
  limit,
}: IToastContainer) => {
  return (
    <SCToastContainer
      className={className}
      position={position}
      pauseOnHover={pauseOnHover}
      closeOnClick={closeOnClick}
      newestOnTop={newestOnTop}
      transition={transition}
      rtl={false}
      draggable={draggable}
      hideProgressBar={hideProgressBar}
      bodyClassName={bodyClassName}
      progressClassName={progressClassName}
      autoClose={autoClose}
      closeButton={closeButton}
      limit={limit}
    />
  );
};

export default ToastContainer;
