import React from "react";
import { IFormInput } from "./IInput";
import { SCInput, SCFloatingForm } from "../styles";
import Typography from "../../Typography/Typography";
import { generateRegisterOptions } from "../_utils/generateRegisterOptions";

const Input = <TFormValues extends Record<string, unknown>>({
  className = "",
  wrapperClasses = "col-md",
  label,
  type,
  register,
  defaultValue = "",
  formKey,
  isValid = true,
  disabled = false,
  invalidFeedback = "Please check your input.",
  errors = undefined,
  ...props
}: IFormInput<TFormValues>) => (
  <SCFloatingForm className={["form-floating", wrapperClasses].join(" ")}>
    <SCInput
      {...register(formKey, generateRegisterOptions(defaultValue, errors))}
      id={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}-${formKey}`}
      type={type}
      className={[className, "form-control", isValid ? "" : "is-invalid"].join(
        " "
      )}
      placeholder={label}
      {...props}
      readOnly={disabled}
    />
    <label
      htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}-${formKey}`}
      className={[isValid ? "" : "is-invalid"].join(" ")}
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

export default Input;
