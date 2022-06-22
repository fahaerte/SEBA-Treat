import { RegisterOptions } from "react-hook-form";
import {
  IFormRulesConfig,
  CFormRule,
  IFormRules,
} from "../_interfaces/IFormRulesConfig";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";

// TODO remove after all components are converted
export const generateRegisterOptions = (
  defaultValue: unknown,
  rules?: IFormRulesConfig,
  disabled?: boolean,
  valueAsDate?: boolean
): RegisterOptions => ({
  value: defaultValue,
  required: rules?.required
    ? new CFormRule(
        rules.required.value,
        rules.required.message ?? EDefaultErrorMessages.REQUIRED
      )
    : undefined,
  min: rules?.min
    ? new CFormRule(
        rules.min.value,
        rules.min.message ?? EDefaultErrorMessages.MIN
      )
    : undefined,
  max: rules?.max
    ? new CFormRule(
        rules.max.value,
        rules.max.message ?? EDefaultErrorMessages.MAX
      )
    : undefined,
  minLength: rules?.minLength
    ? new CFormRule(
        rules.minLength.value,
        rules.minLength.message ?? EDefaultErrorMessages.MINLENGTH
      )
    : undefined,
  maxLength: rules?.maxLength
    ? new CFormRule(
        rules.maxLength.value,
        rules.maxLength.message ?? EDefaultErrorMessages.MAXLENGTH
      )
    : undefined,
  pattern: rules?.pattern
    ? new CFormRule(
        rules.pattern.value,
        rules.pattern.message ?? EDefaultErrorMessages.PATTERN
      )
    : undefined,
  valueAsDate,
  disabled,
});

export const useFormRuleConverter = (rules?: IFormRulesConfig) => {
  if (!rules) return undefined;

  return {
    required: rules.required
      ? {
          value: rules.required.value,
          message: rules.required.message || EDefaultErrorMessages.REQUIRED,
        }
      : undefined,
    min: rules.min
      ? {
          value: rules.min.value,
          message: rules.min.message || EDefaultErrorMessages.MIN,
        }
      : undefined,
    max: rules.max
      ? {
          value: rules.max.value,
          message: rules.max.message || EDefaultErrorMessages.MAX,
        }
      : undefined,
    minLength: rules.minLength
      ? {
          value: rules.minLength.value,
          message: rules.minLength.message || EDefaultErrorMessages.MINLENGTH,
        }
      : undefined,
    maxLength: rules.maxLength
      ? {
          value: rules.maxLength.value,
          message: rules.maxLength.message || EDefaultErrorMessages.MAXLENGTH,
        }
      : undefined,
    pattern: rules.pattern
      ? {
          value: rules.pattern.value,
          message: rules.pattern.message || EDefaultErrorMessages.PATTERN,
        }
      : undefined,
  } as IFormRules;
};
