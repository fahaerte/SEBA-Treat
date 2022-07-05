import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { IColorProp, ILoadingProp } from "../../../types/ComponentProps";
import { IFormElementControlled } from "../_interfaces/IFormElementControlled";
import { TOptionValuePair } from "../_interfaces/TOptionValuePair";

export interface ITagSelectProps extends IColorProp, ILoadingProp {
  /**
   * Prefilled options, user can select from
   */
  autocompleteOptions: TOptionValuePair[];
  /**
   * This is shown in the dropdown, when there are no prefilled options
   */
  noOptionsMessage?: string;
  /**
   * This is shown in the dropdown, while the options are loading
   */
  loadingMessage?: string;
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
