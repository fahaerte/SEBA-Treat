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

const TagSelect = <TFormValues extends FieldValues>({
  formKey,
  defaultValue = [],
  disabled = false,
  rules,
  ...props
}: IFormTagSelect<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  const { field, fieldState } = useController<TFormValues>({
    control,
    name: formKey,
    rules: useFormRuleConverter(rules),
    defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
  });

  return (
    <TagSelectControlled
      disabled={disabled}
      onChange={field.onChange}
      value={field.value}
      isInvalid={fieldState.invalid}
      invalidFeedback={fieldState.error?.message}
      {...props}
    />
  );
};

export default TagSelect;
