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
  // valueAsDate = false,
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

  // const handleDateValue = () => {
  //   if (valueAsDate) {
  //     setValue(formKey, new Date());
  //   } else {
  //     setValue(formKey, field.value);
  //   }
  // };
  return (
    <DatepickerControlled
      min={rules?.min?.value as string}
      max={rules?.max?.value as string}
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
