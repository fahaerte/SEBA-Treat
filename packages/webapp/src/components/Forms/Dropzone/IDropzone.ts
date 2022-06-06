import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent } from "react";
import { IInput } from "../Input/IInput";

export const AImageFiles = "image/*";

export const AVideoFiles = "video/*";

export const AAudioFiles = "audio/*";

export const AFileTypes = "application/*";

export const ATextFiles = "text/*";

export const AAllTypes = [
  AImageFiles,
  AVideoFiles,
  AAudioFiles,
  AFileTypes,
  ATextFiles,
] as const;

export type TAllTypes = typeof AFileTypes[number];

export interface IDropzoneProps {
  /**
   * Array of valid file types
   */
  fileType?: TAllTypes[] | TAllTypes | string;
  /**
   * Whether multiple files can be uploaded
   */
  multiple?: boolean;
  /**
   * Used if controlled dropzone
   * @param event
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Used if controlled dropzone
   */
  dropzoneLabel?: string;
  /**
   * Used if controlled dropzone
   */
  buttonLabel?: string;
}

export interface IDropzone<TFormValues>
  extends Omit<IInput<TFormValues>, "onChange">,
    IDropzoneProps {}

export interface IDropzoneForm<TFormValues>
  extends IFormElement<TFormValues>,
    IDropzoneProps {}

export interface IDropzoneConfig<TFormValues>
  extends TIFormElementOmit<TFormValues> {
  props?: IDropzoneProps;
}
