import React from "react";
import { FieldValues, Path } from "react-hook-form";
import { IFormRadioCheckGroupItem } from "./IRadioCheckSwitchGroup";
import RadioCheckSwitch from "../RadioCheckSwitch";
import useRadioCheckGroupContext from "./useRadioCheckGroupContext";

const RadioCheckGroupItem = <TFormValues extends FieldValues>({
  ...props
}: IFormRadioCheckGroupItem<TFormValues>) => {
  const { formKey, defaultValue, rules, type, color } =
    useRadioCheckGroupContext().context;

  if (!formKey || !type || !color) return <></>;

  return (
    <RadioCheckSwitch<TFormValues>
      formKey={formKey as Path<TFormValues>}
      color={color}
      defaultValue={defaultValue}
      rules={rules}
      type={type}
      {...props}
    />
  );
};

export default RadioCheckGroupItem;
