import { IFormInputConfig } from "../Input/IInput";
import { IFormDatePickerConfig } from "../Datepicker/IDatePicker";
import { IFormSelectConfig } from "../Select/ISelect";
// import { IFormDropzoneConfig } from "../Dropzone/IDropzone";
import { IFormTextAreaConfig } from "../TextArea/ITextArea";
import { IFormRadioCheckSwitchConfig } from "../RadioCheckSwitch/IRadioCheckSwitch";
import { IFormRadioCheckSwitchGroupConfig } from "../RadioCheckSwitch/RadioCheckSwitchGroup/IRadioCheckSwitchGroup";
import { IFormTagSelectConfig } from "../TagSelect/ITagSelect";

export type IFormElementConfig<TFormValues> = {
  config:
    | IFormSelectConfig<TFormValues>
    | IFormDatePickerConfig<TFormValues>
    | IFormInputConfig<TFormValues>
    // | IFormDropzoneConfig<TFormValues>
    | IFormRadioCheckSwitchConfig<TFormValues>
    | IFormTextAreaConfig<TFormValues>
    | IFormRadioCheckSwitchGroupConfig<TFormValues>
    | IFormTagSelectConfig<TFormValues>
  elementType:
    | "input"
    | "textarea"
    | "select"
    | "tagSelect"
    | "file"
    | "datepicker"
    | "radioCheckSwitch"
    | "radioCheckSwitchGroup"
};
export type IFormRow<TFormValues> =
  | IFormElementConfig<TFormValues>
  | IFormElementConfig<TFormValues>[];
