import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent, DOMAttributes } from "react";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";

export const ADatePickerType = ["date", "datetime-local", "time"] as const;
export type TDatePickerType = typeof ADatePickerType[number];

export interface IDatePickerProps {
  /**
   * Type of the datepicker regarding the input.
   * String format of the types:
   * Date: yyyy-mm-dd
   * Datetime: yyyy-mm-ddThh:mm
   * Time: hh:mm
   */
  type?: TDatePickerType;
  /**
   * Whether the input should be sent as a date object
   * If false, then the comparable min/max values in
   * register have to be represented as strings.
   * Otherwise, a number is required, by using the
   * getTime() function.
   */
  valueAsDate?: boolean;
}

export interface IFormDatePicker<TFormValues>
  extends IFormElement<TFormValues>,
    IDatePickerProps {}
export interface IFormDatePickerConfig<TFormValues>
  extends IFormElement<TFormValues> {
  props?: IDatePickerProps;
}

export interface IDatePicker<TFormValues>
  extends IFormElementControlled,
    Omit<IFormDatePicker<TFormValues>, TIFormElementOmit | "valueAsDate">,
    Partial<
      Pick<DOMAttributes<HTMLInputElement>, "onKeyDown" | "onFocus" | "onBlur">
    > {
  /**
   * on Change handler
   * @param event
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Value of the date input
   */
  value: string;
}
