import React from "react";
import { IRadioCheckSwitch } from "./IRadioCheckSwitch";
import { SCCheckbox } from "../styles";
import { getEncodedString } from "../../../../utils/getEncodedString";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";

const RadioCheckSwitchControlled = ({
  wrapperClasses = "",
  className = "",
  type = "checkbox",
  color = "primary",
  checked = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  value,
  label,
}: IRadioCheckSwitch<HTMLInputElement>) => {
  const inputId = getEncodedString(label, type);

  return (
    <div className={wrapperClasses}>
      <div className={`form-check ${type === "switch" ? "form-switch" : ""}`}>
        <label htmlFor={inputId} className={"form-check-label"}>
          {label}
        </label>
        <SCCheckbox
          onChange={(event) => onChange(event)}
          checked={checked}
          value={value}
          id={inputId}
          type={type === "checkbox" || type === "switch" ? "checkbox" : "radio"}
          color={color}
          className={[className, "form-check-input"].join(" ")}
          role={type === "radio" ? "radiobutton" : type} // accepted value for radio in role is radiobutton
        />
      </div>
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </div>
  );
};

export default RadioCheckSwitchControlled;
