import React, { useMemo } from "react";
import {
  SubmitHandler,
  useForm,
  FieldValues,
  Path,
  UnpackNestedValue,
  PathValue,
} from "react-hook-form";
import { IForm } from "./IForm";
import Typography from "../Typography/Typography";
import FormRowList from "./FormRow/FormRowList";
import Button from "../Button/Button";

export const CustomValueContext = React.createContext<{
  setCustomizedReset: (customizedReset: () => void) => void;
  setValue: (
    formKey: Path<FieldValues>,
    value: UnpackNestedValue<PathValue<FieldValues, any>>
  ) => void;
}>({
  setCustomizedReset: () => undefined,
  setValue: () => undefined,
});

const Form = <TFormValues extends FieldValues>({
  elements,
  className = "",
  onSubmit,
  submitButton = {
    color: "primary",
    children: "Submit",
  },
  abortButton,
  autocomplete = "on",
  hookProps = undefined,
  formTitle = "",
  resetOnSubmit = true,
  isLoading = false,
  invalidFeedback,
  ...props
}: IForm<TFormValues>) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>(hookProps);

  const customizedResets: (() => void)[] = useMemo(() => [], []);
  const setCustomizedReset = (resetFunction: () => void) => {
    customizedResets.push(resetFunction);
  };

  const submitHandler: SubmitHandler<TFormValues> = (data) => {
    if (resetOnSubmit) {
      resetForm();
    }
    return onSubmit(data);
  };

  const resetForm = () => {
    customizedResets.forEach((customizedReset) => {
      customizedReset();
    });
    reset();
  };

  return (
    <>
      <Typography variant="h2" component="div">
        {formTitle}
      </Typography>
      <form
        onSubmit={handleSubmit(submitHandler)}
        onAbort={resetForm}
        className={className}
        autoComplete={autocomplete}
        noValidate
        {...props}
      >
        <CustomValueContext.Provider
          value={{
            setCustomizedReset: setCustomizedReset,
            setValue: (
              formKey,
              value: UnpackNestedValue<PathValue<TFormValues, any>>
            ) => setValue(formKey, value, { shouldValidate: true }),
          }}
        >
          <FormRowList rows={elements} register={register} errors={errors} />
        </CustomValueContext.Provider>
        {abortButton ? (
          <Button htmlType="reset" {...abortButton} onClick={resetForm}>
            {abortButton.children}
          </Button>
        ) : null}
        {invalidFeedback ? (
          <Typography variant="p" color={"danger"}>
            {invalidFeedback}
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
      </form>
    </>
  );
};

export default Form;
