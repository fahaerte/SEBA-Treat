import { SubmitHandler, UseFormProps } from "react-hook-form";
import { IFormRow } from "./_interfaces/IFormElementConfig";
import { IButton } from "../Button/IButton";
import { TFormFieldError } from "./_interfaces/TFormFieldError";
import { IComponentBase } from "../../../assets/theme/types/IComponentBase";
import { TBootstrapPalette } from "../../../assets/theme/interfaces/TBootstrapPalette";

export interface IForm<TFormValues> extends Pick<IComponentBase, "className"> {
  isLoading?: boolean;
  /**
   * Form Elements that are to be generated
   */
  elements: IFormRow<TFormValues>[];
  /**
   * Function to handle submit form
   */
  onSubmit: SubmitHandler<TFormValues>;
  /**
   * Submit Label
   */
  submitButton?: Omit<IButton, "htmlType" | "disabled" | "isLoading"> | null;
  /**
   * Abort Label
   */
  abortButton?: Omit<IButton, "htmlType">;
  /**
   * Specifies whether a form should have autocomplete
   */
  autocomplete?: "on" | "off";
  /**
   * use form props to customize the useForm hook
   */
  hookProps?: UseFormProps<TFormValues>;
  /**
   * Headline title
   */
  formTitle?: string;
  /**
   * Whether the form should be reset after submission
   */
  resetOnSubmit?: boolean;
  /**
   * Shows message between last element and submit button.
   * Could be used for general error or success messages
   */
  feedback?: { color: TBootstrapPalette; message: string };
  /**
   * This can be used to add error messages to specific form fields.
   * e.g. server side validation error messages
   */
  formFieldErrors?: TFormFieldError<TFormValues>[];
}
