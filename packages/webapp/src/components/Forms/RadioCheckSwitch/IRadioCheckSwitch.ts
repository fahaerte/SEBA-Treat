import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { ChangeEvent } from "react";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";
import { TBootstrapPalette } from "../../../assets/theme/interfaces/TBootstrapPalette";

export const ACheckTypes = ["radio", "checkbox", "switch"] as const;
export type TCheckTypes = typeof ACheckTypes[number];

export interface IRadioCheckSwitchProps {
  /**
   * Type of component (radio, checkbox, switch)
   */
  type?: TCheckTypes;
  /**
   * Value of the item
   */
  value?: string | number | readonly string[];
  color?: TBootstrapPalette;
}

export interface IFormRadioCheckSwitch<TFormValues>
  extends Omit<IFormElement<TFormValues>, "disabled">,
    IRadioCheckSwitchProps {}

export interface IFormRadioCheckSwitchConfig<TFormValues>
  extends Omit<IFormElement<TFormValues>, "disabled"> {
  props: IRadioCheckSwitchProps;
}

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
