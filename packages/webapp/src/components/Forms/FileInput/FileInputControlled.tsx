import React from "react";
import { SCInput } from "../styles";
import { getEncodedString } from "../../../utils/getEncodedString";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { IFileInput } from "./IDropzone";

const FileInputControlled = ({
  wrapperClasses = "",
  className = "",
  fileType = ["text/*", "application/*", "video/*", "audio/*", "image/*"],
  multiple = true,
  disabled = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  label,
  value,
  ...rest
}: IFileInput<HTMLInputElement>) => {
  const inputId = getEncodedString(label, "file");

  return (
    <div className={wrapperClasses}>
      <label
        htmlFor={inputId}
        className={["form-label", isInvalid ? "is-invalid" : ""].join(" ")}
      >
        {label}
      </label>
      <SCInput
        id={inputId}
        type="file"
        accept={Array.isArray(fileType) ? fileType.join(",") : fileType}
        className={[
          className,
          isInvalid ? "is-invalid" : "",
          "form-control",
        ].join(" ")}
        placeholder={label}
        readOnly={disabled}
        multiple={multiple}
        value={value}
        onChange={(event) => onChange(event)}
        {...rest}
      />

      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </div>
  );
};

export default FileInputControlled;
