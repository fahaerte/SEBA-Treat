import { UseFormRegister, Path } from "react-hook-form";
import { IError } from "./IFormErrors";

export interface IFormElement<TFormValues> {
  /**
   * Label for a form element
   */
  label: string;
  /**
   * register prop for react hook form
   */
  register: UseFormRegister<TFormValues>;
  /**
   * The key of the formelement which it should be referred to
   */
  formKey: Path<TFormValues>;
  /**
   * Additional CSS classes on the input element
   */
  className?: string;
  /**
   * Classes regarding the div wrapper for some elements
   */
  wrapperClasses?: string;
  /**
   * Whether the input value is valid
   */
  isValid?: boolean;
  /**
   * Helper text if input is invalid
   */
  invalidFeedback?: string;
  /**
   * Whether the form element is disabled
   */
  disabled?: boolean;
  /**
   * default Value of the form element
   */
  defaultValue?: unknown;
  /**
   * Defines rules and error messages when a user
   * wants to submit a form with an invalid input.
   */
  errors?: IError;
}

/**
 * Helper type of IFormElement without register and invalidFeedback.
 */
export type TIFormElementOmit<TFormValues> = Omit<
  IFormElement<TFormValues>,
  "register"
>;
