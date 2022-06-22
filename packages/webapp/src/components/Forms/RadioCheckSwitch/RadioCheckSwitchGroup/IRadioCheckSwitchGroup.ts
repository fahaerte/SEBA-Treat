import React, { FormEvent } from "react";
import {
  IFormElement,
  TIFormElementOmit,
} from "../../_interfaces/IFormElement";
import {
  IFormRadioCheckSwitch,
  IRadioCheckSwitchProps,
} from "../IRadioCheckSwitch";
import { TBootstrapPalette } from "../../../../assets/theme/interfaces/TBootstrapPalette";
import { TOptionValuePair } from "../../_interfaces/TOptionValuePair";

export interface IRadioCheckSwitchGroupProps {
  /**
   * Type of the element
   */
  type: IRadioCheckSwitchProps["type"];
  /**
   * alignment of the children (whether they are displayed listed or inline)
   */
  inline?: boolean;
  color?: TBootstrapPalette;
}

export interface IFormRadioCheckSwitchGroup<TFormValues>
  extends Omit<IFormElement<TFormValues>, "disabled" | "wrapperClasses">,
    IRadioCheckSwitchGroupProps {
  /**
   * RadioCheckSwitch items as react nodes
   */
  children: React.ReactNode;
}

export interface IFormRadioCheckSwitchGroupConfig<TFormValues>
  extends Omit<IFormElement<TFormValues>, "disabled"> {
  props: IRadioCheckSwitchGroupProps;
  /**
   * RadioCheckSwitch items as object array
   */
  options: TOptionValuePair[];
}

export interface IRadioCheckSwitchGroup<TFormValues>
  extends Omit<IFormRadioCheckSwitch<TFormValues>, TIFormElementOmit> {
  /**
   * On Change event handler
   * @param event
   */
  onChange?: (event: FormEvent<HTMLDivElement>) => void;
  /**
   * Options to display the children
   */
  // options: TRadioCheckSwitchGroupOptions<TFormValues>[];
  children: React.ReactNode;
}

export interface IFormRadioCheckGroupItem<TFormValues>
  extends Omit<
    IFormRadioCheckSwitch<TFormValues>,
    "formKey" | "defaultValue" | "rules" | "type" | "color"
  > {}
