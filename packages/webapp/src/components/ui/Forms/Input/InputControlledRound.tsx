import React from "react";
import { IInput } from "./IInput";
import { SCInput, SCFloatingFormRound } from "../styles";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";

const InputControlledRound = ({
  className = "",
  disabled = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  label,
  type,
  value,
  labelClass = "",
  ...rest
}: IInput<HTMLInputElement>) => {
  const inputId = getEncodedString(label, type as string);

  return (
    <SCFloatingFormRound className={["form-floating"].join(" ")}>
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
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </SCFloatingFormRound>
  );
};

export default InputControlledRound;
