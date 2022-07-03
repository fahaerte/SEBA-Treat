import React from "react";
import { IFormInput } from "./IInput";
import { useFormRuleConverter } from "../_utils/useFormRuleConverter";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import InputControlled from "./InputControlled";

const Input = <TFormValues extends FieldValues>({
  formKey,
  defaultValue = "",
  label,
  rules,
  ...props
}: IFormInput<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  const { field, fieldState } = useController<TFormValues>({
    control,
    name: formKey,
    rules: useFormRuleConverter(rules),
    defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
  });

  // TODO nested values error handling -.-
  // console.log(formKey, get(errors, formKey)?.message);
  // console.log(fieldState.error?.message);

  return (
    <InputControlled
      value={field.value}
      onChange={field.onChange}
      label={rules?.required?.value ? `${label} *` : label}
      isInvalid={fieldState.invalid}
      invalidFeedback={fieldState.error?.message}
      {...props}
    />
  );
};

export default Input;
