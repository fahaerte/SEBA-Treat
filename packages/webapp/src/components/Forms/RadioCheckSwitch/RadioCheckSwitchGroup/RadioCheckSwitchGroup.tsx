import React from "react";
import { IFormRadioCheckSwitchGroup } from "./IRadioCheckSwitchGroup";
import Typography from "../../../Typography/Typography";

const RadioCheckSwitchGroup = ({
  children,
  wrapperClasses = "col-md",
  inline = false,
  label,
  required = false,
  invalidFeedback = "",
  ...props
}: IFormRadioCheckSwitchGroup) => (
  <div
    className={[
      wrapperClasses,
      inline
        ? "justify-content-between flex-wrap d-flex form-check-inline"
        : "",
    ].join(" ")}
    {...props}
  >
    <Typography variant="div" className={inline ? "me-1" : ""}>
      {label}
      {required ? " *" : ""}
      {inline ? ":" : ""}
    </Typography>
    {children}
    <Typography variant="psmall" color="danger">
      {invalidFeedback}
    </Typography>
  </div>
);

export default RadioCheckSwitchGroup;
