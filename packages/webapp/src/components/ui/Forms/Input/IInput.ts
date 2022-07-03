import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent, DOMAttributes } from "react";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";

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
   * Type of the input (email, number, password, text...)
   *
   * @default "text"
   */
  type?: TInputType;
}

export interface IFormInput<TFormValues>
  extends IFormElement<TFormValues>,
    IInputProps {}
export interface IFormInputConfig<TFormValues>
  extends IFormElement<TFormValues> {
  props: IInputProps;
}

export interface IInput<TFormValues>
  extends IFormElementControlled,
    Omit<IFormInput<TFormValues>, TIFormElementOmit>,
    Partial<
      Pick<DOMAttributes<HTMLInputElement>, "onKeyDown" | "onFocus" | "onBlur">
    > {
  /**
   * Value of the input
   */
  value: string;
  /**
   * on Change handler
   * @param event
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
