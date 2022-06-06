import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent } from "react";

export const AInputType = [
  "email",
  "number",
  "password",
  "search",
  "text",
  "file",
] as const;

export type TInputType = typeof AInputType[number];

export interface IInputProps {
  /**
   * Type of the input
   */
  type: TInputType;
}

export interface IFormInput<TFormValues>
  extends IFormElement<TFormValues>,
    IInputProps {}

export interface IInput<TFormValues>
  extends Omit<
    IFormInput<TFormValues>,
    | "formKey"
    | "isValid"
    | "register"
    | "errors"
    | "invalidFeedback"
    | "defaultValue"
  > {
  /**
   * on Change handler
   * @param event
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Value of the input
   */
  value: string;
}

export interface IInputConfig<TFormValues>
  extends TIFormElementOmit<TFormValues> {
  props: IInputProps;
}
