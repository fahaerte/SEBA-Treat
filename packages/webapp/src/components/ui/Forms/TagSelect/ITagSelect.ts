import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { IComponentColorBase } from "../../../../assets/theme/types/IComponentColorBase";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";
import { TOptionValuePair } from "../_interfaces/TOptionValuePair";

export interface ITagSelectProps
  extends Omit<IComponentColorBase, "children" | "className"> {
  /**
   * Prefilled options, user can select from
   */
  autocompleteOptions: TOptionValuePair[];
  /**
   * This is shown in the dropdown, when there are no prefilled options
   */
  noOptionsMessage?: string;
  filterSelect?: boolean;
}

export interface IFormTagSelect<TFormValues>
  extends IFormElement<TFormValues>,
    ITagSelectProps {}

export interface IFormTagSelectConfig<TFormValues>
  extends IFormElement<TFormValues> {
  props: ITagSelectProps;
}

export interface ITagSelect<TFormValues>
  extends IFormElementControlled,
    Omit<IFormTagSelect<TFormValues>, TIFormElementOmit> {
  /**
   * onChange event handler
   */
  onChange?: (selectedOptions: TOptionValuePair[]) => void;
  /**
   * Controlled state
   */
  value: TOptionValuePair[];
}
