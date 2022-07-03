import { Path } from "react-hook-form";

export type TFormFieldError<TFormValues> = {
  fieldName: Path<TFormValues>;
  error: { type: string; message: string };
};
