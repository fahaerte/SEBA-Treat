import React, { ChangeEvent } from "react";
import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";
import { IComponentSize } from "../../../../assets/theme/types/IComponentSize";

export interface ISelectProps extends IComponentSize {}

export interface IFormSelect<TFormValues>
  extends IFormElement<TFormValues>,
    ISelectProps {
  /**
   * <option> children as react nodes
   */
  children:
    | React.ReactElement<HTMLOptionElement>[]
    | React.ReactElement<HTMLOptionElement>;
}

export interface IFormSelectConfig<TFormValues>
  extends IFormElement<TFormValues> {
  props?: ISelectProps;
  /**
   * <option> children as object array list
   */
  options: HTMLOptionElement[];
}

export interface ISelect<TFormValues>
  extends IFormElementControlled,
    Omit<IFormSelect<TFormValues>, TIFormElementOmit> {
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  size?: string;
}
