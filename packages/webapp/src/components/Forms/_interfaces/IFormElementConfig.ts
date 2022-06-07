import { IInputConfig } from "../Input/IInput";
import { IDatePickerConfig } from "../Datepicker/IDatePicker";
import { IFormSelectConfig } from "../Select/ISelect";
import { IDropzoneConfig } from "../Dropzone/IDropzone";
import { ITextAreaConfig } from "../TextArea/ITextArea";
import { IRadioCheckSwitchConfig } from "../RadioCheckSwitch/IRadioCheckSwitch";
import { IRadioCheckSwitchGroupConfig } from "../RadioCheckSwitch/RadioCheckSwitchGroup/IRadioCheckSwitchGroup";
import { ITagSelectConfig } from "../TagSelect/ITagSelect";

export type IFormElementConfig<TFormValues> = (
  | IFormSelectConfig<TFormValues>
  | IDatePickerConfig<TFormValues>
  | IInputConfig<TFormValues>
  | IDropzoneConfig<TFormValues>
  | IRadioCheckSwitchConfig<TFormValues>
  | ITextAreaConfig<TFormValues>
  | IRadioCheckSwitchGroupConfig<TFormValues>
  | ITagSelectConfig<TFormValues>
) & {
  elementType:
    | "input"
    | "textarea"
    | "select"
    | "tagSelect"
    | "file"
    | "datepicker"
    | "radioCheckSwitch"
    | "radioCheckSwitchGroup";
};
export type IFormRow<TFormValues> =
  | IFormElementConfig<TFormValues>[]
  | IFormElementConfig<TFormValues>;

export type TFormFieldStories = {
  test: string;
};
