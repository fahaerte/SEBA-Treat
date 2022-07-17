import React from "react";
import { TagSelectControlled } from "./index";
import { IFormTagSelect } from "./ITagSelect";
import { useFormRuleConverter } from "../_utils/useFormRuleConverter";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import { TOptionValuePair } from "../_interfaces/TOptionValuePair";

const TagSelect = <TFormValues extends FieldValues>({
  formKey,
  label,
  defaultValue = [],
  disabled = false,
  rules,
  ...props
}: IFormTagSelect<TFormValues>) => {
  const { control, setValue } = useFormContext<TFormValues>();

  const { field, fieldState } = useController<TFormValues>({
    control,
    name: formKey,
    rules: useFormRuleConverter(rules),
    defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
  });

  const changeHandler = () => {
    const fieldValue = field.value as TOptionValuePair[];
    console.log(fieldValue);
    const values: string[] = [];
    fieldValue.forEach((value) => values.push(value.value));
    setValue(formKey, values as PathValue<TFormValues, Path<TFormValues>>);
    console.log(field.value);
  };

  return (
    <TagSelectControlled
      disabled={disabled}
      label={rules?.required?.value ? `${label} *` : label}
      onChange={field.onChange}
      value={field.value}
      isInvalid={fieldState.invalid}
      invalidFeedback={fieldState.error?.message}
      {...props}
    />
  );
};

export default TagSelect;
