import React from "react";
import { ISelect } from "./ISelect";
import { SCFloatingFormRound, SCSelect } from "../styles";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";

// TODO add value
const SelectControlledRound = ({
  value,
  children,
  size = "md",
  className = "",
  label,
  disabled = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  ...props
}: ISelect<HTMLSelectElement>) => {
  const inputId = getEncodedString(label);
  return (
    <SCFloatingFormRound
      className={["form-floating", isInvalid ? "is-invalid" : ""].join(" ")}
    >
      <SCSelect
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event)}
        id={inputId}
        className={[
          isInvalid ? "is-invalid" : "",
          "form-select",
          size === "md" ? "" : `form-select-${size}`,
          className,
        ].join(" ")}
        {...props}
      >
        {children}
      </SCSelect>
      <label htmlFor={inputId}>{label}</label>
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </SCFloatingFormRound>
  );
};

export default SelectControlledRound;
