import React from "react";
import { IFormRadioCheckSwitch } from "./IRadioCheckSwitch";
import { SCCheckbox } from "../styles";
import Typography from "../../Typography/Typography";
import { generateRegisterOptions } from "../_utils/generateRegisterOptions";

/**
 * Check, Radio and Switch element.
 * The type can be determined with the type attribute.
 * Warning: disabled property is currently not supported.
 */
const RadioCheckSwitch = <TFormValues extends Record<string, unknown>>({
  className = "",
  label,
  formKey,
  register,
  wrapperClasses = "col-md",
  type = "checkbox",
  isValid = true,
  invalidFeedback = "",
  color = "primary",
  value = label,
  defaultValue = undefined,
  groupItem = false,
  errors = undefined,
  ...props
}: IFormRadioCheckSwitch<TFormValues>) => (
  <div className={wrapperClasses}>
    <div
      className={[`form-check ${type === "switch" ? "form-switch" : ""}`].join(
        " "
      )}
    >
      <label
        htmlFor={`${label
          .replace(/\s+/g, "-")
          .toLowerCase()}-${type}-${formKey}`}
        className={["form-check-label", isValid ? "" : "is-invalid"].join(" ")}
      >
        {label}
        {errors?.required?.value && !groupItem ? " *" : ""}
      </label>
      <SCCheckbox
        color={color}
        {...register(formKey, generateRegisterOptions(defaultValue, errors))}
        value={value}
        id={`${label.replace(/\s+/g, "-").toLowerCase()}-${type}-${formKey}`}
        type={type === "checkbox" || type === "switch" ? "checkbox" : "radio"}
        className={[className, "form-check-input"].join(" ")}
        role={type === "radio" ? "radiobutton" : type} // accepted value for radio in role is radiobutton
        {...props}
      />

      {isValid ? (
        ""
      ) : (
        <Typography variant="psmall" className="invalid-feedback">
          {invalidFeedback}
        </Typography>
      )}
    </div>
  </div>
);

export default RadioCheckSwitch;
