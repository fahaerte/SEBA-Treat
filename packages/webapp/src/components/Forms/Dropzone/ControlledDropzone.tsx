import React from "react";
import { IDropzone } from "./IDropzone";
import { SCDropzone } from "./styles";
import { useDropzone } from "react-dropzone";
import Icon from "../../Icon/Icon";
import Button from "../../Button/Button";
import Typography from "../../Typography/Typography";

const ControlledDropzone = ({
  dropzoneLabel = "Drop file here for upload",
  buttonLabel = "Click here to upload file",
  onChange = () => undefined,
}: IDropzone<HTMLInputElement>): JSX.Element => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: any) => {
      onChange(files);
    },
  });

  return (
    <SCDropzone
      {...getRootProps({
        className:
          "dropzone d-flex align-items-center justify-content-center cursor-pointer h-100",
      })}
    >
      <div className={"d-flex flex-column text-center"}>
        <div className={"w-100"}>
          <Icon type={"upload"} size={"lg"} />
        </div>
        <Typography>{dropzoneLabel}</Typography>
        <Button size={"lg"} type={"outline"} color={"info"}>
          {buttonLabel}
        </Button>
      </div>
      <input {...getInputProps()} />
    </SCDropzone>
  );
};

export default ControlledDropzone;
