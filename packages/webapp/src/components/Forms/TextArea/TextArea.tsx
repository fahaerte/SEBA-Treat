import React from "react";
import { ITextArea } from "./ITextArea";
import { SCFloatingForm, SCTextArea } from "../styles";
import Typography from "../../Typography/Typography";
import { generateRegisterOptions } from "../_utils/generateRegisterOptions";

const TextArea = <TFormValues extends Record<string, unknown>>({
  label,
  formKey,
  register,
  className = "",
  wrapperClasses = "col-md",
  disabled = false,
  rows = 1,
  isValid = true,
  sendWithNewLines = false,
  invalidFeedback = "",
  errors = undefined,
  defaultValue = undefined,
  ...props
}: ITextArea<TFormValues>) => (
  <SCFloatingForm className={["form-floating", wrapperClasses].join(" ")}>
    <SCTextArea
      {...register(formKey, generateRegisterOptions(defaultValue, errors))}
      className={[
        "form-control",
        className,
        isValid ? "" : "is-invalid",
        "textarea-height",
        "row-height",
      ].join(" ")}
      rows={rows}
      placeholder={label}
      wrap={sendWithNewLines ? "soft" : "hard"}
      {...props}
      id={`${label.replace(/\s+/g, "-").toLowerCase()}-${formKey}`}
      readOnly={disabled}
    />
    <span>
      {errors?.maxLength?.value ? `Max. ${errors.maxLength.value}` : ""}
    </span>
    <label
      htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}-${formKey}`}
      className={["form-label", isValid ? "" : "is-invalid"].join(" ")}
    >
      {label}
      {errors?.required?.value ? " *" : ""}
    </label>
    {isValid ? (
      ""
    ) : (
      <Typography variant="psmall" className="invalid-feedback">
        {invalidFeedback}
      </Typography>
    )}
  </SCFloatingForm>
);

export default TextArea;
