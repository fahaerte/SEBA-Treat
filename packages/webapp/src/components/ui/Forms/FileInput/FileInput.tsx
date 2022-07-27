import React, { ChangeEvent } from "react";
import { IFormFileInput } from "./IFileInput";
import { useFormRuleConverter } from "../_utils/useFormRuleConverter";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { SCInput } from "../styles";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";

const FileInput = <TFormValues extends FieldValues>({
  formKey,
  label,
  rules,
  className = "",
  fileType = ["text/*", "application/*", "video/*", "audio/*", "image/*"],
  multiple = true,
  disabled = false,
  defaultValue,
  ...props
}: IFormFileInput<TFormValues>) => {
  const { control, setValue } = useFormContext<TFormValues>();

  const { fieldState } = useController<TFormValues>({
    control,
    name: formKey,
    rules: useFormRuleConverter(rules),
    // defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
  });

  const invalidFeedback =
    fieldState.error?.message || EDefaultErrorMessages.GENERAL;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setValue(formKey, event.target.files);
  };
  return (
    <>
      <label
        htmlFor={getEncodedString(label, "file")}
        className={[
          "form-label mb-0",
          fieldState.invalid ? "is-invalid" : "",
        ].join(" ")}
      >
        {rules?.required?.value ? `${label} *` : label}
      </label>
      <SCInput
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        defaultValue={defaultValue}
        id={getEncodedString(label, "file")}
        type="file"
        accept={Array.isArray(fileType) ? fileType.join(",") : fileType}
        className={[
          className,
          fieldState.invalid ? "is-invalid" : "",
          "form-control",
        ].join(" ")}
        placeholder={label}
        readOnly={disabled}
        multiple={multiple}
        onChange={(e) => handleChange(e)}
        {...props}
      />

      {fieldState.invalid && <FormInvalidFeedback message={invalidFeedback} />}
    </>
  );
};

export default FileInput;
