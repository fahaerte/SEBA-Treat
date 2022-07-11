import React from "react";
import CreatableSelect from "react-select/creatable";
import { OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";
import { ITagSelect } from "./ITagSelect";
import { customStyles } from "./styles";
import { SCFloatingForm } from "../styles";
import { TOptionValuePair } from "../_interfaces/TOptionValuePair";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";
import { useTheme } from "styled-components";

const TagSelectControlled = ({
  wrapperClasses = "",
  className = "",
  color = "primary",
  disabled = false,
  noOptionsMessage = "No options",
  loadingMessage = "loading...",
  isLoading = false,
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  label,
  value,
  autocompleteOptions,
}: ITagSelect<HTMLDivElement>) => {
  const theme = useTheme();

  return (
    <SCFloatingForm
      className={`form-floating multi-select-wrapper ${wrapperClasses}`}
    >
      <CreatableSelect<TOptionValuePair, true>
        id={getEncodedString(label)}
        isMulti
        onChange={(newValue: OnChangeValue<TOptionValuePair, true>) =>
          onChange(newValue as TOptionValuePair[])
        }
        onCreateOption={(inputValue) =>
          onChange([...value, { value: "", label: inputValue }])
        }
        options={isLoading ? [] : autocompleteOptions}
        styles={customStyles(color, isInvalid, theme)}
        className={className}
        isDisabled={disabled}
        isLoading={isLoading}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => loadingMessage}
        placeholder={label}
        components={makeAnimated()}
        value={value}
        isClearable={false}
      />
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </SCFloatingForm>
  );
};
export default TagSelectControlled;
