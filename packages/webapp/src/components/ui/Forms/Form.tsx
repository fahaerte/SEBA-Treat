import React, { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { IForm } from "./IForm";
import Typography from "../Typography/Typography";
import FormRowList from "./FormRow/FormRowList";
import Button from "../Button/Button";

const Form = <TFormValues extends FieldValues>({
  className = "",
  submitButton = {
    color: "primary",
    children: "Submit",
  },
  autocomplete = "on",
  resetOnSubmit = true,
  isLoading = false,
  formFieldErrors,
  formTitle,
  abortButton,
  hookProps,
  onSubmit,
  elements,
  feedback,
  ...props
}: IForm<TFormValues>) => {
  const { handleSubmit, formState, reset, setError, ...rest } =
    useForm<TFormValues>(hookProps);

  useEffect(() => {
    if (!formFieldErrors) return;

    for (const error of formFieldErrors) {
      setError(error.fieldName, error.error);
    }
  }, [formFieldErrors, setError]);

  const submitHandler: SubmitHandler<TFormValues> = (data) => {
    if (resetOnSubmit) {
      reset();
    }
    return onSubmit(data);
  };

  return (
    <FormProvider
      formState={formState}
      reset={reset}
      handleSubmit={handleSubmit}
      setError={setError}
      {...rest}
    >
      {formTitle && (
        <Typography variant="h2" component="div" className={"mb-3"}>
          {formTitle}
        </Typography>
      )}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={className}
        autoComplete={autocomplete}
        noValidate
        {...props}
      >
        <FormRowList rows={elements} errors={formState.errors} />
        {feedback ? (
          <Typography variant="h4" component="p" color={feedback.color}>
            {feedback.message}
          </Typography>
        ) : null}
        <Button
          htmlType="submit"
          disabled={isLoading}
          isLoading={isLoading}
          {...submitButton}
        >
          {submitButton?.children}
        </Button>
        {abortButton ? (
          <Button
            htmlType="reset"
            {...abortButton}
            onClick={(event) => {
              reset();
              if (abortButton?.onClick) abortButton.onClick(event);
            }}
          >
            {abortButton.children}
          </Button>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default Form;
