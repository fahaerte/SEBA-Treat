import React, { ChangeEvent } from "react";
import { SCInput } from "../styles";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { IFileInput } from "./IFileInput";

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
  const [files, setFiles] = React.useState<FileList | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    console.log(e.target.files);

    onChange(e);
  };
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
        accept={Array.isArray(fileType) ? fileType.join(",") : fileType}
        className={[
          className,
          isInvalid ? "is-invalid" : "",
          "form-control",
        ].join(" ")}
        placeholder={label}
        readOnly={disabled}
        multiple={multiple}
        onChange={(event) => handleChange(event)}
        {...rest}
      />

      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </>
  );
};

export default FileInputControlled;
