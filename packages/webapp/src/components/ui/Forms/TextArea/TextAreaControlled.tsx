import React, { ChangeEvent } from "react";
import { ITextArea } from "./ITextArea";
import { SCFloatingForm, SCTextArea } from "../styles";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";

const TextAreaControlled = ({
  wrapperClasses = "",
  className = "",
  disabled = false,
  rows = 1,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  sendWithNewLines = false,
  onChange = () => undefined,
  value,
  label,
}: ITextArea<HTMLTextAreaElement>) => {
  const inputId = getEncodedString(label);

  return (
    <SCFloatingForm className={["form-floating", wrapperClasses].join(" ")}>
      <SCTextArea
        className={[
          "form-control",
          isInvalid ? "is-invalid" : "",
          className,
        ].join(" ")}
        rows={rows}
        placeholder={label}
        wrap={sendWithNewLines ? "soft" : "hard"}
        id={inputId}
        readOnly={disabled}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event)}
        value={value}
        // forwardedAs="textarea"
        as="textarea"
      />
      <label htmlFor={inputId}>{label}</label>
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </SCFloatingForm>
  );
};

export default TextAreaControlled;
