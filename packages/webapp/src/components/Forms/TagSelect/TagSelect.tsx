import React, { useContext } from "react";
import { TagSelectControlled } from "./";
import { IFormTagSelect } from "./ITagSelect";
import Typography from "../../Typography/Typography";
import { generateRegisterOptions } from "../_utils/generateRegisterOptions";
import { CustomValueContext } from "../Form";
import { PathValue, UnpackNestedValue, Path } from "react-hook-form";

const TagSelect = <TFormValues extends Record<string, unknown>>({
  formKey,
  register,
  defaultValue = "",
  className = "",
  wrapperClasses = "col-md",
  label,
  disabled = false,
  isValid = true,
  invalidFeedback = "",
  errors = undefined,
  color = "secondary",
  selectOptions,
  noOptionsMessage,
  loadingMessage,
}: IFormTagSelect<TFormValues>) => {
  const customValueControl = useContext(CustomValueContext);
  register(formKey, generateRegisterOptions(defaultValue, errors, disabled));

  return (
    <>
      <TagSelectControlled
        color={color}
        isValid={isValid}
        wrapperClasses={wrapperClasses}
        label={label}
        className={className}
        disabled={disabled}
        selectOptions={selectOptions}
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        onChange={(selectedOptions) => {
          customValueControl.setValue(
            formKey,
            selectedOptions as UnpackNestedValue<
              PathValue<TFormValues, Path<TFormValues>>
            >
          );
        }}
      />
      {isValid ? (
        ""
      ) : (
        <Typography variant="psmall" className="invalid-feedback">
          {invalidFeedback}
        </Typography>
      )}
    </>
  );
};

export default TagSelect;
