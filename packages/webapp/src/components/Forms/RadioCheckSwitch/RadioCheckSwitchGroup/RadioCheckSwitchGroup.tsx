import React from "react";
import { IFormRadioCheckSwitchGroup } from "./IRadioCheckSwitchGroup";
import Typography from "../../../Typography/Typography";
import { FieldValues } from "react-hook-form";
import useRadioCheckGroupContext from "./useRadioCheckGroupContext";

const RadioCheckSwitchGroup = <TFormValues extends FieldValues>({
  className = "",
  inline = false,
  type = "radio",
  color = "primary",
  formKey,
  defaultValue,
  rules,
  children,
  label,
}: IFormRadioCheckSwitchGroup<TFormValues>) => {
  const { provider: RadioCheckGroupContextProvider } =
    useRadioCheckGroupContext();

  return (
    <RadioCheckGroupContextProvider
      value={{ formKey, defaultValue, rules, type, color }}
    >
      <div
        className={[
          className,
          inline
            ? "justify-content-between flex-wrap d-flex form-check-inline"
            : "",
        ].join(" ")}
      >
        <Typography
          variant="h6"
          component={"div"}
          className={inline ? "me-xs" : ""}
        >
          {label}
          {rules?.required?.value ? " *" : ""}
          {inline ? ":" : ""}
        </Typography>
        {children}
        {/*<Typography variant="psmall" color="danger">
      {invalidFeedback}
    </Typography>*/}
      </div>
    </RadioCheckGroupContextProvider>
  );
};

export default RadioCheckSwitchGroup;
