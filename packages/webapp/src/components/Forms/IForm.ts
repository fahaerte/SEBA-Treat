import { SubmitHandler, UseFormProps } from "react-hook-form";
import { IFormRow } from "./_interfaces/IFormElementConfig";
import { IButton } from "../Button/IButton";

export interface IForm<TFormValues> {
  /**
   * Form Elements that are to be generated
   */
  elements: IFormRow<TFormValues>[];
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Function to handle submit form
   */
  onSubmit: SubmitHandler<TFormValues>;
  /**
   * Submit Label
   */
  submitButton?: Omit<IButton, "htmlType" | "disabled" | "isLoading">;
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
   * If user wants to pass loading state variable, submit button will show loading spinner while this is true
   */
  isLoading?: boolean;
  /**
   * Shows error message between last element and submit button
   */
  invalidFeedback?: string;
}
