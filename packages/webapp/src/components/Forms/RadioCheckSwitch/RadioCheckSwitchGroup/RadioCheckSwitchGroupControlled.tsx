import React, { FormEvent } from "react";
import { IRadioCheckSwitchGroup } from "./IRadioCheckSwitchGroup";
import Typography from "../../../Typography/Typography";
import RadioCheckSwitchControlled from "../RadioCheckSwitchControlled";

const RadioCheckSwitchGroupControlled = ({
  wrapperClasses = "col-md",
  inline = false,
  label,
  type = "checkbox",
  onChange = () => undefined,
  options = [],
  ...props
}: IRadioCheckSwitchGroup<HTMLDivElement>) => (
  <div
    className={[
      wrapperClasses,
      inline
        ? "justify-content-between flex-wrap d-flex form-check-inline"
        : "column",
    ].join(" ")}
    onChange={(event: FormEvent<HTMLDivElement>) => onChange(event)}
    {...props}
  >
    <Typography variant="div" className={inline ? "me-1" : ""}>
      {label}
      {inline ? ":" : ""}
    </Typography>
    {options.map((option) => (
      <RadioCheckSwitchControlled
        className={""}
        key={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}`}
        type={type}
        label={option.label}
        value={option.value ?? ""}
      />
    ))}
  </div>
);

export default RadioCheckSwitchGroupControlled;
