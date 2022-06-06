import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormRowElement from "./FormRowElement";
import { IFormRow } from "../_interfaces/IFormElementConfig";

export interface IFormRowList<T> {
  rows: IFormRow<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormRowList = <TFormValue extends FieldValues>({
  rows,
  register,
  errors,
}: IFormRowList<TFormValue>): JSX.Element => (
  <>
    {
      // iterate all form rows
      rows.map((row) => (
        <div
          key={`form-row-${Array.isArray(row) ? row[0].formKey : row.formKey}`}
          className="row g-2 mb-3"
        >
          {Array.isArray(row) ? (
            // iterate group of form elements within current form row
            row.map((groupItem) => (
              <FormRowElement
                key={groupItem.formKey}
                config={groupItem}
                register={register}
                errors={errors}
              />
            ))
          ) : (
            // single element within current form row
            <FormRowElement config={row} register={register} errors={errors} />
          )}
        </div>
      ))
    }
  </>
);
export default FormRowList;
