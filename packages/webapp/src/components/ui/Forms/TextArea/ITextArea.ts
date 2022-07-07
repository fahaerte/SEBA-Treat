import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent } from "react";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";

export interface ITextAreaProps {
  /**
   * Calculated rows of the textarea.
   * 1 row = height of input text field
   */
  rows?: number;
  /**
   * If true, the submitted form wil contain new line breaks.
   */
  sendWithNewLines?: boolean;
}

export interface IFormTextArea<TFormValues>
  extends IFormElement<TFormValues>,
    ITextAreaProps {}
export interface IFormTextAreaConfig<TFormValues>
  extends IFormElement<TFormValues> {
  props?: ITextAreaProps;
}

export interface ITextArea<TFormValues>
  extends IFormElementControlled,
    Omit<IFormTextArea<TFormValues>, TIFormElementOmit> {
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
