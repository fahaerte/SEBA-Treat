import { RegisterOptions } from "react-hook-form";
import { IError, CError } from "../_interfaces/IFormErrors";
import { EErrorMessages } from "../_interfaces/TFormErrorMessages";

export const generateRegisterOptions = (
  defaultValue: unknown,
  errors?: IError,
  valueAsDate?: boolean
): RegisterOptions => ({
  value: defaultValue,
  required: errors?.required
    ? new CError(
        errors.required.value,
        errors.required.message ?? EErrorMessages.REQUIRED
      )
    : undefined,
  min: errors?.min
    ? new CError(errors.min.value, errors.min.message ?? EErrorMessages.MIN)
    : undefined,
  max: errors?.max
    ? new CError(errors.max.value, errors.max.message ?? EErrorMessages.MAX)
    : undefined,
  minLength: errors?.minLength
    ? new CError(
        errors.minLength.value,
        errors.minLength.message ?? EErrorMessages.MINLENGTH
      )
    : undefined,
  maxLength: errors?.maxLength
    ? new CError(
        errors.maxLength.value,
        errors.maxLength.message ?? EErrorMessages.MAXLENGTH
      )
    : undefined,
  pattern: errors?.pattern
    ? new CError(
        errors.pattern.value,
        errors.pattern.message ?? EErrorMessages.PATTERN
      )
    : undefined,
  valueAsDate,
});
