import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent } from "react";
import { TBootstrapPalette } from "../../../assets/theme/interfaces/TBootstrapPalette";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";

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
}

export interface IFormRadioCheckSwitch<TFormValues>
  extends Omit<IFormElement<TFormValues>, "disabled">,
    IRadioCheckSwitchProps {}

export interface IRadioCheckSwitch<TFormValues>
  extends IFormElementControlled,
    Omit<IFormRadioCheckSwitch<TFormValues>, TIFormElementOmit> {
  /**
   * onChange event handler
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Controlled state value
   */
  checked?: boolean;
}

export interface IFormRadioCheckSwitchConfig<TFormValues>
  extends Omit<IFormElement<TFormValues>, "disabled"> {
  props: IRadioCheckSwitchProps;
}
