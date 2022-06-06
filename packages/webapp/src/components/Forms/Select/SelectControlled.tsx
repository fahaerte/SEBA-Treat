import React from "react";
import { ISelect } from "./ISelect";
import { SCFloatingForm, SCSelect } from "../styles";

const SelectControlled = ({
  children,
  multiple = false,
  size = "md",
  wrapperClasses = "col-md",
  className = "",
  label,
  disabled = false,
  onChange = () => undefined,
}: ISelect<HTMLSelectElement>) => (
  <SCFloatingForm
    className={[
      multiple || size !== "md" ? "" : "form-floating",
      wrapperClasses,
    ].join(" ")}
  >
    {multiple || size !== "md" ? (
      <label
        htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}`}
        className={["form-label"].join(" ")}
      >
        {label}
      </label>
    ) : (
      ""
    )}
    <SCSelect
      disabled={disabled}
      onChange={(event) => onChange(event)}
      id={`${label.replace(/\s+/g, "-").toLowerCase()}`}
      multiple={multiple}
      className={[
        "form-select",
        size === "md" ? "" : `form-select-${size}`,
        className,
      ].join(" ")}
    >
      <option disabled />
      {children}
    </SCSelect>

    {!multiple && size === "md" ? (
      <label
        htmlFor={`${label.replace(/\s+/g, "-").toLowerCase()}`}
        className={["form-label"].join(" ")}
      >
        {label}
      </label>
    ) : (
      ""
    )}
  </SCFloatingForm>
);

export default SelectControlled;
