import React from "react";
import { IModalTitle } from "./IModalTitle";
import Typography from "../../Typography/Typography";

const ModalTitle = ({ children, className = "", ...props }: IModalTitle) => (
  <Typography
    className={["modal-title", className].join(" ")}
    variant="h5"
    component="div"
    {...props}
  >
    {children}
  </Typography>
);

export default ModalTitle;
