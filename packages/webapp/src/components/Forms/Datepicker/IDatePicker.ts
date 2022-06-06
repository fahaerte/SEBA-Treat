import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";

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
  type: TDatePickerType;
  /**
   * Whether the input should be sent as a date object
   * If false, then the comparable min/max values in
   * register have to be represented as strings.
   * Otherwise, a number is required, by using the
   * getTime() function.
   */
  valueAsDate?: boolean;
}

export interface IDatePicker<TFormValues>
  extends IFormElement<TFormValues>,
    IDatePickerProps {}

export interface IDatePickerConfig<TFormValues>
  extends TIFormElementOmit<TFormValues> {
  props: IDatePickerProps;
}
