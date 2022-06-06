import React, { ChangeEvent } from "react";
import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";

export interface IFormSelectProps {
  /**
   * size of the select attribute
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether multiple options are allowed to be selected
   */
  multiple?: boolean;
}

export interface IFormSelect<TFormValues>
  extends IFormElement<TFormValues>,
    IFormSelectProps {
  /**
   * SelectControlled Options
   */
  children:
    | React.ReactElement<HTMLOptionElement>[]
    | React.ReactElement<HTMLOptionElement>;
}

export interface ISelect<TFormValues>
  extends Omit<
    IFormSelect<TFormValues>,
    | "formKey"
    | "isValid"
    | "register"
    | "errors"
    | "invalidFeedback"
    | "placeholder"
  > {
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface IFormSelectConfig<TFormValues>
  extends TIFormElementOmit<TFormValues> {
  props?: IFormSelectProps;
  /**
   * options of the select component
   */
  options: HTMLOptionElement[];
}
