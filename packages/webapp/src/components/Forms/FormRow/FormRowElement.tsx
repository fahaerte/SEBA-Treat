import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { IFormElementConfig } from "../_interfaces/IFormElementConfig";
import { IInputProps } from "../Input/IInput";
import { IDatePickerProps } from "../Datepicker/IDatePicker";
import { IFormSelectConfig } from "../Select/ISelect";
import { IRadioCheckSwitchProps } from "../RadioCheckSwitch/IRadioCheckSwitch";
import { IFormRadioCheckSwitchGroupConfig } from "../RadioCheckSwitch/RadioCheckSwitchGroup/IRadioCheckSwitchGroup";
import { ITagSelectProps } from "../TagSelect/ITagSelect";
import TextArea from "../TextArea/TextArea";
import Datepicker from "../Datepicker/Datepicker";
import RadioCheckSwitch from "../RadioCheckSwitch/RadioCheckSwitch";
import RadioCheckSwitchGroup from "../RadioCheckSwitch/RadioCheckSwitchGroup/RadioCheckSwitchGroup";
import RadioCheckGroupItem from "../RadioCheckSwitch/RadioCheckSwitchGroup/RadioCheckGroupItem";
import { getEncodedString } from "../../../utils/getEncodedString";
import Input from "../Input/Input";
// import Dropzone from "../Dropzone/Dropzone";
import Select from "../Select/Select";
import TagSelect from "../TagSelect/TagSelect";
import { TOptionValuePair } from "../_interfaces/TOptionValuePair";

interface IFormRowElement<T> {
  formConfig: IFormElementConfig<T>;
  errors: FieldErrors;
}

const FormRowElement = <TFormValues extends FieldValues>({
  formConfig,
  errors,
}: IFormRowElement<TFormValues>) => {
  const { config, elementType } = formConfig;
  const commonParams = () => ({
    // TODO remove after refactoring
    isValid: !errors[`${config.formKey}`],
    invalidFeedback: errors[`${config.formKey}`]
      ? errors[`${config.formKey}`].message
      : undefined,
    key: getEncodedString(config.label, config.formKey),
  });

  switch (elementType) {
    case "textarea":
      return (
        <TextArea<TFormValues>
          key={getEncodedString(config.label, config.formKey)}
          {...config}
          {...config.props}
        />
      );
    case "input":
      return (
        <Input<TFormValues>
          key={getEncodedString(config.label, config.formKey)}
          {...config}
          {...(config.props as IInputProps)}
        />
      );
    case "datepicker":
      return (
        <Datepicker<TFormValues>
          key={getEncodedString(config.label, config.formKey)}
          {...config}
          {...(config.props as IDatePickerProps)}
        />
      );
    case "file":
      return <div>Placeholder</div>;

    case "select": {
      const configToSelect = config as IFormSelectConfig<TFormValues>;
      return (
        <Select<TFormValues>
          key={getEncodedString(config.label, config.formKey)}
          {...configToSelect}
          {...configToSelect.props}
        >
          {configToSelect.options.map((option: HTMLOptionElement, index) => (
            <option
              disabled={option.disabled}
              value={option.value}
              key={`${option.label || index}-${option.value}`}
            >
              {option.label ? option.label : option.value}
            </option>
          ))}
        </Select>
      );
    }
    case "tagSelect":
      return (
        <TagSelect
          key={getEncodedString(config.label, config.formKey)}
          {...config}
          {...(config.props as ITagSelectProps)}
        />
      );
    case "radioCheckSwitch":
      return (
        <RadioCheckSwitch<TFormValues>
          {...config}
          {...commonParams()}
          {...(config.props as IRadioCheckSwitchProps)}
        />
      );
    case "radioCheckSwitchGroup": {
      const groupConfig =
        config as IFormRadioCheckSwitchGroupConfig<TFormValues>;
      return (
        <RadioCheckSwitchGroup
          {...config}
          inline={groupConfig.props.inline}
          type={groupConfig.props.type}
        >
          {groupConfig.options.map((option: TOptionValuePair) => (
            <RadioCheckGroupItem
              label={option.label}
              value={option.value}
              key={getEncodedString(option.label, groupConfig.formKey)}
            />
          ))}
        </RadioCheckSwitchGroup>
      );
    }
    default:
      return <></>;
  }
};
export default FormRowElement;
