import React, { FormEvent } from "react";
import { TIFormElementOmit } from "../../_interfaces/IFormElement";
import {
  IFormRadioCheckSwitch,
  IRadioCheckSwitchProps,
} from "../IRadioCheckSwitch";

export interface IRadioCheckSwitchGroupProps {
  /**
   * Label / Instruction of the input group
   */
  label: string;
  /**
   * alignment of the children (whether they are displayed listed or inline)
   */
  inline?: boolean;
  /**
   * Additional CSS classes
   */
  wrapperClasses?: string;
  /**
   * Whether providing an input is required
   * Will not be set by developer and only propagated through error object
   */
  required?: boolean;
  /**
   * error message that will be displayed
   * Will not be set by developer and only propagated through error object
   */
  invalidFeedback?: string;
}

export interface IFormRadioCheckSwitchGroup
  extends IRadioCheckSwitchGroupProps {
  /**
   * Children of this component
   */
  children: React.ReactNode;
}

export type TRadioCheckSwitchGroupOptions<TFormValues> = {
  label: IFormRadioCheckSwitch<TFormValues>["label"];
  value?: IFormRadioCheckSwitch<TFormValues>["value"];
};

export interface IRadioCheckSwitchGroup<TFormValues>
  extends Omit<IRadioCheckSwitchGroupProps, "required" | "invalidFeedback"> {
  /**
   * Type of the element
   */
  type: IRadioCheckSwitchProps["type"];
  /**
   * Color of the filling when checked
   */
  color?: IRadioCheckSwitchProps["color"];
  /**
   * On Change event handler
   * @param event
   */
  onChange?: (event: FormEvent<HTMLDivElement>) => void;
  /**
   * Options to display the children
   */
  options: TRadioCheckSwitchGroupOptions<TFormValues>[];
}

export interface IRadioCheckSwitchGroupConfig<TFormValues>
  extends TIFormElementOmit<TFormValues> {
  /**
   * Required attribute will be retrieved from the error object
   * invalidFeedback will be retrieved from the errors property of the useForm-hook
   */
  props: Omit<
    IRadioCheckSwitchGroupProps,
    "required" | "invalidFeedback" | "label"
  > & {
    type: IRadioCheckSwitchProps["type"];
    color?: IRadioCheckSwitchProps["color"];
  };
  /**
   * Options of a radioCheckSwitchGroup
   */
  options: TRadioCheckSwitchGroupOptions<TFormValues>[];
}
