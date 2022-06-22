import React from "react";
import { IInput } from "./IInput";
import { SCInput, SCFloatingForm } from "../styles";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { getEncodedString } from "../../../utils/getEncodedString";

const InputControlled = ({
  wrapperClasses = "",
  className = "",
  disabled = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  label,
  type,
  value,
  ...rest
}: IInput<HTMLInputElement>) => {
  const inputId = getEncodedString(label, type as string);

  return (
    <SCFloatingForm className={["form-floating", wrapperClasses].join(" ")}>
      <SCInput
        value={value}
        disabled={disabled}
        id={inputId}
        type={type}
        className={[
          className,
          "form-control",
          isInvalid ? "is-invalid" : "",
        ].join(" ")}
        onChange={onChange}
        placeholder={label}
        {...rest}
      />
      <label htmlFor={inputId}>{label}</label>
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </SCFloatingForm>
  );
};

export default InputControlled;
