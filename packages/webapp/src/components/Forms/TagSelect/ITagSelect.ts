import { IFormElement, TIFormElementOmit } from "../_interfaces/IFormElement";
import { TBootstrapPalette } from "../../../assets/themes/interfaces/TBootstrapPalette";

export type TOption = {
  id?: string;
  label: string;
};

export type TSelectOption = {
  id: string;
  label: string;
};

export type TNewOption = {
  label: string;
};

export interface ITagSelectProps {
  /**
   * The options, you can select from
   */
  selectOptions: {
    isLoading: boolean;
    options: TSelectOption[];
  };
  /**
   * This describes the color of the TagselectComponent
   */
  color?: TBootstrapPalette;
  /**
   * This is shown, when there are no options
   */
  noOptionsMessage?: string;
  /**
   * This is shown, while the options are loading
   */
  loadingMessage?: string;
}

export interface ITagSelectControlledProps extends ITagSelectProps {
  /**
   * This describes, what happens on Changes
   */
  onChange?: (selectedOptions: TOption[]) => void;
}

export interface ITagSelect<TFormValues>
  extends ITagSelectControlledProps,
    Omit<
      IFormElement<TFormValues>,
      "formKey" | "register" | "errors" | "invalidFeedback"
    > {}

export interface IFormTagSelect<TFormValues>
  extends IFormElement<TFormValues>,
    ITagSelectProps {}

export interface ITagSelectConfig<TFormValues>
  extends TIFormElementOmit<TFormValues> {
  props: ITagSelectProps;
}

export interface ITagSelectOption {
  value: string;
  label: string;
}
