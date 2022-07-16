import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import FormRowElement from "./FormRowElement";
import { IFormRow } from "../_interfaces/IFormElementConfig";

const FormRowList = <TFormValue extends FieldValues>({
  rows,
  errors,
}: {
  rows: IFormRow<TFormValue>[];
  errors: FieldErrors;
}) => (
  <>
    {
      // iterate all form rows
      rows.map((row) => (
        <div
          key={`form-row-${
            Array.isArray(row) ? row[0].config.formKey : row.config.formKey
          }`}
          className="row mb-lg"
        >
          {Array.isArray(row) ? (
            // iterate group of form elements within current form row
            row.map((groupItem) => (
              <div className="col" key={groupItem.config.formKey}>
                <FormRowElement formConfig={groupItem} errors={errors} />
              </div>
            ))
          ) : (
            // single element within current form row
            <div className="col">
              <FormRowElement formConfig={row} errors={errors} />
            </div>
          )}
        </div>
      ))
    }
  </>
);
export default FormRowList;