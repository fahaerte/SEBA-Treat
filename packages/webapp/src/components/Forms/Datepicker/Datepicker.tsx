import React from "react";
import { IDatePicker } from "./IDatePicker";
import { SCInput, SCFloatingForm } from "../styles";
import Typography from "../../Typography/Typography";
import { generateRegisterOptions } from "../_utils/generateRegisterOptions";

const Datepicker = <TFormValues extends Record<string, unknown>>({
  className = "",
  label,
  type,
  formKey,
  wrapperClasses = "col-md",
  valueAsDate = true,
  register,
  defaultValue = undefined,
  isValid = true,
  disabled = false,
  invalidFeedback = "",
  errors = undefined,
  ...props
}: IDatePicker<TFormValues>) => (
  <SCFloatingForm className={["form-floating", wrapperClasses].join(" ")}>
    <SCInput
      {...register(
        formKey,
        generateRegisterOptions(defaultValue, errors, valueAsDate)
      )}
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

export default Datepicker;
