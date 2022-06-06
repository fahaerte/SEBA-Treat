import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../";
import { Datepicker } from "../";
import { Select } from "../";
import { Dropzone } from "../";
import { RadioCheckSwitch, RadioCheckSwitchGroup } from "../RadioCheckSwitch";
import { TextArea } from "../";
import { IFormElementConfig } from "../_interfaces/IFormElementConfig";
import { IInputProps } from "../Input/IInput";
import { IDatePickerProps } from "../Datepicker/IDatePicker";
import { IFormSelectConfig } from "../Select/ISelect";
import { IRadioCheckSwitchProps } from "../RadioCheckSwitch/IRadioCheckSwitch";
import {
  IRadioCheckSwitchGroupConfig,
  TRadioCheckSwitchGroupOptions,
} from "../RadioCheckSwitch/RadioCheckSwitchGroup/IRadioCheckSwitchGroup";
import { TagSelect } from "../";
import { ITagSelectProps } from "../TagSelect/ITagSelect";
import { RichText } from "../";
import { IRichTextProps } from "../RichText/IRichText";

interface IFormRowElement<T> {
  config: IFormElementConfig<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormRowElement = <TFormValues extends FieldValues>({
  config,
  register,
  errors,
}: IFormRowElement<TFormValues>) => {
  const commonParams = () => ({
    isValid: !errors[`${config.formKey}`],
    invalidFeedback: errors[`${config.formKey}`]
      ? errors[`${config.formKey}`].message
      : undefined,
    key: `${config.label.replace(/\s+/g, "-").toLowerCase()}-${config.formKey}`,
  });

  switch (config.elementType) {
    case "textarea":
      return (
        <TextArea<TFormValues>
          {...config}
          {...commonParams()}
          {...config.props}
          register={register}
        />
      );
    case "input":
      return (
        <Input<TFormValues>
          {...config}
          {...commonParams()}
          {...(config.props as IInputProps)}
          register={register}
        />
      );
    case "datepicker":
      return (
        <Datepicker<TFormValues>
          {...config}
          {...commonParams()}
          {...(config.props as IDatePickerProps)}
          register={register}
        />
      );
    case "file":
      return (
        <Dropzone<TFormValues>
          {...config}
          {...commonParams()}
          {...config.props}
          register={register}
        />
      );
    case "richText":
      return (
        <RichText
          {...config}
          {...commonParams()}
          {...(config.props as IRichTextProps)}
          register={register}
        />
      );
    case "select": {
      const configToSelect = config as IFormSelectConfig<TFormValues>;
      return (
        <Select<TFormValues>
          {...configToSelect}
          {...commonParams()}
          {...configToSelect.props}
          register={register}
        >
          {configToSelect.options.map((option: HTMLOptionElement) => (
            <option
              disabled={option.disabled}
              value={option.value}
              key={`${option.label ?? option.value}-${option.value}`}
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
          {...config}
          {...commonParams()}
          {...(config.props as ITagSelectProps)}
          register={register}
        />
      );
    case "radioCheckSwitch":
      return (
        <RadioCheckSwitch<TFormValues>
          {...config}
          {...commonParams()}
          {...(config.props as IRadioCheckSwitchProps)}
          register={register}
        />
      );
    case "radioCheckSwitchGroup": {
      const configToRadioCheckSwitchGroup =
        config as IRadioCheckSwitchGroupConfig<TFormValues>;
      return (
        <RadioCheckSwitchGroup
          invalidFeedback={commonParams().invalidFeedback}
          label={configToRadioCheckSwitchGroup.label}
          inline={configToRadioCheckSwitchGroup.props.inline}
          wrapperClasses={configToRadioCheckSwitchGroup.wrapperClasses}
          required={configToRadioCheckSwitchGroup.errors?.required?.value}
        >
          {configToRadioCheckSwitchGroup.options.map(
            (option: TRadioCheckSwitchGroupOptions<TFormValues>) => (
              <RadioCheckSwitch
                label={option.label}
                register={register}
                formKey={configToRadioCheckSwitchGroup.formKey}
                // disabled={configToRadioCheckSwitchGroup.disabled}
                defaultValue={configToRadioCheckSwitchGroup.defaultValue}
                errors={configToRadioCheckSwitchGroup.errors}
                groupItem
                color={configToRadioCheckSwitchGroup.props.color ?? "primary"}
                type={configToRadioCheckSwitchGroup.props.type}
                value={option.value}
                key={`${option.label.replace(/\s+/g, "-").toLowerCase()}-${
                  configToRadioCheckSwitchGroup.formKey
                }`}
              />
            )
          )}
        </RadioCheckSwitchGroup>
      );
    }
    default:
      return <></>;
  }
};
export default FormRowElement;
