import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent } from "react";
import { TBootstrapPalette } from "../../../assets/theme/interfaces/TBootstrapPalette";

export const ACheckTypes = ["radio", "checkbox", "switch"] as const;

export type TCheckTypes = typeof ACheckTypes[number];

export interface IRadioCheckSwitchProps {
  /**
   * Whether the component is a Checkbox or a radio button
   */
  type: TCheckTypes;
  /**
   * Fill color of check/radio when checked
   */
  color?: TBootstrapPalette;
  /**
   * Value of the item
   */
  value?: string | number | readonly string[];
  /**
   * Whether this is a child of an input group
   * This value is for styling purposes only and will
   * not be set by the user
   */
  groupItem?: boolean;
}

export interface IFormRadioCheckSwitch<TFormValues>
  extends Omit<IFormElement<TFormValues>, "disabled">,
    IRadioCheckSwitchProps {}

export interface IRadioCheckSwitch<TFormValues>
  extends Omit<
    IFormRadioCheckSwitch<TFormValues>,
    | "formKey"
    | "isValid"
    | "register"
    | "errors"
    | "invalidFeedback"
    | "placeholder"
    | "defaultValue"
    | "groupItem"
  > {
  /**
   * onChange eventhandler
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Whether the element is checked by default
   */
  checked?: boolean;
}

export interface IRadioCheckSwitchConfig<TFormValues>
  extends Omit<TIFormElementOmit<TFormValues>, "disabled"> {
  props: Omit<IRadioCheckSwitchProps, "groupItem">;
}
