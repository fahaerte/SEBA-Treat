import { Path } from "react-hook-form";
import { IFormRulesConfig } from "./IFormRulesConfig";
import { IComponentBase } from "../../../../assets/theme/types/IComponentBase";

export interface IFormElement<TFormValues>
  extends Pick<IComponentBase, "className"> {
  /**
   * Label for the form element
   */
  label: string;
  /**
   * The key of the formelement which it should be referred to
   */
  formKey: Path<TFormValues>;
  /**
   * Classes regarding the div wrapper for some elements
   */
  wrapperClasses?: string;
  /**
   * Whether the form element is disabled
   */
  disabled?: boolean;
  /**
   * Default value of the form element
   */
  defaultValue?: unknown;
  /**
   * Defines rules and error messages for client form validation
   */
  rules?: IFormRulesConfig;
}

/**
 * Reduced IFormElement interface without uncontrolled properties like formKey, defaultValue and rules
 */
export type TIFormElementOmit = "formKey" | "defaultValue" | "rules";
