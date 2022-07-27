import React, { ChangeEvent } from "react";
import { SCInput } from "../styles";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { IFileInput } from "./IFileInput";

const FileInputControlled = ({
  className = "",
  fileType = ["text/*", "application/*", "video/*", "audio/*", "image/*"],
  multiple = true,
  disabled = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  label,
  ...rest
}: IFileInput<HTMLInputElement | null>) => {
  const inputId = getEncodedString(label, "file");
  return (
    <>
      <label
        htmlFor={inputId}
        className={["form-label mb-0", isInvalid ? "is-invalid" : ""].join(" ")}
      >
        {label}
      </label>
      <SCInput
        id={inputId}
        type="file"
        // files={files}
        accept={Array.isArray(fileType) ? fileType.join(",") : fileType}
        className={[
          className,
          isInvalid ? "is-invalid" : "",
          "form-control",
        ].join(" ")}
        placeholder={label}
        readOnly={disabled}
        multiple={multiple}
        onChange={(event) => onChange(event)}
        {...rest}
      />

      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </>
  );
};

export default FileInputControlled;
