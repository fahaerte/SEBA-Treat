import React from "react";
import TagSelect from "react-select";
import { OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";
import { ITagSelect } from "./ITagSelect";
import { customStyles } from "./styles";
import { SCFloatingTagFormRound } from "../styles";
import { TOptionValuePair } from "../_interfaces/TOptionValuePair";
import { FormInvalidFeedback } from "../_utils/FormInvalidFeedback";
import { EDefaultErrorMessages } from "../_interfaces/EDefaultErrorMessages";
import { getEncodedString } from "../../../../utils/auth/getEncodedString";
import { useTheme } from "styled-components";

const TagSelectControlled = ({
  className = "",
  color = "primary",
  disabled = false,
  noOptionsMessage = "No options",
  onChange = () => undefined,
  isInvalid = false,
  invalidFeedback = EDefaultErrorMessages.GENERAL,
  label,
  value,
  autocompleteOptions,
}: ITagSelect<HTMLDivElement>) => {
  const theme = useTheme();

  return (
    <SCFloatingTagFormRound className={`form-floating multi-select-wrapper`}>
      <TagSelect<TOptionValuePair, true>
        id={getEncodedString(label)}
        isMulti
        onChange={(newValue: OnChangeValue<TOptionValuePair, true>) =>
          onChange(newValue as TOptionValuePair[])
        }
        options={autocompleteOptions}
        styles={customStyles(color, isInvalid, theme)}
        className={className}
        isDisabled={disabled}
        noOptionsMessage={() => noOptionsMessage}
        placeholder={label}
        components={makeAnimated()}
        value={value}
        isClearable={false}
      />
      {isInvalid && <FormInvalidFeedback message={invalidFeedback} />}
    </SCFloatingTagFormRound>
  );
};
export default TagSelectControlled;
