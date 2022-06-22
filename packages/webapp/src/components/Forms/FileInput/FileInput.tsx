import React from "react";
import { IFormFileInput } from "./IFileInput";
import { useFormRuleConverter } from "../_utils/useFormRuleConverter";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import FileInputControlled from "./FileInputControlled";

const FileInput = <TFormValues extends FieldValues>({
  formKey,
  defaultValue = "",
  label,
  rules,
  ...props
}: IFormFileInput<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  const { field, fieldState } = useController<TFormValues>({
    control,
    name: formKey,
    rules: useFormRuleConverter(rules),
    defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
  });

  return (
    <FileInputControlled
      value={field.value}
      label={rules?.required?.value ? `${label} *` : label}
      isInvalid={fieldState.invalid}
      onChange={field.onChange}
      invalidFeedback={fieldState.error?.message}
      {...props}
    />
  );
};

export default FileInput;
