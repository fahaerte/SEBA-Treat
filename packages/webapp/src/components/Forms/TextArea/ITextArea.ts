import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";

export interface ITextAreaProps {
  /**
   * visible rows of the textarea
   */
  rows?: number;
  /**
   * If true, the submitted form wil contain new line breaks.
   */
  sendWithNewLines?: boolean;
}

export interface ITextArea<TFormValues>
  extends IFormElement<TFormValues>,
    ITextAreaProps {}

export interface ITextAreaConfig<TFormValues>
  extends TIFormElementOmit<TFormValues> {
  props?: ITextAreaProps;
}
