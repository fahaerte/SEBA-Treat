import React from "react";
import { IDatePicker } from "./IDatePicker";
import { SCFloatingForm, SCInput } from "../styles";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";

const DatepickerControlled = ({
  className = "",
  type = "date",
  disabled = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  min,
  max,
  label,
  value,
  ...rest
}: IDatePicker<HTMLInputElement>) => {
  const inputId = getEncodedString(label, type);

  return (
    <SCFloatingForm className={["form-floating"].join(" ")}>
      <SCInput
        id={inputId}
        type={type}
        className={[
          className,
          isInvalid ? "is-invalid" : "",
          "form-control",
        ].join(" ")}
        placeholder={label}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event)}
        min={min}
        max={max}
        {...rest}
      />
      <label htmlFor={inputId}>{label}</label>
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </SCFloatingForm>
  );
};

export default DatepickerControlled;
