import React from "react";
import { IFormTextArea } from "./ITextArea";
import { useFormRuleConverter } from "../_utils/useFormRuleConverter";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";
import TextAreaControlled from "./TextAreaControlled";

const TextArea = <TFormValues extends FieldValues>({
  formKey,
  defaultValue = "",
  label,
  rules,
  ...props
}: IFormTextArea<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();

  const { field, fieldState } = useController<TFormValues>({
    control,
    name: formKey,
    rules: useFormRuleConverter(rules),
    defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
  });

  return (
    <TextAreaControlled
      value={field.value}
      onChange={field.onChange}
      label={rules?.required?.value ? `${label} *` : label}
      isInvalid={fieldState.invalid}
      invalidFeedback={fieldState.error?.message}
      {...props}
    />
  );
};

export default TextArea;
