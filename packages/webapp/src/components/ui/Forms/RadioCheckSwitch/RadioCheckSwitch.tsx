import React from "react";
import { IFormRadioCheckSwitch } from "./IRadioCheckSwitch";
import { SCCheckbox } from "../styles";
import { generateRegisterOptions } from "../_utils/useFormRuleConverter";
import { FieldValues, useFormContext } from "react-hook-form";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";

/**
 * Warning: disabled property is currently not supported.
 */
const RadioCheckSwitch = <TFormValues extends FieldValues>({
  className = "",
  type = "checkbox",
  color = "primary",
  label,
  formKey,
  value,
  defaultValue,
  rules,
}: IFormRadioCheckSwitch<TFormValues>) => {
  const { register } = useFormContext<TFormValues>();
  const inputId = getEncodedString(label, type, formKey);

  return (
    <div className={`form-check ${type === "switch" ? "form-switch" : ""}`}>
      <label htmlFor={inputId} className={"form-check-label"}>
        {rules?.required?.value ? `${label} *` : label}
        {/*errors?.required?.value ? " *" : ""*/}
      </label>
      <SCCheckbox
        color={color}
        {...register(formKey, generateRegisterOptions(defaultValue, rules))}
        value={value}
        id={inputId}
        type={type === "checkbox" || type === "switch" ? "checkbox" : "radio"}
        className={[className, "form-check-input"].join(" ")}
        role={type === "radio" ? "radiobutton" : type} // accepted value for radio in role is radiobutton
      />
    </div>
  );
};

export default RadioCheckSwitch;
