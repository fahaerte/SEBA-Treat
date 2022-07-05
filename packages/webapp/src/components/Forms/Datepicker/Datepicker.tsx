import React from "react";
import { IFormDatePicker } from "./IDatePicker";
import { useFormRuleConverter } from "../_utils/useFormRuleConverter";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import DatepickerControlled from "./DatepickerControlled";

const Datepicker = <TFormValues extends FieldValues>({
  formKey,
  defaultValue = "",
  label,
  rules,
  ...props
}: IFormDatePicker<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  const { field, fieldState } = useController<TFormValues>({
    control,
    name: formKey,
    rules: useFormRuleConverter(rules),
    defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
  });

  return (
    <DatepickerControlled
      value={field.value}
      onChange={field.onChange}
      label={rules?.required?.value ? `${label} *` : label}
      isInvalid={fieldState.invalid}
      invalidFeedback={fieldState.error?.message}
      {...props}
    />
  );
};

export default Datepicker;
