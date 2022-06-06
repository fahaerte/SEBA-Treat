import React, { useState } from "react";
import { SCDropzoneFilePreviewer } from "./styles";
import { IDropzoneFilePreviewer } from "./IDropzoneFilePreviewer";
import { ControlledDropzone } from "../";
import Icon from "../../Icon/Icon";
import PdfPreviewer from "../../PdfPreviewer/PdfPreviewer";
import Button from "../../Button/Button";

/**
 * Component to preview file
 */
const DropzoneFilePreviewer = ({ onSubmit }: IDropzoneFilePreviewer) => {
  const [fileSet, setFileSet] = useState(false);
  const [url, setUrl] = useState<string>("");

  const onFileChange = (files: any) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        // because we use readAsDataURL this will be always a base64 string
        setUrl(reader.result as string);
        setFileSet(true);
      },
      false
    );
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <SCDropzoneFilePreviewer>
      {!fileSet ? (
        <ControlledDropzone
          label={"This is a Dropzone"}
          multiple={false}
          fileType={""}
          onChange={onFileChange}
          type={"file"}
          value={"Dropzone"}
        />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col">
              <div className={"overflow-scroll"}>
                <PdfPreviewer url={url} paginatorDefault={false} />
              </div>
            </div>
            <div className="col">
              <div
                className={
                  "optionElements d-flex justify-content-end text-center"
                }
              >
                <Button
                  onClick={() => {
                    setFileSet(false);
                    onSubmit(url);
                  }}
                  className={"optionElement"}
                  color={"info"}
                >
                  <Icon type={"upload"} />
                </Button>
                <Button
                  onClick={() => setFileSet(false)}
                  className={"optionElement"}
                  color={"danger"}
                >
                  <Icon type={"trash1"} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SCDropzoneFilePreviewer>
  );
};

export default DropzoneFilePreviewer;
