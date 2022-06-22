import { IFormRadioCheckSwitch } from "../IRadioCheckSwitch";
import React from "react";
import { FieldValues, Path } from "react-hook-form";

interface IRadioCheckGroupContext
  extends Pick<
    IFormRadioCheckSwitch<FieldValues>,
    "formKey" | "defaultValue" | "rules" | "type" | "color"
  > {}

const context = React.createContext<IRadioCheckGroupContext>({
  formKey: "" as Path<FieldValues>,
  defaultValue: undefined,
  rules: undefined,
  type: "radio",
  color: "primary",
});

const useRadioCheckGroupContext = () => {
  const useContext = () => {
    const result = React.useContext<IRadioCheckGroupContext>(context);
    if (!result) throw new Error("useRadioCheckGroupContext undefined");

    return result;
  };
  return { provider: context.Provider, context: useContext() };
};
export default useRadioCheckGroupContext;
