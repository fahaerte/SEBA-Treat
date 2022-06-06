import React from "react";
import { IInput } from "./IInput";
import { SCInput, SCFloatingForm } from "../styles";

const InputControlled = ({
  className = "",
  wrapperClasses = "col-md",
  label,
  type,
  value = "",
  disabled = false,
  onChange = () => undefined,
  ...props
}: IInput<HTMLInputElement>) => (
  <SCFloatingForm className={["form-floating", wrapperClasses].join(" ")}>
    <SCInput
      value={value}
      disabled={disabled}
      id={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}`}
      type={type}
      className={[className, "form-control"].join(" ")}
      onChange={(event) => onChange(event)}
      placeholder={label}
      {...props}
    />
    <label htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}`}>
      {label}
    </label>
  </SCFloatingForm>
);

export default InputControlled;
