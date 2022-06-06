import React from "react";
import { IRadioCheckSwitch } from "./IRadioCheckSwitch";
import { SCCheckbox } from "../styles";

const RadioCheckSwitchControlled = ({
  className = "",
  label,
  wrapperClasses = "",
  type = "checkbox",
  color = "primary",
  value = label,
  checked = false,
  onChange = () => undefined,
  ...props
}: IRadioCheckSwitch<HTMLInputElement>) => (
  <div className={wrapperClasses}>
    <div
      className={[`form-check ${type === "switch" ? "form-switch" : ""}`].join(
        " "
      )}
    >
      <label
        htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}`}
        className={["form-check-label"].join(" ")}
      >
        {label}
      </label>
      <SCCheckbox
        onChange={(event) => onChange(event)}
        checked={checked}
        value={value}
        id={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}`}
        type={type === "checkbox" || type === "switch" ? "checkbox" : "radio"}
        color={color}
        className={[className, "form-check-input"].join(" ")}
        role={type === "radio" ? "radiobutton" : type} // accepted value for radio in role is radiobutton
        {...props}
      />
    </div>
  </div>
);

export default RadioCheckSwitchControlled;
