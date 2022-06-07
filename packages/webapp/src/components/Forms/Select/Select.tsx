import React from "react";
import { IFormSelect } from "./ISelect";
import { SCFloatingForm, SCSelect } from "../styles";
import { generateRegisterOptions } from "../_utils/generateRegisterOptions";
import Typography from "../../Typography/Typography";

const Select = <TFormValues extends Record<string, unknown>>({
  children,
  formKey,
  register,
  defaultValue = "",
  className = "",
  wrapperClasses = "col-md",
  size = "md",
  multiple = false,
  label,
  disabled = false,
  isValid = true,
  invalidFeedback = "",
  errors = undefined,
}: IFormSelect<TFormValues>) => (
  <SCFloatingForm
    className={[
      multiple || size !== "md" ? "" : "form-floating",
      wrapperClasses,
    ].join(" ")}
  >
    {multiple || size !== "md" ? (
      <label
        htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}-${formKey}`}
        className={["form-label", isValid ? "" : "is-invalid"].join(" ")}
      >
        {label}
        {errors?.required?.value ? " *" : ""}
      </label>
    ) : (
      ""
    )}
    <SCSelect
      id={`${label.replace(/\s+/g, "-").toLowerCase()}-${formKey}`}
      {...register(formKey, generateRegisterOptions(defaultValue, errors))}
      multiple={multiple}
      className={[
        "form-select",
        size === "md" ? "" : `form-select-${size}`,
        isValid ? "" : "is-invalid",
        className,
      ].join(" ")}
      // Using disabled attribute because readOnly does not exist.
      disabled={disabled}
    >
      <option disabled />
      {children}
    </SCSelect>

    {!multiple && size === "md" ? (
      <label
        htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}-${formKey}`}
        className={["form-label", isValid ? "" : "is-invalid"].join(" ")}
      >
        {label}
        {errors?.required?.value ? " *" : ""}
      </label>
    ) : (
      ""
    )}

    {isValid ? (
      ""
    ) : (
      <Typography variant="psmall" className="invalid-feedback">
        {invalidFeedback}
      </Typography>
    )}
  </SCFloatingForm>
);

export default Select;
