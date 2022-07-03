import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent } from "react";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";

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

export interface IFileInputProps {
  /**
   * Array of valid file types
   */
  fileType?: TAllTypes[] | TAllTypes | string;
  /**
   * Whether multiple files can be uploaded
   */
  multiple?: boolean;
}

export interface IFormFileInput<TFormValues>
  extends IFormElement<TFormValues>,
    IFileInputProps {}

export interface IFileInputConfig<TFormValues>
  extends IFormElement<TFormValues> {
  props?: IFileInputProps;
}

export interface IFileInput<TFormValues>
  extends IFormElementControlled,
    Omit<IFormFileInput<TFormValues>, TIFormElementOmit> {
  value?: string | ReadonlyArray<string> | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
