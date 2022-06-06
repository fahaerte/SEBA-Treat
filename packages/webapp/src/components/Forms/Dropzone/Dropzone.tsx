import React from "react";
import { IDropzoneForm } from "./IDropzone";
import { SCInput } from "../styles";
import { Typography } from "../../..";
import { generateRegisterOptions } from "../_utils/generateRegisterOptions";

const Dropzone = <TFormValues extends Record<string, unknown>>({
  className = "",
  label,
  formKey,
  wrapperClasses = "col-md",
  register,
  fileType = ["text/*", "application/*", "video/*", "audio/*", "image/*"],
  multiple = true,
  isValid = true,
  disabled = false,
  invalidFeedback,
  errors = undefined,
  defaultValue = undefined,
  ...props
}: IDropzoneForm<TFormValues>) => {
  return (
    <div className={wrapperClasses}>
      <label
        htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}-${formKey}`}
        className={["form-label", isValid ? "" : "is-invalid"].join(" ")}
      >
        {label}
        {errors?.required?.value ? " *" : ""}
      </label>
      <SCInput
        type="file"
        {...register(
          formKey,
          generateRegisterOptions(defaultValue, errors, disabled)
        )}
        accept={typeof fileType === "string" ? fileType : fileType.join(",")}
        multiple={multiple}
        id={`${label.replace(/\s+/g, "-").toLowerCase()}-${formKey}`}
        className={[
          className,
          "form-control",
          isValid ? "" : "is-invalid",
        ].join(" ")}
        placeholder={label}
        {...props}
      />
      {isValid ? (
        ""
      ) : (
        <Typography variant="psmall" className="invalid-feedback">
          {invalidFeedback}
        </Typography>
      )}
    </div>
  );
};

export default Dropzone;
